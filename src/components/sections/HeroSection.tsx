import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Building2,
  Users,
  Award,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { initialHeroSlides } from '../../data/initialData';

export const HeroSection: React.FC = () => {
  const { lang, settings, openQuoteWithCategory } = useApp();

  const slides = settings.heroSlides && settings.heroSlides.length > 0 ? settings.heroSlides : initialHeroSlides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-play slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  const stats = [
    {
      icon: Users,
      value: settings.happyClients,
      suffix: '+',
      labelAr: 'عميل وشركة يثقون بنا',
      labelEn: 'Trusted Corporate Clients',
    },
    {
      icon: Award,
      value: settings.yearsExperience,
      suffix: '+',
      labelAr: 'سنوات من الخبرة والتميز',
      labelEn: 'Years of Excellence',
    },
    {
      icon: Building2,
      value: settings.completedProjects,
      suffix: '+',
      labelAr: 'مشروع منجز بنجاح',
      labelEn: 'Completed Projects',
    },
    {
      icon: ShieldCheck,
      value: settings.securityGuardsCount,
      suffix: '+',
      labelAr: 'حارس ومختص ميداني',
      labelEn: 'Certified Personnel',
    },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-slate-900 dark:bg-[#0B1929] text-white transition-colors duration-300 scroll-mt-28 theme-hero-bg">
      {/* Dynamic Slide Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id || currentSlideIndex}
          initial={{ opacity: 0, scale: 1.12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <img
            src={currentSlide.image}
            alt="Hero Background Slide"
            className="w-full h-full object-cover opacity-25 dark:opacity-20 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-[#0B1929]/80 to-[#0B1929]/50" />
        </motion.div>
      </AnimatePresence>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Animated Slide Text */}
          <div className="lg:col-span-6 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id || currentSlideIndex}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#112236]/90 border border-[#C9A961]/40 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C9A961]/20 text-[#C9A961]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#C9A961]">
                    {lang === 'ar'
                      ? currentSlide.badgeAr || settings.heroBadgeAr
                      : currentSlide.badgeEn || settings.heroBadgeEn}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#C9A961] animate-ping" />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.18] font-arabic gold-gradient-text">
                  {lang === 'ar' ? currentSlide.titleAr : currentSlide.titleEn}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed font-normal">
                  {lang === 'ar' ? currentSlide.subtitleAr : currentSlide.subtitleEn}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Benefits Pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />
                {lang === 'ar' ? 'حراس مدربون ومصرحون' : 'Certified Guards'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />
                {lang === 'ar' ? 'منظفات صديقة للبيئة ISO' : 'Eco-Friendly ISO Cleaners'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />
                {lang === 'ar' ? 'غرفة عمليات 24/7' : '24/7 Operations Room'}
              </span>
            </div>

            {/* Dual CTAs & Carousel Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteWithCategory('integrated')}
                className="gold-gradient-bg text-[#0B1929] hover:brightness-110 font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-[#C9A961]/25 transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Sparkles className="w-5 h-5 text-[#0B1929]" />
                <span>{lang === 'ar' ? 'اطلب عرض سعر الآن' : 'Get Free Quote Now'}</span>
                {lang === 'ar' ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <a
                href="#services"
                className="px-7 py-4 rounded-xl bg-[#112236]/90 hover:bg-[#182d46] text-slate-200 border border-slate-700/80 font-semibold text-base transition-all flex items-center justify-center gap-2.5 hover:border-[#C9A961]/50"
              >
                <span>{lang === 'ar' ? 'تصفح كافة الخدمات' : 'Explore All Services'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Card Showcase with Advanced Slide Transitions */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C9A961]/50 shadow-2xl bg-[#112236] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id || currentSlideIndex}
                  initial={{ opacity: 0, scale: 1.08, filter: 'brightness(1.15)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'brightness(0.85)' }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                  className="relative h-[380px] sm:h-[460px] lg:h-[500px] xl:h-[540px] w-full overflow-hidden"
                >
                  <motion.img
                    src={currentSlide.image}
                    alt={currentSlide.titleAr}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-[#0B1929]/20 to-transparent" />

                  {/* Floating slide badge info overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0B1929]/80 border border-[#C9A961]/40 text-xs font-bold text-[#C9A961] backdrop-blur-md">
                      0{currentSlideIndex + 1} / 0{slides.length}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#0B1929]/80 border border-white/20 text-xs font-semibold text-white/90 backdrop-blur-md">
                      {lang === 'ar' ? currentSlide.badgeAr : currentSlide.badgeEn}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Progress Timer Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-white/10 z-20">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-[#C9A961] to-[#FFF0CA]"
                />
              </div>

              {/* Slider Prev / Next Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex items-center justify-between pointer-events-none z-20">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-[#0B1929]/85 text-[#C9A961] border border-[#C9A961]/50 hover:bg-[#C9A961] hover:text-[#0B1929] hover:scale-110 transition-all pointer-events-auto cursor-pointer shadow-xl backdrop-blur-md"
                  aria-label="Previous Slide"
                >
                  <ChevronRight className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-[#0B1929]/85 text-[#C9A961] border border-[#C9A961]/50 hover:bg-[#C9A961] hover:text-[#0B1929] hover:scale-110 transition-all pointer-events-auto cursor-pointer shadow-xl backdrop-blur-md"
                  aria-label="Next Slide"
                >
                  <ChevronLeft className="w-5 h-5 rtl:rotate-0 ltr:rotate-180" />
                </button>
              </div>

              {/* Slider Dots & Indicators */}
              <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2.5 z-20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === currentSlideIndex
                        ? 'w-9 gold-gradient-bg shadow-md shadow-[#C9A961]/40'
                        : 'w-2.5 bg-white/40 hover:bg-white/90'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar at Bottom of Hero */}
      <div className="relative z-10 mt-16 border-t border-slate-800/80 bg-[#08121f]/90 backdrop-blur-xl py-8">
        <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#112236] border border-[#C9A961]/30 text-[#C9A961] group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center">
                      <span>{stat.value}</span>
                      <span className="text-[#C9A961]">{stat.suffix}</span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium mt-0.5">
                      {lang === 'ar' ? stat.labelAr : stat.labelEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
