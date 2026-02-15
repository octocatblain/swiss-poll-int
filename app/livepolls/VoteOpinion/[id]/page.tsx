"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { baseURL } from "@/app/config/baseUrl";

interface Option {
  id: number;
  name: string;
  profile?: string | null;
}

interface Question {
  id: number;
  question_text: string;
  options: Option[];
}

interface Opinion {
  id: number;
  title: string;
  category: string;
  region: string;
  county: string;
  voting_expires_at: string | null;
  status: "LIVE" | "EXPIRED" | "NO_EXPIRY";
  created_at: string;
  questions?: Question[];
}

export default function OpinionResponse() {
  const [opinion, setOpinion] = useState<Opinion | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // User details
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userRegion, setUserRegion] = useState("");

  // Selected answers: questionId → optionId
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const params = useParams();
  const opinionId = params.id as string;

  useEffect(() => {
    if (!opinionId) return;

    const fetchOpinion = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/api/opinion/${opinionId}`);
        if (!res.ok) throw new Error("Failed to load opinion");
        const data: Opinion = await res.json();
        setOpinion(data);
      } catch (error) {
        console.error("Failed to fetch opinion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpinion();
  }, [opinionId]);

  // Handle option selection (single choice per question)
  const handleSelectOption = (questionId: number, optionId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Check if user can submit (all questions answered + required personal info)
  const canSubmit = useMemo(() => {
    if (!opinion?.questions) return false;

    // 1. All questions must be answered
    const allQuestionsAnswered = opinion.questions.every(
      (q) => selectedAnswers[q.id] !== undefined
    );

    // 2. Required personal details (you can adjust which ones are mandatory)
    const hasName = userName.trim().length > 0;
    const hasAge = userAge.trim() !== "" && Number(userAge) > 0;
    const hasGender = userGender !== "";
    const hasRegion = userRegion !== "";

    return allQuestionsAnswered && hasName && hasAge && hasGender && hasRegion;
  }, [
    opinion,
    selectedAnswers,
    userName,
    userAge,
    userGender,
    userRegion,
  ]);

  // Submit vote
  const handleSubmitVote = async () => {
    if (!opinion || !canSubmit) return;

    setSubmitting(true);

    const votePayload = {
      opinionId: opinion.id,
      user: {
        name: userName.trim() || "Anonymous",
        age: userAge ? parseInt(userAge) : null,
        gender: userGender || null,
        region: userRegion || opinion.region,
      },
      answers: Object.entries(selectedAnswers).map(([qId, oId]) => ({
        questionId: parseInt(qId),
        optionId: oId,
      })),
    };

    try {
const res = await fetch(`${baseURL}/api/responses/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(votePayload),
      });

      if (!res.ok) throw new Error("Failed to submit");
setUserAge("");
setUserGender("");
setUserRegion("");
setSelectedAnswers({});
setUserName("");

      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit vote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "LIVE":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "EXPIRED":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-amber-100 text-amber-700 border border-amber-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-zinc-500">Loading poll...</div>
      </div>
    );
  }

  if (!opinion) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-semibold">Opinion not found</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="mx-auto p-6 pt-10">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="h-2 bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600" />

          <div className="p-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="uppercase text-xs font-mono tracking-widest text-zinc-500 mb-2">
                  {opinion.category.toUpperCase()}
                </div>
                <h1 className="text-4xl font-bold leading-tight text-zinc-900">
                  {opinion.title}
                </h1>
              </div>

              <div
                className={`text-sm font-semibold px-5 py-2 rounded-2xl ${getStatusBadge(
                  opinion.status
                )}`}
              >
                {opinion.status === "LIVE"
                  ? "🟢 Live Now"
                  : opinion.status === "EXPIRED"
                  ? "Ended"
                  : "Ongoing"}
              </div>
            </div>

            <div className="flex gap-8 mt-8 text-sm text-zinc-600">
              <div>
                <span className="font-mono text-zinc-400">REGION</span>
                <p className="font-semibold text-zinc-900 mt-1">{opinion.region}</p>
              </div>
              <div>
                <span className="font-mono text-zinc-400">COUNTY</span>
                <p className="font-semibold text-zinc-900 mt-1">{opinion.county}</p>
              </div>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Voter Information */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-8 sticky top-8 border border-zinc-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="text-emerald-600">👤</span>
                Your Voice Matters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe (optional)"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-indigo-400 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      value={userAge}
                      onChange={(e) => setUserAge(e.target.value)}
                      placeholder="25"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1.5">
                      Gender
                    </label>
                    <select
                      value={userGender}
                      onChange={(e) => setUserGender(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-indigo-400 transition"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-zinc-500 mb-1.5">
                    Your Region
                  </label>
                  <select
                    value={userRegion}
                    onChange={(e) => setUserRegion(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-indigo-400 transition"
                  >
                    <option value="">Select Region</option>
                    <option value="Nairobi">Nairobi</option>
                    <option value="Central">Central</option>
                    <option value="Coast">Coast</option>
                    <option value="Eastern">Eastern</option>
                    <option value="Nyanza">Nyanza</option>
                    <option value="Rift Valley">Rift Valley</option>
                    <option value="Western">Western</option>
                    <option value="North Eastern">North Eastern</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Your personal details are optional and used only for demographic insights. 
                    Your vote remains completely anonymous.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Questions & Options */}
          <div className="lg:col-span-8 space-y-10">
            {opinion.questions?.map((question) => (
              <div key={question.id} className="bg-white rounded-3xl p-8 border border-zinc-100">
                <div className="text-sm font-medium text-indigo-600 mb-2">QUESTION {opinion.questions!.indexOf(question) + 1}</div>
                <h2 className="text-xl font-semibold text-zinc-900 leading-snug">
                  {question.question_text}
                </h2>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {question.options.map((option) => {
                    const isSelected = selectedAnswers[question.id] === option.id;

                    return (
                      <div
                        key={option.id}
                        onClick={() => handleSelectOption(question.id, option.id)}
                        className={`group relative border-2 rounded-2xl p-3 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50 shadow-sm"
                            : "border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
                            ✓
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          {option.profile && (
                            <img
                              src={option.profile}
                              alt={option.name}
                              className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white"
                            />
                          )}

                          <div className="flex-1 min-w-0 pt-1">
                            <p className="font-semibold text-lg text-zinc-900">{option.name}</p>
                        
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Submit Area */}
            <div className="bg-white rounded-3xl p-8 border border-zinc-100 flex flex-col items-center text-center">
              {!canSubmit ? (
                <div className="text-amber-600 text-sm font-medium flex items-center gap-2">
                  <span>●</span> Please answer all questions to submit
                </div>
              ) : submitted ? (
                <div>
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-emerald-600">Thank you!</h3>
                  <p className="text-zinc-600 mt-2">Your voice has been counted.</p>
                </div>
              ) : (
            <button
                  onClick={handleSubmitVote}
                  disabled={submitting}
                  className="w-full max-w-xs bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {submitting ? "Casting your vote..." : "Submit My Vote →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}