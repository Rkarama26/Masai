import React, { useEffect, useState } from 'react';
import PostBefore from './PostBefore';

const BeforeApp = () => {


    const [timer, setTimer] = useState(0);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => setTimer((t) => t + 1), 1000);
        return () => clearInterval(interval);
    }, []);

    // Add Post
    const addPost = () => {
        const newPost = {
            id: Date.now(),
            title,
            body,
            verifyPost: false,
        };
        setPosts((prev) => [...prev, newPost]);
        setTitle("");
        setBody("");
    };

    // Toggle Verify
    const toggleVerify = (id) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
            )
        );
    };

    return (
        <div>
            <h1>🚨 Before Optimisation</h1>
            <h2>Timer: {timer}</h2>

            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button onClick={addPost}>Add Post</button>

            {posts.map((post) => (
                <PostBefore key={post.id} {...post} toggleVerify={toggleVerify} />
            ))}
        </div>
    );
}

export default BeforeApp;
