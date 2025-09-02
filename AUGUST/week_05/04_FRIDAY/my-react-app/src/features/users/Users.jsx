import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from './userSlice';
import { useEffect } from 'react';

const Users = () => {

    const { data, loading, error } = useSelector(state => state.users);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error: {error}</p>


    return (
        <ul>
           {data.map((user) => (
            <li key={user.id}>{user.name}</li>
           ))}
        </ul>
    );
}

export default Users;
