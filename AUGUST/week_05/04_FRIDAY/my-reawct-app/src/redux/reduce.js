

const initialState = {
    loading: false,
    data: null,
    error: null
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true }

        case 'FETCH_SUCCESS':
            return { loading: false, data: action.payload, error: null }

        case 'FETCH_ERROR':
            return { loading: false, data: null, error: action.error }
        default:
            return state;
    }
}

export default dataReducer