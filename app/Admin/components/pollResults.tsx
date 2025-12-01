"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  Tooltip,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
  Legend,
} from "recharts";
import Link from "next/link";

import {
  BarChart2,
  PieChart as PieChartIcon,
  Info,
  Hand,
  Clock,
  Users,
  X,
} from "lucide-react";
import { baseURL } from "@/app/config/baseUrl";

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
  percentage: string;
}

interface PollData {
  id: number;
  title: string;
  region: string;
  totalVotes: number;
  results: Candidate[];
  created_at: Date | string;
}

const COLORS = [
  "#ca8a04",
  "#be123c",
  "#6d28d9",
  "#16a34a",
  "#1e40af",
  "#9333ea",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PollResults = ({ pollId }: { pollId?: number }) => {
  const { data, error, isLoading } = useSWR<PollData>(
    pollId ? `${baseURL}/api/polls/${pollId}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );
 const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);
  if (isLoading) {
    return (
      <div className=" flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">
            Loading poll results...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className=" flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg text-red-600">
          <X className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium">
            Error loading poll data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const chartData = (data.results || []).map((candidate: Candidate) => ({
    id: candidate.id,
    name: candidate.name,
    votes: candidate.voteCount,
    percentage: parseFloat(candidate.percentage),
  }));

  return (
    <div className=" bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className=" bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3 flex items-center justify-center">
            <BarChart2 className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />
            {data.title || "Poll Results"}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" /> Region:
            <span className="font-semibold ml-1">{data.region}</span>
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-medium mb-1 flex items-center justify-center">
            <Users className="w-4 h-4 mr-2 text-gray-500" /> Total Votes:
            <span className="ml-1">
              {data.totalVotes?.toLocaleString?.() || "0"}
            </span>
          </p>
          <p className="text-gray-600 text-base sm:text-lg font-medium flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" /> Last Updated:
            <span className="font-semibold ml-1">
              {new Date(data.created_at).toLocaleString("en-KE")}
            </span>
          </p>
        </div>
        {/* Pie Chart Section */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <PieChartIcon className="w-5 h-5 mr-2 text-purple-600" /> Vote
            Distribution by Candidate
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${((percent??0) * 100).toFixed(1)}%`
                }
                labelLine={false}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`pie-cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, props: any) => [
                  `${value.toLocaleString()} votes`,
                  props.payload.name,
                ]}
              />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Results Table */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Detailed Results
        </h3>
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">
                  Candidate
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                  Percentage (%)
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider">
                  Progress
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                  Votes
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((candidate, index) => (
                
                <tr
                  key={candidate.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {candidate.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {candidate.percentage.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${candidate.percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {candidate.votes.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href={`/FullvotesInterface?id=${pollId}`} passHref>
            <button className="flex items-center justify-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
              <Info className="w-5 h-5 mr-2" /> Full Details
            </button>
          </Link>
           {mounted && isAdmin && (
          <a href={`/vote/${pollId}`}>
            <button className="flex items-center justify-center px-3 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
              <Hand className="w-5 h-5 mr-2" /> Vote Now
            </button>
          </a>)}
        </div>
      </div>
    </div>
  );
};

export default PollResults;
