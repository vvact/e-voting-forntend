// src/components/ElectionCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUsers, FaChevronRight } from "react-icons/fa";

export default function ElectionCard({ election }) {
  const navigate = useNavigate();
  const { slug, name, start_time, end_time, positions } = election;

  const startDate = new Date(start_time).toLocaleString();
  const endDate = new Date(end_time).toLocaleString();

  // Determine if election is active
  const now = new Date();
  const start = new Date(start_time);
  const end = new Date(end_time);
  const isActive = now >= start && now <= end;
  const isUpcoming = now < start;
  const isEnded = now > end;

  const handleClick = () => {
    navigate(`/elections/${slug}`);
  };

  // Status badge
  const getStatusBadge = () => {
    if (isActive) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    } else if (isUpcoming) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Upcoming
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
          Ended
        </span>
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        {/* Header with title and status */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {getStatusBadge()}
        </div>

        {/* Dates */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500 w-4 h-4" />
            <span className="font-medium">Starts:</span> {startDate}
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-indigo-500 w-4 h-4" />
            <span className="font-medium">Ends:</span> {endDate}
          </div>
        </div>

        {/* Positions */}
        {positions && positions.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-purple-500 w-4 h-4" />
              <h4 className="font-semibold text-gray-700">
                Positions ({positions.length})
              </h4>
            </div>
            <ul className="space-y-1">
              {positions.slice(0, 3).map((pos) => (
                <li
                  key={pos.id}
                  className="text-sm text-gray-600 flex items-center justify-between"
                >
                  <span>{pos.title}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {pos.candidates?.length ?? 0} candidate
                    {pos.candidates?.length !== 1 ? "s" : ""}
                  </span>
                </li>
              ))}
              {positions.length > 3 && (
                <li className="text-xs text-gray-500 mt-1">
                  +{positions.length - 3} more positions
                </li>
              )}
            </ul>
          </div>
        )}

        {/* View details arrow */}
        <div className="mt-4 flex justify-end">
          <div className="text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            View details <FaChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}