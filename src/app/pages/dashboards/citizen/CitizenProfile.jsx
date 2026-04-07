import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, User, Mail, Phone, MapPin, Calendar, Award, 
  BookOpen as BookIcon, Clock, TrendingUp
} from 'lucide-react';

export default function CitizenProfile() {
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check if user is a guest
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    setIsGuest(guestStatus);
  }, []);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Profile" role="Citizen">
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
          {isGuest ? 'Guest Profile' : 'My Profile'}
        </h1>
        <p className="text-[#64748B] text-lg">
          {isGuest ? 'Browsing as guest user' : 'View and manage your profile information'}
        </p>
      </motion.div>

      {isGuest ? (
        /* Guest User Message */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 glass-white rounded-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-[#FF9933]" />
          </div>
          <h3 className="text-2xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Guest User
          </h3>
          <p className="text-[#64748B] mb-6 max-w-md mx-auto">
            You are currently browsing as a guest. Create an account to access your profile, save bookmarks, and track your learning progress.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/auth/citizen/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all hover-lift"
            >
              Create Account
            </a>
            <a
              href="/auth/citizen/login"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0A1F44] text-[#0A1F44] rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all"
            >
              Sign In
            </a>
          </div>
        </motion.div>
      ) : (
        /* Profile Content - Empty State for Backend Integration */
        <div className="space-y-6">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-white rounded-xl p-8 card-elevated"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Picture Placeholder */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-[#FF9933]">
                  <div className="w-3 h-3 bg-[#138808] rounded-full"></div>
                </div>
              </div>

              {/* Profile Info Placeholder */}
              <div className="flex-1 text-center md:text-left">
                <div className="h-8 w-48 bg-[#F1F5F9] rounded-lg mb-3 mx-auto md:mx-0"></div>
                <div className="h-5 w-64 bg-[#F1F5F9] rounded-lg mb-4 mx-auto md:mx-0"></div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#64748B]" />
                    <div className="h-4 w-40 bg-[#F1F5F9] rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <div className="h-4 w-32 bg-[#F1F5F9] rounded"></div>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button className="px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all opacity-50 cursor-not-allowed" disabled>
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="glass-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center mx-auto mb-3">
                <BookIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                --
              </div>
              <div className="text-sm text-[#64748B]">Articles Read</div>
            </div>

            <div className="glass-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                --
              </div>
              <div className="text-sm text-[#64748B]">Bookmarks</div>
            </div>

            <div className="glass-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                --
              </div>
              <div className="text-sm text-[#64748B]">Quiz Score</div>
            </div>

            <div className="glass-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1A3A6B] to-[#2A4A7B] flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                --
              </div>
              <div className="text-sm text-[#64748B]">Hours Spent</div>
            </div>
          </motion.div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-white rounded-xl p-6 card-elevated"
            >
              <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Personal Information
              </h3>
              <div className="space-y-4">
                {[
                  { icon: User, label: 'Full Name' },
                  { icon: Mail, label: 'Email Address' },
                  { icon: Phone, label: 'Phone Number' },
                  { icon: MapPin, label: 'Location' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#64748B]" />
                    <div className="flex-1">
                      <div className="text-xs text-[#64748B] mb-1">{item.label}</div>
                      <div className="h-5 w-full bg-[#F1F5F9] rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-white rounded-xl p-6 card-elevated"
            >
              <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Learning Progress
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Fundamental Rights', progress: 0 },
                  { label: 'Fundamental Duties', progress: 0 },
                  { label: 'Directive Principles', progress: 0 },
                  { label: 'Union Government', progress: 0 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#64748B]">{item.label}</span>
                      <span className="text-sm text-[#0A1F44]">--</span>
                    </div>
                    <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF9933] to-[#FFB366]"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Backend Integration Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#0A1F44]/5 border border-[#0A1F44]/10 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#0A1F44]/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#0A1F44]" />
              </div>
              <div>
                <h4 className="text-lg text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Profile Data Integration
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Your profile data will be automatically populated once the backend system is connected. 
                  All your learning progress, bookmarks, quiz scores, and personal information will be 
                  securely stored and displayed here.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
