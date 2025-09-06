import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext';

export default function () {


    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setmessage] = useState("");
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setmessage("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            setmessage("Invalid email or password");
        }
    };

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[250px] sm:w-[300px] lg:w-[400px]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md"
            >
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Login</h2>
                </div>

                {/* Email */}
                <div className="mb-4 text-left">
                    <label className="block text-sm font-medium">Email Address</label>
                    <span className="block text-xs text-gray-500 mb-1">
                        (use - demo@gmail.com)
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

                {/* Password */}
                <div className="mb-4 text-left">
                    <label className="block text-sm font-medium">Password</label>
                    <span className="block text-xs text-gray-500 mb-1">(use - demo)</span>
                    <input
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        name="password"
                        type="password"
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-2"
                >
                    Login
                </button>


                <p className="text-xs text-gray-600 text-left">
                    Don’t have an Account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Create here
                    </Link>
                </p>

                {/* Message */}
                {message && <p className="mt-2 text-sm text-black">{message}</p>}
            </form>
        </div>
    )
}
