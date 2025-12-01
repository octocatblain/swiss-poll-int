"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Loader2,
  Frown,
  CalendarDays,
  MapPin,
  Rows4,
  Tag,
} from "lucide-react";
import { baseURL } from "@/app/config/baseUrl";
import CountyPolls from "./poll/page";

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

const LivePollsPage = () => {
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
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      {/* <CountyPolls /> */}
      <div className=" bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-gray-200">
        
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center flex items-center justify-center">
          <Rows4 className="mr-3 text-blue-600 w-10 h-10" /> Live Polls
        </h1>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {polls.map((poll) => (
            <div
              key={poll.id}
              className="border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-blue-500 to-indigo-500 p-4 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white">
                  {poll.title}
                </h2>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col grow">

                {/* Category */}
                {poll.category && (
                  <span className="inline-flex items-center w-fit px-3 py-1 mb-4 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                    <Tag className="w-4 h-4 mr-1" /> {poll.category}
                  </span>
                )}

                {/* Location Section */}
                <div className="mb-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">Location</h3>
                  <div className="text-gray-600 space-y-1 text-sm">
                    <p>Region: <span className="font-medium">{poll.region || "N/A"}</span></p>
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      County: {poll.county || "N/A"} | 
                      <span className="ml-1">Const: {poll.constituency || "N/A"}</span> |
                      <span className="ml-1">Ward: {poll.ward || "N/A"}</span>
                    </p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="flex items-center text-gray-600 text-sm border-t pt-3">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                  Created:{" "}
                  <span className="ml-1 font-medium">
                    {new Date(poll.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t bg-gray-50 rounded-b-2xl">
                <Link
                  href={`/livepolls/FullvotesInterface?id=${poll.id}`}
                  className="block text-center w-full py-2.5 rounded-lg font-semibold text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  View Poll
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LivePollsPage;
