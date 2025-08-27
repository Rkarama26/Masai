import React, { useEffect, useReducer } from 'react';
import { Routes } from "react-router"
import axios from 'axios';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';


const initialState = {
    search: "",
    movies: [],
    loading: false,
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "FETCH_START":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, movies: action.payload, error: "" };
        case "FETCH_ERROR":
            return { ...state, loading: false, movies: [], error: action.payload };
        default:
            return state;
    }
}


const Dashboard = () => {
    const { darkMode, setDarkMode } = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { logout } = useAuth()

    const fetchMovie = async (query) => {
        if (!query) return;
        dispatch({ type: "FETCH_START" });

        try {
            const response = await axios.get(
                `https://www.omdbapi.com/?apikey=ce71831e&s=${query}`
            );
            console.log("response: ", response)

            if (response.data.Response === "True") {
                dispatch({ type: "FETCH_SUCCESS", payload: response.data.Search });
            } else {
                dispatch({ type: "FETCH_ERROR", payload: response.data.Error });
            }
        } catch (err) {
            dispatch({
                type: "FETCH_ERROR",
                payload: "Something went wrong. Please try again.",
            });
        }
    };

    // Debounce the search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (state.search.trim() !== "") {
                fetchMovie(state.search);
            } else {
                dispatch({ type: "FETCH_SUCCESS", payload: [] }); // clear movies if empty
            }
        }, 300); // 500ms debounce

        return () => clearTimeout(handler); // clean timeout
    }, [state.search]);


    return (
        <>
            <div className="min-h-screen text-black transition duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white">

                <nav className="sticky z-50 flex items-center justify-between w-4/5 px-6 py-4 mx-auto 
            bg-[linear-gradient(to_right,_#fec76f_0%,_#c3e7ff_100%)] 
            text-black dark:text-gray-500 dark:bg-[linear-gradient(to_right,_#4ab1d2_0%,_#2d3538_100%)]
            hover:opacity-80 transition-opacity duration-300 rounded-full shadow-lg top-5">

                    {/* Nav Links (hidden on mobile) */}
                    <div className="hidden space-x-10 text-xl font-bold text-black md:flex dark:text-gray-300">
                        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Home</a>
                        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">About</a>
                        <a href="#" className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Contact</a>
                    </div>

                    {/* Mobile & Desktop Controls */}
                    <div className="flex items-center space-x-4">

                        {/* Search Bar (full width on mobile, fixed on desktop) */}
                        <div className="flex-1 md:flex-none">
                            <input
                                type="text"
                                value={state.search}
                                placeholder="Search movies..."
                                onChange={(e) =>
                                    dispatch({ type: "SET_SEARCH", payload: e.target.value })
                                }
                                className="w-full max-w-xs px-4 py-2 text-gray-700 transition duration-300 border border-gray-400 rounded-full sm:max-w-sm md:w-80 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="relative w-16 h-8 transition-colors duration-300 bg-gray-300 rounded-full shadow-inner dark:bg-gray-700"
                        >
                            <span
                                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-8 bg-yellow-400" : ""
                                    }`}
                            ></span>
                        </button>

                        {/* Logout Button (optional on mobile) */}
                        <button
                            onClick={logout}
                            className="hidden px-4 py-2 font-semibold text-white transition-colors duration-300 bg-red-500 rounded-full shadow-md md:inline hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </nav>



                {/* movie cards */}

                <div className="p-4">
                    <div className="p-4">
                        {/* Capsule Search Bar */}


                        {/* Loading, Error, Movies */}
                        {state.loading && <p className="mt-4">Loading...</p>}
                        {state.error && <p className="mt-4 text-red-500">{state.error}</p>}

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4">
                            {state.movies.map((movie) => (
                                <div key={movie.imdbID} className="p-2 border rounded">
                                    <img
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        className="object-cover w-full h-64 rounded"
                                    />
                                    <h3 className="mt-2 font-bold">{movie.Title}</h3>
                                    <p>{movie.Year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Dashboard;
