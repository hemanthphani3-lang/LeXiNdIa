import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, MessageSquare, 
  Award, Settings, Bell, Search, Bookmark, TrendingUp, Star
} from 'lucide-react';
import { fundamentalRightsArticles } from '../../data/constitutionalData';

export default function CitizenDashboard() {
  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen', active: true },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  // Get featured articles from real data
  const featuredArticles = [
    fundamentalRightsArticles.find(a => a.number === 21),
    fundamentalRightsArticles.find(a => a.number === 14),
    fundamentalRightsArticles.find(a => a.number === 19)
  ].map(article => ({
    id: article.number,
    title: `Article ${article.number}: ${article.title}`,
    category: article.category,
    views: '2.3K',
    rating: 4.8,
    description: article.explanation.substring(0, 100) + '...'
  }));

  const fundamentalRights = [
    { title: 'Right to Equality', articles: 'Articles 14-18', icon: Scale, category: 'equality' },
    { title: 'Right to Freedom', articles: 'Articles 19-22', icon: BookOpen, category: 'freedom' },
    { title: 'Right Against Exploitation', articles: 'Articles 23-24', icon: Heart, category: 'exploitation' },
    { title: 'Right to Freedom of Religion', articles: 'Articles 25-28', icon: Star, category: 'religion' },
  ];

  // Real activity data will be tracked when user performs actions
  const recentActivities = [];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Citizen Dashboard" role="Citizen">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-8 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] rounded-2xl text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome to Constitutional Knowledge Hub
          </h2>
          <p className="text-white/80 mb-6">
            Explore the Indian Constitution, understand your rights and duties, and become an informed citizen
          </p>
          <div className="flex gap-4">
            <Link 
              to="/citizen/explore"
              className="px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all hover-lift"
            >
              Start Exploring
            </Link>
            <Link 
              to="/citizen/quiz/1"
              className="px-6 py-3 bg-white/10 backdrop-blur text-white rounded-lg hover:bg-white/20 transition-all"
            >
              Take a Quiz
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Fundamental Rights Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Fundamental Rights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fundamentalRights.map((right, index) => {
            const Icon = right.icon;
            return (
              <Link to={`/citizen/rights/${right.category}`} key={right.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-[#0A1F44] mb-2">{right.title}</h4>
                  <p className="text-xs text-[#64748B]">{right.articles}</p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Featured Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured Articles
          </h3>
          <Link 
            to="/citizen/articles"
            className="text-[#FF9933] hover:text-[#E87F1F] transition-colors text-sm"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <Link to={`/citizen/article/${article.id}`}>
                <div className="glass-white rounded-xl p-6 hover-lift card-elevated h-full group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs">
                      {article.category}
                    </span>
                    <button className="text-[#64748B] hover:text-[#FF9933] transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                  <h4 className="text-[#0A1F44] mb-3 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {article.title}
                  </h4>
                  <p className="text-sm text-[#64748B] mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FF9933] text-[#FF9933]" />
                        {article.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 glass-white rounded-xl p-6 card-elevated"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Recent Activity
          </h3>
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#F8FAFC] rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'bookmark' ? 'bg-[#FF9933]/10' :
                    activity.type === 'quiz' ? 'bg-[#138808]/10' :
                    'bg-[#0A1F44]/10'
                  }`}>
                    {activity.type === 'bookmark' && <Bookmark className="w-5 h-5 text-[#FF9933]" />}
                    {activity.type === 'quiz' && <Award className="w-5 h-5 text-[#138808]" />}
                    {activity.type === 'forum' && <MessageSquare className="w-5 h-5 text-[#0A1F44]" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[#0A1F44] mb-1">{activity.text}</p>
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span>{activity.time}</span>
                      {activity.score && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          Score: {activity.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-[#64748B]" />
              </div>
              <h4 className="text-[#0A1F44] mb-2">No Recent Activity</h4>
              <p className="text-sm text-[#64748B] mb-4">
                Start exploring the Constitution to see your activity here
              </p>
              <Link
                to="/citizen/explore"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all"
              >
                Explore Now
              </Link>
            </div>
          )}
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Progress
          </h3>
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-[#64748B]" />
            </div>
            <h4 className="text-[#0A1F44] mb-2">Start Your Journey</h4>
            <p className="text-sm text-[#64748B] mb-6">
              Begin exploring articles and taking quizzes to track your progress
            </p>
            <div className="space-y-3">
              <Link
                to="/citizen/explore"
                className="block px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all text-sm"
              >
                Explore Articles
              </Link>
              <Link
                to="/citizen/quiz/1"
                className="block px-4 py-2 bg-[#0A1F44]/10 text-[#0A1F44] rounded-lg hover:bg-[#0A1F44]/20 transition-all text-sm"
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
