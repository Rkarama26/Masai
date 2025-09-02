import axios from "axios";


export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"
export const SORT_DATA = "SORT_DATA"

export const fetchDataRequest = () => ({
    type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccecss = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: data
});

export const fetchDataFailure = (error) => ({
    type: FETCH_DATA_FAILURE,
    payload: error
});

export const sortData = (sortBy, order = "asc") => ({

    type: SORT_DATA,
    payload: { sortBy, order }
})


const URL = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee"
export const fetchCoffeeData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(URL)
            dispatch(fetchDataSuccecss(response.data.data))

        } catch (error) {
            dispatch(fetchDataFailure(error.message))
        }
    }
}