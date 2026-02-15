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

console.log("AdminPage rendered →", { loading, hasToken: !!token, isAdmin });
  // 1. HANDLE REDIRECTION IN ONE PLACE
  useEffect(() => {
    if (!loading) {
      if (!token || !isAdmin) {
        console.log("Not authorized, redirecting...");
        router.replace("/Admin/Login");
      }
    }
  }, [token, isAdmin, loading, router]);

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
          router.replace("/Admin/Login");
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
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-2xl font-bold">Active Polls</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
            <a
              href="/Admin/Login/update-admin"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
            >
              Update profile
            </a>
            <a
              href="/Admin/BlogPostForm"
              className="flex items-center p-2 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Post Blog
            </a>
            <a
              href="/Admin/National/CreateOpinion"
              className="flex items-center p-2 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Post Opinion
            </a>
            <a
              href="/Admin/createpoll"
              className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700 transition"
            >
              + Create Poll
            </a>
          </div>
        </div>

        <AllApirantPollPage />
      </div>
    </div>
  );
}