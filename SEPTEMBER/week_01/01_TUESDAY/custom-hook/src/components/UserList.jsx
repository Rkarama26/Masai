import React from "react";
import { useFetch } from "../hooks/useFetch";

export default function UserList() {

    //using custom hook 
    const { data: users, loading, error } = useFetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email})
                </li>
            ))}
        </ul>
    );
}
