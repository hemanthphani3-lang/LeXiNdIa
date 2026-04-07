import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Calendar, FileText, Users, 
  MessageSquare, Settings, Bell, CheckCircle, Save, Eye, Upload, X, ArrowLeft
} from 'lucide-react';

export default function CreateContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'fundamental-rights',
    content: '',
    tags: [],
    status: 'draft'
  });
  const [currentTag, setCurrentTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/educator' },
    { label: 'Schedule Sessions', icon: Calendar, path: '/educator/sessions' },
    { label: 'Commentary', icon: FileText, path: '/educator/articles', active: true },
    { label: 'Quiz Creator', icon: CheckCircle, path: '/educator/quiz' },
    { label: 'Student Interaction', icon: Users, path: '/educator/students' },
    { label: 'Settings', icon: Settings, path: '/educator/settings' },
  ];

  const categories = [
    { value: 'fundamental-rights', label: 'Fundamental Rights' },
    { value: 'fundamental-duties', label: 'Fundamental Duties' },
    { value: 'directive-principles', label: 'Directive Principles' },
    { value: 'union-government', label: 'Union Government' },
    { value: 'state-government', label: 'State Government' },
    { value: 'amendments', label: 'Amendments' },
    { value: 'general', label: 'General Information' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async (status) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const article = {
      ...formData,
      status,
      createdAt: new Date().toISOString(),
      views: 0
    };
    
    // In a real app, this would save to backend/state management
    console.log('Saving commentary:', article);
    
    setIsSaving(false);
    alert(`Commentary ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
    
    if (status === 'published') {
      navigate('/educator/articles');
    }
  };

  const handlePreview = () => {
    alert('Preview functionality - would open in modal or new tab');
  };

  return (
    <DashboardLayout navigationItems={navigationItems} title="Create Content" role="Educator">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-white rounded-xl p-8 card-elevated"
      >
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/educator/articles')}
            className="flex items-center gap-2 text-[#FF9933] hover:text-[#E87F1F] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Commentary
          </button>
          <h2 className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create New Commentary
          </h2>
          <p className="text-[#64748B]">
            Share your insights and commentary about the Indian Constitution with students and citizens
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
              Commentary Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Analysis of Article 14: Equality Before Law"
              className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
              Commentary Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your commentary here... Provide detailed analysis and educational insights on constitutional concepts."
              rows={12}
              className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white resize-none"
              required
            />
            <p className="text-xs text-[#64748B] mt-2">
              {formData.content.length} characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm text-[#0A1F44] mb-2 font-medium">
              Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tags (press Enter)"
                className="flex-1 px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-3 bg-[#0A1F44] text-white rounded-lg hover:bg-[#1A3A6B] transition-colors"
              >
                Add Tag
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:bg-[#FF9933]/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-[#0A1F44]/10">
            <button
              type="button"
              onClick={handlePreview}
              className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave('draft')}
                disabled={isSaving || !formData.title || !formData.content}
                className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave('published')}
                disabled={isSaving || !formData.title || !formData.content}
                className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="w-5 h-5" />
                {isSaving ? 'Publishing...' : 'Publish Commentary'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}