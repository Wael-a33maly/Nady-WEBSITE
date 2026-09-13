import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import { Users, Linkedin, Mail, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const TeamSection: React.FC = () => {
  const { lang, team } = useApp();

  return (
    <section id="team" className="py-24 relative bg-slate-50 dark:bg-[#0B1929] transition-colors overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1650px] 3xl:max-w-[1850px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <SectionHeading
          badge={lang === 'ar' ? 'فريق العمل القيادي' : 'Leadership & Experts'}
          badgeIcon={Users}
          title={lang === 'ar' ? 'خبرات ميدانية وعسكرية وإدارية تقود التميز' : 'Commanders & Operations Strategists'}
          subtitle={
            lang === 'ar'
              ? 'يقود شركتنا نخب من القادة والمختصين في التخطيط الأمني الميداني وإدارة معايير النظافة والبيئة.'
              : 'Our executive team brings military, environmental, and corporate facility management command.'
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#112236] border border-slate-200 dark:border-[#C9A961]/30 hover:border-[#C9A961] transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-black/40 hover:shadow-2xl hover:shadow-[#C9A961]/20 group flex flex-col justify-between relative"
            >
              <div>
                {/* Member Photo */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-800">
                  <img
                    src={member.image}
                    alt={lang === 'ar' ? member.nameAr : member.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-[#112236] via-slate-900/30 dark:via-[#112236]/30 to-transparent" />

                  {/* Social Overlay Bar */}
                  <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-[#0B1929] border border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961] hover:text-[#0B1929] transition-all shadow-lg"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-2.5 rounded-xl bg-[#0B1929] border border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961] hover:text-[#0B1929] transition-all shadow-lg"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="p-2.5 rounded-xl bg-[#0B1929] border border-[#C9A961]/40 text-[#C9A961] hover:bg-[#C9A961] hover:text-[#0B1929] transition-all shadow-lg"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Member Text Info */}
                <div className="p-6 space-y-2 text-center">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#C9A961] transition-colors leading-snug">
                    {lang === 'ar' ? member.nameAr : member.nameEn}
                  </h3>
                  <p className="text-xs font-black text-[#C9A961] tracking-wide">
                    {lang === 'ar' ? member.roleAr : member.roleEn}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-200 font-medium leading-relaxed pt-2 line-clamp-3">
                    {lang === 'ar' ? member.bioAr : member.bioEn}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 text-center">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" />
                  {lang === 'ar' ? 'اعتماد أمني وتراخيص' : 'Verified Command staff'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
