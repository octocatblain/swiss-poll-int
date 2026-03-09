'use client';
import { baseURL } from "@/app/config/baseUrl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  genderBreakdowns: Record<string, Option[]>; // will only use first question
  ageBreakdowns: Record<string, Option[]>;  
  employmentBreakdowns?: Record<string, Option[]>;
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

  const firstQuestion = result.questions[0]; // for gender and age
const downloadReport = async () => {
  const element = document.getElementById("reportContent");
  if (!element) return;

  // Clone the element
  const cloned = element.cloneNode(true) as HTMLElement;
  cloned.style.backgroundColor = "white";
  cloned.querySelectorAll("*").forEach((el) => {
    const htmlEl = el as HTMLElement;
    htmlEl.style.color = "black";
    htmlEl.style.backgroundColor = "white";
  });

  // Temporarily attach cloned element to body (offscreen)
  cloned.style.position = "absolute";
  cloned.style.left = "-9999px";
  document.body.appendChild(cloned);

  // Generate canvas
  const canvas = await html2canvas(cloned, {
    scale: 2,
    backgroundColor: "#ffffff",
  });

  // Remove cloned element after rendering
  document.body.removeChild(cloned);

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("poll-results.pdf");
};
  return (
    <div  id="reportContent" className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">{result.title}</h1>
      <p className="text-gray-600 mb-10">
        Total Responses (all questions):
        <span className="font-bold">{result.totalResponses.toLocaleString()}</span>
      </p>
<div className="flex justify-end mb-6">
  {/* <button
    onClick={downloadReport}
    className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700"
  >
    Download Report
  </button> */}
</div>
      {/* Gender Results – only once */}
      {firstQuestion && firstQuestion.genderBreakdowns && (
        <div className="mt-14">
          <h3 className="text-xl font-medium mb-6">Performance by Gender</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-40">
                    Gender
                  </th>
                  {firstQuestion.options.map((opt) => (
                    <th key={opt.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      {opt.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(firstQuestion.genderBreakdowns).map(([gender, options]) => {
                  const optMap = new Map(options.map((o) => [o.id, o]));
                  const maxPerc = Math.max(...options.map((o) => o.percentage), 0);

                  return (
                    <tr key={gender} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{gender}</td>
                      {firstQuestion.options.map((overallOpt) => {
                        const opt = optMap.get(overallOpt.id) || { percentage: 0, votes: 0 };
                        const isWinner = opt.percentage === maxPerc && opt.percentage > 0;

                        return (
                          <td key={overallOpt.id} className={`px-6 py-4 text-center ${isWinner ? "bg-purple-50" : ""}`}>
                            <div className={`text-2xl font-bold ${isWinner ? "text-purple-600" : "text-blue-600"}`}>
                              {opt.percentage}%
                            </div>
                            <div className="text-xs text-gray-500">({opt.votes})</div>
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
      )}

      {/* Age Results – only once */}
      {firstQuestion && firstQuestion.ageBreakdowns && (
        <div className="mt-14">
          <h3 className="text-xl font-medium mb-6">Performance by Age</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-40">
                    Age Group
                  </th>
                  {firstQuestion.options.map((opt) => (
                    <th key={opt.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      {opt.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(firstQuestion.ageBreakdowns).map(([ageGroup, options]) => {
                  const optMap = new Map(options.map((o) => [o.id, o]));
                  const maxPerc = Math.max(...options.map((o) => o.percentage), 0);

                  return (
                    <tr key={ageGroup} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{ageGroup}</td>
                      {firstQuestion.options.map((overallOpt) => {
                        const opt = optMap.get(overallOpt.id) || { percentage: 0, votes: 0 };
                        const isWinner = opt.percentage === maxPerc && opt.percentage > 0;

                        return (
                          <td key={overallOpt.id} className={`px-6 py-4 text-center ${isWinner ? "bg-purple-50" : ""}`}>
                            <div className={`text-2xl font-bold ${isWinner ? "text-purple-600" : "text-blue-600"}`}>
                              {opt.percentage}%
                            </div>
                            <div className="text-xs text-gray-500">({opt.votes})</div>
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
      )}
{/* Employment Status Results – only once */}
{firstQuestion && firstQuestion.employmentBreakdowns && (
  <div className="mt-14">
    <h3 className="text-xl font-medium mb-6">Performance by Employment Status</h3>
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-40">
              Employment Status
            </th>
            {firstQuestion.options.map((opt) => (
              <th key={opt.id} className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                {opt.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(firstQuestion.employmentBreakdowns).map(([status, options]) => {
            const optMap = new Map(options.map((o) => [o.id, o]));
            const maxPerc = Math.max(...options.map((o) => o.percentage), 0);

            return (
              <tr key={status} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{status}</td>
                {firstQuestion.options.map((overallOpt) => {
                  const opt = optMap.get(overallOpt.id) || { percentage: 0, votes: 0 };
                  const isWinner = opt.percentage === maxPerc && opt.percentage > 0;

                  return (
                    <td key={overallOpt.id} className={`px-6 py-4 text-center ${isWinner ? "bg-purple-50" : ""}`}>
                      <div className={`text-2xl font-bold ${isWinner ? "text-purple-600" : "text-blue-600"}`}>
                        {opt.percentage}%
                      </div>
                      <div className="text-xs text-gray-500">({opt.votes})</div>
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
)}
      {/* Questions Loop */}
      {result.questions.map((q) => (
        <div key={q.id} className="mb-16 border-b pb-12 last:border-none">
          <h2 className="text-2xl font-semibold mb-1">{q.question}</h2>
          <p className="text-gray-500 mb-8">
            Responses: <span className="font-bold">{q.totalResponses.toLocaleString()}</span>
          </p>

          {/* Overall Results */}
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

          {/* Regional Results */}
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
