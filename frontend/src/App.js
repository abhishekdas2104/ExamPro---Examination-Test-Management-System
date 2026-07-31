import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageQuestions from './pages/admin/ManageQuestions';
import Analytics from './pages/admin/Analytics';
import StudentResults from './pages/admin/StudentResults';

import StudentDashboard from './pages/student/StudentDashboard';
import QuizPage from './pages/student/QuizPage';
import ResultPage from './pages/student/ResultPage';
import ProfilePage from './pages/student/ProfilePage';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;
  if (user) return <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
      <Route path="/admin/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/questions" element={<ProtectedRoute role="ADMIN"><ManageQuestions /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute role="ADMIN"><Analytics /></ProtectedRoute>} />
      <Route path="/admin/results" element={<ProtectedRoute role="ADMIN"><StudentResults /></ProtectedRoute>} />

      <Route path="/student/dashboard" element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/quiz/:subject" element={<ProtectedRoute role="STUDENT"><QuizPage /></ProtectedRoute>} />
      <Route path="/student/result" element={<ProtectedRoute role="STUDENT"><ResultPage /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute role="STUDENT"><ProfilePage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { fontFamily: 'Inter', fontSize: '14px', fontWeight: '500' },
            success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
          }}
        />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
