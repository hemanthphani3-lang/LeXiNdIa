import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import {
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell,
  Bookmark, ArrowLeft, ChevronDown, ChevronUp, Landmark, Users, Gavel
} from 'lucide-react';
import { unionGovernmentArticles } from '../../../data/constitutionalData';

export default function UnionGovernment() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedArticles, setExpandedArticles] = useState(
    unionGovernmentArticles.map(a => a.number) // All expanded by default
  );

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  // Get unique categories
  const categories = ['all', ...new Set(unionGovernmentArticles.map(a => a.category))];

  // Filter articles by category
  const filteredArticles = selectedCategory === 'all'
    ? unionGovernmentArticles
    : unionGovernmentArticles.filter(a => a.category === selectedCategory);

  const toggleArticle = (articleNumber) => {
    setExpandedArticles(prev =>
      prev.includes(articleNumber)
        ? prev.filter(n => n !== articleNumber)
        : [...prev, articleNumber]
    );
  };

  const isExpanded = (articleNumber) => expandedArticles.includes(articleNumber);

  // Color mapping for categories
  const getCategoryColor = (category) => {
    const colors = {
      'Executive': 'from-[#FF9933] to-[#FFB366]',
      'Legislature': 'from-[#138808] to-[#1DB010]',
      'Judiciary': 'from-[#0A1F44] to-[#1E3A5F]',
      'Emergency Provisions': 'from-[#DC2626] to-[#EF4444]',
      'Amendment': 'from-[#7C3AED] to-[#A78BFA]'
    };
    return colors[category] || 'from-[#FF9933] to-[#FFB366]';
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Union Government" role="Citizen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/citizen/explore')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#FF9933] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Explore Constitution
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
            <Landmark className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className="text-3xl md:text-4xl text-[#0A1F44] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Union Government
            </h1>
            <p className="text-[#64748B] text-lg">
              Articles 52-368 • Structure and Functions of Central Government
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="glass-white rounded-xl p-6 mb-6">
          <h2 className="text-xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Union Government
          </h2>
          <p className="text-[#64748B] mb-4 leading-relaxed">
            Part V of the Indian Constitution (Articles 52-151) deals with the Union Government. It establishes the executive,
            legislature, and judiciary at the central level. The Union Government consists of the President, Parliament (Lok Sabha
            and Rajya Sabha), Prime Minister and Council of Ministers, and the Supreme Court.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#FF9933]/10 rounded-lg p-4">
              <div className="text-2xl text-[#FF9933] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Executive
              </div>
              <div className="text-sm text-[#64748B]">President, PM & Ministers</div>
            </div>
            <div className="bg-[#138808]/10 rounded-lg p-4">
              <div className="text-2xl text-[#138808] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Legislature
              </div>
              <div className="text-sm text-[#64748B]">Parliament (Both Houses)</div>
            </div>
            <div className="bg-[#0A1F44]/10 rounded-lg p-4">
              <div className="text-2xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Judiciary
              </div>
              <div className="text-sm text-[#64748B]">Supreme Court of India</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#FF9933] text-white'
                  : 'bg-white text-[#64748B] hover:bg-[#FF9933]/10 hover:text-[#FF9933] border border-[#E2E8F0]'
              }`}
            >
              {category === 'all' ? 'All Articles' : category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Articles List - All Expanded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            className="glass-white rounded-xl overflow-hidden card-elevated"
          >
            {/* Article Header - Clickable */}
            <div
              onClick={() => toggleArticle(article.number)}
              className="p-6 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(article.category)} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">
                    {article.number}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block mb-2 px-3 py-1 bg-[#0A1F44]/10 text-[#0A1F44] rounded-full text-xs">
                        {article.category}
                      </span>
                      <h3 className="text-lg text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Article {article.number}: {article.title}
                      </h3>
                    </div>
                    {isExpanded(article.number) ? (
                      <ChevronUp className="w-5 h-5 text-[#FF9933] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded(article.number) && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#E2E8F0]">
                {/* Full Text */}
                <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#FF9933] rounded-r-lg p-4">
                  <h4 className="text-sm text-[#64748B] mb-2 uppercase tracking-wide">Constitutional Text</h4>
                  <p className="text-[#0A1F44] italic leading-relaxed">
                    "{article.fullText}"
                  </p>
                </div>

                {/* Explanation */}
                <div>
                  <h4 className="text-sm text-[#0A1F44] mb-2 font-semibold">Detailed Explanation</h4>
                  <p className="text-[#64748B] leading-relaxed">
                    {article.explanation}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-white rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Parliamentary System
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            India follows the Westminster model of parliamentary democracy. The Prime Minister and Council of Ministers are
            responsible to the Lok Sabha and hold office as long as they enjoy majority support.
          </p>
        </div>

        <div className="glass-white rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1DB010] flex items-center justify-center mb-4">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Federal Structure
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            The Constitution establishes a federal system with division of powers between Union and States. However,
            it has a strong unitary bias with the Union having more powers, especially during emergencies.
          </p>
        </div>

        <div className="glass-white rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center mb-4">
            <Gavel className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Independent Judiciary
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            The Supreme Court is the apex judicial body with original, appellate, and advisory jurisdiction.
            It acts as the guardian of the Constitution and protector of fundamental rights of citizens.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
