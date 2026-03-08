import { useEffect, useState } from "react";
import axios from "axios";
import { FaVoteYea, FaUsers, FaCheckCircle, FaChartBar } from "react-icons/fa";

export default function HeroSection() {
  const [stats, setStats] = useState({
    total_elections: 0,
    active_elections: 0,
    total_votes: 0,
    total_voters: 0,
  });

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost/api/elections/stats/");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div
      className="relative min-h-[500px] flex items-center justify-center text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/nairobi.jpg')",
      }}
    >
      {/* Gradient overlay – darker at bottom for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-6xl mx-auto">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
          Nairobi Digital Voting System
        </h1>

        <p className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-8 drop-shadow">
          Secure, transparent, and accessible elections for Nairobi County.
          Your vote matters. Your voice counts.
        </p>

        {/* CTA Button */}
        <button
          onClick={() =>
            document
              .getElementById("active-elections")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          View Active Elections
        </button>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {/* Active Elections */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-500/30 rounded-full mb-4 mx-auto">
              <FaChartBar className="text-blue-300 text-2xl" />
            </div>
            <p className="text-4xl font-bold">{stats.active_elections}</p>
            <p className="text-sm text-gray-300 uppercase tracking-wider mt-2">Active Elections</p>
          </div>

          {/* Registered Voters */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center w-14 h-14 bg-green-500/30 rounded-full mb-4 mx-auto">
              <FaUsers className="text-green-300 text-2xl" />
            </div>
            <p className="text-4xl font-bold">{stats.total_voters.toLocaleString()}</p>
            <p className="text-sm text-gray-300 uppercase tracking-wider mt-2">Registered Voters</p>
          </div>

          {/* Votes Cast */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-500/30 rounded-full mb-4 mx-auto">
              <FaVoteYea className="text-purple-300 text-2xl" />
            </div>
            <p className="text-4xl font-bold">{stats.total_votes.toLocaleString()}</p>
            <p className="text-sm text-gray-300 uppercase tracking-wider mt-2">Votes Cast</p>
          </div>

          {/* Total Elections (optional) */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-center w-14 h-14 bg-yellow-500/30 rounded-full mb-4 mx-auto">
              <FaCheckCircle className="text-yellow-300 text-2xl" />
            </div>
            <p className="text-4xl font-bold">{stats.total_elections}</p>
            <p className="text-sm text-gray-300 uppercase tracking-wider mt-2">Total Elections</p>
          </div>
        </div>
      </div>
    </div>
  );
}