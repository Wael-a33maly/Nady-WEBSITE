import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShieldCheck,
  ArrowUp,
  FileText,
  LayoutDashboard,
  Lock,
} from 'lucide-react';
import { PrivacyModal } from '../modals/PrivacyModal';

export const Footer: React.FC = () => {
  const { lang, settings, openQuoteWithCategory, isAdmin } = useApp();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <>
      <footer className="relative bg-[#08101a] text-slate-300 border-t border-[#C9A961]/40 overflow-hidden pt-16 pb-8 theme-footer-bg">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 gold-gradient-bg blur-sm opacity-70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Column 1: Brand Info */}
            <div className="lg:col-span-4 space-y-5">
              <BrandLogo />
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-arabic">
                {lang === 'ar'
                  ? 'شركة حارس ونقاء - حلول أمن ونظافة متكاملة تحت سقف واحد بكوادر مؤهلة معتمدة وأحدث التقنيات الذكية معتمدة ISO.'
                  : 'Hares & Niqaa Co. - Integrated guarding & commercial sanitation engineered for modern enterprises.'}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-2">
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#C9A961] hover:text-[#C9A961] flex items-center justify-center transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.twitterUrl && (
                  <a
                    href={settings.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#C9A961] hover:text-[#C9A961] flex items-center justify-center transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {settings.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#C9A961] hover:text-[#C9A961] flex items-center justify-center transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#C9A961] hover:text-[#C9A961] flex items-center justify-center transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#C9A961]">
                {lang === 'ar' ? 'روابط سريعة' : 'Navigation'}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#home" className="hover:text-[#C9A961] transition-colors">
                    {lang === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
                  </a>
                </li>
                <li>
                  <a href="#subsidiaries" className="hover:text-[#C9A961] transition-colors font-semibold text-[#C9A961]">
                    {lang === 'ar' ? 'شركاتنا التابعة' : 'Our Subsidiaries'}
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-[#C9A961] transition-colors">
                    {lang === 'ar' ? 'لماذا نحن' : 'Why Choose Us'}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#C9A961] transition-colors">
                    {lang === 'ar' ? 'خدماتنا' : 'Services'}
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-[#C9A961] transition-colors">
                    {lang === 'ar' ? 'سابقة الأعمال' : 'Projects Portfolio'}
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-[#C9A961] transition-colors">
                    {lang === 'ar' ? 'فريق القيادة' : 'Leadership Team'}
                  </a>
                </li>
                <li className="pt-2 border-t border-slate-800/80">
                  <a
                    href="/admin"
                    onClick={navigateToAdmin}
                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isAdmin ? (lang === 'ar' ? 'لوحة تحكم الإدارة' : 'Admin Portal') : (lang === 'ar' ? 'تسجيل دخول الإدارة' : 'Admin Login')}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Main Services */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#C9A961]">
                {lang === 'ar' ? 'خدماتنا الرئيسية' : 'Our Capabilities'}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <button onClick={() => openQuoteWithCategory('security')} className="hover:text-[#C9A961] transition-colors text-start">
                    {lang === 'ar' ? 'الحراسة الأمنية للمنشآت' : 'Facility Guarding'}
                  </button>
                </li>
                <li>
                  <button onClick={() => openQuoteWithCategory('cleaning')} className="hover:text-[#C9A961] transition-colors text-start">
                    {lang === 'ar' ? 'النظافة الشاملة للمكاتب' : 'Commercial Deep Cleaning'}
                  </button>
                </li>
                <li>
                  <button onClick={() => openQuoteWithCategory('security')} className="hover:text-[#C9A961] transition-colors text-start">
                    {lang === 'ar' ? 'أمن الفعاليات والمؤتمرات' : 'Event & Expo Security'}
                  </button>
                </li>
                <li>
                  <button onClick={() => openQuoteWithCategory('cleaning')} className="hover:text-[#C9A961] transition-colors text-start">
                    {lang === 'ar' ? 'غسيل الواجهات الزجاجية' : 'High-Rise Window Cleaning'}
                  </button>
                </li>
                <li>
                  <button onClick={() => openQuoteWithCategory('integrated')} className="hover:text-[#C9A961] transition-colors text-start">
                    {lang === 'ar' ? 'أنظمة المراقبة ومكافحة الآفات' : 'AI CCTV & Pest Control'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#C9A961]">
                {lang === 'ar' ? 'معلومات الاتصال والمقر' : 'HQ Contact & Support'}
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
                  <span>{lang === 'ar' ? settings.addressAr : settings.addressEn}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C9A961] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors" dir="ltr">
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C9A961] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#C9A961] transition-colors underline decoration-[#C9A961]/40">
                    {settings.email}
                  </a>
                </div>
                {settings.emailSecondary && (
                  <div className="flex items-center gap-2.5 pl-6 rtl:pr-6 rtl:pl-0">
                    <span className="text-[11px] text-slate-500">{lang === 'ar' ? 'الدعم:' : 'Support:'}</span>
                    <a href={`mailto:${settings.emailSecondary}`} className="hover:text-white transition-colors">
                      {settings.emailSecondary}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400">
                {lang === 'ar' ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} لـ` : `© ${new Date().getFullYear()} All Rights Reserved by`}
              </span>
              <span className="font-black text-[#C9A961] bg-[#C9A961]/10 px-2.5 py-1 rounded-lg border border-[#C9A961]/30 tracking-wider shadow-sm hover:border-[#C9A961] transition-all">
                A33maly
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="/admin"
                onClick={navigateToAdmin}
                className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-800/50 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 font-semibold"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'ar' ? 'بوابة الإدارة' : 'Admin Portal'}</span>
              </a>

              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-[#C9A961] transition-colors"
              >
                {lang === 'ar' ? 'سياسة الخصوصية والشروط' : 'Privacy & Terms'}
              </button>

              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#C9A961] flex items-center justify-center transition-all"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {privacyModalOpen && <PrivacyModal onClose={() => setPrivacyModalOpen(false)} />}
    </>
  );
};
