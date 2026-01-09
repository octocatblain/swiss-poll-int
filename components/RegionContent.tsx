"use client";

import { Card } from "@/components/ui/card";
import { Users, MapPin, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
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

// Poll interface
interface PollData {
  id: number;
  title: string;
  region: string;
  total_votes: number;
  voting_expires_at: string;
}

// Chart data interface
interface ChartData {
  name: string;
  value: number;
  count: number;
  color: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ChartLoading = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground space-y-2">
    <Loader2 className="h-8 w-8 animate-spin" />
    <span>{message}</span>
  </div>
);

export default function RegionContent() {
  const [regionData, setRegionData] = useState<ChartData[]>([]);
  const { data, error, isLoading } = useSWR<PollData[]>(
    `${baseURL}/api/polls`,
    fetcher,
    { refreshInterval: 5000 }
  );

  const [totalVotes, setTotalVotes] = useState(0);
  const [activePollsCount, setActivePollsCount] = useState(0);

  useEffect(() => {
    if (data && Array.isArray(data)) {
 const total =
    data && Array.isArray(data)
      ? data.reduce((sum, poll) => sum + (poll.total_votes || 0), 0)
      : 0;
      console.log("Total Votes Calculated:", total);
      setTotalVotes(total);
      const now = new Date();
      const activePolls = data.filter(
        (poll) => new Date(poll.voting_expires_at) > now
      );
      setActivePollsCount(activePolls.length);
      const regionCount: { [key: string]: number } = {};
      data.forEach((poll) => {
        if (poll.region) regionCount[poll.region] = (regionCount[poll.region] || 0) + 1;
      });

      const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#FBBF24"];

      const processedData = Object.entries(regionCount).map(([region, count], idx) => ({
        name: region.replace("_", " "),
        value: count,
        count,
        color: colors[idx % colors.length],
      }));

      setRegionData(processedData);
    }
  }, [data]);

  if (error)
    return <div className="text-center text-destructive mt-6">Failed to load data</div>;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <Card className="p-3 bg-card/80 backdrop-blur-sm shadow-xl rounded-2xl">
        <h3 className="text-lg font-bold mb-4">Polls By Regionals</h3>
        {isLoading ? (
          <ChartLoading />
        ) : !regionData.length ? (
          <div className="text-center text-gray-500 py-10">No regional data available</div>
        ) : (
          <div className="h-48 w-full">
<ResponsiveContainer width="100%" height="100%">
  <BarChart
    data={regionData}
    layout="vertical"
    margin={{ top: 5, left: 20, bottom: 5 }}
  >
    <XAxis type="number" />
    <YAxis type="category" dataKey="name" width={120} />
    <Tooltip
      formatter={(value: number) => `${value ?? 0} polls`}
    />
    <Bar dataKey="value">
      {regionData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>

          </div>
        )}
      </Card>       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        {/* Total Votes */}
        <Card className="flex flex-col items-center justify-center p-3 bg-linear-to-r from-blue-50 via-blue-100 to-blue-50 shadow-lg rounded-2xl">
          <Users className="w-6 h-6 mb-2 text-blue-600" />
          <span className="text-lg font-bold">{totalVotes.toLocaleString()}</span>
          <span className="text-sm text-gray-600">Total Votes</span>
        </Card>

        {/* Active Polls */}
        <Card className="flex flex-col items-center justify-center p-3 bg-linear-to-r from-green-50 via-green-100 to-green-50 shadow-lg rounded-2xl">
          <MapPin className="w-6 h-6 mb-2 text-green-600" />
          <span className="text-lg font-bold">{activePollsCount}</span>
          <span className="text-sm text-gray-600">Active Polls</span>
        </Card>

        {/* Total Polls */}
        <Card className="flex flex-col items-center justify-center p-3 bg-linear-to-r from-purple-50 via-purple-100 to-purple-50 shadow-lg rounded-2xl">
          <span className="text-2xl font-bold">{data?.length || 0}</span>
          <span className="text-sm text-gray-600">Total Polls</span>
        </Card>
      </div>
    </section>
  );
}
