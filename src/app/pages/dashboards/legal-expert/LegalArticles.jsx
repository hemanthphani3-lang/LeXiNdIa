import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, CheckCircle, Eye, Edit2, Trash2, Search, Filter, Plus
} from 'lucide-react';

export default function LegalArticles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('all'); // 'all', 'published', 'views'
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch articles from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchArticles = async () => {
    //   const { data, error } = await supabase
    //     .from('articles')
    //     .select('*')
    //     .order('lastUpdated', { ascending: false });
    //   if (data) setArticles(data);
    // };
    // fetchArticles();
  }, []);

  // Fetch pending advisory count
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchPendingCount = async () => {
    //   const { count } = await supabase
    //     .from('advisory_requests')
    //     .select('*', { count: 'exact', head: true })
    //     .eq('status', 'pending');
    //   setPendingCount(count || 0);
    // };
    // fetchPendingCount();
  }, []);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/legal-expert' },
    { label: 'Update Articles', icon: Scale, path: '/legal-expert/articles', active: true },
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights' },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article update?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
      alert('Article update deleted successfully!');
    }
  };

  const handleEditArticle = (id) => {
    alert(`Edit functionality for article ${id} - would navigate to edit page`);
  };

  const handleViewArticle = (id) => {
    navigate(`/article/${id}`);
  };

  // Filter and sort logic
  let filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || article.status.toLowerCase().replace(' ', '-') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Apply sorting based on stat box clicks
  if (sortBy === 'published') {
    filteredArticles = filteredArticles.filter(a => a.status === 'Published');
  } else if (sortBy === 'views') {
    filteredArticles = [...filteredArticles].sort((a, b) => b.views - a.views);
  }

  return (
    <DashboardLayout navigationItems={navigationItems} title="Update Articles" role="Legal Expert">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Constitutional Articles
        </h1>
        <p className="text-[#64748B]">Update and maintain constitutional article interpretations</p>
      </div>

      {/* Stats Summary - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setSortBy('all')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'all' ? 'border-[#138808] bg-[#138808]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total Articles</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {articles.length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-[#138808]/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('published')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'published' ? 'border-green-500 bg-green-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Published</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {articles.filter(a => a.status === 'Published').length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('views')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'views' ? 'border-blue-500 bg-blue-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total Views</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {articles.reduce((sum, a) => sum + (a.views || 0), 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-10 h-10 text-[#138808]/30" />
          </div>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="glass-white rounded-xl p-6 mb-6 border border-[#138808]/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-12 pr-8 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="under-review">Under Review</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {sortBy !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Showing:</span>
          <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
            {sortBy === 'published' && 'Published Articles'}
            {sortBy === 'views' && 'Sorted by Views (High to Low)'}
          </span>
          <button
            onClick={() => setSortBy('all')}
            className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <FileText className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No articles found</h3>
          <p className="text-[#64748B] mb-6">
            {searchTerm || filterStatus !== 'all' || sortBy !== 'all'
              ? 'Try adjusting your search or filter criteria' 
              : 'Articles will appear here when database is connected'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 hover:shadow-lg transition-all border border-[#138808]/10 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-5 h-5 text-[#138808] mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg text-[#0A1F44] mb-1">{article.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {article.section}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()} views
                        </span>
                        <span>Updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      article.status === 'Published' 
                        ? 'bg-green-100 text-green-700' 
                        : article.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {article.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewArticle(article.id)}
                    className="p-2 text-[#138808] hover:bg-[#138808]/10 rounded-lg transition-all"
                    title="View Article"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEditArticle(article.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit Article"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Article"
                  >
                    <Trash2 className="w-5 h-5" />
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
