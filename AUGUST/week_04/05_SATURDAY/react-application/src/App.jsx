import { useState, useEffect } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { useAuth } from "./components/contexts/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router"
import PrivateRoute from "./components/routes/PrivateRoute";


function App() {

  const { isAuthenticated, logout } = useAuth()


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Register />} />


      </Routes>


    </>
  );
}

export default App;
