import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, LayoutDashboard, HelpCircle, BarChart3,
  LogOut, ChevronLeft, Menu, ClipboardList, User
} from 'lucide-react';

export default function Sidebar({ role }) {

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/questions', icon: HelpCircle, label: 'Manage Questions' },
    { to: '/admin/results', icon: ClipboardList, label: 'Student Results' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/profile', icon: User, label: 'Profile' },
  ];

  const links = role === 'ADMIN' ? adminLinks : studentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (

    <div className="sidebar" style={{ width: collapsed ? 72 : 260, transform: 'none' }}>

      <Link to="/" style={{ textDecoration: 'none' }} className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <GraduationCap size={18} color="#fff" />
        </div>

        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="sidebar-logo-text">
            Exam<span style={{ color: 'var(--primary)' }}>Pro</span>
          </motion.span>
        )}
      </Link>

      <nav className="sidebar-nav">
        {links.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-nav-item ${active ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-nav-item" onClick={handleLogout} style={{ color: '#EF4444' }}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
        <button className="sidebar-nav-item" onClick={() => setCollapsed(!collapsed)} style={{ marginTop: 4 }}>

          <ChevronLeft size={20} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 200,
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10,
          padding: 8, cursor: 'pointer', display: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
        className="mobile-sidebar-toggle"
      >
        <Menu size={22} />
      </button>

      <div className="sidebar-desktop">
        <SidebarContent />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 150 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ position: 'fixed', top: 0, left: 0, zIndex: 200 }}
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none; }
          .mobile-sidebar-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
