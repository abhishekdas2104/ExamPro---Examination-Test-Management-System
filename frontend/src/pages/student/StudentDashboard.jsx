import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { studentAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Target, Award, PlayCircle } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, subjRes] = await Promise.all([
        studentAPI.getStats(),
        studentAPI.getSubjects()
      ]);
      setStats(statsRes.data);
      setSubjects(subjRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startExam = () => {
    if (selectedSubject) {
      navigate(`/student/quiz/${selectedSubject}`);
    }
  };

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  const statCards = [
    { title: 'Exams Taken', value: stats?.examsTaken || 0, icon: BookOpen, color: 'blue' },
    { title: 'Average Score', value: `${stats?.averageScore || 0}%`, icon: Target, color: 'purple' },
    { title: 'Best Score', value: `${stats?.bestScore || 0}%`, icon: Award, color: 'green' },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar role="STUDENT" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>My Dashboard</h2>
            <p>Welcome back, {user?.name}</p>
          </div>
          <div className="topbar-actions">
            <div className="avatar">{user?.name?.charAt(0)}</div>
          </div>
        </div>

        <div className="page-content">
          <div className="grid-3">
            {statCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`stat-card stat-card-${card.color}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: card.color === 'blue' ? '#DBEAFE' : card.color === 'green' ? '#D1FAE5' : '#EDE9FE' }}>
                    <card.icon size={22} color={card.color === 'blue' ? '#2563EB' : card.color === 'green' ? '#10B981' : '#8B5CF6'} />
                  </div>
                </div>
                <h3 style={{ fontSize: 26, fontWeight: 800, color: '#1E293B' }}>{card.value}</h3>
                <p style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{card.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
            <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #fff, #EFF6FF)' }}>
              <div style={{ width: 64, height: 64, background: '#DBEAFE', borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <PlayCircle size={32} color="#2563EB" />
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>Ready for a new challenge?</h3>
              <p style={{ fontSize: 15, color: '#64748B', marginBottom: 24, maxWidth: 400 }}>Select a subject from the available courses and start your examination right now.</p>

              <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 400 }}>
                <select className="form-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={{ flex: 1 }}>
                  <option value="">Select a subject...</option>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn btn-primary" onClick={startExam} disabled={!selectedSubject}>
                  Start Exam
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
