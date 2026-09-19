import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SectionHeadingProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const { theme, lang } = useApp();
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col w-full ${isCenter ? 'items-center text-center' : 'items-start text-start'} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A961]/15 border border-[#C9A961]/40 text-[#C9A961] text-[11px] sm:text-xs font-black uppercase tracking-wider mb-3 shadow-md max-w-full"
      >
        {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />}
        <span className="truncate">{badge}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-snug sm:leading-[1.25] break-words ${
          lang === 'ar' ? 'font-arabic' : 'font-sans'
        } ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
