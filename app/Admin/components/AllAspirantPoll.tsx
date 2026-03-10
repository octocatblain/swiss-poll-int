"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Loader2, CalendarDays, MapPin, Rows4, 
  Hand, Info, Radio, Search, Filter, X, 
  BarChart3, Globe, LayoutGrid
} from "lucide-react";
import EditDelete from "../createpoll/EditDelete";
import { baseURL } from "@/app/config/baseUrl";
import { CATEGORY_OPTIONS } from "../createpoll/Places";

export interface PollData {
  id: number;
  title: string;
  category?: string | null;
  region?: string | null;
  county?: string | null;
  constituency?: string | null;
  ward?: string | null;
  voting_expires_at: string | null;
  created_at: string | Date;
}

export default function AllApirantPollPage() {
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
        const response = await fetch(`${baseURL}/api/polls`, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        const normalizedPolls: PollData[] = data.map((poll: any) => ({
          ...poll,
          category: poll.category ?? "General",
          created_at: poll.created_at || new Date(),
        }));

        setPolls(normalizedPolls);
        setFilteredPolls(normalizedPolls);
      } catch (err: any) {
        setError(err.message || "Failed to load polls.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPolls();
  }, []);

  const isPollActive = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt).getTime() > Date.now();
  };

  useEffect(() => {
    const filtered = polls.filter((poll) => {
      const status = poll.voting_expires_at && isPollActive(poll.voting_expires_at) ? "Live" : "Ended";
      return (
        (search === "" || poll.title?.toLowerCase().includes(search.toLowerCase())) &&
        (region === "" || poll.region === region) &&
        (county === "" || poll.county === county) &&
        (category === "" || poll.category === category) &&
        (pollstatus === "" || status === pollstatus)
      );
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
      <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-4" />
      <span className="text-slate-500 font-medium tracking-wide">Syncing election data...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      {/* Top Header Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              Poll Management
            </h1>
            <p className="text-sm text-slate-500 font-medium">Monitoring {polls.length} total administrative ballots</p>
          </div>
          <Link 
            href="/Admin/createpoll" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            + Create New Poll
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Advanced Filter Panel */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-6 text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Global Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ballot title..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50/50 focus:bg-white focus:border-blue-400 outline-none transition-all text-sm font-medium"
              />
            </div>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 outline-none transition-all text-sm font-semibold text-slate-700"
            >
              <option value="">Global Regions</option>
              {["National", "Central", "Coast", "Eastern", "Nairobi", "North Eastern", "Nyanza", "Rift Valley", "Western"].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 outline-none transition-all text-sm font-semibold text-slate-700"
            >
              <option value="">Select Jurisdiction (County)</option>
              {[ "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo_Marakwet", "Embu",

              "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",

              "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",

              "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",

              "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru", "Nandi",

              "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",

              "Taita_Taveta", "Tana_River", "Tharaka_Nithi", "Trans_Nzoia",

              "Turkana", "Uasin_Gishu", "Vihiga", "Wajir", "West_Pokot",].map(c => (
                <option key={c} value={c}>{c}</option>
              ))} 
         
            </select>

            <select
              value={pollstatus}
              onChange={(e) => setPollstatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-50/50 focus:border-blue-400 outline-none transition-all text-sm font-semibold text-slate-700"
            >
              <option value="">Activity Status</option>
              <option value="Live">Live / Active</option>
              <option value="Ended">Concluded / Ended</option>
            </select>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.slice(0, 6).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(category === cat ? "" : cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-tighter ${
                    category === cat
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {(search || region || county || category || pollstatus) && (
              <button
                onClick={clearFilters}
                className="text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
              >
                <X className="w-4 h-4" /> Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* Dynamic Poll Grid */}
        {filteredPolls.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-[2rem] p-20 text-center">
            <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No matching records</h3>
            <p className="text-slate-500">Adjust your criteria or try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolls.map((poll) => {
              const active = isPollActive(poll.voting_expires_at);
              return (
                <div key={poll.id} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500 flex flex-col">
                  {/* Visual Progress Bar */}
                  <div className={`h-1.5 w-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {poll.category}
                      </span>
                      <EditDelete pollId={poll.id} />
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                      {poll.title}
                    </h2>

                    <div className="space-y-3 mt-4">
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                          <Globe className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Region</span>
                          <span className="text-xs font-bold text-slate-700">{poll.region || "National"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center text-slate-500 text-[11px] font-semibold uppercase">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {poll.county || "Across Jurisdictions"}
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-black ${active ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                          {active && <Radio className="w-3 h-3" />}
                          {active ? "LIVE" : "ENDED"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex items-center text-slate-400 font-medium text-[11px]">
                          <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                          {new Date(poll.created_at).toLocaleDateString()}
                       </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                    <Link
                      href={`/livepolls/FullvotesInterface?id=${poll.id}`}
                      className="flex items-center justify-center py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all border border-slate-200"
                    >
                      <BarChart3 className="w-3.5 h-3.5 mr-2" /> Results
                    </Link>
                    <Link href={`/Admin/vote/${poll.id}`} className="group/btn">
                      <button className="w-full flex items-center justify-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                        <Hand className="w-3.5 h-3.5 mr-2 group-hover/btn:scale-125 transition-transform" /> Vote
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}