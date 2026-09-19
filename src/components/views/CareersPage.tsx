import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Clock, CheckCircle2, UserPlus, FileCheck, Search, Building2, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobPosition } from '../../types';

interface CareersPageProps {
  onBack: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  const { lang, jobPositions, openCareerModalWithJob, theme, settings } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const activeJobs = jobPositions.filter((j) => j.active);

  const departments = [
    { id: 'all', nameAr: 'جميع القطاعات', nameEn: 'All Departments' },
    { id: 'security', nameAr: 'قطاع الحراسات الأمنية', nameEn: 'Security Operations' },
    { id: 'cleaning', nameAr: 'قطاع النظافة والتعقيم', nameEn: 'Environmental & Cleaning' },
    { id: 'tech', nameAr: 'قطاع الذكاء الاصطناعي والتكنولوجيا', nameEn: 'AI & Systems' },
  ];

  const filteredJobs = activeJobs.filter((job) => {
    const matchesSearch =
      job.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0B1929] text-white' : 'bg-[#F8FAFC] text-slate-900'
    } ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {/* Page Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B1929]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl 2xl:max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <BrandLogo />

          <button
            onClick={onBack}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#C9A961] hover:text-[#0B1929] text-slate-800 dark:text-slate-200 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            {lang === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>
        </div>
      </header>

      {/* Hero Banner Area */}
      <div className="relative py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-[#0B1929] text-white overflow-hidden px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#112236] border border-[#C9A961]/40 text-[#C9A961] text-[11px] sm:text-xs font-bold shadow-lg max-w-full truncate">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">{lang === 'ar' ? `البوابة الوطنية للتوظيف - ${settings.logoTextAr || 'المحيط الفضي'}` : `Careers & Recruitment Portal - ${settings.logoTextEn || 'Silver Ocean'}`}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight gold-gradient-text max-w-4xl mx-auto leading-tight break-words">
            {lang === 'ar' ? 'انضم إلى أسطول النخبة واصنع مستقبلك الميداني' : 'Join the Elite Fleet & Build Your Future'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'نفرّق بالالتزام وجودة الأداء. انضم لأكثر من 2,450 كادر أمني وفني متميز يعملون في أعرق المشاريع الوطنية بالمملكة.'
              : 'Empowering certified security guards, sanitation engineers, and technology officers across premier Saudi infrastructure.'}
          </p>

          {/* Quick Perks Bar */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 font-semibold">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'تأمين طبي شامل ودورات معتمدة' : 'Full Medical & Certified Training'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'عمل في أبراج ومجمعات كبرى' : 'Prime High-Rise & Corporate Sites'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'ترقيات وظيفية ومحفزات أداء' : 'Fast Career Progression'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Jobs Directory Container */}
      <main className="max-w-7xl 2xl:max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6 sm:space-y-8">
        {/* Search & Filter */}
        <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute top-3.5 rtl:right-4 ltr:left-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث باسم الوظيفة أو الموقع...' : 'Search for a position or location...'}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-2xl rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 py-2.5 sm:py-3 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#C9A961] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            <span>{filteredJobs.length} {lang === 'ar' ? 'وظائف مجهزة للتقديم' : 'Open Positions'}</span>
          </div>
        </div>

        {/* Job Openings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-[#C9A961] hover:shadow-xl transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] text-[11px] font-bold">
                    {lang === 'ar' ? job.departmentAr : job.departmentEn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{job.postedDate}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors break-words">
                  {lang === 'ar' ? job.titleAr : job.titleEn}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' ? job.descriptionAr : job.descriptionEn}
                </p>

                <div className="pt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                    <span className="truncate">{lang === 'ar' ? job.locationAr : job.locationEn}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                    <span>{lang === 'ar' ? job.typeAr : job.typeEn}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {lang === 'ar' ? 'أبرز المتطلبات:' : 'Key Requirements:'}
                  </div>
                  {(lang === 'ar' ? job.requirementsAr : job.requirementsEn)?.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openCareerModalWithJob(job)}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-2xl bg-[#C9A961] hover:bg-[#b3914a] text-[#0B1929] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>{lang === 'ar' ? 'قدّم على الوظيفة وارفاق الـ CV' : 'Apply & Attach CV'}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-4 h-4 shrink-0" /> : <ArrowRight className="w-4 h-4 shrink-0" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* General Application Card */}
        <div className="bg-gradient-to-r from-[#0B1929] via-[#0E2035] to-[#0B1929] border border-[#C9A961]/30 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-start">
            <h3 className="text-lg sm:text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <FileCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'التقديم المباشر وإرسال السيرة الذاتية' : 'Direct CV Submission'}</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'إذا لم تجد مسمى وظيفياً يطابق خبرتك بدقة، أرسل ملف سيرتك الذاتية (CV) للتقديم المباشر في قاعدة بيانات الموارد البشرية.'
                : 'Upload your CV for general review across all operational sectors.'}
            </p>
          </div>

          <button
            onClick={() => openCareerModalWithJob(null)}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#C9A961] hover:bg-[#b3914a] text-[#0B1929] font-bold text-xs shadow-lg shrink-0 cursor-pointer"
          >
            {lang === 'ar' ? 'رفع الـ CV الآن' : 'Upload CV Document'}
          </button>
        </div>
      </main>
    </div>
  );
};
