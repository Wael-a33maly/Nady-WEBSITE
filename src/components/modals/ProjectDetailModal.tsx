import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Calendar, Building, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectDetailModal: React.FC = () => {
  const { lang, selectedProject, setSelectedProject, openQuoteWithCategory } = useApp();

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 text-slate-900 dark:text-white shadow-2xl overflow-hidden my-auto"
      >
        <button
          type="button"
          onClick={() => setSelectedProject(null)}
          className="absolute top-3 sm:top-4 rtl:left-3 sm:rtl:left-4 ltr:right-3 sm:ltr:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:text-[#C9A961] transition-all cursor-pointer"
          aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-56 sm:h-80 w-full overflow-hidden">
          <img
            src={selectedProject.image}
            alt={lang === 'ar' ? selectedProject.titleAr : selectedProject.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#0B1929] via-slate-900/40 dark:via-[#0B1929]/40 to-transparent" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-2">
            <span className="px-3 py-1 rounded-full gold-gradient-bg text-[#0B1929] text-xs font-extrabold uppercase">
              {lang === 'ar' ? selectedProject.badgeAr : selectedProject.badgeEn}
            </span>
            <h2 className={`text-xl sm:text-3xl font-extrabold text-white ${
              lang === 'ar' ? 'font-arabic' : 'font-sans'
            }`}>
              {lang === 'ar' ? selectedProject.titleAr : selectedProject.titleEn}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#112236] border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'العميل' : 'Client'}</span>
              <span className="font-bold text-slate-900 dark:text-white mt-1 block truncate">
                {lang === 'ar' ? selectedProject.clientAr : selectedProject.clientEn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'الموقع' : 'Location'}</span>
              <span className="font-bold text-[#C9A961] mt-1 block truncate">
                {lang === 'ar' ? selectedProject.locationAr : selectedProject.locationEn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'الفترة' : 'Date'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 mt-1 block truncate">{selectedProject.date}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[#C9A961] uppercase tracking-wider font-mono">
              {lang === 'ar' ? 'تفاصيل ونطاق العمل المنفّذ:' : 'Project Scope & Execution Details:'}
            </h4>
            <p className={`text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed ${
              lang === 'ar' ? 'font-arabic' : 'font-sans'
            }`}>
              {lang === 'ar' ? selectedProject.descriptionAr : selectedProject.descriptionEn}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#C9A961]/10 border border-[#C9A961]/30 flex items-center justify-between text-xs">
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              {lang === 'ar' ? 'إحصائية التشغيل:' : 'Operational Stats:'}
            </span>
            <span className="font-bold text-[#C9A961] font-mono">
              {lang === 'ar' ? selectedProject.statsAr : selectedProject.statsEn}
            </span>
          </div>

          <div className="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer text-center"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>

            <button
              onClick={() => {
                setSelectedProject(null);
                openQuoteWithCategory(selectedProject.category);
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:brightness-110"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>{lang === 'ar' ? 'طلب مشورة ممثالة لمنشأتك' : 'Request Similar Setup'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
