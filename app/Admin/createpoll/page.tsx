"use client";

import React, { useEffect, useState } from "react";
import {
  CATEGORY_OPTIONS,
  countyAssemblyWardMap,
  countyConstituencyMap,
  regionCountyMap,
} from "./Places";
import { useRouter, useSearchParams } from "next/navigation";

import { Plus, X, Upload, Send, Megaphone } from "lucide-react";
import { baseURL } from "@/app/config/baseUrl";

interface Competitor {
  name: string;
  party: string;
  profileFile: File | null;
  profileUrl: string | null;
}

export default function CreatePoll() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pollId = searchParams.get("pollId");
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [county, setCounty] = useState("");
  const [constituency, setConstituency] = useState("");
  const [ward, setWard] = useState("");
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { name: "", party: "", profileFile: null, profileUrl: null },
  ]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const counties = region ? regionCountyMap[region] : [];
  const constituencies = county ? countyConstituencyMap[county] : [];
  const wards = constituency ? countyAssemblyWardMap[constituency] : [];
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
    useEffect(() => {
    if (!pollId) return;
    setIsEditMode(true);
    setLoading(true);

    const fetchPoll = async () => {
      try {
        const res = await fetch(`${baseURL}/api/polls/${pollId}`);
        if (!res.ok) throw new Error("Failed to fetch poll");
        const data = await res.json();

        setTitle(data.title || "");
        setCategory(data.category || "");
        setRegion(data.region || "");
        setCounty(data.county || "");
        setConstituency(data.constituency || "");
        setWard(data.ward || "");
setCompetitors(
  data.competitors?.length
    ? data.competitors.map((c: any) => ({
        name: c.name,
        party: c.party,
        profileFile: null,
        profileUrl: c.profile || null, // ✅ include image
      }))
    : [{ name: "", party: "", profileFile: null, profileUrl: null }]
);

      } catch (err) {
        console.error("❌ Error fetching poll:", err);
        setMessage("❌ Failed to load poll details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [pollId]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    const updated = [...competitors];
    updated[index].profileFile = file;
    setCompetitors(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage("");

    if (!title || !category || !region || !county ){
      setMessage("❌ Please fill in all required poll details.");
      setSubmitting(false);
      return;
    }
    if (competitors.some(comp => !comp.name)) {
      setMessage("❌ Please fill in all competitor details.");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("region", region);
    formData.append("county", county);
    formData.append("constituency", constituency);
    formData.append("ward", ward);
    formData.append(
      "competitors",
      JSON.stringify(competitors.map(({ name, party }) => ({ name, party })))
    );

    competitors.forEach((competitor, index) => {
      if (competitor.profileFile) {
        formData.append(`profile${index}`, competitor.profileFile);
      }
    });

   try {
      const res = await fetch(
        `${baseURL}/api/polls${isEditMode ? `/${pollId}` : ""}`,
        {
          method: isEditMode ? "PUT" : "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to submit form");
      setMessage(isEditMode ? "✅ Poll updated successfully!" : "✅ Poll created successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save poll.");
    } finally {
      setSubmitting(false);
    }
  };

  const removeCompetitor = (index: number) => {
    if (competitors.length === 1) {
      setMessage("⚠️ You must have at least one competitor.");
      return;
    }
    const newCompetitors = [...competitors];
    newCompetitors.splice(index, 1);
    setCompetitors(newCompetitors);
    setMessage("");
  };

  const updateCompetitor = (index: number, field: keyof Competitor, value: string | File | null) => {
    const updated = [...competitors];
    if (field === 'profileFile') {
      updated[index][field] = value as File | null;
    } else {
      updated[index][field] = value as string;
    }
    setCompetitors(updated);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-8 border border-gray-200">
   <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <Megaphone className="w-8 h-8 text-blue-600 mr-3" />
          {isEditMode ? "Edit Poll" : "Create New Poll"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Details Section */}
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Poll Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800"
                placeholder="e.g., Presidential Election Poll"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                                    }}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                  required
                >
                  <option value="" disabled>Select a category</option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Location Details */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCounty("");
                  setConstituency("");
                  setWard("");
                }}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white"
                required
              >
                <option value="" disabled>Select region</option>
                {Object.keys(regionCountyMap).map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
                County <span className="text-red-500">*</span>
              </label>
              <select
                id="county"
                value={county}
                onChange={(e) => {
                  setCounty(e.target.value);
                  setConstituency("");
                  setWard("");
                }}
                disabled={!region}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!region ? 'opacity-60 cursor-not-allowed' : ''}`}
                required
              >
                <option value="" disabled>Select county</option>
                {counties.map((cty) => (
                  <option key={cty} value={cty}>
                    {cty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="constituency" className="block text-sm font-medium text-gray-700 mb-2">
                Constituency 
              </label>
              <select
                id="constituency"
                value={constituency}
                onChange={(e) => { setConstituency(e.target.value); setWard("") }}
                disabled={!county}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!county ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                <option value="" disabled>Select Constituency</option>
                {constituencies.map((constituency) => (
                  <option key={constituency} value={constituency}>
                    {constituency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
                Ward 
              </label>
              <select
                id="ward"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                disabled={!constituency}
                className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-800 bg-white ${!constituency ? 'opacity-60 cursor-not-allowed' : ''}`}
                     >
                <option value="" disabled>Select Ward</option>
                {wards.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Competitors Section */}
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Aspirant</h3>
          <div className="space-y-4">
            {competitors.map((comp, index) => (
              <div key={index} className="relative p-5 border border-gray-200 rounded-xl shadow-sm bg-gray-50">
                {competitors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompetitor(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full bg-white shadow-sm"
                    title="Remove competitor"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <h4 className="text-lg font-medium text-gray-700 mb-3">Aspirant {index + 1}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor={`comp-name-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id={`comp-name-${index}`}
                      value={comp.name}
                      onChange={(e) => updateCompetitor(index, 'name', e.target.value)}
                      placeholder="Aspirant Name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`comp-party-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Party</label>
                    <input
                      type="text"
                      id={`comp-party-${index}`}
                      value={comp.party}
                      onChange={(e) => updateCompetitor(index, 'party', e.target.value)}
                      placeholder="Party Affiliation/If Independent leave blank"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                  <div>
                    <label htmlFor={`profile-file-${index}`} className="block text-xs font-medium text-gray-600 mb-1">Profile Image</label>
                   
                {(comp.profileFile || comp.profileUrl) && (
    <img
      src={
        comp.profileFile
          ? URL.createObjectURL(comp.profileFile)
          : comp.profileUrl || ""
      }
      alt="Profile Preview"
      className="w-20 h-20 object-cover rounded-md mb-2 border border-gray-300"
    />
  )}     
                    <label
                      htmlFor={`profile-file-${index}`}
                      className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-100 transition-colors duration-200 text-gray-700 text-sm"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {comp.profileFile ? comp.profileFile.name : 'Choose File'}
                    </label>
                    <input
                      type="file"
                      id={`profile-file-${index}`}
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, index)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
         <button
            type="button"
            onClick={() =>
              setCompetitors([...competitors, { name: "", party: "", profileFile: null, profileUrl: null }])
            }
            className="bg-blue-500 text-white p  rounded-lg px-4 py-2"
          >
             Add Competitor
          </button>
   
       <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 mt-6 font-semibold rounded-lg ${
              submitting
                ? "bg-gray-400"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isEditMode ? "Update Poll" : "Create Poll"}
          </button>
          </div>
        </form>
        {message && (
          <p className={`text-center mt-6 text-base font-medium ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
