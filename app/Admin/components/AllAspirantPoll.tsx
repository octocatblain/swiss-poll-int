"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { Loader2, Frown, CalendarDays, MapPin, Rows4, Info, Hand } from "lucide-react";
import EditDelete from "../createpoll/EditDelete";
import { baseURL } from "@/app/config/baseUrl";

export interface PollData {
  id: number;
  title: string;
  category?: string;
  region?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  created_at: Date | string;
}

const AllApirantPollPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch polls.");
        }
        const data: PollData[] = await response.json();
        setPolls(data);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred while fetching polls.");
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
        <p className="text-xl text-red-700 font-semibold mb-2">Error:</p>
        <p className="text-lg text-red-600 text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-2 sm:p-3 lg:p-3 font-inter">
      <div className="mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center">
          <Rows4 className="mr-3 text-blue-600 w-10 h-10" /> All Aspirants
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
                  {poll.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">{poll.category}</span>
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p className="flex items-center">Region: {poll.region || "N/A"}</p>
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                 County:{poll.county || "N/A"} | Const: {poll.constituency || "N/A"} |   Ward: {poll.ward || "N/A"} 
                  </p>
                  <p className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                    Created: {new Date(poll.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ✅ Buttons Section */}
              <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
                <Link
              href={`/livepolls/FullvotesInterface?id=${poll.id}`} passHref
                  className="block text-blue-600 font-semibold hover:underline grow text-center py-2 px-3 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  View
                </Link>
       <a href={`/Admin/vote/${poll.id}`}>
            <button className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
              <Hand className="w-5 h-5 mr-2" /> Vote Now
            </button>
          </a>
                <EditDelete pollId={poll.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllApirantPollPage;
