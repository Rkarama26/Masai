// Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {  
        if (city.trim() !== "") {
            navigate(`/weatherapp/WeatherDetails/${city}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="mb-6 text-4xl font-bold">Weather App</h1>
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Home;
