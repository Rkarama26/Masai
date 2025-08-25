import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router"


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [expandedPost, setExpandedPost] = useState(null); // track which post is expanded

    const navigate = useNavigate();

    const handleReadMore = (id) => {
        navigate(`/blogapp/postdetails/${id}`); // redirect to PostDetails with id
    };


    async function fetchPosts() {
        try {
            const res = await fetch(`https://dummyjson.com/posts`);
            const result = await res.json();
            setPosts(result.posts);
            console.log(result.posts)
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
                const isExpanded = expandedPost === post.id;
                const preview =
                    post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body;

                return (
                    <figure
                        key={post.id}
                        className="flex flex-col items-center justify-between p-6 text-center transition bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg"
                    >
                        <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {post.title}
                            </h3>

                            {/* Body with truncate */}
                            <p className="my-4 text-gray-600">
                                {isExpanded ? post.body : preview}
                            </p>

                            {post.body.length > 120 && (
                                <button
                                    onClick={() => handleReadMore(post.id)}
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Read More
                                </button>
                            )}

                        </blockquote>

                        {/* Reactions centered */}
                        <div className="flex justify-center gap-6 mt-4 text-sm text-gray-700">
                            <span>👍 {post.reactions.likes}</span>
                            <span>👎 {post.reactions.dislikes}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                            {post.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </figure>
                );
            })}
        </div>
    );
};

export default Home;


//<Link to={`/product/id/${product.id}`} style={{textDecoration: "none",  marginBottom: "10px" }}>
