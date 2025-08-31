
const initialState = {
    isAuthenticated: false
}


export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return ({ isAuthenticated: true }) // return new state objext

        case 'LOGOUT':
            return ({ isAuthenticated: false }) // return new state objext

        default:
            return state

    }

}