import React from 'react';
import { Link } from "react-router"


const Navbar = () => {
    return (

        <div style={{ display: "flex", justifyContent: "space-around", padding: "1rem", background: "#f0f0f0" }}>
            <Link to="/home" style={{ textDecoration: "none", color: "black" }}>Home</Link>
            <Link to="/about" style={{ textDecoration: "none", color: "black" }}>About</Link>
            <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>Contact</Link>
            <Link to="/products" style={{ textDecoration: "none", color: "black" }}>products</Link>
        </div>

    );
}

export default Navbar;
