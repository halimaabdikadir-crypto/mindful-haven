import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("zevina_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, _password: string): boolean => {
    const stored = localStorage.getItem("zevina_accounts");
    const accounts: { name: string; email: string; password: string }[] = stored ? JSON.parse(stored) : [];
    const found = accounts.find((a) => a.email === email);
    if (found) {
      const u = { name: found.name, email: found.email };
      setUser(u);
      localStorage.setItem("zevina_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const stored = localStorage.getItem("zevina_accounts");
    const accounts: { name: string; email: string; password: string }[] = stored ? JSON.parse(stored) : [];
    if (accounts.find((a) => a.email === email)) return false;
    accounts.push({ name, email, password });
    localStorage.setItem("zevina_accounts", JSON.stringify(accounts));
    const u = { name, email };
    setUser(u);
    localStorage.setItem("zevina_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zevina_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
