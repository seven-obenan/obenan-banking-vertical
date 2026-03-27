import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Bypass auth in preview/development environments
const isPreviewEnv = window.location.hostname.includes('preview') || 
                     window.location.hostname === 'localhost' ||
                     window.location.hostname === '127.0.0.1';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(!isPreviewEnv);
  const location = useLocation();

  useEffect(() => {
    if (isPreviewEnv) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
        if (session?.user?.email) {
          sessionStorage.setItem('user_email', session.user.email);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session?.user?.email) {
        sessionStorage.setItem('user_email', session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isPreviewEnv) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </motion.div>
    );
  }

  if (!session) {
    const fullPath = location.pathname + location.search;
    localStorage.setItem('intended_destination', fullPath);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
