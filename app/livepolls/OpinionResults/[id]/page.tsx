'use client';
import { baseURL } from "@/app/config/baseUrl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Option {
  id: string;
  text: string;
  name: string;
  votes: number;
  percentage: number;
}

interface QuestionResult {
  id: string;
  question: string;
  totalResponses: number;
  options: Option[];
  regionBreakdowns: Record<string, Option[]>;
}

interface PollResult {
  id: string;
  title: string;
  totalResponses: number;
  questions: QuestionResult[];
}

const REGION_ORDER = [
  "Nairobi",
  "Central",
  "Coast",
  "Eastern",
  "Nyanza",
  "Rift Valley",
  "Western",
  "North Eastern",
];

export default function OpinionResultsPage() {
  const [result, setResult] = useState<PollResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const opinionId = params.id as string;

  useEffect(() => {
    if (!opinionId) {
      setError("No poll ID in URL");
      setLoading(false);
      return;
    }

    fetch(`${baseURL}/api/responses/results/${opinionId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.message && !data.title) throw new Error(data.message);
        setResult(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load results");
      })
      .finally(() => setLoading(false));
  }, [opinionId]);

  if (loading) return <div className="text-center py-10">Loading results...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!result) return <div className="text-center py-10 text-red-500">Poll not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{result.title}</h1>
      <p className="text-gray-600 mb-10">
        Total Responses (all questions):{" "}
        <span className="font-bold">{result.totalResponses.toLocaleString()}</span>
      </p>

      {result.questions.map((q) => (
        <div key={q.id} className="mb-16 border-b pb-12 last:border-none">
          <h2 className="text-2xl font-semibold mb-1">{q.question}</h2>
          <p className="text-gray-500 mb-8">
            Responses: <span className="font-bold">{q.totalResponses.toLocaleString()}</span>
          </p>

          {/* Overall Results – kept your nice cards */}
          <div className="mb-12">
            <h3 className="text-xl font-medium mb-6">Overall Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {q.options.map((opt) => (
                <div key={opt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                  <div className="text-6xl font-bold text-emerald-600 my-3">{opt.percentage}%</div>
                  <div className="text-gray-500 text-sm">({opt.votes} votes)</div>
                  <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${opt.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Results – now a clean table */}
          <div>
            <h3 className="text-xl font-medium mb-6">Performance by Region</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-40">Region</th>
                    {q.options.map((opt) => (
                      <th key={opt.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                        {opt.text}
                     
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REGION_ORDER.map((region) => {
                    const regionOptions = q.regionBreakdowns[region] || [];
                    const optMap = new Map(regionOptions.map((o) => [o.id, o]));
                    const maxPerc = Math.max(...regionOptions.map((o) => o.percentage), 0);

                    return (
                      <tr key={region} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{region}</td>
                        {q.options.map((overallOpt) => {
                          const opt = optMap.get(overallOpt.id) || { percentage: 0, votes: 0 };
                          const isWinner = opt.percentage === maxPerc && opt.percentage > 0;

                          return (
                            <td
                              key={overallOpt.id}
                              className={`px-6 py-4 text-center transition-all ${
                                isWinner ? "bg-emerald-50" : ""
                              }`}
                            >
                              <div
                                className={`text-3xl font-bold ${
                                  isWinner ? "text-emerald-600" : "text-blue-600"
                                }`}
                              >
                                {opt.percentage}%
                              </div>
                              <div className="text-xs text-gray-500 mt-1">({opt.votes})</div>

                              {/* Tiny progress bar */}
                              <div className="mt-3 h-1 bg-gray-100 rounded-full w-14 mx-auto overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isWinner ? "bg-emerald-500" : "bg-blue-500"}`}
                                  style={{ width: `${opt.percentage}%` }}
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}

      {result.questions.length === 0 && <p className="text-center text-gray-500">No questions in this poll yet.</p>}
    </div>
  );
}