import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { adminAPI } from '../../services/api';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

export default function Analytics() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data } = await adminAPI.getAllResults();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  const gradeCount = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  const subjectScores = {};

  results.forEach(r => {
    gradeCount[r.grade] = (gradeCount[r.grade] || 0) + 1;
    if (!subjectScores[r.subject]) {
      subjectScores[r.subject] = { total: 0, count: 0 };
    }
    subjectScores[r.subject].total += r.percentage;
    subjectScores[r.subject].count += 1;
  });

  const pieData = Object.entries(gradeCount)
    .filter(([_, val]) => val > 0)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#10B981', '#34D399', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const lineData = Object.entries(subjectScores).map(([name, data]) => ({
    subject: name,
    average: Math.round(data.total / data.count)
  }));

  return (
    <div className="dashboard-layout">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>Analytics & Insights</h2>
            <p>Deep dive into system performance metrics</p>
          </div>
        </div>

        <div className="page-content">
          <div className="grid-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 20 }}>Grade Distribution</h3>
              <div style={{ height: 320, width: '100%' }}>
                {pieData.length > 0 ? (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex-center" style={{ height: '100%', color: '#64748B' }}>No data available</div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 20 }}>Average Score by Subject</h3>
              <div style={{ height: 320, width: '100%' }}>
                {lineData.length > 0 ? (
                  <ResponsiveContainer>
                    <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="average" stroke="#2563EB" strokeWidth={3} dot={{ r: 6, fill: '#2563EB', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex-center" style={{ height: '100%', color: '#64748B' }}>No data available</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
