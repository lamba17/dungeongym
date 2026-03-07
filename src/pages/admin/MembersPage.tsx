import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  generateMembers, getMembersByMonth, getMemberStatusDistribution,
  getAttritionByMonth, filterByMonths,
} from "@/lib/mockData";

const tooltipStyle = { contentStyle: { background: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,12%)", borderRadius: 12, fontSize: 12 }, itemStyle: { color: "hsl(0,0%,96%)" } };

const MembersPage = () => {
  const { timeFilter } = useOutletContext<{ timeFilter: number }>();

  const data = useMemo(() => {
    const members = generateMembers();
    return {
      growth: filterByMonths(getMembersByMonth(members), timeFilter),
      status: getMemberStatusDistribution(members),
      attrition: filterByMonths(getAttritionByMonth(members), timeFilter),
      total: members.length,
      active: members.filter((m) => m.status === "Active").length,
    };
  }, [timeFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: data.total },
          { label: "Active", value: data.active },
          { label: "Expired", value: data.status.find((s) => s.status === "Expired")?.count || 0 },
          { label: "Expiring Soon", value: data.status.find((s) => s.status === "Expiring Soon")?.count || 0 },
        ].map((stat) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-heading text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Membership Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.growth}>
              <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(358,95%,45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(358,95%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="count" stroke="hsl(358,95%,45%)" fill="url(#mg)" strokeWidth={2} name="New Members" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Member Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data.status} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={110} innerRadius={65} strokeWidth={0}>
                <Cell fill="hsl(358,95%,45%)" />
                <Cell fill="hsl(0,0%,30%)" />
                <Cell fill="hsl(358,60%,30%)" />
              </Pie>
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, color: "hsl(0,0%,55%)" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Attrition Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.attrition}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
            <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} unit="%" />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="rate" stroke="hsl(358,80%,55%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(358,95%,45%)" }} name="Attrition Rate (%)" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default MembersPage;
