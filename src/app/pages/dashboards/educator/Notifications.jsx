import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, CheckCircle, Trash2, Eye
} from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    alert('Notification deleted!');
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      setNotifications([]);
    }
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Notifications" role="Educator">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Notifications
            </h2>
            <p className="text-[#64748B]">
              Stay updated with student activities and system alerts
            </p>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-6 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-12 text-center"
        >
          <Bell className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No Notifications
          </h3>
          <p className="text-[#64748B]">
            You're all caught up! New notifications will appear here
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-white rounded-xl p-6 card-elevated hover:shadow-xl transition-all ${
                !notif.read ? 'border-l-4 border-[#FF9933]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg text-[#0A1F44] mb-2">{notif.title}</h3>
                  <p className="text-[#64748B] mb-2">{notif.message}</p>
                  <div className="text-xs text-[#64748B]">
                    {new Date(notif.timestamp).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Eye className="w-5 h-5 text-[#0A1F44]" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}