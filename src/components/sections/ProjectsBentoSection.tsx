import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectItem } from '../../types';
import { Building, MapPin, Calendar, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsBentoSection: React.FC = () => {
  const { lang, projects, setSelectedProject } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'cleaning' | 'integrated'>('all');

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const filterTabs = [
    { id: 'all', labelAr: 'جميع المشاريع', labelEn: 'All Projects' },
    { id: 'security', labelAr: 'مشاريع الأمن', labelEn: 'Security' },
    { id: 'cleaning', labelAr: 'مشاريع النظافة', labelEn: 'Cleaning' },
    { id: 'integrated', labelAr: 'المشاريع الشاملة', labelEn: 'Integrated' },
  ];

  return (
    <section id="projects" className="py-24 relative bg-slate-50 dark:bg-[#0B1929] transition-colors overflow-hidden theme-projects-bg">
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'سابقة أعمالنا المتميزة' : 'Featured Case Studies'}
          badgeIcon={Building}
          title={lang === 'ar' ? 'مشاريع استراتيجية نفخر بتشغيلها وإدارتها' : 'Milestone Enterprise Deliveries'}
          subtitle={
            lang === 'ar'
              ? 'تصفح نماذج من الشراكات الناجحة التي أدرنا فيها الأمن والتشغيل والنظافة لأبرز المراكز الحيوية.'
              : 'Explore key operations managed by our security and facility sanitation teams.'
          }
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'gold-gradient-bg text-[#0B1929] shadow-lg shadow-[#C9A961]/20'
                  : 'bg-slate-200 dark:bg-[#112236] text-slate-700 dark:text-slate-300 hover:text-[#C9A961] border border-slate-300 dark:border-slate-800'
              }`}
            >
              {lang === 'ar' ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Create bento span variation for the first 2 items
              const isLarge = index === 0;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative rounded-2xl overflow-hidden glass-card border border-slate-200 dark:border-slate-800 hover:border-[#C9A961]/70 transition-all duration-500 cursor-pointer min-h-[360px] flex flex-col justify-end ${
                    isLarge ? 'md:col-span-2 lg:col-span-2 min-h-[400px]' : ''
                  }`}
                >
                  {/* Background Image with Hover Zoom */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={lang === 'ar' ? project.titleAr : project.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-[#0B1929]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 rtl:right-4 ltr:left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full gold-gradient-bg text-[#0B1929] text-xs font-extrabold shadow-md">
                      {lang === 'ar' ? project.badgeAr : project.badgeEn}
                    </span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 p-6 md:p-8 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-[#C9A961] font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {lang === 'ar' ? project.locationAr : project.locationEn}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {project.date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#C9A961] transition-colors leading-tight">
                      {lang === 'ar' ? project.titleAr : project.titleEn}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
                      {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                    </p>

                    {/* Stats & CTA */}
                    <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between gap-4">
                      <span className="text-xs font-mono font-semibold text-slate-200 bg-[#0B1929]/80 px-3 py-1.5 rounded-lg border border-slate-700">
                        {lang === 'ar' ? project.statsAr : project.statsEn}
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A961] group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                        <span>{lang === 'ar' ? 'عرض الحالة' : 'View Case'}</span>
                        {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </div>
                    </div>
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
