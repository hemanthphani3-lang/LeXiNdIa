import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import {
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell,
  Bookmark, ArrowLeft, ChevronDown, ChevronUp, Book, Shield
} from 'lucide-react';
import { directivePrinciplesArticles } from '../../../data/constitutionalData';

export default function DirectivePrinciples() {
  const navigate = useNavigate();
  const [expandedArticles, setExpandedArticles] = useState(
    directivePrinciplesArticles.map(a => a.number) // All expanded by default
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

  const toggleArticle = (articleNumber) => {
    setExpandedArticles(prev =>
      prev.includes(articleNumber)
        ? prev.filter(n => n !== articleNumber)
        : [...prev, articleNumber]
    );
  };

  const isExpanded = (articleNumber) => expandedArticles.includes(articleNumber);

  return (
    <DashboardLayout navigationItems={navigationItems} title="Directive Principles" role="Citizen">
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
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#138808] to-[#1DB010] flex items-center justify-center">
            <Book className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className="text-3xl md:text-4xl text-[#0A1F44] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Directive Principles of State Policy
            </h1>
            <p className="text-[#64748B] text-lg">
              Articles 36-51 • 18 Guiding Principles
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="glass-white rounded-xl p-6 mb-6">
          <h2 className="text-xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Directive Principles
          </h2>
          <p className="text-[#64748B] mb-4 leading-relaxed">
            The Directive Principles of State Policy (DPSP) are guidelines for the State to establish social and economic democracy.
            Though not enforceable by courts, they are fundamental in governance and form the basis for future legislation.
            These principles aim to create a welfare state where justice—social, economic and political—is secured for all citizens.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#FF9933]/10 rounded-lg p-4">
              <div className="text-2xl text-[#FF9933] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Articles 36-51
              </div>
              <div className="text-sm text-[#64748B]">Constitutional Coverage</div>
            </div>
            <div className="bg-[#138808]/10 rounded-lg p-4">
              <div className="text-2xl text-[#138808] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Not Justiciable
              </div>
              <div className="text-sm text-[#64748B]">Non-enforceable in courts</div>
            </div>
            <div className="bg-[#0A1F44]/10 rounded-lg p-4">
              <div className="text-2xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Welfare State
              </div>
              <div className="text-sm text-[#64748B]">Foundation of governance</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Articles List - All Expanded */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-4"
      >
        {directivePrinciplesArticles.map((article, index) => (
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1DB010] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {article.number}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Article {article.number}: {article.title}
                    </h3>
                    {isExpanded(article.number) ? (
                      <ChevronUp className="w-5 h-5 text-[#138808] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                    )}
                  </div>
                  {article.category && (
                    <span className="inline-block mt-2 px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-xs">
                      {article.category}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded(article.number) && (
              <div className="px-6 pb-6 space-y-4 border-t border-[#E2E8F0]">
                {/* Full Text */}
                <div className="mt-4 bg-[#F8FAFC] border-l-4 border-[#138808] rounded-r-lg p-4">
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

                {/* Key Points */}
                {article.keyPoints && article.keyPoints.length > 0 && (
                  <div>
                    <h4 className="text-sm text-[#0A1F44] mb-3 font-semibold">Key Points</h4>
                    <ul className="space-y-2">
                      {article.keyPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#138808] mt-2 flex-shrink-0"></span>
                          <span className="text-sm text-[#64748B]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass-white rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Borrowed from Irish Constitution
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            The concept of Directive Principles was borrowed from the Irish Constitution. These principles reflect the philosophy
            of the Preamble and establish the foundation for a welfare state committed to social, economic and political justice.
          </p>
        </div>

        <div className="glass-white rounded-xl p-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center mb-4">
            <Book className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Relationship with Fundamental Rights
          </h3>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Article 37 states that DPSPs are not enforceable by courts but are fundamental in governance. The Supreme Court has
            held that while Fundamental Rights generally prevail, both should be harmoniously constructed to achieve constitutional goals.
          </p>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
