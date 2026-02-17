"use client";
import React, { useState, useEffect } from "react";
import KenyaMap from "../../../components/maps";
import PollResults from "../../Admin/components/pollResults";
import { baseURL } from "@/app/config/baseUrl";

export default function CountyPolls() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [pollId, setPollId] = useState<number | null>(null);
  const [liveCounties, setLiveCounties] = useState<string[]>([]);

  // Fetch live counties with active polls
  useEffect(() => {
    async function fetchLiveCounties() {
      try {
        const res = await fetch(`${baseURL}/api/polls/live`);
        const data = await res.json();
      
      // Extract only county names
      const counties = (data || []).map((poll: any) => poll.county);
      setLiveCounties(counties);
      } catch (error) {
        console.error("Error fetching live counties:", error);
      }
    }
    fetchLiveCounties();
  }, []);

  const handleCountySelect = async (county: string) => {
    setSelectedCounty(county);
    try {
      const res = await fetch(
        `${baseURL}/api/county/${encodeURIComponent(county)}`
      );
      const data = await res.json();
      setPollId(data.pollId || null);
    } catch (error) {
      console.error("Error fetching county poll:", error);
      setPollId(null);
    }
  };

  return (

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
        {/* Map Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full md:w-2/3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Kenya Counties Map
          </h2>
          <KenyaMap
            onSelectCounty={handleCountySelect}
            liveCounties={liveCounties} 
          />
        </div>
      </div>

  );
}
