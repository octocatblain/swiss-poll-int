"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Send,
  Loader2,
  Frown,
  Users,
  HelpCircle,
  Megaphone,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { baseURL } from "@/app/config/baseUrl";

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
  type: "single-choice" | "open-ended" | "yes-no-notsure";
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

interface VoteResponse {
  questionId: number;
  selectedCompetitorId?: number | null;
  selectedOptionId?: number | null;
  openEndedResponse?: string | null;
}

const PollVotingPage = () => {
  const params = useParams();
  const pollId = params.pollId as string;
  const router = useRouter();
  const [respondentName, setRespondentName] = useState<string>("");
  const [respondentGender, setRespondentGender] = useState<string>("");
  const [respondentAge, setRespondentAge] = useState<string>("");
  const [pollData, setPollData] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [selections, setSelections] = useState<{
    [key: number]: number | string | null;
  }>({});
  const [mainCompetitorSelection, setMainCompetitorSelection] = useState<
    number | null
  >(null);
  const ageOptions: number[] = Array.from({ length: 83 }, (_, i) => i + 18);

  useEffect(() => {
    if (!pollId) {
      setError("No poll ID provided.");
      setLoading(false);
      return;
    }

    const fetchPollData = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls/${pollId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch poll data.");
        }
        const data: PollData = await response.json();
        setPollData(data);

        const initialSelections: { [key: number]: number | string | null } = {};
        data.questions.forEach((q) => {
          initialSelections[q.id] = null;
        });
        setSelections(initialSelections);
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPollData();
  }, [pollId]);

  const handleDynamicQuestionSelectionChange = (
    questionId: number,
    value: number | string | null
  ) => {
    setSelections((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);

    if (!respondentName.trim() || !respondentAge || !respondentGender) {
      setError("Please fill in all respondent details (Name, Age, Gender).");
      setSubmitting(false);
      return;
    }

    if (!pollData) {
      setError("Poll data not loaded.");
      setSubmitting(false);
      return;
    }

    const userIdentifier = localStorage.getItem("user_poll_uuid") || uuidv4();
    localStorage.setItem("user_poll_uuid", userIdentifier);

    const responses: VoteResponse[] = [];

    const mainCompetitorQuestion = pollData.questions.find(
      (q) => q.isCompetitorQuestion
    );

    if (pollData.competitors.length > 0 && mainCompetitorQuestion) {
      if (mainCompetitorSelection === null) {
        setError("Please select an aspirant for the main poll.");
        setSubmitting(false);
        return;
      }
      responses.push({
        questionId: mainCompetitorQuestion.id,
        selectedCompetitorId: mainCompetitorSelection,
        selectedOptionId: null,
        openEndedResponse: null,
      });
    }

    for (const q of pollData.questions) {
      if (mainCompetitorQuestion && q.id === mainCompetitorQuestion.id) {
        continue;
      }

      const selection = selections[q.id];

      if (q.isCompetitorQuestion) {
        if (
          typeof selection !== "number" ||
          !pollData.competitors.some((comp) => comp.id === selection)
        ) {
          setError(
            `Please select a competitor for question: "${q.questionText}"`
          );
          setSubmitting(false);
          return;
        }
        responses.push({
          questionId: q.id,
          selectedCompetitorId: selection,
          selectedOptionId: null,
          openEndedResponse: null,
        });
      } else if (q.type === "single-choice" || q.type === "yes-no-notsure") {
        if (
          typeof selection !== "number" ||
          !q.options?.some((opt) => opt.id === selection)
        ) {
          setError(`Please select an option for question: "${q.questionText}"`);
          setSubmitting(false);
          return;
        }
        responses.push({
          questionId: q.id,
          selectedOptionId: selection,
          selectedCompetitorId: null,
          openEndedResponse: null,
        });
      } else if (q.type === "open-ended") {
        if (typeof selection !== "string" || selection.trim() === "") {
          setError(
            `Please provide an answer for question: "${q.questionText}"`
          );
          setSubmitting(false);
          return;
        }
        responses.push({
          questionId: q.id,
          openEndedResponse: selection.trim(),
          selectedCompetitorId: null,
          selectedOptionId: null,
        });
      }
    }

    try {
      const response = await fetch(`${baseURL}/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Identifier": userIdentifier,
        },
        body: JSON.stringify({
          userIdentifier,
          responses,
          respondentName: respondentName.trim(),
          respondentAge: parseInt(respondentAge),
          respondentGender,
        }),
      });

      if (response.ok) {
        setMessage("✅ Your vote has been submitted successfully!");
        setRespondentName("");
        setRespondentGender("");
        setRespondentAge("");
        setSelections({});
        setMainCompetitorSelection(null);
        setTimeout(() => router.push('/Thankyou'), 1000); 
      } else {
        const errorData = await response.json();
        setError(
          `❌ Submission failed: ${errorData.message || response.statusText}`
        );
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(
        `❌ Network or server error: ${err.message || "Please try again."}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-xl text-gray-700">Loading poll...</p>
      </div>
    );
  }

  if (error && !pollData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-red-50 to-pink-100 p-8 text-center">
        <Frown className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Error Loading Poll
        </h1>
        <p className="text-lg text-red-600 mb-8">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!pollData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <p className="text-xl text-gray-700">No poll data available.</p>
      </div>
    );
  }
  const competitorQuestions = pollData.questions.filter(
    (q) => q.isCompetitorQuestion
  );
  const otherQuestions = pollData.questions.filter(
    (q) => !q.isCompetitorQuestion
  );
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <Megaphone className="mr-3 text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />{" "}
          Vote in Poll: {pollData.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Category: <span className="font-semibold">{pollData.category}</span>
          {pollData.category === "Presidential" && pollData.presidential && (
            <span className="ml-2">
              | Presidential:{" "}
              <span className="font-semibold">{pollData.presidential}</span>
            </span>
          )}
          | Region: <span className="font-semibold">{pollData.region}</span>
          {pollData.county && (
            <span className="ml-2">
              | County: <span className="font-semibold">{pollData.county}</span>
            </span>
          )}
          {pollData.constituency && (
            <span className="ml-2">
              | Constituency:{" "}
              <span className="font-semibold">{pollData.constituency}</span>
            </span>
          )}
          {pollData.ward && (
            <span className="ml-2">
              | Ward: <span className="font-semibold">{pollData.ward}</span>
            </span>
          )}
        </p>

        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </p>
        )}
        {message && (
          <p
            className={`px-4 py-3 rounded relative mb-4 ${
              message.startsWith("✅")
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-blue-100 border border-blue-400 text-blue-700"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmitVote} className="space-y-10">
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            Respondent Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={respondentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRespondentName(e.target.value)
                }
                placeholder="Enter Name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="respondent-gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="respondent-gender"
                value={respondentGender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setRespondentGender(e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="respondent-age"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <select
                id="respondent-age"
                value={respondentAge}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setRespondentAge(e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>
                  Select Age
                </option>
                {ageOptions.map((age: number) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {pollData.competitors.length > 0 &&
            competitorQuestions.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-xl shadow-md border border-blue-200">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
                  <Users className="w-7 h-7 mr-3 text-blue-600" />
                  {competitorQuestions[0].questionText}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {pollData.competitors.map((competitor) => (
                    <label
                      key={competitor.id}
                      className={`block cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                        mainCompetitorSelection === competitor.id
                          ? "border-blue-600 bg-blue-100 shadow-lg"
                          : "border-gray-300 bg-white hover:border-blue-400 hover:shadow-md"
                      }`}
                    >
                      <input
                        type="radio"
                        name="mainCompetitor"
                        value={competitor.id}
                        checked={mainCompetitorSelection === competitor.id}
                        onChange={() =>
                          setMainCompetitorSelection(competitor.id)
                        }
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center text-center">
                        {competitor.profileImage ? (
                          <img
                            src={competitor.profileImage}
                            alt={competitor.name}
                            className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-200 shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/96x96?text=No+Image";
                              e.currentTarget.alt = "Image not found";
                            }}
                          />
                        ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold mb-3">
                            No Img
                          </div>
                        )}
                        <h4 className="text-lg font-semibold text-gray-800">
                          {competitor.name}
                        </h4>
                        {competitor.party && (
                          <p className="text-sm text-gray-600">
                            {competitor.party}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

          {otherQuestions.length > 0 && (
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-200">
              <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center">
                <HelpCircle className="w-7 h-7 mr-3 text-indigo-600" /> Other
                Poll Questions
              </h3>
              {otherQuestions.map((q) => (
                <div
                  key={q.id}
                  className="mb-8 p-5 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    {q.questionText}{" "}
                  </p>

                  {q.type === "single-choice" && q.options && (
                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option.id}
                            checked={selections[q.id] === option.id}
                            onChange={() =>
                              handleDynamicQuestionSelectionChange(
                                q.id,
                                option.id
                              )
                            }
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <span className="ml-3 text-base text-gray-700">
                            {option.optionText}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === "open-ended" && (
                    <div>
                      <textarea
                        value={(selections[q.id] as string) || ""}
                        onChange={(e) =>
                          handleDynamicQuestionSelectionChange(
                            q.id,
                            e.target.value
                          )
                        }
                        placeholder="Type your answer here..."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      />
                    </div>
                  )}

                  {q.type === "yes-no-notsure" && q.options && (
                    <div className="space-y-3">
                      {q.options.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option.id}
                            checked={selections[q.id] === option.id}
                            onChange={() =>
                              handleDynamicQuestionSelectionChange(
                                q.id,
                                option.id
                              )
                            }
                            className="form-radio h-5 w-5 text-purple-600"
                          />
                          <span className="ml-3 text-base text-gray-700">
                            {option.optionText}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

              <div className="flex justify-center mt-10">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center justify-center px-8 py-4 text-xl font-bold rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-75 ${
                submitting
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
              }`}
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Submitting Vote...
                </div>
              ) : (
                <>
                  <Send className="w-6 h-6 mr-3" /> Submit Vote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollVotingPage;
