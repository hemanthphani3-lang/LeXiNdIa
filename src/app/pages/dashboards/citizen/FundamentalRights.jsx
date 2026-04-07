import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import DashboardLayout from '../../../components/DashboardLayout';
import { 
  LayoutDashboard, BookOpen, Scale, Heart, Settings, Bell, 
  Bookmark, ChevronRight, Shield, Star, FileText, Users, 
  GraduationCap, Building, Award, X
} from 'lucide-react';

export default function FundamentalRights() {
  const [showGuarantee, setShowGuarantee] = useState(false);
  const [showProtection, setShowProtection] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/citizen' },
    { label: 'Explore Constitution', icon: BookOpen, path: '/citizen/explore' },
    { label: 'Fundamental Rights', icon: Scale, path: '/citizen/rights', active: true },
    { label: 'Fundamental Duties', icon: Heart, path: '/citizen/duties' },
    { label: 'Bookmarks', icon: Bookmark, path: '/citizen/bookmarks' },
    { label: 'Notifications', icon: Bell, path: '/citizen/notifications' },
    { label: 'Settings', icon: Settings, path: '/citizen/settings' },
  ];

  const fundamentalRightsCategories = [
    {
      id: 'equality',
      title: 'Right to Equality',
      articles: 'Articles 14-18',
      description: 'Guarantees equal treatment and prohibits discrimination on grounds of religion, race, caste, sex or place of birth',
      icon: Scale,
      color: 'from-[#FF9933] to-[#FFB366]',
      keyPoints: [
        'Equality before law',
        'Prohibition of discrimination',
        'Equality of opportunity in public employment',
        'Abolition of untouchability',
        'Abolition of titles'
      ]
    },
    {
      id: 'freedom',
      title: 'Right to Freedom',
      articles: 'Articles 19-22',
      description: 'Protects individual freedoms including speech, assembly, association, movement, residence, and profession',
      icon: BookOpen,
      color: 'from-[#0A1F44] to-[#1A3A6B]',
      keyPoints: [
        'Freedom of speech and expression',
        'Freedom to assemble peacefully',
        'Freedom to form associations',
        'Freedom of movement and residence',
        'Freedom to practice any profession',
        'Protection against arbitrary arrest'
      ]
    },
    {
      id: 'exploitation',
      title: 'Right Against Exploitation',
      articles: 'Articles 23-24',
      description: 'Prohibits human trafficking, forced labor, and employment of children in hazardous work',
      icon: Shield,
      color: 'from-[#138808] to-[#1ea712]',
      keyPoints: [
        'Prohibition of traffic in human beings',
        'Prohibition of forced labor (begar)',
        'Prohibition of child labor in factories and mines',
        'Protection from exploitation'
      ]
    },
    {
      id: 'religion',
      title: 'Right to Freedom of Religion',
      articles: 'Articles 25-28',
      description: 'Ensures freedom of conscience and the right to profess, practice and propagate religion',
      icon: Star,
      color: 'from-[#1A3A6B] to-[#2A4A7B]',
      keyPoints: [
        'Freedom of conscience and religion',
        'Freedom to manage religious affairs',
        'Freedom from religious taxation',
        'Freedom from religious instruction in state institutions'
      ]
    },
    {
      id: 'cultural-educational',
      title: 'Cultural and Educational Rights',
      articles: 'Articles 29-30',
      description: 'Protects the rights of minorities to preserve their language, script, and culture, and to establish educational institutions',
      icon: GraduationCap,
      color: 'from-[#FF9933] to-[#FFB366]',
      keyPoints: [
        'Protection of interests of minorities',
        'Right to conserve distinct language, script or culture',
        'Right to establish and administer educational institutions',
        'No discrimination in state-aided institutions'
      ]
    },
    {
      id: 'constitutional-remedies',
      title: 'Right to Constitutional Remedies',
      articles: 'Article 32',
      description: 'Provides the right to move the Supreme Court for enforcement of fundamental rights through writs',
      icon: Award,
      color: 'from-[#138808] to-[#1ea712]',
      keyPoints: [
        'Right to move Supreme Court for enforcement',
        'Power to issue writs (Habeas Corpus, Mandamus, etc.)',
        'Supreme Court as guardian of fundamental rights',
        'Cannot be suspended except during emergency'
      ]
    }
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Fundamental Rights" role="Citizen">
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
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 
                className="text-3xl md:text-4xl text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Fundamental Rights
              </h1>
              <p className="text-white/80 text-lg">Articles 12-35 of the Indian Constitution • 6 Categories</p>
            </div>
          </div>
          <p className="text-white/90 text-lg max-w-3xl">
            Fundamental Rights are the basic human rights enshrined in the Constitution of India which are guaranteed to all citizens. They are enforceable by the courts, subject to specific restrictions.
          </p>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl text-[#0A1F44] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Six Categories of Fundamental Rights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {fundamentalRightsCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link to={`/citizen/rights/${category.id}`} key={category.id} state={{ from: '/citizen/rights' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="glass-white rounded-xl p-6 md:p-8 hover-lift card-elevated cursor-pointer group h-full"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#0A1F44] mb-1 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {category.title}
                      </h3>
                      <p className="text-sm text-[#FF9933]">{category.articles}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#64748B] group-hover:text-[#FF9933] group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <p className="text-[#64748B] mb-4">{category.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-[#0A1F44] font-semibold">Key Features:</p>
                    <ul className="space-y-1">
                      {category.keyPoints.slice(0, 3).map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#64748B]">
                          <span className="text-[#FF9933] mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Information Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div 
          onClick={() => setShowGuarantee(true)}
          className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF9933] to-[#FFB366] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#FF9933] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Constitutional Guarantee
              </h3>
              <p className="text-sm text-[#64748B] mb-3">
                Understand how the Constitution guarantees and protects your Fundamental Rights
              </p>
              <div className="flex items-center gap-2 text-[#FF9933] text-sm">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setShowProtection(true)}
          className="glass-white rounded-xl p-6 hover-lift card-elevated cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#0A1F44] mb-2 group-hover:text-[#0A1F44]/70 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Legal Protection
              </h3>
              <p className="text-sm text-[#64748B] mb-3">
                Learn about judicial remedies and enforcement mechanisms for Fundamental Rights
              </p>
              <div className="flex items-center gap-2 text-[#0A1F44] text-sm">
                Learn More
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Constitutional Guarantee Modal */}
      {showGuarantee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Constitutional Guarantee of Fundamental Rights
              </h2>
              <button
                onClick={() => setShowGuarantee(false)}
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Part III: Fundamental Rights
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Part III of the Indian Constitution (Articles 12-35) contains the Fundamental Rights that are guaranteed 
                  to all citizens of India. These rights are justiciable, meaning they are enforceable by courts of law. 
                  The Constitution provides that if any law violates fundamental rights, it can be declared void by the courts.
                </p>
                <p className="text-[#64748B] leading-relaxed">
                  The guarantee of fundamental rights is one of the basic features of the Indian Constitution and cannot be 
                  taken away even by constitutional amendment. The Supreme Court in the Kesavananda Bharati case (1973) 
                  established the doctrine of "Basic Structure," which protects fundamental rights from arbitrary amendments.
                </p>
              </div>

              <div className="bg-[#FF9933]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Constitutional Protection Mechanisms
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-[#0A1F44]">Justiciability:</strong>
                      <p className="text-[#64748B] text-sm mt-1">
                        Fundamental Rights are justiciable, meaning they can be enforced through courts. If any law or 
                        executive action violates these rights, citizens can approach the Supreme Court (Article 32) or 
                        High Courts (Article 226) for remedy.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-[#0A1F44]">Supremacy of Constitution:</strong>
                      <p className="text-[#64748B] text-sm mt-1">
                        The Constitution is the supreme law of the land. Any law, whether made by Parliament or State 
                        Legislatures, that violates fundamental rights can be declared unconstitutional and void by the courts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-[#0A1F44]">Judicial Review:</strong>
                      <p className="text-[#64748B] text-sm mt-1">
                        The power of judicial review enables courts to examine the constitutional validity of laws and 
                        executive actions. This power is derived from the Constitution itself and acts as a check on the 
                        legislature and executive.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <div>
                      <strong className="text-[#0A1F44]">Basic Structure Doctrine:</strong>
                      <p className="text-[#64748B] text-sm mt-1">
                        The Supreme Court has held that fundamental rights are part of the basic structure of the Constitution 
                        and cannot be destroyed or emasculated even by constitutional amendment. This provides the highest 
                        level of protection.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Scope and Limitations
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  While fundamental rights are guaranteed by the Constitution, they are not absolute. The Constitution itself 
                  provides for reasonable restrictions on certain rights in the interest of:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFC] rounded-lg p-4">
                    <h5 className="text-[#0A1F44] mb-2 font-semibold">Permissible Restrictions:</h5>
                    <ul className="space-y-1 text-sm text-[#64748B]">
                      <li>• Sovereignty and integrity of India</li>
                      <li>• Security of the State</li>
                      <li>• Public order, decency, and morality</li>
                      <li>• Friendly relations with foreign states</li>
                      <li>• Contempt of court and defamation</li>
                    </ul>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-lg p-4">
                    <h5 className="text-[#0A1F44] mb-2 font-semibold">Test of Reasonableness:</h5>
                    <ul className="space-y-1 text-sm text-[#64748B]">
                      <li>• Restrictions must be reasonable</li>
                      <li>• Must be in public interest</li>
                      <li>• Proportionate to the objective</li>
                      <li>• Not arbitrary or excessive</li>
                      <li>• Subject to judicial review</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Suspension During Emergency
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Article 359 provides that during a national emergency proclaimed under Article 352, the President can 
                  suspend the right to move any court for the enforcement of fundamental rights. However:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      Rights under Articles 20 and 21 (protection against conviction and right to life) cannot be suspended 
                      even during emergency (as per 44th Amendment, 1978)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      The suspension order must be laid before both Houses of Parliament
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      The suspension ceases to operate when the emergency is revoked
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#0A1F44]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  International Recognition
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  The fundamental rights guaranteed by the Indian Constitution are in conformity with the Universal 
                  Declaration of Human Rights (UDHR) adopted by the United Nations in 1948. India is also a signatory 
                  to various international human rights conventions, making these rights not just constitutional 
                  guarantees but also international obligations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Legal Protection Modal */}
      {showProtection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#E2E8F0] p-6 flex items-center justify-between">
              <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Legal Protection and Enforcement of Fundamental Rights
              </h2>
              <button
                onClick={() => setShowProtection(false)}
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#64748B]" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Article 32: Right to Constitutional Remedies
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Article 32 is called the "heart and soul" of the Constitution by Dr. B.R. Ambedkar. It guarantees the 
                  right to move the Supreme Court for enforcement of fundamental rights. Without this right, fundamental 
                  rights would be meaningless. Article 32 itself is a fundamental right and provides for:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Direct Access to Supreme Court:</strong> Citizens can directly approach the Supreme Court 
                      if their fundamental rights are violated, without going through lower courts
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Power to Issue Writs:</strong> The Supreme Court can issue various types of writs for 
                      enforcement of fundamental rights
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Guaranteed Remedy:</strong> The Supreme Court is bound to protect fundamental rights and 
                      cannot refuse to entertain such petitions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#0A1F44]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Five Types of Writs
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[#0A1F44] font-semibold mb-2">1. Habeas Corpus ("To Have the Body")</h5>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                      This writ is issued to produce a person who has been detained, whether in prison or in private custody, 
                      before a court. It is issued to release a person who is illegally detained.
                    </p>
                    <p className="text-[#64748B] text-sm">
                      <strong>Purpose:</strong> Protection against illegal detention and imprisonment
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[#0A1F44] font-semibold mb-2">2. Mandamus ("We Command")</h5>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                      This writ is issued to command a public authority or government to perform a duty which they are 
                      legally bound to perform but have failed to do so. It can be issued against public officials, 
                      tribunals, and local authorities.
                    </p>
                    <p className="text-[#64748B] text-sm">
                      <strong>Purpose:</strong> To enforce performance of public duties
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[#0A1F44] font-semibold mb-2">3. Prohibition</h5>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                      This writ is issued by a superior court to an inferior court or tribunal to prevent it from exceeding 
                      its jurisdiction or acting contrary to the rules of natural justice. It is issued before the proceedings 
                      are completed.
                    </p>
                    <p className="text-[#64748B] text-sm">
                      <strong>Purpose:</strong> To prevent judicial and quasi-judicial authorities from exceeding their jurisdiction
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[#0A1F44] font-semibold mb-2">4. Certiorari ("To Be Certified")</h5>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                      This writ is issued to quash the order or decision of an inferior court, tribunal, or quasi-judicial 
                      authority that has acted without or in excess of its jurisdiction, or has violated natural justice. 
                      Unlike prohibition, it is issued after the decision is made.
                    </p>
                    <p className="text-[#64748B] text-sm">
                      <strong>Purpose:</strong> To correct errors of jurisdiction by inferior courts
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[#0A1F44] font-semibold mb-2">5. Quo Warranto ("By What Authority")</h5>
                    <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                      This writ is issued to inquire into the legality of the claim of a person to a public office. It 
                      prevents illegal usurpation of public office by a person. The office must be public, substantive, 
                      and created by statute or Constitution.
                    </p>
                    <p className="text-[#64748B] text-sm">
                      <strong>Purpose:</strong> To prevent illegal assumption of public office
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Article 226: High Court's Power
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Article 226 empowers High Courts to issue writs for enforcement of fundamental rights and also for any 
                  other purpose (not limited to fundamental rights). The scope of Article 226 is wider than Article 32.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F8FAFC] rounded-lg p-4">
                    <h5 className="text-[#0A1F44] mb-2 font-semibold">Article 32 (Supreme Court)</h5>
                    <ul className="space-y-1 text-sm text-[#64748B]">
                      <li>• Only for fundamental rights</li>
                      <li>• Itself a fundamental right</li>
                      <li>• Guaranteed remedy</li>
                      <li>• Cannot be taken away</li>
                      <li>• Highest appellate forum</li>
                    </ul>
                  </div>
                  <div className="bg-[#F8FAFC] rounded-lg p-4">
                    <h5 className="text-[#0A1F44] mb-2 font-semibold">Article 226 (High Court)</h5>
                    <ul className="space-y-1 text-sm text-[#64748B]">
                      <li>• For fundamental rights and other purposes</li>
                      <li>• Not a fundamental right</li>
                      <li>• Discretionary power</li>
                      <li>• Wider territorial jurisdiction</li>
                      <li>• More accessible to citizens</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Public Interest Litigation (PIL)
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Public Interest Litigation is a significant development in Indian jurisprudence. It allows any public-spirited 
                  citizen or organization to file a petition in the Supreme Court or High Court seeking judicial intervention 
                  for protection of public interest or rights of marginalized groups.
                </p>
                <div className="space-y-3">
                  <div className="bg-[#FF9933]/10 rounded-lg p-4">
                    <h5 className="text-[#0A1F44] mb-2">Key Features of PIL:</h5>
                    <ul className="space-y-2 text-sm text-[#64748B]">
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF9933]">•</span>
                        <span>Can be filed by any citizen or organization on behalf of those who cannot approach courts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF9933]">•</span>
                        <span>Relaxation of locus standi (legal standing) requirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF9933]">•</span>
                        <span>Can be initiated even through a postcard or letter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF9933]">•</span>
                        <span>Courts take an activist role in protecting rights of marginalized</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#FF9933]">•</span>
                        <span>Helps in enforcing fundamental rights of poor and disadvantaged sections</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg text-[#0A1F44] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Judicial Activism and Fundamental Rights
                </h3>
                <p className="text-[#64748B] leading-relaxed mb-4">
                  Indian courts, particularly the Supreme Court, have played an active role in protecting and expanding 
                  fundamental rights through judicial activism. This includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Expanding scope of Article 21:</strong> Right to life has been interpreted to include 
                      right to livelihood, education, privacy, clean environment, speedy trial, legal aid, and many more
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Protection against arbitrary State action:</strong> Courts have struck down laws and 
                      executive actions that violate fundamental rights
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Balancing individual rights with public interest:</strong> Courts have developed tests 
                      of reasonableness and proportionality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A1F44] mt-2 flex-shrink-0"></span>
                    <span className="text-[#64748B]">
                      <strong>Reading down and reading up provisions:</strong> To make laws constitutional and 
                      protect rights while maintaining legislative intent
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#138808]/10 rounded-xl p-6">
                <h4 className="text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Landmark Judgments
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  Several landmark Supreme Court judgments have strengthened the protection of fundamental rights:
                </p>
                <ul className="space-y-2 text-sm text-[#64748B]">
                  <li>• <strong>Maneka Gandhi v. Union of India (1978):</strong> Expanded the scope of Article 21</li>
                  <li>• <strong>Kesavananda Bharati v. State of Kerala (1973):</strong> Established basic structure doctrine</li>
                  <li>• <strong>Vishaka v. State of Rajasthan (1997):</strong> Guidelines for prevention of sexual harassment</li>
                  <li>• <strong>K.S. Puttaswamy v. Union of India (2017):</strong> Right to privacy as fundamental right</li>
                  <li>• <strong>Navtej Singh Johar v. Union of India (2018):</strong> Decriminalized homosexuality</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
}
