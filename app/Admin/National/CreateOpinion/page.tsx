"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Megaphone } from "lucide-react";
import { baseURL } from "@/app/config/baseUrl";
import {
  CATEGORY_OPTIONS,
  regionCountyMap,
} from "../../createpoll/Places";
import { useAuth } from "../../AuthContext";

interface Option {
  id?: number;
  name?: string;
  profileFile?: File | null;
  profileUrl?: string | null;
}

interface Question {
  id?: number;
  question_text: string;
  options: Option[];
}
interface NationalPollFormProps {
  pollId?: string;
}

export default function NationalPoll({ pollId }: NationalPollFormProps) {
  const router = useRouter();
  const { token} = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_text: "",
      options: [{ name: "", profileFile: null }],
    },
  ]);

  const [expiryHours, setExpiryHours] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const counties = regionCountyMap[region] ?? [];

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateQuestionText = (qIndex: number, value: string) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex].question_text = value;
      return updated;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question_text: "",
        options: [{ name: "", profileFile: null, profileUrl: null }],
      },
    ]);
  };
  const removeQuestion = (qIndex: number) => {
    if (questions.length === 1) return;

    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };
  const addOption = (qIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, index) =>
        index === qIndex
          ? {
              ...q,
              options: [
                ...q.options,
                {
                  name: "",
                  profileFile: null,
                  profileUrl: null,
                },
              ],
            }
          : q,
      ),
    );
  };

  const updateOption = (
    qIndex: number,
    oIndex: number,
    field: "name" | "profileFile",
    value: string | File | null,
  ) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (field === "profileFile") {
        updated[qIndex].options[oIndex].profileFile = value as File;
      } else {
        updated[qIndex].options[oIndex][field] = value as string;
      }
      return updated;
    });
  };
  const removeOption = (qIndex: number, oIndex: number) => {
    setQuestions((prev) => {
      const updated = [...prev];
      if (updated[qIndex].options.length === 1) return prev;
      updated[qIndex].options.splice(oIndex, 1);
      return updated;
    });
  };

  useEffect(() => {
    if (!pollId) return;
    setIsEditMode(true);
    setLoading(true);
    const fetchPoll = async () => {
       const token = localStorage.getItem("token"); 

 if (!token) {
        setMessage("❌ You are not logged in.");
        return;
      }
      try {
        const res = await fetch(`${baseURL}/api/opinion/${pollId}`,{ headers: {
              Authorization: `Bearer ${token}`,
            },});
        if (!res.ok) throw new Error("Failed to fetch poll");
        const data = await res.json();
        setTitle(data.title || "");
        setCategory(data.category || "");
        setRegion(data.region || "");
        setCounty(data.county || "");


        setQuestions(data.questions || []);
        if (data.voting_expires_at) {
          const expires = new Date(data.voting_expires_at);
          const hoursLeft = Math.round(
            (expires.getTime() - Date.now()) / (1000 * 60 * 60),
          );
          setExpiryHours(hoursLeft > 0 ? String(hoursLeft) : "");
        }
      } catch (err) {
        console.error("❌ Error fetching poll:", err);
        setMessage("❌ Failed to load poll details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  

  }, [pollId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");

    if (!title || !category || !region) {
      setMessage("❌ Please fill in all required poll details.");
      setSubmitting(false);
      return;
    }
    if (questions.some((q) => !q.question_text.trim())) {
      setMessage("❌ All questions must have text.");
      setSubmitting(false);
      return;
    }
    if (questions.some((q) => q.options.some((o) => !o.name))) {
      setMessage("❌ All options must have a name.");
      setSubmitting(false);
      return;
    }
    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("region", region);
    formData.append("county", county);

  if (expiryHours) {
  const expiryDate = new Date(Date.now() + Number(expiryHours) * 60 * 60 * 1000);
  formData.append("voting_expires_at", expiryDate.toISOString());
}

    formData.append(
      "questions",
      JSON.stringify(
        questions.map((q) => ({
          id:(q as any).id?? null,
          question_text: q.question_text,
          options: q.options.map((o:any) => ({
            id:o.id?? null,
            name: o.name,
          })),
        })),
      ),
    );
    questions.forEach((q, qIndex) => {
      q.options.forEach((o, oIndex) => {
        if (o.profileFile) {
          formData.append(`profile_${qIndex}_${oIndex}`, o.profileFile);
        }
      });
    });
    try {
      const res = await fetch(
        `${baseURL}/api/opinion${isEditMode ? `/${pollId}` : ""}`,
        {
          method: isEditMode ? "PUT" : "POST", headers: {
      Authorization: `Bearer ${token}`,
    },
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Failed to submit form");
      setMessage(
        isEditMode
          ? "✅ Poll updated successfully!"
          : "✅ Poll created successfully!",
      );
      setTimeout(() => router.push("/livepolls/Opinions"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save poll.");
    } finally {
      setSubmitting(false);
    }
  };

  const isNational = region === "National";
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <Megaphone className="w-8 h-8 text-blue-600 mr-3" />
          {isEditMode ? "Edit Poll" : "Create New Poll"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Details Section */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Poll Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                placeholder="e.g., Presidential Election Poll"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Region <span className="text-red-500">*</span>
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCounty("");
               
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>
                  Select region
                </option>
                {Object.keys(regionCountyMap).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
            {!isNational && (
              <>
                <div>
                  <label
                    htmlFor="county"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    County <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="county"
                    value={county}
                    onChange={(e) => {
                      setCounty(e.target.value);
                                    }}
                    disabled={!region}
                    className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!region ? "opacity-60 cursor-not-allowed" : ""}`}
                    required
                  >
                    <option value="" disabled>
                      Select county
                    </option>
                    {counties.map((cty) => (
                      <option key={cty} value={cty}>
                        {cty}
                      </option>
                    ))}
                  </select>
                </div>
              
              </>
            )}
            <div className="md:col-span-2">
              <label
                htmlFor="expiryHours"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Voting Duration in Hours (optional)
              </label>
              <input
                type="number"
                id="expiryHours"
                min="1"
                placeholder="e.g. 24, 48, 168 (7 days)"
                value={expiryHours}
                onChange={(e) => setExpiryHours(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave blank for no expiry
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8">Questions</h3>

          {questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="border p-6 rounded-xl bg-gray-50 space-y-4"
            >
              {/* Question Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Question {qIndex + 1}</h4>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Question Input */}
              <input
                type="text"
                value={question.question_text}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                placeholder="Enter question..."
                className="w-full p-3 border rounded-lg"
                required
              />

              {/* Options */}
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="border p-4 rounded-lg bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={option.name || ""}
                      onChange={(e) =>
                        updateOption(qIndex, oIndex, "name", e.target.value)
                      }
                      className="p-2 border rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        updateOption(
                          qIndex,
                          oIndex,
                          "profileFile",
                          e.target.files?.[0] || null,
                        )
                      }
                    />
                  </div>

                  {question.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, oIndex)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove Option
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="text-blue-600 text-sm"
              >
                + Add Option
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              + Add Another Question
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 font-semibold rounded-lg ${
                submitting
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isEditMode ? "Update Poll" : "Create Opinion Poll"}
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`text-center mt-6 text-base font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
