import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, Plus, Calendar, CheckCircle, Clock, X, ArrowLeft
} from 'lucide-react';

export default function Amendments() {
  const navigate = useNavigate();
  const [amendments, setAmendments] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [sortBy, setSortBy] = useState('all'); // 'all', 'recent', 'active', 'documented'
  
  // Form state for adding amendment
  const [newAmendment, setNewAmendment] = useState({
    number: '',
    title: '',
    description: '',
    year: '',
    status: 'Active',
    articles: '',
  });

  // Fetch amendments from database when connected
  useEffect(() => {
    // TODO: Fetch amendments from Supabase
    // const fetchAmendments = async () => {
    //   const { data, error } = await supabase
    //     .from('amendments')
    //     .select('*')
    //     .order('number', { ascending: false });
    //   if (data) setAmendments(data);
    // };
    // fetchAmendments();
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
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments', active: true },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const handleAddAmendment = () => {
    // TODO: Save to Supabase
    // const articlesArray = newAmendment.articles.split(',').map(a => a.trim());
    // const amendmentData = {
    //   ...newAmendment,
    //   articles: articlesArray,
    // };
    // await supabase.from('amendments').insert([amendmentData]);
    
    alert('Amendment information will be added when database is connected');
    setIsAddModalOpen(false);
    setNewAmendment({
      number: '',
      title: '',
      description: '',
      year: '',
      status: 'Active',
      articles: '',
    });
  };

  // Filter amendments based on sort selection
  let displayedAmendments = [...amendments];
  if (sortBy === 'recent') {
    displayedAmendments = displayedAmendments.filter(a => a.year >= 2020);
  } else if (sortBy === 'active') {
    displayedAmendments = displayedAmendments.filter(a => a.status === 'Active');
  }
  // 'documented' and 'all' show all amendments, so no additional filtering needed

  return (
    <DashboardLayout navigationItems={navigationItems} title="Amendments" role="Legal Expert">
      {/* Back Button */}
      <button
        onClick={() => navigate('/legal-expert')}
        className="flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Constitutional Amendments
          </h1>
          <p className="text-[#64748B]">Track and update information on constitutional amendments</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Amendment Info
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setSortBy('all')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'all' ? 'border-[#138808] bg-[#138808]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total Amendments</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {amendments.length}
              </p>
            </div>
            <Edit className="w-10 h-10 text-[#138808]/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('recent')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'recent' ? 'border-blue-500 bg-blue-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Recent (2020+)</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {amendments.filter(a => a.year >= 2020).length}
              </p>
            </div>
            <Clock className="w-10 h-10 text-blue-500/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('active')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'active' ? 'border-green-500 bg-green-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Active Status</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {amendments.filter(a => a.status === 'Active').length}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('documented')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'documented' ? 'border-[#FF9933] bg-[#FF9933]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Documented</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {amendments.length}
              </p>
            </div>
            <FileText className="w-10 h-10 text-[#FF9933]/30" />
          </div>
        </button>
      </div>

      {/* Active Filter Indicator */}
      {sortBy !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Showing:</span>
          <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
            {sortBy === 'recent' && 'Recent Amendments (2020+)'}
            {sortBy === 'active' && 'Active Amendments Only'}
            {sortBy === 'documented' && 'All Documented Amendments'}
          </span>
          <button
            onClick={() => setSortBy('all')}
            className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Amendments List */}
      {displayedAmendments.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <Edit className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No Amendments {sortBy !== 'all' && 'Found'}</h3>
          <p className="text-[#64748B] mb-4">
            {sortBy === 'recent' && amendments.length > 0 
              ? 'No amendments from 2020 or later' 
              : sortBy === 'active' && amendments.length > 0
              ? 'No active amendments found'
              : 'Amendment information will appear here when database is connected'}
          </p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Add Amendment Info
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAmendments.sort((a, b) => b.number - a.number).map((amendment, index) => (
            <motion.div
              key={amendment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 hover:shadow-lg transition-all border border-[#138808]/10 group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Amendment Number Badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex flex-col items-center justify-center">
                    <span className="text-xs text-white/80">Amendment</span>
                    <span className="text-2xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {amendment.number}
                    </span>
                  </div>
                </div>

                {/* Amendment Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl text-[#0A1F44] mb-1 group-hover:text-[#138808] transition-colors">
                        {amendment.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mb-2">{amendment.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        amendment.status === 'Recent' 
                          ? 'bg-[#FF9933]/10 text-[#FF9933]' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {amendment.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Calendar className="w-4 h-4" />
                      <span>Year: {amendment.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <FileText className="w-4 h-4" />
                      <span>{amendment.articles?.length || 0} Article(s) Affected</span>
                    </div>
                  </div>

                  {/* Affected Articles */}
                  {amendment.articles && amendment.articles.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-[#64748B] mb-2">Affected Articles:</p>
                      <div className="flex flex-wrap gap-2">
                        {amendment.articles.map((article, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-xs">
                            {article}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#138808]/10">
                    <button className="text-sm text-[#138808] hover:text-[#1ea712] transition-colors">
                      View Full Details
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                      Edit Information
                    </button>
                    <button className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="mt-8 glass-white rounded-xl p-8 border border-[#138808]/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#138808]/10 flex items-center justify-center flex-shrink-0">
            <Edit className="w-6 h-6 text-[#138808]" />
          </div>
          <div>
            <h3 className="text-lg text-[#0A1F44] mb-2">Keep Amendment Information Updated</h3>
            <p className="text-[#64748B] mb-4">
              As a legal expert, you play a crucial role in maintaining accurate and up-to-date information about constitutional amendments. 
              Ensure all amendments are properly documented with their implications and affected articles.
            </p>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Contribute Amendment Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Add Amendment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#0A1F44]/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Add Amendment Information
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Amendment Number</label>
                <input
                  type="number"
                  value={newAmendment.number}
                  onChange={(e) => setNewAmendment({ ...newAmendment, number: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  placeholder="e.g., 104"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Title</label>
                <input
                  type="text"
                  value={newAmendment.title}
                  onChange={(e) => setNewAmendment({ ...newAmendment, title: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  placeholder="e.g., Women's Reservation Bill"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Description</label>
                <textarea
                  value={newAmendment.description}
                  onChange={(e) => setNewAmendment({ ...newAmendment, description: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] resize-none"
                  rows="3"
                  placeholder="Brief description of the amendment"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Year</label>
                <input
                  type="number"
                  value={newAmendment.year}
                  onChange={(e) => setNewAmendment({ ...newAmendment, year: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  placeholder="e.g., 2023"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Status</label>
                <select
                  value={newAmendment.status}
                  onChange={(e) => setNewAmendment({ ...newAmendment, status: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                >
                  <option value="Active">Active</option>
                  <option value="Recent">Recent</option>
                  <option value="Historical">Historical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Affected Articles (comma-separated)</label>
                <input
                  type="text"
                  value={newAmendment.articles}
                  onChange={(e) => setNewAmendment({ ...newAmendment, articles: e.target.value })}
                  className="w-full px-4 py-2 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808]"
                  placeholder="e.g., Article 330, Article 332"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleAddAmendment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
                >
                  Add Amendment
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-[#F8FAFC] text-[#64748B] rounded-lg hover:bg-[#E2E8F0] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}