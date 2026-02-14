"use client";

import { useEffect, useState } from "react";

interface Opinion {
  id: number;
  title: string;
  category: string;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  total_votes: number;
  voting_expires_at: string | null;
  status: "LIVE" | "EXPIRED" | "NO_EXPIRY";
  created_at: string;
}

export default function Opinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchOpinions();
  }, [categoryFilter]);

  const fetchOpinions = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/opinions${categoryFilter ? `?category=${categoryFilter}` : ""}`
      );
      const data = await res.json();
      setOpinions(data);
    } catch (error) {
      console.error("Failed to fetch opinions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return "bg-green-100 text-green-700";
      case "EXPIRED":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Public Opinions</h1>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="Politics">Politics</option>
            <option value="Education">Education</option>
            <option value="Development">Development</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : opinions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No opinions found
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-sm uppercase text-gray-600">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Region</th>
                  <th className="p-4">Votes</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Expires</th>
                </tr>
              </thead>
              <tbody>
                {opinions.map((opinion) => (
                  <tr
                    key={opinion.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{opinion.title}</td>
                    <td className="p-4">{opinion.category}</td>
                    <td className="p-4">{opinion.region}</td>
                    <td className="p-4">{opinion.total_votes}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                          opinion.status
                        )}`}
                      >
                        {opinion.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {opinion.voting_expires_at
                        ? new Date(
                            opinion.voting_expires_at
                          ).toLocaleString()
                        : "No expiry"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
