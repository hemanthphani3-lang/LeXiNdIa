import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, Check, Trash2, AlertCircle, Info, CheckCircle
} from 'lucide-react';

export default function LegalNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch notifications from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchNotifications = async () => {
    //   const { data, error } = await supabase
    //     .from('notifications')
    //     .select('*')
    //     .eq('user_role', 'legal-expert')
    //     .order('created_at', { ascending: false });
    //   if (data) setNotifications(data);
    // };
    // fetchNotifications();
  }, []);

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
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications', active: true },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  const handleMarkAsRead = (id) => {
    // TODO: Update in Supabase
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('id', id);
    
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    // TODO: Update in Supabase
    // await supabase
    //   .from('notifications')
    //   .update({ read: true })
    //   .eq('user_role', 'legal-expert')
    //   .eq('read', false);
    
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDelete = (id) => {
    // TODO: Delete from Supabase
    // await supabase
    //   .from('notifications')
    //   .delete()
    //   .eq('id', id);
    
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'request':
        return <MessageCircle className="w-5 h-5" />;
      case 'update':
        return <Edit className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'request':
        return 'from-[#FF9933] to-[#ff7700]';
      case 'update':
        return 'from-blue-500 to-blue-600';
      case 'success':
        return 'from-green-500 to-green-600';
      case 'alert':
        return 'from-red-500 to-red-600';
      default:
        return 'from-[#138808] to-[#1ea712]';
    }
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Notifications" role="Legal Expert">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Notifications
          </h1>
          <p className="text-[#64748B]">Stay updated with your legal expert activities</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-6 py-3 bg-[#138808] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`glass-white rounded-xl p-6 border transition-all text-left ${
            filter === 'all' 
              ? 'border-[#138808] bg-[#138808]/5' 
              : 'border-[#138808]/10 hover:border-[#138808]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {notifications.length}
              </p>
            </div>
            <Bell className="w-10 h-10 text-[#138808]/30" />
          </div>
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`glass-white rounded-xl p-6 border transition-all text-left ${
            filter === 'unread' 
              ? 'border-[#FF9933] bg-[#FF9933]/5' 
              : 'border-[#FF9933]/10 hover:border-[#FF9933]/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Unread</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {unreadCount}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-[#FF9933]/30" />
          </div>
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`glass-white rounded-xl p-6 border transition-all text-left ${
            filter === 'read' 
              ? 'border-green-500 bg-green-50' 
              : 'border-green-500/10 hover:border-green-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Read</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {readCount}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500/30" />
          </div>
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <Bell className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No notifications</h3>
          <p className="text-[#64748B]">
            {filter === 'unread' && 'You have no unread notifications'}
            {filter === 'read' && 'You have no read notifications'}
            {filter === 'all' && "Notifications will appear here when database is connected"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`glass-white rounded-xl p-5 hover:shadow-lg transition-all border ${
                notification.read 
                  ? 'border-[#138808]/10' 
                  : 'border-[#FF9933]/30 bg-[#FF9933]/5'
              } group`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getNotificationColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                  <div className="text-white">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h3 className={`text-base ${notification.read ? 'text-[#0A1F44]' : 'text-[#0A1F44] font-semibold'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-[#FF9933] flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                  <p className="text-sm text-[#64748B] mb-2">{notification.message}</p>
                  <p className="text-xs text-[#64748B]">{notification.time}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="p-2 text-[#138808] hover:bg-[#138808]/10 rounded-lg transition-all"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Settings Info */}
      <div className="mt-8 glass-white rounded-xl p-6 border border-[#138808]/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#138808]/10 flex items-center justify-center flex-shrink-0">
            <Settings className="w-5 h-5 text-[#138808]" />
          </div>
          <div>
            <h3 className="text-lg text-[#0A1F44] mb-2">Notification Preferences</h3>
            <p className="text-sm text-[#64748B] mb-3">
              Customize your notification settings to control what updates you receive and how you receive them.
            </p>
            <button className="text-sm text-[#138808] hover:text-[#1ea712] transition-colors">
              Manage Preferences →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
