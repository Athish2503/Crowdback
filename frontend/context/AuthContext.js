import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthoritiesAuthenticated, setIsAuthoritiesAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    const authoritiesToken = localStorage.getItem('authoritiesToken');
    if (authoritiesToken) {
      setIsAuthoritiesAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAuthoritiesAuthenticated, setIsAuthoritiesAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};