import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuoteRequest } from '../../types';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  X,
  Filter,
} from 'lucide-react';

export const QuotesManager: React.FC = () => {
  const { lang, quotes, updateQuoteStatus, deleteQuote } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'processing' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuoteModal, setActiveQuoteModal] = useState<QuoteRequest | null>(null);

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    const matchesSearch =
      q.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm) ||
      q.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة طلبات عروض الأسعار (Quotes Requests)' : 'Manage Quote Proposals'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'متابعة الطلبات السريعة القادمة من الواجهة ومعاينة الخدمة المطلوبة وبيانات المنشأة والتواصل.'
              : 'Review client quote requests, set status, inspect requested service & facility contact info.'}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث بالشركة أو الرقم...' : 'Search company or phone...'}
              className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 pl-9 rtl:pl-4 rtl:pr-9 text-xs text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none w-48 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-[#112236] p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {['all', 'new', 'processing', 'completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'gold-gradient-bg text-[#0B1929]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead className="bg-slate-100 dark:bg-[#0B1929] text-slate-700 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase font-mono">
              <tr>
                <th className="p-4 text-start">ID / Date</th>
                <th className="p-4 text-start">Company & Contact</th>
                <th className="p-4 text-start">Service Scope</th>
                <th className="p-4 text-start">Location & Term</th>
                <th className="p-4 text-start">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 font-mono">
                    {lang === 'ar' ? 'لا توجد طلبات مطابقة للفلتر الحالى' : 'No matching quote requests found'}
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-mono">
                      <div className="font-bold text-[#C9A961]">{q.id}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{q.createdAt}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{q.companyName}</div>
                      <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{q.contactName}</span>
                        <span className="text-[#C9A961] font-mono">({q.phone})</span>
                      </div>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{q.serviceName}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{q.email}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-700 dark:text-slate-300 font-medium">{q.location}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{q.contractDuration}</div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          q.status === 'new'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : q.status === 'processing'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {q.status === 'new' && <AlertCircle className="w-3 h-3" />}
                        {q.status === 'processing' && <Clock className="w-3 h-3" />}
                        {q.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        <span>{q.status}</span>
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setActiveQuoteModal(q)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-semibold cursor-pointer border border-slate-200 dark:border-slate-700"
                        >
                          {lang === 'ar' ? 'المعاينة' : 'Inspect'}
                        </button>

                        <button
                          onClick={() => deleteQuote(q.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete Request"
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

      {/* Inspect Quote Modal Drawer */}
      {activeQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white shadow-2xl">
            <button
              onClick={() => setActiveQuoteModal(null)}
              className="absolute top-4 right-4 rtl:right-4 ltr:left-4 p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#C9A961]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-[#C9A961]">{activeQuoteModal.id}</span>
                <h3 className="text-xl font-bold">{activeQuoteModal.companyName}</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{activeQuoteModal.createdAt}</span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-[#112236] border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'المسؤول' : 'Contact Person'}</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm mt-0.5 block">{activeQuoteModal.contactName}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'الهاتف' : 'Phone'}</span>
                  <span className="font-bold text-[#C9A961] text-sm mt-0.5 block" dir="ltr">
                    {activeQuoteModal.phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'البريد' : 'Email'}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{activeQuoteModal.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">{lang === 'ar' ? 'الموقع' : 'Location'}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{activeQuoteModal.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'نوع الخدمة المطلوبة:' : 'Service Category:'}</span>
                  <span className="font-bold text-[#C9A961]">{activeQuoteModal.serviceName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'مدة العقد المتوقعة:' : 'Term:'}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{activeQuoteModal.contractDuration}</span>
                </div>
                {activeQuoteModal.propertyArea && activeQuoteModal.propertyArea !== 'حسب معاينة الموقع' && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'المساحة:' : 'Property Area:'}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{activeQuoteModal.propertyArea}</span>
                  </div>
                )}
                {activeQuoteModal.headcountNeeded && activeQuoteModal.headcountNeeded !== 'حسب الاحتياج الفعلي' && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">{lang === 'ar' ? 'العمالة:' : 'Headcount:'}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{activeQuoteModal.headcountNeeded}</span>
                  </div>
                )}
              </div>

              {activeQuoteModal.notes && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block mb-1 font-semibold">{lang === 'ar' ? 'ملاحظات العميل:' : 'Client Notes:'}</span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{activeQuoteModal.notes}</p>
                </div>
              )}
            </div>

            {/* Change status controls */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-semibold">
                {lang === 'ar' ? 'تعديل حالة الطلب:' : 'Update Order Status:'}
              </span>
              <div className="flex items-center gap-2">
                {(['new', 'processing', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      updateQuoteStatus(activeQuoteModal.id, st);
                      setActiveQuoteModal((prev) => (prev ? { ...prev, status: st } : null));
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer flex-1 ${
                      activeQuoteModal.status === st
                        ? 'gold-gradient-bg text-[#0B1929] shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
