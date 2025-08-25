import React, { useEffect, useState } from 'react';

const Pagination = () => {

    const [page, setpage] = useState(1)
    const [posts, setposts] = useState([]);


    async function fetchPosts() {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}`);
        const result = await res.json();
        setposts(result);
    }

    useEffect(() => {
        fetchPosts()
    }, [page])


    return (
        <>
            <h2>Posts (page {page})</h2>
            <ul>

                {posts.map((post) => (
                    <li key={post.id}>
                        <span style={{ color: "blue" }}> {post.id} </span>
                        <span>{post.title}</span>
                    </li>
                ))}

                <button onClick={() => setpage(prev => prev - 1)} disabled={page===1}>Prev</button>
                <button onClick={() => setpage(prev => prev + 1)}>Next</button>

            </ul>

        </>
    );
}

export default Pagination;
