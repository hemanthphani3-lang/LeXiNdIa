import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { 
  ArrowLeft, Bookmark, Share2, BookOpen, Heart, Scale, Star,
  Eye, ThumbsUp, Clock, User, LayoutDashboard, Bell, Settings
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { fundamentalRightsArticles, directivePrinciplesArticles, unionGovernmentArticles } from '../data/constitutionalData';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Get the "from" path from location state, default to dashboard
  const fromPath = location.state?.from || '/citizen';

  // Scroll to top on mount and simulate loading
  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  // Determine article type and find article
  let article = null;
  let articleType = 'rights';
  let backButtonLabel = 'Back to Dashboard';

  if (id.startsWith('dpsp-')) {
    const articleNum = id.replace('dpsp-', '');
    article = directivePrinciplesArticles.find(a => a.number.toString() === articleNum);
    articleType = 'dpsp';
    backButtonLabel = 'Back to Directive Principles';
  } else if (id.startsWith('union-')) {
    const articleNum = id.replace('union-', '');
    article = unionGovernmentArticles.find(a => a.number.toString() === articleNum);
    articleType = 'union';
    backButtonLabel = 'Back to Union Government';
  } else {
    article = fundamentalRightsArticles.find(a => a.number.toString() === id);
    articleType = 'rights';
    backButtonLabel = 'Back';
  }

  // Handle share functionality
  const handleShare = async () => {
    if (!article) return;
    
    const shareData = {
      title: article.title,
      text: `Article ${article.number}: ${article.title} - Indian Constitution`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (err) {
      // User cancelled share or error occurred
      console.log('Share cancelled or failed');
    }
  };

  if (loading) {
    return (
      <DashboardLayout navigationItems={navigationItems} title="Loading..." role="Citizen">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#64748B]">Loading article...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!article) {
    return (
      <DashboardLayout navigationItems={navigationItems} title="Article Not Found" role="Citizen">
        <div className="text-center py-16">
          <h2 className="text-2xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Article Not Found
          </h2>
          <p className="text-[#64748B] mb-6">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(fromPath)}
            className="px-6 py-3 bg-[#FF9933] text-white rounded-lg hover:bg-[#E87F1F] transition-all"
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout navigationItems={navigationItems} title={`Article ${article.number}`} role="Citizen">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate(fromPath)}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#FF9933] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backButtonLabel}
        </button>
      </motion.div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-white rounded-xl p-8 mb-6"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                {article.number}
              </span>
            </div>
            <div className="flex-1">
              {article.category && (
                <span className="px-4 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-sm mb-3 inline-block">
                  {article.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                Article {article.number}: {article.title}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-3 rounded-lg bg-[#F1F5F9] hover:bg-[#FF9933]/10 text-[#64748B] hover:text-[#FF9933] transition-all relative"
            >
              <Share2 className="w-5 h-5" />
              {shareSuccess && (
                <span className="absolute -bottom-8 right-0 text-xs text-[#138808] whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-3 rounded-lg transition-all ${
                isBookmarked 
                  ? 'bg-[#FF9933] text-white' 
                  : 'bg-[#F1F5F9] hover:bg-[#FF9933]/10 text-[#64748B] hover:text-[#FF9933]'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Full Text */}
        <div className="bg-[#F8FAFC] border-l-4 border-[#FF9933] rounded-r-lg p-6 mb-6">
          <h3 className="text-sm text-[#64748B] mb-2">CONSTITUTIONAL TEXT</h3>
          <p className="text-[#0A1F44] leading-relaxed italic">
            "{article.fullText}"
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-6">
          <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Explanation
          </h3>
          <p className="text-[#64748B] leading-relaxed">
            {article.explanation}
          </p>
        </div>

        {/* Key Points */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Key Points
            </h3>
            <ul className="space-y-3">
              {article.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-[#64748B] flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Important Cases */}
        {article.importantCases && article.importantCases.length > 0 && (
          <div>
            <h3 className="text-lg text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Landmark Cases
            </h3>
            <div className="space-y-3">
              {article.importantCases.map((caseItem, index) => (
                <div key={index} className="bg-[#F8FAFC] rounded-lg p-4">
                  <p className="text-[#0A1F44] text-sm">{caseItem}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Related Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Continue Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/citizen/quiz/1')}
            className="glass-white rounded-xl p-6 hover-lift card-elevated text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#138808] to-[#1DB010] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-[#0A1F44] mb-1 group-hover:text-[#138808] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Test Your Knowledge
                </h4>
                <p className="text-sm text-[#64748B]">Take a quiz on this topic</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/citizen/explore')}
            className="glass-white rounded-xl p-6 hover-lift card-elevated text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-[#0A1F44] mb-1 group-hover:text-[#0A1F44]/70 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Explore More
                </h4>
                <p className="text-sm text-[#64748B]">Discover more articles</p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
