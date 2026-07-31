import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { adminAPI } from '../../services/api';
import { Search } from 'lucide-react';

export default function StudentResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredResults = results.filter(r =>
    r.studentName.toLowerCase().includes(search.toLowerCase()) ||
    r.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>Student Results</h2>
            <p>View detailed exam records of all students</p>
          </div>
        </div>

        <div className="page-content">
          <div className="card mb-6" style={{ padding: '16px 24px', display: 'flex' }}>
            <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input className="form-input" placeholder="Search by student or subject..." style={{ paddingLeft: 42 }}
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {loading ? (
              <div className="flex-center" style={{ height: 200 }}><div className="spinner" /></div>
            ) : filteredResults.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#64748B' }}>No results found.</div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Student Name</th>
                      <th>Subject</th>
                      <th>Score</th>
                      <th>Percentage</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map((r) => (
                      <tr key={r.id}>
                        <td style={{ color: '#64748B' }}>{new Date(r.examDate).toLocaleDateString()}</td>
                        <td style={{ fontWeight: 600, color: '#1E293B' }}>{r.studentName}</td>
                        <td><span className="badge badge-gray">{r.subject}</span></td>
                        <td><span style={{ fontWeight: 600 }}>{r.score}</span> <span style={{ color: '#94A3B8', fontSize: 12 }}>/ {r.totalQuestions}</span></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, width: 45 }}>{r.percentage}%</span>
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
  );
}
