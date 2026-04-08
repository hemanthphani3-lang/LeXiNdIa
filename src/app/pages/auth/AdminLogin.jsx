import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowLeft, UserCog } from 'lucide-react';
import { signIn, supabase } from '../../utils/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Normalize email if using the custom ID admin@1234
    let loginEmail = formData.email;
    const isCustomAdminId = loginEmail === 'admin@1234';
    
    if (isCustomAdminId) {
      loginEmail = 'admin@lexindia.com';
    }

    try {
      const { data, error: signInError } = await signIn(loginEmail, formData.password);
      
      if (signInError) {
        // Handle common email confirmation error
        if (signInError.message.includes('Email not confirmed')) {
          throw new Error('Your account exists but email is not confirmed. Please check your inbox or confirm it in the Supabase dashboard.');
        }
        throw signInError;
      }

      if (!data?.user) {
        throw new Error('No user data returned from sign-in.');
      }

      // Check if user is actually an admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // If profile doesn't exist yet (maybe trigger failed), we can't verify role
        throw new Error('User profile not found. Please ensure the database schema was applied correctly.');
      }

      if (profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Access denied. You do not have administrator privileges.');
      }

      // Successful login - navigate to admin dashboard
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ashoka-bg p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#0A1F44]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
        
        {/* Ashoka Chakra Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#0A1F44" strokeWidth="2" />
              <circle cx="100" cy="100" r="15" fill="#0A1F44" />
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 20 * Math.cos(rad);
                const y1 = 100 + 20 * Math.sin(rad);
                const x2 = 100 + 90 * Math.cos(rad);
                const y2 = 100 + 90 * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#0A1F44"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="glass-white rounded-2xl p-8 md:p-10 shadow-2xl border border-[#0A1F44]/10">
          {/* Logo & Role Badge */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center animate-pulse-glow mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A1F44]/5 border border-[#0A1F44]/20 rounded-full">
              <UserCog className="w-4 h-4 text-[#0A1F44]" />
              <span className="text-sm text-[#0A1F44]">Admin Portal</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="text-3xl text-[#0A1F44] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Login
            </h1>
            <p className="text-[#64748B]">Access the administrative dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email (changed to text to allow admin@1234) */}
            <div className="floating-input">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                <input
                  type="text"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1F44] focus:border-transparent transition-all"
                  required
                />
                <label className="floating-label left-12">Admin ID or Email</label>
              </div>
            </div>

            {/* Password */}
            <div className="floating-input">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A1F44] focus:border-transparent transition-all"
                  required
                />
                <label className="floating-label left-12">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A1F44] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-[#0A1F44]/20 text-[#0A1F44] focus:ring-[#0A1F44]"
                />
                <span className="text-[#64748B]">Remember me</span>
              </label>
              <a href="#" className="text-[#0A1F44] hover:text-[#1A3A6B] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In to Admin Portal'
              )}
            </button>
          </form>

          {/* Other Portals */}
          <div className="mt-8 pt-6 border-t border-[#0A1F44]/10">
            <p className="text-sm text-[#64748B] text-center mb-3">Access other portals:</p>
            <div className="grid grid-cols-3 gap-2">
              <Link to="/auth/educator/login" className="text-xs text-center py-2 px-2 bg-[#FF9933]/5 text-[#FF9933] rounded-lg hover:bg-[#FF9933]/10 transition-colors">
                Educator
              </Link>
              <Link to="/auth/legal-expert/login" className="text-xs text-center py-2 px-2 bg-[#138808]/5 text-[#138808] rounded-lg hover:bg-[#138808]/10 transition-colors">
                Legal Expert
              </Link>
              <Link to="/auth/citizen/login" className="text-xs text-center py-2 px-2 bg-[#1A3A6B]/5 text-[#1A3A6B] rounded-lg hover:bg-[#1A3A6B]/10 transition-colors">
                Citizen
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}