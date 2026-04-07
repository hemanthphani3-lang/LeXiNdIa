import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, ChevronRight, Trash2, Filter, Star, TrendingUp, X
} from 'lucide-react';

export default function Bookmarks() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks', active: true },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const filters = [
    { id: 'all', label: 'All', count: bookmarkedArticles.length },
    { id: 'rights', label: 'Rights', count: bookmarkedArticles.filter(a => a.tags.includes('rights')).length },
    { id: 'equality', label: 'Equality', count: bookmarkedArticles.filter(a => a.tags.includes('equality')).length },
    { id: 'freedom', label: 'Freedom', count: bookmarkedArticles.filter(a => a.tags.includes('freedom')).length }
  ];

  const filteredArticles = selectedFilter === 'all' 
    ? bookmarkedArticles 
    : bookmarkedArticles.filter(article => article.tags.includes(selectedFilter));

  const handleRemoveBookmark = (id) => {
    setBookmarkedArticles(bookmarkedArticles.filter(article => article.id !== id));
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Bookmarks" role="Citizen">
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
              My Bookmarks
            </h1>
            <p className="text-[#64748B] text-lg">
              Your saved articles for quick access
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#FF9933]/10 text-[#FF9933] rounded-lg">
            <Bookmark className="w-5 h-5 fill-current" />
            <span className="font-semibold">{bookmarkedArticles.length} Articles</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-[#64748B] flex-shrink-0" />
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-[#FF9933] text-white'
                  : 'bg-white text-[#64748B] hover:bg-[#FF9933]/10 hover:text-[#FF9933]'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Bookmarked Articles */}
      {filteredArticles.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="glass-white rounded-xl p-6 card-elevated group relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveBookmark(article.id)}
                className="absolute top-4 right-4 p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100"
                title="Remove bookmark"
              >
                <X className="w-4 h-4" />
              </button>

              <Link to={`/citizen/rights/${article.categoryPath}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {article.number}
                    </span>
                  </div>
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs">
                        {article.category}
                      </span>
                      <span className="text-xs text-[#64748B]">
                        Saved {article.bookmarkedOn}
                      </span>
                    </div>
                    <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Article {article.number}: {article.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mb-4 line-clamp-2">{article.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#FF9933] text-[#FF9933]" />
                      {article.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#FF9933] text-sm group-hover:gap-2 transition-all">
                    Read Article
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 glass-white rounded-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-10 h-10 text-[#FF9933]" />
          </div>
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No bookmarks found
          </h3>
          <p className="text-[#64748B] mb-6">
            {selectedFilter === 'all' 
              ? 'Start exploring articles and bookmark them for quick access'
              : `No articles found in "${filters.find(f => f.id === selectedFilter)?.label}" category`}
          </p>
          <Link 
            to="/citizen/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all hover-lift"
          >
            Explore Articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Statistics */}
      {bookmarkedArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mx-auto mb-3">
              <Bookmark className="w-6 h-6 text-white fill-current" />
            </div>
            <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {bookmarkedArticles.length}
            </div>
            <div className="text-sm text-[#64748B]">Total Bookmarks</div>
          </div>

          <div className="glass-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {new Set(bookmarkedArticles.map(a => a.category)).size}
            </div>
            <div className="text-sm text-[#64748B]">Categories</div>
          </div>

          <div className="glass-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {(bookmarkedArticles.reduce((acc, a) => acc + a.rating, 0) / bookmarkedArticles.length).toFixed(1)}
            </div>
            <div className="text-sm text-[#64748B]">Avg. Rating</div>
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}