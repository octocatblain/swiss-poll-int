"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  console.log("🔄 AuthProvider useEffect running");
  const savedToken = localStorage.getItem("token");
  const savedAdmin = localStorage.getItem("isAdmin");
  console.log("Saved from localStorage:", { savedToken, savedAdmin });
  setToken(savedToken);
  setIsAdmin(savedAdmin === "true");
  setLoading(false);
}, []);

  const login = (newToken: string, adminStatus: boolean) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("isAdmin", adminStatus ? "true" : "false");
    setToken(newToken);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);
