import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, Check, X, Clock, BookmarkCheck, Award, MessageSquare
} from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications', active: true },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Notifications" role="Citizen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-3xl md:text-4xl text-[#0A1F44] mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Notifications
            </h1>
            <p className="text-[#64748B] text-lg">
              Stay updated with your learning journey
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-white rounded-xl p-4 text-center">
            <div className="text-2xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {notifications.length}
            </div>
            <div className="text-xs text-[#64748B]">Total</div>
          </div>
          <div className="glass-white rounded-xl p-4 text-center">
            <div className="text-2xl text-[#FF9933] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {unreadCount}
            </div>
            <div className="text-xs text-[#64748B]">Unread</div>
          </div>
          <div className="glass-white rounded-xl p-4 text-center">
            <div className="text-2xl text-[#138808] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {notifications.filter(n => n.read).length}
            </div>
            <div className="text-xs text-[#64748B]">Read</div>
          </div>
          <div className="glass-white rounded-xl p-4 text-center">
            <div className="text-2xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Today
            </div>
            <div className="text-xs text-[#64748B]">Latest</div>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className={`glass-white rounded-xl p-6 card-elevated group relative $${
                  !notification.read ? 'border-l-4 border-[#FF9933]' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${notification.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg text-[#0A1F44] font-medium">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 bg-[#138808]/10 text-[#138808] rounded-lg hover:bg-[#138808]/20 transition-all"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          title="Delete"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#64748B] mb-3">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <Clock className="w-3 h-3" />
                      {notification.time}
                      {!notification.read && (
                        <span className="ml-2 px-2 py-0.5 bg-[#FF9933]/10 text-[#FF9933] rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 glass-white rounded-xl"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-6">
            <Bell className="w-10 h-10 text-[#FF9933]" />
          </div>
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No Notifications
          </h3>
          <p className="text-[#64748B] mb-6">
            You're all caught up! Check back later for updates.
          </p>
          <Link 
            to="/citizen"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all hover-lift"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      )}
    </DashboardLayout>
  );
}