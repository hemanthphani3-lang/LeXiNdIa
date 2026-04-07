import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, Gavel, Search, Plus, Download, ExternalLink
} from 'lucide-react';

export default function CaseReferences() {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all'); // 'all', 'landmark', 'articles'
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  // Fetch cases from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchCases = async () => {
    //   const { data, error } = await supabase
    //     .from('case_references')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   if (data) setCases(data);
    // };
    // fetchCases();
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
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases', active: true },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  // Filter cases by search term
  let filteredCases = cases.filter(c => 
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.citation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.relevantArticles?.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Apply sorting based on stat box clicks
  if (sortBy === 'landmark') {
    filteredCases = filteredCases.filter(c => c.type === 'Landmark');
  } else if (sortBy === 'articles') {
    // Sort by number of articles covered (most to least)
    filteredCases = [...filteredCases].sort((a, b) => 
      (b.relevantArticles?.length || 0) - (a.relevantArticles?.length || 0)
    );
  }

  return (
    <DashboardLayout navigationItems={navigationItems} title="Case References" role="Legal Expert">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Constitutional Case Law
          </h1>
          <p className="text-[#64748B]">Browse and manage landmark constitutional case references</p>
        </div>
        <button 
          onClick={() => navigate('/legal-expert/cases/add')}
          className="px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Case Reference
        </button>
      </div>

      {/* Search Bar */}
      <div className="glass-white rounded-xl p-6 mb-6 border border-[#138808]/10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Search cases by name, citation, or article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
          />
        </div>
        {searchTerm && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-[#64748B]">Searching for:</span>
            <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
              {searchTerm}
            </span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Stats - Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setSortBy('all')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'all' ? 'border-[#138808] bg-[#138808]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total Cases</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {cases.length}
              </p>
            </div>
            <Gavel className="w-10 h-10 text-[#138808]/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('landmark')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'landmark' ? 'border-[#FF9933] bg-[#FF9933]/5' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Landmark Cases</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {cases.filter(c => c.type === 'Landmark').length}
              </p>
            </div>
            <Scale className="w-10 h-10 text-[#FF9933]/30" />
          </div>
        </button>
        <button
          onClick={() => setSortBy('articles')}
          className={`glass-white rounded-xl p-6 border transition-all text-left hover:shadow-lg ${
            sortBy === 'articles' ? 'border-blue-500 bg-blue-50' : 'border-[#138808]/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Articles Covered</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {new Set(cases.flatMap(c => c.relevantArticles || [])).size}
              </p>
            </div>
            <FileText className="w-10 h-10 text-blue-500/30" />
          </div>
        </button>
      </div>

      {/* Active Filter Indicator */}
      {sortBy !== 'all' && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Showing:</span>
          <span className="px-3 py-1 bg-[#138808]/10 text-[#138808] rounded-full text-sm">
            {sortBy === 'landmark' && 'Landmark Cases Only'}
            {sortBy === 'articles' && 'Sorted by Articles Covered (Most to Least)'}
          </span>
          <button
            onClick={() => setSortBy('all')}
            className="text-sm text-[#64748B] hover:text-[#0A1F44] transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Cases List */}
      {filteredCases.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <Gavel className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No case references found</h3>
          <p className="text-[#64748B] mb-6">
            {searchTerm || sortBy !== 'all'
              ? 'Try adjusting your search or filter criteria' 
              : 'Case references will appear here when database is connected'}
          </p>
          {!searchTerm && sortBy === 'all' && (
            <button 
              onClick={() => navigate('/legal-expert/cases/add')}
              className="px-8 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add First Case
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 hover:shadow-lg transition-all border border-[#138808]/10 group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
                    <Gavel className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg text-[#0A1F44] mb-1 group-hover:text-[#138808] transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mb-2">{caseItem.citation}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      caseItem.type === 'Landmark' 
                        ? 'bg-[#FF9933]/10 text-[#FF9933]' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {caseItem.type}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-[#64748B] mb-2">
                      <strong>Significance:</strong> {caseItem.significance}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-[#64748B]">Relevant Articles:</span>
                      {caseItem.relevantArticles?.map((article, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#138808]/10 text-[#138808] rounded text-xs">
                          {article}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#138808]/10">
                    <button className="text-sm text-[#138808] hover:text-[#1ea712] flex items-center gap-1 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
