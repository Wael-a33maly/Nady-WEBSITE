import React, { useState } from 'react';
import { X, Briefcase, FileText, CheckCircle2, User, Phone, Mail, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const JobApplyModal: React.FC = () => {
  const { lang, isCareerModalOpen, setIsCareerModalOpen, selectedJobForApply, addJobApplication, settings } = useApp();

  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experienceYears, setExperienceYears] = useState('3 سنوات');
  const [notes, setNotes] = useState('');
  const [cvFileData, setCvFileData] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCareerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !phone) {
      alert(lang === 'ar' ? 'يرجى إدخال الاسم ورقم الهاتف' : 'Please enter name and phone number');
      return;
    }

    addJobApplication({
      jobPositionId: selectedJobForApply?.id,
      jobTitle: selectedJobForApply?.titleAr || (lang === 'ar' ? 'طلب توظيف عام' : 'General Job Application'),
      applicantName,
      email,
      phone,
      experienceYears,
      notes,
      cvFileName: cvFileData ? (lang === 'ar' ? 'سيرة_ذاتية.pdf' : 'Applicant_CV.pdf') : undefined,
      cvFileData,
    });

    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsCareerModalOpen(false);
    setIsSubmitted(false);
    setApplicantName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCvFileData('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-5 rtl:left-5 ltr:right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'تم استلام طلب التوظيف بنجاح' : 'Application Received Successfully!'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              {lang === 'ar'
                ? `شكراً لاهتمامك بالانضمام لمنظومة ${settings.logoTextAr || 'المحيط الفضي'}. سيقوم فريق الموارد البشرية بمراجعة ملفك والاتصال بك قريباً.`
                : `Thank you for applying to ${settings.logoTextEn || 'Silver Ocean'}. Our HR team will review your CV and contact you shortly.`}
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold text-xs shadow-md cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] text-[11px] font-bold">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{selectedJobForApply ? (lang === 'ar' ? selectedJobForApply.titleAr : selectedJobForApply.titleEn) : (lang === 'ar' ? 'طلب انضمام عام' : 'General Career Application')}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? `قدّم طلب انضمام إلى فريق ${settings.logoTextAr || 'المحيط الفضي'}` : `Apply for Career Opportunity at ${settings.logoTextEn || 'Silver Ocean'}`}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar'
                  ? 'يرجى إدخال بياناتك الشخصية ورفع السيرة الذاتية (CV) للبدء في إجراءات المقابلة.'
                  : 'Please enter your contact information and upload your CV file.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'الاسم الثلاثي' : 'Full Name'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute top-3 rtl:right-3 ltr:left-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل اسمك الكريم...' : 'Enter full name...'}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 py-2.5 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'رقم الجوال' : 'Phone Number'} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute top-3 rtl:right-3 ltr:left-3 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 5x xxx xxxx"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 py-2.5 focus:border-[#C9A961] focus:outline-none dir-ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute top-3 rtl:right-3 ltr:left-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3 py-2.5 focus:border-[#C9A961] focus:outline-none dir-ltr"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'سنوات الخبرة العملية' : 'Years of Experience'}
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 focus:border-[#C9A961] focus:outline-none"
                >
                  <option value="حديث تخرج">{lang === 'ar' ? 'حديث تخرج / بدون خبرة' : 'Fresh Graduate / Entry Level'}</option>
                  <option value="1-3 سنوات">{lang === 'ar' ? 'من 1 إلى 3 سنوات' : '1 - 3 Years'}</option>
                  <option value="3-5 سنوات">{lang === 'ar' ? 'من 3 إلى 5 سنوات' : '3 - 5 Years'}</option>
                  <option value="أكثر من 5 سنوات">{lang === 'ar' ? 'أكثر من 5 سنوات' : '5+ Years'}</option>
                </select>
              </div>

              {/* Local File CV Upload */}
              <ImageUploadInput
                label={lang === 'ar' ? 'ارفع السيرة الذاتية (CV) من جهازك المحلي' : 'Upload CV Document from Local Device'}
                value={cvFileData}
                onChange={(val) => setCvFileData(val)}
                accept=".pdf,.doc,.docx,image/*"
                helpText={lang === 'ar' ? 'يدعم ملفات PDF, DOC, DOCX والصور' : 'Supports PDF, DOC, DOCX and image files'}
              />

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'ملاحظات أو مؤهلات إضافية' : 'Additional Notes / Skills'}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'اكتب نبذة مختصرة عن مؤهلاتك والشهادات الحاصل عليها...' : 'Brief summary of your qualifications...'}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold shadow-md hover:opacity-95"
                >
                  {lang === 'ar' ? 'إرسال طلب التوظيف' : 'Submit Application'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
