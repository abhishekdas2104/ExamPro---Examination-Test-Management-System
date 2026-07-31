import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../../components/Sidebar';
import { questionAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Search, Filter, X } from 'lucide-react';

export default function ManageQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    questionTitle: '', optionA: '', optionB: '', optionC: '', optionD: '',
    correctAnswer: 'optionA', subject: 'Mathematics', difficultyLevel: 'EASY'
  });

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Computer Science', 'Physics', 'Chemistry', 'Biology'];

  useEffect(() => {
    fetchQuestions();
  }, [search, filterSubject, filterDifficulty]);

  const fetchQuestions = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filterSubject) params.subject = filterSubject;
      if (filterDifficulty) params.difficulty = filterDifficulty;
      const res = await questionAPI.getAll(params);
      setQuestions(res.data);
    } catch (err) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (q = null) => {
    if (q) {
      setEditingId(q.id);
      setForm(q);
    } else {
      setEditingId(null);
      setForm({
        questionTitle: '', optionA: '', optionB: '', optionC: '', optionD: '',
        correctAnswer: 'optionA', subject: 'Mathematics', difficultyLevel: 'EASY'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.questionTitle || !form.optionA || !form.optionB) {
      return toast.error('Please fill required fields');
    }
    try {
      if (editingId) {
        await questionAPI.update(editingId, form);
        toast.success('Question updated');
      } else {
        await questionAPI.add(form);
        toast.success('Question added');
      }
      setIsModalOpen(false);
      fetchQuestions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving question');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await questionAPI.delete(id);
      toast.success('Question deleted');
      fetchQuestions();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="ADMIN" />
      <div className="main-content">
        <div className="topbar">
          <div className="topbar-greeting">
            <h2>Manage Questions</h2>
            <p>Add, edit, or remove exam questions</p>
          </div>
          <button className="btn btn-primary" onClick={() => openModal()}>
            <Plus size={16} /> Add Question
          </button>
        </div>

        <div className="page-content">
          <div className="card mb-6" style={{ padding: '16px 24px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 250, position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input className="form-input" placeholder="Search questions..." style={{ paddingLeft: 42 }}
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="form-select" style={{ width: 200 }} value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="form-select" style={{ width: 160 }} value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
              <option value="">All Levels</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {loading ? (
              <div className="flex-center" style={{ height: 200 }}><div className="spinner" /></div>
            ) : questions.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#64748B' }}>No questions found.</div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Question Title</th>
                      <th>Subject</th>
                      <th>Difficulty</th>
                      <th>Correct Answer</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q) => (
                      <tr key={q.id}>
                        <td><div style={{ fontWeight: 500, color: '#1E293B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{q.questionTitle}</div></td>
                        <td><span className="badge badge-blue">{q.subject}</span></td>
                        <td>
                          <span className={`badge ${q.difficultyLevel === 'EASY' ? 'badge-green' : q.difficultyLevel === 'HARD' ? 'badge-red' : 'badge-yellow'}`}>
                            {q.difficultyLevel}
                          </span>
                        </td>
                        <td><span className="badge badge-gray">{q.correctAnswer}</span></td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn-icon" onClick={() => openModal(q)} style={{ background: '#EFF6FF', color: '#2563EB', border: 'none', marginRight: 8, cursor: 'pointer' }}><Edit2 size={16} /></button>
                          <button className="btn-icon" onClick={() => handleDelete(q.id)} style={{ background: '#FEF2F2', color: '#EF4444', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="card" style={{ position: 'relative', width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid #E2E8F0' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B' }}>{editingId ? 'Edit Question' : 'Add New Question'}</h3>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Question Title</label>
                  <textarea className="form-input" rows="3" value={form.questionTitle} onChange={e => setForm({ ...form, questionTitle: e.target.value })} required style={{ resize: 'vertical' }} />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Option A</label>
                    <input className="form-input" value={form.optionA} onChange={e => setForm({ ...form, optionA: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option B</label>
                    <input className="form-input" value={form.optionB} onChange={e => setForm({ ...form, optionB: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option C</label>
                    <input className="form-input" value={form.optionC} onChange={e => setForm({ ...form, optionC: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option D</label>
                    <input className="form-input" value={form.optionD} onChange={e => setForm({ ...form, optionD: e.target.value })} required />
                  </div>
                </div>

                <div className="grid-3 mt-2">
                  <div className="form-group">
                    <label className="form-label">Correct Answer</label>
                    <select className="form-select" value={form.correctAnswer} onChange={e => setForm({ ...form, correctAnswer: e.target.value })}>
                      <option value="optionA">Option A</option>
                      <option value="optionB">Option B</option>
                      <option value="optionC">Option C</option>
                      <option value="optionD">Option D</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-select" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select className="form-select" value={form.difficultyLevel} onChange={e => setForm({ ...form, difficultyLevel: e.target.value })}>
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, paddingTop: 16, borderTop: '1px solid #E2E8F0' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Question'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
