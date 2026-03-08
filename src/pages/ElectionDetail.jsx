// src/pages/ElectionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function ElectionDetail() {
  const { slug } = useParams();
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [votingState, setVotingState] = useState({}); // true = voted
  const [submitting, setSubmitting] = useState({}); // loading per position

  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Fetch election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        setLoading(true);
        const res = await API.get(`elections/elections/${slug}/`);
        setElection(res.data);

        // Initialize votingState for positions already voted
        const initialVotes = {};
        res.data.positions.forEach((pos) => {
          if (pos.voted_by_user) initialVotes[pos.id] = true;
        });
        setVotingState(initialVotes);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          setError("🚫 You must log in to view this election.");
        } else {
          setError("Failed to load election details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchElection();

    // Optional: poll every 5s for live Redis vote counts
    const interval = setInterval(fetchElection, 5000);
    return () => clearInterval(interval);
  }, [slug]);

  // Handle voting
  const handleVote = async (candidateId, positionId) => {
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    if (!user.is_verified) {
      alert("Your account must be verified to vote.");
      return;
    }

    if (votingState[positionId] || submitting[positionId]) return;

    if (!window.confirm("Are you sure you want to vote for this candidate?"))
      return;

    setSubmitting((prev) => ({ ...prev, [positionId]: true }));

    try {
      const res = await API.post("elections/vote/", {
        candidate: candidateId,
        position: positionId,
        election: election.id,
      });

      alert(res.data.message);

      // Update local voting state
      setVotingState((prev) => ({ ...prev, [positionId]: true }));

      // Increment candidate votes locally for immediate UI feedback
      setElection((prev) => ({
        ...prev,
        positions: prev.positions.map((pos) =>
          pos.id === positionId
            ? {
                ...pos,
                candidates: pos.candidates.map((c) =>
                  c.id === candidateId
                    ? { ...c, total_votes: c.total_votes + 1 }
                    : c
                ),
              }
            : pos
        ),
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to cast vote.");
    } finally {
      setSubmitting((prev) => ({ ...prev, [positionId]: false }));
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Loading election details...
      </div>
    );

  if (error)
    return <div className="p-6 text-center text-red-500">{error}</div>;

  if (!election)
    return (
      <div className="p-6 text-center text-gray-500">
        Election not found.
      </div>
    );

  // Compute election status
  const now = new Date();
  const start = new Date(election.start_time);
  const end = new Date(election.end_time);
  let status = "Upcoming";
  if (now >= start && now <= end) status = "Active";
  if (now > end) status = "Ended";

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Upcoming: "bg-yellow-100 text-yellow-700",
    Ended: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Election Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">{election.name}</h1>
        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
        >
          {status}
        </span>
        <p className="text-gray-600 mt-4">
          {start.toLocaleString()} — {end.toLocaleString()}
        </p>
      </div>

      {/* Positions */}
      {election.positions?.length === 0 && (
        <p className="text-gray-500">No positions available.</p>
      )}

      {election.positions?.map((position) => (
        <div key={position.id} className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
            {position.title}
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {position.candidates?.map((candidate) => {
              const voted = votingState[position.id];
              const canVote =
                user && user.is_verified && !voted && status === "Active";

              return (
                <div
                  key={candidate.id}
                  className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={candidate.photo_url || "https://via.placeholder.com/150"}
                      alt={candidate.full_name}
                      className="w-32 h-32 rounded-full object-cover mb-4 border"
                    />

                    <h3 className="font-semibold text-lg">{candidate.full_name}</h3>

                    <div className="flex items-center gap-2 mt-2">
                      {candidate.party?.badge_url && (
                        <img
                          src={candidate.party.badge_url}
                          alt={candidate.party?.name}
                          className="w-6 h-6 object-cover rounded-full"
                        />
                      )}
                      <p className="text-gray-600 text-sm">
                        {candidate.party?.name} ({candidate.party?.abbreviation})
                      </p>
                    </div>

                    <p className="text-gray-500 text-sm mt-3">
                      Votes: {candidate.total_votes}
                    </p>

                    <button
                      className={`mt-4 px-4 py-2 rounded-lg transition font-medium ${
                        canVote
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      disabled={!canVote || submitting[position.id]}
                      onClick={() => handleVote(candidate.id, position.id)}
                    >
                      {submitting[position.id]
                        ? "Voting..."
                        : voted
                        ? "Voted"
                        : !user
                        ? "Login to vote"
                        : !user.is_verified
                        ? "Verify account"
                        : "Vote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}