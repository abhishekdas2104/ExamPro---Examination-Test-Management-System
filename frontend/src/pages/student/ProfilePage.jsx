import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { studentAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profRes, resRes] = await Promise.all([
        studentAPI.getProfile(),
        studentAPI.getResults()
      ]);
      setProfile(profRes.data);
      setResults(resRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  return (
    <div className="dashboard-layout">
      <Sidebar role="STUDENT" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>My Profile</h2>
            <p>Manage your account and view history</p>
          </div>
        </div>

        <div className="page-content">
          <div className="grid-2">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 120, background: 'linear-gradient(135deg, #1D4ED8, #2563EB)' }} />
              <div style={{ padding: '0 32px 32px', textAlign: 'center', marginTop: -50 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#fff', padding: 4, margin: '0 auto 16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #DBEAFE, #EFF6FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', fontSize: 32, fontWeight: 700 }}>
                    {profile?.name?.charAt(0)}
                  </div>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 4 }}>{profile?.name}</h3>
                <span className="badge badge-blue" style={{ marginBottom: 24 }}>{profile?.role}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <Mail size={18} color="#64748B" />
                    <div>
                      <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Email Address</div>
                      <div style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>{profile?.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <User size={18} color="#64748B" />
                    <div>
                      <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Account ID</div>
                      <div style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>#{profile?.id.toString().padStart(6, '0')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
                <GraduationCap size={20} color="#2563EB" />
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E293B' }}>Recent Exam History</h3>
              </div>

              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {results.length === 0 ? (
                  <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>No exams taken yet.</div>
                ) : (
                  results.map((r, i) => (
                    <div key={r.id} style={{ padding: '16px 24px', borderBottom: i !== results.length - 1 ? '1px solid #E2E8F0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: r.percentage >= 60 ? '#D1FAE5' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {r.percentage >= 60 ? <CheckCircle2 size={20} color="#10B981" /> : <CheckCircle2 size={20} color="#EF4444" />}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#1E293B', marginBottom: 2 }}>{r.subject}</div>
                          <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Calendar size={12} /> {new Date(r.examDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: r.percentage >= 60 ? '#059669' : '#DC2626' }}>{r.percentage}%</div>
                        <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>Grade: {r.grade}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
