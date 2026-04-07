import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, ChevronRight, Shield, Users, Flag, Leaf, Book, 
  Building, Lightbulb, GraduationCap, History, Scale as BalanceScale, X
} from 'lucide-react';
import { fundamentalDuties as dutiesData } from '../../../data/constitutionalData';

export default function FundamentalDuties() {
  const [selectedDuty, setSelectedDuty] = useState(null);
  const [showHistoricalContext, setShowHistoricalContext] = useState(false);
  const [showLegalStatus, setShowLegalStatus] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights' },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties', active: true },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const dutyIcons = [Flag, Heart, Users, Shield, Users, Book, Leaf, Lightbulb, Building, GraduationCap, GraduationCap];
  const dutyColors = [
    'from-[#FF9933] to-[#FFB366]',
    'from-[#0A1F44] to-[#1A3A6B]',
    'from-[#138808] to-[#1ea712]',
    'from-[#1A3A6B] to-[#2A4A7B]',
    'from-[#FF9933] to-[#FFB366]',
    'from-[#138808] to-[#1ea712]',
    'from-[#0A1F44] to-[#1A3A6B]',
    'from-[#FF9933] to-[#FFB366]',
    'from-[#138808] to-[#1ea712]',
    'from-[#0A1F44] to-[#1A3A6B]',
    'from-[#FF9933] to-[#FFB366]'
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Fundamental Duties" role="Citizen">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-8 bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] rounded-2xl text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-3xl md:text-4xl text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Fundamental Duties
              </h1>
              <p className="text-white/80 text-lg">Article 51A of the Indian Constitution • 11 Duties</p>
            </div>
          </div>
          <p className="text-white/90 text-lg max-w-3xl">
            Fundamental Duties are moral obligations of all citizens to help promote a spirit of patriotism and to uphold the unity of India. They were added to the Constitution by the 42nd Amendment in 1976.
          </p>
        </div>
      </motion.div>

      {/* Duties Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {dutiesData.map((duty, index) => {
          const Icon = dutyIcons[index];
          return (
            <motion.div
              key={duty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              onClick={() => setSelectedDuty(duty)}
              className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${dutyColors[index]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full text-xs">
                  Duty {duty.id}
                </span>
              </div>
              <p className="text-sm text-[#0A1F44] mb-2 line-clamp-3 group-hover:text-[#FF9933] transition-colors">
                {duty.duty}
              </p>
              <div className="flex items-center gap-2 text-[#FF9933] text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all">
                View Details
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Information Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div 
          onClick={() => setShowHistoricalContext(true)}
          className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
              <History className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Historical Context
              </h3>
              <p className="text-sm text-[#64748B] mb-3">
                Learn about the origin and development of Fundamental Duties in the Indian Constitution
              </p>
              <div className="flex items-center gap-2 text-[#FF9933] text-sm">
                Read More
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setShowLegalStatus(true)}
          className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center flex-shrink-0">
              <BalanceScale className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#0A1F44]/70 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Legal Status
              </h3>
              <p className="text-sm text-[#64748B] mb-3">
                Understand the legal enforceability and significance of Fundamental Duties
              </p>
              <div className="flex items-center gap-2 text-[#0A1F44] text-sm">
                Read More
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Duty Detail Modal */}
      {selectedDuty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Fundamental Duty {selectedDuty.id}
              </h2>
              <button
                onClick={() => setSelectedDuty(null)}
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6">
              <div className="bg-[#F8FAFC] border-l-4 border-[#FF9933] rounded-r-lg p-6 mb-6">
                <h3 className="text-sm text-[#64748B] mb-2">THE DUTY</h3>
                <p className="text-[#0A1F44] leading-relaxed">
                  {selectedDuty.duty}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Detailed Explanation
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {selectedDuty.description}
                </p>
              </div>

              <div className="bg-[#FF9933]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Why This Matters
                </h4>
                <p className="text-sm text-[#64748B]">
                  This duty contributes to nation-building and promotes social harmony. While not legally enforceable, 
                  it serves as a moral compass for all citizens to contribute to India's progress and unity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Historical Context Modal */}
      {showHistoricalContext && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Historical Context of Fundamental Duties
              </h2>
              <button
                onClick={() => setShowHistoricalContext(false)}
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Origin and Background
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Fundamental Duties were not part of the original Constitution when it was adopted in 1950. They were 
                  added later through the 42nd Amendment Act of 1976, based on the recommendations of the Swaran Singh Committee.
                </p>
                <p className="text-[#64748B] leading-relaxed">
                  The concept was inspired by the Constitution of the erstwhile USSR (Soviet Union), which also contained 
                  a chapter on fundamental duties of citizens. The idea was to emphasize that citizens not only enjoy rights 
                  but also have certain responsibilities towards the nation.
                </p>
              </div>

              <div className="bg-[#FF9933]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The 42nd Amendment (1976)
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  Initially, 10 fundamental duties were added to the Constitution. The Amendment inserted a new Article 51A 
                  in Part IV-A of the Constitution.
                </p>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  The 11th duty relating to providing education opportunities to children was added later by the 86th 
                  Constitutional Amendment Act, 2002.
                </p>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Swaran Singh Committee
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  The committee was constituted by the Congress Party in 1976 under the chairmanship of Sardar Swaran Singh. 
                  It recommended the inclusion of a separate chapter on fundamental duties in the Constitution. The committee 
                  observed that the Constitution provided for rights but was silent on the duties of citizens.
                </p>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Purpose and Rationale
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">To serve as a reminder to citizens that while enjoying rights, they also have certain duties towards the nation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">To promote patriotism and uphold the unity of India</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">To help the courts in examining and determining the constitutional validity of laws</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">To educate citizens about their moral obligations to the nation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Legal Status Modal */}
      {showLegalStatus && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Legal Status of Fundamental Duties
              </h2>
              <button
                onClick={() => setShowLegalStatus(false)}
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Non-Justiciable Nature
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Unlike Fundamental Rights, Fundamental Duties are not legally enforceable. This means that there is no legal 
                  penalty for their violation, and citizens cannot be prosecuted or punished for not performing these duties.
                </p>
                <p className="text-[#64748B] leading-relaxed">
                  The Constitution does not provide for any direct judicial remedy in case of their violation. They are moral 
                  and civic obligations rather than legal obligations.
                </p>
              </div>

              <div className="bg-[#0A1F44]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Constitutional Position
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  Fundamental Duties are contained in Article 51A of Part IV-A of the Indian Constitution. Unlike Part III 
                  (Fundamental Rights) which is justiciable, Part IV-A does not have the same legal enforceability.
                </p>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  However, the Supreme Court has held that while fundamental duties are not enforceable, they can be taken 
                  into account by courts while interpreting laws and the Constitution.
                </p>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Significance and Impact
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Moral and Civic Obligations:</strong> They serve as reminders of the moral responsibility of 
                      citizens towards the nation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Aid to Judicial Interpretation:</strong> Courts can use them while interpreting the scope and 
                      constitutionality of laws
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Balance Rights and Duties:</strong> They provide a balance to the rights conferred upon citizens
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Educational Value:</strong> They help in creating awareness among citizens about their 
                      responsibilities
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Judicial Approach
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  The Supreme Court in several cases has emphasized the importance of fundamental duties. In the AIIMS Students' 
                  Union case (2001), the Court held that fundamental duties must be given importance while interpreting the 
                  Constitution.
                </p>
                <p className="text-[#64748B] leading-relaxed">
                  The Court has also observed that Article 51A can be used to test the constitutional validity of laws. If a 
                  law is inconsistent with fundamental duties, it may be struck down as unconstitutional.
                </p>
              </div>

              <div className="bg-[#FF9933]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Key Difference from Rights
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  While Fundamental Rights are enforceable in courts under Article 32 and 226, Fundamental Duties have no 
                  such enforcement mechanism. However, this doesn't diminish their importance in nation-building and promoting 
                  responsible citizenship.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
