// src/components/ProtectedRoute.jsx
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access");
  const location = useLocation();

  if (!token) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🚫 You must log in to access this page</h2>
        <p>Please login or register to continue.</p>
        <button onClick={() => window.location.href = "/login"}>Login</button>
        <button onClick={() => window.location.href = "/register"}>Register</button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;