"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/app/config/baseUrl";


interface Candidate {
  id: number;
  name: string;
}

interface PollData {
  title: string;
  results: Candidate[];
  voting_id: string;
  allow_multiple_votes?: boolean;
}

const VoteInterface = ({ pollId }: { pollId: number }) => {
  const [data, setData] = useState<PollData | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voterId, setVoterId] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localAllowMultipleVotes, setLocalAllowMultipleVotes] = useState<boolean | null>(null);
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);
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
        console.error(err);
      }
    };

  const checkIfVoted = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/votes/status`, {
          params: { pollId: pollId, voter_id: voterId },
        });

        if (res.data.alreadyVoted && !data?.allow_multiple_votes) {
          setMessage("You have already voted in this poll.");
        }
      } catch (err) {
        console.error("Error checking vote status:", err);
      }
    };

    fetchData();
    checkIfVoted();
        if (!data?.allow_multiple_votes) {
      checkIfVoted();
    }
      const interval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, [pollId, voterId, data?.allow_multiple_votes,localAllowMultipleVotes]);

  const handleVote = async () => {
    if (!selectedCandidateId || !data || !voterId) return;
 setMessage("Please select a candidate and ensure voter ID is set.");
    setIsVoting(true);
    try {
      const response = await axios.post(`${baseURL}/api/votes`, {
        id:pollId,
        competitorId: selectedCandidateId,
        voter_id: voterId,
      });

      if (response.status === 200) {
        setMessage("Vote recorded successfully!");
        setSelectedCandidateId(null);
         if (!data.allow_multiple_votes) {
          setMessage("You have already voted in this poll.");
        }
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setMessage("You have already voted in this poll.");
      } else {
        console.error("Error voting:", error);
        setMessage("Failed to record vote.");
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
        updated ? "Multiple voting enabled" : "Multiple voting disabled"
      );
    } catch (err) {
      console.error("Error toggling multiple voting:", err);
      setMessage("Failed to update voting mode.");
    }
  };


  if (!data) return <p className="text-center p-4">Loading poll data...</p>;

  const hasVoted = message === "You have already voted in this poll.";

  return (
    <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center mt-10">{data.title || "Cast Your Vote"}</h1>
        {mounted && isAdmin && (
          <div className="flex justify-center">       <button
              onClick={toggleMultipleVoting}
              className={`p-3 text-sm rounded-full font-medium  ${
                data.allow_multiple_votes ? "bg-blue-600" : "bg-gray-500"
              } text-white hover:opacity-90`}
            >
              {data.allow_multiple_votes
                ? "Disable Multiple Voting"
                : "Enable Multiple Voting"}
            </button></div>
     
        )}

    {hasVoted ? (
      <div className="shadow-lg flex justify-center items-center rounded-2xl p-5">
  <p className="text-center text-black">{message}</p>
      </div>

) : (
  <div className="shadow-md border rounded-2xl space-y-3  p-5">
   <div className=" space-y-2">
      {data.results.map((candidate) => (
        <div key={candidate.id} className="flex items-center">
          <input
            type="radio"
            id={`candidate-${candidate.id}`}
            name="candidate"
            value={candidate.id}
            checked={selectedCandidateId === candidate.id}
            onChange={() => setSelectedCandidateId(candidate.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            disabled={isVoting}
          />
          <label htmlFor={`candidate-${candidate.id}`} className="ml-2 block text-sm text-gray-900">
            {candidate.name}
          </label>
        </div>
      ))}
    </div>
    <button
      onClick={handleVote}
      disabled={isVoting || !selectedCandidateId}
      className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isVoting ? "Voting..." : "Submit Vote"}
    </button>
    {message && message !== "You have already voted in this poll." && (
      <p className="mt-2 text-center text-sm text-green-600">{message}</p>
    )}
  </div>
)}
      </div>
  );
};

export default VoteInterface;
