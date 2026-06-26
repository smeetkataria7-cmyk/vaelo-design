"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function OutputChart({
  data,
}: {
  data: { day: string; uploads: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
        <defs>
          <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4af37" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#6b7280", fontSize: 11 }}
          dy={6}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#4b5563", fontSize: 11 }}
          width={40}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ stroke: "#2d2d2d", strokeWidth: 1 }}
          contentStyle={{
            background: "#141414",
            border: "1px solid #2d2d2d",
            borderRadius: 8,
            fontSize: 12,
            color: "#f4f3ee",
          }}
          labelStyle={{ color: "#9ca3af" }}
        />
        <Area
          type="monotone"
          dataKey="uploads"
          stroke="#d4af37"
          strokeWidth={2}
          fill="url(#goldFill)"
          dot={{ r: 3, fill: "#d4af37", strokeWidth: 0 }}
          activeDot={{ r: 4, fill: "#e6c552" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
