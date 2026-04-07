import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, Activity, AlertCircle, CheckCircle, Info,
  Upload
} from 'lucide-react';

export default function SystemLogs() {
  const { pendingContent, systemLogs } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs', active: true },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const getLogIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Activity className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const getLogBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="System Logs" role="Administrator">
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          System Activity Logs
        </h2>
        <p className="text-[#64748B]">Monitor system activities, user actions, and security events</p>
      </div>

      {/* Logs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        {systemLogs.length === 0 ? (
          <div className="glass-white rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No System Logs
            </h3>
            <p className="text-[#64748B]">
              System activity will be logged here as users interact with the platform
            </p>
          </div>
        ) : (
          systemLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`glass-white rounded-lg p-4 border-l-4 ${getLogBg(log.type)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getLogIcon(log.type)}</div>
                <div className="flex-1">
                  <p className="text-[#0A1F44] mb-1">{log.message}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                    <span>{log.timestamp}</span>
                    {log.ip && <span>IP: {log.ip}</span>}
                    {log.user && <span>By: {log.user}</span>}
                    {log.role && <span>Role: {log.role}</span>}
                    {log.author && <span>Author: {log.author}</span>}
                    {log.authorRole && <span>Role: {log.authorRole}</span>}
                    {log.type && log.type !== log.message && <span>Type: {log.type}</span>}
                    {log.score && <span>Score: {log.score}</span>}
                    {log.size && <span>Size: {log.size}</span>}
                    {log.reportedBy && <span>{log.reportedBy}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </DashboardLayout>
  );
}