import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Shield, BookOpen, Users, Scale, ChevronRight, Star, Award, Target } from 'lucide-react';

export default function Landing() {
  const roles = [
    {
      title: 'Admin',
      description: 'Oversee platform content and manage user roles',
      icon: Shield,
      link: '/auth/admin/login',
      color: 'from-[#0A1F44] to-[#1A3A6B]',
    },
    {
      title: 'Educator',
      description: 'Create educational content and conduct sessions',
      icon: BookOpen,
      link: '/auth/educator/login',
      color: 'from-[#FF9933] to-[#FFB366]',
    },
    {
      title: 'Legal Expert',
      description: 'Offer legal insights and update constitutional content',
      icon: Scale,
      link: '/auth/legal-expert/login',
      color: 'from-[#138808] to-[#1ea712]',
    },
    {
      title: 'Citizen',
      description: 'Explore content and participate in discussions',
      icon: Users,
      link: '/auth/citizen/login',
      color: 'from-[#1A3A6B] to-[#0A1F44]',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Learning',
      description: 'Detailed information about Constitutional framework and articles',
    },
    {
      icon: Award,
      title: 'Interactive Content',
      description: 'Engage with quizzes, discussions, and educational sessions',
    },
    {
      icon: Target,
      title: 'Expert Guidance',
      description: 'Learn from legal experts and experienced educators',
    },
  ];

  return (
    <div className="min-h-screen bg-white ashoka-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-white border-b border-[#0A1F44]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  LexIndia
                </h1>
                <p className="text-xs text-[#64748B]">Constitution Awareness Platform</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <Link 
                to="/login"
                className="px-6 py-2.5 text-[#0A1F44] hover:text-[#FF9933] transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className="px-6 py-2.5 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all hover-lift"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Ashoka Chakra Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 
                className="text-6xl md:text-7xl mb-6 text-[#0A1F44] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Empowering Citizens Through
                <span className="block mt-2 bg-gradient-to-r from-[#FF9933] to-[#E87F1F] bg-clip-text text-transparent">
                  Constitutional Knowledge
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-[#64748B] mb-12 leading-relaxed"
            >
              A comprehensive platform to educate citizens about the Indian Constitution,
              fundamental rights, duties, and constitutional awareness
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <Link 
                to="/signup"
                className="px-8 py-4 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all hover-lift flex items-center gap-2 group"
              >
                Get Started
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={`/quiz/${Math.floor(Math.random() * 20) + 1}`}
                className="px-8 py-3 bg-gradient-to-r from-[#FF9933] to-[#E87F1F] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2 group"
              >
                <Award className="w-5 h-5" />
                Take Constitutional Quiz
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl text-[#0A1F44] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose Your Role
            </h2>
            <p className="text-xl text-[#64748B]">
              Select your role to access tailored features and content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={role.link}
                    className="block group"
                  >
                    <div className="glass-white rounded-2xl p-8 hover-lift card-elevated h-full">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {role.title}
                      </h3>
                      <p className="text-[#64748B] mb-4">
                        {role.description}
                      </p>
                      <div className="flex items-center text-[#FF9933] group-hover:gap-2 transition-all">
                        <span>Explore</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 ashoka-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl text-[#0A1F44] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Platform Features
            </h2>
            <p className="text-xl text-[#64748B]">
              Everything you need to understand the Constitution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FFB366] mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#64748B]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="text-5xl mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                About the Platform
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                This platform is designed to promote awareness and understanding of the Indian Constitution among citizens. We provide comprehensive information about constitutional framework, fundamental rights, duties, and amendments.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Through interactive features, expert insights, and educational content, we aim to empower every citizen with constitutional knowledge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#051229] via-[#0A1F44] to-[#051229] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0A1F44] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    LexIndia
                  </h3>
                  <p className="text-xs text-white/50">Know Your Rights</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Empowering every Indian citizen with comprehensive constitutional knowledge and awareness of fundamental rights and duties.
              </p>
            </div>

            {/* Portal Links */}
            <div>
              <h4 className="text-lg mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Access Portals
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/auth/admin/login" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Admin Portal
                  </Link>
                </li>
                <li>
                  <Link to="/auth/educator/login" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Educator Portal
                  </Link>
                </li>
                <li>
                  <Link to="/auth/legal-expert/login" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Legal Expert Portal
                  </Link>
                </li>
                <li>
                  <Link to="/auth/citizen/login" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Citizen Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Constitution Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/citizen" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Browse Articles
                  </Link>
                </li>
                <li>
                  <Link to="/forum" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Discussion Forum
                  </Link>
                </li>
                <li>
                  <Link to="/quiz/1" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Constitutional Quizzes
                  </Link>
                </li>
                <li>
                  <Link to="/amendment-history" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Amendment History
                  </Link>
                </li>
              </ul>
            </div>

            {/* Important Information */}
            <div>
              <h4 className="text-lg mb-6 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Information
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    About LexIndia
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-white/70 hover:text-[#FF9933] transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/60 text-center md:text-left">
                &copy; 2026 LexIndia - Constitution Awareness Platform. An initiative by the Government of India.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded overflow-hidden">
                  <div className="h-1/3 bg-[#FF9933]"></div>
                  <div className="h-1/3 bg-white"></div>
                  <div className="h-1/3 bg-[#138808]"></div>
                </div>
                <span className="text-sm text-white/60">Proud to be Indian</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}