
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login(email, password);
      if (response.error) {
        return { success: false, error: response.error };
      }
      
      // Fetch user data after successful login
      const userResponse = await apiService.getCurrentUser();
      if (userResponse.data) {
        setUser(userResponse.data);
        return { success: true };
      }
      
      return { success: false, error: 'Failed to get user data' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await apiService.register(name, email, password);
      if (response.error) {
        return { success: false, error: response.error };
      }
      
      // Auto-login after successful signup
      return await login(email, password);
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
