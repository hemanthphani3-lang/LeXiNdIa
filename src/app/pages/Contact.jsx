import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft, Shield, Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Clock } from 'lucide-react';

export default function Contact() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@lexindia.gov.in',
      description: 'We typically respond within 24 hours',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 11 2345 6789',
      description: 'Mon-Fri, 9:00 AM - 6:00 PM IST',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Constitutional Avenue, New Delhi',
      description: 'India 110001',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM IST',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const faqCategories = [
    {
      icon: HelpCircle,
      title: 'General Inquiries',
      description: 'Questions about the platform and features',
    },
    {
      icon: Shield,
      title: 'Account & Security',
      description: 'Login issues and account management',
    },
    {
      icon: MessageCircle,
      title: 'Technical Support',
      description: 'Bug reports and technical difficulties',
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
              <MessageCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 
              className="text-6xl md:text-7xl text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Contact <span className="bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">Support</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Have questions or need assistance? We're here to help you navigate constitutional knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-white rounded-2xl p-6 hover-lift text-center shadow-lg"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg text-[#0A1F44] mb-2 font-semibold">
                    {info.title}
                  </h3>
                  <p className="text-[#0A1F44] font-medium mb-1">
                    {info.content}
                  </p>
                  <p className="text-sm text-[#64748B]">
                    {info.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-white rounded-3xl p-8 md:p-10 shadow-xl"
              >
                <h2 
                  className="text-4xl text-[#0A1F44] mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send Us a Message
                </h2>
                <p className="text-[#64748B] mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl text-green-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#0A1F44] mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0A1F44] mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none transition-all"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#0A1F44] mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none transition-all"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="account">Account & Security</option>
                        <option value="technical">Technical Support</option>
                        <option value="content">Content Issue</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#0A1F44] mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none transition-all"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0A1F44] mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] focus:border-[#FF9933] focus:ring-2 focus:ring-[#FF9933]/20 outline-none transition-all resize-none"
                        placeholder="Provide details about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-[#FF9933] to-[#E87F1F] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center justify-center gap-2 font-semibold text-lg"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* FAQ Categories */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <h3 
                  className="text-3xl text-[#0A1F44] mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Quick Help
                </h3>
                <div className="space-y-4">
                  {faqCategories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="glass-white rounded-2xl p-6 hover-lift shadow-lg cursor-pointer group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-lg text-[#0A1F44] mb-1 font-semibold">
                              {category.title}
                            </h4>
                            <p className="text-sm text-[#64748B]">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Additional Help */}
                <div className="mt-8 glass-white rounded-2xl p-6 shadow-lg border-l-4 border-[#FF9933]">
                  <h4 className="text-lg text-[#0A1F44] mb-3 font-semibold">
                    Need Immediate Help?
                  </h4>
                  <p className="text-sm text-[#64748B] mb-4">
                    For urgent matters, please call our support line during business hours.
                  </p>
                  <a 
                    href="tel:+911123456789"
                    className="inline-flex items-center gap-2 text-[#FF9933] hover:text-[#E87F1F] transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    +91 11 2345 6789
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location Map Placeholder */}
      <section className="py-16 bg-gradient-to-br from-[#F8F9FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-white rounded-3xl p-10 shadow-xl text-center"
          >
            <MapPin className="w-16 h-16 text-[#FF9933] mx-auto mb-6" />
            <h3 
              className="text-3xl text-[#0A1F44] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Visit Our Office
            </h3>
            <p className="text-lg text-[#64748B] mb-2">
              Constitutional Avenue, New Delhi
            </p>
            <p className="text-lg text-[#64748B]">
              India 110001
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              Explore More Resources
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              While you wait for our response, explore our constitutional knowledge base.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/citizen"
                className="px-10 py-4 bg-white text-[#0A1F44] rounded-lg hover:bg-[#F8F9FA] transition-all hover-lift font-semibold text-lg"
              >
                Browse Articles
              </Link>
              <Link 
                to="/quiz/1"
                className="px-10 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#0A1F44] transition-all font-semibold text-lg"
              >
                Take a Quiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
