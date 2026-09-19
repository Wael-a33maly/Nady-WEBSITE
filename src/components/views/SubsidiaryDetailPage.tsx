import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubsidiaryCompany } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Camera,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
  Calendar,
  Building2,
  FileText,
  Globe,
  Star,
  ExternalLink,
  ChevronRight,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  subsidiary: SubsidiaryCompany;
  onBack: () => void;
}

export const SubsidiaryDetailPage: React.FC<Props> = ({ subsidiary: initialSubsidiary, onBack }) => {
  const { lang, openQuoteWithCategory, addQuote, subsidiaries, settings } = useApp();
  const subsidiary = subsidiaries.find((s) => s.id === initialSubsidiary.id) || initialSubsidiary;

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'certifications' | 'gallery' | 'contact'>('overview');

  const [quoteSent, setQuoteSent] = useState(false);
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    phone: '',
    email: '',
    serviceName: subsidiary.servicesAr[0] || '',
    notes: '',
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addQuote({
      serviceCategory: (subsidiary.category as any) || 'integrated',
      serviceName: `${subsidiary.nameAr} - ${formData.serviceName}`,
      propertyArea: 'حسب المعاينة',
      headcountNeeded: '1',
      location: subsidiary.addressAr || 'الرياض / المملكة العربية السعودية',
      contractDuration: 'سنة كاملة',
      companyName: formData.companyName,
      contactName: formData.contactName,
      phone: formData.phone,
      email: formData.email,
      notes: formData.notes,
    });
    setQuoteSent(true);
    setTimeout(() => setQuoteSent(false), 5000);
  };

  const heroSubtitle = lang === 'ar'
    ? (subsidiary.heroSubtitleAr || `إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة • إستقلالية تشغيلية كاملة`)
    : (subsidiary.heroSubtitleEn || `A Subsidiary of ${settings.logoTextEn || 'Silver Ocean'} Holding Group • Complete Operational Autonomy`);

  const projectsLabel = lang === 'ar'
    ? (subsidiary.projectsLabelAr || 'مشروع مكتمل')
    : (subsidiary.projectsLabelEn || 'Completed Projects');

  const clientsLabel = lang === 'ar'
    ? (subsidiary.clientsLabelAr || 'عميل استراتيجي')
    : (subsidiary.clientsLabelEn || 'Key Clients');

  const establishedLabel = lang === 'ar'
    ? (subsidiary.establishedLabelAr || 'سنة التأسيس')
    : (subsidiary.establishedLabelEn || 'Established');

  const complianceRate = subsidiary.complianceRate || '100%';
  const complianceLabel = lang === 'ar'
    ? (subsidiary.complianceLabelAr || 'التزام بالمعايير')
    : (subsidiary.complianceLabelEn || 'Compliance');

  const overviewTag = lang === 'ar'
    ? (subsidiary.overviewTagAr || 'رؤيتنا ورسالتنا التشغيلية')
    : (subsidiary.overviewTagEn || 'Mission & Core Vision');

  const overviewTitle = lang === 'ar'
    ? (subsidiary.overviewTitleAr || 'الريادة الميدانية والتميز الاحترافي في التنفيذ')
    : (subsidiary.overviewTitleEn || 'Field Leadership & Operational Precision');

  const overviewNote = lang === 'ar'
    ? (subsidiary.overviewNoteAr || `تأسست عام ${subsidiary.establishedYear} بمواصفات قياسية`)
    : (subsidiary.overviewNoteEn || `Established ${subsidiary.establishedYear} with benchmark standards`);

  const servicesTitle = lang === 'ar'
    ? (subsidiary.servicesTitleAr || 'الخدمات التخصصية للشركة')
    : (subsidiary.servicesTitleEn || 'Subsidiary Services Portfolio');

  const servicesSubtitle = lang === 'ar'
    ? (subsidiary.servicesSubtitleAr || 'تقدم الشركة حلولاً تنفيذية شاملة ومصممة خصيصاً لتلبية احتياجات قطاع الأعمال والجهات الحكومية.')
    : (subsidiary.servicesSubtitleEn || 'Tailored solutions designed for enterprise and governmental standards.');

  const certificationsTitle = lang === 'ar'
    ? (subsidiary.certificationsTitleAr || 'التراخيص والشهادات المعتمدة')
    : (subsidiary.certificationsTitleEn || 'Official Certifications & Licensing');

  const certificationsSubtitle = lang === 'ar'
    ? (subsidiary.certificationsSubtitleAr || 'جميع أنشطة الشركة مرخصة رسمياً وخاضعة لرقابة واشتراطات الجهات المعنية.')
    : (subsidiary.certificationsSubtitleEn || 'Fully compliant and licensed by official regulatory authorities.');

  const certificationsStatus = lang === 'ar'
    ? (subsidiary.certificationsStatusAr || 'سارية المفعول ومحدثة')
    : (subsidiary.certificationsStatusEn || 'Active & Validated');

  const galleryTitle = lang === 'ar'
    ? (subsidiary.galleryTitleAr || 'صور التجهيزات والأعمال الميدانية')
    : (subsidiary.galleryTitleEn || 'Field Operations Gallery');

  const gallerySubtitle = lang === 'ar'
    ? (subsidiary.gallerySubtitleAr || '')
    : (subsidiary.gallerySubtitleEn || '');

  const quoteBadge = lang === 'ar'
    ? (subsidiary.quoteBadgeAr || `تواصل مباشر مع: ${subsidiary.nameAr}`)
    : (subsidiary.quoteBadgeEn || `Direct Inquiry: ${subsidiary.nameEn}`);

  const quoteTitle = lang === 'ar'
    ? (subsidiary.quoteTitleAr || 'طلب عرض سعر مباشر من الشركة التابعة')
    : (subsidiary.quoteTitleEn || 'Submit Direct Request for Proposal');

  const quoteSubtitle = lang === 'ar'
    ? (subsidiary.quoteSubtitleAr || 'سيتم توجيه طلبك مباشرة للفريق الهندسي والتشغيلي لهذه الشركة للرد خلال أقل من ساعة.')
    : (subsidiary.quoteSubtitleEn || 'Your inquiry will be routed directly to this subsidiary operational leads.');

  const footerNote = lang === 'ar'
    ? (subsidiary.footerNoteAr || `${subsidiary.nameAr} • إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة`)
    : (subsidiary.footerNoteEn || `${subsidiary.nameEn} • A Subsidiary of ${settings.logoTextEn || 'Silver Ocean'} Holding Group`);

  const currentServices = lang === 'ar' ? subsidiary.servicesAr : subsidiary.servicesEn;
  const currentDetailedServices = subsidiary.detailedServices && subsidiary.detailedServices.length > 0
    ? subsidiary.detailedServices
    : currentServices.map((srv, idx) => ({
        id: `srv-${idx}`,
        titleAr: subsidiary.servicesAr[idx] || srv,
        titleEn: subsidiary.servicesEn[idx] || srv,
        descAr: 'تطبيق أعلى معايير الجودة والسلامة مع توفير تقارير دورية وإشراف ميداني مستمر 24/7.',
        descEn: 'Adhering to strict safety, continuous 24/7 supervision and automated reporting.',
      }));

  const currentCerts = lang === 'ar'
    ? (subsidiary.certificationsAr && subsidiary.certificationsAr.length > 0
        ? subsidiary.certificationsAr
        : ['مرخصة رسمياً من السلطات المعنية', 'شهادة ISO للجودة والسلامة المهنية', 'عضوية منظمة سلامة المنشآت الدولية'])
    : (subsidiary.certificationsEn && subsidiary.certificationsEn.length > 0
        ? subsidiary.certificationsEn
        : ['Officially licensed by regulatory authorities', 'ISO Certified for Occupational Health & Safety', 'Member of International Facilities Security Association']);

  const currentGallery = subsidiary.galleryImages && subsidiary.galleryImages.length > 0
    ? subsidiary.galleryImages
    : [subsidiary.heroImage || subsidiary.logoUrl];

  return (
    <div className={`min-h-screen bg-[#060D17] text-slate-100 relative selection:bg-[#C9A961] selection:text-[#060D17] ${
      lang === 'ar' ? 'font-arabic' : 'font-sans'
    }`}>
      {/* 1. DEDICATED SUBSIDIARY NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0B1929]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          
          {/* Subsidiary Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={onBack}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-[#C9A961] transition-all flex items-center gap-2 cursor-pointer group shrink-0"
              title={lang === 'ar' ? 'العودة للمجموعة الرئيسية' : 'Back to Group'}
            >
              {lang === 'ar' ? (
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              )}
              <span className="text-xs font-bold hidden md:inline">
                {lang === 'ar' ? 'الرئيسية' : 'Main Group'}
              </span>
            </button>

            <div className="h-6 sm:h-8 w-[1px] bg-slate-800 hidden sm:block shrink-0" />

            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src={subsidiary.logoUrl}
                alt={subsidiary.nameAr}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover border border-[#C9A961]/40 shadow-lg shrink-0"
              />
              <div className="min-w-0">
                <span className="px-2 py-0.5 rounded bg-[#C9A961]/20 text-[#C9A961] text-[10px] font-bold block w-fit truncate">
                  {lang === 'ar' ? subsidiary.badgeAr : subsidiary.badgeEn}
                </span>
                <h1 className={`text-xs sm:text-base font-bold text-white leading-tight truncate ${
                  lang === 'ar' ? 'font-arabic' : 'font-sans'
                }`}>
                  {lang === 'ar' ? subsidiary.nameAr : subsidiary.nameEn}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Contacts & CTA */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {subsidiary.phone && (
              <a
                href={`tel:${subsidiary.phone}`}
                className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#C9A961] transition-colors"
                dir="ltr"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#C9A961]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{subsidiary.phone}</span>
              </a>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('subsidiary-quote');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{lang === 'ar' ? 'طلب عرض سعر' : 'Get Quote'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. DEDICATED SUBSIDIARY HERO BANNER */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden py-14 sm:py-20 px-4 sm:px-6">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.35]"
          style={{
            backgroundImage: `url(${subsidiary.heroImage || subsidiary.logoUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-[#060D17]/70 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#C9A961]/15 border border-[#C9A961]/40 text-[#C9A961] text-[11px] sm:text-xs font-bold shadow-xl max-w-full truncate"
          >
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{heroSubtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight break-words ${
              lang === 'ar' ? 'font-arabic' : 'font-sans'
            }`}
          >
            {lang === 'ar' ? subsidiary.nameAr : subsidiary.nameEn}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg md:text-xl text-[#C9A961] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            {lang === 'ar' ? subsidiary.taglineAr : subsidiary.taglineEn}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {lang === 'ar' ? subsidiary.descriptionAr : subsidiary.descriptionEn}
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1929]/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#C9A961]">+{subsidiary.projectsCount}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{projectsLabel}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1929]/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#C9A961]">+{subsidiary.clientsCount}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{clientsLabel}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1929]/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{subsidiary.establishedYear}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{establishedLabel}</div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-[#0B1929]/80 border border-slate-800 text-center">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">{complianceRate}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{complianceLabel}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. NAVIGATION TABS FOR SUBSIDIARY MICROSITE */}
      <nav className="bg-[#0B1929] border-y border-slate-800 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto py-3 no-scrollbar">
          {[
            { id: 'overview', labelAr: 'نظرة عامة ورؤية الشركة', labelEn: 'Overview & Mission' },
            { id: 'services', labelAr: servicesTitle, labelEn: 'Specialized Services' },
            { id: 'certifications', labelAr: certificationsTitle, labelEn: 'Certifications' },
            { id: 'gallery', labelAr: galleryTitle, labelEn: 'Field Gallery' },
            { id: 'contact', labelAr: 'طلب عرض سعر ومراسلتنا', labelEn: 'Contact & RFQ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'gold-gradient-bg text-[#0B1929] shadow-lg scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. MAIN SUBSIDIARY CONTENT BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* OVERVIEW & MISSION */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <div className="space-y-4 sm:space-y-6">
              <span className="px-3 py-1 rounded-full bg-[#C9A961]/20 text-[#C9A961] text-xs font-bold">
                {overviewTag}
              </span>
              <h2 className={`text-2xl sm:text-4xl font-bold text-white leading-snug ${
                lang === 'ar' ? 'font-arabic' : 'font-sans'
              }`}>
                {overviewTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? subsidiary.detailedMissionAr || subsidiary.descriptionAr
                  : subsidiary.detailedMissionEn || subsidiary.descriptionEn}
              </p>

              <div className="space-y-3 pt-2">
                {(lang === 'ar' ? subsidiary.servicesAr : subsidiary.servicesEn).map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#0B1929] border border-slate-800">
                    <CheckCircle2 className="w-5 h-5 text-[#C9A961] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-white">{srv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-[#C9A961]/30 shadow-2xl group">
              <img
                src={subsidiary.overviewImage || subsidiary.heroImage || subsidiary.logoUrl}
                alt={subsidiary.nameAr}
                className="w-full h-[300px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D17] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 sm:p-6 rounded-2xl bg-[#0B1929]/90 backdrop-blur-md border border-slate-800">
                <div className="text-[#C9A961] font-bold text-xs">{lang === 'ar' ? 'تاريخ التأسيس والخبرة' : 'Est. Legacy'}</div>
                <div className="text-white text-sm sm:text-base font-bold mt-1">
                  {overviewNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES SECTION */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className={`text-2xl sm:text-3xl font-bold text-white ${
                lang === 'ar' ? 'font-arabic' : 'font-sans'
              }`}>
                {servicesTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {servicesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentDetailedServices.map((srv, idx) => {
                const title = lang === 'ar' ? srv.titleAr : srv.titleEn;
                const desc = lang === 'ar' ? (srv.descAr || 'حلول تنفيذية وفق أعلى المعايير القياسية العالمية.') : (srv.descEn || 'Operational delivery adhering to top industry standards.');
                return (
                  <div key={srv.id || idx} className="p-5 sm:p-6 rounded-2xl bg-[#0B1929] border border-slate-800 hover:border-[#C9A961]/50 transition-all space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gold-gradient-bg text-[#0B1929] flex items-center justify-center font-black text-base sm:text-lg shadow-md">
                      0{idx + 1}
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold text-white ${
                      lang === 'ar' ? 'font-arabic' : 'font-sans'
                    }`}>{title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, serviceName: title }));
                        setActiveTab('contact');
                        setTimeout(() => {
                          document.getElementById('subsidiary-quote')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="text-xs font-bold text-[#C9A961] flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'طلب هذه الخدمة للشركة' : 'Request This Service'}</span>
                      <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 ltr:rotate-180" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className={`text-2xl sm:text-3xl font-bold text-white ${
                lang === 'ar' ? 'font-arabic' : 'font-sans'
              }`}>
                {certificationsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {certificationsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {currentCerts.map((cert, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#0B1929] border border-slate-800 text-center space-y-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C9A961]/20 text-[#C9A961] flex items-center justify-center mx-auto">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className={`text-sm font-bold text-white ${
                    lang === 'ar' ? 'font-arabic' : 'font-sans'
                  }`}>{cert}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold block">{certificationsStatus}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className={`text-2xl sm:text-3xl font-bold text-white ${
                lang === 'ar' ? 'font-arabic' : 'font-sans'
              }`}>
                {galleryTitle}
              </h2>
              {gallerySubtitle && (
                <p className="text-xs sm:text-sm text-slate-400">
                  {gallerySubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {currentGallery.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-slate-800 group h-52 sm:h-64">
                  <img
                    src={img}
                    alt="Gallery"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT & DIRECT QUOTE FORM */}
        <div id="subsidiary-quote" className="p-5 sm:p-8 md:p-12 rounded-3xl bg-[#0B1929] border border-[#C9A961]/40 space-y-6 sm:space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#C9A961]/20 text-[#C9A961] text-xs font-bold">
              {quoteBadge}
            </span>
            <h2 className={`text-xl sm:text-3xl font-bold text-white ${
              lang === 'ar' ? 'font-arabic' : 'font-sans'
            }`}>
              {quoteTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {quoteSubtitle}
            </p>
          </div>

          {/* Quick Contact Row if available */}
          {(subsidiary.phone || subsidiary.email || subsidiary.addressAr || subsidiary.websiteUrl) && (
            <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              {subsidiary.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C9A961]" />
                  <a href={`tel:${subsidiary.phone}`} className="hover:text-white" dir="ltr">{subsidiary.phone}</a>
                </div>
              )}
              {subsidiary.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C9A961]" />
                  <a href={`mailto:${subsidiary.email}`} className="hover:text-white">{subsidiary.email}</a>
                </div>
              )}
              {(subsidiary.addressAr || subsidiary.addressEn) && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A961]" />
                  <span>{lang === 'ar' ? subsidiary.addressAr : (subsidiary.addressEn || subsidiary.addressAr)}</span>
                </div>
              )}
              {subsidiary.websiteUrl && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C9A961]" />
                  <a href={subsidiary.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-white text-[#C9A961] underline">
                    {lang === 'ar' ? 'الموقع الرسمي' : 'Official Portal'}
                  </a>
                </div>
              )}
            </div>
          )}

          {quoteSent ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">
                {lang === 'ar' ? 'تم تقديم طلب عرض السعر بنجاح!' : 'Proposal Request Submitted!'}
              </h3>
              <p className="text-xs text-slate-300">
                {lang === 'ar'
                  ? `شكراً لتواصلك مع ${subsidiary.nameAr}. سيتواصل معك ممثل الشركة قريباً.`
                  : `Thank you. Representatives of ${subsidiary.nameEn} will contact you shortly.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'الاسم الكرام' : 'Contact Person'}</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                  placeholder={lang === 'ar' ? 'أدخل اسمك الكريم' : 'Full Name'}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'اسم المنشأة / الشركة' : 'Company Name'}</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                  placeholder={lang === 'ar' ? 'اسم شركتك أو مؤسستك' : 'Entity Name'}
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                  placeholder="+966 5x xxx xxxx"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                  placeholder="name@company.com"
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'الخدمة المطلوبة' : 'Selected Service'}</label>
                <select
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                >
                  {(lang === 'ar' ? subsidiary.servicesAr : subsidiary.servicesEn).map((srv, idx) => (
                    <option key={idx} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'تفاصيل إضافية عن الموقع والمساحة' : 'Project Details & Scope'}</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-[#C9A961]"
                  placeholder={lang === 'ar' ? 'اكتب أي متطلبات خاصة بالخدمة والموقع...' : 'Specify location, scope, or guards needed...'}
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:brightness-110 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'ar' ? `إرسال الطلب لشركة ${subsidiary.nameAr}` : `Submit to ${subsidiary.nameEn}`}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* 5. SUBSIDIARY FOOTER */}
      <footer className="bg-[#040910] border-t border-slate-800 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={subsidiary.logoUrl} alt={subsidiary.nameAr} className="w-8 h-8 rounded-lg object-cover" />
            <span>{footerNote}</span>
          </div>

          <button
            onClick={onBack}
            className="text-[#C9A961] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'العودة إلى موقع البوابة الرئيسية للمجموعة' : 'Back to Main Group Portal'}</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" />
          </button>
        </div>
      </footer>
    </div>
  );
};
