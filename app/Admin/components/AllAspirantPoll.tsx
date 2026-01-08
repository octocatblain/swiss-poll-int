"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Frown, CalendarDays, MapPin, Rows4, Hand, Info } from "lucide-react";
import EditDelete from "../createpoll/EditDelete";
import { baseURL } from "@/app/config/baseUrl";

export interface PollData {
  id: number;
  title: string;
  category?: string | null;
  region?: string | null;
  county?: string | null;
  constituency?: string | null;
  ward?: string | null;
  created_at: string | Date;
}

const AllApirantPollPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls`, {
          cache: "no-store", 
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        // ✅ Safety: ensure it's an array
        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          throw new Error("Invalid data format from server");
        }

        // Normalize nulls to undefined or empty strings if needed
        const normalizedPolls: PollData[] = data.map((poll: any) => ({
          id: poll.id,
          title: poll.title || "Untitled Poll",
          category: poll.category ?? "Uncategorized",
          region: poll.region ?? null,
          county: poll.county ?? null,
          constituency: poll.constituency ?? null,
          ward: poll.ward ?? null,
          created_at: poll.created_at || new Date(),
        }));

        setPolls(normalizedPolls);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load polls. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolls();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        <p className="ml-4 text-xl text-gray-700">Loading polls...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <Frown className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-red-700 font-semibold mb-2">Error Loading Polls</p>
        <p className="text-lg text-red-600 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Info className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No polls available yet.</p>
        <Link href="/create-poll" className="mt-6 text-blue-600 hover:underline">
          Create the first poll →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className=" bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <Rows4 className="mr-3 text-blue-600 w-10 h-10" />
          All Aspirants Polls
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {poll.title}
                </h2>
                <EditDelete pollId={poll.id} />
              </div>

              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">{poll.category || "No category"}</span>
              </p>

              <div className="text-sm text-gray-500 space-y-2 mb-4">
                {poll.region && (
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {poll.region}
                  </p>
                )}
                {(poll.county || poll.constituency || poll.ward) && (
                  <p className="text-xs">
                    {poll.county && `County: ${poll.county}`}
                    {poll.constituency && ` | Const: ${poll.constituency}`}
                    {poll.ward && ` | Ward: ${poll.ward}`}
                  </p>
                )}
                <p className="flex items-center text-xs">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                  {new Date(poll.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/livepolls/FullvotesInterface?id=${poll.id}`}
                  className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
                >
                  View Results
                </Link>

                <Link
                  href={`/Admin/vote/${poll.id}`}
                  className="flex-1"
                >
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
                    <Hand className="w-5 h-5 mr-2" />
                    Vote Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApirantPollPage;