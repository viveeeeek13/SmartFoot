"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function PerformanceChart() {
  const data = [
    { month: 'Aug', goals: 2, assists: 1, rating: 7.2 },
    { month: 'Sep', goals: 3, assists: 2, rating: 7.8 },
    { month: 'Oct', goals: 1, assists: 1, rating: 6.9 },
    { month: 'Nov', goals: 4, assists: 2, rating: 8.5 },
    { month: 'Dec', goals: 2, assists: 1, rating: 7.5 },
    { month: 'Jan', goals: 3, assists: 2, rating: 8.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorGoals" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAssists" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B00FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B00FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
        <XAxis
          dataKey="month"
          stroke="rgba(255, 255, 255, 0.4)"
          style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', letterSpacing: '0.05em' }}
        />
        <YAxis
          stroke="rgba(255, 255, 255, 0.4)"
          style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(18, 18, 18, 0.95)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '4px',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Rajdhani, sans-serif',
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)',
          }}
          labelStyle={{
            color: '#00D4FF',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
          itemStyle={{
            color: '#fff',
          }}
        />
        <Legend
          wrapperStyle={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.05em',
          }}
        />
        <Line
          type="monotone"
          dataKey="goals"
          stroke="#00D4FF"
          strokeWidth={3}
          dot={{ fill: '#00D4FF', r: 6, strokeWidth: 2, stroke: '#000' }}
          activeDot={{ r: 8, fill: '#00D4FF', stroke: '#00D4FF', strokeWidth: 4, filter: 'drop-shadow(0 0 8px #00D4FF)' }}
          name="GOALS"
          fill="url(#colorGoals)"
        />
        <Line
          type="monotone"
          dataKey="assists"
          stroke="#8B00FF"
          strokeWidth={3}
          dot={{ fill: '#8B00FF', r: 6, strokeWidth: 2, stroke: '#000' }}
          activeDot={{ r: 8, fill: '#8B00FF', stroke: '#8B00FF', strokeWidth: 4, filter: 'drop-shadow(0 0 8px #8B00FF)' }}
          name="ASSISTS"
          fill="url(#colorAssists)"
        />
        <Line
          type="monotone"
          dataKey="rating"
          stroke="#00FF88"
          strokeWidth={3}
          dot={{ fill: '#00FF88', r: 6, strokeWidth: 2, stroke: '#000' }}
          activeDot={{ r: 8, fill: '#00FF88', stroke: '#00FF88', strokeWidth: 4, filter: 'drop-shadow(0 0 8px #00FF88)' }}
          name="RATING"
          fill="url(#colorRating)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}