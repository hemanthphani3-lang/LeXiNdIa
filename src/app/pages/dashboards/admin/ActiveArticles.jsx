import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, Eye, Calendar, User, Upload
} from 'lucide-react';

export default function ActiveArticles() {
  const { totalApproved, pendingContent } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles', active: true },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Active Articles" role="Administrator">
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Active Articles
        </h2>
        <p className="text-[#64748B]">All approved and published articles on the platform</p>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-white rounded-xl p-6 mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-4xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {totalApproved}
            </div>
            <p className="text-[#64748B]">Total Active Articles</p>
          </div>
        </div>
      </motion.div>

      {/* Articles List */}
      {totalApproved === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-white rounded-xl p-12 text-center"
        >
          <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No Active Articles
          </h3>
          <p className="text-[#64748B]">
            There are no approved articles yet. Articles will appear here once they are approved.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-white rounded-xl p-6"
          >
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
              <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {totalApproved} Article{totalApproved !== 1 ? 's' : ''} Approved
              </h3>
              <p className="text-[#64748B] mb-6">
                Articles have been approved and are active on the platform
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <Eye className="w-8 h-8 text-[#0A1F44] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B]">Published & Live</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <User className="w-8 h-8 text-[#0A1F44] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B]">Visible to Users</p>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <Calendar className="w-8 h-8 text-[#0A1F44] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B]">Content Active</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}