import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ColorPreset } from '../../types';
import { changeAdminPasswordApi } from '../../services/api';
import {
  Save,
  CheckCircle2,
  Globe,
  Share2,
  Palette,
  Sparkles,
  Sliders,
  Moon,
  Sun,
  Type,
  Layers,
  Eye,
  EyeOff,
  RotateCcw,
  Box,
  ShieldCheck,
  ExternalLink,
  Lock,
  KeyRound,
  AlertCircle,
} from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { lang, settings, updateSettings, changeColorPreset } = useApp();

  const [companyNameAr, setCompanyNameAr] = useState(settings.companyNameAr);
  const [companyNameEn, setCompanyNameEn] = useState(settings.companyNameEn);
  const [phone, setPhone] = useState(settings.phone);
  const [phoneSecondary, setPhoneSecondary] = useState(settings.phoneSecondary || '');
  const [email, setEmail] = useState(settings.email);
  const [emailSecondary, setEmailSecondary] = useState(settings.emailSecondary || '');
  const [addressAr, setAddressAr] = useState(settings.addressAr);
  const [addressEn, setAddressEn] = useState(settings.addressEn);
  const [workingHoursAr, setWorkingHoursAr] = useState(settings.workingHoursAr || 'غرفة العمليات: 24/7 | الإدارة: الأحد - الخميس 8 ص - 5 م');
  const [workingHoursEn, setWorkingHoursEn] = useState(settings.workingHoursEn || 'Command Center: 24/7 | Admin: Sun - Thu 8AM - 5PM');
  
  // Theme & Colors Preset
  const [themePreset, setThemePreset] = useState<ColorPreset>(settings.themePreset || 'gold');
  const [primaryColorHex, setPrimaryColorHex] = useState(settings.primaryColorHex || '#C9A961');
  const [secondaryColorHex, setSecondaryColorHex] = useState(settings.secondaryColorHex || '#0B1929');

  // Granular Typography Colors
  const [darkTextColor, setDarkTextColor] = useState(settings.darkTextColor || '#F8FAFC');
  const [darkMutedTextColor, setDarkMutedTextColor] = useState(settings.darkMutedTextColor || '#94A3B8');
  const [lightTextColor, setLightTextColor] = useState(settings.lightTextColor || '#0F172A');
  const [lightMutedTextColor, setLightMutedTextColor] = useState(settings.lightMutedTextColor || '#475569');

  // Granular Section Backgrounds (Dark Mode)
  const [heroBgDark, setHeroBgDark] = useState(settings.heroBgDark || '#0B1929');
  const [aboutBgDark, setAboutBgDark] = useState(settings.aboutBgDark || '#0D1D30');
  const [servicesBgDark, setServicesBgDark] = useState(settings.servicesBgDark || '#0B1929');
  const [subsidiariesBgDark, setSubsidiariesBgDark] = useState(settings.subsidiariesBgDark || '#0D1D30');
  const [projectsBgDark, setProjectsBgDark] = useState(settings.projectsBgDark || '#0B1929');
  const [whyUsBgDark, setWhyUsBgDark] = useState(settings.whyUsBgDark || '#0D1D30');
  const [testimonialsBgDark, setTestimonialsBgDark] = useState(settings.testimonialsBgDark || '#0B1929');
  const [quoteBgDark, setQuoteBgDark] = useState(settings.quoteBgDark || '#0D1D30');
  const [footerBgDark, setFooterBgDark] = useState(settings.footerBgDark || '#07111D');

  // Granular Section Backgrounds (Light Mode)
  const [heroBgLight, setHeroBgLight] = useState(settings.heroBgLight || '#0F172A');
  const [aboutBgLight, setAboutBgLight] = useState(settings.aboutBgLight || '#FFFFFF');
  const [servicesBgLight, setServicesBgLight] = useState(settings.servicesBgLight || '#F8FAFC');
  const [subsidiariesBgLight, setSubsidiariesBgLight] = useState(settings.subsidiariesBgLight || '#F1F5F9');
  const [projectsBgLight, setProjectsBgLight] = useState(settings.projectsBgLight || '#FFFFFF');
  const [whyUsBgLight, setWhyUsBgLight] = useState(settings.whyUsBgLight || '#F8FAFC');
  const [testimonialsBgLight, setTestimonialsBgLight] = useState(settings.testimonialsBgLight || '#FFFFFF');
  const [quoteBgLight, setQuoteBgLight] = useState(settings.quoteBgLight || '#F8FAFC');
  const [footerBgLight, setFooterBgLight] = useState(settings.footerBgLight || '#0F172A');

  // Cards & Containers Customization
  const [cardBgDark, setCardBgDark] = useState(settings.cardBgDark || '#112236');
  const [cardBgLight, setCardBgLight] = useState(settings.cardBgLight || '#FFFFFF');
  const [cardBorderDark, setCardBorderDark] = useState(settings.cardBorderDark || '#1E3A5F');
  const [cardBorderLight, setCardBorderLight] = useState(settings.cardBorderLight || '#E2E8F0');
  const [cardRadiusPx, setCardRadiusPx] = useState<number>(settings.cardRadiusPx || 16);

  // Hero Section
  const [heroBadgeAr, setHeroBadgeAr] = useState(settings.heroBadgeAr || '');
  const [heroBadgeEn, setHeroBadgeEn] = useState(settings.heroBadgeEn || '');
  const [heroTitleAr, setHeroTitleAr] = useState(settings.heroTitleAr || '');
  const [heroTitleEn, setHeroTitleEn] = useState(settings.heroTitleEn || '');
  const [heroSubtitleAr, setHeroSubtitleAr] = useState(settings.heroSubtitleAr || '');
  const [heroSubtitleEn, setHeroSubtitleEn] = useState(settings.heroSubtitleEn || '');

  // About Section
  const [aboutTitleAr, setAboutTitleAr] = useState(settings.aboutTitleAr || '');
  const [aboutTitleEn, setAboutTitleEn] = useState(settings.aboutTitleEn || '');
  const [aboutDescAr, setAboutDescAr] = useState(settings.aboutDescAr || '');
  const [aboutDescEn, setAboutDescEn] = useState(settings.aboutDescEn || '');

  // Stats
  const [yearsExperience, setYearsExperience] = useState(settings.yearsExperience);
  const [happyClients, setHappyClients] = useState(settings.happyClients);
  const [completedProjects, setCompletedProjects] = useState(settings.completedProjects);
  const [securityGuardsCount, setSecurityGuardsCount] = useState(settings.securityGuardsCount);

  // Social
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);
  const [twitterUrl, setTwitterUrl] = useState(settings.twitterUrl);
  const [linkedinUrl, setLinkedinUrl] = useState(settings.linkedinUrl);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '966555555555');
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState<'dark' | 'light'>('dark');

  const presetsList: { id: ColorPreset; nameAr: string; nameEn: string; hex: string; bgClass: string }[] = [
    { id: 'gold', nameAr: 'الذهبي الفاخر (الملكي)', nameEn: 'Royal Gold', hex: '#C9A961', bgClass: 'bg-[#C9A961]' },
    { id: 'blue', nameAr: 'الأزرق التكتيكي (الأمني)', nameEn: 'Tactical Blue', hex: '#2563EB', bgClass: 'bg-blue-600' },
    { id: 'emerald', nameAr: 'الأخضر البيئي (النظافة)', nameEn: 'Eco Emerald', hex: '#059669', bgClass: 'bg-emerald-600' },
    { id: 'purple', nameAr: 'النيون الإمبريالي', nameEn: 'Imperial Purple', hex: '#7C3AED', bgClass: 'bg-purple-600' },
    { id: 'custom', nameAr: 'الأحمر الميداني', nameEn: 'Crimson Defense', hex: '#DC2626', bgClass: 'bg-red-600' },
    { id: 'custom', nameAr: 'السايان التقني', nameEn: 'Tech Cyan', hex: '#06B6D4', bgClass: 'bg-cyan-500' },
  ];

  const handleSelectPreset = (preset: ColorPreset, hex: string) => {
    setThemePreset(preset);
    setPrimaryColorHex(hex);
    changeColorPreset(preset, hex);
  };

  const handleResetThemeToDefault = () => {
    setThemePreset('gold');
    setPrimaryColorHex('#C9A961');
    setSecondaryColorHex('#0B1929');

    setDarkTextColor('#F8FAFC');
    setDarkMutedTextColor('#94A3B8');
    setLightTextColor('#0F172A');
    setLightMutedTextColor('#475569');

    setHeroBgDark('#0B1929');
    setAboutBgDark('#0D1D30');
    setServicesBgDark('#0B1929');
    setSubsidiariesBgDark('#0D1D30');
    setProjectsBgDark('#0B1929');
    setWhyUsBgDark('#0D1D30');
    setTestimonialsBgDark('#0B1929');
    setQuoteBgDark('#0D1D30');
    setFooterBgDark('#07111D');

    setHeroBgLight('#0F172A');
    setAboutBgLight('#FFFFFF');
    setServicesBgLight('#F8FAFC');
    setSubsidiariesBgLight('#F1F5F9');
    setProjectsBgLight('#FFFFFF');
    setWhyUsBgLight('#F8FAFC');
    setTestimonialsBgLight('#FFFFFF');
    setQuoteBgLight('#F8FAFC');
    setFooterBgLight('#0F172A');

    setCardBgDark('#112236');
    setCardBgLight('#FFFFFF');
    setCardBorderDark('#1E3A5F');
    setCardBorderLight('#E2E8F0');
    setCardRadiusPx(16);

    changeColorPreset('gold', '#C9A961');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      companyNameAr,
      companyNameEn,
      phone,
      phoneSecondary,
      email,
      emailSecondary,
      addressAr,
      addressEn,
      workingHoursAr,
      workingHoursEn,

      themePreset,
      primaryColorHex,
      secondaryColorHex,

      darkTextColor,
      darkMutedTextColor,
      lightTextColor,
      lightMutedTextColor,

      heroBgDark,
      aboutBgDark,
      servicesBgDark,
      subsidiariesBgDark,
      projectsBgDark,
      whyUsBgDark,
      testimonialsBgDark,
      quoteBgDark,
      footerBgDark,

      heroBgLight,
      aboutBgLight,
      servicesBgLight,
      subsidiariesBgLight,
      projectsBgLight,
      whyUsBgLight,
      testimonialsBgLight,
      quoteBgLight,
      footerBgLight,

      cardBgDark,
      cardBgLight,
      cardBorderDark,
      cardBorderLight,
      cardRadiusPx: Number(cardRadiusPx),

      heroBadgeAr,
      heroBadgeEn,
      heroTitleAr,
      heroTitleEn,
      heroSubtitleAr,
      heroSubtitleEn,
      aboutTitleAr,
      aboutTitleEn,
      aboutDescAr,
      aboutDescEn,
      yearsExperience: Number(yearsExperience),
      happyClients: Number(happyClients),
      completedProjects: Number(completedProjects),
      securityGuardsCount: Number(securityGuardsCount),
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      instagramUrl,
      whatsappNumber,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    const curr = currentPassword.trim();
    const next = newPassword.trim();
    const conf = confirmPassword.trim();

    // 1. All fields filled
    if (!curr || !next || !conf) {
      setPasswordStatus({
        type: 'error',
        message:
          lang === 'ar'
            ? 'يرجى ملء جميع حقول كلمة المرور.'
            : 'Please fill in all password fields.',
      });
      return;
    }

    // 2. New password length >= 8 and contains letters & numbers
    const hasLetter = /[a-zA-Z]/.test(next);
    const hasNumber = /\d/.test(next);
    if (next.length < 8 || !hasLetter || !hasNumber) {
      setPasswordStatus({
        type: 'error',
        message:
          lang === 'ar'
            ? 'يجب أن تتكون كلمة المرور الجديدة من 8 خانات على الأقل وتحتوي على حروف وأرقام.'
            : 'New password must be at least 8 characters long and contain both letters and numbers.',
      });
      return;
    }

    // 3. New matches confirm
    if (next !== conf) {
      setPasswordStatus({
        type: 'error',
        message:
          lang === 'ar'
            ? 'كلمة المرور الجديدة وتأكيدها غير متطابقين.'
            : 'New password and confirmation do not match.',
      });
      return;
    }

    // 4. New does not match current
    if (next === curr) {
      setPasswordStatus({
        type: 'error',
        message:
          lang === 'ar'
            ? 'كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية.'
            : 'New password must be different from current password.',
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changeAdminPasswordApi(curr, next);
      if (res && res.success) {
        setPasswordStatus({
          type: 'success',
          message:
            lang === 'ar'
              ? 'تم تغيير كلمة المرور بنجاح.'
              : 'Password changed successfully.',
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        if (!res || res.error === 'connection_failed') {
          setPasswordStatus({
            type: 'error',
            message:
              lang === 'ar'
                ? 'تعذر الاتصال بالخادم.'
                : 'Could not connect to the server.',
          });
        } else if (res.error && res.error.includes('الحالية')) {
          setPasswordStatus({
            type: 'error',
            message:
              lang === 'ar'
                ? 'كلمة المرور الحالية غير صحيحة.'
                : 'Current password is incorrect.',
          });
        } else {
          setPasswordStatus({
            type: 'error',
            message:
              res.error ||
              (lang === 'ar' ? 'فشل تغيير كلمة المرور.' : 'Failed to change password.'),
          });
        }
      }
    } catch {
      setPasswordStatus({
        type: 'error',
        message:
          lang === 'ar'
            ? 'تعذر الاتصال بالخادم.'
            : 'Could not connect to the server.',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
          {lang === 'ar' ? 'إعدادات الموقع المتقدمة وتخصيص الثيم' : 'Global Settings & Advanced Theme Customization'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ar'
            ? 'تعديل ثيم وألوان الموقع بالتفصيل (ألوان الخطوط، خلفيات الأقسام، الكروت، اللون الرئيسي) وتعديل بيانات الاتصال والنصوص.'
            : 'Granular control over theme colors, typography, section backgrounds, cards, primary branding, and contact details.'}
        </p>
      </div>

      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl flex items-center justify-between flex-wrap gap-4 border border-emerald-400/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-arabic">
                  {lang === 'ar' ? 'تم حفظ وتطبيق التغييرات على الثيم بنجاح!' : 'Theme Settings Applied Successfully!'}
                </h4>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {lang === 'ar'
                    ? 'تم تحديث ألوان الثيم، الخطوط، الخلفيات والخريطة تلقائياً بالكامل في الواجهة الرئيسية للموقع.'
                    : 'Theme colors, section backgrounds, typography & maps synced instantly to the live main website.'}
                </p>
              </div>
            </div>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-extrabold text-xs flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'معاينة التغييرات بالصفحة الرئيسية' : 'Preview Live Website'}</span>
              <ExternalLink className="w-4 h-4 text-emerald-800" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* SECTION 1: Advanced Theme & Color Palette */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 flex-wrap gap-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#C9A961]" />
              <span>{lang === 'ar' ? 'تخصيص الثيم والألوان بالتفصيل' : 'Comprehensive Theme & Color Customizer'}</span>
            </h3>
            
            <button
              type="button"
              onClick={handleResetThemeToDefault}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>{lang === 'ar' ? 'إعادة ضبط الثيم للافتراضي' : 'Reset Theme Defaults'}</span>
            </button>
          </div>

          {/* Sub-panel 1.1: Primary Brand Colors & Presets */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A961]" />
              <span>{lang === 'ar' ? '1. اللون الرئيسي والنمط الملكي' : '1. Primary Brand Palette & Presets'}</span>
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {presetsList.map((p, idx) => (
                <button
                  type="button"
                  key={`${p.id}-${idx}`}
                  onClick={() => handleSelectPreset(p.id, p.hex)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2.5 transition-all cursor-pointer ${
                    primaryColorHex.toLowerCase() === p.hex.toLowerCase()
                      ? 'border-[#C9A961] bg-slate-100 dark:bg-slate-900 shadow-md shadow-[#C9A961]/20 scale-105'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full ${p.bgClass} border border-white/20 shadow-inner`} />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 text-center">
                    {lang === 'ar' ? p.nameAr : p.nameEn}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'اللون الأساسي الرئيسي (Hex Code):' : 'Primary Accent (Hex):'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColorHex}
                    onChange={(e) => {
                      setPrimaryColorHex(e.target.value);
                      setThemePreset('custom');
                      changeColorPreset('custom', e.target.value);
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-slate-300 dark:border-slate-700 p-0.5"
                  />
                  <input
                    type="text"
                    value={primaryColorHex}
                    onChange={(e) => {
                      setPrimaryColorHex(e.target.value);
                      setThemePreset('custom');
                      changeColorPreset('custom', e.target.value);
                    }}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-200 w-24"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'ar' ? 'اللون الثانوي الداعم (Secondary Hex):' : 'Secondary Color (Hex):'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={secondaryColorHex}
                    onChange={(e) => setSecondaryColorHex(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-slate-300 dark:border-slate-700 p-0.5"
                  />
                  <input
                    type="text"
                    value={secondaryColorHex}
                    onChange={(e) => setSecondaryColorHex(e.target.value)}
                    className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-200 w-24"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-panel 1.2: Typography & Line Colors */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Type className="w-4 h-4 text-[#C9A961]" />
              <span>{lang === 'ar' ? '2. ألوان الخطوط والنصوص (الوضع الليلي والنهاري)' : '2. Typography & Text Colors (Dark & Light)'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dark mode typography */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-white space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#C9A961]">
                  <Moon className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'ألوان نصوص الوضع الليلي (Dark Mode Text)' : 'Dark Mode Text Palette'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block mb-1 text-[11px] text-slate-300">{lang === 'ar' ? 'النص الرئيسي' : 'Primary Text'}</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={darkTextColor}
                        onChange={(e) => setDarkTextColor(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer p-0 border border-slate-600"
                      />
                      <input
                        type="text"
                        value={darkTextColor}
                        onChange={(e) => setDarkTextColor(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-[11px] text-slate-300">{lang === 'ar' ? 'النص الفرعي/المساعد' : 'Muted Text'}</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={darkMutedTextColor}
                        onChange={(e) => setDarkMutedTextColor(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer p-0 border border-slate-600"
                      />
                      <input
                        type="text"
                        value={darkMutedTextColor}
                        onChange={(e) => setDarkMutedTextColor(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[11px] font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Light mode typography */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <Sun className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'ألوان نصوص الوضع النهاري (Light Mode Text)' : 'Light Mode Text Palette'}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block mb-1 text-[11px] text-slate-700">{lang === 'ar' ? 'النص الرئيسي' : 'Primary Text'}</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={lightTextColor}
                        onChange={(e) => setLightTextColor(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer p-0 border border-slate-300"
                      />
                      <input
                        type="text"
                        value={lightTextColor}
                        onChange={(e) => setLightTextColor(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-[11px] font-mono text-slate-900"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-[11px] text-slate-700">{lang === 'ar' ? 'النص الفرعي/المساعد' : 'Muted Text'}</label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={lightMutedTextColor}
                        onChange={(e) => setLightMutedTextColor(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer p-0 border border-slate-300"
                      />
                      <input
                        type="text"
                        value={lightMutedTextColor}
                        onChange={(e) => setLightMutedTextColor(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-[11px] font-mono text-slate-900"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-panel 1.3: Section Background Colors */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C9A961]" />
              <span>{lang === 'ar' ? '3. خلفيات أقسام الموقع الرئيسية (Section Backgrounds)' : '3. Section Background Colors (Dark & Light)'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {[
                { nameAr: 'قسم الواجهة (Hero)', dark: heroBgDark, setDark: setHeroBgDark, light: heroBgLight, setLight: setHeroBgLight },
                { nameAr: 'قسم الخدمات (Services)', dark: servicesBgDark, setDark: setServicesBgDark, light: servicesBgLight, setLight: setServicesBgLight },
                { nameAr: 'الشركات التابعة (Subsidiaries)', dark: subsidiariesBgDark, setDark: setSubsidiariesBgDark, light: subsidiariesBgLight, setLight: setSubsidiariesBgLight },
                { nameAr: 'المشاريع والأعمال (Projects)', dark: projectsBgDark, setDark: setProjectsBgDark, light: projectsBgLight, setLight: setProjectsBgLight },
                { nameAr: 'لماذا نحن (Why Us)', dark: whyUsBgDark, setDark: setWhyUsBgDark, light: whyUsBgLight, setLight: setWhyUsBgLight },
                { nameAr: 'طلب العرض والاتصال (Quote/Contact)', dark: quoteBgDark, setDark: setQuoteBgDark, light: quoteBgLight, setLight: setQuoteBgLight },
                { nameAr: 'الفوتر السفلي (Footer)', dark: footerBgDark, setDark: setFooterBgDark, light: footerBgLight, setLight: setFooterBgLight },
              ].map((sec, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{sec.nameAr}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">داكن:</span>
                      <input
                        type="color"
                        value={sec.dark}
                        onChange={(e) => sec.setDark(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer p-0 border-0"
                      />
                      <input
                        type="text"
                        value={sec.dark}
                        onChange={(e) => sec.setDark(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-200"
                        dir="ltr"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">فاتح:</span>
                      <input
                        type="color"
                        value={sec.light}
                        onChange={(e) => sec.setLight(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer p-0 border-0"
                      />
                      <input
                        type="text"
                        value={sec.light}
                        onChange={(e) => sec.setLight(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-mono text-slate-800 dark:text-slate-200"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-panel 1.4: Card & Container Customization */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Box className="w-4 h-4 text-[#C9A961]" />
              <span>{lang === 'ar' ? '4. تخصيص خلفيات وحدود الكروت (Cards & Container Borders)' : '4. Cards & Container Customization'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">{lang === 'ar' ? 'خلفية الكروت (Card Bg)' : 'Card Bg Color'}</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Dark:</span>
                    <input type="color" value={cardBgDark} onChange={(e) => setCardBgDark(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Light:</span>
                    <input type="color" value={cardBgLight} onChange={(e) => setCardBgLight(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block">{lang === 'ar' ? 'إطار الكروت (Border Color)' : 'Card Border Color'}</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Dark:</span>
                    <input type="color" value={cardBorderDark} onChange={(e) => setCardBorderDark(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400">Light:</span>
                    <input type="color" value={cardBorderLight} onChange={(e) => setCardBorderLight(e.target.value)} className="w-6 h-6 rounded cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">{lang === 'ar' ? 'انحناء الزوايا (Border Radius)' : 'Border Radius'}</label>
                <select
                  value={cardRadiusPx}
                  onChange={(e) => setCardRadiusPx(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200"
                >
                  <option value={8}>8px - زوايا حادة خفيفة</option>
                  <option value={12}>12px - زوايا متناسقة</option>
                  <option value={16}>16px - زوايا انسيابية فاخرة (الافتراضي)</option>
                  <option value={20}>20px - زوايا عصرية دائرية</option>
                  <option value={24}>24px - زوايا دائرية فائقة</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sub-panel 1.5: Interactive Live Preview Card */}
          <div className="p-5 rounded-2xl border border-dashed border-[#C9A961]/40 bg-slate-100/50 dark:bg-slate-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#C9A961]" />
                {lang === 'ar' ? 'معاينة حية وتفاعلية لثيم الكروت والنصوص:' : 'Live Interactive Theme Preview Card:'}
              </span>
              
              <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewMode('dark')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                    previewMode === 'dark' ? 'bg-[#0B1929] text-[#C9A961]' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-3 h-3" /> الوضع الداكن
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('light')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                    previewMode === 'light' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Sun className="w-3 h-3 text-amber-500" /> الوضع الفاتح
                </button>
              </div>
            </div>

            {/* Simulated Live Card */}
            <div
              className="p-6 transition-all duration-300 border shadow-lg space-y-3 max-w-md mx-auto"
              style={{
                backgroundColor: previewMode === 'dark' ? cardBgDark : cardBgLight,
                borderColor: previewMode === 'dark' ? cardBorderDark : cardBorderLight,
                borderRadius: `${cardRadiusPx}px`,
                color: previewMode === 'dark' ? darkTextColor : lightTextColor,
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow"
                  style={{ backgroundColor: primaryColorHex }}
                >
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: `${primaryColorHex}25`, color: primaryColorHex }}
                >
                  معاينة مسبقة
                </span>
              </div>

              <h5 className="font-bold text-base" style={{ color: previewMode === 'dark' ? darkTextColor : lightTextColor }}>
                عنوان كارت الخدمات التجريبي
              </h5>

              <p className="text-xs" style={{ color: previewMode === 'dark' ? darkMutedTextColor : lightMutedTextColor }}>
                هذا النص يعكس لون الخط المساعد وحجم انحناء زوايا الكرت الذي تم تحديده في الإعدادات اعلاه.
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
                  style={{ backgroundColor: primaryColorHex, color: '#0B1929' }}
                >
                  زر الإجراء الرئيسي
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Identity & Contact Info */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Globe className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'بيانات الهوية والاتصال الموحدة' : 'Corporate Identity & Contact Info'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'اسم الشركة بالعربية' : 'Arabic Name'}</label>
              <input
                type="text"
                value={companyNameAr}
                onChange={(e) => setCompanyNameAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'اسم الشركة بالإنجليزية' : 'English Name'}</label>
              <input
                type="text"
                value={companyNameEn}
                onChange={(e) => setCompanyNameEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'رقم الهاتف الرئيسي' : 'Primary Phone'}</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'رقم الهاتف الثانوي (الطوارئ)' : 'Secondary Emergency Phone'}</label>
              <input
                type="text"
                value={phoneSecondary}
                onChange={(e) => setPhoneSecondary(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'البريد الإلكتروني الرئيسي (يظهر بالفوتر والنافبار)' : 'Primary Email (Navbar & Footer)'}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'بريد الدعم والمساندة الثانوي' : 'Secondary Support Email'}</label>
              <input
                type="email"
                value={emailSecondary}
                onChange={(e) => setEmailSecondary(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'العنوان بالعربية' : 'Arabic Address'}</label>
              <input
                type="text"
                value={addressAr}
                onChange={(e) => setAddressAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'العنوان بالإنجليزية' : 'English Address'}</label>
              <input
                type="text"
                value={addressEn}
                onChange={(e) => setAddressEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'ساعات العمل والإدارة (بالعربية)' : 'HQ Operating Hours (Arabic)'}</label>
              <input
                type="text"
                value={workingHoursAr}
                onChange={(e) => setWorkingHoursAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'ساعات العمل والإدارة (بالإنجليزية)' : 'HQ Operating Hours (English)'}</label>
              <input
                type="text"
                value={workingHoursEn}
                onChange={(e) => setWorkingHoursEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Hero Section Customization */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'تعديل نصوص واجهة الشاشة الرئيسية (Hero Section)' : 'Hero Banner Section Text'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'شارة الاعتماد العليا (عربي)' : 'Top Badge (Arabic)'}</label>
              <input
                type="text"
                value={heroBadgeAr}
                onChange={(e) => setHeroBadgeAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'شارة الاعتماد العليا (إنجليزي)' : 'Top Badge (English)'}</label>
              <input
                type="text"
                value={heroBadgeEn}
                onChange={(e) => setHeroBadgeEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'العنوان الرئيسي الهيرو (عربي)' : 'Hero Main Title (Arabic)'}</label>
              <input
                type="text"
                value={heroTitleAr}
                onChange={(e) => setHeroTitleAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'العنوان الرئيسي الهيرو (إنجليزي)' : 'Hero Main Title (English)'}</label>
              <input
                type="text"
                value={heroTitleEn}
                onChange={(e) => setHeroTitleEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'الوصف التوضيحي الهيرو (عربي)' : 'Hero Subtitle (Arabic)'}</label>
              <textarea
                rows={2}
                value={heroSubtitleAr}
                onChange={(e) => setHeroSubtitleAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'الوصف التوضيحي الهيرو (إنجليزي)' : 'Hero Subtitle (English)'}</label>
              <textarea
                rows={2}
                value={heroSubtitleEn}
                onChange={(e) => setHeroSubtitleEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Company Counters & Statistics */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إعداد إحصائيات وأرقام الإنجازات' : 'Company Achievement Counters'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'سنوات الخبرة' : 'Years Experience'}</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'عدد العملاء' : 'Clients Count'}</label>
              <input
                type="number"
                value={happyClients}
                onChange={(e) => setHappyClients(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'المشاريع المنفذة' : 'Completed Projects'}</label>
              <input
                type="number"
                value={completedProjects}
                onChange={(e) => setCompletedProjects(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 font-bold"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">{lang === 'ar' ? 'عدد الكوادر الحراس' : 'Guards Count'}</label>
              <input
                type="number"
                value={securityGuardsCount}
                onChange={(e) => setSecurityGuardsCount(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 font-bold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: Social Media */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Share2 className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'روابط وسائل التواصل الاجتماعي' : 'Social Media Handles'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Facebook URL</label>
              <input
                type="text"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Twitter / X URL</label>
              <input
                type="text"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">LinkedIn URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">Instagram URL</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                dir="ltr"
              />
            </div>
            <div className="sm:col-span-2 bg-[#25D366]/10 p-4 rounded-xl border border-[#25D366]/30">
              <label className="block mb-1 font-bold text-[#25D366]">
                {lang === 'ar' ? 'رقم الواتساب المخصص للزر العائم' : 'Floating WhatsApp Direct Number'}
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g. 966555555555"
                className="w-full bg-white dark:bg-slate-900 border border-[#25D366]/50 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#25D366] focus:outline-none"
                dir="ltr"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'ar'
                  ? 'أدخل الرقم مع مفتاح الدولة بدون علامة + (مثال: 966555555555). سيقوم الزر العائم بإرسال الرسائل الفورية لهذا الرقم مباشرة.'
                  : 'Include country code without + sign (e.g. 966555555555). The floating button will direct chats to this number.'}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-10 py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xl hover:brightness-110 transition-all scale-105"
          >
            <Save className="w-5 h-5" />
            <span>{lang === 'ar' ? 'حفظ وتطبيق جميع الإعدادات' : 'Save & Publish All Settings'}</span>
          </button>
        </div>
      </form>

      {/* SECTION: Security / Change Password */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Lock className="w-5 h-5 text-[#C9A961]" />
          <span>{lang === 'ar' ? 'الأمان / تغيير كلمة المرور' : 'Security / Change Password'}</span>
        </h3>

        <AnimatePresence mode="wait">
          {passwordStatus && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
                passwordStatus.type === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300'
              }`}
            >
              {passwordStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              )}
              <span>{passwordStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            {/* Field 1: Current Password */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 pe-10 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                  dir="ltr"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Field 2: New Password */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 pe-10 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                  dir="ltr"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                {lang === 'ar' ? '8 خانات على الأقل تحتوي حروفاً وأرقاماً' : 'At least 8 chars with letters & numbers'}
              </p>
            </div>

            {/* Field 3: Confirm New Password */}
            <div>
              <label className="block mb-1 font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 pe-10 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                  dir="ltr"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 end-0 pe-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
              {lang === 'ar'
                ? 'ملاحظة: بعد تغيير كلمة المرور ستبقى جلستك الحالية نشطة، لكن إن كنت مسجلًا على جهاز آخر فستحتاج لتسجيل الدخول مجددًا.'
                : 'Note: After changing your password, your current session will remain active, but other logged-in devices will need to sign in again.'}
            </p>

            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <KeyRound className="w-4 h-4" />
              <span>
                {isChangingPassword
                  ? lang === 'ar'
                    ? 'جاري التحديث...'
                    : 'Updating...'
                  : lang === 'ar'
                  ? 'تحديث كلمة المرور'
                  : 'Update Password'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
