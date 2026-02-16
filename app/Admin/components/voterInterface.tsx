"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/app/config/baseUrl";
import { Clock, CheckCircle, Lock } from "lucide-react";
import { useRouter} from "next/navigation";
import { useAuth } from "../AuthContext";
interface Candidate {
  id: number;
  name: string;
}

interface PollData {
  title: string;
  results: Candidate[];
  voting_id: string;
  voting_expires_at: string;
  allow_multiple_votes?: boolean;
}

const VoteInterface = ({ pollId }: { pollId: number }) => {
  const [data, setData] = useState<PollData | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voterId, setVoterId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [countdown, setCountdown] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);
  const { token } = useAuth();
  const [localAllowMultipleVotes, setLocalAllowMultipleVotes] = useState<
    boolean | null
  >(null);

  const [count, setCount] = useState<number>(0);

  const router = useRouter();
  // Generate / load voter ID
  useEffect(() => {
    const storedId = localStorage.getItem("voter_id");
    if (!storedId) {
      const newId = Math.random().toString(36).substring(2, 12);
      localStorage.setItem("voter_id", newId);
      setVoterId(newId);
    } else {
      setVoterId(storedId);
    }
  }, []);

  // Check admin status
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);

  // Countdown timer + expiration check
  useEffect(() => {
    if (!data?.voting_expires_at) return;

    const updateCountdown = () => {
      const now = new Date();
      const expires = new Date(data.voting_expires_at);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Voting closed");
        setIsExpired(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`,
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [data?.voting_expires_at]);

  // Fetch poll data + vote status
  useEffect(() => {
    if (!voterId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/polls/${pollId}`);
        const fetchedData = res.data as PollData;

        setData((prev) => ({
          ...fetchedData,
          allow_multiple_votes:
            localAllowMultipleVotes !== null
              ? localAllowMultipleVotes
              : fetchedData.allow_multiple_votes,
        }));
      } catch (err) {
        console.error("Failed to load poll:", err);
      }
    };

    const checkIfVoted = async () => {
      if (!data?.allow_multiple_votes) {
        try {
          const res = await axios.get(`${baseURL}/api/votes/status`, {
            params: { pollId, voter_id: voterId },
          });
              if (res.data.alreadyVoted) {
            setMessage("You've already voted in this poll.");
          }
        } catch (err) {
          console.error("Vote status check failed:", err);
        }
      }
    };

    fetchData();
    checkIfVoted();

    const interval = setInterval(fetchData, 6000);
    return () => clearInterval(interval);
  }, [pollId, voterId, data?.allow_multiple_votes, localAllowMultipleVotes]);
  const addBulkVotes = async () => {
    if (!selectedCandidateId || count <= 0) {
      alert("Enter a valid vote count");
      return;
    }
    try {
     const res = await fetch(`${baseURL}/api/votes/bulk`, {
        method: "POST",
        headers: {  
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pollId,
          competitorId: selectedCandidateId,
          count,
        }),
      });
      if (!res.ok) throw new Error("Failed to add bulk votes");
      const data = await res.json();
      console.log(data);
      alert(`${count} votes added successfully`);
      setCount(0);
    } catch (err) {
      console.error(err);
      alert("Failed to add bulk votes");
    }
  };

  const handleVote = async () => {
    if (!selectedCandidateId || !data || !voterId) {
      setMessage("Please select a candidate");
      return;
    }
    setIsVoting(true);
    setMessage(null);

    try {
      const response = await axios.post(`${baseURL}/api/votes`, {
        id: pollId,
        competitorId: selectedCandidateId,
        voter_id: voterId,
      });

      if (response.status === 200) {
        setMessage("Thank you! Your vote has been recorded.");
        setSelectedCandidateId(null);
        setSelectedCandidateId(null);
 
        if (!data.allow_multiple_votes) {
          setMessage("You've already voted in this poll.");
        }
        setTimeout(() => {
          if (!isAdmin) {
            router.replace("/");
          }
        }, 1500);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setMessage("You've already voted in this poll.");
      } else {
        console.error("Vote error:", error);
        setMessage("Failed to record your vote. Please try again.");
      }
    } finally {
      setIsVoting(false);
    }
  };

  const toggleMultipleVoting = async () => {
    if (!data) return;
    try {
      const updated = !data.allow_multiple_votes;
      await axios.patch(`${baseURL}/api/votes/${pollId}/allow-multiple`, {
        allow_multiple_votes: updated,
      });
      setLocalAllowMultipleVotes(updated);
      setData({ ...data, allow_multiple_votes: updated });
      setMessage(
        updated ? "Multiple voting enabled" : "Multiple voting disabled",
      );
    } catch (err) {
      console.error("Toggle multiple voting failed:", err);
      setMessage("Failed to update voting mode");
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-gray-500">Loading poll...</div>
      </div>
    );
  }

  const isVotingDisabled =
    isExpired ||
    (message === "You've already voted in this poll." &&
      !data.allow_multiple_votes);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {data.title || "Cast Your Vote"}
        </h1>

        <div className="mt-4 flex items-center justify-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-indigo-600" />
          <span
            className={`font-medium ${isExpired ? "text-red-600" : "text-indigo-600"}`}
          >
            {countdown || "Calculating time..."}
          </span>
        </div>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleMultipleVoting}
            className={`
              px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200
              ${
                data.allow_multiple_votes
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }
            `}
          >
            {data.allow_multiple_votes ? "Disable" : "Enable"} Multiple Votes
          </button>
        </div>
      )}

      {/* Main Content */}
      {isExpired ? (
        <div
          className="bg-linear-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 
                        border border-red-200 dark:border-red-800 rounded-2xl p-10 text-center shadow-lg"
        >
          <Lock className="w-16 h-16 mx-auto text-red-500 mb-6" />
          <h2 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
            Voting Has Closed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            This poll is no longer accepting votes.
          </p>
        </div>
      ) : isVotingDisabled ? (
        <div
          className="bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 
                        border border-amber-200 dark:border-amber-800 rounded-2xl p-10 text-center shadow-md"
        >
          <CheckCircle className="w-16 h-16 mx-auto text-amber-600 mb-6" />
          <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-3">
            Thank you for voting!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {message || "You've already participated in this poll."}
          </p>
        </div>
      ) : (
        /* Voting Form */
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
           <h1 className="text-lg font-semibold mb-4">Enter Voter Details</h1>
         
          <div className="space-y-3 mb-8">
            {data.results.map((candidate) => (
              <label
                key={candidate.id}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition
        ${
          selectedCandidateId === candidate.id
            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40"
            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40"
        }
      `}
              >
                <input
                  type="radio"
                  name="candidate"
                  checked={selectedCandidateId === candidate.id}
                  onChange={() => setSelectedCandidateId(candidate.id)}
                  className="h-5 w-5 text-indigo-600"
                />
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {candidate.name}
                </span>
              </label>
            ))}
          </div>
          {isAdmin && selectedCandidateId && (
            <div
              className="mt-6 rounded-xl border border-red-200 dark:border-red-800 
                  bg-red-50 dark:bg-red-950/30 p-5"
            >
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 mb-2">
                Admin Bulk Actions
              </h3>

              <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                This will instantly add votes to the selected candidate.
              </p>
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full mb-4 px-4 py-2 rounded-lg border 
             border-red-300 dark:border-red-700
             bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />

              <button
                onClick={addBulkVotes}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 
                 text-white font-semibold transition"
              >
                Add Votes
              </button>
            </div>
          )}

          <button
            onClick={handleVote}
            disabled={isVoting || !selectedCandidateId}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
              ${
                isVoting || !selectedCandidateId
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-lg hover:shadow-xl"
              }
            `}
          >
            {isVoting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Voting...
              </span>
            ) : (
              "Submit Your Vote"
            )}
          </button>

          {message && message !== "You've already voted in this poll." && (
            <p className="mt-4 text-center text-green-600 dark:text-green-400 font-medium">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VoteInterface;
