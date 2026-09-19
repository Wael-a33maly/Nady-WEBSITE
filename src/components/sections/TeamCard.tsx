import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import {
  Phone,
  Mail,
  Linkedin,
  ShieldCheck,
  RotateCw,
  ExternalLink,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const { lang } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);

  // Clean phone number for tel: link
  const rawPhone = member.phone ? member.phone.replace(/[\s\-\(\)]/g, '') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 h-[460px] sm:h-[480px] w-full group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      {/* 3D Flipping Container */}
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ease-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= FRONT SIDE ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden bg-white dark:bg-[#112236] border border-slate-200 dark:border-[#C9A961]/30 shadow-xl shadow-slate-200/50 dark:shadow-black/50 flex flex-col justify-between transition-all duration-300 group-hover:border-[#C9A961] group-hover:shadow-2xl group-hover:shadow-[#C9A961]/25">
          {/* Member Photo */}
          <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={member.image}
              alt={lang === 'ar' ? member.nameAr : member.nameEn}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Soft Gradient Overlay at bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Subtle flip hint badge on top corner */}
            <div className="absolute top-3.5 end-3.5 z-10">
              <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/80 flex items-center justify-center transition-transform duration-500 group-hover:rotate-180 group-hover:border-[#C9A961] group-hover:text-[#C9A961]" title={lang === 'ar' ? 'اقلب الكارت' : 'Flip card'}>
                <RotateCw className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Front Information: Strictly Name & Profession / Role */}
          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center text-center bg-gradient-to-b from-transparent to-slate-50/60 dark:to-black/20">
            <div className="space-y-2">
              <h3
                className={`text-lg sm:text-xl font-black text-slate-900 dark:text-white transition-colors group-hover:text-[#C9A961] leading-snug line-clamp-1 ${
                  lang === 'ar' ? 'font-arabic' : 'font-sans'
                }`}
              >
                {lang === 'ar' ? member.nameAr : member.nameEn}
              </h3>

              <div className="inline-block px-3.5 py-1 rounded-full bg-[#C9A961]/10 border border-[#C9A961]/30">
                <p className="text-xs font-black text-[#C9A961] tracking-wide line-clamp-1">
                  {lang === 'ar' ? member.roleAr : member.roleEn}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden rounded-3xl overflow-hidden bg-slate-900 dark:bg-[#0E1D30] text-white border-2 border-[#C9A961] shadow-2xl shadow-[#C9A961]/30 p-5 sm:p-6 flex flex-col justify-between z-20">
          {/* Header on Back: Avatar + Name + Role */}
          <div>
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#C9A961]/25">
              <div className="relative shrink-0">
                <img
                  src={member.image}
                  alt={lang === 'ar' ? member.nameAr : member.nameEn}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#C9A961] shadow-md"
                />
                <span className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>

              <div className="min-w-0 flex-1">
                <h4
                  className={`text-base font-black text-white leading-tight truncate ${
                    lang === 'ar' ? 'font-arabic' : 'font-sans'
                  }`}
                >
                  {lang === 'ar' ? member.nameAr : member.nameEn}
                </h4>
                <p className="text-xs text-[#C9A961] font-bold mt-0.5 truncate">
                  {lang === 'ar' ? member.roleAr : member.roleEn}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{lang === 'ar' ? 'ترخيص قيادي معتمد' : 'Accredited Leadership'}</span>
                </div>
              </div>
            </div>

            {/* Experience / Bio Section */}
            <div className="py-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#C9A961]">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'الخبرة الميدانية والإشراف' : 'Credentials & Expertise'}</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal bg-black/30 p-3 rounded-2xl border border-white/5 line-clamp-4 text-justify">
                {lang === 'ar' ? member.bioAr : member.bioEn}
              </p>
            </div>
          </div>

          {/* Contact and Actions on Back */}
          <div className="space-y-2.5 pt-2 border-t border-[#C9A961]/20">
            {/* Direct Call Button (Highlighted Gold Gradient Button) */}
            {member.phone ? (
              <a
                href={`tel:${rawPhone}`}
                onClick={(e) => e.stopPropagation()}
                className="w-full py-2.5 px-4 rounded-xl gold-gradient-bg text-[#0B1929] font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C9A961]/25 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <div className="p-1 rounded-lg bg-black/10">
                  <Phone className="w-4 h-4 fill-current animate-bounce" />
                </div>
                <div className="flex items-center gap-2">
                  <span>{lang === 'ar' ? 'اتصال مباشر:' : 'Direct Call:'}</span>
                  <span dir="ltr" className="font-mono text-xs font-bold tracking-tight">
                    {member.phone}
                  </span>
                </div>
              </a>
            ) : (
              <div className="w-full py-2 px-3 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 text-[11px] text-center">
                {lang === 'ar' ? 'رقم الهاتف المباشر متاح عبر الإدارة العامة' : 'Direct line available via HQ'}
              </div>
            )}

            {/* Secondary Contact Row (Email & LinkedIn) */}
            <div className="grid grid-cols-2 gap-2">
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#C9A961]/40 text-slate-200 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all truncate"
                  title={member.email}
                >
                  <Mail className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
                  <span className="truncate">{lang === 'ar' ? 'مراسلة بريدية' : 'Email'}</span>
                </a>
              ) : (
                <div className="py-2 px-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 text-[11px] text-center truncate">
                  {lang === 'ar' ? 'بريد رسمي' : 'Official Mail'}
                </div>
              )}

              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="py-2 px-2.5 rounded-xl bg-[#0077B5]/20 hover:bg-[#0077B5]/40 border border-[#0077B5]/40 text-sky-300 hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all truncate"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">LinkedIn</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              ) : (
                <div className="py-2 px-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 text-[11px] text-center truncate">
                  {lang === 'ar' ? 'ملف المنصة' : 'Profile'}
                </div>
              )}
            </div>

            {/* Card Flip-Back Return Note */}
            <div className="text-center text-[10px] text-slate-400 pt-0.5 flex items-center justify-center gap-1">
              <RotateCw className="w-2.5 h-2.5" />
              <span>{lang === 'ar' ? 'انقر أو أبعد الماوس للعودة لصورة القائد' : 'Move cursor away to flip back'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
