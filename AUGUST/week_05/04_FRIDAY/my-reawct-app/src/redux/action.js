
export const fetchData = () => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_START" });

        try {
            let response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
            let result = await response.json()
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", error: "Failed to fetch" })
        }
    }
}