import { useState, useEffect } from "react";
import API from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Verify() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(3600); // 1 hour in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("email");

  // ------------------------
  // Countdown effect
  // ------------------------
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // ------------------------
  // Handle OTP Verification
  // ------------------------
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await API.post("accounts/verify-otp/", {
        email,
        code: otp,
      });

      setMessage(response.data.message || "Account verified successfully!");
      localStorage.removeItem("email");

      setTimeout(() => navigate("/login"), 1500); // redirect after success
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data.error || "Invalid OTP. Please try again.");
    }
  };

  // ------------------------
  // Handle Resend OTP
  // ------------------------
  const handleResend = async () => {
    setError("");
    setMessage("");

    try {
      const response = await API.post("accounts/resend-otp/", { email });
      setMessage(response.data.message);
      setTimer(3600); // reset timer
      setResendDisabled(true);
    } catch (err) {
      setError(err.response?.data.error || "Cannot resend OTP right now.");
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
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>
        )}

        {message && (
          <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">{message}</div>
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

        <div className="mt-4 text-center text-sm text-gray-500">
          {resendDisabled ? (
            <span>
              You can request a new OTP in <strong>{formatTime(timer)}</strong>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
