import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { clientVectorLogos } from '../../data/clientLogosData';
import { ClientLogo } from '../../types';
import {
  Star,
  Quote,
  ChevronRight,
  ChevronLeft,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ClientsMarqueeSection: React.FC = () => {
  const { lang, testimonials, clientLogos, settings } = useApp();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const displayMode = settings.clientDisplayMode || 'marquee';

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTM = testimonials[currentTestimonialIndex];
  const displayLogos = clientLogos.length > 0 ? clientLogos : [];
  const marqueeLogos = displayLogos.length > 0 ? [...displayLogos, ...displayLogos, ...displayLogos] : [];

  const getClientName = (client: ClientLogo) => {
    if (lang === 'ar') {
      if (client.nameAr) return client.nameAr;
      if (client.name === 'Aramco Partners') return 'أرامكو السعودية - قطاع الطاقة';
      if (client.name === 'Riyadh Bank') return 'بنك الرياض - المركز المالي';
      if (client.name === 'SABIC Tower') return 'شركة سابك للصناعات الكبرى';
      if (client.name === 'Kingdom Holding') return 'شركة المملكة القابضة';
      if (client.name === 'STC Solutions') return 'إس تي سي للحلول الرقمية (stc)';
      if (client.name === 'Dr. Sulaiman Al Habib') return 'مجموعة د. سليمان الحبيب الطبية';
      return client.name;
    }
    if (client.nameEn) return client.nameEn;
    return client.name;
  };

  const getClientCategory = (client: ClientLogo) => {
    if (lang === 'ar') {
      if (client.categoryAr) return client.categoryAr;
      if (client.category === 'Energy') return 'قطاع الطاقة والنفط';
      if (client.category === 'Banking') return 'القطاع المصرفي والمالي';
      if (client.category === 'Industrial') return 'الصناعات والبتروكيماويات';
      if (client.category === 'Real Estate') return 'التطوير العقاري والاستثماري';
      if (client.category === 'Telecom') return 'الاتصالات ومراكز البيانات';
      if (client.category === 'Healthcare') return 'الرعاية الصحية والمستشفيات';
      return client.category;
    }
    if (client.categoryEn) return client.categoryEn;
    return client.category;
  };

  const getClientLogoUrl = (client: ClientLogo) => {
    if (client.logoUrl && client.logoUrl.startsWith('data:image/svg+xml')) return client.logoUrl;
    if (client.id === 'c1' || client.name.includes('Aramco')) return clientVectorLogos.aramco;
    if (client.id === 'c2' || client.name.includes('Riyadh')) return clientVectorLogos.riyadhBank;
    if (client.id === 'c3' || client.name.includes('SABIC')) return clientVectorLogos.sabic;
    if (client.id === 'c4' || client.name.includes('Kingdom')) return clientVectorLogos.kingdomHolding;
    if (client.id === 'c5' || client.name.includes('STC') || client.name.includes('stc')) return clientVectorLogos.stc;
    if (client.id === 'c6' || client.name.includes('Habib')) return clientVectorLogos.alhabib;
    return client.logoUrl;
  };

  const renderClientCard = (client: ClientLogo, key: React.Key, isMarquee: boolean) => {
    const resolvedName = getClientName(client);
    const resolvedCategory = getClientCategory(client);
    const resolvedLogo = getClientLogoUrl(client);

    return (
      <div
        key={key}
        className={`relative group overflow-hidden bg-white dark:bg-[#0D1D30] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-md dark:shadow-xl hover:shadow-2xl hover:shadow-[#C9A961]/15 hover:border-[#C9A961]/70 transition-all duration-300 cursor-pointer ${
          isMarquee ? 'w-[300px] sm:w-[360px] md:w-[400px] shrink-0' : 'w-full'
        }`}
      >
        {/* Top subtle golden shimmer accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C9A961]/0 to-transparent group-hover:via-[#C9A961] transition-all duration-500" />

        <div className="flex items-start gap-4 sm:gap-5">
          {/* Prominent high-contrast logo frame */}
          <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl p-2 sm:p-2.5 bg-slate-50 dark:bg-[#071322] border border-slate-200 dark:border-slate-700/80 shadow-inner flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#C9A961]/60 transition-all duration-300">
            <img
              src={resolvedLogo}
              alt={resolvedName}
              className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Client Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#C9A961]/15 text-[#C9A961] border border-[#C9A961]/30">
                <Building2 className="w-3 h-3" />
                <span>{resolvedCategory}</span>
              </span>
            </div>

            <h4
              className={`text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors leading-snug line-clamp-2 ${
                lang === 'ar' ? 'font-arabic' : 'font-sans'
              }`}
            >
              {resolvedName}
            </h4>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'شريك استراتيجي معتمد' : 'Verified Strategic Client'}</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Contract & Verification */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="truncate">
            {lang === 'ar' ? 'نطاق العمل: حراسة أمنية ونظافة' : 'Contract: Security & Facility Care'}
          </span>
          <span className="text-[#C9A961] font-bold flex items-center gap-1 shrink-0">
            <span>{lang === 'ar' ? 'نشط' : 'Active'}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A961]" />
          </span>
        </div>
      </div>
    );
  };

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

        {/* Display Content: Marquee or Grid (controlled from Admin Dashboard) */}
        {displayMode === 'marquee' ? (
          <div className="mt-8 sm:mt-10 relative overflow-hidden py-6 rounded-3xl bg-slate-200/40 dark:bg-[#0B1929]/80 border border-slate-300/80 dark:border-slate-800 shadow-inner">
            {/* Smooth Edge Fade Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-200/80 dark:from-[#0B1929] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-200/80 dark:from-[#0B1929] to-transparent z-10" />

            <div
              className="animate-marquee flex items-center gap-6 sm:gap-8 px-4"
              style={{ animationDuration: '45s' }}
            >
              {marqueeLogos.map((client, idx) => renderClientCard(client, idx, true))}
            </div>
          </div>
        ) : (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayLogos.map((client) => renderClientCard(client, client.id, false))}
          </div>
        )}

        {/* Testimonials Carousel */}
        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-5 sm:p-8 md:p-12 glass-card border border-slate-300 dark:border-slate-800 shadow-2xl overflow-hidden">
            <Quote className="absolute top-6 rtl:right-8 ltr:left-8 w-16 h-16 sm:w-24 sm:h-24 text-[#C9A961]/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTM.id}
                initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 space-y-4 sm:space-y-6 text-center"
              >
                {/* Rating Stars */}
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  {[...Array(currentTM.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className={`text-base sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto ${
                  lang === 'ar' ? 'font-arabic' : 'font-sans italic'
                }`}>
                  "{lang === 'ar' ? currentTM.contentAr : currentTM.contentEn}"
                </p>

                {/* User Info */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <img
                    src={currentTM.avatar}
                    alt={lang === 'ar' ? currentTM.nameAr : currentTM.nameEn}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#C9A961] shadow-lg"
                  />
                  <div className="text-center sm:text-start">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
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
