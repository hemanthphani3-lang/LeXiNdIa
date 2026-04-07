import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useParams, useLocation } from 'react-router';
import { 
  ArrowLeft, Bookmark, Share2, Scale, BookOpen, Heart, Star,
  ChevronRight, FileText, Gavel, AlertCircle, LayoutDashboard, Bell, Settings,
  GraduationCap, Award
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { getArticlesByCategory } from '../utils/articlesData';

export default function ArticleView() {
  const { category } = useParams();
  const location = useLocation();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articlesData, setArticlesData] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Determine if we're in citizen portal
  const isCitizenPortal = location.pathname.startsWith('/citizen');

  useEffect(() => {
    if (category) {
      const data = getArticlesByCategory(category);
      setArticlesData(data);
      if (data && data.articles && data.articles.length > 0) {
        setSelectedArticle(data.articles[0]);
      }
    }
  }, [category]);

  const navigationItems = isCitizenPortal ? [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ] : [];

  const getCategoryIcon = (cat) => {
    const icons = {
      equality: Scale,
      freedom: BookOpen,
      exploitation: Heart,
      religion: Star,
      'cultural-educational': GraduationCap,
      'constitutional-remedies': Award
    };
    return icons[cat] || BookOpen;
  };

  const CategoryIcon = getCategoryIcon(category);

  const content = (
    <div className="min-h-screen bg-[#F8F9FA] ashoka-pattern">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to={isCitizenPortal ? "/citizen" : "/"}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          {articlesData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#FF9933]/20 flex items-center justify-center">
                  <CategoryIcon className="w-8 h-8 text-[#FF9933]" />
                </div>
                <div>
                  <h1 
                    className="text-4xl md:text-5xl text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {articlesData.title}
                  </h1>
                  <p className="text-white/80 text-lg mt-1">{articlesData.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {articlesData ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Article List */}
            <div className="lg:col-span-1">
              <div className="glass-white rounded-2xl p-6 sticky top-8">
                <h3 className="text-lg text-[#0A1F44] mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <FileText className="w-5 h-5 text-[#FF9933]" />
                  Articles
                </h3>
                <div className="space-y-2">
                  {articlesData.articles.map((article, index) => (
                    <button
                      key={article.number}
                      onClick={() => setSelectedArticle(article)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedArticle?.number === article.number
                          ? 'bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white shadow-lg'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#FF9933]/10 hover:text-[#FF9933]'
                      }`}
                    >
                      <div className="text-xs mb-1">Article {article.number}</div>
                      <div className={`text-sm line-clamp-2 ${
                        selectedArticle?.number === article.number ? 'text-white' : 'text-[#0A1F44]'
                      }`}>
                        {article.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {selectedArticle && (
                <motion.div
                  key={selectedArticle.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-white rounded-2xl p-8 md:p-12 shadow-xl"
                >
                  {/* Article Header */}
                  <div className="border-b border-[#E2E8F0] pb-6 mb-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-sm mb-4">
                          <FileText className="w-4 h-4" />
                          Article {selectedArticle.number}
                        </div>
                        <h2 
                          className="text-3xl md:text-4xl text-[#0A1F44] mb-3"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {selectedArticle.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-3 rounded-lg transition-all ${
                          isBookmarked 
                            ? 'bg-[#FF9933] text-white' 
                            : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#FF9933]/10 hover:text-[#FF9933]'
                        }`}
                      >
                        <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Full Constitutional Text */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-[#0A1F44]/5 to-[#1A3A6B]/5 rounded-xl border-l-4 border-[#FF9933]">
                    <div className="flex items-center gap-2 mb-4">
                      <Gavel className="w-5 h-5 text-[#FF9933]" />
                      <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Constitutional Text
                      </h3>
                    </div>
                    <p className="text-[#0A1F44] leading-relaxed text-lg italic">
                      "{selectedArticle.fullText}"
                    </p>
                  </div>

                  {/* Explanation */}
                  <div className="mb-8">
                    <h3 className="text-2xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Detailed Explanation
                    </h3>
                    <p className="text-[#64748B] leading-relaxed text-lg mb-6">
                      {selectedArticle.explanation}
                    </p>
                  </div>

                  {/* Key Points */}
                  {selectedArticle.keyPoints && selectedArticle.keyPoints.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-2xl text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Key Points
                      </h3>
                      <div className="space-y-3">
                        {selectedArticle.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                            <ChevronRight className="w-5 h-5 text-[#FF9933] flex-shrink-0 mt-0.5" />
                            <p className="text-[#64748B] leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Important Cases */}
                  {selectedArticle.importantCases && selectedArticle.importantCases.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-2xl text-[#0A1F44] mb-4 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                        <Scale className="w-6 h-6 text-[#FF9933]" />
                        Landmark Judgments
                      </h3>
                      <div className="space-y-4">
                        {selectedArticle.importantCases.map((caseItem, index) => (
                          <div key={index} className="p-6 bg-gradient-to-br from-[#138808]/5 to-[#1ea712]/5 rounded-xl border-l-4 border-[#138808]">
                            <p className="text-[#0A1F44] leading-relaxed">
                              <span className="text-[#138808]">•</span> {caseItem}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div className="mt-8 p-6 bg-gradient-to-br from-[#0A1F44]/5 to-[#1A3A6B]/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#0A1F44] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[#0A1F44] mb-2">Important Note</h4>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          This article is a fundamental right guaranteed by the Constitution of India. It is enforceable by courts and any violation can be challenged through legal remedies under Article 32 (Supreme Court) or Article 226 (High Courts).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-[#E2E8F0]">
                    <button className="px-6 py-3 bg-[#F8FAFC] text-[#64748B] rounded-lg hover:bg-[#FF9933]/10 hover:text-[#FF9933] transition-all flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </button>
                    <Link 
                      to={isCitizenPortal ? "/citizen/quiz/1" : "/quiz/1"}
                      className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#FFB366] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Test Your Knowledge
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#64748B]">Loading article...</p>
          </div>
        )}
      </div>
    </div>
  );

  // If in citizen portal, wrap with DashboardLayout
  if (isCitizenPortal) {
    return (
      <DashboardLayout navigationItems={navigationItems} title="Constitutional Articles" role="Citizen">
        {content}
      </DashboardLayout>
    );
  }

  // Otherwise, return content directly
  return content;
}