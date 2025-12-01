"use client";

import React, { useState } from "react";
import KenyaMap from "../../../components/maps";
import PollResults from "../../Admin/components/pollResults";
import { baseURL } from "@/app/config/baseUrl";

export default function CountyPolls() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [pollId, setPollId] = useState<number | null>(null);

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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6 md:p-10">
      {/* Page Header */}
      <header className="text-center mb-10">
        <p className="text-gray-600 text-sm md:text-base">
          Click on a county on the map to view its poll results.
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start justify-center">
        {/* Map Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full md:w-2/3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Kenya Counties Map
          </h2>
          <KenyaMap onSelectCounty={handleCountySelect} />
        </div>

        {/* Poll Results Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full md:w-1/3 flex flex-col items-center justify-center">
          {pollId && selectedCounty ? (
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Poll Results for {selectedCounty}
              </h2>
              <PollResults pollId={pollId} />
            </div>
          ) : selectedCounty ? (
            <p className="text-gray-500 text-center">
              No poll found for <strong>{selectedCounty}</strong>.
            </p>
          ) : (
            <p className="text-gray-500 text-center">
              Click a county on the map to view its poll.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
