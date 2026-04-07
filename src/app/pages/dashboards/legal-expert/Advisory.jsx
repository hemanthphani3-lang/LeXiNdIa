import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, Clock, CheckCircle2, AlertCircle, User, X, Send
} from 'lucide-react';

export default function Advisory() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'responded'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch advisory requests from database when connected
  useEffect(() => {
    // TODO: Fetch from Supabase
    // const fetchRequests = async () => {
    //   const { data, error } = await supabase
    //     .from('advisory_requests')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   if (data) {
    //     setRequests(data);
    //     setPendingCount(data.filter(r => r.status === 'pending').length);
    //   }
    // };
    // fetchRequests();
  }, []);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/legal-expert' },
    { label: 'Update Articles', icon: Scale, path: '/legal-expert/articles' },
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights' },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: pendingCount > 0 ? String(pendingCount) : undefined, active: true },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const filteredRequests = requests.filter(request => {
    if (filter === 'pending') return request.status === 'pending';
    if (filter === 'responded') return request.status === 'responded';
    return true;
  });

  const sortedRequests = filteredRequests.sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const handleRespond = (request) => {
    setSelectedRequest(request);
    setResponseText('');
  };

  const handleSubmitResponse = () => {
    // TODO: Save response to Supabase
    // const { data, error } = await supabase
    //   .from('advisory_requests')
    //   .update({ status: 'responded', response: responseText, responded_at: new Date() })
    //   .eq('id', selectedRequest.id);
    
    alert('Response will be saved when database is connected');
    setSelectedRequest(null);
    setResponseText('');
  };

  const totalCount = requests.length;
  const respondedCount = requests.filter(r => r.status === 'responded').length;

  return (
    <DashboardLayout navigationItems={navigationItems} title="Advisory Requests" role="Legal Expert">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Legal Advisory Requests
        </h1>
        <p className="text-[#64748B]">Respond to constitutional law queries from the community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-white rounded-xl p-6 border border-[#138808]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Total Requests</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {totalCount}
              </p>
            </div>
            <MessageCircle className="w-10 h-10 text-[#138808]/30" />
          </div>
        </div>
        <div className="glass-white rounded-xl p-6 border border-[#FF9933]/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Pending</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pendingCount}
              </p>
            </div>
            <Clock className="w-10 h-10 text-[#FF9933]/30" />
          </div>
        </div>
        <div className="glass-white rounded-xl p-6 border border-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#64748B] mb-1">Responded</p>
              <p className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {respondedCount}
              </p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-green-500/30" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' 
              ? 'bg-[#138808] text-white' 
              : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#138808]/10'
          }`}
        >
          All ({totalCount})
        </button>
        <button 
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'pending' 
              ? 'bg-[#138808] text-white' 
              : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#138808]/10'
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button 
          onClick={() => setFilter('responded')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'responded' 
              ? 'bg-[#138808] text-white' 
              : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#138808]/10'
          }`}
        >
          Responded ({respondedCount})
        </button>
      </div>

      {/* Requests List */}
      {sortedRequests.length === 0 ? (
        <div className="glass-white rounded-xl p-12 text-center border border-[#138808]/10">
          <MessageCircle className="w-16 h-16 text-[#138808]/30 mx-auto mb-4" />
          <h3 className="text-xl text-[#0A1F44] mb-2">No Advisory Requests</h3>
          <p className="text-[#64748B]">
            {filter === 'pending' && 'No pending requests at the moment'}
            {filter === 'responded' && 'No responded requests yet'}
            {filter === 'all' && 'Advisory requests will appear here when database is connected'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`glass-white rounded-xl p-6 hover:shadow-lg transition-all border ${
                request.status === 'pending' 
                  ? 'border-[#FF9933]/30' 
                  : 'border-[#138808]/10'
              } group`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#138808] to-[#1ea712] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Request Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg text-[#0A1F44] mb-1">{request.subject}</h3>
                      <p className="text-sm text-[#64748B]">From: {request.from}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request.priority === 'high' && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          High Priority
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        request.status === 'pending' 
                          ? 'bg-[#FF9933]/10 text-[#FF9933]' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {request.status === 'pending' ? 'Pending' : 'Responded'}
                      </span>
                    </div>
                  </div>

                  <p className="text-[#64748B] mb-4 bg-[#F8FAFC] p-3 rounded-lg">
                    {request.question}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(request.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {request.status === 'pending' ? (
                        <button
                          onClick={() => handleRespond(request)}
                          className="px-4 py-2 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Respond
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-[#F8FAFC] text-[#64748B] rounded-lg hover:bg-[#138808]/10 transition-colors flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          View Response
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="mt-8 glass-white rounded-xl p-6 border border-blue-500/20 bg-blue-50/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg text-[#0A1F44] mb-2">Advisory Guidelines</h3>
            <p className="text-sm text-[#64748B]">
              Please ensure your responses are accurate, well-researched, and cite relevant case laws and constitutional provisions. 
              Maintain professional and respectful communication in all advisory responses.
            </p>
          </div>
        </div>
      </div>

      {/* Response Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#0A1F44]/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Respond to Advisory Request
              </h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-[#64748B]" />
              </button>
            </div>

            <div className="p-6">
              {/* Request Details */}
              <div className="mb-6 p-4 bg-[#F8FAFC] rounded-lg">
                <h3 className="text-lg text-[#0A1F44] mb-2">{selectedRequest.subject}</h3>
                <p className="text-sm text-[#64748B] mb-2">From: {selectedRequest.from}</p>
                <p className="text-[#0A1F44]">{selectedRequest.question}</p>
              </div>

              {/* Response Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#64748B] mb-2">Your Response</label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    className="w-full px-4 py-3 border border-[#0A1F44]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] resize-none"
                    rows="10"
                    placeholder="Provide a detailed, well-researched response citing relevant constitutional provisions and case laws..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmitResponse}
                    disabled={!responseText.trim()}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    Submit Response
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex-1 px-6 py-3 bg-[#F8FAFC] text-[#64748B] rounded-lg hover:bg-[#E2E8F0] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
