import React from 'react';
import { useNavigate } from "react-router"


const LandingPage = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        alert("Login Success");
        navigate("/home") // navigate bt routes
    }

    return (
        <div>
            <h1>LandingPage</h1>
            <button onClick={handleLogin}>Log-in</button>
        </div>
    );
}

export default LandingPage;
