import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { initialClientLogos } from '../../data/initialData';
import { Star, Quote, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ClientsMarqueeSection: React.FC = () => {
  const { lang, testimonials, clientLogos, settings } = useApp();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTM = testimonials[currentTestimonialIndex];
  const displayLogos = clientLogos.length > 0 ? clientLogos : [];
  const marqueeLogos = displayLogos.length > 0 ? [...displayLogos, ...displayLogos, ...displayLogos] : [];

  return (
    <section id="clients" className="py-24 relative bg-slate-100/80 dark:bg-[#08121f] transition-colors overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'شركاء النجاح' : 'Our Trusted Partners'}
          badgeIcon={Shield}
          title={lang === 'ar' ? `شركات وهيئات كبرى تثق بـ ${settings.logoTextAr || 'المحيط الفضي'}` : 'Endorsed by Top Industry Organizations'}
          subtitle={
            lang === 'ar'
              ? 'نفخر بتقديم خدماتنا الميدانية والاستشارية لكبرى العلامات التجارية والمؤسسات الحكومية والخاصة.'
              : 'Serving major financial centers, hospitals, real estate groups, and public enterprises.'
          }
        />

        {/* Infinite Client Logo Marquee */}
        <div className="mt-14 relative overflow-hidden py-6 bg-slate-200/50 dark:bg-[#0B1929]/80 rounded-2xl border border-slate-300 dark:border-slate-800">
          <div className="animate-marquee flex items-center gap-12 sm:gap-16 px-4">
            {/* Duplicated for infinite loop */}
            {marqueeLogos.map((client, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#112236] border border-slate-300 dark:border-slate-800 shrink-0 opacity-80 hover:opacity-100 hover:border-[#C9A961] transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                  <img src={client.logoUrl} alt={client.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-[#C9A961] font-semibold">{client.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-8 sm:p-12 glass-card border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden">
            <Quote className="absolute top-6 right-8 rtl:right-8 ltr:left-8 w-24 h-24 text-[#C9A961]/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTM.id}
                initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 space-y-6 text-center"
              >
                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1.5 text-amber-400">
                  {[...Array(currentTM.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 leading-relaxed font-arabic max-w-3xl mx-auto">
                  "{lang === 'ar' ? currentTM.contentAr : currentTM.contentEn}"
                </p>

                {/* User Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <img
                    src={currentTM.avatar}
                    alt={lang === 'ar' ? currentTM.nameAr : currentTM.nameEn}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A961] shadow-lg"
                  />
                  <div className="text-center sm:text-start">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' ? currentTM.nameAr : currentTM.nameEn}
                    </h4>
                    <p className="text-xs text-[#C9A961] font-semibold">
                      {lang === 'ar' ? currentTM.roleAr : currentTM.roleEn} -{' '}
                      <span className="text-slate-500 dark:text-slate-400">
                        {lang === 'ar' ? currentTM.companyAr : currentTM.companyEn}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-slate-200 dark:bg-[#112236] text-slate-800 dark:text-slate-200 hover:text-[#C9A961] dark:hover:text-[#C9A961] border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                {lang === 'ar' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonialIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentTestimonialIndex ? 'w-8 bg-[#C9A961]' : 'w-2 bg-slate-400 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-slate-200 dark:bg-[#112236] text-slate-800 dark:text-slate-200 hover:text-[#C9A961] dark:hover:text-[#C9A961] border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                {lang === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
