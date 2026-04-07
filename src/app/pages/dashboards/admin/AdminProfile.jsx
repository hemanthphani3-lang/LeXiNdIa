import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, User, Mail, Calendar, Shield, Edit, Upload
} from 'lucide-react';

export default function AdminProfile() {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem('userEmail') || 'admin@lexindia.gov.in';
  const userName = 'Administrator';

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="My Profile" role="Administrator">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-white rounded-xl p-8 card-elevated mb-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {userName}
                </h2>
                <div className="flex items-center gap-2 text-[#64748B] mb-2">
                  <Mail className="w-4 h-4" />
                  <span>{userEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white text-sm rounded-full flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    System Administrator
                  </span>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-white rounded-xl p-8 card-elevated mb-6"
        >
          <h3 className="text-2xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Account Information
          </h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Full Name</label>
                <div className="px-4 py-3 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg">
                  <p className="text-[#0A1F44]">{userName}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Email Address</label>
                <div className="px-4 py-3 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg">
                  <p className="text-[#0A1F44]">{userEmail}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Role</label>
                <div className="px-4 py-3 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg">
                  <p className="text-[#0A1F44]">System Administrator</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#64748B] mb-2 block">Account Status</label>
                <div className="px-4 py-3 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg">
                  <p className="text-green-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Access & Permissions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-white rounded-xl p-8 card-elevated"
        >
          <h3 className="text-2xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Access & Permissions
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#0A1F44] font-medium">User Management</p>
                  <p className="text-xs text-[#64748B]">Full access to user operations</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Enabled</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#0A1F44] font-medium">Content Moderation</p>
                  <p className="text-xs text-[#64748B]">Approve or reject content</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Enabled</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#0A1F44] font-medium">Analytics & Reports</p>
                  <p className="text-xs text-[#64748B]">View platform analytics</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Enabled</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1A3A6B] to-[#0A1F44] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[#0A1F44] font-medium">System Configuration</p>
                  <p className="text-xs text-[#64748B]">Manage system settings</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Enabled</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}