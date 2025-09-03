import React from "react";

function PostBefore({ id, title, body, verifyPost, toggleVerify }) {
  const bgColor = `hsl(${Math.random() * 360}, 70%, 80%)`; // new color each render

  console.log("PostBefore rendered:", id);

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

export default PostBefore;
