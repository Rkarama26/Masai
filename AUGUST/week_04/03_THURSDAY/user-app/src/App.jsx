import React from "react";
import {  Routes, Route, Link } from "react-router";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { UserProvider } from "./components/UserProvider ";


function App() {
  return (
    <UserProvider>
    
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          <Link to="/profile" style={{ marginRight: "1rem" }}>Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
   
    </UserProvider>
  );
}

export default App;
