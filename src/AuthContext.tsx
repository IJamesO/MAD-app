import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role, User } from './types';

interface AuthContextType {
  user: User | null;
  login: (role: Role, email: string) => void;
  logout: () => void;
  isLoggingIn: boolean;
  loginRole: Role;
  setLoginRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loginRole, setLoginRole] = useState<Role>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = (role: Role, email: string) => {
    setIsLoggingIn(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: role === 'student' ? 'STU123' : 'STAFF456',
        name: role === 'student' ? 'James Wilson' : 'Dr. Elizabeth Reed',
        email,
        role,
        avatar: role === 'student' 
          ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' 
          : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth'
      });
      setIsLoggingIn(false);
    }, 800);
  };

  const logout = () => {
    setUser(null);
    setLoginRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggingIn, loginRole, setLoginRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
