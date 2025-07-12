import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectTo: string;
}

const AuthRedirect = ({ children, redirectTo }: AuthRedirectProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { 
        state: { 
          from: redirectTo,
          message: 'Please log in to access this page' 
        } 
      });
    }
  }, [user, loading, navigate, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
};

export default AuthRedirect; 