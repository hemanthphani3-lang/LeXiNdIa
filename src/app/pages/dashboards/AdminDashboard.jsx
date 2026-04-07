import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../components/DashboardLayout';
import { useAdminData } from '../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, TrendingUp, TrendingDown, Eye, CheckCircle, XCircle, Plus, Upload
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { users, pendingContent, totalApproved, analytics, addPendingContent, addUser } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin', active: true },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const stats = [
    { 
      label: 'Total Users', 
      value: users.length.toString(), 
      change: '+0%', 
      trend: 'up', 
      icon: Users,
      color: 'from-[#0A1F44] to-[#1A3A6B]',
      path: '/admin/manage-users'
    },
    { 
      label: 'Pending Approvals', 
      value: pendingContent.length.toString(), 
      change: '0%', 
      trend: 'down', 
      icon: FileCheck,
      color: 'from-[#FF9933] to-[#FFB366]',
      path: '/admin/content-approval'
    },
    { 
      label: 'Active Articles', 
      value: totalApproved.toString(), 
      change: '+0%', 
      trend: 'up', 
      icon: FileText,
      color: 'from-[#138808] to-[#1ea712]',
      path: '/admin/active-articles'
    },
    { 
      label: 'Total Views', 
      value: analytics.totalPageViews > 0 ? analytics.totalPageViews.toString() : '0', 
      change: '+0%', 
      trend: 'up', 
      icon: Eye,
      color: 'from-[#1A3A6B] to-[#0A1F44]',
      path: '/admin/analytics'
    },
  ];

  const recentUsers = users.slice(-4).reverse();
  const recentApprovals = pendingContent.slice(0, 3);

  return (
    <DashboardLayout navigationItems={navigationItems} title="Admin Dashboard" role="Administrator">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
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
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Users
            </h3>
            <button 
              onClick={() => navigate('/admin/manage-users')}
              className="text-[#FF9933] hover:text-[#E87F1F] transition-colors text-sm"
            >
              View All
            </button>
          </div>
          {users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
              <p className="text-[#64748B] text-sm">No users registered yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F3F9] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                      <span className="text-white text-sm">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-[#0A1F44]">{user.name}</p>
                      <p className="text-xs text-[#64748B]">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {user.status}
                    </span>
                    <p className="text-xs text-[#64748B] mt-1">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Pending Approvals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pending Approvals
            </h3>
            <span className="bg-[#FF9933] text-white text-xs px-2 py-1 rounded-full">
              {pendingContent.length}
            </span>
          </div>
          {pendingContent.length === 0 ? (
            <div className="text-center py-8">
              <FileCheck className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
              <p className="text-[#64748B] text-sm">No pending content to review.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentApprovals.map((item, index) => (
                <div key={index} className="p-4 border border-[#0A1F44]/10 rounded-lg hover:border-[#FF9933] transition-colors">
                  <h4 className="text-[#0A1F44] mb-2">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs text-[#64748B] mb-3">
                    <span>By {item.author}</span>
                    <span>{item.submittedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate('/admin/content-approval')}
                      className="flex-1 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 glass-white rounded-xl p-6 card-elevated"
      >
        <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover-lift transition-all text-left" onClick={() => navigate('/admin/manage-users')}>
            <Users className="w-6 h-6 mb-2" />
            <h4 className="mb-1">Manage Users</h4>
            <p className="text-xs text-white/70">View and manage all platform users</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#FF9933] to-[#FFB366] text-white rounded-lg hover-lift transition-all text-left" onClick={() => navigate('/admin/content-approval')}>
            <FileCheck className="w-6 h-6 mb-2" />
            <h4 className="mb-1">Review Content</h4>
            <p className="text-xs text-white/70">Approve or reject pending content</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#138808] to-[#1ea712] text-white rounded-lg hover-lift transition-all text-left" onClick={() => navigate('/admin/analytics')}>
            <BarChart3 className="w-6 h-6 mb-2" />
            <h4 className="mb-1">View Analytics</h4>
            <p className="text-xs text-white/70">Platform insights and statistics</p>
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}