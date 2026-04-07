import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft, Shield, Target, Sparkles, Users, BookOpen, Award, Heart, Lightbulb, Scale, TrendingUp, Globe, Zap } from 'lucide-react';

export default function About() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making constitutional knowledge accessible to every Indian citizen regardless of background or education level.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Leveraging modern technology to create engaging and interactive learning experiences.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Scale,
      title: 'Integrity',
      description: 'Maintaining accuracy and authenticity in all constitutional information and educational content.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a vibrant community of informed citizens who actively engage with constitutional matters.',
      color: 'from-green-500 to-teal-500',
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: BookOpen, value: '500+', label: 'Articles' },
    { icon: Award, value: '100+', label: 'Quizzes' },
    { icon: TrendingUp, value: '95%', label: 'Satisfaction' },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Library',
      description: 'Access detailed articles on every aspect of the Indian Constitution, from fundamental rights to directive principles.',
      gradient: 'from-[#FF9933] to-[#E87F1F]',
    },
    {
      icon: Award,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with rotating quiz sets designed by constitutional experts.',
      gradient: 'from-[#0A1F44] to-[#1A3A6B]',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with legal experts, educators, and fellow citizens passionate about constitutional literacy.',
      gradient: 'from-[#138808] to-[#1ea712]',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Content available in multiple Indian languages to ensure maximum accessibility.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay informed about constitutional amendments, landmark judgments, and legal developments.',
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      icon: Scale,
      title: 'Legal Resources',
      description: 'Comprehensive case studies, legal precedents, and expert commentary on constitutional matters.',
      gradient: 'from-amber-600 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-[#0A1F44]/10 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                LexIndia
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern Gradient Design */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#1A3A6B] to-[#0A1F44]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-[#FF9933] rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mb-8 border border-white/20"
            >
              <Shield className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About <span className="bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">LexIndia</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Empowering India's future through constitutional literacy and democratic awareness
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="glass-white rounded-2xl p-6 text-center"
                  >
                    <Icon className="w-8 h-8 text-[#FF9933] mx-auto mb-2" />
                    <div className="text-3xl font-bold text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#64748B]">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Side by Side Cards */}
      <section className="py-24 bg-gradient-to-br from-[#F8F9FA] to-white ashoka-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="h-full glass-white rounded-3xl p-10 shadow-xl hover-lift relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF9933] to-[#E87F1F] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 
                    className="text-4xl text-[#0A1F44] mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Our Mission
                  </h2>
                  <p className="text-[#64748B] leading-relaxed text-lg">
                    To democratize constitutional knowledge by creating accessible, engaging, and practical 
                    learning experiences for every Indian citizen. We bridge the gap between the Constitution 
                    and the people through innovative technology, expert guidance, and active community participation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="h-full glass-white rounded-3xl p-10 shadow-xl hover-lift relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#0A1F44]/20 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 
                    className="text-4xl text-[#0A1F44] mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Our Vision
                  </h2>
                  <p className="text-[#64748B] leading-relaxed text-lg">
                    To build a nation where every citizen is constitutionally literate, fully aware of their 
                    fundamental rights and duties, and actively participates in strengthening Indian democracy. 
                    We envision constitutional awareness as the cornerstone of modern citizenship.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Colorful Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl md:text-6xl text-[#0A1F44] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Core Values
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full glass-white rounded-2xl p-8 hover-lift text-center border border-transparent hover:border-[#FF9933]/20 transition-all">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {value.title}
                    </h3>
                    <p className="text-[#64748B] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features - Modern Grid */}
      <section className="py-24 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl md:text-6xl text-[#0A1F44] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              What We Offer
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              Comprehensive resources and tools for constitutional learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full glass-white rounded-3xl p-8 hover-lift shadow-lg">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 
                      className="text-2xl text-[#0A1F44] mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[#64748B] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section - Full Width Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44] via-[#1A3A6B] to-[#0A1F44]"></div>
        <div className="absolute inset-0 ashoka-pattern opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 
              className="text-5xl md:text-6xl text-white mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Commitment to India
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-6">
              LexIndia is dedicated to strengthening Indian democracy by fostering constitutional 
              awareness among citizens. We believe that an informed citizenry is the foundation of 
              a robust democratic system.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Through continuous innovation, expert collaboration, and community engagement, we strive 
              to make constitutional education both accessible and engaging for all Indians. Our platform 
              is built on the principles of accuracy, transparency, and inclusivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] to-[#E87F1F]"></div>
            <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 
                className="text-4xl md:text-5xl text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Join Us in This Mission
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Be part of a movement to create a constitutionally aware and empowered India
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/signup"
                  className="px-10 py-4 bg-white text-[#FF9933] rounded-lg hover:bg-[#F8F9FA] transition-all hover-lift font-semibold text-lg"
                >
                  Get Started Today
                </Link>
                <Link 
                  to="/contact"
                  className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#FF9933] transition-all font-semibold text-lg"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
