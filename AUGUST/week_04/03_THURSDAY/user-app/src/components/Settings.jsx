import React, { useContext, useState } from "react";
import { UserContext } from "./UserProvider ";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email });
    alert("User data updated!");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>Update</button>
      </form>
    </div>
  );
};

export default Settings;
