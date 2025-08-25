import React from 'react';
import { Link } from "react-router"


const AllApps = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-around", padding: "1rem", background: "#f0f0f0" }}>
            <Link to="/blogapp" style={{ textDecoration: "none", color: "black" }}>BlogApp</Link>
            <Link to="/weatherapp" style={{ textDecoration: "none", color: "black" }}>WeatherApp</Link>
        </div>
    );
}

export default AllApps;
