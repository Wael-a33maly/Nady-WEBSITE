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
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {settings.logoUrl ? (
        <img
          src={settings.logoUrl}
          alt={lang === 'ar' ? settings.companyNameAr : settings.companyNameEn}
          className="h-10 w-auto object-contain"
        />
      ) : (
        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#112236] to-[#0B1929] border border-[#C9A961]/40 shadow-lg shadow-[#C9A961]/10 group transition-transform duration-300 hover:scale-105">
          {/* Outer glow aura */}
          <div className="absolute inset-0 rounded-xl bg-[#C9A961]/15 blur-md group-hover:bg-[#C9A961]/30 transition-all" />
          
          {/* Dual Shield & Sparkle Icon */}
          <Shield className="w-6 h-6 text-[#C9A961] relative z-10 stroke-[2]" />
          <Sparkles className="w-3.5 h-3.5 text-blue-400 absolute top-1.5 right-1.5 z-20 animate-pulse" />
        </div>
      )}

      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-black text-xl sm:text-2xl tracking-tight leading-tight flex items-center gap-1.5 font-arabic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {lang === 'ar' ? settings.logoTextAr : settings.logoTextEn}
            <span className="inline-block w-2 h-2 rounded-full bg-[#C9A961]" />
          </span>
          <span className="text-[11px] tracking-widest text-[#C9A961] uppercase font-bold">
            {lang === 'ar'
              ? (settings.sloganAr || 'أمن ونظافة متكاملة')
              : (settings.sloganEn || 'Integrated Security & Hygiene')}
          </span>
        </div>
      )}
    </div>
  );
};
