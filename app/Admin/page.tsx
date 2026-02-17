"use client";

import React, { useEffect, useState, useRef } from "react";
import { PlusCircle } from "lucide-react";
import { baseURL } from "../config/baseUrl";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import AllApirantPollPage from "./components/AllAspirantPoll";

export interface PollSummary {
  id: number;
  title: string;
  lastUpdated: Date | string;
}

export default function AdminPage() {
  const { token, isAdmin, logout, loading } = useAuth();
  const [latestPollId, setLatestPollId] = useState<number | null>(null);
  const router = useRouter();
  const fetched = useRef(false);
useEffect(() => {
  if (loading) return;

  if (!token || !isAdmin) {
    router.replace("/Admin/Login");
  }
}, [loading, token, isAdmin, router]);


  // 2. HANDLE DATA FETCHING
  useEffect(() => {
    // Only fetch if we are NOT loading, we HAVE a token, and we haven't fetched yet
    if (loading || !token || !isAdmin || fetched.current) return;
    
    fetched.current = true;

    const fetchLatestPoll = async () => {
      try {
        const res = await fetch(`${baseURL}/api/polls`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          logout();
          router.replace("/");
          return;
        }

        const polls: PollSummary[] = await res.json();
        if (polls && polls.length > 0) setLatestPollId(polls[0].id);
      } catch (err) {
        console.error("Failed to load polls:", err);
      }
    };

    fetchLatestPoll();
  }, [token, isAdmin, loading, logout, router]);

  // 3. RENDER LOGIC (Order matters here!)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  // If loading is done but user isn't an admin, show a brief status 
  // while the useEffect above handles the actual router.replace
  if (!token || !isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-6">

  {/* Page Title */}
  <h2 className="text-2xl font-bold text-gray-800">
    Active Polls
  </h2>

  {/* Action Buttons */}
  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">

    {/* Primary Actions */}
    <a
      href="/Admin/createpoll"
      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700 transition-all"
    >
      + Create Poll
    </a>

    <a
      href="/Admin/National/CreateOpinion"
      className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-all"
    >
      Post Opinion
    </a>

    <a
      href="/Admin/BlogPostForm"
      className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold shadow-sm hover:bg-violet-700 transition-all"
    >
      Post Blog
    </a>

    {/* Divider */}
    <div className="hidden sm:block w-px bg-gray-300 mx-2" />

    {/* Account Actions */}
    <a
      href="/Admin/Login/update-admin"
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
    >
      Update Profile
    </a>

    <button
      onClick={logout}
      className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition shadow-sm"
    >
      Logout
    </button>

  </div>
</div>


        <AllApirantPollPage />
      </div>
    </div>
  );
}