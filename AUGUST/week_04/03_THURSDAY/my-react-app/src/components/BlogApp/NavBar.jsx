import React from 'react';
import { Link } from "react-router"


const NavBar = () => {
    return (
        <div style={{ position: "sticky", top: "0", width: "100%", display: "flex", justifyContent: "space-around", padding: "1rem", background: "linear-gradient(to right, #2d3538 0%, #a1a3a6 100%)" }}>
            <Link to="/blogapp/home"   style={{ textDecoration: "none", color: "black" }}>home</Link>
            <Link to="/blogapp/about" style={{ textDecoration: "none", color: "black" }}>About</Link>
            
        </div>
    );
}

export default NavBar;
