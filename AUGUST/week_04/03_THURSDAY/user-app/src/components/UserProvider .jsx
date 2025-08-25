import React, { createContext, useState } from "react";

// 1 Create context
export const UserContext = createContext();

// 2 Context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
