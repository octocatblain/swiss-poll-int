"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Frown, CalendarDays, MapPin, Rows4, Hand, Info, Radio } from "lucide-react";
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

  // Fetch polls
  useEffect(() => {
    const fetchAllPolls = async () => {
      try {
        const response = await fetch(`${baseURL}/api/polls`, { cache: "no-store" });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format from server");

        const normalizedPolls: PollData[] = data.map((poll: any) => ({
          id: poll.id,
          title: poll.title || "Untitled Poll",
          category: poll.category ?? "Uncategorized",
          region: poll.region ?? null,
          county: poll.county ?? null,
          constituency: poll.constituency ?? null,
          ward: poll.ward ?? null,
          voting_expires_at: poll.voting_expires_at ?? null,
          created_at: poll.created_at || new Date(),
        }));

        setPolls(normalizedPolls);
        setFilteredPolls(normalizedPolls);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load polls. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPolls();
  }, []);

  // Poll activity check
  const isPollActive = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt).getTime() > Date.now();
  };

  // Filter polls whenever filter state changes
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

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setRegion("");
    setCounty("");
    setCategory("");
    setPollstatus("");
    setFilteredPolls(polls);
  };

  // Loading state
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
        <p className="ml-4 text-xl text-gray-700">Loading polls...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <Frown className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-red-700 font-semibold mb-2">Error Loading Polls</p>
        <p className="text-lg text-red-600 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  // No polls
  if (polls.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Info className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">No polls available yet.</p>
        <Link href="/Admin/createpoll" className="mt-6 text-blue-600 hover:underline">
          Create the first poll →
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center flex items-center justify-center">
          <Rows4 className="mr-3 text-blue-600 w-10 h-10" />
          All Aspirants Polls
        </h1>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap justify-center gap-3 items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(category === cat ? "" : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search poll title..."
            className="p-2 border border-gray-300 rounded-lg grow max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={pollstatus}
            onChange={(e) => setPollstatus(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white"
          >
            <option value="">Poll Status</option>
            {["Live", "Ended"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white"
          >
            <option value="">All Regions</option>
            {[
              "National", "Central", "Coast", "Eastern", "Nairobi",
              "North Eastern", "Nyanza", "Rift Valley", "Western"
            ].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 bg-white"
          >
            <option value="">All Counties</option>
            {[
              "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo_Marakwet", "Embu",
              "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
              "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
              "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
              "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru", "Nandi",
              "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
              "Taita_Taveta", "Tana_River", "Tharaka_Nithi", "Trans_Nzoia",
              "Turkana", "Uasin_Gishu", "Vihiga", "Wajir", "West_Pokot",
            ].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>

        {/* Poll Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => {
            const isActive = poll.voting_expires_at && isPollActive(poll.voting_expires_at);

            return (
              <div
                key={poll.id}
                className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Radio className={`w-5 h-5 ${isActive ? "text-green-500 animate-pulse" : "text-gray-400"}`} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {poll.title}
                  </h2>

                  <EditDelete pollId={poll.id} />
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">{poll.category || "No category"}</span>
                </p>

                <div className="text-sm text-gray-500 space-y-2 mb-4">
                  {poll.region && (
                    <p className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {poll.region}
                    </p>
                  )}
                  {(poll.county || poll.constituency || poll.ward) && (
                    <p className="text-xs">
                      {poll.county && `County: ${poll.county}`}
                      {poll.constituency && ` | Const: ${poll.constituency}`}
                      {poll.ward && ` | Ward: ${poll.ward}`}
                    </p>
                  )}
                  <p className="flex items-center text-xs">
                    <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                    {new Date(poll.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/livepolls/FullvotesInterface?id=${poll.id}`}
                    className="flex-1 text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-medium"
                  >
                    View Results
                  </Link>

                  <Link href={`/Admin/vote/${poll.id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
                      <Hand className="w-5 h-5 mr-2" />
                      Vote Now
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
