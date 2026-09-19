import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { X, CheckCircle2, ShieldCheck, Sparkles, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const ServiceDetailModal: React.FC = () => {
  const { lang, selectedService, setSelectedService, openQuoteWithCategory } = useApp();

  if (!selectedService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 text-slate-900 dark:text-white shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedService(null)}
          className="absolute top-3 sm:top-4 rtl:left-3 sm:rtl:left-4 ltr:right-3 sm:ltr:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-white/20 text-white hover:text-[#C9A961] transition-all cursor-pointer"
          aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={selectedService.image}
            alt={lang === 'ar' ? selectedService.titleAr : selectedService.titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#0B1929] via-slate-900/50 dark:via-[#0B1929]/50 to-transparent" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-2">
            <span className="px-3 py-1 rounded-full gold-gradient-bg text-[#0B1929] text-xs font-extrabold uppercase">
              {selectedService.category}
            </span>
            <h2 className={`text-xl sm:text-3xl font-extrabold text-white ${
              lang === 'ar' ? 'font-arabic' : 'font-sans'
            }`}>
              {lang === 'ar' ? selectedService.titleAr : selectedService.titleEn}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <p className={`text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed ${
            lang === 'ar' ? 'font-arabic' : 'font-sans'
          }`}>
            {lang === 'ar' ? selectedService.detailedDescAr : selectedService.detailedDescEn}
          </p>

          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs sm:text-sm font-bold text-[#C9A961] uppercase tracking-wider font-mono">
              {lang === 'ar' ? 'مميزات ومواصفات الخدمة:' : 'Key Service Specs:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {(lang === 'ar' ? selectedService.featuresAr : selectedService.featuresEn).map((feat, idx) => (
                <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-[#112236] border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A961] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer text-center"
            >
              {lang === 'ar' ? 'إغلاق النافذة' : 'Close Modal'}
            </button>

            <button
              onClick={() => {
                const cat = selectedService.category;
                setSelectedService(null);
                openQuoteWithCategory(cat);
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:brightness-110"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>{lang === 'ar' ? 'اطلب عرض سعر لهذه الخدمة' : 'Request Dedicated Quote'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
