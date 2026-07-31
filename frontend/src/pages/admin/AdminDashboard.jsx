import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { adminAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  Users, BookOpen, FileText, TrendingUp, HelpCircle, GraduationCap, Award
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, resultsRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllResults()
      ]);
      setStats(statsRes.data);
      setRecentResults(resultsRes.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  const statCards = [
    { title: 'Total Students', value: stats?.totalStudents || 0, icon: Users, color: 'blue' },
    { title: 'Total Questions', value: stats?.totalQuestions || 0, icon: HelpCircle, color: 'purple' },
    { title: 'Exams Attempted', value: stats?.totalExamsAttempted || 0, icon: FileText, color: 'green' },
    { title: 'Average Score', value: `${stats?.averageScore || 0}%`, icon: TrendingUp, color: 'yellow' },
  ];

  const chartData = [
    { name: 'Average Score', value: stats?.averageScore || 0, fill: '#3B82F6' },
    { name: 'Highest Score', value: stats?.highestScore || 0, fill: '#10B981' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>Admin Dashboard</h2>
            <p>Welcome back, {user?.name}</p>
          </div>
          <div className="topbar-actions">
            <div className="avatar">{user?.name?.charAt(0)}</div>
          </div>
        </div>

        <div className="page-content">
          <div className="grid-4">
            {statCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`stat-card stat-card-${card.color}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: card.color === 'blue' ? '#DBEAFE' : card.color === 'green' ? '#D1FAE5' : card.color === 'purple' ? '#EDE9FE' : '#FEF3C7' }}>
                    <card.icon size={22} color={card.color === 'blue' ? '#2563EB' : card.color === 'green' ? '#10B981' : card.color === 'purple' ? '#8B5CF6' : '#F59E0B'} />
                  </div>
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B' }}>{card.value}</h3>
                <p style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{card.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid-2 mt-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card">
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={18} color="#2563EB" /> Performance Overview
              </h3>
              <div style={{ height: 300, width: '100%' }}>
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <RechartsTooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Award size={18} color="#10B981" /> Recent Results
                </h3>
              </div>
              {recentResults.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>No exams taken yet.</div>
              ) : (
                <div className="table-wrapper" style={{ borderRadius: 0 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Subject</th>
                        <th>Score</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentResults.map(r => (
                        <tr key={r.id}>
                          <td style={{ fontWeight: 600 }}>{r.studentName}</td>
                          <td><span className="badge badge-gray">{r.subject}</span></td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontWeight: 600 }}>{r.percentage}%</span>
                              <div style={{ flex: 1, height: 6, background: '#E2E8F0', borderRadius: 10, width: 60 }}>
                                <div style={{ width: `${r.percentage}%`, height: '100%', borderRadius: 10, background: r.percentage >= 60 ? '#10B981' : '#EF4444' }} />
                              </div>
                            </div>
                          </td>
                          <td><span className={`badge ${r.percentage >= 80 ? 'badge-green' : r.percentage >= 60 ? 'badge-blue' : 'badge-red'}`}>{r.grade}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
