import React from 'react';
import { Navigate, Route, Routes } from "react-router"
import NavBar from './NavBar';
import Home from './Home';
import WeatherDetails from './WeatherDetails ';


const WeatherApp = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="WeatherDetails/:city" element={<WeatherDetails />} /> 
            </Routes>



        </>
    );
}

export default WeatherApp;
