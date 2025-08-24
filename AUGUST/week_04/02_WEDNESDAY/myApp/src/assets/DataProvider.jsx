import React, { createContext, useState } from 'react';

//create context
export const DataContext = createContext();


const DataProvider = ({ children }) => {
    //state
    const [state, setstate] = useState({
        loading: false,
        error: null,
        data: null
    });

    // fetch function 
    async function fetchData() {
        setstate({ ...state, loading: true })

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
            const result = await response.json();
            setstate({ ...state, loading: false, data: result })
            console.log(result)

        } catch (error) {
            setstate({ ...state, loading: false, data: null, error: true });

        }

    }

    // create a provider
    return (
        <DataContext.Provider value={{ state, fetchData }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
