import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building, Search, Sparkles, Check, X, MapPin, Calendar, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectItem } from '../../types';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const ProjectsManager: React.FC = () => {
  const { lang, projects, addProject, updateProject, deleteProject, subsidiaries } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyProject: ProjectItem = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    titleAr: '',
    titleEn: '',
    category: 'security',
    clientAr: '',
    clientEn: '',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    descriptionAr: '',
    descriptionEn: '',
    statsAr: 'حراسة أمنية 24/7 + 50 حارس',
    statsEn: '24/7 Security + 50 Guards',
    badgeAr: 'مشروع حكومي حيوي',
    badgeEn: 'Key Government Project',
  };

  const [formData, setFormData] = useState<ProjectItem>(emptyProject);

  const filteredProjects = projects.filter(
    (p) =>
      p.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientAr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartCreate = () => {
    setFormData({ ...emptyProject, id: `proj-${Date.now().toString().slice(-4)}` });
    setEditingProject(null);
    setIsCreating(true);
  };

  const handleStartEdit = (project: ProjectItem) => {
    setFormData({ ...project });
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr || !formData.titleEn) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم المشروع بالعربية والإنجليزية' : 'Please enter project title in Arabic and English');
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, formData);
      setEditingProject(null);
    } else {
      addProject(formData);
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B1929] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إدارة سابقة الأعمال والمشاريع' : 'Manage Projects & Case Studies'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إضافة وتحديث المشاريع المنفذة ورفع صور المشاريع من جهازك المحلي'
              : 'Add and update enterprise projects with local image uploads'}
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute top-3.5 rtl:right-4 ltr:left-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={lang === 'ar' ? 'ابحث عن مشروع أو عميل...' : 'Search for a project or client...'}
          className="w-full bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-xl rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#C9A961] focus:outline-none"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-[#C9A961]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={project.image}
                  alt={project.titleAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full bg-[#0B1929]/80 backdrop-blur-md text-[10px] font-bold text-[#C9A961] border border-[#C9A961]/30">
                  {project.badgeAr || project.badgeEn}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {lang === 'ar' ? project.titleAr : project.titleEn}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                </p>

                <div className="space-y-1.5 pt-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#C9A961]" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {lang === 'ar' ? project.clientAr : project.clientEn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ar' ? project.locationAr : project.locationEn}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">{project.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(project)}
                  className="p-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(lang === 'ar' ? 'هل أنت تأكد من حذف هذا المشروع؟' : 'Delete this project?')) {
                      deleteProject(project.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProject
                  ? lang === 'ar' ? 'تعديل بيانات المشروع' : 'Edit Project Details'
                  : lang === 'ar' ? 'إضافة مشروع جديد إلى سابقة الأعمال' : 'Add New Case Study'}
              </h3>
              <button
                onClick={() => { setIsCreating(false); setEditingProject(null); }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <ImageUploadInput
                label={lang === 'ar' ? 'صورة المشروع (ارفع من جهازك المحلي)' : 'Project Image (Upload from Local Device)'}
                value={formData.image}
                onChange={(newImg) => setFormData((prev) => ({ ...prev, image: newImg }))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'عنوان المشروع (بالعربية)' : 'Project Title (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'عنوان المشروع (بالإنجليزية)' : 'Project Title (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'اسم العميل / الجهة (بالعربية)' : 'Client Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.clientAr}
                    onChange={(e) => setFormData({ ...formData, clientAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'اسم العميل / الجهة (بالإنجليزية)' : 'Client Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.clientEn}
                    onChange={(e) => setFormData({ ...formData, clientEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'الموقع' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={formData.locationAr}
                    onChange={(e) => setFormData({ ...formData, locationAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'التاريخ / السنة' : 'Date / Year'}
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'الوسام المميز' : 'Badge'}
                  </label>
                  <input
                    type="text"
                    value={formData.badgeAr}
                    onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value })}
                    placeholder={lang === 'ar' ? 'مثال: مشروع حكومي ضخم' : 'Key Project'}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'تفاصيل الإنجاز / الوصف (بالعربية)' : 'Description (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingProject(null); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold shadow-md hover:opacity-95"
                >
                  {lang === 'ar' ? 'حفظ المشروع' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
