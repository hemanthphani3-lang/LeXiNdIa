import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { Search, ArrowRight } from 'lucide-react';

export default function SearchBar({ role }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Define searchable features for each role
  const searchableFeatures = {
    admin: [
      { name: 'Dashboard', path: '/admin', keywords: ['home', 'overview', 'main'] },
      { name: 'Manage Users', path: '/admin/manage-users', keywords: ['users', 'accounts', 'members', 'people'] },
      { name: 'Manage Roles', path: '/admin/manage-roles', keywords: ['roles', 'permissions', 'access'] },
      { name: 'Content Approval', path: '/admin/content-approval', keywords: ['approve', 'review', 'pending', 'moderation'] },
      { name: 'Analytics', path: '/admin/analytics', keywords: ['statistics', 'stats', 'reports', 'data', 'metrics'] },
      { name: 'Active Articles', path: '/admin/active-articles', keywords: ['articles', 'content', 'posts', 'published'] },
      { name: 'Create Article', path: '/admin/create-article', keywords: ['write', 'new article', 'compose', 'add'] },
      { name: 'System Logs', path: '/admin/system-logs', keywords: ['logs', 'history', 'activity', 'audit'] },
      { name: 'Settings', path: '/admin/settings', keywords: ['configuration', 'preferences', 'options'] },
      { name: 'Profile', path: '/admin/profile', keywords: ['account', 'profile', 'personal'] },
    ],
    educator: [
      { name: 'Dashboard', path: '/educator', keywords: ['home', 'overview', 'main'] },
      { name: 'Create Content', path: '/educator/create', keywords: ['write', 'new', 'compose', 'add', 'article'] },
      { name: 'Schedule Sessions', path: '/educator/sessions', keywords: ['schedule', 'classes', 'sessions', 'calendar', 'meetings'] },
      { name: 'My Articles', path: '/educator/articles', keywords: ['articles', 'content', 'posts', 'writings'] },
      { name: 'Quiz Creator', path: '/educator/quiz', keywords: ['quiz', 'test', 'assessment', 'questions', 'exam'] },
      { name: 'Student Interaction', path: '/educator/students', keywords: ['students', 'learners', 'interactions', 'engagement'] },
      { name: 'Notifications', path: '/educator/notifications', keywords: ['notifications', 'alerts', 'messages'] },
      { name: 'Settings', path: '/educator/settings', keywords: ['configuration', 'preferences', 'options'] },
      { name: 'Profile', path: '/educator/profile', keywords: ['account', 'profile', 'personal'] },
    ],
    'legal-expert': [
      { name: 'Dashboard', path: '/legal-expert', keywords: ['home', 'overview', 'main'] },
      { name: 'Case Analysis', path: '/legal-expert/cases', keywords: ['cases', 'analysis', 'legal'] },
      { name: 'Legal Research', path: '/legal-expert/research', keywords: ['research', 'study', 'law'] },
      { name: 'Consultations', path: '/legal-expert/consultations', keywords: ['consultations', 'advisory', 'counsel'] },
      { name: 'Publications', path: '/legal-expert/publications', keywords: ['publications', 'articles', 'writings'] },
      { name: 'Profile', path: '/legal-expert/profile', keywords: ['account', 'profile', 'personal'] },
    ],
    citizen: [
      { name: 'Dashboard', path: '/citizen', keywords: ['home', 'overview', 'main'] },
      { name: 'Learn Constitution', path: '/citizen/learn', keywords: ['learn', 'education', 'study'] },
      { name: 'Take Quiz', path: '/citizen/quiz', keywords: ['quiz', 'test', 'assessment'] },
      { name: 'Discussion Forum', path: '/forum', keywords: ['forum', 'discussion', 'community', 'chat'] },
      { name: 'My Progress', path: '/citizen/progress', keywords: ['progress', 'achievements', 'track'] },
      { name: 'Profile', path: '/citizen/profile', keywords: ['account', 'profile', 'personal'] },
    ],
  };

  // Get features for current role
  const features = searchableFeatures[role] || [];

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = features.filter(feature => 
        feature.name.toLowerCase().includes(query) ||
        feature.keywords.some(keyword => keyword.includes(query))
      );
      setResults(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, role]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0].path);
    }
  };

  return (
    <div ref={searchRef} className="relative hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
        <input
          type="text"
          placeholder="Search features..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim() && results.length > 0 && setIsOpen(true)}
          className="pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] w-64"
        />
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 glass-white rounded-xl shadow-2xl border border-[#0A1F44]/10 overflow-hidden z-50"
          >
            <div className="p-2 border-b border-[#0A1F44]/10">
              <p className="text-xs text-[#64748B] px-3 py-2">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F8F9FA] transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9933]/20 to-[#0A1F44]/20 flex items-center justify-center">
                      <Search className="w-4 h-4 text-[#0A1F44]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0A1F44]">{result.name}</p>
                      <p className="text-xs text-[#64748B]">{result.path}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
