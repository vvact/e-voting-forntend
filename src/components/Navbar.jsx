import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="font-bold text-xl">
          E-Voting
        </Link>

        {/* Public Links */}
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          
        </div>
      </div>
    </nav>
  );
}
