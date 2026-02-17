import { useNavigate } from "react-router-dom";

// Dummy data for now
const elections = [
  { id: 1, name: "Governor Election", date: "2026-03-01" },
  { id: 2, name: "Senator Election", date: "2026-03-01" },
];

const topCandidates = [
  { id: 1, name: "John Doe", position: "Governor" },
  { id: 2, name: "Jane Smith", position: "Senator" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to E-Voting System</h1>
        <p className="text-xl mb-8">
          Transparent and secure voting for everyone
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition"
        >
          Login to Vote
        </button>
      </section>

      {/* Upcoming Elections */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Elections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {elections.map((e) => (
            <div
              key={e.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => navigate(`/vote/${e.id}`)}
            >
              <h3 className="text-xl font-semibold">{e.name}</h3>
              <p className="text-gray-500 mt-2">Date: {e.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Candidates */}
      <section className="py-16 px-8 bg-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Candidates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topCandidates.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="text-gray-500 mt-1">{c.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          1️⃣ Login with your email & national ID.<br />
          2️⃣ Select an election from the dashboard.<br />
          3️⃣ Vote securely and see the results instantly after the election ends.
        </p>
      </section>
    </div>
  );
}
