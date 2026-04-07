import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, User, Lock, Globe, Eye, Mail, Shield, ChevronRight, Check
} from 'lucide-react';

export default function CitizenSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    quizReminders: true,
    articleUpdates: false,
    discussionReplies: true,
    language: 'english',
    fontSize: 'medium',
    theme: 'light'
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings', active: true },
  ];

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Settings" role="Citizen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 
          className="text-3xl md:text-4xl text-[#0A1F44] mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Settings
        </h1>
        <p className="text-[#64748B] text-lg">
          Manage your account preferences and settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-white rounded-xl p-6 space-y-2 sticky top-8">
            {[
              { id: 'account', label: 'Account', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy', icon: Lock },
              { id: 'preferences', label: 'Preferences', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#64748B] hover:bg-[#FF9933]/10 hover:text-[#FF9933] transition-all text-left"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Account Information */}
          <div className="glass-white rounded-xl p-6 card-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Account Information
                </h2>
                <p className="text-sm text-[#64748B]">Manage your account details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Email Address</label>
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                  <Mail className="w-5 h-5 text-[#64748B]" />
                  <span className="text-[#0A1F44]">citizen@lexindia.gov.in</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Role</label>
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                  <Shield className="w-5 h-5 text-[#64748B]" />
                  <span className="text-[#0A1F44]">Citizen</span>
                </div>
              </div>

              <button className="w-full px-4 py-3 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-all">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="glass-white rounded-xl p-6 card-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Notification Preferences
                </h2>
                <p className="text-sm text-[#64748B]">Choose what notifications you receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                { key: 'quizReminders', label: 'Quiz Reminders', description: 'Get reminded about pending quizzes' },
                { key: 'articleUpdates', label: 'Article Updates', description: 'Notify about new articles and updates' },
                { key: 'discussionReplies', label: 'Discussion Replies', description: 'Get notified about forum replies' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg">
                  <div>
                    <div className="text-[#0A1F44] font-medium">{item.label}</div>
                    <div className="text-sm text-[#64748B]">{item.description}</div>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      settings[item.key] ? 'bg-[#138808]' : 'bg-[#CBD5E1]'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        settings[item.key] ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Display Preferences */}
          <div className="glass-white rounded-xl p-6 card-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Display Preferences
                </h2>
                <p className="text-sm text-[#64748B]">Customize your viewing experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-3">Language</label>
                <div className="grid grid-cols-2 gap-3">
                  {['English', 'Hindi'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleChange('language', lang.toLowerCase())}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        settings.language === lang.toLowerCase()
                          ? 'border-[#FF9933] bg-[#FF9933]/10 text-[#FF9933]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FF9933]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lang}</span>
                        {settings.language === lang.toLowerCase() && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-3">Font Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleChange('fontSize', size.toLowerCase())}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        settings.fontSize === size.toLowerCase()
                          ? 'border-[#FF9933] bg-[#FF9933]/10 text-[#FF9933]'
                          : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FF9933]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{size}</span>
                        {settings.fontSize === size.toLowerCase() && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="glass-white rounded-xl p-6 card-elevated">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1A3A6B] to-[#2A4A7B] flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Privacy & Security
                </h2>
                <p className="text-sm text-[#64748B]">Manage your privacy settings</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#FF9933]/10 transition-all text-left group">
                <span className="text-[#0A1F44] group-hover:text-[#FF9933]">View Privacy Policy</span>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FF9933]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#FF9933]/10 transition-all text-left group">
                <span className="text-[#0A1F44] group-hover:text-[#FF9933]">View Terms of Service</span>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FF9933]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg hover:bg-[#FF9933]/10 transition-all text-left group">
                <span className="text-[#0A1F44] group-hover:text-[#FF9933]">Download My Data</span>
                <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-[#FF9933]" />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end gap-4">
            <button className="px-6 py-3 bg-white border border-[#E2E8F0] text-[#64748B] rounded-lg hover:border-[#FF9933] hover:text-[#FF9933] transition-all">
              Cancel
            </button>
            <button className="px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all flex items-center gap-2">
              <Check className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
