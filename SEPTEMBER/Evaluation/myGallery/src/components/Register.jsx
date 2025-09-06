import React from 'react'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router';

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setmessage] = useState("");
    const { register } = useContext(AuthContext);
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            setmessage("User registered successfully!");
            navigate("/dashboard");
        } catch (err) {
            setmessage("Registering failed");
        }
    };

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[250px] sm:w-[300px] lg:w-[400px]">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md">


                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Register</h2>
                        <p className="text-sm text-gray-500">
                            Please provide your contact details below.
                        </p>
                    </div>

                    {/* Email  */}
                    <div className="mb-4 text-left">
                        <label className="block text-sm font-medium">Email Address</label>
                        <span className="block text-xs text-gray-500 mb-1">
                            (use - root@gmail.com)
                        </span>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            name="Email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password  */}
                    <div className="mb-4 text-left">
                        <label className="block text-sm font-medium">Password</label>
                        <span className="block text-xs text-gray-500 mb-1">(use - root)</span>
                        <input
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            name="password"
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/*  Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-2"
                    >
                        Register
                    </button>

                    {/* Redirect to Login */}
                    <p className="text-xs text-gray-600 text-left">
                        Don't have an Account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login here
                        </Link>
                    </p>

                    {/* Message */}
                    {message && <p className="mt-2 text-sm text-black">{message}</p>}
                </form>
            </div>
        </>
    )
}
