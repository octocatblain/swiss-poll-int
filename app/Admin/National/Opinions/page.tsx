"use client";

import { baseURL } from "@/app/config/baseUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

interface Opinion {
  id: number;
  title: string;
  category: string;
  region: string;
  county: string;
  constituency: string;
  ward: string;
  total_votes: number;
  voting_expires_at: string | null;
  status: "LIVE" | "EXPIRED" | "NO_EXPIRY";
  created_at: string;
}

export default function Opinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
const route=useRouter();
  // Fetch all opinions once
  useEffect(() => {
    const fetchOpinions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/api/opinion`);
        const data = await res.json();
        setOpinions(data);
      } catch (error) {
        console.error("Failed to fetch opinions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpinions();
  }, []);

  // Client-side filtering (cleaner + faster)
  const filteredOpinions = useMemo(() => {
    return opinions.filter((opinion) => {
      const matchesCategory = !categoryFilter || opinion.category === categoryFilter;
      const matchesSearch = !searchTerm || 
        opinion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opinion.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [opinions, categoryFilter, searchTerm]);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "LIVE":
        return "Live Now";
      case "EXPIRED":
        return "Ended";
      default:
        return "Ongoing";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="uppercase text-xs tracking-[3px] text-zinc-500 font-medium mb-1">KENYA</div>
            <h1 className="text-5xl font-bold text-zinc-900 tracking-tighter">Public Opinions</h1>
            <p className="text-zinc-600 mt-3 text-lg">Real voices. Real time. Real impact.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-70">
              <input
                type="text"
                placeholder="Search opinions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 pl-12 text-sm focus:outline-none focus:border-zinc-400 transition-colors"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-zinc-400 transition-colors min-w-50"
            >
              <option value="">All Categories</option>
              <option value="Politics">Politics</option>
              <option value="Education">Education</option>
              <option value="Development">Development</option>
              <option value="Presidential">Presidential</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && (
          <div className="flex items-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-zinc-500">Active polls</span>
              <span className="font-semibold text-zinc-900">{opinions.filter(o => o.status === "LIVE" || o.status === "NO_EXPIRY").length}</span>
            </div>
            <div className="h-4 w-px bg-zinc-200"></div>
            <div>
              <span className="text-zinc-500">Total votes cast</span>
              <span className="font-semibold text-zinc-900 ml-2">
                {opinions.reduce((sum, o) => sum + o.total_votes, 0).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filteredOpinions.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">🤔</div>
            <h3 className="text-2xl font-semibold text-zinc-900 mb-2">No opinions found</h3>
            <p className="text-zinc-500">Try changing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpinions.map((opinion) => (
              <div
                key={opinion.id}
                className="group bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Top accent bar */}
                <div className="h-1.5 bg-linear-to-r from-zinc-900 to-zinc-700" />

                <div className="p-8 flex-1 flex flex-col">
                  {/* Category + Status */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="uppercase text-[10px] tracking-[2px] font-mono text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full">
                      {opinion.category}
                    </div>

                    <div
                      className={`text-xs font-semibold px-4 py-1.5 rounded-2xl border ${getStatusBadge(
                        opinion.status
                      )}`}
                    >
                      {getStatusLabel(opinion.status)}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl leading-7 font-semibold text-zinc-900 mb-8 line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {opinion.title}
                  </h2>

                  {/* Location */}
                  <div className="space-y-3 mb-10 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">🇰🇪</div>
                      <div>
                        <p className="text-zinc-500 text-xs">Region</p>
                        <p className="font-medium text-zinc-800">{opinion.region}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs">
                      <div>
                        <p className="text-zinc-500">County</p>
                        <p className="font-medium text-zinc-900">{opinion.county}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500">Constituency</p>
                        <p className="font-medium text-zinc-900">{opinion.constituency}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500">Ward</p>
                        <p className="font-medium text-zinc-900">{opinion.ward}</p>
                      </div>
                    </div>
                  </div>

                  {/* Votes */}
                  <div className="mt-auto pt-8 border-t border-zinc-100 flex items-end gap-3">
                    <div className="text-5xl font-bold text-zinc-900 tabular-nums tracking-tighter">
                      {opinion.total_votes.toLocaleString()}
                    </div>
                    <div className="text-xs uppercase leading-none pb-1.5">
                      <span className="text-emerald-600 font-semibold">votes</span>
                      <br />
                      <span className="text-zinc-400">cast</span>
                    </div>

                    {opinion.voting_expires_at && (
                      <div className="ml-auto text-right text-xs text-zinc-500">
                        Ends{" "}
                        <span className="font-medium text-zinc-900">
                          {new Date(opinion.voting_expires_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
           {/* Footer action */}
                <div className="border-t border-zinc-100 bg-zinc-50 px-8 py-5 flex items-center justify-between text-xs font-medium">
                  <div className="text-zinc-400">View results →</div>
                  <div><a onClick={()=>route.push(`/livepolls/VoteOpinion/${opinion.id}`)} className="bg-blue-300 rounded-2xl p-2 cursor-pointer">Join the conversation</a></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}