import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams(); // get post id from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!post) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="max-w-3xl p-6 mx-auto mt-6 bg-white border border-gray-200 rounded-lg shadow">
      <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>

      <p className="mb-4 text-gray-700">{post.body}</p>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <span>User ID: {post.userId}</span>
        <span>Views: {post.views}</span>
      </div>

      <div className="flex gap-6 mb-4 text-sm text-gray-700">
        <span>👍 {post.reactions.likes}</span>
        <span>👎 {post.reactions.dislikes}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default PostDetails;
