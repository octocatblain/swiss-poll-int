"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Loader2,
  CalendarDays,
  MapPin,
  Rows4,
  Radio,
  ChevronRight,
  Inbox,
  Search,
  X
} from "lucide-react";
import { baseURL } from "@/app/config/baseUrl";
import { CATEGORY_OPTIONS } from "../Admin/createpoll/Places";

export interface PollData {
  id: number;
  title: string;
  category?: string;
  region?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  voting_expires_at: string;
  created_at: string;
}

const LivePollsPage = () => {
  const [polls, setPolls] = useState<PollData[]>([]);
  const [filteredPolls, setFilteredPolls] = useState<PollData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [category, setCategory] = useState("");
  const [pollstatus, setPollstatus] = useState("");

  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls`);
        if (!response.ok) throw new Error("Failed to fetch polls.");
        const data: PollData[] = await response.json();
        setPolls(data);
        setFilteredPolls(data); // Initialize filtered polls
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPolls();
  }, []);

  const isPollActive = (expiresAt: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) > new Date();
  };

  // --- FIX: Logic to filter polls ---
  useEffect(() => {
    const filtered = polls.filter((poll) => {
      const isActive = isPollActive(poll.voting_expires_at);
      const currentStatus = isActive ? "Live" : "Ended";

      const matchesSearch = poll.title?.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === "" || poll.region === region;
      const matchesCounty = county === "" || poll.county === county;
      const matchesCategory = category === "" || poll.category === category;
      const matchesStatus = pollstatus === "" || currentStatus === pollstatus;

      return matchesSearch && matchesRegion && matchesCounty && matchesCategory && matchesStatus;
    });
    setFilteredPolls(filtered);
  }, [search, region, county, category, pollstatus, polls]);

  const clearFilters = () => {
    setSearch("");
    setRegion("");
    setCounty("");
    setCategory("");
    setPollstatus("");
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600 mb-4" />
      <p className="text-slate-600 font-medium">Synchronizing Election Data...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header & Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-12 pb-8 px-4 mb-10">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
            <Rows4 className="text-blue-600 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Active Ballots</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Filter by region, category, or status to find the election results you are looking for.
          </p>
        </div>

        {/* --- FIX: Improved Filter UI --- */}
        <div className="max-w-7xl mx-auto bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>

            <select
              value={pollstatus}
              onChange={(e) => setPollstatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Live">Live</option>
              <option value="Ended">Ended</option>
            </select>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            >
              <option value="">All Regions</option>
              {["National", "Central", "Coast", "Eastern", "Nairobi", "North Eastern", "Nyanza", "Rift Valley", "Western"].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            >
              <option value="">All Counties</option>
              {["Nairobi", "Mombasa", "Kiambu", "Nakuru", "Kisumu"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(category === cat ? "" : cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                    category === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-sm font-bold"
            >
              <X className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* --- FIX: Map over filteredPolls instead of polls --- */}
        {filteredPolls.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Inbox className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No matching polls found</h3>
            <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPolls.map((poll) => {
              const active = isPollActive(poll.voting_expires_at);
              return (
                <div
                  key={poll.id}
                  className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className={`h-1.5 w-full ${active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 text-[10px] font-black bg-blue-50 text-blue-700 rounded-lg uppercase tracking-widest">
                        {poll.category || "General"}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'} text-[10px] font-black`}>
                        {active && <Radio className="w-3 h-3 animate-pulse" />}
                        {active ? "LIVE" : "ENDED"}
                      </div>
                    </div>

                    <h2 className="text-xl font-black text-slate-900 mb-4 line-clamp-2">{poll.title}</h2>

                    <div className="space-y-2 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-tighter">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-blue-500" />
                        {poll.region || "National"} • {poll.county || "All Counties"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate">
                        {poll.constituency ? `Const: ${poll.constituency}` : ""} {poll.ward ? `| Ward: ${poll.ward}` : ""}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <CalendarDays className="w-3.5 h-3.5 mr-2" />
                      Created: {new Date(poll.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link
                      href={`/livepolls/FullvotesInterface?id=${poll.id}&category=${poll.category || ""}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all shadow-lg"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePollsPage;