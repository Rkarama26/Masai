import React, { useMemo } from "react";

function PostAfter({ id, title, body, verifyPost, toggleVerify }) {
  // Memoized random color → stable until ID changes
  const bgColor = useMemo(
    () => `hsl(${Math.random() * 360}, 70%, 80%)`,
    [id]
  );

  console.log("PostAfter rendered:", id);

  return (
    <div style={{ backgroundColor: bgColor, padding: "10px", margin: "10px 0" }}>
      <h3>{title}</h3>
      <p>{body}</p>
      <button onClick={() => toggleVerify(id)}>
        {verifyPost ? "Verified" : "Verify"}
      </button>
    </div>
  );
}

// Memoize Post component itself
export default React.memo(PostAfter);
