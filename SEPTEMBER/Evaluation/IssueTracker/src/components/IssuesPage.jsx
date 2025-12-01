import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";

//  IssueCard (memoized)
function IssueCard({ issue }) {
    return (
        <div
            role="article"
            aria-label={`Issue ${issue.number} - ${issue.title}`}
            style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8, borderRadius: 6 }}
        >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    <strong>#{issue.number}</strong> — <span>{issue.title}</span>
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>{issue.state}</div>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, color: "#444" }}>
                <span>Author: {issue.user?.login}</span>
            </div>
            <div style={{ marginTop: 8 }}>
                {issue.labels && issue.labels.length > 0 ? (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {issue.labels.map((l) => (
                            <span
                                key={l.id}
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "2px 6px",
                                    borderRadius: 4,
                                    fontSize: 12,
                                }}
                            >
                                {l.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div style={{ fontSize: 12, color: "#888" }}>No labels</div>
                )}
            </div>
        </div>
    );
}
//wrapped in React memo to avoid re-renders 
const MemoizedIssueCard = React.memo(IssueCard);



// reducer
function filterReducer(state, action) {
    switch (action.type) {
        case "SET_STATUS":
            return { ...state, status: action.payload };
        case "SET_LABEL":
            return { ...state, label: action.payload };
        case "RESET":
            return { status: "open", label: "" };
        default:
            return state;
    }
}
// IssuesPage
export default function IssuesPage() {
    const { owner, repoName } = useParams();
    const [filterState, dispatch] = useReducer(filterReducer, { status: "open", label: "" });
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function fetchIssues() {
            setLoading(true);
            setError(null);
            try {
                const stateParam = filterState.status || "open";
                const url = `https://api.github.com/repos/${encodeURIComponent(
                    owner
                )}/${encodeURIComponent(repoName)}/issues?state=${stateParam}&per_page=50`;

                const res = await axios.get(url, {
                    headers: { Accept: "application/vnd.github.v3+json" },
                });

                if (cancelled) return;
                // only issues
                const onlyIssues = Array.isArray(res.data)
                    ? res.data.filter((i) => !i.pull_request)
                    : [];
                setIssues(onlyIssues);
            } catch (err) {
                if (cancelled) return;
                setError(err.response?.status === 404 ? "Repository not" : err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchIssues();
        return () => {
            cancelled = true;
        };
    }, [owner, repoName, filterState.status]);

    const filteredIssues = useMemo(() => {
        const labelQ = filterState.label.trim().toLowerCase();
        if (!labelQ) return issues;
        return issues.filter((iss) =>
            (iss.labels || []).some((l) => l.name.toLowerCase().includes(labelQ))
        );
    }, [issues, filterState.label]);

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>
                    Issues for {owner}/{repoName}
                </h2>
                <Link to="/">← Back</Link>
            </div>

            <Filters filterState={filterState} dispatch={dispatch} />

            {loading ? (
                <div>Loading issues…</div>
            ) : error ? (
                <div style={{ color: "red" }}>Error: {error}</div>
            ) : filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => <MemoizedIssueCard key={issue.id} issue={issue} />)
            ) : (
                <div>No issues found.</div>
            )}
        </div>
    );
}
