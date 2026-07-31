import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Menu, X, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/login', label: 'Login' },
  ];

  return (
    <motion.nav

      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(226,232,240,0.7)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GraduationCap size={20} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.02em' }}>
            Exam<span style={{ color: 'var(--primary)' }}>Pro</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,

                color: location.pathname === l.to ? 'var(--primary)' : 'var(--slate)',
                background: location.pathname === l.to ? 'var(--soft-blue)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}

          {!user && (
            <Link to="/register" className="btn btn-primary btn-sm" style={{ marginLeft: 8 }}>
              <UserPlus size={15} /> Register
            </Link>
          )}

          {user && (
            <Link
              to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'}
              className="btn btn-primary btn-sm"
              style={{ marginLeft: 8 }}
            >
              Dashboard
            </Link>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="btn-icon" style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer' }} id="mobile-menu-toggle">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: '#fff', borderTop: '1px solid #E2E8F0', overflow: 'hidden' }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  style={{
                    padding: '12px 16px', borderRadius: 10, fontSize: 15, fontWeight: 500,
                    color: location.pathname === l.to ? 'var(--primary)' : 'var(--dark)',
                    background: location.pathname === l.to ? 'var(--soft-blue)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {l.label}
                </Link>
              ))}
              {!user && (
                <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
                  <UserPlus size={15} /> Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #mobile-menu-toggle { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
