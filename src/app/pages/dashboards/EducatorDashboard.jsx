import { motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, Plus, Eye, Clock, CheckCircle
} from 'lucide-react';

export default function EducatorDashboard() {
  const navigate = useNavigate();
  const [articles] = useState([]);
  const [sessions] = useState([]);
  const [students] = useState([]);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator', active: true },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const stats = [
    { 
      label: 'Published Articles', 
      value: articles.filter(a => a.status === 'published').length.toString(), 
      icon: FileText,
      color: 'from-[#0A1F44] to-[#1A3A6B]'
    },
    { 
      label: 'Upcoming Sessions', 
      value: sessions.filter(s => new Date(s.date) > new Date()).length.toString(), 
      icon: Calendar,
      color: 'from-[#FF9933] to-[#FFB366]'
    },
    { 
      label: 'Active Students', 
      value: students.length.toString(), 
      icon: Users,
      color: 'from-[#138808] to-[#1ea712]'
    },
    { 
      label: 'Total Engagement', 
      value: articles.reduce((sum, a) => sum + (a.views || 0), 0).toString(), 
      icon: Eye,
      color: 'from-[#1A3A6B] to-[#0A1F44]'
    },
  ];

  const recentArticles = articles.slice(0, 3);
  const upcomingSessions = sessions.filter(s => new Date(s.date) > new Date()).slice(0, 3);
  
  const completionRate = articles.length > 0 
    ? Math.round((articles.filter(a => a.status === 'published').length / articles.length) * 100)
    : 0;

  return (
    <DashboardLayout navigationItems={navigationItems} title="Educator Dashboard" role="Educator">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 hover-lift card-elevated"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </h3>
              <p className="text-sm text-[#64748B]">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/educator/create')}
            className="p-4 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Create Commentary</h4>
            <p className="text-xs text-white/70">Write educational analysis</p>
          </button>
          <button 
            onClick={() => navigate('/educator/sessions')}
            className="p-4 bg-gradient-to-br from-[#FF9933] to-[#FFB366] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <Calendar className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Schedule Session</h4>
            <p className="text-xs text-white/70">Plan interactive workshops</p>
          </button>
          <button 
            onClick={() => navigate('/educator/quiz')}
            className="p-4 bg-gradient-to-br from-[#138808] to-[#1ea712] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <CheckCircle className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">Create Quiz</h4>
            <p className="text-xs text-white/70">Design assessment tests</p>
          </button>
          <button 
            onClick={() => navigate('/forum')}
            className="p-4 bg-gradient-to-br from-[#1A3A6B] to-[#0A1F44] text-white rounded-xl hover-lift transition-all text-left group"
          >
            <MessageSquare className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="mb-1">View Discussions</h4>
            <p className="text-xs text-white/70">Engage with students</p>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Commentary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Recent Commentary
            </h3>
            <button 
              onClick={() => navigate('/educator/articles')}
              className="text-[#FF9933] hover:text-[#E87F1F] transition-colors text-sm"
            >
              View All
            </button>
          </div>
          {recentArticles.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
              <p className="text-[#64748B] mb-4">No commentary yet</p>
              <button
                onClick={() => navigate('/educator/create')}
                className="px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-colors text-sm"
              >
                Create First Commentary
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentArticles.map((article, index) => (
                <div key={index} className="p-4 border border-[#0A1F44]/10 rounded-lg hover:border-[#FF9933] transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-[#0A1F44] group-hover:text-[#FF9933] transition-colors flex-1">
                      {article.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full ${
                        article.status === 'published' ? 'bg-green-100 text-green-700' :
                        article.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {article.status}
                      </span>
                      <span className="text-[#64748B] flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views || 0} views
                      </span>
                    </div>
                    <span className="text-[#64748B]">{new Date(article.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Upcoming Sessions
            </h3>
            <button 
              onClick={() => navigate('/educator/sessions')}
              className="text-[#FF9933] hover:text-[#E87F1F] transition-colors text-sm"
            >
              View All
            </button>
          </div>
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
              <p className="text-[#64748B] mb-4">No upcoming sessions</p>
              <button
                onClick={() => navigate('/educator/sessions')}
                className="px-4 py-2 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-colors text-sm"
              >
                Schedule Session
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-[#F8FAFC] to-white border border-[#0A1F44]/10 rounded-lg hover:shadow-lg transition-all">
                  <h4 className="text-[#0A1F44] mb-3">{session.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(session.date).toLocaleDateString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {session.participants || 0} enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Student Engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 glass-white rounded-xl p-6 card-elevated"
      >
        <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Student Engagement Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-[#F8FAFC] to-white rounded-lg">
            <div className="text-4xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {completionRate}%
            </div>
            <p className="text-sm text-[#64748B]">Content Completion Rate</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#F8FAFC] to-white rounded-lg">
            <div className="text-4xl text-[#FF9933] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {students.length}
            </div>
            <p className="text-sm text-[#64748B]">Total Students</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-[#F8FAFC] to-white rounded-lg">
            <div className="text-4xl text-[#138808] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {sessions.length}
            </div>
            <p className="text-sm text-[#64748B]">Total Sessions</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}