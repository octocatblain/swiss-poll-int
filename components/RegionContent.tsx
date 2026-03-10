"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Users, MapPin, Activity, Globe, Loader2 } from "lucide-react";
import useSWR from "swr";
import { baseURL } from "@/app/config/baseUrl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

// --- Interfaces ---
interface PollData {
  id: number;
  title: string;
  region: string;
  total_votes: number;
  voting_expires_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const StatCard = ({ title, value, icon: Icon, accent }: any) => (
  <Card className="relative overflow-hidden border border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-2xl p-5 group transition-all hover:border-white/20">
    <div className={`absolute top-0 left-0 w-1 h-full ${accent} shadow-[2px_0_15px_rgba(0,0,0,0.5)]`} />
    
    <div className="flex items-center justify-between relative z-10">
      <div className="space-y-1">
        <p className="text-[15px] font-bold uppercase tracking-[0.15em] text-blue-400/90">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 shadow-inner`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
  </Card>
);

export default function RegionContent() {
  const { data, error, isLoading } = useSWR<PollData[]>(
    `${baseURL}/api/polls`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const stats = useMemo(() => {
    if (!data || !Array.isArray(data)) return null;
    const now = new Date();
    const totalVotes = data.reduce((sum, poll) => sum + (poll.total_votes || 0), 0);
    const activePollsCount = data.filter(p => new Date(p.voting_expires_at) > now).length;
    
    const regionCount: Record<string, number> = {};
    data.forEach((p) => {
      if (p.region) {
        const name = p.region.replace("_", " ");
        regionCount[name] = (regionCount[name] || 0) + 1;
      }
    });

    const colors = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA", "#F472B6"];
    const chartData = Object.entries(regionCount).map(([name, count], idx) => ({
      name,
      count,
      color: colors[idx % colors.length],
    }));

    return { totalVotes, activePollsCount, totalPolls: data.length, chartData };
  }, [data]);

  if (error) return (
    <div className="m-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 backdrop-blur-md text-red-200 text-center">
      System synchronization failed.
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4 lg:p-8">
      {/* Header Section */}
      <div className="space-y-1 ml-1">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-400" />
          Regional Analytics
        </h2>
        <p className="text-slate-400 text-sm">Real-time distribution of polling activity across monitored sectors.</p>
      </div>
      <Card className="border-none bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="p-3 border-b border-white/10 flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-200 uppercase tracking-widest">Global Insights</span>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="h-48 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{ fill: '#CBD5E1', fontSize: 15, fontWeight: 500 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff' 
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                    {stats?.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Participation" 
          value={stats?.totalVotes.toLocaleString() || "0"} 
          icon={Users} 
          accent="bg-blue-500" 
        />
        <StatCard 
          title="Live Initiatives" 
          value={stats?.activePollsCount || "0"} 
          icon={Activity} 
          accent="bg-emerald-500" 
        />
        <StatCard 
          title="Global Reach" 
          value={stats?.totalPolls || "0"} 
          icon={MapPin} 
          accent="bg-purple-500" 
        />
      </div>
    </div>
  );
}