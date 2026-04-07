import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Users, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone, MapPin } from 'lucide-react';

import { signUp } from '../../utils/supabase';

export default function CitizenSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

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
        role: 'citizen',
        phone: formData.phone,
        state: formData.state,
        city: formData.city
      });

      if (signUpError) throw signUpError;

      // Successful signup
      setIsSignedUp(true);
      setLoading(false);
      
      // Optional: Auto-redirect after 3 seconds
      setTimeout(() => {
        navigate('/auth/citizen/login');
      }, 3000);
    } catch (err) {
      console.error('Citizen signup error:', err);
      setError(err.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ashoka-bg p-4 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1A3A6B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
        
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
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0A1F44" strokeWidth="2" />;
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

        <div className="glass-white rounded-2xl p-8 md:p-10 shadow-2xl border border-[#1A3A6B]/20">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A3A6B] to-[#0A1F44] flex items-center justify-center animate-pulse-glow mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A3A6B]/5 border border-[#1A3A6B]/20 rounded-full">
              <Users className="w-4 h-4 text-[#1A3A6B]" />
              <span className="text-sm text-[#1A3A6B]">Citizen Portal</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Create Citizen Account
            </h1>
            <p className="text-[#64748B]">Join to explore constitutional content and participate in discussions</p>
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
              <p className="text-[#64748B] mb-6">Your account has been created. Redirecting to login...</p>
              <Link 
                to="/auth/citizen/login"
                className="inline-block px-6 py-2 bg-[#1A3A6B] text-white rounded-lg hover:bg-[#0A1F44] transition-all"
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
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
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
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
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
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
                    required
                  />
                  <label className="floating-label left-12">Phone Number</label>
                </div>
              </div>

              {/* State */}
              <div className="floating-input">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="floating-input">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] z-10" />
                <input
                  type="text"
                  placeholder=" "
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
                  required
                />
                <label className="floating-label left-12">City</label>
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
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
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
                    className="w-full pl-12 pr-12 py-3.5 bg-[#F8FAFC] border border-[#1A3A6B]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent transition-all"
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
                className="mt-1 w-4 h-4 rounded border-[#1A3A6B]/20 text-[#1A3A6B] focus:ring-[#1A3A6B]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#64748B]">
                I agree to the <a href="#" className="text-[#1A3A6B] hover:underline">Terms of Service</a> and <a href="#" className="text-[#1A3A6B] hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-[#1A3A6B] to-[#0A1F44] text-white rounded-lg hover:shadow-lg transition-all hover-lift disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Create Citizen Account'
              )}
            </button>
          </form>

            </>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1A3A6B]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748B]">Already have an account?</span>
            </div>
          </div>

          <Link 
            to="/auth/citizen/login"
            className="block w-full py-3.5 text-center border-2 border-[#1A3A6B] text-[#1A3A6B] rounded-lg hover:bg-[#1A3A6B] hover:text-white transition-all"
          >
            Sign In to Citizen Portal
          </Link>

          <div className="mt-8 pt-6 border-t border-[#1A3A6B]/10">
            <p className="text-sm text-[#64748B] text-center mb-3">Join as different role:</p>
            <div className="grid grid-cols-3 gap-2">
              <Link to="/auth/admin/signup" className="text-xs text-center py-2 px-2 bg-[#0A1F44]/5 text-[#0A1F44] rounded-lg hover:bg-[#0A1F44]/10 transition-colors">
                Admin
              </Link>
              <Link to="/auth/educator/signup" className="text-xs text-center py-2 px-2 bg-[#FF9933]/5 text-[#FF9933] rounded-lg hover:bg-[#FF9933]/10 transition-colors">
                Educator
              </Link>
              <Link to="/auth/legal-expert/signup" className="text-xs text-center py-2 px-2 bg-[#138808]/5 text-[#138808] rounded-lg hover:bg-[#138808]/10 transition-colors">
                Legal Expert
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
