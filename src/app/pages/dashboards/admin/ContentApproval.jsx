import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, CheckCircle, XCircle, Clock, Eye, User,
  Upload
} from 'lucide-react';

export default function ContentApproval() {
  const { 
    pendingContent, 
    approvedToday, 
    rejectedToday, 
    totalApproved,
    approveContent, 
    rejectContent 
  } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', active: true, badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const [filter, setFilter] = useState('all');
  const [selectedStat, setSelectedStat] = useState(null);

  const handleStatClick = (statType) => {
    setSelectedStat(statType);
    setFilter(statType);
  };

  const handlePreview = (content) => {
    alert(`Preview: ${content.title}\n\nAuthor: ${content.author}\nType: ${content.type}\nCategory: ${content.category}\nWord Count: ${content.wordCount}`);
  };

  const handleApprove = (content) => {
    if (window.confirm(`Approve "${content.title}" by ${content.author}?`)) {
      approveContent(content.id);
      alert(`Content approved successfully!`);
    }
  };

  const handleReject = (content) => {
    const reason = prompt(`Reject "${content.title}"?\n\nPlease provide a reason for rejection:`);
    if (reason) {
      rejectContent(content.id);
      alert(`Content rejected. Notification sent to ${content.author}.`);
    }
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Content Approval" role="Administrator">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Content Approval Queue
        </h2>
        <p className="text-[#64748B]">Review and approve content submissions from educators and legal experts</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => handleStatClick('pending')}
          className={`glass-white rounded-xl p-6 cursor-pointer hover-lift transition-all ${selectedStat === 'pending' ? 'ring-2 ring-[#FF9933]' : ''}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-700" />
            </div>
            <div className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {pendingContent.length}
            </div>
          </div>
          <div className="text-sm text-[#64748B]">Pending Review</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={() => handleStatClick('approved')}
          className={`glass-white rounded-xl p-6 cursor-pointer hover-lift transition-all ${selectedStat === 'approved' ? 'ring-2 ring-[#FF9933]' : ''}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-700" />
            </div>
            <div className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {approvedToday}
            </div>
          </div>
          <div className="text-sm text-[#64748B]">Approved Today</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => handleStatClick('rejected')}
          className={`glass-white rounded-xl p-6 cursor-pointer hover-lift transition-all ${selectedStat === 'rejected' ? 'ring-2 ring-[#FF9933]' : ''}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-700" />
            </div>
            <div className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {rejectedToday}
            </div>
          </div>
          <div className="text-sm text-[#64748B]">Rejected Today</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          onClick={() => handleStatClick('total')}
          className={`glass-white rounded-xl p-6 cursor-pointer hover-lift transition-all ${selectedStat === 'total' ? 'ring-2 ring-[#FF9933]' : ''}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-700" />
            </div>
            <div className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {totalApproved}
            </div>
          </div>
          <div className="text-sm text-[#64748B]">Total Approved</div>
        </motion.div>
      </div>

      {/* Selected Stat View */}
      {selectedStat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-white rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {selectedStat === 'pending' && 'Pending Review Items'}
              {selectedStat === 'approved' && 'Approved Today'}
              {selectedStat === 'rejected' && 'Rejected Today'}
              {selectedStat === 'total' && 'Total Approved Articles'}
            </h3>
            <button
              onClick={() => setSelectedStat(null)}
              className="text-sm text-[#FF9933] hover:text-[#E87F1F] transition-colors"
            >
              Clear Filter
            </button>
          </div>
          <div className="text-center py-8">
            <FileCheck className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">
              {selectedStat === 'pending' && `Showing ${pendingContent.length} pending items below`}
              {selectedStat === 'approved' && `${approvedToday} items were approved today`}
              {selectedStat === 'rejected' && `${rejectedToday} items were rejected today`}
              {selectedStat === 'total' && `${totalApproved} total items have been approved`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Content List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        {pendingContent.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-white rounded-xl p-6 card-elevated hover:shadow-2xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {content.title}
                  </h3>
                  <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs">
                    {content.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {content.author} • {content.authorRole}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {content.submittedDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {content.wordCount} words
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-[#0A1F44]/5 text-[#0A1F44] rounded text-xs">
                    {content.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => handlePreview(content)}
                className="flex-1 px-4 py-2 bg-white border border-[#0A1F44]/10 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button 
                onClick={() => handleApprove(content)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button 
                onClick={() => handleReject(content)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </motion.div>
        ))}

        {pendingContent.length === 0 && (
          <div className="glass-white rounded-xl p-12 text-center">
            <FileCheck className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              No Pending Content
            </h3>
            <p className="text-[#64748B]">
              All content has been reviewed. Great job!
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}