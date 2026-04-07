import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  Settings, CheckCircle, User, Mail, Phone, MapPin, Award, 
  Edit2, Save, X, Camera
} from 'lucide-react';

export default function EducatorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: sessionStorage.getItem('userEmail') || '',
    phone: '',
    qualification: '',
    specialization: '',
    institution: '',
    experience: '',
    location: '',
    bio: '',
    achievements: []
  });

  const [editData, setEditData] = useState(profileData);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles' },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const stats = [
    { label: 'Articles Published', value: '0', color: 'from-[#0A1F44] to-[#1A3A6B]' },
    { label: 'Sessions Conducted', value: '0', color: 'from-[#FF9933] to-[#FFB366]' },
    { label: 'Students Taught', value: '0', color: 'from-[#138808] to-[#1ea712]' },
    { label: 'Years Experience', value: profileData.experience || '0', color: 'from-[#1A3A6B] to-[#0A1F44]' }
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Educator Profile" role="Educator">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-white rounded-xl p-8 card-elevated mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FF9933] via-[#0A1F44] to-[#138808] p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-16 h-16 text-[#0A1F44]" />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-[#FF9933] rounded-full text-white hover:bg-[#E87F1F] transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {!isEditing ? (
                <>
                  <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {profileData.name}
                  </h2>
                  <p className="text-lg text-[#FF9933] mb-4">{profileData.qualification}</p>
                  <p className="text-[#64748B] mb-4">{profileData.bio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{profileData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#64748B]">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-sm">{profileData.institution}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Phone</label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Qualification</label>
                    <input
                      type="text"
                      value={editData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Bio</label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Edit/Save Buttons */}
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-white rounded-xl p-6 card-elevated"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {stat.value}
            </div>
            <div className="text-sm text-[#64748B]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Professional Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Professional Details
          </h3>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-sm text-[#64748B] mb-1">Specialization</div>
                <div className="text-[#0A1F44]">{profileData.specialization}</div>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-sm text-[#64748B] mb-1">Institution</div>
                <div className="text-[#0A1F44]">{profileData.institution}</div>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-sm text-[#64748B] mb-1">Experience</div>
                <div className="text-[#0A1F44]">{profileData.experience}</div>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <div className="text-sm text-[#64748B] mb-1">Location</div>
                <div className="text-[#0A1F44]">{profileData.location}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Specialization</label>
                <input
                  type="text"
                  value={editData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Institution</label>
                <input
                  type="text"
                  value={editData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Experience</label>
                <input
                  type="text"
                  value={editData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1F44] mb-2 font-medium">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-white rounded-xl p-6 card-elevated"
        >
          <h3 className="text-xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Achievements & Recognition
          </h3>

          <div className="space-y-3">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="text-[#0A1F44]">{achievement}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}