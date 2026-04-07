import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { Shield, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { getRandomCaptcha, validateCaptcha } from '../utils/captcha';

export default function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Get state from location
  const email = location.state?.email || '';
  const role = location.state?.role || '';
  const type = location.state?.type || '';

  // Generate initial captcha
  useEffect(() => {
    setCaptcha(getRandomCaptcha());
  }, []);

  const handleRefresh = () => {
    setCaptcha(getRandomCaptcha());
    setUserInput('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (validateCaptcha(userInput, captcha)) {
      setSuccess(true);
      
      // Set authentication state in localStorage (persists across sessions)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
      
      console.log('Authentication data set:', {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        userRole: localStorage.getItem('userRole'),
        userEmail: localStorage.getItem('userEmail')
      });
      
      // Simulate verification process
      setTimeout(() => {
        // Redirect to appropriate dashboard based on role
        const dashboardPaths = {
          admin: '/admin',
          educator: '/educator',
          'legal-expert': '/legal-expert',
          citizen: '/citizen',
        };
        const targetPath = dashboardPaths[role] || '/citizen';
        console.log('Redirecting to dashboard:', targetPath);
        navigate(targetPath, { replace: true });
      }, 1500);
    } else {
      setError('Invalid captcha code. Please try again.');
      handleRefresh();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setUserInput(value);
    setError('');
  };

  // Show error message if no email or role provided
  if (!email || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center ashoka-bg p-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="glass-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 mb-6 text-lg">Invalid verification request</p>
            <p className="text-[#64748B] mb-6 text-sm">Please login again to continue.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all hover-lift"
            >
              Return to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center ashoka-bg p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Verification Card */}
        <div className="glass-white rounded-2xl p-8 md:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center animate-pulse-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {success ? (
            // Success State
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Verification Successful!
              </h2>
              <p className="text-[#64748B]">Redirecting to your dashboard...</p>
              <div className="mt-6">
                <div className="w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-gradient-to-r from-[#FF9933] to-[#0A1F44]"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Title */}
              <div className="text-center mb-8">
                <h1 
                  className="text-3xl text-[#0A1F44] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Human Verification
                </h1>
                <p className="text-[#64748B]">
                  Please enter the 6-digit code below to verify you're human
                </p>
              </div>

              {/* User Info */}
              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-lg border border-[#0A1F44]/10">
                <p className="text-sm text-[#64748B] mb-1">
                  {type === 'login' ? 'Logging in' : 'Signing up'} as
                </p>
                <p className="text-[#0A1F44]">{email}</p>
                <p className="text-xs text-[#64748B] mt-1 capitalize">Role: {role.replace('-', ' ')}</p>
              </div>

              {/* Captcha Display */}
              <div className="mb-6">
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] rounded-lg p-6 mb-4 relative overflow-hidden">
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-20 h-20 border-2 border-white rounded-full"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-2 border-white rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-white rounded-full"></div>
                    </div>
                    
                    {/* Captcha Code */}
                    <div className="relative text-center">
                      <p className="text-xs text-white/60 mb-2">Enter this code:</p>
                      <div className="flex items-center justify-center gap-2">
                        {captcha.split('').map((digit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="w-12 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20"
                          >
                            <span className="text-3xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                              {digit}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Refresh Button */}
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all group"
                    title="Generate new code"
                  >
                    <RefreshCw className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Captcha Input */}
                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Enter Captcha Code
                  </label>
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all text-center text-2xl tracking-widest"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    required
                    autoFocus
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={userInput.length !== 6}
                  className="w-full py-3.5 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Continue
                </button>
              </form>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This verification helps us ensure that you're a human and not a bot. Please enter the 6-digit code displayed above.
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}