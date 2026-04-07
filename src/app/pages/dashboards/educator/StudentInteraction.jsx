import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  Settings, CheckCircle, Mail, TrendingUp, MessageSquare, X, User as UserIcon, Clock
} from 'lucide-react';

export default function StudentInteraction() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeView, setActiveView] = useState(null); // 'students', 'messages', 'queries'

  // No mock data - will use live data when implemented
  const students = [];
  const receivedMessages = [];
  const queries = [];

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students', active: true },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'educator',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    alert('Message sent successfully!');
  };

  const handleStatClick = (view) => {
    setActiveView(activeView === view ? null : view);
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Student Interaction" role="Educator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-2"
        >
          <button
            onClick={() => handleStatClick('students')}
            className={`glass-white rounded-xl p-6 text-left transition-all hover:shadow-lg ${
              activeView === 'students' ? 'ring-2 ring-[#0A1F44]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#0A1F44]" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {students.length}
            </div>
            <div className="text-sm text-[#64748B]">Active Students</div>
          </button>
          
          <button
            onClick={() => handleStatClick('messages')}
            className={`glass-white rounded-xl p-6 text-left transition-all hover:shadow-lg ${
              activeView === 'messages' ? 'ring-2 ring-[#FF9933]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-8 h-8 text-[#FF9933]" />
            </div>
            <div className="text-3xl text-[#FF9933] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {receivedMessages.length + messages.length}
            </div>
            <div className="text-sm text-[#64748B]">Messages Exchanged</div>
          </button>
          
          <button
            onClick={() => handleStatClick('queries')}
            className={`glass-white rounded-xl p-6 text-left transition-all hover:shadow-lg ${
              activeView === 'queries' ? 'ring-2 ring-[#138808]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Mail className="w-8 h-8 text-[#138808]" />
            </div>
            <div className="text-3xl text-[#138808] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {queries.length}
            </div>
            <div className="text-sm text-[#64748B]">Pending Queries</div>
          </button>
        </motion.div>

        {/* Active Students View */}
        {activeView === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 glass-white rounded-xl p-8 card-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Active Students
              </h3>
              <button
                onClick={() => setActiveView(null)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="p-4 border border-[#0A1F44]/10 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-[#0A1F44] font-medium">{student.name}</div>
                        <div className="text-sm text-[#64748B]">{student.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#64748B]">Joined: {student.joinedDate}</div>
                      <div className="text-sm text-[#138808]">{student.quizzesCompleted} quizzes completed</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Exchanged View */}
        {activeView === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 glass-white rounded-xl p-8 card-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Messages Exchanged
              </h3>
              <button
                onClick={() => setActiveView(null)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {receivedMessages.map((msg) => (
                <div key={msg.id} className="p-4 border border-[#0A1F44]/10 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-[#0A1F44]">{msg.from}</div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">{msg.timestamp}</span>
                    </div>
                  </div>
                  <div className="text-[#64748B] mb-2">{msg.message}</div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      msg.replied ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {msg.replied ? 'Replied' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}

              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-[#F8FAFC] rounded-lg border border-[#FF9933]/20">
                  <div className="text-[#0A1F44] mb-1">{msg.text}</div>
                  <div className="text-xs text-[#64748B]">
                    Broadcast - {new Date(msg.timestamp).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#0A1F44]/10 pt-6">
              <h4 className="text-lg text-[#0A1F44] mb-4">Send New Broadcast Message</h4>
              <div className="mb-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message to broadcast to all students..."
                  rows={4}
                  className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Send Broadcast Message
              </button>
            </div>
          </motion.div>
        )}

        {/* Pending Queries View */}
        {activeView === 'queries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 glass-white rounded-xl p-8 card-elevated"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Pending Queries
              </h3>
              <button
                onClick={() => setActiveView(null)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-4">
              {queries.map((query) => (
                <div key={query.id} className="p-4 border border-[#0A1F44]/10 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="font-medium text-[#0A1F44]">{query.from}</div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      query.priority === 'high' ? 'bg-red-100 text-red-700' :
                      query.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {query.priority} priority
                    </span>
                  </div>
                  <div className="text-[#0A1F44] mb-3">{query.query}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <Clock className="w-4 h-4" />
                      {query.timestamp}
                    </div>
                    <button className="px-4 py-2 bg-[#138808] text-white rounded-lg hover:bg-[#0F6A06] transition-colors text-sm">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Default View */}
        {!activeView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 glass-white rounded-xl p-8 card-elevated text-center"
          >
            <Users className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Student Interaction Hub
            </h3>
            <p className="text-[#64748B] mb-6 max-w-2xl mx-auto">
              Connect with your students, answer their queries, and track their progress. Click on any stat card above to view detailed information.
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}