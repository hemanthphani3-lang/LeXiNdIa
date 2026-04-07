import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, MessageCircle, 
  AlertCircle, Settings, Bell, Plus, Edit, CheckCircle
} from 'lucide-react';
import { supabase } from '../../utils/supabase';

export default function LegalExpertDashboard() {
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [insightsCount, setInsightsCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Fetch stats from Supabase
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch pending advisory count
        const { count: advisoryCount, error: advisoryError } = await supabase
          .from('advisory_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        
        if (!advisoryError) setPendingCount(advisoryCount || 0);

        // Fetch articles count
        const { count: artCount, error: artError } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true });
        
        if (!artError) setArticlesCount(artCount || 0);

        // Fetch insights count
        const { count: insCount, error: insError } = await supabase
          .from('legal_insights')
          .select('*', { count: 'exact', head: true });
        
        if (!insError) setInsightsCount(insCount || 0);

        // Fetch cases count
        const { count: csCount, error: csError } = await supabase
          .from('case_references')
          .select('*', { count: 'exact', head: true });
        
        if (!csError) setCasesCount(csCount || 0);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  
  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/legal-expert', active: true },
    { label: 'Update Articles', icon: Scale, path: '/legal-expert/articles' },
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights' },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const stats = [
    { 
      label: 'Articles Updated', 
      value: articlesCount.toString(), 
      icon: Scale,
      color: 'from-[#0A1F44] to-[#1A3A6B]',
      path: '/legal-expert/articles'
    },
    { 
      label: 'Legal Insights', 
      value: insightsCount.toString(), 
      icon: BookOpen,
      color: 'from-[#FF9933] to-[#FFB366]',
      path: '/legal-expert/insights'
    },
    { 
      label: 'Case References', 
      value: casesCount.toString(), 
      icon: FileText,
      color: 'from-[#138808] to-[#1ea712]',
      path: '/legal-expert/cases'
    },
    { 
      label: 'Advisory Requests', 
      value: pendingCount.toString(), 
      icon: MessageCircle,
      color: 'from-[#1A3A6B] to-[#0A1F44]',
      path: '/legal-expert/advisory'
    },
  ];

  // Empty arrays - will be populated when backend is connected
  const recentUpdates = [];
  const advisoryRequests = [];
  const recentAmendments = [];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Legal Expert Dashboard" role="Legal Expert">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate(stat.path)}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </h3>
              <p className="text-sm text-[#64748B]">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/legal-expert/insights')}
            className="p-4 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Add Legal Insight</h4>
            <p className="text-xs text-white/70">Share expert legal analysis</p>
          </button>
          <button 
            onClick={() => navigate('/legal-expert/articles')}
            className="p-4 bg-gradient-to-br from-[#FF9933] to-[#FFB366] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <Edit className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Update Article</h4>
            <p className="text-xs text-white/70">Modify constitutional content</p>
          </button>
          <button 
            onClick={() => navigate('/legal-expert/cases')}
            className="p-4 bg-gradient-to-br from-[#138808] to-[#1ea712] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <FileText className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Add Case Reference</h4>
            <p className="text-xs text-white/70">Link landmark judgments</p>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Updates */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Updates
            </h3>
            <button className="text-[#FF9933] hover:text-[#E87F1F] transition-colors text-sm">
              View All
            </button>
          </div>
          {recentUpdates.length === 0 ? (
            <div className="p-8 text-center">
              <Scale className="w-12 h-12 text-[#0A1F44]/20 mx-auto mb-3" />
              <p className="text-[#64748B] text-sm">No recent updates yet</p>
              <p className="text-[#64748B] text-xs mt-1">Updates will appear here when you modify articles</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="p-4 border border-[#0A1F44]/10 rounded-lg hover:border-[#FF9933] transition-all">
                  <h4 className="text-[#0A1F44] mb-2">{update.article}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#F8FAFC] text-[#64748B] rounded">
                        {update.type}
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        update.status === 'Published' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {update.status}
                      </span>
                    </div>
                    <span className="text-[#64748B]">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Advisory Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Advisory Requests
            </h3>
            <span className="bg-[#FF9933] text-white text-xs px-2 py-1 rounded-full">
              {advisoryRequests.filter(r => r.urgent).length} Urgent
            </span>
          </div>
          {advisoryRequests.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-[#0A1F44]/20 mx-auto mb-3" />
              <p className="text-[#64748B] text-sm">No advisory requests yet</p>
              <p className="text-[#64748B] text-xs mt-1">Requests from users will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {advisoryRequests.map((request, index) => (
                <div key={index} className={`p-4 border rounded-lg transition-all ${
                  request.urgent 
                    ? 'border-[#FF9933] bg-[#FF9933]/5' 
                    : 'border-[#0A1F44]/10 hover:border-[#FF9933]'
                }`}>
                  {request.urgent && (
                    <div className="flex items-center gap-1 text-[#FF9933] text-xs mb-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>Urgent</span>
                    </div>
                  )}
                  <h4 className="text-[#0A1F44] mb-2">{request.question}</h4>
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-3">
                    <span>By {request.askedBy}</span>
                    <span>{request.category}</span>
                  </div>
                  <button className="w-full py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-colors text-sm">
                    Respond
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Amendments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 glass-white rounded-xl p-6 card-elevated"
      >
        <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Recent Constitutional Amendments
        </h3>
        {recentAmendments.length === 0 ? (
          <div className="p-8 text-center">
            <Edit className="w-12 h-12 text-[#0A1F44]/20 mx-auto mb-3" />
            <p className="text-[#64748B] text-sm">No amendments data yet</p>
            <p className="text-[#64748B] text-xs mt-1">Constitutional amendments will appear here when available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAmendments.map((amendment, index) => (
              <div key={index} className="p-4 border border-[#0A1F44]/10 rounded-lg hover:border-[#FF9933] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                    <span className="text-white text-sm">{amendment.number.replace(/[^\d]/g, '')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#0A1F44] text-sm">{amendment.number}</h4>
                    <p className="text-xs text-[#64748B]">{amendment.topic}</p>
                  </div>
                </div>
                <p className="text-xs text-[#64748B]">{amendment.title}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}