import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, User, Lock, Globe, Eye, Mail, Shield
} from 'lucide-react';

export default function LegalSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    advisoryRequests: true,
    contentUpdates: false,
    systemAlerts: true,
    profileVisibility: 'public',
    autoResponse: false,
  });
  const [pendingCount, setPendingCount] = useState(0);

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
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights' },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings', active: true },
  ];

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    // TODO: Save to Supabase
    // await supabase
    //   .from('user_settings')
    //   .upsert({ user_email: userEmail, ...settings });
    
    alert('Settings will be saved when database is connected');
  };

  const handleChangePassword = () => {
    alert('Password change feature will be available when authentication system is fully integrated');
  };

  const handleTwoFactorAuth = () => {
    alert('Two-factor authentication feature will be available when authentication system is fully integrated');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Settings" role="Legal Expert">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Account Settings
        </h1>
        <p className="text-[#64748B]">Manage your legal expert account preferences and settings</p>
      </div>

      <div className="space-y-6">
        {/* Notification Preferences */}
        <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#138808]/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-xl text-[#0A1F44] mb-1">Notification Preferences</h2>
              <p className="text-sm text-[#64748B]">Choose what notifications you want to receive</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-[#0A1F44]">Email Notifications</p>
                  <p className="text-sm text-[#64748B]">Receive email updates</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-[#0A1F44]">Advisory Request Alerts</p>
                  <p className="text-sm text-[#64748B]">Get notified about new legal queries</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('advisoryRequests')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.advisoryRequests ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.advisoryRequests ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <Edit className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-[#0A1F44]">Content Update Notifications</p>
                  <p className="text-sm text-[#64748B]">Updates on your published content</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('contentUpdates')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.contentUpdates ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.contentUpdates ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-[#0A1F44]">System Alerts</p>
                  <p className="text-sm text-[#64748B]">Important system announcements</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('systemAlerts')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.systemAlerts ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.systemAlerts ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#138808]/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-xl text-[#0A1F44] mb-1">Privacy & Visibility</h2>
              <p className="text-sm text-[#64748B]">Control who can see your profile and content</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#F8FAFC] rounded-lg">
              <p className="text-[#0A1F44] mb-3">Profile Visibility</p>
              <select
                value={settings.profileVisibility}
                onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="w-full px-4 py-2 bg-white border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              >
                <option value="public">Public - Visible to everyone</option>
                <option value="members">Members Only - Visible to registered users</option>
                <option value="private">Private - Hidden from search</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#64748B]" />
                <div>
                  <p className="text-[#0A1F44]">Auto-Response Mode</p>
                  <p className="text-sm text-[#64748B]">Automatically respond to simple queries</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('autoResponse')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoResponse ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoResponse ? 'translate-x-6' : ''
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#138808]/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#138808]" />
            </div>
            <div>
              <h2 className="text-xl text-[#0A1F44] mb-1">Security</h2>
              <p className="text-sm text-[#64748B]">Manage your account security settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleChangePassword}
              className="w-full p-4 bg-[#F8FAFC] rounded-lg text-left hover:bg-[#138808]/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#0A1F44] mb-1">Change Password</p>
                  <p className="text-sm text-[#64748B]">Update your account password</p>
                </div>
                <Lock className="w-5 h-5 text-[#64748B]" />
              </div>
            </button>

            <button
              onClick={handleTwoFactorAuth}
              className="w-full p-4 bg-[#F8FAFC] rounded-lg text-left hover:bg-[#138808]/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#0A1F44] mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-[#64748B]">Add an extra layer of security</p>
                </div>
                <Shield className="w-5 h-5 text-[#64748B]" />
              </div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4">
          <button className="px-6 py-3 bg-[#F8FAFC] text-[#64748B] rounded-lg hover:bg-[#138808]/10 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}