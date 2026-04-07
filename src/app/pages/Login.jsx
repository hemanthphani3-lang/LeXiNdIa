import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Shield, ArrowLeft, Users, BookOpen, Scale, UserCog } from 'lucide-react';

export default function Login() {
  const portals = [
    {
      title: 'Admin',
      description: 'Administrative access for platform management',
      icon: UserCog,
      link: '/auth/admin/login',
      color: 'from-[#0A1F44] to-[#1A3A6B]',
    },
    {
      title: 'Educator',
      description: 'For teachers and content creators',
      icon: BookOpen,
      link: '/auth/educator/login',
      color: 'from-[#FF9933] to-[#FFB366]',
    },
    {
      title: 'Legal Expert',
      description: 'For legal professionals and consultants',
      icon: Scale,
      link: '/auth/legal-expert/login',
      color: 'from-[#138808] to-[#1ea712]',
    },
    {
      title: 'Citizen',
      description: 'For learners and general public',
      icon: Users,
      link: '/auth/citizen/login',
      color: 'from-[#1A3A6B] to-[#0A1F44]',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center ashoka-bg p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF9933]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0A1F44]/5 rounded-full blur-3xl"></div>
        
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
        className="w-full max-w-4xl relative z-10"
      >
        {/* Back Button */}
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Login Selection Card */}
        <div className="glass-white rounded-2xl p-8 md:p-10 shadow-2xl border border-[#0A1F44]/10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#0A1F44]" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 
              className="text-4xl text-[#0A1F44] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Select Your Portal
            </h1>
            <p className="text-[#64748B] text-lg">
              Choose your role to access the login page
            </p>
          </div>

          {/* Portal Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((portal, index) => {
              const Icon = portal.icon;
              return (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={portal.link}
                    className="block group"
                  >
                    <div className="glass-white rounded-xl p-6 border border-[#0A1F44]/10 hover-lift card-elevated h-full transition-all hover:border-[#FF9933]/30">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 
                        className="text-xl text-[#0A1F44] mb-2" 
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {portal.title}
                      </h3>
                      <p className="text-[#64748B] text-sm">
                        {portal.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#0A1F44]/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#64748B]">New to LexIndia?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
