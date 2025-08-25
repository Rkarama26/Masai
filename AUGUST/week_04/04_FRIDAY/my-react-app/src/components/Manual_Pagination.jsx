
import React, { useEffect, useState } from 'react';

const Manual_Pagination = () => {

    const [currentPage, setcurrentPage] = useState(1);
    const [posts, setposts] = useState([]);
    const postsPerPage = 10;


    async function fetchPosts() {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
        const result = await res.json();
        setposts(result);
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    const indexOfLastPost = currentPage * postsPerPage;
    const firstIndexOfPost = indexOfLastPost - postsPerPage

    const currentPosts = posts.slice(firstIndexOfPost, indexOfLastPost)

    return (
        <>
            <h2>Posts (page {currentPage})</h2>
            <ul>

                {currentPosts.map((post) => (
                    <li key={post.id}>
                        <span style={{ color: "blue" }}> {post.id} </span>
                        <span>{post.title}</span>
                    </li>
                ))}

                <button onClick={() => setcurrentPage(prev => prev - 1)} disabled={currentPage === 1}>Prev</button>
                <button onClick={() => setcurrentPage(prev => prev + 1)} disabled={currentPage === 20}>Next</button>

            </ul>

        </>
    );
}

export default Manual_Pagination;
