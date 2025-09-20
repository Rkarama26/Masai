import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;

        const parts = trimmed.split("/").map((p) => p.trim());
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
            alert("Please type in the format owner/repo (e.g. facebook/react)");
            return;
        }

        const [owner, repoName] = parts;
        navigate(`/repo/${encodeURIComponent(owner)}/${encodeURIComponent(repoName)}`);
    }

    return (
        <div style={{ padding: 20, fontFamily: "sans-serif" }}>
            <h1>Issue Tracker — Repository Search</h1>
            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
                <label htmlFor="repoInput">Repository (owner/repo): </label>
                <input
                    id="repoInput"
                    type="text"
                    placeholder="facebook/react"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ marginLeft: 8, padding: "6px 8px" }}
                />
                <button type="submit" style={{ marginLeft: 8, padding: "6px 10px" }}>
                    View Issues
                </button>
            </form>
        </div>
    );
}
