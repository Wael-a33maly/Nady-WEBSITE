import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceItem } from '../../types';
import {
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Camera,
  Bug,
  HeartPulse,
  Wind,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  Camera,
  Bug,
  HeartPulse,
  Wind,
};

export const ServicesSection: React.FC = () => {
  const { lang, services, setSelectedService, openQuoteWithCategory } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'security' | 'cleaning' | 'integrated'>('all');

  const filteredServices = services.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const categories = [
    { id: 'all', labelAr: 'جميع الخدمات', labelEn: 'All Services' },
    { id: 'security', labelAr: 'الخدمات الأمنية', labelEn: 'Security Guarding' },
    { id: 'cleaning', labelAr: 'خدمات النظافة', labelEn: 'Sanitation & Cleaning' },
    { id: 'integrated', labelAr: 'الحلول المتكاملة', labelEn: 'Integrated Solutions' },
  ];

  return (
    <section id="services" className="py-24 relative bg-slate-100/70 dark:bg-[#08121f] transition-colors overflow-hidden theme-services-bg">
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'خدماتنا المتخصصة' : 'Our Core Services'}
          badgeIcon={Sparkles}
          title={lang === 'ar' ? 'حلول أمان ونظافة متكاملة تحت سقف واحد' : 'Comprehensive Security & Hygiene Offerings'}
          subtitle={
            lang === 'ar'
              ? 'نقدّم باقة واسعة من الخدمات المصممة خصيصًا لتلبية تطلعات الشركات، المؤسسات، والأبراج التجارية.'
              : 'Tailored facility management services designed for modern enterprises and commercial centers.'
          }
        />

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'gold-gradient-bg text-[#0B1929] shadow-lg shadow-[#C9A961]/20 scale-105'
                  : 'bg-slate-200 dark:bg-[#112236] text-slate-700 dark:text-slate-300 hover:text-[#C9A961] dark:hover:text-[#C9A961] border border-slate-300 dark:border-slate-800'
              }`}
            >
              {lang === 'ar' ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service, idx) => {
              const IconComponent = iconMap[service.iconName] || ShieldCheck;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#112236] border border-slate-200 dark:border-[#C9A961]/30 hover:border-[#C9A961] transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:shadow-[#C9A961]/20 flex flex-col justify-between group relative"
                >
                  {/* Subtle top glow highlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div>
                    {/* Service Image Header */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={service.image}
                        alt={lang === 'ar' ? service.titleAr : service.titleEn}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#112236] via-slate-900/40 dark:via-[#112236]/40 to-transparent" />

                      {/* Icon Badge */}
                      <div className="absolute bottom-3 right-4 rtl:right-4 ltr:left-4 w-12 h-12 rounded-xl bg-slate-900 dark:bg-[#0F2338] border border-[#C9A961]/60 flex items-center justify-center text-[#C9A961] shadow-xl group-hover:bg-[#C9A961] group-hover:text-[#0B1929] group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-6 h-6 stroke-[2]" />
                      </div>

                      {/* Popular Tag */}
                      {service.popular && (
                        <div className="absolute top-3 right-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full gold-gradient-bg text-[#0B1929] text-[11px] font-black uppercase shadow-md">
                          {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                        </div>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-4 relative z-10">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors leading-snug">
                        {lang === 'ar' ? service.titleAr : service.titleEn}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-200 font-medium leading-relaxed line-clamp-3">
                        {lang === 'ar' ? service.descAr : service.descEn}
                      </p>

                      {/* Key features bullets */}
                      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {(lang === 'ar' ? service.featuresAr : service.featuresEn).slice(0, 3).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-[#C9A961] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 flex items-center justify-between gap-3 relative z-10">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-black text-[#C9A961] hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'اعرف المزيد التفاصيل' : 'Learn More'}</span>
                      {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => openQuoteWithCategory(service.category)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C9A961]/15 text-[#C9A961] hover:bg-[#C9A961] hover:text-[#0B1929] border border-[#C9A961]/40 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'اطلب سعر' : 'Quote'}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
