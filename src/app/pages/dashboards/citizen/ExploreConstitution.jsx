import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Search, Bookmark, ChevronRight, FileText, Star, TrendingUp, Landmark
} from 'lucide-react';

export default function ExploreConstitution() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore', active: true },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const constitutionSections = [
    {
      id: 1,
      title: 'Fundamental Rights',
      description: 'Articles 14-32 - Basic human rights guaranteed to all citizens',
      articles: '19 Articles',
      icon: Scale,
      color: 'from-[#FF9933] to-[#FFB366]',
      path: '/citizen/rights'
    },
    {
      id: 2,
      title: 'Fundamental Duties',
      description: 'Article 51A - Moral obligations of all citizens',
      articles: '11 Duties',
      icon: Heart,
      color: 'from-[#0A1F44] to-[#1A3A6B]',
      path: '/citizen/duties'
    },
    {
      id: 3,
      title: 'Directive Principles',
      description: 'Articles 36-51 - Guidelines for governance',
      articles: '16 Articles',
      icon: FileText,
      color: 'from-[#138808] to-[#1ea712]',
      path: '/citizen/directive-principles'
    },
    {
      id: 4,
      title: 'Union Government',
      description: 'Articles 52-151 - Structure and powers of central government',
      articles: '100 Articles',
      icon: BookOpen,
      color: 'from-[#1A3A6B] to-[#0A1F44]',
      path: '/citizen/union-government'
    }
  ];

  const popularArticles = [
    {
      id: 1,
      number: 21,
      title: 'Right to Life and Personal Liberty',
      category: 'Fundamental Rights',
      views: '2.3K',
      bookmarks: 456,
      rating: 4.8,
      description: 'Protection of life and personal liberty',
      categoryPath: 'freedom'
    },
    {
      id: 2,
      number: 14,
      title: 'Equality Before Law',
      category: 'Fundamental Rights',
      views: '1.8K',
      bookmarks: 389,
      rating: 4.7,
      description: 'Equal protection under law',
      categoryPath: 'equality'
    },
    {
      id: 3,
      number: 19,
      title: 'Freedom of Speech and Expression',
      category: 'Fundamental Rights',
      views: '2.1K',
      bookmarks: 512,
      rating: 4.9,
      description: 'Six fundamental freedoms',
      categoryPath: 'freedom'
    },
    {
      id: 4,
      number: 32,
      title: 'Constitutional Remedies',
      category: 'Fundamental Rights',
      views: '1.5K',
      bookmarks: 298,
      rating: 4.6,
      description: 'Right to move Supreme Court',
      categoryPath: 'freedom'
    },
    {
      id: 5,
      number: 15,
      title: 'Prohibition of Discrimination',
      category: 'Fundamental Rights',
      views: '1.7K',
      bookmarks: 367,
      rating: 4.8,
      description: 'No discrimination on various grounds',
      categoryPath: 'equality'
    },
    {
      id: 6,
      number: 25,
      title: 'Freedom of Religion',
      category: 'Fundamental Rights',
      views: '1.4K',
      bookmarks: 278,
      rating: 4.5,
      description: 'Freedom of conscience and religion',
      categoryPath: 'religion'
    }
  ];

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.number.toString().includes(searchQuery) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout navigationItems={navigationItems} title="Explore Constitution" role="Citizen">
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
              Explore the Constitution
            </h1>
            <p className="text-[#64748B] text-lg">
              Discover and learn about the Indian Constitution
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search articles, rights, duties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#0A1F44]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </motion.div>

      {/* Constitution Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Constitution Sections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/citizen/rights">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Fundamental Rights
              </h4>
              <p className="text-sm text-[#64748B] mb-4">
                Articles 12-35
              </p>
              <div className="flex items-center gap-2 text-[#FF9933] text-sm">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link to="/citizen/duties">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1DB010] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#138808] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Fundamental Duties
              </h4>
              <p className="text-sm text-[#64748B] mb-4">
                Article 51A
              </p>
              <div className="flex items-center gap-2 text-[#138808] text-sm">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link to="/citizen/directive-principles">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#0A1F44]/70 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Directive Principles
              </h4>
              <p className="text-sm text-[#64748B] mb-4">
                Articles 36-51
              </p>
              <div className="flex items-center gap-2 text-[#0A1F44] text-sm">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          <Link to="/citizen/union-government">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mb-4">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Union Government
              </h4>
              <p className="text-sm text-[#64748B] mb-4">
                Articles 52-151
              </p>
              <div className="flex items-center gap-2 text-[#FF9933] text-sm">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Popular Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          {searchQuery ? 'Search Results' : 'Popular Articles'}
        </h2>
        
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Link to={`/citizen/rights/${article.categoryPath}`} key={article.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="glass-white rounded-xl p-6 hover-lift card-elevated group h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                        <span className="text-white text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {article.number}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs">
                        {article.category}
                      </span>
                    </div>
                    <button className="text-[#64748B] hover:text-[#FF9933] transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Article {article.number}: {article.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-4">{article.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        {article.bookmarks}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#FF9933] text-[#FF9933]" />
                      {article.rating}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-white rounded-xl">
            <Search className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">No articles found matching "{searchQuery}"</p>
          </div>
        )}
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="p-6 bg-gradient-to-br from-[#FF9933]/10 to-[#FFB366]/10 rounded-xl border border-[#FF9933]/20">
          <h3 className="text-lg text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Test Your Knowledge
          </h3>
          <p className="text-sm text-[#64748B] mb-4">
            Take quizzes to reinforce your understanding of the Constitution
          </p>
          <Link 
            to="/citizen/quiz/1"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all"
          >
            Start Quiz
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-6 bg-gradient-to-br from-[#0A1F44]/10 to-[#1A3A6B]/10 rounded-xl border border-[#0A1F44]/20">
          <h3 className="text-lg text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            View Your Bookmarks
          </h3>
          <p className="text-sm text-[#64748B] mb-4">
            Access your saved articles and continue learning
          </p>
          <Link 
            to="/citizen/bookmarks"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all"
          >
            View Bookmarks
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}