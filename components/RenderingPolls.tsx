"use client";

import { baseURL } from "@/app/config/baseUrl";
import { Users, X, GripHorizontal, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: 20,
      y: window.innerHeight - 240,
    });
  }, []);

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

  useEffect(() => {
    fetchLivePolls();
    const interval = setInterval(fetchLivePolls, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (polls.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % polls.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [polls.length]);

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
      if (dragRef.current) dragRef.current.style.cursor = "grab";
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
    dragRef.current.style.cursor = "grabbing";
    const rect = dragRef.current.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  if (!position || !polls.length || !isVisible) return null;

  const poll = polls[index];
  const totalVotes = poll.total_votes || 0;

  return (
    <div
      ref={dragRef}
      onMouseDown={handleMouseDown}
      className="fixed z-100 transition-shadow duration-300"
      style={{
        left: position.x,
        top: position.y,
        width: "340px",
      }}
    >
      <div className="group bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/20">
        
        {/* Grab Handle & Close Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-tighter">Live Update</span>
            </div>
            <GripHorizontal className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
            className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <Link 
            href={`/livepolls/FullvotesInterface?id=${poll.id}`}
            className="block group/link"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-sm text-slate-100 leading-tight group-hover/link:text-blue-400 transition-colors">
                {poll.title}
              </h3>
              <ExternalLink className="w-3 h-3 text-slate-500 shrink-0 mt-1" />
            </div>
          </Link>

          <div className="flex flex-wrap gap-2">
            <span className="text-[13px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              {poll.county}
            </span>
            <div className="flex items-center text-[10px] text-slate-400 font-medium ml-auto">
              <Users className="w-3 h-3 mr-1" />
              {totalVotes.toLocaleString()}
            </div>
          </div>

          {/* Leaderboard Style Candidates */}
          <div className="space-y-3 pt-2">
            {poll.top_candidates?.slice(0, 2).map((c, idx) => {
              const percentage = totalVotes > 0 ? Math.round((c.voteCount / totalVotes) * 100) : 0;
              const isFirst = idx === 0;

              return (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isFirst ? "text-white" : "text-slate-400"}>{c.name}</span>
                    <span className={isFirst ? "text-emerald-400" : "text-slate-300"}>{percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out rounded-full ${
                        isFirst ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-slate-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}