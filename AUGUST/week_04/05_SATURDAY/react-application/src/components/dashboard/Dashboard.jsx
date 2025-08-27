import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes } from "react-router"


const Dashboard = () => {
    return (
        <div className="bg-white h-[1000px] text-black dark:bg-gray-800 dark:text-white">
            <Navbar />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">This is my dashboard</h1>
                <p className="mb-2">Some content here that changes with theme.</p>
                <p>Scroll down to see the navbar stick!</p>
                <p className="mt-96">More content to make scrolling visible...</p>
            </div>
        </div>

    );
}

export default Dashboard;
