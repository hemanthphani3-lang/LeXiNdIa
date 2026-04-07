import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { ArrowLeft, Calendar, FileText, Scale, TrendingUp, Shield } from 'lucide-react';

export default function AmendmentHistory() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const majorAmendments = [
    {
      number: 1,
      year: 1951,
      title: 'First Amendment',
      description: 'Added Ninth Schedule to protect land reform and other laws from judicial review. Modified Articles 15, 19, and 31.',
      significance: 'Introduced reasonable restrictions on fundamental rights to protect social welfare legislation.',
    },
    {
      number: 42,
      year: 1976,
      title: '42nd Amendment - "Mini Constitution"',
      description: 'Added Socialist, Secular, and Integrity to the Preamble. Added Fundamental Duties (Article 51A). Strengthened Directive Principles.',
      significance: 'Most comprehensive amendment, significantly altered the Constitution during Emergency period.',
    },
    {
      number: 44,
      year: 1978,
      title: '44th Amendment',
      description: 'Removed Right to Property from Fundamental Rights (converted to legal right under Article 300A). Restored some powers of Supreme Court and High Courts.',
      significance: 'Rolled back some provisions of 42nd Amendment and restored judicial independence.',
    },
    {
      number: 52,
      year: 1985,
      title: '52nd Amendment - Anti-Defection Law',
      description: 'Added Tenth Schedule containing provisions to disqualify members on ground of defection.',
      significance: 'Strengthened political stability by preventing party-switching by elected members.',
    },
    {
      number: 61,
      year: 1988,
      title: '61st Amendment',
      description: 'Reduced voting age from 21 to 18 years for Lok Sabha and State Legislative Assembly elections.',
      significance: 'Expanded democratic participation by giving voting rights to younger citizens.',
    },
    {
      number: 73,
      year: 1992,
      title: '73rd Amendment - Panchayati Raj',
      description: 'Provided constitutional status to Panchayati Raj Institutions. Added Part IX and Eleventh Schedule.',
      significance: 'Strengthened grassroots democracy and decentralized governance in rural areas.',
    },
    {
      number: 74,
      year: 1992,
      title: '74th Amendment - Municipalities',
      description: 'Provided constitutional status to urban local bodies. Added Part IXA and Twelfth Schedule.',
      significance: 'Established democratic framework for urban governance and development.',
    },
    {
      number: 86,
      year: 2002,
      title: '86th Amendment - Right to Education',
      description: 'Made education a Fundamental Right under Article 21A for children aged 6-14 years. Added Article 51A(k) - duty of parents to educate children.',
      significance: 'Recognized education as a fundamental right, ensuring free and compulsory education for children.',
    },
    {
      number: 91,
      year: 2003,
      title: '91st Amendment',
      description: 'Limited size of Council of Ministers to 15% of total strength of the House. Added provisions for Anti-Defection.',
      significance: 'Promoted efficient governance and limited ministerial appointments.',
    },
    {
      number: 97,
      year: 2011,
      title: '97th Amendment - Cooperative Societies',
      description: 'Added Article 43B - promotion of cooperative societies. Inserted Article 19(1)(c) - right to form cooperative societies.',
      significance: 'Gave constitutional status to cooperative societies for socio-economic development.',
    },
    {
      number: 101,
      year: 2016,
      title: '101st Amendment - GST',
      description: 'Introduced Goods and Services Tax. Added Article 246A and Part IXB. Subsumed multiple indirect taxes.',
      significance: 'Landmark tax reform creating "One Nation, One Tax" system for economic integration.',
    },
    {
      number: 102,
      year: 2018,
      title: '102nd Amendment',
      description: 'Granted constitutional status to National Commission for Backward Classes. Added Article 338B.',
      significance: 'Strengthened protection and welfare of socially and educationally backward classes.',
    },
    {
      number: 103,
      year: 2019,
      title: '103rd Amendment - EWS Reservation',
      description: 'Provided 10% reservation for Economically Weaker Sections (EWS) in education and employment.',
      significance: 'Extended affirmative action to economically disadvantaged sections of forward classes.',
    },
    {
      number: 104,
      year: 2019,
      title: '104th Amendment',
      description: 'Extended reservation for SCs and STs in Lok Sabha and State Assemblies by 10 years (till 2030).',
      significance: 'Continued political empowerment of historically marginalized communities.',
    },
    {
      number: 105,
      year: 2021,
      title: '105th Amendment',
      description: 'Restored power of states to identify and notify Socially and Educationally Backward Classes (SEBCs).',
      significance: 'Clarified federal distribution of powers regarding OBC identification and reservation.',
    },
  ];

  const amendmentStats = [
    { label: 'Total Amendments', value: '105+', icon: FileText },
    { label: 'Years Since Adoption', value: '74+', icon: Calendar },
    { label: 'Most Amendments', value: '1950s', icon: TrendingUp },
    { label: 'Latest Amendment', value: '2021', icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-white ashoka-bg">
      {/* Header */}
      <header className="bg-white border-b border-[#0A1F44]/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/"
            className="flex items-center gap-2 text-[#64748B] hover:text-[#0A1F44] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-5xl md:text-6xl text-[#0A1F44] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Amendment History
          </h1>
          <p className="text-xl text-[#64748B] max-w-3xl mx-auto leading-relaxed">
            Explore the evolution of the Indian Constitution through its amendments—each one reflecting 
            the changing needs and aspirations of our nation.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {amendmentStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-white rounded-2xl p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#E87F1F] flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#0A1F44] mb-2">{stat.value}</div>
                <div className="text-sm text-[#64748B]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-white rounded-2xl p-8 mb-12 shadow-lg"
        >
          <h2 
            className="text-3xl text-[#0A1F44] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Living Constitution
          </h2>
          <div className="text-[#64748B] leading-relaxed space-y-4">
            <p>
              The Indian Constitution is often described as a "living document" because it has the 
              ability to evolve with changing times while maintaining its core principles. Article 368 
              provides Parliament with the power to amend the Constitution through a special majority.
            </p>
            <p>
              Since its adoption on 26 January 1950, the Constitution has been amended over 100 times 
              to address emerging challenges, social reforms, and governance needs. These amendments 
              reflect India's journey as a democracy—adapting to socio-economic changes while 
              preserving constitutional values.
            </p>
            <p>
              The doctrine of Basic Structure, established in the landmark Kesavananda Bharati case (1973), 
              ensures that while the Constitution can be amended, its fundamental features cannot be destroyed.
            </p>
          </div>
        </motion.div>

        {/* Major Amendments Timeline */}
        <div className="mb-12">
          <h2 
            className="text-4xl text-[#0A1F44] mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Major Constitutional Amendments
          </h2>

          <div className="space-y-6">
            {majorAmendments.map((amendment, index) => (
              <motion.div
                key={amendment.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="glass-white rounded-2xl p-6 md:p-8 shadow-lg hover-lift"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Amendment Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0A1F44] to-[#1A3A6B] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-white/70 mb-1">Amendment</div>
                        <div className="text-2xl font-bold text-white">{amendment.number}</div>
                      </div>
                    </div>
                    <div className="text-center mt-2 text-sm text-[#64748B]">{amendment.year}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className="text-2xl text-[#0A1F44] mb-3"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {amendment.title}
                    </h3>
                    <p className="text-[#64748B] mb-4">
                      {amendment.description}
                    </p>
                    <div className="flex items-start gap-2">
                      <Scale className="w-5 h-5 text-[#FF9933] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#64748B] italic">
                        <strong className="text-[#0A1F44]">Significance:</strong> {amendment.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Amendment Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-white rounded-2xl p-8 shadow-lg"
        >
          <h2 
            className="text-3xl text-[#0A1F44] mb-6 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            How is the Constitution Amended?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#FF9933]">1</div>
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 font-semibold">Introduction</h4>
              <p className="text-sm text-[#64748B]">
                An amendment bill can be introduced in either House of Parliament
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#FF9933]">2</div>
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 font-semibold">Special Majority</h4>
              <p className="text-sm text-[#64748B]">
                Must be passed by each House with a special majority (2/3 present and voting, and absolute majority)
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#FF9933]/10 flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#FF9933]">3</div>
              </div>
              <h4 className="text-lg text-[#0A1F44] mb-2 font-semibold">President's Assent</h4>
              <p className="text-sm text-[#64748B]">
                After passage, the bill is sent to the President for assent (cannot withhold or return)
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-[#FF9933]/5 rounded-xl border border-[#FF9933]/20">
            <p className="text-sm text-[#64748B] leading-relaxed">
              <strong className="text-[#0A1F44]">Note:</strong> Some amendments affecting federal 
              structure (like distribution of powers, representation in Parliament, etc.) require 
              ratification by at least half of the state legislatures in addition to Parliament's approval.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}