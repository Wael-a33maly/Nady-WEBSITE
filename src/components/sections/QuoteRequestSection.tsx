import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SectionHeading } from '../ui/SectionHeading';
import {
  ShieldCheck,
  Sparkles,
  FileText,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface QuoteRequestSectionProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const QuoteRequestSection: React.FC<QuoteRequestSectionProps> = ({
  isModal = false,
  onClose,
}) => {
  const { lang, addQuote, preselectedQuoteCategory } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [serviceCategory, setServiceCategory] = useState<'security' | 'cleaning' | 'integrated'>(
    preselectedQuoteCategory || 'integrated'
  );
  const [serviceName, setServiceName] = useState<string>('خدمة أمن ونظافة متكاملة');
  const [location, setLocation] = useState<string>('الرياض');
  const [contractDuration, setContractDuration] = useState<string>('عقد سنوي (12 شهرًا)');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !phone.trim() || !email.trim() || !location.trim()) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى تعبئة كافة الحقول المطلوبة بما فيها موقع المنشأة وبيانات التواصل'
          : 'Please complete all required fields including facility location and contact info'
      );
      return;
    }

    addQuote({
      serviceCategory,
      serviceName:
        serviceCategory === 'security'
          ? 'حراسة وأمن ميداني'
          : serviceCategory === 'cleaning'
          ? 'نظافة وتطهير شامل'
          : 'حلول أمن ونظافة متكاملة',
      propertyArea: 'حسب معاينة الموقع',
      headcountNeeded: 'حسب الاحتياج الفعلي',
      location,
      contractDuration,
      companyName,
      contactName,
      phone,
      email,
      notes,
    });

    setIsSubmitted(true);

    // Fire Confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A961', '#1E40AF', '#ffffff'],
      });
    } catch {
      // fallback ignore
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setCompanyName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <section id="request-quote" className={`${isModal ? 'p-0' : 'py-24 bg-slate-100 dark:bg-[#0B1929] text-slate-900 dark:text-white transition-colors duration-300 theme-quote-bg'} relative overflow-hidden`}>
      {/* Ambient background glow */}
      {!isModal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A961]/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
        </div>
      )}

      <div className={`${isModal ? 'w-full' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'} relative z-10`}>
        {!isModal && (
          <SectionHeading
            badge={lang === 'ar' ? 'طلب عرض سعر سريع' : 'Instant Quote Engine'}
            badgeIcon={FileText}
            title={lang === 'ar' ? 'احصل على دراسة أمنية وتشغيلية مجانية لمؤسستك' : 'Request A Tailored Technical Proposal'}
            subtitle={
              lang === 'ar'
                ? 'قم بتعبئة النموذج في خطوتين بسيطتين (اختيار الخدمة وبيانات المنشأة) وسيقوم أحد مهندسي العمليات بالتواصل معك خلال 24 ساعة.'
                : 'Fill out this 2-step quick form to receive a detailed cost analysis and deployment plan.'
            }
          />
        )}

        {/* Main Glass Form Container */}
        <div className={`mt-8 bg-white dark:bg-[#112236]/90 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-[#C9A961]/30 p-6 sm:p-10 shadow-2xl relative ${isModal ? 'border-none bg-transparent dark:bg-transparent shadow-none p-0' : ''}`}>
          {/* Step Progress Bar */}
          {!isSubmitted && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
                <span className={step >= 1 ? 'text-[#C9A961] font-bold' : ''}>
                  1. {lang === 'ar' ? 'اختيار الخدمة' : 'Service Type'}
                </span>
                <span className={step >= 2 ? 'text-[#C9A961] font-bold' : ''}>
                  2. {lang === 'ar' ? 'بيانات المنشأة والتواصل' : 'Facility & Contact Info'}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gold-gradient-bg"
                  animate={{ width: `${(step / 2) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-2xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Quote Request Received!'}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? 'شكراً لاهتمامك بشركة حارس ونقاء. تم تحويل الطلب إلى قسم العمليات وستصلك دراسة السعر خلال أقل من 24 ساعة.'
                    : 'Thank you for choosing Hares & Niqaa. Our operations team will review your scope and issue a proposal within 24 hours.'}
                </p>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs cursor-pointer shadow-lg"
                  >
                    {lang === 'ar' ? 'ارسال طلب جديد' : 'Submit Another Request'}
                  </button>

                  {isModal && onClose && (
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      {lang === 'ar' ? 'إغلاق' : 'Close'}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : step === 1 ? (
              /* Step 1: Select Service Category */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center sm:text-start">
                  {lang === 'ar' ? 'حدد قطاع الخدمة المطلوبة:' : 'Select Desired Service Category:'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'integrated',
                      titleAr: 'حلول متكاملة (أمن + نظافة)',
                      titleEn: 'Integrated Security & Cleaning',
                      descAr: 'تأمين كامل وتطهير وإدارة مرافق شاملة للأبراج والشركات',
                      descEn: 'Full facility management, guarding & deep sanitation',
                      icon: Sparkles,
                    },
                    {
                      id: 'security',
                      titleAr: 'الحراسة والأمن الميداني',
                      titleEn: 'Security & Field Guarding',
                      descAr: 'حراس أمن، إدارة بوابات، دوريات، وأمن فعاليات',
                      descEn: 'Guarding staff, gate control, patrol & event security',
                      icon: ShieldCheck,
                    },
                    {
                      id: 'cleaning',
                      titleAr: 'النظافة العامة والتطهير',
                      titleEn: 'Commercial Sanitation',
                      descAr: 'تنظيف مكاتب، واجهات زجاجية، تعقيم، ومكافحة آفات',
                      descEn: 'Office deep clean, high-rise windows & pest control',
                      icon: Building,
                    },
                  ].map((cat) => {
                    const IconComp = cat.icon;
                    const isSelected = serviceCategory === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => setServiceCategory(cat.id as any)}
                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg ${
                          isSelected
                            ? 'bg-[#C9A961]/20 border-[#C9A961] shadow-xl shadow-[#C9A961]/20 scale-[1.02]'
                            : 'bg-slate-50 dark:bg-[#0B1929] border-slate-200 dark:border-[#C9A961]/30 hover:border-[#C9A961]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-[#C9A961] text-[#0B1929] shadow-md shadow-[#C9A961]/30' : 'bg-slate-200 dark:bg-[#1A314D] text-[#C9A961]'}`}>
                            <IconComp className="w-6 h-6 stroke-[2]" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-6 h-6 text-[#C9A961]" />}
                        </div>

                        <div>
                          <h4 className="font-black text-slate-900 dark:text-white text-base leading-snug">
                            {lang === 'ar' ? cat.titleAr : cat.titleEn}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-200 font-medium leading-relaxed mt-1.5">
                            {lang === 'ar' ? cat.descAr : cat.descEn}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-110"
                  >
                    <span>{lang === 'ar' ? 'التالي: بيانات المنشأة والتواصل' : 'Next: Facility & Contact Info'}</span>
                    {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Step 2: Facility & Contact Details & Submit */
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'أدخل بيانات المنشأة والتواصل لإرسال العرض:' : 'Enter Facility & Contact Details:'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'اسم الشركة / المنشأة *' : 'Company Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={lang === 'ar' ? 'شركة الأفق القابضة' : 'Al-Ofoq Holding Co.'}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'اسم المسؤول / الممثل *' : 'Contact Person Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={lang === 'ar' ? 'أحمد الشمري' : 'Ahmed Al-Shammari'}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'رقم الجوال *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 000 0000"
                      dir="ltr"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'البريد الإلكتروني *' : 'Official Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="info@company.com"
                      dir="ltr"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  {/* Location / City */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'المدينة / موقع المنشأة *' : 'Facility City / Location *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={lang === 'ar' ? 'مثال: الرياض - طريق الملك فهد' : 'e.g. Riyadh - King Fahd Rd'}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  {/* Contract duration */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C9A961]" />
                      {lang === 'ar' ? 'مدة العقد المتوقعة' : 'Contract Term'}
                    </label>
                    <select
                      value={contractDuration}
                      onChange={(e) => setContractDuration(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                    >
                      <option value="عقد سنوي (12 شهرًا)">عقد سنوي تجديد تلقائي (1 Year Annual)</option>
                      <option value="عقد 6 أشهر">عقد 6 أشهر (6 Months)</option>
                      <option value="مؤقت / مؤتمرات وفعاليات">مؤقت / أمن فعاليات ومعارض (Temporary Expo)</option>
                      <option value="طلب مشروع محدد">مشروع لمرة واحدة (One-Time Execution)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {lang === 'ar' ? 'ملاحظات إضافية أو متطلبات خاصة' : 'Additional Notes or Specs'}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      lang === 'ar'
                        ? 'اذكر أية تفاصيل خاصة بالخدمة أو نوعية الأجهزة والزي المطلوب...'
                        : 'Any special instructions regarding requirements...'
                    }
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-6 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    {lang === 'ar' ? 'السابق' : 'Back'}
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xl hover:brightness-110"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إرسال طلب عرض السعر' : 'Submit Proposal Request'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
