import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const PrivacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { lang, settings } = useApp();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl rounded-3xl bg-[#0B1929] border border-[#C9A961]/40 text-white p-6 sm:p-8 shadow-2xl space-y-6 my-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-4 ltr:left-4 p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:text-[#C9A961] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <ShieldCheck className="w-8 h-8 text-[#C9A961]" />
          <div>
            <h3 className="text-xl font-bold">
              {lang === 'ar' ? 'سياسة الخصوصية والشروط والأحكام' : 'Privacy Policy & Terms'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ar' ? settings.companyNameAr : settings.companyNameEn}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 font-arabic">
          <p>
            {lang === 'ar'
              ? `تلتزم ${settings.companyNameAr || 'شركة المحيط الفضي'} بحماية بيانات جميع عملائنا والممثلين الرسميين للشركات. جميع البيانات والمعلومات الواردة في طلبات عروض الأسعار تُعامل بسرية تامة ووفق الأنظمة واللوائح المعمول بها بالمملكة.`
              : `${settings.companyNameEn || 'Silver Ocean Co.'} is committed to preserving client confidentiality. All specs and requests submitted via our portal are treated strictly under non-disclosure governance.`}
          </p>
          <h4 className="font-bold text-[#C9A961]">{lang === 'ar' ? '1. حماية البيانات والمعلومات' : '1. Data Governance'}</h4>
          <p>
            {lang === 'ar'
              ? 'لا نقوم بمشاركة أي أرقام هواتف، خطط أمنية، أو بيانات مواقع المنشآت مع أية أطراف ثالثة خارج نطاق فريق الدراسة الميدانية المعتمد.'
              : 'No facility plans, phone numbers, or security telemetry are shared with external third parties without prior agreement.'}
          </p>
          <h4 className="font-bold text-[#C9A961]">{lang === 'ar' ? '2. التراخيص والاعتمادات' : '2. Licensing'}</h4>
          <p>
            {lang === 'ar' ? 'جميع حراس الأمن والعمالة الفنية مرخصون ومسجلون رسمياً وتُطبق بحقهم الاشتراطات الوقائية والصحية.' : 'All security officers and cleaning personnel maintain verified official certifications and health permits.'}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs cursor-pointer"
          >
            {lang === 'ar' ? 'موافق وإغلاق' : 'Accept & Close'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
