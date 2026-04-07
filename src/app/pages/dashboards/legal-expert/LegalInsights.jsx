import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, Plus, Calendar, TrendingUp, Share2
} from 'lucide-react';

export default function LegalInsights() {
  const [insights, setInsights] = useState([]);
  const [sortBy, setSortBy] = useState('all'); // 'all', 'views', 'shares', 'month'
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  // Fetch insights from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchInsights = async () => {
    //   const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    //   const { data, error } = await supabase
    //     .from('legal_insights')
    //     .select('*')
    //     .eq('author_email', userEmail)
    //     .order('date', { ascending: false });
    //   if (data) setInsights(data);
    // };
    // fetchInsights();
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
    { label: 'Update Articles', icon: Scale, path: '/legal-expert/articles' },
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights', active: true },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  // Sort insights based on selected criteria
  let displayedInsights = [...insights];
  if (sortBy === 'views') {
    displayedInsights.sort((a, b) => b.views - a.views);
  } else if (sortBy === 'shares') {
    displayedInsights.sort((a, b) => b.shares - a.shares);
  } else if (sortBy === 'month') {
    displayedInsights = displayedInsights.filter(i => 
      new Date(i.date).getMonth() === new Date().getMonth() &&
      new Date(i.date).getFullYear() === new Date().getFullYear()
    );
  }

  return (
    <DashboardLayout navigationItems={navigationItems} title="Legal Insights" role="Legal Expert">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Legal Insights & Analysis
          </h1>
          <p className="text-[#64748B]">Share your expert analysis and legal perspectives</p>
        </div>
        <button 
          onClick={() => navigate('/legal-expert/insights/publish')}
          className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Publish New Insight
        </button>
      </div>

      {/* Stats Cards - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setSortBy('all')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'all' ? 'border-[#138808] bg-[#138808]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#64748B]">Total Insights</p>
            <BookOpen className="w-5 h-5 text-[#138808]" />
          </div>
          <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {insights.length}
          </p>
        </button>
        <button
          onClick={() => setSortBy('views')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'views' ? 'border-blue-500 bg-blue-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#64748B]">Total Views</p>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {insights.reduce((sum, i) => sum + (i.views || 0), 0).toLocaleString()}
          </p>
        </button>
        <button
          onClick={() => setSortBy('shares')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'shares' ? 'border-green-500 bg-green-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#64748B]">Total Shares</p>
            <Share2 className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {insights.reduce((sum, i) => sum + (i.shares || 0), 0).toLocaleString()}
          </p>
        </button>
        <button
          onClick={() => setSortBy('month')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'month' ? 'border-[#FF9933] bg-[#FF9933]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#64748B]">This Month</p>
            <Calendar className="w-5 h-5 text-[#FF9933]" />
          </div>
          <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {insights.filter(i => {
              const insightDate = new Date(i.date);
              const now = new Date();
              return insightDate.getMonth() === now.getMonth() && 
                     insightDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </button>
      </div>

      {/* Active Filter Indicator */}
      {sortBy !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Showing:</span>
          <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
            {sortBy === 'views' && 'Sorted by Views (High to Low)'}
            {sortBy === 'shares' && 'Sorted by Shares (High to Low)'}
            {sortBy === 'month' && 'This Month\'s Insights'}
          </span>
          <button
            onClick={() => setSortBy('all')}
            className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Insights List */}
      {displayedInsights.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <BookOpen className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No insights found</h3>
          <p className="text-[#64748B] mb-6">
            {sortBy === 'month' && insights.length > 0
              ? 'No insights published this month'
              : 'Insights will appear here when database is connected'}
          </p>
          <button 
            onClick={() => navigate('/legal-expert/insights/publish')}
            className="px-8 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Insight
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 hover:shadow-lg transition-all border border-[#138808]/10 group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#138808] transition-colors">
                        {insight.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                        <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full">
                          {insight.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(insight.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {insight.views.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#64748B]">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {insight.shares}
                    </p>
                    <p className="text-xs text-[#64748B]">Shares</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
