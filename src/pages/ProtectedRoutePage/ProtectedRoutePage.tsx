import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

type ProtectedRoutePageProps = {
  children: React.ReactNode;
};

/**
 * Wraps the entire application and will return a special page for un-authenticated users
 * @param children - The entire application
 */
function ProtectedRoutePage({ children }: ProtectedRoutePageProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // if the user is not authenticated, then navigate to the homepage
  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
}

export default ProtectedRoutePage;
