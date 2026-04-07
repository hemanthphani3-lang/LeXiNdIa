import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft, Shield, FileText, CheckCircle, XCircle, AlertTriangle, Scale, Users } from 'lucide-react';

export default function Terms() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Users,
      title: 'User Accounts & Registration',
      content: [
        'You must be at least 13 years old to create an account',
        'Provide accurate and complete information during registration',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized access',
        'You are responsible for all activities under your account',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Acceptable Use',
      content: [
        'Use the platform for educational and constitutional awareness purposes',
        'Respect other users and engage in constructive discussions',
        'Do not post false, misleading, or defamatory content',
        'Respect intellectual property rights and copyrights',
        'Do not attempt to interfere with platform operations',
      ],
    },
    {
      icon: XCircle,
      title: 'Prohibited Activities',
      content: [
        'Posting content that violates Indian laws or regulations',
        'Harassment, abuse, or threatening behavior toward other users',
        'Spam, phishing, or any form of commercial exploitation',
        'Uploading malware, viruses, or harmful code',
        'Impersonating other users, experts, or government officials',
        'Attempting to gain unauthorized access to platform systems',
      ],
    },
    {
      icon: Scale,
      title: 'Intellectual Property',
      content: [
        'All platform content is protected by intellectual property laws',
        'LexIndia and its logo are trademarks owned by the platform',
        'You may not reproduce content without proper attribution',
        'User-generated content remains your property with license granted to us',
        'Constitutional texts and government documents are public domain',
      ],
    },
    {
      icon: FileText,
      title: 'Content Guidelines',
      content: [
        'All content must be relevant to constitutional education',
        'Maintain accuracy when discussing legal and constitutional matters',
        'Provide sources and citations when sharing legal information',
        'Avoid political propaganda or partisan content',
        'Respect diverse viewpoints and encourage healthy debate',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Disclaimer & Limitations',
      content: [
        'Platform content is for educational purposes only',
        'Not a substitute for professional legal advice',
        'We do not guarantee accuracy of user-generated content',
        'Platform availability may vary due to maintenance or technical issues',
        'We are not liable for actions taken based on platform information',
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
              <FileText className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Terms of <span className="bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">Service</span>
            </h1>
            
            <p className="text-lg text-white/70 mb-4">
              Last Updated: March 27, 2026
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              Please read these terms carefully before using LexIndia platform. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agreement Notice */}
      <section className="py-12 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-2xl p-8 border-l-4 border-[#0A1F44] shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0A1F44]/10 flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-[#0A1F44]" />
              </div>
              <div>
                <h3 className="text-2xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Agreement to Terms
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and LexIndia. 
                  By accessing or using our platform, you acknowledge that you have read, understood, and agree 
                  to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center flex-shrink-0">
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
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF9933] flex-shrink-0 mt-2"></div>
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

      {/* Termination */}
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
              Account Termination
            </h2>
            <p className="text-[#64748B] leading-relaxed text-lg mb-6">
              We reserve the right to suspend or terminate your account if you violate these terms or engage in 
              activities that harm the platform or other users. You may also delete your account at any time through 
              your account settings.
            </p>
            <p className="text-[#64748B] leading-relaxed text-lg">
              Upon termination, your right to access and use the platform will immediately cease. We may retain 
              certain information as required by law or for legitimate business purposes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-3xl p-10 shadow-xl border-l-4 border-[#FF9933]"
          >
            <h2 
              className="text-4xl text-[#0A1F44] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Changes to Terms
            </h2>
            <p className="text-[#64748B] leading-relaxed text-lg mb-4">
              We may update these Terms of Service from time to time to reflect changes in our practices, legal 
              requirements, or platform features. We will notify you of any material changes by posting the new 
              terms on this page and updating the "Last Updated" date.
            </p>
            <p className="text-[#64748B] leading-relaxed text-lg">
              Your continued use of the platform after any changes indicates your acceptance of the updated terms. 
              We encourage you to review these terms periodically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Governing Law */}
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
              Governing Law & Jurisdiction
            </h2>
            <p className="text-[#64748B] leading-relaxed text-lg mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions. Any disputes arising from these terms or your 
              use of the platform shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
            </p>
            <p className="text-[#64748B] leading-relaxed text-lg">
              In the spirit of constitutional awareness, we encourage users to resolve disputes amicably through 
              direct communication before pursuing legal action.
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
              Questions About Terms?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              If you have any questions about these terms of service, please don't hesitate to reach out.
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
