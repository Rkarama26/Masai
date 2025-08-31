import React from 'react';
import { login, logout } from './redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';


const Auth = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    return (
        <div>
            <h2> {isAuthenticated ? "Logged In" : "Logged Out"} </h2>
            {isAuthenticated ? (<button onClick={() => dispatch(logout())}>Logout</button>
            ) : (<button onClick={() => dispatch(login())}>Login</button>)}

        </div>
    );
}

export default Auth;
