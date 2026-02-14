"use client";
import React, { useEffect, useState } from "react";
import AllApirantPollPage from "./components/AllAspirantPoll";
import { PlusCircle } from "lucide-react";
import { baseURL } from "../config/baseUrl";


export interface PollSummary {
  id: number;
  title: string;
  lastUpdated: Date | string;
}

export default function Home() {
  const [latestPollId, setLatestPollId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
    setMounted(true);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };
const fetched = React.useRef(false);

useEffect(() => {
  if (fetched.current) return;
  fetched.current = true;

  const fetchLatestPoll = async () => {
    try {
      const res = await fetch(`${baseURL}/api/polls`);
      const polls: PollSummary[] = await res.json();
      if (polls.length > 0) {
        setLatestPollId(polls[0].id);
      }
    } catch (err) {
      console.error("Failed to load polls:", err);
    }
  };

  fetchLatestPoll();
}, []);

  return (
    <div className="max-w-full mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-4 space-y-6">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <h2 className="text-2xl font-bold">Active Polls</h2>
              {mounted && isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>{" "}
                  <a
                    href="Admin/Login/update-admin"
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                  >
                    Update profile
                  </a>{" "}
                  <a
                    href="Admin/BlogPostForm"
                    className="flex items-center p-2 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Post Blog
                  </a>
                     <a
                    href="Admin/National/CreateOpinion"
                    className="flex items-center p-2 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Post Opinion
                  </a>
                  <a
                    href="Admin/createpoll"
                    className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700 transition"
                  >
                    + Create Poll
                  </a>
                </div>
              )}
            </div>
            <AllApirantPollPage />
         </div>
        </div>
  );
}
