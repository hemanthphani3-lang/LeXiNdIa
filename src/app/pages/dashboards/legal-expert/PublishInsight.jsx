import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, Scale, BookOpen, FileText, Edit, 
  MessageCircle, Settings, Bell, ArrowLeft, Save, Send
} from 'lucide-react';

export default function PublishInsight() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
    status: 'draft'
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/legal-expert' },
    { label: 'Update Articles', icon: Scale, path: '/legal-expert/articles' },
    { label: 'Legal Insights', icon: BookOpen, path: '/legal-expert/insights', active: true },
    { label: 'Case References', icon: FileText, path: '/legal-expert/cases' },
    { label: 'Amendment Updates', icon: Edit, path: '/legal-expert/amendments' },
    { label: 'Advisory Requests', icon: MessageCircle, path: '/legal-expert/advisory', badge: '8' },
    { label: 'Notifications', icon: Bell, path: '/legal-expert/notifications' },
    { label: 'Settings', icon: Settings, path: '/legal-expert/settings' },
  ];

  const categories = [
    'Constitutional Law',
    'Fundamental Rights',
    'Amendments',
    'Case Law',
    'Judicial Review',
    'Legislative Updates',
    'Legal Analysis',
    'Other'
  ];

  const handleSubmit = (e, status) => {
    e.preventDefault();
    // Here you would save to backend
    alert(`Insight ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
    navigate('/legal-expert/insights');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Publish Legal Insight" role="Legal Expert">
      {/* Back Button */}
      <button
        onClick={() => navigate('/legal-expert/insights')}
        className="flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Insights
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Publish New Legal Insight
        </h1>
        <p className="text-[#64748B]">Share your expert legal analysis with the community</p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-white rounded-xl p-8 border border-[#138808]/10"
      >
        <form onSubmit={(e) => handleSubmit(e, 'published')}>
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm text-[#0A1F44] mb-2">
              Insight Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a compelling title for your insight"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm text-[#0A1F44] mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent cursor-pointer"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm text-[#0A1F44] mb-2">
              Content *
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your detailed legal analysis and insights here..."
              rows="12"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent resize-vertical"
              required
            />
            <p className="text-xs text-[#64748B] mt-2">
              {formData.content.length} characters
            </p>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <label htmlFor="tags" className="block text-sm text-[#0A1F44] mb-2">
              Tags (Optional)
            </label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Enter tags separated by commas (e.g., Article 21, Supreme Court, Fundamental Rights)"
              className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#138808]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              className="flex-1 px-6 py-3 bg-[#F8FAFC] text-[#0A1F44] border border-[#138808]/20 rounded-lg hover:bg-[#138808]/5 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#138808] to-[#1ea712] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Publish Insight
            </button>
          </div>
        </form>
      </motion.div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 glass-white rounded-xl p-6 border border-[#FF9933]/20"
      >
        <h3 className="text-lg text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Publishing Guidelines
        </h3>
        <ul className="space-y-2 text-sm text-[#64748B]">
          <li className="flex items-start gap-2">
            <span className="text-[#FF9933] mt-1">•</span>
            <span>Ensure your analysis is based on verified legal sources and precedents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF9933] mt-1">•</span>
            <span>Cite relevant constitutional articles, case laws, and amendments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF9933] mt-1">•</span>
            <span>Write in clear, professional language accessible to legal professionals and citizens</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF9933] mt-1">•</span>
            <span>Review your content for accuracy before publishing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FF9933] mt-1">•</span>
            <span>Use appropriate tags to help users discover your insights</span>
          </li>
        </ul>
      </motion.div>
    </DashboardLayout>
  );
}
