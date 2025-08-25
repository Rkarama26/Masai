import React from 'react';
import Home from './Home';
import { Navigate, Route, Routes } from "react-router"
import About from './About';
import NavBar from './NavBar';
import PostDetails from './PostDetails';



const BlogApp = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate to="home" replace />} />

                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="postdetails/:id" element={<PostDetails />} />
            </Routes>


        </>
    );
}

export default BlogApp;
