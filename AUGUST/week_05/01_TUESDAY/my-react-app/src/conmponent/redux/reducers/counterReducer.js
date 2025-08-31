
const initialState = {
    count: 0,
}


export function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return ({ count: state.count + 1 }) // return new state objext

        case 'DECREMENT':
            return ({ count: state.count - 1 }) // return new state objext

        default:
            return state

    }

}


