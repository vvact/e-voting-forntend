import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await API.post("accounts/register/", {
        full_name: fullName.toUpperCase(), // ✅ convert to uppercase
        email: email,
        national_id: nationalId,
        password: password,
      });

      console.log(response.data);

      // Store email for verification fallback
      localStorage.setItem("email", email);

      // Navigate to OTP verification page
      navigate("/verify", { state: { email } });
    } catch (error) {
      console.log(error.response?.data);

      // Check if backend returned structured field errors
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "Registration failed. Please check your details." });
      }
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
            Create Account
          </h1>
          <p className="text-gray-500 mt-2">Join us today</p>
        </div>

        {/* General error */}
        {errors.general && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-sm font-medium">{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                👤
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value.toUpperCase())} // ✅ show uppercase as typed
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                placeholder="Full Name"
                autoComplete="name"
              />
            </div>
            {errors.full_name && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>❗</span> {errors.full_name[0]}
              </p>
            )}
          </div>

          {/* Email */}
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
            {errors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>❗</span> {errors.email[0]}
              </p>
            )}
          </div>

          {/* National ID */}
          <div>
            <label htmlFor="nationalId" className="sr-only">
              National ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                🆔
              </span>
              <input
                id="nationalId"
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                placeholder="National ID"
                autoComplete="off"
              />
            </div>
            {errors.national_id && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>❗</span> {errors.national_id[0]}
              </p>
            )}
          </div>

          {/* Password with toggle */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                🔒
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition bg-white/50"
                placeholder="Password"
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
            {errors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span>❗</span> {errors.password[0]}
              </p>
            )}
          </div>

          {/* Submit button */}
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
                <span>Creating account...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;