import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import { Upload, Image as ImageIcon, CheckCircle2, RotateCcw, Save, Shield } from 'lucide-react';

export const LogoManager: React.FC = () => {
  const { lang, settings, updateSettings } = useApp();

  const [logoTextAr, setLogoTextAr] = useState(settings.logoTextAr);
  const [logoTextEn, setLogoTextEn] = useState(settings.logoTextEn);
  const [sloganAr, setSloganAr] = useState(settings.sloganAr || 'أمن ونظافة متكاملة');
  const [sloganEn, setSloganEn] = useState(settings.sloganEn || 'Integrated Security & Hygiene');
  const [customLogoUrl, setCustomLogoUrl] = useState(settings.logoUrl || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomLogoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateSettings({
      logoUrl: customLogoUrl,
      logoTextAr,
      logoTextEn,
      sloganAr,
      sloganEn,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = () => {
    setCustomLogoUrl('');
    setLogoTextAr('حارس ونقاء');
    setLogoTextEn('HARES & NIQAA');
    setSloganAr('أمن ونظافة متكاملة');
    setSloganEn('Integrated Security & Hygiene');
    updateSettings({
      logoUrl: '',
      logoTextAr: 'حارس ونقاء',
      logoTextEn: 'HARES & NIQAA',
      sloganAr: 'أمن ونظافة متكاملة',
      sloganEn: 'Integrated Security & Hygiene',
    });
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
          {lang === 'ar' ? 'إدارة الشعار وهوية الشركة (Logo Manager)' : 'Company Logo & Brand Identity Manager'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ar'
            ? 'يمكنك رفع شعار جديد (PNG, SVG, WebP) أو تخصيص النص وسيعكس الشعار فورًا في جميع صفحات الموقع والهيدر والفوتر.'
            : 'Upload a custom logo image or change brand text. Updates apply live across site header & footer.'}
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>
            {lang === 'ar'
              ? 'تم حفظ وتحديث الشعار بنجاح في كامل الموقع!'
              : 'Logo updated successfully across all site components!'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload & Controls Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'رفع ملف شعار جديد' : 'Upload Logo File'}</span>
          </h3>

          {/* File Drag Box */}
          <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-[#C9A961] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors text-center space-y-3 bg-slate-50 dark:bg-slate-900/60">
            <div className="w-12 h-12 rounded-full bg-[#C9A961]/10 text-[#C9A961] flex items-center justify-center border border-[#C9A961]/30">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'اضغط لتحديد صورة الشعار' : 'Click to select logo image'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">PNG, SVG, WebP (Max 5MB)</p>
            </div>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Or Paste URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {lang === 'ar' ? 'أو أدخل رابط الشعار (Image URL):' : 'Or enter Image URL:'}
            </label>
            <input
              type="text"
              value={customLogoUrl}
              onChange={(e) => setCustomLogoUrl(e.target.value)}
              placeholder="https://example.com/logo.svg"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
            />
          </div>

          {/* Text options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'اسم الشعار بالعربية' : 'Arabic Brand Name'}
              </label>
              <input
                type="text"
                value={logoTextAr}
                onChange={(e) => setLogoTextAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'اسم الشعار بالإنجليزية' : 'English Brand Name'}
              </label>
              <input
                type="text"
                value={logoTextEn}
                onChange={(e) => setLogoTextEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
          </div>

          {/* Slogan options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'السلوجن / الشعار اللفظي (بالعربية)' : 'Brand Slogan (Arabic)'}
              </label>
              <input
                type="text"
                value={sloganAr}
                onChange={(e) => setSloganAr(e.target.value)}
                placeholder="أمن ونظافة متكاملة"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {lang === 'ar' ? 'السلوجن / الشعار اللفظي (بالإنجليزية)' : 'Brand Slogan (English)'}
              </label>
              <input
                type="text"
                value={sloganEn}
                onChange={(e) => setSloganEn(e.target.value)}
                placeholder="Integrated Security & Hygiene"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-500 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset Default'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-110"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ar' ? 'حفظ الشعار الآن' : 'Save Live Logo'}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'معاينة مباشرة في الواجهة (Live Preview)' : 'Live UI Preview'}</span>
          </h3>

          <div className="space-y-4">
            {/* Dark Header Style */}
            <div className="p-4 rounded-xl bg-[#0B1929] border border-[#C9A961]/30">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">
                Header Preview (Dark Mode)
              </span>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B1929] border border-slate-800">
                <BrandLogo />
                <span className="text-xs text-[#C9A961] font-semibold">★ Active Logo</span>
              </div>
            </div>

            {/* Light Header Style */}
            <div className="p-4 rounded-xl bg-slate-100 text-slate-900 border border-slate-300">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">
                Header Preview (Light Mode)
              </span>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                <BrandLogo />
                <span className="text-xs text-blue-900 font-semibold">★ Active Logo</span>
              </div>
            </div>

            {/* Footer Style */}
            <div className="p-4 rounded-xl bg-[#08101a] border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block mb-2">
                Footer Brand Stamp Preview
              </span>
              <BrandLogo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
