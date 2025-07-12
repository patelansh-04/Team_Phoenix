import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, AuthResponse } from '@/types/auth';

interface ApiError {
  message: string;
  status?: number;
}

const API_URL = 'http://localhost:5000/api';

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<ApiError> => {
  try {
    const error = await response.json();
    return {
      message: error.message || error.error || 'An error occurred',
      status: response.status
    };
  } catch {
    return {
      message: 'Network error occurred',
      status: response.status
    };
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh access token
  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Function to make authenticated API calls
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    if (response.status === 401) {
      const isRefreshed = await refreshToken();
      if (isRefreshed) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      }
    }

    return response;
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authFetch(`${API_URL}/auth/me`);
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
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await handleApiError(response);
        return { success: false, error: error.message };
      }

      const userData = await response.json();
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred. Please check your connection.'
      };
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });


      if (!response.ok) {
        const error = await handleApiError(response);
        return { success: false, error: error.message };
      }

      const userData = await response.json();
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred. Please check your connection.'
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authFetch(`${API_URL}/auth/logout`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('reWearUser');
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
