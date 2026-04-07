import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Scale, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, Briefcase } from 'lucide-react';

import { signUp } from '../../utils/supabase';

export default function LegalExpertSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    barCouncilId: '',
    specialization: '',
    experience: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        role: 'legal-expert',
        phone: formData.phone,
        bar_council_id: formData.barCouncilId,
        specialization: formData.specialization,
        experience: formData.experience
      });

      if (signUpError) throw signUpError;

      // Successful signup
      setIsSignedUp(true);
      setLoading(false);
      
      // Optional: Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate('/auth/legal-expert/login');
      }, 3000);
    } catch (err) {
      console.error('Legal expert signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ashoka-bg p-4 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#138808]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1ea712]/5 rounded-full blur-3xl"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#138808" strokeWidth="2" />
              <circle cx="100" cy="100" r="15" fill="#138808" />
              {[...Array(24)].map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 20 * Math.cos(rad);
                const y1 = 100 + 20 * Math.sin(rad);
                const x2 = 100 + 90 * Math.cos(rad);
                const y2 = 100 + 90 * Math.sin(rad);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#138808" strokeWidth="2" />;
              })}
            </svg>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-white rounded-2xl p-8 md:p-10 shadow-2xl border border-[#138808]/20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center animate-pulse-glow mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#138808]/5 border border-[#138808]/20 rounded-full">
              <Scale className="w-4 h-4 text-[#138808]" />
              <span className="text-sm text-[#138808]">Legal Expert Portal</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Join as Legal Expert
            </h1>
            <p className="text-[#64748B]">Share your expertise on constitutional matters</p>
          </div>

          {/* Success Message */}
          {isSignedUp ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#0A1F44] mb-2">Signup Successful!</h2>
              <p className="text-[#64748B] mb-6">Your legal expert account has been created. Redirecting to login...</p>
              <Link 
                to="/auth/legal-expert/login"
                className="inline-block px-6 py-2 bg-[#138808] text-white rounded-lg hover:bg-[#117a07] transition-all"
              >
                Go to Login
              </Link>
            </motion.div>
          ) : (
            <>
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

              <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="floating-input">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="text"
                    placeholder=" "
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Full Name</label>
                </div>
              </div>

              {/* Email */}
              <div className="floating-input">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Email Address</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Phone */}
              <div className="floating-input">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="tel"
                    placeholder=" "
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Phone Number</label>
                </div>
              </div>

              {/* Bar Council ID */}
              <div className="floating-input">
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="text"
                    placeholder=" "
                    value={formData.barCouncilId}
                    onChange={(e) => setFormData({ ...formData, barCouncilId: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Bar Council ID</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Specialization */}
              <div className="floating-input">
                <div className="relative">
                  <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="text"
                    placeholder=" "
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Area of Specialization</label>
                </div>
              </div>

              {/* Experience */}
              <div className="floating-input">
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type="text"
                    placeholder=" "
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Years of Experience</label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div className="floating-input">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                    minLength={8}
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

              {/* Confirm Password */}
              <div className="floating-input">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent transition-all"
                    required
                    minLength={8}
                  />
                  <label className="floating-label left-12">Confirm Password</label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A1F44] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="terms"
                className="mt-1 w-4 h-4 rounded border-[#138808]/20 text-[#138808] focus:ring-[#138808]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#64748B]">
                I agree to the <a href="#" className="text-[#138808] hover:underline">Terms of Service</a> and <a href="#" className="text-[#138808] hover:underline">Privacy Policy</a>. I certify that the information provided is accurate.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Create Legal Expert Account'
              )}
            </button>
          </form>
            </>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#138808]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748B]">Already registered?</span>
            </div>
          </div>

          <Link 
            to="/auth/legal-expert/login"
            className="block w-full py-3.5 text-center border-2 border-[#138808] text-[#138808] rounded-lg hover:bg-[#138808] hover:text-white transition-all"
          >
            Sign In to Legal Expert Portal
          </Link>

          <div className="mt-8 pt-6 border-t border-[#138808]/10">
            <p className="text-sm text-[#64748B] text-center mb-3">Join as different role:</p>
            <div className="grid grid-cols-3 gap-2">
              <Link to="/auth/admin/signup" className="text-xs text-center py-2 px-2 bg-[#0A1F44]/5 text-[#0A1F44] rounded-lg hover:bg-[#0A1F44]/10 transition-colors">
                Admin
              </Link>
              <Link to="/auth/educator/signup" className="text-xs text-center py-2 px-2 bg-[#FF9933]/5 text-[#FF9933] rounded-lg hover:bg-[#FF9933]/10 transition-colors">
                Educator
              </Link>
              <Link to="/auth/citizen/signup" className="text-xs text-center py-2 px-2 bg-[#1A3A6B]/5 text-[#1A3A6B] rounded-lg hover:bg-[#1A3A6B]/10 transition-colors">
                Citizen
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
