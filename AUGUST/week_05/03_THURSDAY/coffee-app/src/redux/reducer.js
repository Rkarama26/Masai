import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, SORT_DATA } from "./action"


const initialState = {
    loading: false,
    data: [],
    error: "",
}

const coffeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return { ...state, loading: true }

        case FETCH_DATA_SUCCESS:
            return { ...state, loading: false, data: action.payload, error: "" };

        case FETCH_DATA_FAILURE:
            return { ...state, loading: false, data: [], error: action.payload };

        case SORT_DATA:
            const { sortBy, order } = action.payload;
            const sortedData = [...state.data].sort((a, b) => {
                if (sortBy === "name") {
                    return order === "asc"
                        ? a.title.localeCompare(b.title)
                        : b.title.localeCompare(a.title);
                } else if (sortBy === "price") {
                    return order === "asc" ? a.price - b.price : b.price - a.price;
                } else {
                    return 0;
                }
            });
            return { ...state, data: sortedData };
        default:
            return state;
    }
}

export default coffeeReducer;