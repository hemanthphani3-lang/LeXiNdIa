import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, Globe, Bell, Lock, Database, Mail, Shield, Upload
} from 'lucide-react';

export default function AdminSettings() {
  const { pendingContent } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings', active: true },
  ];

  const settingsSections = [
    {
      title: 'General Settings',
      icon: Globe,
      settings: [
        { label: 'Platform Name', value: 'LexIndia', type: 'text' },
        { label: 'Platform Description', value: 'Constitutional Knowledge Platform', type: 'text' },
        { label: 'Maintenance Mode', value: false, type: 'toggle' },
        { label: 'Allow User Registration', value: true, type: 'toggle' },
      ]
    },
    {
      title: 'Notification Settings',
      icon: Bell,
      settings: [
        { label: 'Email Notifications', value: true, type: 'toggle' },
        { label: 'Push Notifications', value: true, type: 'toggle' },
        { label: 'New User Alerts', value: true, type: 'toggle' },
        { label: 'Content Approval Alerts', value: true, type: 'toggle' },
      ]
    },
    {
      title: 'Security Settings',
      icon: Lock,
      settings: [
        { label: 'Two-Factor Authentication', value: true, type: 'toggle' },
        { label: 'Password Expiry (days)', value: '90', type: 'number' },
        { label: 'Max Login Attempts', value: '5', type: 'number' },
        { label: 'Session Timeout (minutes)', value: '30', type: 'number' },
      ]
    },
    {
      title: 'Email Configuration',
      icon: Mail,
      settings: [
        { label: 'SMTP Server', value: 'smtp.lexindia.com', type: 'text' },
        { label: 'SMTP Port', value: '587', type: 'number' },
        { label: 'From Email', value: 'noreply@lexindia.com', type: 'text' },
        { label: 'Email Signature', value: 'LexIndia Team', type: 'text' },
      ]
    },
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Settings" role="Administrator">
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          System Settings
        </h2>
        <p className="text-[#64748B]">Configure platform settings and preferences</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 card-elevated"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {section.title}
                </h3>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                    <label className="text-[#0A1F44]">{setting.label}</label>
                    {setting.type === 'toggle' ? (
                      <button
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          setting.value ? 'bg-[#138808]' : 'bg-[#64748B]'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                            setting.value ? 'translate-x-7' : ''
                          }`}
                        />
                      </button>
                    ) : (
                      <input
                        type={setting.type}
                        defaultValue={setting.value}
                        className="px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-end gap-4"
        >
          <button className="px-8 py-3 bg-white border border-[#0A1F44]/10 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-all">
            Cancel
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Save Settings
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}