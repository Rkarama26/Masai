import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '../redux/action';


const FetchData = () => {

    const { loading, data, error } = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])


    return (
        <div>
            <h2>Aync data fetching with redux Thunk</h2>
            {loading && <p>Loading...</p> }
            {error && <p>{error}</p> }
            {data && (
                <div>
                    <h1>Fetched data</h1>
                    <p>{data.id}</p>
                    <p>Title: {data.title}</p>
                </div>
            ) }
        </div>
    );
}

export default FetchData;
