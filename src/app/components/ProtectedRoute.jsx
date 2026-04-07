import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { supabase, getSession, getUserProfile } from '../utils/supabase';

export default function ProtectedRoute({ children, requiredRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null); // null = checking, true = authorized, false = not authorized

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Get Session
        const { session } = await getSession();

        if (!session) {
          handleUnauthorized();
          return;
        }

        // 2. Get Profile/Role
        const { data: profile, error } = await getUserProfile(session.user.id);

        if (error || !profile) {
          console.error('Error fetching profile:', error);
          handleUnauthorized();
          return;
        }

        // 3. Verify Role
        if (requiredRole && profile.role !== requiredRole) {
          console.log('Role mismatch:', { actual: profile.role, required: requiredRole });
          handleUnauthorized();
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        handleUnauthorized();
      }
    };

    const handleUnauthorized = () => {
      // Map roles to their login pages
      const loginRoutes = {
        admin: '/auth/admin/login',
        educator: '/auth/educator/login',
        'legal-expert': '/auth/legal-expert/login',
        citizen: '/auth/citizen/login',
      };

      const loginRoute = loginRoutes[requiredRole] || '/login';
      console.log('Unauthorized shortcut! Redirecting to:', loginRoute);
      navigate(loginRoute, { replace: true });
      setIsAuthorized(false);
    };

    checkAuth();

    // 4. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) handleUnauthorized();
    });

    return () => subscription.unsubscribe();
  }, [navigate, requiredRole, location.pathname]);

  // Show loading state while checking authorization
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center ashoka-bg">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64748B]">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  if (!isAuthorized) {
    return null;
  }

  return children;
}