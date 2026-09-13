import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ContactInquiry } from '../../types';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle2, Eye, X } from 'lucide-react';

export const InquiriesManager: React.FC = () => {
  const { lang, inquiries, updateInquiryStatus, deleteInquiry } = useApp();
  const [activeInquiryModal, setActiveInquiryModal] = useState<ContactInquiry | null>(null);

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
          {lang === 'ar' ? 'رسائل واستفسارات التواصل (Inquiries)' : 'Direct Contact Messages'}
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {lang === 'ar'
            ? 'عرض كافة الرسائل الواردة من نموذج التواصل مع تصنيف حالتها ومتابعة الردود.'
            : 'Review direct messages sent via contact form.'}
        </p>
      </div>

      <div className="rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-100 dark:bg-[#0B1929] text-slate-700 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-mono">
              <tr>
                <th className="p-4 text-start">Date</th>
                <th className="p-4 text-start">Sender Name</th>
                <th className="p-4 text-start">Contact</th>
                <th className="p-4 text-start">Subject</th>
                <th className="p-4 text-start">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    {lang === 'ar' ? 'لا توجد رسائل حالياً' : 'No inquiries found'}
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-mono text-slate-500 dark:text-slate-400">{inq.createdAt}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{inq.name}</td>
                    <td className="p-4">
                      <div className="text-slate-700 dark:text-slate-300 font-mono" dir="ltr">{inq.phone}</div>
                      <div className="text-[10px] text-slate-400">{inq.email}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs">{inq.subject}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          inq.status === 'unread'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            updateInquiryStatus(inq.id, 'read');
                            setActiveInquiryModal(inq);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-semibold cursor-pointer border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'قراءة' : 'View'}</span>
                        </button>
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white shadow-2xl">
            <button
              onClick={() => setActiveInquiryModal(null)}
              className="absolute top-4 right-4 rtl:right-4 ltr:left-4 p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#C9A961]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-xs text-slate-400 font-mono">{activeInquiryModal.createdAt}</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeInquiryModal.subject}</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-sm">{activeInquiryModal.name}</div>
                <div className="text-slate-500 dark:text-slate-400 font-mono" dir="ltr">{activeInquiryModal.phone}</div>
                <div className="text-slate-500 dark:text-slate-400">{activeInquiryModal.email}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 leading-relaxed font-arabic">
                {activeInquiryModal.message}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  updateInquiryStatus(activeInquiryModal.id, 'replied');
                  setActiveInquiryModal(null);
                }}
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'تحديد كـ "تم الرد"' : 'Mark Replied & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
