import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { GraduationCap, User, Mail, Lock, UserPlus, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get('role') || 'student';
  const [activeTab, setActiveTab] = useState(initialRole.toLowerCase() === 'admin' ? 'admin' : 'student');

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', adminSecurityKey: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam) {
      setActiveTab(roleParam.toLowerCase() === 'admin' ? 'admin' : 'student');
    }
  }, [location.search]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';

    if (activeTab === 'admin' && !form.adminSecurityKey.trim()) {
      e.adminSecurityKey = 'Admin security key is required';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: activeTab === 'admin' ? 'ADMIN' : 'STUDENT',
      };
      if (activeTab === 'admin') {
        payload.adminSecurityKey = form.adminSecurityKey;
      }

      const { data } = await authAPI.register(payload);
      login({ id: data.id, name: data.name, email: data.email, role: data.role }, data.token);
      toast.success(activeTab === 'admin' ? 'Admin registration successful!' : 'Registration successful!');
      navigate(data.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = activeTab === 'admin' ? '#7C3AED' : '#2563EB';
  const gradientBg = activeTab === 'admin'
    ? 'linear-gradient(135deg, #7C3AED, #6D28D9)'
    : 'linear-gradient(135deg, #1D4ED8, #2563EB)';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE, #F8FAFC)' }}>

      <motion.div
        animate={{ background: gradientBg }}
        transition={{ duration: 0.4 }}
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: 60, position: 'relative', overflow: 'hidden',
        }}
        className="reg-left"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, textDecoration: 'none' }}>
            <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={24} color="#fff" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>ExamPro</span>
          </Link>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
            {activeTab === 'admin' ? 'Portal Administration\nDashboard Setup' : 'Begin your path\nto excellence'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.7, maxWidth: 340 }}>
            {activeTab === 'admin'
              ? 'Configure and manage quizzes, questions, and students results in a centralized ecosystem.'
              : 'Create a free account and start taking exams immediately. Track your performance and grow.'}
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(activeTab === 'admin'
              ? ['Manage all subjects & questions', 'Monitor student performance', 'Real-time dashboard analytics']
              : ['Access to all subjects', 'Instant score analytics', 'Track your progress']
            ).map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                <div style={{ width: 20, height: 20, borderRadius: 50, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</div>
                {text}
              </div>
            ))}
          </div>
        </motion.div>
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      </motion.div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 420 }}>

          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', marginBottom: 6 }}>Create Account</h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>Select your registration type below</p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #E2E8F0' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setErrors({}); }}
              style={{
                flex: 1, padding: '12px 0', border: 'none', background: 'none', fontSize: 14, fontWeight: 600,
                color: activeTab === 'student' ? '#2563EB' : '#64748B',
                borderBottom: activeTab === 'student' ? '2.5px solid #2563EB' : 'none', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setErrors({}); }}
              style={{
                flex: 1, padding: '12px 0', border: 'none', background: 'none', fontSize: 14, fontWeight: 600,
                color: activeTab === 'admin' ? '#7C3AED' : '#64748B',
                borderBottom: activeTab === 'admin' ? '2.5px solid #7C3AED' : 'none', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Administrator
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" placeholder={activeTab === 'admin' ? "Admin Name" : "John Doe"} style={{ paddingLeft: 42 }}
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type="email" placeholder={activeTab === 'admin' ? "admin@example.com" : "john@example.com"} style={{ paddingLeft: 42 }}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type={showPw ? 'text' : 'password'} placeholder="Min 6 characters"
                  style={{ paddingLeft: 42, paddingRight: 42 }} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPw ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type="password" placeholder="••••••••" style={{ paddingLeft: 42 }}
                  value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>

            {activeTab === 'admin' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="form-group"
              >
                <label className="form-label">Admin Security Key</label>
                <div style={{ position: 'relative' }}>
                  <ShieldAlert size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    className="form-input"
                    type="password"
                    placeholder="Enter Admin Security Key"
                    style={{ paddingLeft: 42 }}
                    value={form.adminSecurityKey}
                    onChange={(e) => setForm({ ...form, adminSecurityKey: e.target.value })}
                  />
                </div>
                {errors.adminSecurityKey && <span className="form-error">{errors.adminSecurityKey}</span>}
              </motion.div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
              style={{ marginTop: 12, background: primaryColor, borderColor: primaryColor, boxShadow: `0 4px 14px rgba(37,99,235,0.2)` }}
            >
              {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><UserPlus size={18} /> Create Account</>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#64748B' }}>
            Already have an account? <Link to="/login" style={{ color: primaryColor, fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: 10 }}>
            <Link to="/" style={{ fontSize: 13, color: '#94A3B8', textDecoration: 'none' }}>← Back to Home</Link>
          </p>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){.reg-left{display:none!important;}}`}</style>
    </div>
  );
}
