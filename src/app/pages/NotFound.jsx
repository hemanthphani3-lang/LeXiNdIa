import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] ashoka-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 
            className="text-9xl bg-gradient-to-r from-[#0A1F44] to-[#FF9933] bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 
            className="text-4xl text-[#0A1F44] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Page Not Found
          </h2>
          <p className="text-lg text-[#64748B] mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all hover-lift"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white border border-[#0A1F44]/10 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <Link 
            to="/citizen"
            className="p-4 glass-white rounded-xl hover-lift transition-all text-center"
          >
            <Search className="w-6 h-6 text-[#FF9933] mx-auto mb-2" />
            <p className="text-sm text-[#64748B]">Explore Articles</p>
          </Link>
          <Link 
            to="/forum"
            className="p-4 glass-white rounded-xl hover-lift transition-all text-center"
          >
            <Search className="w-6 h-6 text-[#FF9933] mx-auto mb-2" />
            <p className="text-sm text-[#64748B]">Forum</p>
          </Link>
          <Link 
            to="/quiz/1"
            className="p-4 glass-white rounded-xl hover-lift transition-all text-center"
          >
            <Search className="w-6 h-6 text-[#FF9933] mx-auto mb-2" />
            <p className="text-sm text-[#64748B]">Take Quiz</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
