import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, CheckCircle, Save, User, Lock, Mail
} from 'lucide-react';

export default function EducatorSettings() {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    institution: '',
    expertise: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    sessionReminders: true,
    studentMessages: true
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings', active: true },
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters!');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSavePreferences = () => {
    alert('Preferences saved successfully!');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Settings" role="Educator">
      <div className="space-y-6">
        {/* Account Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-[#0A1F44]" />
            <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Account Security
            </h2>
          </div>

          <div className="space-y-6">
            {/* Change Password Section */}
            <div>
              <h3 className="text-lg text-[#0A1F44] mb-4 font-medium">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleChangePassword}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="pt-6 border-t border-[#0A1F44]/10">
              <h3 className="text-lg text-[#0A1F44] mb-4 font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                <div>
                  <h4 className="text-[#0A1F44] font-medium mb-1">Enable 2FA</h4>
                  <p className="text-sm text-[#64748B]">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-colors text-sm">
                  Enable
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="pt-6 border-t border-[#0A1F44]/10">
              <h3 className="text-lg text-[#0A1F44] mb-4 font-medium">Active Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                  <div>
                    <h4 className="text-[#0A1F44] font-medium mb-1">Current Device</h4>
                    <p className="text-sm text-[#64748B]">Last active: Just now</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#0A1F44]" />
            <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#0A1F44]/10 rounded-lg">
              <div>
                <h3 className="text-[#0A1F44] font-medium mb-1">Email Notifications</h3>
                <p className="text-sm text-[#64748B]">Receive updates via email</p>
              </div>
              <button
                onClick={() => handlePreferenceToggle('emailNotifications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.emailNotifications ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#0A1F44]/10 rounded-lg">
              <div>
                <h3 className="text-[#0A1F44] font-medium mb-1">Session Reminders</h3>
                <p className="text-sm text-[#64748B]">Get reminded about upcoming sessions</p>
              </div>
              <button
                onClick={() => handlePreferenceToggle('sessionReminders')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.sessionReminders ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.sessionReminders ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#0A1F44]/10 rounded-lg">
              <div>
                <h3 className="text-[#0A1F44] font-medium mb-1">Student Messages</h3>
                <p className="text-sm text-[#64748B]">Notifications for student interactions</p>
              </div>
              <button
                onClick={() => handlePreferenceToggle('studentMessages')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preferences.studentMessages ? 'bg-[#138808]' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.studentMessages ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSavePreferences}
              className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}