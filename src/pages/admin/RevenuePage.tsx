import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { generateMembers, generatePayments, getRevenueByMonth, filterByMonths } from "@/lib/mockData";

const tooltipStyle = { contentStyle: { background: "hsl(0,0%,5%)", border: "1px solid hsl(0,0%,12%)", borderRadius: 12, fontSize: 12 }, itemStyle: { color: "hsl(0,0%,96%)" } };

const RevenuePage = () => {
  const { timeFilter } = useOutletContext<{ timeFilter: number }>();

  const data = useMemo(() => {
    const members = generateMembers();
    const payments = generatePayments(members);
    const byMonth = filterByMonths(getRevenueByMonth(payments), timeFilter);
    const totalRevenue = byMonth.reduce((s, r) => s + r.revenue, 0);
    return { byMonth, totalRevenue };
  }, [timeFilter]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-xl p-5 inline-block">
        <p className="text-xs text-muted-foreground font-body">Total Revenue</p>
        <p className="text-3xl font-heading text-primary">₹{data.totalRevenue.toLocaleString()}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data.byMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(358,95%,45%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(358,95%,45%)" }} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Monthly Comparison</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.byMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,12%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(358,95%,45%)" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenuePage;
