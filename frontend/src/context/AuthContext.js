import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const stored = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (stored && token) {
      try {
        setUser(JSON.parse(stored));
      }
      catch {

        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const isAdmin = () => user?.role === 'ADMIN';
  const isStudent = () => user?.role === 'STUDENT';
  const isAuthenticated = () => !!user;

  return (

    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isStudent, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
