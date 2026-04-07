import { motion } from 'motion/react';
import { useState } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, TrendingUp, Eye, Clock, Award, Upload
} from 'lucide-react';

export default function Analytics() {
  const { analytics, users, pendingContent } = useAdminData();
  const [selectedMetric, setSelectedMetric] = useState(null);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics', active: true },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleMetricClick = (metricType) => {
    setSelectedMetric(metricType);
  };

  const stats = [
    { 
      label: 'Total Page Views', 
      value: analytics.totalPageViews > 0 ? analytics.totalPageViews.toLocaleString() : '0', 
      change: '+0%', 
      trend: 'up', 
      icon: Eye,
      type: 'pageViews'
    },
    { 
      label: 'Active Users', 
      value: analytics.activeUsers > 0 ? analytics.activeUsers.toLocaleString() : '0', 
      change: '+0%', 
      trend: 'up', 
      icon: Users,
      type: 'activeUsers'
    },
    { 
      label: 'Quiz Completions', 
      value: analytics.quizCompletions > 0 ? analytics.quizCompletions.toLocaleString() : '0', 
      change: '+0%', 
      trend: 'up', 
      icon: Award,
      type: 'quizzes'
    },
    { 
      label: 'Avg. Session Time', 
      value: analytics.avgSessionTime || '0m 0s', 
      change: '+0%', 
      trend: 'up', 
      icon: Clock,
      type: 'sessionTime'
    },
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Analytics" role="Administrator">
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Platform Analytics
        </h2>
        <p className="text-[#64748B]">Track platform performance and user engagement metrics</p>
      </div>

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
              onClick={() => handleMetricClick(stat.type)}
              className={`glass-white rounded-xl p-6 cursor-pointer hover-lift transition-all ${selectedMetric === stat.type ? 'ring-2 ring-[#FF9933]' : ''}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-sm text-[#64748B]">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Metric Detail View */}
      {selectedMetric && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-white rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {selectedMetric === 'pageViews' && 'Page Views Breakdown'}
              {selectedMetric === 'activeUsers' && 'Active Users Details'}
              {selectedMetric === 'quizzes' && 'Quiz Completion Details'}
              {selectedMetric === 'sessionTime' && 'Session Time Analysis'}
            </h3>
            <button
              onClick={() => setSelectedMetric(null)}
              className="text-sm text-[#FF9933] hover:text-[#E87F1F] transition-colors"
            >
              Clear Selection
            </button>
          </div>
          <div className="text-center py-8">
            <BarChart3 className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">
              {selectedMetric === 'pageViews' && `Total page views: ${analytics.totalPageViews > 0 ? analytics.totalPageViews.toLocaleString() : '0'}`}
              {selectedMetric === 'activeUsers' && `Currently active users: ${analytics.activeUsers > 0 ? analytics.activeUsers.toLocaleString() : '0'}`}
              {selectedMetric === 'quizzes' && `Total quiz completions: ${analytics.quizCompletions > 0 ? analytics.quizCompletions.toLocaleString() : '0'}`}
              {selectedMetric === 'sessionTime' && `Average session duration: ${analytics.avgSessionTime || '0m 0s'}`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Top Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-white rounded-xl p-6"
      >
        <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Top Performing Articles
        </h3>
        {analytics.topArticles && analytics.topArticles.length > 0 ? (
          <div className="space-y-4">
            {analytics.topArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                    <span className="text-white text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-[#0A1F44] font-medium">{article.title}</p>
                    <p className="text-sm text-[#64748B]">{article.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#138808] font-medium">{article.engagement}</div>
                  <div className="text-xs text-[#64748B]">Engagement</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h4 className="text-lg text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Articles Yet
            </h4>
            <p className="text-[#64748B]">
              Article performance data will appear here once content is created and published
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}