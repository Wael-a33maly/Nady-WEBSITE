import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/3DTiltCard';
import { ShieldAlert, Award, Clock, Cpu, CheckCircle, Sparkles, ShieldCheck, Zap, Star, Lock, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  ShieldAlert,
  Award,
  Clock,
  Cpu,
  ShieldCheck,
  Zap,
  Star,
  Lock,
  HeartHandshake,
  Sparkles,
};

export const WhyUsSection: React.FC = () => {
  const { lang, theme, whyUsFeatures, settings } = useApp();

  return (
    <section id="why-us" className="py-24 relative bg-slate-50 dark:bg-[#0B1929] transition-colors overflow-hidden theme-whyus-bg">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? `لماذا تختار ${settings.logoTextAr || 'المحيط الفضي'}` : `Why Choose ${settings.logoTextEn || 'Silver Ocean'}`}
          badgeIcon={Award}
          title={lang === 'ar' ? 'المعايير التي تجعلنا الخيار الأول للمنشآت الكبرى' : 'The Pillars That Make Us The Industry Leader'}
          subtitle={
            lang === 'ar'
              ? 'نجمع بين الخبرة الميدانية العميقة والتكنولوجيا الذكية لنقدّم لك راحة بال تامة وجودة لا تُضاهى.'
              : 'Combining extensive field experience with smart technology to deliver total peace of mind.'
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-16">
          {whyUsFeatures.map((item, idx) => {
            const Icon = iconMap[item.iconName] || ShieldCheck;
            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <TiltCard
                  className={`h-full rounded-2xl p-5 sm:p-6 lg:p-8 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-[#112236] border-[#C9A961]/30 shadow-xl shadow-black/40 hover:border-[#C9A961] hover:shadow-2xl hover:shadow-[#C9A961]/20'
                      : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-[#C9A961] hover:shadow-2xl'
                  }`}
                >
                  {/* Subtle hover gradient sweep */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    {/* Icon Container */}
                    <div className="flex items-center justify-between gap-2">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-lg shrink-0 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-[#1A314D] to-[#0F2338] border-[#C9A961]/50 text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0B1929] group-hover:scale-110 shadow-[#C9A961]/15'
                            : 'bg-slate-100 border-[#C9A961]/40 text-[#C9A961] group-hover:bg-[#C9A961] group-hover:text-[#0B1929] group-hover:scale-110 shadow-slate-300/40'
                        }`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-md bg-[#C9A961]/15 text-[#C9A961] border border-[#C9A961]/30 shadow-sm truncate max-w-[150px]">
                        {lang === 'ar' ? item.badgeAr : item.badgeEn}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg sm:text-xl font-black leading-snug break-words transition-colors group-hover:text-[#C9A961] ${
                        lang === 'ar' ? 'font-arabic' : 'font-sans'
                      } ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-medium ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
                      }`}
                    >
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>

                  {/* Bottom subtle check indicator */}
                  <div
                    className={`pt-4 sm:pt-6 mt-4 sm:mt-6 border-t flex items-center gap-2 text-xs font-black text-[#C9A961] relative z-10 ${
                      theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-[#C9A961] shrink-0" />
                    <span className="truncate">{lang === 'ar' ? 'خدمة مضمونة 100%' : '100% Guaranteed Quality'}</span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
