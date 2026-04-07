import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, CheckCircle, Eye, Edit2, Trash2, Search, Filter
} from 'lucide-react';

export default function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles', active: true },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this commentary?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
      alert('Commentary deleted successfully!');
    }
  };

  const handleEditArticle = (id) => {
    alert(`Edit functionality for commentary ${id} - would navigate to edit page`);
  };

  const handleViewArticle = (id) => {
    navigate(`/article/${id}`);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout navigationItems={navigationItems} title="My Articles" role="Educator">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Commentary
          </h2>
          <p className="text-[#64748B]">
            Manage and track all your educational content
          </p>
        </div>
        <button
          onClick={() => navigate('/educator/create')}
          className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          Create New Commentary
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="under review">Under Review</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {articles.length}
          </div>
          <div className="text-sm text-[#64748B]">Total Articles</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#138808] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {articles.filter(a => a.status === 'Published').length}
          </div>
          <div className="text-sm text-[#64748B]">Published</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#FF9933] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {articles.reduce((sum, article) => sum + (article.views || 0), 0)}
          </div>
          <div className="text-sm text-[#64748B]">Total Views</div>
        </motion.div>
      </div>

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-12 text-center"
        >
          <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {searchTerm || filterStatus !== 'all' ? 'No Commentary Found' : 'No Commentary Yet'}
          </h3>
          <p className="text-[#64748B] mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Start creating educational content to share your knowledge'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button
              onClick={() => navigate('/educator/create')}
              className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
            >
              Create Your First Commentary
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-white rounded-xl p-6 card-elevated hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {article.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                      article.status === 'Published' ? 'bg-green-100 text-green-700' :
                      article.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {article.status}
                    </span>
                    <span className="text-sm text-[#64748B]">{article.category}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views || 0} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.createdAt || Date.now()).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewArticle(article.id)}
                    className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    title="View Article"
                  >
                    <Eye className="w-5 h-5 text-[#64748B]" />
                  </button>
                  <button
                    onClick={() => handleEditArticle(article.id)}
                    className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    title="Edit Article"
                  >
                    <Edit2 className="w-5 h-5 text-[#0A1F44]" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}