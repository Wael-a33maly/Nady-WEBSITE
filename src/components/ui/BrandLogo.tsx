import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', iconOnly = false }) => {
  const { settings, lang, theme } = useApp();

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none min-w-0 ${className}`}>
      {settings.logoUrl ? (
        <img
          src={settings.logoUrl}
          alt={lang === 'ar' ? settings.companyNameAr : settings.companyNameEn}
          className="h-8 sm:h-10 w-auto object-contain shrink-0"
        />
      ) : (
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#112236] to-[#0B1929] border border-[#C9A961]/40 shadow-lg shadow-[#C9A961]/10 group transition-transform duration-300 hover:scale-105 shrink-0">
          {/* Outer glow aura */}
          <div className="absolute inset-0 rounded-xl bg-[#C9A961]/15 blur-md group-hover:bg-[#C9A961]/30 transition-all" />
          
          {/* Dual Shield & Sparkle Icon */}
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#C9A961] relative z-10 stroke-[2]" />
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 animate-pulse" />
        </div>
      )}

      {!iconOnly && (
        <div className="flex flex-col min-w-0">
          <span className={`font-black text-base sm:text-xl lg:text-2xl tracking-tight leading-tight flex items-center gap-1.5 truncate ${
            lang === 'ar' ? 'font-arabic' : 'font-sans'
          } ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <span className="truncate">{lang === 'ar' ? settings.logoTextAr : settings.logoTextEn}</span>
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C9A961] shrink-0" />
          </span>
          <span className="text-[9px] sm:text-[11px] tracking-wider sm:tracking-widest text-[#C9A961] uppercase font-bold truncate max-w-[130px] sm:max-w-none">
            {lang === 'ar'
              ? (settings.sloganAr || 'أمن ونظافة متكاملة')
              : (settings.sloganEn || 'Integrated Security & Hygiene')}
          </span>
        </div>
      )}
    </div>
  );
};
