import React, { useEffect, useReducer } from 'react';

function apiReducer(state, action) {
    switch (action.type) {

        case 'FETCH_START':
            return { ...state, loading: true }

        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload }

        case 'FETCH_ERROR':
            return { ...state, loading: false, data: null, error: action.payload }

        default:
            return (null)

    }
}



const FetchData = () => {

    const [state, dispatch] = useReducer(apiReducer, {
        error: null,
        loading: false,
        data: null
    })


    async function fetchApiData() {
        dispatch({ type: 'FETCH_START' })
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
            const result = await res.json();
            console.log(result)
            dispatch({ type: 'FETCH_SUCCESS', payload: result })

        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error })
        }
    }

    useEffect(() => {
        fetchApiData()
    }, []);



    return (
        <div>

        </div>
    );
}

export default FetchData;
