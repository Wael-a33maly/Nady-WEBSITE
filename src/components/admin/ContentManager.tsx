import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem, ProjectItem, TeamMember } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, ShieldCheck, Sparkles, Building, Users, X, Image as ImageIcon } from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const ContentManager: React.FC = () => {
  const {
    lang,
    services,
    addService,
    updateService,
    deleteService,
    projects,
    addProject,
    updateProject,
    deleteProject,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'team'>('services');

  // New Service modal state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newDescAr, setNewDescAr] = useState('');
  const [newDescEn, setNewDescEn] = useState('');
  const [newCategory, setNewCategory] = useState<'security' | 'cleaning' | 'integrated'>('security');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1000&q=80');

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleAr || !newTitleEn) return;

    addService({
      id: `s-${Date.now()}`,
      titleAr: newTitleAr,
      titleEn: newTitleEn,
      descAr: newDescAr || 'وصف الخدمة الجديدة',
      descEn: newDescEn || 'New service description',
      detailedDescAr: newDescAr || 'وصف شامل ومفصل للخدمة الميدانية',
      detailedDescEn: newDescEn || 'Comprehensive operational scope description',
      category: newCategory,
      iconName: newCategory === 'security' ? 'ShieldCheck' : newCategory === 'cleaning' ? 'Sparkles' : 'Building2',
      featuresAr: ['جودة مضمونة', 'فريق مدرب', 'مراقبة 24/7'],
      featuresEn: ['Guaranteed Quality', 'Trained Staff', '24/7 Ops'],
      image: newImage,
    });

    setIsAddingService(false);
    setNewTitleAr('');
    setNewTitleEn('');
    setNewDescAr('');
    setNewDescEn('');
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة المحتوى الميداني (Content CRUD)' : 'Website Content Management'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إضافة وتعديل وحذف الخدمات والمشاريع وأعضاء الفريق بربط مباشر مع إمكانية رفع الصور من الجهاز المحلي.'
              : 'Add, update, or remove services, case studies, and team profiles live with local file uploads.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#112236] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'services' ? 'gold-gradient-bg text-[#0B1929]' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الخدمات' : 'Services'}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects' ? 'gold-gradient-bg text-[#0B1929]' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'المشاريع' : 'Projects'}</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'team' ? 'gold-gradient-bg text-[#0B1929]' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الفريق' : 'Team'}</span>
          </button>
        </div>
      </div>

      {/* Services Tab Content */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'قائمة الخدمات المعتمدة' : 'Active Services Catalog'} ({services.length})
            </h3>
            <button
              onClick={() => setIsAddingService(true)}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:brightness-110 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.id} className="p-5 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img src={svc.image} alt={svc.titleAr} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-black/70 text-[#C9A961] text-[10px] font-extrabold uppercase border border-[#C9A961]/30">
                      {svc.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                    {lang === 'ar' ? svc.titleAr : svc.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {lang === 'ar' ? svc.descAr : svc.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">{svc.id}</span>
                  <button
                    onClick={() => deleteService(svc.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Tab Content */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'قائمة سابقة الأعمال' : 'Projects Directory'} ({projects.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img src={proj.image} alt={proj.titleAr} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                    {lang === 'ar' ? proj.titleAr : proj.titleEn}
                  </h4>
                  <div className="text-xs text-[#C9A961] font-semibold">
                    {lang === 'ar' ? proj.clientAr : proj.clientEn}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">{proj.id}</span>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Tab Content */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'قائمة القادة والمختصين' : 'Leadership Members'} ({team.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div key={m.id} className="p-5 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-3 text-center shadow-sm">
                <img src={m.image} alt={m.nameAr} className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-[#C9A961]" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{lang === 'ar' ? m.nameAr : m.nameEn}</h4>
                <p className="text-xs text-[#C9A961]">{lang === 'ar' ? m.roleAr : m.roleEn}</p>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                  <button
                    onClick={() => deleteTeamMember(m.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Add Service */}
      {isAddingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form onSubmit={handleCreateService} className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-[#C9A961]/40 p-6 sm:p-8 space-y-4 text-slate-900 dark:text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAddingService(false)}
              className="absolute top-4 right-4 rtl:right-4 ltr:left-4 p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-[#C9A961]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">{lang === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service'}</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-semibold">{lang === 'ar' ? 'العنوان بالعربية *' : 'Arabic Title *'}</label>
                <input
                  type="text"
                  required
                  value={newTitleAr}
                  onChange={(e) => setNewTitleAr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">{lang === 'ar' ? 'العنوان بالإنجليزية *' : 'English Title *'}</label>
                <input
                  type="text"
                  required
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold">{lang === 'ar' ? 'الفئة' : 'Category'}</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                >
                  <option value="security">أمن وحراسة (Security)</option>
                  <option value="cleaning">نظافة وتطهير (Sanitation)</option>
                  <option value="integrated">حلول متكاملة (Integrated)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-semibold">{lang === 'ar' ? 'الوصف' : 'Description'}</label>
                <textarea
                  rows={2}
                  value={newDescAr}
                  onChange={(e) => setNewDescAr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-slate-200 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <ImageUploadInput
                  label={lang === 'ar' ? 'صورة الخدمة (رفع من الجهاز)' : 'Service Image (Upload from device)'}
                  value={newImage}
                  onChange={setNewImage}
                  helpText={lang === 'ar' ? 'رفع صورة الخدمة الميدانية مباشرة من جهازك المحمول أو الكمبيوتر' : 'Upload image file from your local device'}
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddingService(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'إنشاء الخدمة' : 'Create Service'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
