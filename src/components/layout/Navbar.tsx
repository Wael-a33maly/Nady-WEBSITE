import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import {
  PhoneCall,
  Mail,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    lang,
    toggleLang,
    theme,
    toggleTheme,
    settings,
    openQuoteWithCategory,
    setIsCareersPageOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { href: '#subsidiaries', labelAr: 'شركاتنا التابعة', labelEn: 'Subsidiaries' },
    { href: '#why-us', labelAr: 'لماذا نحن', labelEn: 'Why Us' },
    { href: '#services', labelAr: 'خدماتنا', labelEn: 'Services' },
    { href: '#projects', labelAr: 'المشاريع', labelEn: 'Projects' },
    { href: '#careers', labelAr: 'الوظائف', labelEn: 'Careers' },
    { href: '#clients', labelAr: 'العملاء', labelEn: 'Clients' },
    { href: '#team', labelAr: 'الفريق', labelEn: 'Team' },
    { href: '#contact', labelAr: 'التواصل', labelEn: 'Contact' },
  ];

  return (
    <>
      {/* Top Scroll Shield: Smooth ambient backdrop only when scrolled, no harsh white glow over hero */}
      <div
        className={`fixed top-0 inset-x-0 h-24 sm:h-28 z-30 pointer-events-none transition-opacity duration-500 ${
          isScrolled
            ? theme === 'dark'
              ? 'opacity-100 bg-gradient-to-b from-[#0B1929] via-[#0B1929]/90 to-transparent'
              : 'opacity-100 bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/60 to-transparent'
            : 'opacity-0'
        }`}
      />

      <header className="fixed top-3 inset-x-3 sm:inset-x-6 lg:inset-x-8 max-w-[1700px] mx-auto z-40">
        <div
          className={`w-full rounded-2xl lg:rounded-full border backdrop-blur-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 ${
            theme === 'dark'
              ? 'bg-[#0B1929]/95 border-slate-700/80 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(201,169,97,0.12)]'
              : 'bg-white/95 border-[#C9A961]/35 text-slate-900 shadow-[0_10px_30px_-5px_rgba(11,25,41,0.08),0_0_20px_rgba(201,169,97,0.14)]'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <BrandLogo />
          </a>

          {/* Desktop Nav Items - Enforced single line whitespace-nowrap */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#careers') {
                    e.preventDefault();
                    setIsCareersPageOpen(true);
                  }
                }}
                className={`text-xs xl:text-sm 2xl:text-base font-black transition-colors relative py-1 group whitespace-nowrap shrink-0 cursor-pointer ${
                  theme === 'dark' ? 'text-white hover:text-[#C9A961]' : 'text-slate-900 hover:text-[#C9A961]'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A961] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Email Link */}
            <a
              href={`mailto:${settings.email}`}
              className={`hidden 2xl:flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all shadow-sm whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-[#112236] text-white border-[#C9A961]/40 hover:border-[#C9A961]'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
              }`}
              title={settings.email}
            >
              <Mail className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
              <span className="whitespace-nowrap">{settings.email}</span>
            </a>

            {/* Phone Link */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full border transition-all shadow-sm whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-[#112236] text-white border-[#C9A961]/40 hover:border-[#C9A961]'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
              <span dir="ltr">{settings.phone}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black border transition-all shadow-sm cursor-pointer whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-[#112236] text-white border-[#C9A961]/40 hover:border-[#C9A961] hover:text-[#C9A961]'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200 hover:text-[#C9A961]'
              }`}
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A961] shrink-0" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Light/Dark Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all shadow-sm cursor-pointer shrink-0 ${
                theme === 'dark'
                  ? 'bg-[#112236] text-white border-[#C9A961]/40 hover:border-[#C9A961]'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {/* Request Quote Button */}
            <button
              onClick={() => openQuoteWithCategory('integrated')}
              className="gold-gradient-bg text-[#0B1929] hover:brightness-110 font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-[#C9A961]/20 transition-all flex items-center gap-1.5 group cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-[#0B1929]" />
              <span>{lang === 'ar' ? 'اطلب عرض' : 'Request Quote'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 min-w-[38px] min-h-[38px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
            </button>
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 min-h-[38px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#C9A961]/20 text-[#C9A961] border border-[#C9A961]/30 focus:outline-none cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 sm:inset-x-4 top-16 sm:top-20 z-40 bg-white/98 dark:bg-[#0B1929]/98 backdrop-blur-2xl border border-slate-200 dark:border-[#C9A961]/30 rounded-3xl lg:hidden shadow-2xl overflow-hidden max-h-[calc(100vh-5.5rem)] flex flex-col"
          >
            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto overscroll-contain">
              <div className="flex flex-col space-y-0.5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.href === '#careers') {
                        e.preventDefault();
                        setIsCareersPageOpen(true);
                      }
                    }}
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-[#C9A961] dark:hover:text-[#C9A961] py-2.5 sm:py-3 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between"
                  >
                    <span>{lang === 'ar' ? link.labelAr : link.labelEn}</span>
                    <ArrowLeft className="w-4 h-4 text-slate-400 rtl:rotate-0 ltr:rotate-180 shrink-0" />
                  </a>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
                >
                  <Mail className="w-4 h-4 text-[#C9A961] shrink-0" />
                  <span className="truncate">{settings.email}</span>
                </a>

                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
                >
                  <PhoneCall className="w-4 h-4 text-[#C9A961] shrink-0" />
                  <span dir="ltr">{settings.phone}</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteWithCategory('integrated');
                  }}
                  className="w-full py-3 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-sm shadow-lg shadow-[#C9A961]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>{lang === 'ar' ? 'اطلب عرض سعر مجاني' : 'Request Free Quote'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


