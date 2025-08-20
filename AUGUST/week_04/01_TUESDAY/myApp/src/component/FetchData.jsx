import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const FetchData = () => {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");


    // 2. useEffect also ensure that the code inside,
    //  it runs after the component is mounted

    useEffect(() => {


        setloading(true);
        async function fetchData() {
            setloading(true);
            try {
                let res = await fetch('https://jsonplaceholder.typicode.com/posts')
                if (!res.ok) {
                    throw new Error("Failed to fetch");
                }
                let result = await res.json()
                console.log(result)
                setdata(result);
            } catch (error) {
                seterror(error.message);

            } finally {
                setloading(false);
            }
        }
        fetchData();
    }, [])



    if (error) {
        return <h1 style={{ color: '#ff4d4f' }}>Error: {error}</h1>;
    }



    if (loading) {
        return <h1 style={{ color: '#646cff' }}>Loading...</h1>;
    }

    return (
        <div>

            <h1>Posts</h1>
            {data.slice(0, 5).map((post) => (
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    );
}

export default FetchData;
