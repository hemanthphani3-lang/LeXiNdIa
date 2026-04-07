import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, Search, Star, TrendingUp, Filter, ChevronRight
} from 'lucide-react';
import { fundamentalRightsArticles } from '../../../data/constitutionalData';

export default function AllArticles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
  const categories = ['all', ...new Set(fundamentalRightsArticles.map(a => a.category))];

  // Filter articles
  const filteredArticles = fundamentalRightsArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.number.toString().includes(searchQuery) ||
      article.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout navigationItems={navigationItems} title="All Articles" role="Citizen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-3xl md:text-4xl text-[#0A1F44] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              All Constitutional Articles
            </h1>
            <p className="text-[#64748B] text-lg">
              Browse all {fundamentalRightsArticles.length} articles on Fundamental Rights
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search articles by number, title, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#0A1F44]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-[#64748B] flex-shrink-0" />
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
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <Link to={`/citizen/article/${article.number}`} key={article.number}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="glass-white rounded-xl p-6 hover-lift card-elevated group h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {article.number}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs mb-2 inline-block">
                      {article.category}
                    </span>
                    <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Article {article.number}: {article.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm text-[#64748B] mb-4 line-clamp-3">
                  {article.explanation}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {article.keyPoints?.length || 0} Key Points
                    </span>
                    <span className="flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      {article.importantCases?.length || 0} Cases
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FF9933] text-sm group-hover:gap-2 transition-all">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 glass-white rounded-xl"
        >
          <Search className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No Articles Found
          </h3>
          <p className="text-[#64748B] mb-6">
            No articles match your search criteria. Try different keywords or category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="glass-white rounded-xl p-6 text-center">
          <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {fundamentalRightsArticles.length}
          </div>
          <div className="text-sm text-[#64748B]">Total Articles</div>
        </div>
        <div className="glass-white rounded-xl p-6 text-center">
          <div className="text-3xl text-[#FF9933] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {categories.length - 1}
          </div>
          <div className="text-sm text-[#64748B]">Categories</div>
        </div>
        <div className="glass-white rounded-xl p-6 text-center">
          <div className="text-3xl text-[#138808] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {filteredArticles.length}
          </div>
          <div className="text-sm text-[#64748B]">Showing</div>
        </div>
        <div className="glass-white rounded-xl p-6 text-center">
          <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            100%
          </div>
          <div className="text-sm text-[#64748B]">Authentic</div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
