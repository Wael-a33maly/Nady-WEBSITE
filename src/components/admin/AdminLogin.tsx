import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import { Lock, KeyRound, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminLogin: React.FC = () => {
  const { lang, loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setError(true);
    }
  };

  const handleQuickDemoFill = () => {
    setPassword('admin123');
    loginAdmin('admin123');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1929] flex items-center justify-center p-4 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient BG Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A961]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-[#112236] border border-slate-200 dark:border-[#C9A961]/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <BrandLogo />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 text-xs font-semibold mt-2">
            <Lock className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'بوابة الإدارة المشفرة' : 'Encrypted Admin Portal'}</span>
          </div>
          <h2 className="text-2xl font-bold font-arabic text-slate-900 dark:text-white">
            {lang === 'ar' ? 'تسجيل دخول لوحة التحكم' : 'Admin Portal Access'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {lang === 'ar' ? 'أدخل كلمة المرور لإدارة الخدمات والمحتوى والشعار' : 'Enter security credentials to manage content & settings'}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500 dark:text-rose-400" />
            <span>{lang === 'ar' ? 'كلمة المرور غير صحيحة (جرب admin123)' : 'Invalid passcode (Try admin123)'}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#C9A961]" />
              {lang === 'ar' ? 'كلمة المرور' : 'Admin Passcode'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 transition-all shadow-lg shadow-[#C9A961]/20"
          >
            <span>{lang === 'ar' ? 'دخول اللوحة' : 'Authorize & Enter'}</span>
            {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center space-y-3">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {lang === 'ar' ? 'للتجربة السريعة اضغط الزر أدناه:' : 'For quick evaluation, click below:'}
          </p>
          <button
            onClick={handleQuickDemoFill}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#C9A961] text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-[#C9A961] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'ar' ? 'دخول مباشر كمسؤول (Demo)' : 'Instant Admin Login (Demo)'}</span>
          </button>

          <a
            href="/"
            onClick={navigateToHome}
            className="inline-block text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pt-2 transition-colors cursor-pointer"
          >
            ← {lang === 'ar' ? 'العودة للموقع الرئيسي' : 'Return to Website'}
          </a>
        </div>
      </motion.div>
    </div>
  );
};
