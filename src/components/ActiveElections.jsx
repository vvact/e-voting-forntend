import { useEffect, useState } from "react";
import axios from "axios";
import ElectionCard from "./ElectionCard";

export default function ActiveElections() {
  const [activeElections, setActiveElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveElections();
  }, []);

  const fetchActiveElections = async () => {
    try {
      const res = await axios.get("http://localhost/api/elections/active/");
      setActiveElections(res.data);
    } catch (error) {
      console.error("Error fetching active elections:", error);
      setActiveElections([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="active-elections" className="mt-14">
      <h2 className="text-2xl font-bold mb-6">Active Elections</h2>

      {loading ? (
        <p>Loading active elections...</p>
      ) : activeElections.length === 0 ? (
        <p className="text-gray-500">No active elections right now.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {activeElections.map((election) => (
            <ElectionCard key={election.id} election={election} />
          ))}
        </div>
      )}
    </section>
  );
}
