import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, User, Mail, Phone, MapPin, Award, Briefcase, Save
} from 'lucide-react';

export default function LegalProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    barCouncilId: '',
    specialization: '',
    experience: '',
    education: '',
    bio: '',
  });
  const [stats, setStats] = useState([
    { label: 'Articles Updated', value: '0', icon: FileText },
    { label: 'Insights Published', value: '0', icon: BookOpen },
    { label: 'Cases Referenced', value: '0', icon: Scale },
    { label: 'Advisory Responses', value: '0', icon: MessageCircle },
  ]);
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch profile data from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchProfile = async () => {
    //   const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    //   const { data, error } = await supabase
    //     .from('users')
    //     .select('*')
    //     .eq('email', userEmail)
    //     .eq('role', 'legal-expert')
    //     .single();
    //   if (data) setProfile(data);
    // };
    // fetchProfile();
    
    // Fetch user email from storage for display
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    if (userEmail) {
      setProfile(prev => ({ ...prev, email: userEmail }));
    }
  }, []);

  // Fetch stats from database when connected
  useEffect(() => {
    // TODO: Fetch stats from Supabase
    // const fetchStats = async () => {
    //   const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    //   
    //   const { count: articlesCount } = await supabase
    //     .from('article_updates')
    //     .select('*', { count: 'exact', head: true })
    //     .eq('updated_by', userEmail);
    //   
    //   const { count: insightsCount } = await supabase
    //     .from('legal_insights')
    //     .select('*', { count: 'exact', head: true })
    //     .eq('author_email', userEmail);
    //   
    //   const { count: casesCount } = await supabase
    //     .from('case_references')
    //     .select('*', { count: 'exact', head: true })
    //     .eq('added_by', userEmail);
    //   
    //   const { count: advisoryCount } = await supabase
    //     .from('advisory_requests')
    //     .select('*', { count: 'exact', head: true })
    //     .eq('responded_by', userEmail)
    //     .eq('status', 'responded');
    //   
    //   setStats([
    //     { label: 'Articles Updated', value: String(articlesCount || 0), icon: FileText },
    //     { label: 'Insights Published', value: String(insightsCount || 0), icon: BookOpen },
    //     { label: 'Cases Referenced', value: String(casesCount || 0), icon: Scale },
    //     { label: 'Advisory Responses', value: String(advisoryCount || 0), icon: MessageCircle },
    //   ]);
    // };
    // fetchStats();
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
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const handleSave = () => {
    // TODO: Save to Supabase
    // const { data, error } = await supabase
    //   .from('users')
    //   .update(profile)
    //   .eq('email', profile.email);
    
    setIsEditing(false);
    alert('Profile will be updated when database is connected');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Profile" role="Legal Expert">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Legal Expert Profile
          </h1>
          <p className="text-[#64748B]">Manage your professional information</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-5 h-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Picture & Basic Info */}
          <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-xl text-[#0A1F44] mb-2 text-center px-3 py-1 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                />
              ) : (
                <h2 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {profile.name}
                </h2>
              )}
              <p className="text-[#64748B] mb-4">Constitutional Law Expert</p>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
                <Award className="w-4 h-4" />
                <span>Verified Expert</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
            <h3 className="text-lg text-[#0A1F44] mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#138808]" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="flex-1 px-3 py-1 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <span className="text-sm text-[#64748B]">{profile.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#138808]" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="flex-1 px-3 py-1 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <span className="text-sm text-[#64748B]">{profile.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#138808]" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="flex-1 px-3 py-1 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <span className="text-sm text-[#64748B]">{profile.location}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-white rounded-xl p-4 border border-[#138808]/10 text-center"
              >
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-[#138808]" />
                </div>
                <p className="text-2xl text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[#64748B]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Professional Details */}
          <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
            <h3 className="text-lg text-[#0A1F44] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#138808]" />
              Professional Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Bar Council ID</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.barCouncilId}
                    onChange={(e) => setProfile({ ...profile, barCouncilId: e.target.value })}
                    className="w-full px-4 py-2 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <p className="text-[#0A1F44]">{profile.barCouncilId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.specialization}
                    onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                    className="w-full px-4 py-2 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <p className="text-[#0A1F44]">{profile.specialization}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Experience</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <p className="text-[#0A1F44]">{profile.experience}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Education</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    className="w-full px-4 py-2 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  />
                ) : (
                  <p className="text-[#0A1F44]">{profile.education}</p>
                )}
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
            <h3 className="text-lg text-[#0A1F44] mb-4">Professional Biography</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows="6"
                className="w-full px-4 py-3 border border-[#138808]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] resize-none"
              />
            ) : (
              <p className="text-[#64748B] leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}