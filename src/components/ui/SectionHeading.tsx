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
  const { theme } = useApp();
  const isCenter = align === 'center';

  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-start'} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A961]/15 border border-[#C9A961]/40 text-[#C9A961] text-xs font-black uppercase tracking-wider mb-3 shadow-md"
      >
        {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
        <span>{badge}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl leading-[1.25] ${
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
          className={`mt-4 text-base md:text-lg max-w-2xl leading-relaxed font-medium ${
            theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
