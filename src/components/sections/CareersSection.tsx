import React from 'react';
import { Briefcase, MapPin, Clock, ArrowLeft, ArrowRight, CheckCircle2, UserPlus, FileCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';

export const CareersSection: React.FC = () => {
  const { lang, jobPositions, openCareerModalWithJob, setIsCareersPageOpen, settings } = useApp();

  const activeJobs = jobPositions.filter((j) => j.active);

  return (
    <section id="careers" className="py-24 relative bg-slate-100/70 dark:bg-[#08121f] transition-colors overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A961]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 space-y-12">
        <SectionHeading
          badge={lang === 'ar' ? 'الفرص الوظيفية والانضمام' : 'Careers & Opportunities'}
          badgeIcon={Briefcase}
          title={lang === 'ar' ? `انضم إلى فريق النخبة في ${settings.logoTextAr || 'المحيط الفضي'}` : `Join the Elite Team at ${settings.logoTextEn || 'Silver Ocean'}`}
          subtitle={
            lang === 'ar'
              ? 'نبحث دائماً عن الكفاءات الميدانية والفنية المتميزة للانضمام لأسطولنا وتطوير مسارهم المهني في بيئة عمل محفزة.'
              : 'We continuously seek top field & technical professionals to elevate their careers in an inspiring environment.'
          }
        />

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-[#C9A961]/60 transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] text-[11px] font-bold">
                    {lang === 'ar' ? job.departmentAr : job.departmentEn}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{job.postedDate}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors">
                  {lang === 'ar' ? job.titleAr : job.titleEn}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {lang === 'ar' ? job.descriptionAr : job.descriptionEn}
                </p>

                <div className="pt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>{lang === 'ar' ? job.locationAr : job.locationEn}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span>{lang === 'ar' ? job.typeAr : job.typeEn}</span>
                  </div>
                </div>

                {/* Requirements bullets */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {lang === 'ar' ? 'أبرز المتطلبات:' : 'Key Requirements:'}
                  </div>
                  {(lang === 'ar' ? job.requirementsAr : job.requirementsEn)?.slice(0, 2).map((req, idx) => (
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
                  className="w-full py-3 px-4 rounded-xl bg-[#C9A961] hover:bg-[#b3914a] text-[#0B1929] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'قدّم على الوظيفة الآن' : 'Apply Now'}</span>
                  {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* General Application Callout */}
        <div className="bg-gradient-to-r from-[#0B1929] via-[#0E2035] to-[#0B1929] border border-[#C9A961]/30 rounded-3xl p-8 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <FileCheck className="w-6 h-6 text-[#C9A961]" />
              <span>{lang === 'ar' ? 'لم تجد الوظيفة المناسبة لمجالك؟' : 'Didn\'t find a matching open role?'}</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'يمكنك دائماً إرسال سيرتك الذاتية (CV) للتوظيف العام، وسيقوم فريق الموارد البشرية بالاتصال بك فور توفر شاغر يناسب خبرتك.'
                : 'Send your CV for general consideration, and our HR team will reach out when a suitable position opens up.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsCareersPageOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C9A961] hover:bg-[#b3914a] text-[#0B1929] font-bold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>{lang === 'ar' ? 'فتح شاشة الوظائف المستقلة' : 'Open Full Screen Careers Portal'}</span>
            </button>
            <button
              onClick={() => openCareerModalWithJob(null)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1929] font-bold text-xs shadow-lg cursor-pointer"
            >
              {lang === 'ar' ? 'رفع الـ CV الآن' : 'Submit General CV'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
