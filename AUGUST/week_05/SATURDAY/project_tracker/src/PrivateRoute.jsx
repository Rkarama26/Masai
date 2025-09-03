// PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);  // <--- NOT useSelector from redux

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
