"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Loader2, Frown, BarChart, PieChart as PieChartIcon, MessageSquareText, Users, Scale } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { baseURL } from '@/app/config/baseUrl';
interface Competitor {
  id: number;
  name: string;
  party: string;
  profileImage: string | null;
}

interface Option {
  id: number;
  optionText: string;
}

interface Question {
  id: number;
  type: 'single-choice' | 'open-ended' | 'yes-no-notsure';
  questionText: string;
  options?: Option[];
  isCompetitorQuestion?: boolean;
}

interface PollData {
  id: number;
  title: string;
  category: string;
  presidential: string | null;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  createdAt: string;
  competitors: Competitor[];
  questions: Question[];
}

interface AggregatedResponse {
  questionId: number;
  questionText: string;
  type: 'single-choice' | 'open-ended' | 'yes-no-notsure';
  isCompetitorQuestion?: boolean;
  totalResponses: number;
  choices?: {
    id: number | string;
    label: string;     
    count: number;
    percentage: number;
  }[];
  openEndedResponses?: string[];
}

interface DemographicsData {
  gender: { label: string; count: number; percentage: number; }[];
  ageRanges: { label: string; count: number; percentage: number; }[];
  totalRespondents: number;
}


interface PollResultsData {
  poll: PollData;
  aggregatedResponses: AggregatedResponse[];
  demographics: DemographicsData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

const PollVotingResultsPage = () => {
  const params = useParams();
  const pollId = params.pollId as string;
  const [results, setResults] = useState<PollResultsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pollId) {
      setError("No poll ID provided.");
      setLoading(false);
      return;
    }

    const fetchPollResults = async () => {
      try {
           const response = await fetch(`${baseURL}/api/polls/${pollId}/results`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch poll results.");
        }
        const data: PollResultsData = await response.json();
        setResults(data);
      } catch (err: any) {
        console.error("Error fetching poll results:", err);
        setError(err.message || "An unknown error occurred while fetching results.");
      } finally {
        setLoading(false);
      }
    };

    fetchPollResults();
  }, [pollId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl text-gray-700">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-50 to-pink-100 p-8 text-center">
        <Frown className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Results</h1>
        <p className="text-lg text-red-600 mb-8">{error}</p>
      </div>
    );
  }

  if (!results || !results.poll) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <p className="text-xl text-gray-700">No results data available for this poll yet.</p>
      </div>
    );
  }

  const { poll, aggregatedResponses, demographics } = results;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <BarChart className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" /> Poll Results: {poll.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Category: <span className="font-semibold">{poll.category}</span>
          {poll.category === 'Presidential' && poll.presidential && (
            <span className="ml-2">| Presidential: <span className="font-semibold">{poll.presidential}</span></span>
          )}
          | Region: <span className="font-semibold">{poll.region}</span>
          {poll.county && <span className="ml-2">| County: <span className="font-semibold">{poll.county}</span></span>}
          {poll.constituency && <span className="ml-2">| Constituency: <span className="font-semibold">{poll.constituency}</span></span>}
          {poll.ward && <span className="ml-2">| Ward: <span className="font-semibold">{poll.ward}</span></span>}
        </p>

        {demographics.totalRespondents > 0 ? (
          <div className="mb-10 p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-gray-600" /> Respondent Demographics ({demographics.totalRespondents} Total)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Gender Distribution */}
              <div>
                <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><PieChartIcon className="w-5 h-5 mr-2 text-purple-500"/>Gender Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={demographics.gender}
                      dataKey="count"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {demographics.gender.map((entry, index) => (
                        <Cell key={`cell-gender-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Age Distribution */}
              <div>
                <h4 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><BarChart className="w-5 h-5 mr-2 text-green-500"/>Age Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={demographics.ageRanges}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-10 p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200 text-center text-gray-600">
            No demographic data available yet.
          </div>
        )}

        {aggregatedResponses.length > 0 ? (
          <div className="space-y-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Scale className="w-6 h-6 mr-3 text-gray-600" /> Question-wise Results
            </h3>
            {aggregatedResponses.map((questionResult) => (
              <div key={questionResult.questionId} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{questionResult.questionText}</h4>
                <p className="text-gray-600 mb-4">Total Responses: {questionResult.totalResponses}</p>

                {/* Render different charts based on question type */}
                {questionResult.type === 'single-choice' || questionResult.isCompetitorQuestion || questionResult.type === 'yes-no-notsure' ? (
                  questionResult.choices && questionResult.choices.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={questionResult.choices}
                          dataKey="count"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          labelLine={false}
                          label={renderCustomizedLabel}
                        >
                          {questionResult.choices.map((entry, index) => (
                            <Cell key={`cell-${questionResult.questionId}-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-gray-500">No choices recorded for this question yet.</p>
                  )
                ) : questionResult.type === 'open-ended' && questionResult.openEndedResponses && questionResult.openEndedResponses.length > 0 ? (
                  <div className="bg-gray-100 p-4 rounded-md mt-4 max-h-60 overflow-y-auto custom-scrollbar">
                    <h5 className="font-semibold text-gray-700 mb-2">Open-Ended Responses:</h5>
                    <ul className="list-disc list-inside text-gray-700">
                      {questionResult.openEndedResponses.map((response, index) => (
                        <li key={index} className="mb-1">{response}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">No responses available for this question type yet.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 p-6 bg-indigo-50 rounded-xl shadow-md border border-indigo-200 text-center text-indigo-600">
            <MessageSquareText className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
            <p className="text-xl">No responses have been recorded for this poll yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollVotingResultsPage;