import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, UserCheck, Database, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function Privacy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email address, role)',
        'Usage data and analytics to improve our platform',
        'Device information and IP addresses for security purposes',
        'Cookies and similar tracking technologies for enhanced user experience',
      ],
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our constitutional education platform',
        'To personalize your learning experience and content recommendations',
        'To send important updates about constitutional amendments and platform features',
        'To improve our services through usage analytics',
        'To ensure platform security and prevent fraudulent activities',
      ],
    },
    {
      icon: Shield,
      title: 'Data Protection & Security',
      content: [
        'All data is encrypted in transit and at rest using industry-standard protocols',
        'Regular security audits and vulnerability assessments',
        'Strict access controls and authentication mechanisms',
        'Compliance with Indian data protection regulations',
        'Secure backup systems to prevent data loss',
      ],
    },
    {
      icon: Eye,
      title: 'Your Privacy Rights',
      content: [
        'Access and review your personal information at any time',
        'Request correction or deletion of your data',
        'Opt-out of marketing communications',
        'Export your data in a portable format',
        'File complaints with data protection authorities',
      ],
    },
    {
      icon: UserCheck,
      title: 'Data Sharing & Third Parties',
      content: [
        'We do not sell your personal information to third parties',
        'Limited data sharing with trusted service providers for platform operations',
        'Compliance with legal requirements and government requests',
        'Anonymous aggregated data may be shared for research purposes',
      ],
    },
    {
      icon: FileText,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies for platform functionality',
        'Analytics cookies to understand user behavior (can be disabled)',
        'Preference cookies to remember your settings',
        'You can manage cookie preferences through your browser settings',
      ],
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-[#1A3A6B] to-[#0A1F44]">
        <div className="absolute inset-0 ashoka-pattern opacity-10"></div>
        
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
              <Lock className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Privacy <span className="bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">Policy</span>
            </h1>
            
            <p className="text-lg text-white/70 mb-4">
              Last Updated: March 27, 2026
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              Your privacy is our priority. Learn how we protect and handle your information with the highest standards of security.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-2xl p-8 border-l-4 border-[#FF9933] shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-[#FF9933]" />
              </div>
              <div>
                <h3 className="text-2xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Important Notice
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  LexIndia is committed to protecting your privacy and ensuring the security of your personal information. 
                  By using our platform, you agree to the collection and use of information in accordance with this policy. 
                  We are compliant with Indian data protection laws and international privacy standards.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-white rounded-3xl p-8 md:p-10 shadow-lg hover-lift"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF9933] to-[#E87F1F] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 
                        className="text-3xl text-[#0A1F44] mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {section.title}
                      </h2>
                      <ul className="space-y-4">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#138808] flex-shrink-0 mt-0.5" />
                            <span className="text-[#64748B] leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-3xl p-10 shadow-xl"
          >
            <h2 
              className="text-4xl text-[#0A1F44] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Data Retention Policy
            </h2>
            <p className="text-[#64748B] leading-relaxed text-lg mb-6">
              We retain your personal information only for as long as necessary to provide our services and fulfill 
              the purposes outlined in this privacy policy. When you delete your account, we will remove your personal 
              information from our active databases within 30 days.
            </p>
            <p className="text-[#64748B] leading-relaxed text-lg">
              Some information may be retained in our backup systems for an additional period as required by law or 
              for legitimate business purposes. Anonymous aggregated data may be retained indefinitely for research 
              and platform improvement purposes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-3xl p-10 shadow-xl border-l-4 border-[#0A1F44]"
          >
            <h2 
              className="text-4xl text-[#0A1F44] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Children's Privacy
            </h2>
            <p className="text-[#64748B] leading-relaxed text-lg mb-4">
              LexIndia is designed for users aged 13 and above. We do not knowingly collect personal information from 
              children under 13 years of age. If you are a parent or guardian and believe your child has provided us 
              with personal information, please contact us immediately.
            </p>
            <p className="text-[#64748B] leading-relaxed text-lg">
              For users between 13-18 years of age, we recommend parental guidance when using our platform and accessing 
              constitutional content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1F44] via-[#1A3A6B] to-[#0A1F44]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 
              className="text-4xl md:text-5xl text-white mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Questions About Privacy?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              If you have any questions or concerns about our privacy practices, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="px-10 py-4 bg-white text-[#0A1F44] rounded-lg hover:bg-[#F8F9FA] transition-all hover-lift font-semibold text-lg"
              >
                Contact Us
              </Link>
              <Link 
                to="/"
                className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#0A1F44] transition-all font-semibold text-lg"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
