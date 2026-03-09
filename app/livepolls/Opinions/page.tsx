"use client";

import { useAuth } from "@/app/Admin/AuthContext";
import { baseURL } from "@/app/config/baseUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

interface Opinion {
  id: number;
  title: string;
  category: string;
  region: string;
  county: string;
   total_responses: number;
  voting_expires_at: string | null;
  status: "ONGOING" | "ENDED" ;
  created_at: string;
}

export default function Opinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
const { token,isAdmin} = useAuth();

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

  const filteredOpinions = useMemo(() => {
    return opinions.filter((opinion) => {
      const matchesSearch = !searchTerm || 
        opinion.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [opinions, searchTerm]);

const getStatusBadge = (expiresAt: string | null) => {
  const status = getOpinionStatus(expiresAt);

  return status === "ONGOING"
    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
    : "bg-rose-100 text-rose-700 border border-rose-200";
};
const getOpinionStatus = (expiresAt: string | null) => {
  if (!expiresAt) return "ONGOING";

  const expiry = new Date(expiresAt).getTime();
  const now = Date.now();

  return expiry > now ? "ONGOING" : "ENDED";
};
const getStatusLabel = (expiresAt: string | null) => {
  const status = getOpinionStatus(expiresAt);
  return status === "ONGOING" ? "Ongoing" : "Ended";
};
  const handleEdit =async (opinionId: number) => {
    route.push(`/Admin/National/EditOpinion/${opinionId}`);
  }
const handleDelete = async (opinionId: number) => {
  if (!confirm("Are you sure you want to delete this opinion? This cannot be undone.")) {
    return;
  }

  try {
    const res = await fetch(`${baseURL}/api/opinion/${opinionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `Failed to delete opinion: ${res.status}`);
    }

    alert("Opinion deleted successfully!");
    // Remove deleted opinion from state instead of full refresh
    setOpinions((prev) => prev.filter((o) => o.id !== opinionId));
  } catch (err: any) {
    console.error("Delete error:", err);
    alert(err.message || "Error deleting opinion. Check console for details.");
  }
};

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="p-6 lg:p-12 ">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 mb-4">
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
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {!loading && (
          <div className="flex items-center gap-8 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-zinc-500">Active polls</span>
              <span className="font-semibold text-zinc-900">{opinions.filter(o => o.status === "ONGOING" || o.status === "ENDED").length}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        opinion.voting_expires_at
                      )}`}
                    >
                      {getStatusLabel(opinion.voting_expires_at)}
                    </div>
                  </div>

                  {/* Title */}<div className="flex items-center justify-between">
                         <h2 className="text-2xl font-semibold text-zinc-900 mb-8 line-clamp-3 group-hover:text-indigo-600 transition-colors">
                    {opinion.title}
                  </h2>
{isAdmin && (
  <div className="flex gap-2"> <button
    onClick={() => handleDelete(opinion.id)}
    className="p-2 rounded-full border border-red-400 text-red-600 text-sm font-medium 
               hover:bg-red-600 hover:text-white hover:border-red-600 
               transition-all duration-200"
  >
    Delete
  </button>
   <button
    onClick={() => handleEdit(opinion.id)}
    className="p-2 rounded-full border border-green-400 text-green-600 text-sm font-medium 
               hover:bg-green-600 hover:text-white hover:border-green-600 
               transition-all duration-200"
  >
    Edit
  </button>
  </div>
 

)}
                  </div>
             

                  {/* Location */}
                  <div className="space-y-3 mb-10 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">🇰🇪</div>
                      <div>
                        <p className="text-zinc-500 text-xs">Region</p>
                        <p className="font-medium text-zinc-800">{opinion.region}</p>
                      </div>
                    </div>

                      <div>
                        <p className="text-zinc-500">County</p>
                        <p className="font-medium text-zinc-900">{opinion.county}</p>
                      </div>
                                    </div>

                  {/* Votes */}
                  <div className="mt-auto pt-8 border-t border-zinc-100 flex items-end gap-3">
              <div className="flex items-end gap-3">
  <div className="flex justify-center items-center gap-3">
    <div className="text-3xl font-bold text-emerald-600">
      {opinion.total_responses?.toLocaleString() || 0}
    </div>
    <div className="text-xs uppercase text-zinc-400 tracking-wide">
      Votes Cast
    </div>
  </div>
</div>


                    {opinion.voting_expires_at && (
                      <div className="ml-auto text-right text-xs text-zinc-500">
                        Ends{" "}
                        <span className="font-medium text-zinc-900">
                          {new Date(opinion.voting_expires_at).toLocaleDateString("en-KE", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
  minute: "2-digit",   hour12: true,
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
           {/* Footer action */}
 <div className="border-t border-zinc-100 bg-zinc-50 p-3 flex items-center justify-between">

  {/* View Results Button */}
  {isAdmin && (
  <button
    onClick={() => route.push(`/livepolls/OpinionResults/${opinion.id}`)}
    className="p-3 rounded-full border border-zinc-300 text-zinc-700 text-sm font-medium 
               hover:bg-zinc-900 hover:text-white hover:border-zinc-900 
               transition-all duration-200"
  >
    View Results →
  </button>)}

  {/* Join Conversation Button */}
  <button
    onClick={() => route.push(`/livepolls/VoteOpinion/${opinion.id}`)}
    className="p-3 rounded-full bg-emerald-600 text-white text-sm font-semibold 
               hover:bg-emerald-700 
               shadow-sm hover:shadow-md 
               transition-all duration-200"
  >
   share Opinion
  </button>

</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}