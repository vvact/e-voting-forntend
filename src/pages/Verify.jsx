import { useState } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email from navigate state or fallback to localStorage
  const email = location.state?.email || localStorage.getItem("email");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("accounts/verify-otp/", {
        email: email,
        code: otp,
      });

      console.log(response.data);
      alert("Account verified successfully!");

      // ✅ Clean up email from localStorage
      localStorage.removeItem("email");

      // Redirect to login page
      navigate("/login");

    } catch (error) {
      console.log(error.response?.data);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the OTP sent to your email: <span className="font-medium">{email}</span>
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Verify Account
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Didn't receive OTP? <span className="text-blue-600 cursor-pointer hover:underline">Resend</span>
        </p>

      </div>
    </div>
  );
}

export default Verify;
