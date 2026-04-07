import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, CheckCircle, Plus, Edit2, Trash2, Clock, Video
} from 'lucide-react';

export default function ScheduleSessions() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '60',
    maxParticipants: '50',
    description: '',
    type: 'workshop'
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions', active: true },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSession = () => {
    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newSession = {
      id: Date.now(),
      ...formData,
      participants: 0,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    setSessions(prev => [...prev, newSession]);
    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '60',
      maxParticipants: '50',
      description: '',
      type: 'workshop'
    });
    setShowForm(false);
    alert('Session scheduled successfully!');
  };

  const handleDeleteSession = (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(prev => prev.filter(session => session.id !== id));
      alert('Session deleted successfully!');
    }
  };

  const handleEditSession = (session) => {
    setFormData(session);
    setShowForm(true);
    setSessions(prev => prev.filter(s => s.id !== session.id));
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Schedule Sessions" role="Educator">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Interactive Sessions
          </h2>
          <p className="text-[#64748B]">
            Schedule and manage your educational workshops and Q&A sessions
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Schedule New Session'}
        </button>
      </div>

      {/* Create Session Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-white rounded-xl p-6 card-elevated mb-8"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            New Session Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Session Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Introduction to Constitutional Law"
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Session Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              >
                <option value="workshop">Workshop</option>
                <option value="qa">Q&A Session</option>
                <option value="lecture">Lecture</option>
                <option value="discussion">Discussion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="15"
                step="15"
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Max Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe what participants will learn in this session..."
                rows={4}
                className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateSession}
              className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
            >
              Schedule Session
            </button>
          </div>
        </motion.div>
      )}

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-white rounded-xl p-12 text-center"
        >
          <Calendar className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            No Sessions Scheduled
          </h3>
          <p className="text-[#64748B] mb-6">
            Click the button above to schedule your first interactive session
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 card-elevated hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {session.title}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#0A1F44]/10 text-[#0A1F44] capitalize">
                        {session.type}
                      </span>
                    </div>
                  </div>

                  {session.description && (
                    <p className="text-[#64748B] mb-4">{session.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.date).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {session.time} ({session.duration} min)
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {session.participants} / {session.maxParticipants} enrolled
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditSession(session)}
                    className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    title="Edit Session"
                  >
                    <Edit2 className="w-5 h-5 text-[#0A1F44]" />
                  </button>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Session"
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