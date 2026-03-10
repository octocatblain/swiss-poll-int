"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  BarChart2,
  PieChart as PieChartIcon,
  Users,
  Clock,
  MapPin,
  Building2,
  Printer,
  UserCircle2,
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { baseURL } from "@/app/config/baseUrl";
import { useAuth } from "../AuthContext";

interface PollFullDetailsProps {
  category?: string;
  id?: string;
}

export interface PollCandidate {
  name: string;
  voteCount: number;
  percentage: string;
  profile?: string;
  party?: string;
}

export interface PollData {
  id: number;
  title: string;
  category: string;
  voting_expires_at: string | null;
  totalVotes: number;
  spoiled_votes: number;
  region?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  results: PollCandidate[]; 
}

interface PollSummary {
  id: number;
  title: string;
  category: string;
}

const MODERN_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const PollFullDetails = ({ category, id }: PollFullDetailsProps) => {
  const [data, setData] = useState<PollData | null>(null);
  const [polls, setPolls] = useState<PollSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const { isAdmin } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let activePollId = id;

        if (!id && category) {
          const listRes = await axios.get<PollSummary[]>(`${baseURL}/api/polls?category=${category}`);
          if (isMounted) setPolls(listRes.data);
          
          if (listRes.data.length > 0) {
            activePollId = listRes.data[0].id.toString();
          } else {
            if (isMounted) {
              setData(null);
              setLoading(false);
            }
            return;
          }
        }

        if (activePollId) {
          const detailsRes = await axios.get<PollData>(`${baseURL}/api/polls/${activePollId}`);
          if (isMounted) setData(detailsRes.data);
        }
      } catch (err) {
        if (isMounted) setError("Unable to synchronize with election server.");
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [category, id]);

  useEffect(() => {
    if (!data?.voting_expires_at) return;
    const interval = setInterval(() => {
      const now = new Date();
      const expires = new Date(data.voting_expires_at as string); 
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("Voting closed");
        clearInterval(interval);
      } else {
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setCountdown(`${h}h ${m}m ${s}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data?.voting_expires_at]);

  const stats = useMemo(() => {
    if (!data || !data.results) return null;
    const chartData = data.results.map(c => ({
      ...c,
      displayName: c.name.length > 10 ? c.name.substring(0, 10) + "..." : c.name,
      votes: c.voteCount,
      percentage: parseFloat(c.percentage) || 0,
    }));
    const valid = chartData.reduce((sum, c) => sum + c.votes, 0);
    const spoiled = data.spoiled_votes || 0;
    const turnout = data.totalVotes > 0 ? (((valid + spoiled) / data.totalVotes) * 100).toFixed(2) : "0.00";
    return { chartData, valid, spoiled, turnout };
  }, [data]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <RefreshCcw className="w-10 h-10 text-blue-500 animate-spin mb-4" />
      <p className="text-slate-500 font-medium">Fetching Live Election Data...</p>
    </div>
  );

  if (error || !data || !stats) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="max-w-md w-full text-center p-8">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Data Unavailable</h2>
        <p className="text-slate-500 mb-6">{error || "No active poll found for this selection."}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">Retry Connection</button>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-widest mb-1">
              <span className="bg-blue-50 px-2 py-0.5 rounded">{data.category || "General"}</span>
              <ChevronRight className="w-3 h-3" />
              <span>Live Results</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{data.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={`px-3 py-1.5 text-sm ${countdown === "Voting closed" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700 border border-emerald-100 animate-pulse"}`}>
              <Clock className="w-4 h-4 mr-2" /> {countdown}
            </Badge>
            {isAdmin && (
              <button onClick={() => window.print()} className="p-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-600">
                <Printer className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard icon={Users} label="Registered" value={data.totalVotes.toLocaleString()} sub="Total Voters" />
          <MetricCard icon={ShieldCheck} label="Valid" value={stats.valid.toLocaleString()} sub="Verified Ballots" color="emerald" />
          <MetricCard icon={AlertCircle} label="Spoiled" value={stats.spoiled.toLocaleString()} sub="Rejected Ballots" color="rose" />
          <MetricCard icon={BarChart2} label="Turnout" value={`${stats.turnout}%`} sub="Participation Rate" color="indigo" />
        </div>

        <div className="flex flex-wrap gap-6 bg-white p-4 rounded-xl border border-slate-200 text-sm">
          <GeoTag icon={MapPin} label="Region" value={data.region} />
          <GeoTag icon={Building2} label="County" value={data.county} />
          <GeoTag icon={Building2} label="Constituency" value={data.constituency} />
          <GeoTag icon={Building2} label="Ward" value={data.ward} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-sm font-bold flex items-center gap-2"><PieChartIcon className="w-4 h-4 text-indigo-500" /> Vote Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-75">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={stats.chartData} dataKey="votes" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5}>
                      {stats.chartData.map((_, i) => <Cell key={i} fill={MODERN_COLORS[i % MODERN_COLORS.length]} strokeWidth={0} />)}
                    </Pie>
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-50 bg-slate-50/30">
              <CardTitle className="text-sm font-bold flex items-center gap-2"><BarChart2 className="w-4 h-4 text-emerald-500" /> Votes by Candidate</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-75">
                <ResponsiveContainer>
                  <BarChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    {/* Use displayName for XAxis to keep it tidy */}
                    <XAxis dataKey="displayName" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <RechartsTooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                    <Bar dataKey="votes" barSize={30} radius={[4, 4, 0, 0]}>
                      {stats.chartData.map((_, i) => <Cell key={i} fill={MODERN_COLORS[i % MODERN_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="w-2 h-6 bg-blue-600 rounded-full"/>
                <h3 className="text-lg font-bold text-slate-800">Candidate Performance Matrix</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <tbody>
                        <tr className="bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-400 text-[10px] uppercase bg-slate-50 border-b border-slate-100">Candidate Name</td>
                            {stats.chartData.map((c, i) => (
                                <td key={i} className="p-4 font-bold text-slate-900 border-b border-slate-100 text-center">{c.name}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-slate-400 text-[10px] uppercase bg-slate-50 border-b border-slate-100">Performance</td>
                            {stats.chartData.map((candidate, index) => (
                                <td key={index} className="p-6 text-center border-b border-slate-100">
                                    <div className="relative inline-block group">
                                        <svg className="h-20 w-20 transform -rotate-90">
                                            <circle cx="40" cy="40" r="34" stroke="#f1f5f9" strokeWidth="6" fill="none" />
                                            <circle cx="40" cy="40" r="34" stroke={MODERN_COLORS[index % MODERN_COLORS.length]} strokeWidth="6" fill="none"
                                                strokeDasharray={`${(2 * Math.PI * 34 * candidate.percentage) / 100} ${2 * Math.PI * 34}`}
                                                strokeLinecap="round" className="transition-all duration-1000" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {candidate.profile ? (
                                                <img src={candidate.profile} alt="" className="h-12 w-12 rounded-full object-cover ring-4 ring-white shadow-sm" />
                                            ) : (
                                                <UserCircle2 className="h-12 w-12 text-slate-200" />
                                            )}
                                        </div>
                                    </div>
                                    <p className="mt-2 text-sm font-black text-slate-800">{candidate.percentage.toFixed(1)}%</p>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-slate-400 text-[10px] uppercase bg-slate-50 border-b border-slate-100">Party Affiliation</td>
                            {stats.chartData.map((c, i) => (
                                <td key={i} className="p-4 text-center border-b border-slate-100 text-slate-600 font-medium text-sm">{c.party || "Independent"}</td>
                            ))}
                        </tr>
                        <tr>
                            <td className="p-4 font-bold text-slate-400 text-[10px] uppercase bg-slate-50">Total Votes</td>
                            {stats.chartData.map((c, i) => (
                                <td key={i} className="p-4 text-center font-bold text-blue-600">{c.votes.toLocaleString()}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </main>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const candidate = payload[0].payload;
        return (
            <div className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-xs border border-slate-700">
                <p className="font-bold text-sm mb-1 border-b border-slate-700 pb-2">{candidate.name}</p>
                <div className="space-y-1 mt-2">
                    <p className="flex justify-between gap-4">
                        <span className="text-slate-400">Votes:</span>
                        <span className="text-blue-400 font-black">{candidate.votes.toLocaleString()}</span>
                    </p>
                    <p className="flex justify-between gap-4">
                        <span className="text-slate-400">Share:</span>
                        <span className="text-emerald-400 font-black">{candidate.percentage.toFixed(1)}%</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const MetricCard = ({ icon: Icon, label, value, sub, color = "blue" }: any) => {
    const theme: any = {
        blue: "text-blue-600 bg-blue-50",
        emerald: "text-emerald-600 bg-emerald-50",
        rose: "text-rose-600 bg-rose-50",
        indigo: "text-indigo-600 bg-indigo-50"
    };
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${theme[color]}`}><Icon className="w-5 h-5" /></div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
                    <p className="text-xl font-black text-slate-900 leading-none my-1">{value}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
                </div>
            </CardContent>
        </Card>
    );
};

const GeoTag = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-300" />
        <span className="text-slate-400 font-medium">{label}:</span>
        <span className="font-bold text-slate-700">{value || "—"}</span>
    </div>
);

export default PollFullDetails;