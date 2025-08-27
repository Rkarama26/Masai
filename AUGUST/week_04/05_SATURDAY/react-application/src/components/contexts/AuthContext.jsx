import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, loading: true, error: null, success: null };

    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: "Registration Successful!",
        isAuthenticated: true,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        success: "Login Successful!",
        isAuthenticated: true,
      };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated) {
      console.log("User is now authenticated", state);
    }
  }, [state.isAuthenticated]);




  // REGISTER
  async function register(email, password) {
    dispatch({ type: "SUBMIT" });
    try {
      const res = await axios.post(
        "https://auth-d2bdd-default-rtdb.firebaseio.com/users.json",
        { email, password }
      );
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { email, password, id: res.data.name },
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message || "Something went wrong",
      });
    }
  }

  // LOGIN
  async function login(email, password) {
    dispatch({ type: "SUBMIT" });
    try {
      const res = await axios.get(
        "https://auth-d2bdd-default-rtdb.firebaseio.com/users.json"
      );

      const users = res.data;
      const foundUser = Object.values(users || {}).find(
        (u) => u.email === email && u.password === password
      );
      console.log(foundUser)
      if (foundUser) {
        dispatch({ type: "LOGIN_SUCCESS", payload: foundUser });
        //navigate
        navigate("/dashboard")
      } else {
        dispatch({ type: "ERROR", payload: "Invalid email or password" });

      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.message || "Something went wrong",
      });
    }
  }

  // LOGOUT
  function logout() {
    dispatch({ type: "LOGOUT" });
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
