

// filters
export default function Filters({ filterState, dispatch }) {
    return (
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
            <label>
                State:
                <select
                    value={filterState.status}
                    onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value })}
                    style={{ marginLeft: 8, padding: "4px 6px" }}
                >
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                    <option value="all">all</option>
                </select>
            </label>


            <label>
                Label filter:
                <input
                    type="text"
                    placeholder="type a label (e.g. bug)"
                    value={filterState.label}
                    onChange={(e) => dispatch({ type: "SET_LABEL", payload: e.target.value })}
                    style={{ marginLeft: 8, padding: "4px 6px" }}
                />
            </label>


            <button onClick={() => dispatch({ type: "RESET" })} style={{ padding: "6px 10px" }}>
                Reset
            </button>
        </div>
    );
}