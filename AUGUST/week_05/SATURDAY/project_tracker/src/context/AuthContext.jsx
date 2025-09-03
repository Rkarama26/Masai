import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const baseURL = "https://auth-d2bdd-default-rtdb.firebaseio.com/"


export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null);

    //register
    const register = async (email, password) => {
        const newUser = { email, password }

        try {
            const res = await axios.post(`${baseURL}users.json`, newUser);
            if (res.status === 200) {
                setuser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    //Login
    const login = async (email, password) => {
        const res = await axios.get(`${baseURL}users.json`)
        const users = res.data;

        let foundUser = null;

        for (const key in users) {
            if (users[key].email === email && users[key].password === password) {
                foundUser = { id: key, ...users[key] };
                break;
            }
        }

        if (!foundUser) throw new Error("Invalid credentials");

        setuser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));

    }
    //logout
    const logout = () => {
        setuser(null);
        localStorage.removeItem("user");
    };


    //restore session
    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setuser(JSON.parse(saved));
    }, []);


    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )



}