import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = request OTP, 2 = reset password
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
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

  // -------------------------
  // Request Reset OTP
  // -------------------------
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("accounts/password-reset/request/", { email });
      setMessage(response.data.message || "OTP sent to your email");
      setStep(2);
      setTimer(3600); // 1 hour countdown
      setResendDisabled(true);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data.error || "Cannot send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Confirm Password Reset
  // -------------------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await API.post("accounts/password-reset/confirm/", {
        email,
        otp,
        new_password: newPassword,
      });
      setMessage(response.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data.error || "Failed to reset password. Check OTP and try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Resend OTP
  // -------------------------
  const handleResend = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const response = await API.post("accounts/request-password-reset/", { email });
      setMessage(response.data.message || "OTP sent again");
      setTimer(3600);
      setResendDisabled(true);
    } catch (err) {
      setError(err.response?.data.error || "Cannot resend OTP right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      {/* Main card */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>
          <p className="text-gray-500 mt-2">
            {step === 1
              ? "Enter your email to receive a reset code"
              : "Check your email for the OTP"}
          </p>
        </div>

        {/* Error & success messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 flex items-start gap-2">
            <span className="text-lg">✅</span>
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        {step === 1 ? (
          // -------------------------
          // Step 1: Request OTP
          // -------------------------
          <form onSubmit={handleRequestOTP} className="space-y-5">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                  📧
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                  placeholder="Email Address"
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        ) : (
          // -------------------------
          // Step 2: Reset Password
          // -------------------------
          <form onSubmit={handleResetPassword} className="space-y-5">
            {/* OTP field */}
            <div>
              <label htmlFor="otp" className="sr-only">
                OTP Code
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                  🔑
                </span>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                  placeholder="Enter OTP"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* New password with toggle */}
            <div>
              <label htmlFor="newPassword" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                  🔒
                </span>
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={4}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                  placeholder="New Password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Resetting...</span>
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        {/* Resend OTP section (only in step 2) */}
        {step === 2 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {resendDisabled ? (
              <p>
                Resend available in{" "}
                <span className="font-mono font-semibold text-blue-600">
                  {formatTime(timer)}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}

        {/* Back to login link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;