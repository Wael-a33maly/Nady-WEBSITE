import React, { useState } from 'react';
import { Briefcase, UserCheck, Plus, Trash2, Edit, Search, FileText, Download, CheckCircle, Clock, XCircle, Eye, X, Filter, Maximize2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JobPosition, JobApplication } from '../../types';
import { CVViewerModal } from '../modals/CVViewerModal';

export const CareersManager: React.FC = () => {
  const {
    lang,
    jobPositions,
    addJobPosition,
    updateJobPosition,
    deleteJobPosition,
    jobApplications,
    updateJobApplicationStatus,
    deleteJobApplication,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Job Position Creation State
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);

  const emptyJobPosition: JobPosition = {
    id: `job-${Date.now().toString().slice(-4)}`,
    titleAr: '',
    titleEn: '',
    departmentAr: 'قطاع الحراسات الأمنية',
    departmentEn: 'Security Division',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
    typeAr: 'دوام كامل',
    typeEn: 'Full Time',
    descriptionAr: '',
    descriptionEn: '',
    requirementsAr: ['خبرة سابقة متخصصة', 'إيجاد مهارات التواصل والالتزام'],
    requirementsEn: ['Prior experience required', 'Strong communication skills'],
    active: true,
    postedDate: new Date().toISOString().split('T')[0],
  };

  const [jobFormData, setJobFormData] = useState<JobPosition>(emptyJobPosition);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [fullscreenCVApp, setFullscreenCVApp] = useState<JobApplication | null>(null);

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFormData.titleAr) {
      alert(lang === 'ar' ? 'يرجى كتابة المسمى الوظيفي' : 'Please enter job title');
      return;
    }

    if (editingJob) {
      updateJobPosition(editingJob.id, jobFormData);
      setEditingJob(null);
    } else {
      addJobPosition(jobFormData);
      setIsCreatingJob(false);
    }
  };

  const handleStartCreateJob = () => {
    setJobFormData({ ...emptyJobPosition, id: `job-${Date.now().toString().slice(-4)}` });
    setEditingJob(null);
    setIsCreatingJob(true);
  };

  const handleStartEditJob = (job: JobPosition) => {
    setJobFormData({ ...job });
    setEditingJob(job);
    setIsCreatingJob(false);
  };

  const filteredApplications = jobApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: JobApplication['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] font-bold">{lang === 'ar' ? 'جديد' : 'New'}</span>;
      case 'reviewed':
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 text-[10px] font-bold">{lang === 'ar' ? 'تمت المراجعه' : 'Reviewed'}</span>;
      case 'interview':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold">{lang === 'ar' ? 'مقابلة شخصية' : 'Interview'}</span>;
      case 'accepted':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold">{lang === 'ar' ? 'مقبول' : 'Accepted'}</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold">{lang === 'ar' ? 'مرفوض' : 'Rejected'}</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B1929] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إدارة التوظيف والفرص الوظيفية' : 'Careers & Job Applications Manager'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'متابعة طلبات التوظيف المرفوقة بالـ CV والإعلان عن الوظائف الشاغرة بقطاعات المجموعة'
              : 'Review submitted candidate CVs and manage published job positions'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-[#C9A961] text-[#0B1929] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'طلبات التوظيف' : 'Applications'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#0B1929]/20 text-[10px] font-mono">
              {jobApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('positions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'positions'
                ? 'bg-[#C9A961] text-[#0B1929] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الوظائف المعلنة' : 'Open Positions'}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#0B1929]/20 text-[10px] font-mono">
              {jobPositions.length}
            </span>
          </button>
        </div>
      </div>

      {/* APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#0B1929] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute top-3 rtl:right-3.5 ltr:left-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث باسم المتقدم، الوظيفة، أو الهاتف...' : 'Search by name, job, or phone...'}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl rtl:pr-10 rtl:pl-4 ltr:pl-10 ltr:pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#C9A961] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none"
              >
                <option value="all">{lang === 'ar' ? 'جميع الحالات' : 'All Statuses'}</option>
                <option value="new">{lang === 'ar' ? 'جديد' : 'New'}</option>
                <option value="reviewed">{lang === 'ar' ? 'تمت المراجعة' : 'Reviewed'}</option>
                <option value="interview">{lang === 'ar' ? 'مقابلة شخصية' : 'Interview'}</option>
                <option value="accepted">{lang === 'ar' ? 'مقبول' : 'Accepted'}</option>
                <option value="rejected">{lang === 'ar' ? 'مرفوض' : 'Rejected'}</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right rtl:text-right ltr:text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">{lang === 'ar' ? 'المتقدم' : 'Applicant'}</th>
                    <th className="p-4">{lang === 'ar' ? 'الوظيفة المتقدم لها' : 'Target Job'}</th>
                    <th className="p-4">{lang === 'ar' ? 'سنوات الخبرة' : 'Experience'}</th>
                    <th className="p-4">{lang === 'ar' ? 'تاريخ التقديم' : 'Applied Date'}</th>
                    <th className="p-4">{lang === 'ar' ? 'السيرة الذاتية (CV)' : 'CV Document'}</th>
                    <th className="p-4">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="p-4 text-center">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        {lang === 'ar' ? 'لا توجد طلبات توظيف تطابق البحث حالياً' : 'No job applications matching filter.'}
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                        <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                          <div>{app.applicantName}</div>
                          <div className="text-[10px] font-normal text-slate-400 dir-ltr">{app.phone} • {app.email}</div>
                        </td>
                        <td className="p-4 font-semibold text-[#C9A961]">{app.jobTitle}</td>
                        <td className="p-4 font-mono text-slate-600 dark:text-slate-300">{app.experienceYears}</td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">{app.appliedAt}</td>
                        <td className="p-4">
                          {app.cvFileData || app.cvFileName ? (
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setFullscreenCVApp(app)}
                                className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 font-bold flex items-center gap-1 cursor-pointer"
                                title="معاينة شاشة كاملة"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'معاينة شاشة كاملة' : 'Preview CV'}</span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">{lang === 'ar' ? 'غير مرفق' : 'No CV'}</span>
                          )}
                        </td>
                        <td className="p-4">{getStatusBadge(app.status)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateJobApplicationStatus(app.id, e.target.value as any)}
                              className="bg-slate-100 dark:bg-slate-800 text-[11px] font-bold rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 focus:outline-none"
                            >
                              <option value="new">{lang === 'ar' ? 'جديد' : 'New'}</option>
                              <option value="reviewed">{lang === 'ar' ? 'مراجعة' : 'Reviewed'}</option>
                              <option value="interview">{lang === 'ar' ? 'مقابلة' : 'Interview'}</option>
                              <option value="accepted">{lang === 'ar' ? 'قبول' : 'Accepted'}</option>
                              <option value="rejected">{lang === 'ar' ? 'رفض' : 'Rejected'}</option>
                            </select>

                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#C9A961]"
                              title="Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(lang === 'ar' ? 'حذف هذا الطلب؟' : 'Delete this application?')) {
                                  deleteJobApplication(app.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        </div>
      )}

      {/* OPEN POSITIONS TAB */}
      {activeTab === 'positions' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleStartCreateJob}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إعلان وظيفة شاغرة جديدة' : 'Post New Job Opening'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm hover:border-[#C9A961]/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] text-[10px] font-bold">
                      {lang === 'ar' ? job.departmentAr : job.departmentEn}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${job.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                      {job.active ? (lang === 'ar' ? 'نشطة - تستقبل طلبات' : 'Active') : (lang === 'ar' ? 'مغلقة' : 'Closed')}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {lang === 'ar' ? job.titleAr : job.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {lang === 'ar' ? job.descriptionAr : job.descriptionEn}
                  </p>

                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 pt-1">
                    <div>📍 {lang === 'ar' ? job.locationAr : job.locationEn} • ⏰ {lang === 'ar' ? job.typeAr : job.typeEn}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">Posted: {job.postedDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEditJob(job)}
                      className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-bold"
                    >
                      {lang === 'ar' ? 'تعديل' : 'Edit'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(lang === 'ar' ? 'حذف الوظيفة؟' : 'Delete job position?')) {
                          deleteJobPosition(job.id);
                        }
                      }}
                      className="p-1 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal View Application Details */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#C9A961]" />
                <span>{lang === 'ar' ? 'تفاصيل طلب التوظيف' : 'Candidate Details'}</span>
              </h3>
              <button onClick={() => setSelectedApplication(null)} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 font-semibold">{lang === 'ar' ? 'اسم المتقدم' : 'Name'}</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedApplication.applicantName}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الهاتف' : 'Phone'}</div>
                  <div className="font-bold dir-ltr text-right">{selectedApplication.phone}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</div>
                  <div className="font-bold truncate dir-ltr">{selectedApplication.email}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'الوظيفة المتقدم لها' : 'Target Job'}</div>
                <div className="font-bold text-[#C9A961]">{selectedApplication.jobTitle}</div>
              </div>

              {selectedApplication.notes && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'ملاحظات / نبذة المتقدم' : 'Applicant Notes'}</div>
                  <p className="leading-relaxed">{selectedApplication.notes}</p>
                </div>
              )}

              {/* Download or view CV */}
              {selectedApplication.cvFileData && (
                <div className="p-4 rounded-xl bg-[#C9A961]/10 border border-[#C9A961]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#C9A961]" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{selectedApplication.cvFileName || 'Candidate_CV'}</div>
                      <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'ملف السيرة الذاتية المرفق' : 'Uploaded CV file'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFullscreenCVApp(selectedApplication)}
                      className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1.5 text-xs hover:bg-blue-500/20 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'معاينة شاشة كاملة' : 'Full Screen'}</span>
                    </button>

                    <a
                      href={selectedApplication.cvFileData}
                      download={selectedApplication.cvFileName || 'CV.pdf'}
                      className="px-3 py-1.5 rounded-lg bg-[#C9A961] text-[#0B1929] font-bold flex items-center gap-1.5 text-xs shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'تحميل' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen CV Modal */}
      <CVViewerModal
        application={fullscreenCVApp}
        onClose={() => setFullscreenCVApp(null)}
      />

      {/* Modal Job Post Form */}
      {(isCreatingJob || editingJob) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingJob ? (lang === 'ar' ? 'تعديل الفرصة الوظيفية' : 'Edit Job Post') : (lang === 'ar' ? 'إعلان وظيفة شاغرة جديدة' : 'Post New Job')}
              </h3>
              <button onClick={() => { setIsCreatingJob(false); setEditingJob(null); }} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">{lang === 'ar' ? 'المسمى الوظيفي (بالعربية)' : 'Job Title (Arabic)'}</label>
                <input
                  type="text"
                  required
                  value={jobFormData.titleAr}
                  onChange={(e) => setJobFormData({ ...jobFormData, titleAr: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">{lang === 'ar' ? 'القطاع / القسم' : 'Department'}</label>
                  <input
                    type="text"
                    value={jobFormData.departmentAr}
                    onChange={(e) => setJobFormData({ ...jobFormData, departmentAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">{lang === 'ar' ? 'الموقع' : 'Location'}</label>
                  <input
                    type="text"
                    value={jobFormData.locationAr}
                    onChange={(e) => setJobFormData({ ...jobFormData, locationAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">{lang === 'ar' ? 'وصف الوظيفة المهام' : 'Job Description'}</label>
                <textarea
                  rows={3}
                  value={jobFormData.descriptionAr}
                  onChange={(e) => setJobFormData({ ...jobFormData, descriptionAr: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsCreatingJob(false); setEditingJob(null); }}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold"
                >
                  {lang === 'ar' ? 'نشر الوظيفة' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
