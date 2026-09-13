import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubsidiaryCompany } from '../../types';
import {
  Building2,
  ShieldCheck,
  Sparkles,
  Users,
  Camera,
  ExternalLink,
  Phone,
  Mail,
  CheckCircle2,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  X,
  Calendar,
  Award,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SubsidiariesSection: React.FC = () => {
  const { lang, subsidiaries, subsidiaryCategories, setActiveSubsidiaryView, openQuoteWithCategory } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSub, setSelectedSub] = useState<SubsidiaryCompany | null>(null);

  const filteredSubsidiaries = activeCategory === 'all'
    ? subsidiaries
    : subsidiaries.filter((s) => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#C9A961]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#C9A961]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#C9A961]" />;
      case 'Camera': return <Camera className="w-6 h-6 text-[#C9A961]" />;
      default: return <Building2 className="w-6 h-6 text-[#C9A961]" />;
    }
  };

  return (
    <section id="subsidiaries" className="py-24 relative bg-slate-100 dark:bg-[#060D17] text-slate-900 dark:text-slate-100 overflow-hidden border-t border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 theme-subsidiaries-bg">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/30 text-[#C9A961] text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-4 h-4 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'منظومة حارس ونقاء القابضة' : 'Hares & Niqaa Group Portfolio'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'مجموعة شركاتنا التابعة والمتخصصة' : 'Our Specialized Subsidiary Companies'}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'ar'
              ? 'تضم مجموعتنا شركات رائدة متخصصة توفر تغطية شاملة وحلولاً متكاملة في مجالات الحراسة الأمنية، النظافة الصناعية، إدارة الحشود، وأنظمة الذكاء الاصطناعي.'
              : 'Our enterprise group encompasses specialized leaders delivering end-to-end security, industrial hygiene, crowd logistics, and AI CCTV systems.'}
          </p>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {subsidiaryCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${
                activeCategory === tab.id
                  ? 'gold-gradient-bg text-[#0B1929] border-[#C9A961] shadow-lg shadow-[#C9A961]/20 scale-105'
                  : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#C9A961]/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'ar' ? tab.nameAr : tab.nameEn}
            </button>
          ))}
        </div>

        {/* Subsidiaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredSubsidiaries.map((sub, idx) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-[#C9A961]/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A961]/10 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 flex items-center justify-center group-hover:border-[#C9A961] transition-all overflow-hidden shrink-0">
                      {sub.logoUrl ? (
                        <img src={sub.logoUrl} alt={sub.nameAr} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        getIcon(sub.iconName)
                      )}
                    </div>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#C9A961]/15 text-[#C9A961] text-[11px] font-bold border border-[#C9A961]/30 mb-1">
                        {lang === 'ar' ? sub.badgeAr || 'شركة تابعة' : sub.badgeEn || 'Subsidiary'}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors">
                        {lang === 'ar' ? sub.nameAr : sub.nameEn}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700/50">
                    Est. {sub.establishedYear}
                  </span>
                </div>

                {/* Tagline & Description */}
                <p className="text-[#C9A961] text-xs font-semibold mb-2">
                  {lang === 'ar' ? sub.taglineAr : sub.taglineEn}
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {lang === 'ar' ? sub.descriptionAr : sub.descriptionEn}
                </p>

                {/* Services List */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'أبرز الخدمات والحلول المقدمة:' : 'Key Capabilities:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(lang === 'ar' ? sub.servicesAr : sub.servicesEn).map((service, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                        <span className="truncate">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-center mb-6">
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-lg font-extrabold text-[#C9A961] font-mono">+{sub.projectsCount}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      {lang === 'ar' ? 'مشروع منفذ' : 'Projects Done'}
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400 font-mono">+{sub.clientsCount}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400">
                      {lang === 'ar' ? 'عميل دائم' : 'Active Clients'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveSubsidiaryView(sub)}
                  className="flex-1 py-2.5 px-4 rounded-xl gold-gradient-bg text-[#0B1929] hover:brightness-110 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C9A961]/20 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-[#0B1929]" />
                  <span>{lang === 'ar' ? 'الانتقال لصفحة الشركة التابعة' : 'Visit Subsidiary Page'}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => setSelectedSub(sub)}
                  className="py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shrink-0"
                  title={lang === 'ar' ? 'معاينة سريعة' : 'Quick Preview'}
                >
                  <ExternalLink className="w-4 h-4 text-[#C9A961]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subsidiary Detail Modal */}
      <AnimatePresence>
        {selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 dark:text-slate-100 relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="absolute top-4 left-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-[#C9A961] p-3 flex items-center justify-center shrink-0">
                  {selectedSub.logoUrl ? (
                    <img src={selectedSub.logoUrl} alt={selectedSub.nameAr} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    getIcon(selectedSub.iconName)
                  )}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#C9A961]/20 text-[#C9A961] text-xs font-bold border border-[#C9A961]/30 inline-block mb-1">
                    {lang === 'ar' ? selectedSub.badgeAr : selectedSub.badgeEn}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
                    {lang === 'ar' ? selectedSub.nameAr : selectedSub.nameEn}
                  </h3>
                </div>
              </div>

              <p className="text-[#C9A961] font-semibold text-sm">
                {lang === 'ar' ? selectedSub.taglineAr : selectedSub.taglineEn}
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {lang === 'ar' ? selectedSub.descriptionAr : selectedSub.descriptionEn}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                <div>
                  <div className="text-xl font-bold text-[#C9A961]">{selectedSub.establishedYear}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'سنة التأسيس' : 'Established'}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#C9A961]">+{selectedSub.projectsCount}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'المشاريع' : 'Projects'}</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#C9A961]">+{selectedSub.clientsCount}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'العملاء' : 'Clients'}</div>
                </div>
              </div>

              {/* Services Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A961]" />
                  <span>{lang === 'ar' ? 'خدمات الشركة المعتمدة:' : 'Certified Company Services:'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(lang === 'ar' ? selectedSub.servicesAr : selectedSub.servicesEn).map((srv, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A961] shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {selectedSub.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C9A961]" />
                    <span>{selectedSub.email}</span>
                  </div>
                )}
                {selectedSub.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C9A961]" />
                    <span dir="ltr">{selectedSub.phone}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setSelectedSub(null);
                    openQuoteWithCategory(selectedSub.category === 'cleaning' ? 'cleaning' : selectedSub.category === 'security' ? 'security' : 'integrated');
                  }}
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs shadow-lg shadow-[#C9A961]/20 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#0B1929]" />
                  <span>{lang === 'ar' ? 'اطلب عرض سعر لهذه الشركة' : 'Request Quote for this Company'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
