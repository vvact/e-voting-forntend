// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ElectionDetail from "./pages/ElectionDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Simple auth check
const isLoggedIn = () => !!localStorage.getItem("access");

// ProtectedRoute component
function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    alert("You must be logged in to view this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Election Details (can show voting info conditionally) */}
        <Route
          path="/elections/:slug"
          element={
            <ProtectedRoute>
              <ElectionDetail />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="p-6 text-center text-gray-500">
              Page Not Found
            </div>
          }
        />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
