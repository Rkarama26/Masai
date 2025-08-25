// WeatherDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WeatherDetails = () => {
    const { city } = useParams();
    const [weather, setWeather] = useState(null);
    const key = "3b7805abe1d1de9e828cff94c0734030";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Get coordinates of the city
                const geoRes = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
                );
                const geoData = await geoRes.json();

                if (geoData.length === 0) {
                    alert("City not found!");
                    return;
                }

                const { lat, lon } = geoData[0];

                // Get weather using coordinates
                const weatherRes = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
                );
                const weatherData = await weatherRes.json();
                setWeather(weatherData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeather();
    }, [city]);

    if (!weather) {
        return <div>Loading weather...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 mt-20 bg-white rounded shadow-md">
            <h1 className="mb-4 text-3xl font-bold">Weather in {city}</h1>
            <p className="mb-2 text-xl">Temperature: {weather.main.temp}°C</p>
            <p className="mb-2 text-xl">Humidity: {weather.main.humidity}%</p>
            <p className="text-xl">Condition: {weather.weather[0].description}</p>
        </div>
    );
};

export default WeatherDetails;
