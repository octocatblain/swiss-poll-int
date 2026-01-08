"use client";

import { baseURL } from "@/app/config/baseUrl";
import { Radio, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

interface PollData {
  id: number;
  title: string;
  county: string;
  totalVotes: number;
  voting_expires_at: string;
  results: Candidate[];
}

export default function LiveMovingPolls() {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const isPollActive = (expiresAt: string) => new Date(expiresAt) > new Date();

  const fetchPollsWithResults = async () => {
    try {
      // Step 1: Get list of active polls
      const res = await fetch(`${baseURL}/api/polls`);
      if (!res.ok) throw new Error("Failed to fetch polls");
      const json = await res.json();

      const activePolls = json.filter((p: any) => isPollActive(p.voting_expires_at));

      // Step 2: Fetch detailed results for each active poll
      const pollsWithDetails = await Promise.all(
        activePolls.map(async (p: any) => {
          try {
            const detailRes = await fetch(`${baseURL}/api/polls/${p.id}`);
            if (!detailRes.ok) return null;
            const detail = await detailRes.json();

            const results: Candidate[] = (detail.results || detail.candidates || []).map((c: any) => ({
              id: c.id || c.candidate_id,
              name: c.name || c.candidate_name,
              voteCount: Number(c.voteCount || c.votes || 0),
            }));

            const totalVotes = results.reduce((sum: number, c: Candidate) => sum + c.voteCount, 0);

            return {
              id: p.id,
              title: p.title,
              county: p.county || p.region || "N/A",
              totalVotes,
              voting_expires_at: p.voting_expires_at,
              results,
            };
          } catch (err) {
            console.error(`Failed to load details for poll ${p.id}`, err);
            return null;
          }
        })
      );

      // Filter out failed fetches
      const validPolls = pollsWithDetails.filter(Boolean) as PollData[];
      setPolls(validPolls);
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch + periodic refresh (live updates)
  useEffect(() => {
    fetchPollsWithResults();
    const interval = setInterval(fetchPollsWithResults, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Rotate polls
  useEffect(() => {
    if (polls.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % polls.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [polls]);

  if (loading) return null;

  if (polls.length === 0) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-yellow-100 px-6 py-3 rounded-full text-sm font-medium z-50 shadow-lg">
        No active polls at the moment
      </div>
    );
  }

  const poll = polls[currentIndex];
  const totalVotes = poll.totalVotes || 1;

  const topCandidates = [...poll.results]
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 2)
    .map((c) => ({
      ...c,
      percentage: totalVotes > 0 ? Math.round((c.voteCount / totalVotes) * 100) : 0,
    }));

  const hasResults = topCandidates.length > 0 && totalVotes > 0;

  return (
    <div className="fixed bottom-4 -full max-w-2xl z-50 pointer-events-none">
      <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-4 pointer-events-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Live + Title + County */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Radio className="w-5 h-5 text-red-600 animate-pulse mt-1 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-lg text-gray-900 truncate">{poll.title}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="font-medium">{poll.county}</span>
                {totalVotes > 0 && (
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {totalVotes.toLocaleString()} votes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Top 2 (Desktop) */}
          {hasResults && (
            <div className="hidden sm:flex items-center gap-6">
              {topCandidates.map((c, i) => (
                <div key={c.id} className="text-center">
                 <p className="font-semibold text-gray-800">{c.name}</p>                                
                  {i === 0 && topCandidates[1] && c.percentage > topCandidates[1].percentage ? (
                    <span className="text-xs text-green-700 animate-pulse transition-all duration-300 font-medium">{c.percentage}%</span>
                  ) : ( <p className="text-sm text-blue-300">
                    {c.percentage}% 
                  </p>)}
                </div>
              ))}
            </div>
          )}

          {/* Right: View Poll */}
          <Link
            href={`/livepolls/FullvotesInterface?id=${poll.id}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition whitespace-nowrap"
          >
            View Poll
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile: Top 2 */}
        {hasResults && (
          <div className="sm:hidden mt-3 pt-3 border-t border-gray-200 flex justify-center gap-8 text-sm">
            {topCandidates.map((c) => (
              <div key={c.id} className="text-center">
                <p className="font-semibold">{c.name}</p>
                <p className="text-green-600">{c.percentage}%</p>
              </div>
            ))}
          </div>
        )}

        {/* Fallback if no votes yet */}
        {!hasResults && (
          <div className="text-center text-sm text-gray-500 mt-2">
            Voting in progress • Results updating soon
          </div>
        )}
      </div>
    </div>
  );
}