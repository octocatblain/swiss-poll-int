"use client";

import { baseURL } from "@/app/config/baseUrl";
import { Radio, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

interface LivePoll {
  id: number;
  title: string;
  category: string;
  county: string;
  voting_expires_at: string;
  total_votes: number;
  top_candidates: Candidate[];
}

export default function LiveMovingPolls() {
  const [polls, setPolls] = useState<LivePoll[]>([]);
  const [index, setIndex] = useState(0);
  const fetching = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 10, y: window.innerHeight -200 });
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const fetchLivePolls = async () => {
    if (fetching.current) return;
    fetching.current = true;
    try {
      const res = await fetch(`${baseURL}/api/polls/live`);
      if (!res.ok) throw new Error("Failed to fetch live polls");
      setPolls(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      fetching.current = false;
    }
  };

  // Fetch once + refresh
  useEffect(() => {
    fetchLivePolls();
    const interval = setInterval(fetchLivePolls, 15000);
    return () => clearInterval(interval);
  }, []);

  // Rotate polls
  useEffect(() => {
    if (polls.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % polls.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [polls.length]);

  // Drag events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    dragging.current = true;
    const rect = dragRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  if (!polls.length || !isVisible) return null;

  const poll = polls[index];
  const totalVotes = poll.total_votes || 0;

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className="fixed z-50 cursor-grab "
      style={{
        left: position.x,
        top: position.y,
        maxWidth: "360px",
      }}
    >
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-3 backdrop-blur relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex gap-3 items-start ">
          <Radio className="w-5 h-5 text-red-600 animate-pulse mt-1" />
          <div >
            <a href={`/livepolls/FullvotesInterface?id=${poll.id}`}>
              <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 cursor-pointer underline text-wrap">
                {poll.title}
              </h3>
            </a>

            <div className="text-xs text-gray-600 mt-1 flex gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                {poll.category}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                {poll.county}
              </span>
              <span className="flex items-center text-gray-700 font-medium">
                <Users className="w-4 h-4 mr-1" />
                {totalVotes.toLocaleString()} votes
              </span>
            </div>
          </div>
        </div>

        {/* Candidates */}
        {poll.top_candidates?.length > 0 && (
          <div className="flex gap-6 mt-4 justify-center">
            {poll.top_candidates.map((c, idx) => {
              const isLeader = idx === 0 && totalVotes > 0;

              return (
                <div
                  key={c.id}
                  className={`text-center px-3 py-2 rounded-xl transition-all duration-300 ${
                    isLeader
                      ? "bg-green-50 scale-110 shadow-lg animate-pulse"
                      : "bg-gray-50 opacity-90"
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      isLeader ? "text-green-800" : "text-gray-700"
                    }`}
                  >
                    {c.name}
                  </p>
                  <p
                    className={`text-lg ${
                      isLeader
                        ? "text-green-600 font-extrabold"
                        : "text-gray-500 font-medium"
                    }`}
                  >
                    {totalVotes > 0
                      ? Math.round((c.voteCount / totalVotes) * 100)
                      : 0}
                    %
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
