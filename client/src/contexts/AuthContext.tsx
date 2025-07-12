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

const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
    checkAuthStatus();
=======
    // Check for existing user session
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          credentials: 'include', // This is important for cookies
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
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
<<<<<<< HEAD
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
=======
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const userData = await response.json();
    setUser(userData);
  };

  const signup = async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    // After successful signup, log the user in
    await login(email, password);
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
  };

  const logout = async () => {
    try {
<<<<<<< HEAD
      await apiService.logout();
=======
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
<<<<<<< HEAD
=======
      // Clear any local storage if needed
      localStorage.removeItem('reWearUser');
>>>>>>> 474384150c3d59b32d9e4b6c3b7a526e7f302ced
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
