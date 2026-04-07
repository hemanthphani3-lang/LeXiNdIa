import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { 
  Shield, Bell, Menu, X, LogOut, User, 
  ChevronDown
} from 'lucide-react';
import SearchBar from './SearchBar';

export default function DashboardLayout({ children, navigationItems, title, role }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  
  const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || 'user@lexindia.gov.in';
  const userName = role === 'Administrator' ? 'Administrator' : 'User';

  const handleLogout = () => {
    // Clear authentication state from both localStorage and sessionStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userEmail');
    navigate('/');
  };
  
  const handleProfileClick = () => {
    setProfileMenuOpen(false);
    // Navigate to profile page based on role
    if (role === 'Administrator') {
      navigate('/admin/profile');
    } else if (role === 'Educator') {
      navigate('/educator/profile');
    } else if (role === 'Legal Expert') {
      navigate('/legal-expert/profile');
    } else if (role === 'Citizen') {
      navigate('/citizen/profile');
    }
  };

  // Map role display names to role keys for SearchBar
  const roleKeyMap = {
    'Administrator': 'admin',
    'Educator': 'educator',
    'Legal Expert': 'legal-expert',
    'Citizen': 'citizen',
  };
  const roleKey = roleKeyMap[role] || 'citizen';

  // Notifications - empty by default
  const notifications = [];

  return (
    <div className="min-h-screen bg-[#F8F9FA] ashoka-pattern">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#0A1F44] to-[#051229] text-white z-50 overflow-y-auto"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#0A1F44] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    LexIndia
                  </h1>
                  <p className="text-xs text-white/60">Constitution Platform</p>
                </div>
              </Link>
            </div>

            {/* Role Badge */}
            <div className="px-6 py-4">
              <div className="bg-[#FF9933]/10 border border-[#FF9933]/20 rounded-lg px-4 py-3">
                <p className="text-xs text-white/60 mb-1">Welcome back</p>
                <p className="text-xs text-white/60 mb-1">Logged in as</p>
                <p className="text-[#FF9933]">{role}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="px-4 py-6 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 ${
                      item.active ? 'bg-[#FF9933] text-white' : 'text-white/80'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-[#FF9933] text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button in Sidebar */}
            <div className="px-4 py-6 mt-auto border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-red-500/20 hover:text-red-400 transition-all group"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 glass-white border-b border-[#0A1F44]/10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X className="w-6 h-6 text-[#0A1F44]" /> : <Menu className="w-6 h-6 text-[#0A1F44]" />}
                </button>
                <div>
                  <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {title}
                  </h2>
                  <p className="text-sm text-[#64748B]">Welcome to your dashboard</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <SearchBar role={roleKey} />

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-3 p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-[#64748B]" />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 glass-white rounded-xl shadow-2xl border border-[#0A1F44]/10 overflow-hidden"
                      >
                        <div className="p-4 border-b border-[#0A1F44]/10">
                          <p className="text-sm text-[#0A1F44] font-medium">{userName}</p>
                          <p className="text-xs text-[#64748B]">{userEmail}</p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={handleProfileClick}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#F8F9FA] rounded-lg transition-colors text-[#0A1F44]"
                          >
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </button>
                        </div>
                        <div className="p-2 border-t border-[#0A1F44]/10">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}