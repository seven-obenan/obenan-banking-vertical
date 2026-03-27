import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for errors in URL hash (e.g., expired links)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const errorParam = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (errorParam) {
          setError(errorDescription?.replace(/\+/g, ' ') || 'Authentication failed');
          return;
        }

        // Get session from URL hash (magic link callback)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError.message);
          return;
        }

        if (session?.user?.email) {
          const email = session.user.email;
          
          // Generate a new session ID for tracking
          const sessionId = crypto.randomUUID();
          sessionStorage.setItem('session_id', sessionId);
          sessionStorage.setItem('user_email', email);
          sessionStorage.setItem('session_start', new Date().toISOString());

          // Record email submission (non-blocking)
          supabase.from('email_submissions').insert({
            email: email,
            user_agent: navigator.userAgent,
          }).then(({ error }) => {
            if (error) console.warn('Email submission tracking failed:', error);
          });

          // Record user engagement with session ID (non-blocking)
          supabase.from('user_engagement').insert({
            email: email,
            session_id: sessionId,
            session_start: new Date().toISOString(),
          }).then(({ error }) => {
            if (error) console.warn('Engagement tracking failed:', error);
          });

          // Navigate to intended destination (use localStorage for cross-tab persistence)
          const intendedDestination = localStorage.getItem('intended_destination');
          localStorage.removeItem('intended_destination');
          navigate(intendedDestination || '/', { replace: true });
        } else {
          setError('No session found. The link may have expired. Please try again.');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'An unexpected error occurred';
        setError(msg);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-white rounded-2xl p-8 border border-border shadow-xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Authentication Failed</h2>
            <p className="text-muted-foreground text-sm mb-6">{error}</p>
            <Button
              onClick={() => navigate('/login', { replace: true })}
              className="bg-cta hover:bg-cta/90 font-semibold shadow-cta"
            >
              Request New Link
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground text-sm">Verifying your access...</p>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
