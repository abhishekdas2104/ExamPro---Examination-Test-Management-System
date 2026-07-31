import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { GraduationCap, Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await authAPI.login(form);
      login({ id: data.id, name: data.name, email: data.email, role: data.role }, data.token);
      toast.success(`Welcome back, ${data.name}!`);
      navigate(data.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'linear-gradient(135deg, var(--soft-blue), #EEF2FF, var(--light-gray))' }}>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', padding: 60, position: 'relative', overflow: 'hidden',
      }} className="login-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, textDecoration: 'none' }}>
            <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={24} color="#fff" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>ExamPro</span>
          </Link>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>Welcome back to<br />your learning journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.7, maxWidth: 340 }}>
            Access your dashboard, take exams, and track your progress — all in one place.
          </p>
        </motion.div>

        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', top: -40, left: -40, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 420 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--dark)', marginBottom: 6 }}>Sign In</h2>
          <p style={{ fontSize: 14, color: 'var(--slate)', marginBottom: 32 }}>Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type="email" placeholder="john@example.com"
                  style={{ paddingLeft: 42 }} value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="form-input" type={showPw ? 'text' : 'password'} placeholder="••••••••"
                  style={{ paddingLeft: 42, paddingRight: 42 }} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPw ? <EyeOff size={18} color="#94A3B8" /> : <Eye size={18} color="#94A3B8" />}
                </button>
              </div>
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} style={{ marginTop: 8 }}>
              {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: 'var(--slate)' }}>
            Don't have an account? <Link to="/register?role=student" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Register here</Link> or <Link to="/register?role=admin" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Register as Admin</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: 10 }}>
            <Link to="/" style={{ fontSize: 13, color: 'var(--slate)', textDecoration: 'none' }}>← Back to Home</Link>
          </p>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){.login-left{display:none!important;}}`}</style>
    </div>
  );
}
