import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubsidiaryCompany, SubsidiaryCategory } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Building2, Tag, CheckCircle2, ShieldCheck, Sparkles, Users, Camera, Image as ImageIcon } from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const SubsidiariesManager: React.FC = () => {
  const {
    lang,
    subsidiaries,
    addSubsidiary,
    updateSubsidiary,
    deleteSubsidiary,
    subsidiaryCategories,
    addSubsidiaryCategory,
    deleteSubsidiaryCategory,
  } = useApp();

  const [editingSub, setEditingSub] = useState<SubsidiaryCompany | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');

  const emptySub: SubsidiaryCompany = {
    id: `sub-${Date.now()}`,
    nameAr: '',
    nameEn: '',
    taglineAr: '',
    taglineEn: '',
    logoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=300&q=80',
    heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Building2',
    category: subsidiaryCategories[1]?.id || 'security',
    descriptionAr: '',
    descriptionEn: '',
    detailedMissionAr: '',
    detailedMissionEn: '',
    servicesAr: ['حراسة أمنية متميزة', 'نظافة صناعية'],
    servicesEn: ['Security Guarding', 'Industrial Sanitation'],
    certificationsAr: ['مرخصة من وزارة الداخلية - الأمن العام', 'ISO 9001'],
    certificationsEn: ['Licensed by Ministry of Interior', 'ISO 9001'],
    galleryImages: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'],
    clientsCount: 50,
    projectsCount: 120,
    establishedYear: '2020',
    email: 'sub@hares-niqaa.com',
    phone: '+966 11 000 0000',
    badgeAr: 'شركة تابعة',
    badgeEn: 'Subsidiary',
  };

  const [formData, setFormData] = useState<SubsidiaryCompany>(emptySub);

  const handleOpenCreate = () => {
    setFormData({
      ...emptySub,
      id: `sub-${Date.now()}`,
    });
    setEditingSub(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (sub: SubsidiaryCompany) => {
    setFormData(sub);
    setEditingSub(sub);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addSubsidiary(formData);
    } else if (editingSub) {
      updateSubsidiary(editingSub.id, formData);
    }
    setIsCreating(false);
    setEditingSub(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت تأكد من حذف هذه الشركة التابعة؟' : 'Are you sure you want to delete this subsidiary?')) {
      deleteSubsidiary(id);
    }
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatAr.trim()) return;
    const catId = `cat-${Date.now()}`;
    addSubsidiaryCategory({
      id: catId,
      nameAr: newCatAr,
      nameEn: newCatEn || newCatAr,
    });
    setNewCatAr('');
    setNewCatEn('');
  };

  return (
    <div className="space-y-8 text-white max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-arabic">
            {lang === 'ar' ? 'إدارة الشركات التابعة والتصنيفات (Subsidiaries & Categories Manager)' : 'Subsidiaries & Categories Manager'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إضافة وتعديل وحذف لوجوهات وخدمات وصفحات الشركات التابعة وإنشاء تصنيفات مخصصة لها.'
              : 'Create subsidiaries, upload logos, customize standalone pages, and manage categories.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCatModal(!showCatModal)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-[#C9A961] font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Tag className="w-4 h-4 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إدارة تصنيفات الشركات' : 'Manage Categories'}</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-110 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة شركة تابعة جديدة' : 'Add New Subsidiary'}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC CATEGORY MANAGER PANEL */}
      {showCatModal && (
        <div className="p-6 rounded-2xl bg-[#112236] border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-[#C9A961] flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إنشاء وإدارة التصنيفات المخصصة للشركات' : 'Dynamic Subsidiary Categories'}</span>
          </h3>

          <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              required
              placeholder={lang === 'ar' ? 'اسم التصنيف الجديد (عربي)...' : 'Category Name (Arabic)...'}
              value={newCatAr}
              onChange={(e) => setNewCatAr(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'اسم التصنيف (إنجليزي)...' : 'Category Name (English)...'}
              value={newCatEn}
              onChange={(e) => setNewCatEn(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs shrink-0 cursor-pointer"
            >
              {lang === 'ar' ? 'إضافة تصنيف' : 'Add Category'}
            </button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {subsidiaryCategories.map((cat) => (
              <div key={cat.id} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs flex items-center gap-2">
                <span className="font-semibold text-slate-200">{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                {cat.id !== 'all' && (
                  <button
                    onClick={() => deleteSubsidiaryCategory(cat.id)}
                    className="text-red-400 hover:text-red-300 ml-1"
                    title="Delete category"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Modal / Section */}
      {(isCreating || editingSub) && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-2xl bg-[#112236] border border-[#C9A961]/40 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-[#C9A961]">
              {isCreating
                ? (lang === 'ar' ? 'إضافة شركة تابعة جديدة' : 'Create Subsidiary')
                : (lang === 'ar' ? `تعديل شركة: ${editingSub?.nameAr}` : `Edit: ${editingSub?.nameEn}`)}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingSub(null); }}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'اسم الشركة (عربي)' : 'Name (Arabic)'}</label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'اسم الشركة (إنجليزي)' : 'Name (English)'}</label>
              <input
                type="text"
                required
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'الشعار الفرعي / Tagline (عربي)' : 'Tagline (Arabic)'}</label>
              <input
                type="text"
                value={formData.taglineAr}
                onChange={(e) => setFormData({ ...formData, taglineAr: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'التصنيف المخصص (Dynamic Category)' : 'Dynamic Category'}</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              >
                {subsidiaryCategories.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <ImageUploadInput
                label={lang === 'ar' ? 'شعار الشركة (Logo Image)' : 'Subsidiary Logo Image'}
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                helpText={lang === 'ar' ? 'يمكنك رفع صورة الشعار مباشرة من جهازك أو إدخال رابط URL' : 'Upload logo from your device or paste image URL'}
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploadInput
                label={lang === 'ar' ? 'صورة الغلاف / الهيرو الخاصة بالشركة' : 'Subsidiary Hero Banner Image'}
                value={formData.heroImage || ''}
                onChange={(url) => setFormData({ ...formData, heroImage: url })}
                helpText={lang === 'ar' ? 'اختر صورة من جهازك لصفحة الشركة التابعة' : 'Select banner image for subsidiary landing page'}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'شارات الشركة (عربي)' : 'Badge Label (Arabic)'}</label>
              <input
                type="text"
                value={formData.badgeAr}
                onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'سنة التأسيس' : 'Established Year'}</label>
              <input
                type="text"
                value={formData.establishedYear}
                onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'البريد الإلكتروني للشركة' : 'Subsidiary Email'}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'هاتف التواصل Direct Phone' : 'Phone'}</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
                dir="ltr"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'الوصف الرئيسي (عربي)' : 'Description (Arabic)'}</label>
              <textarea
                rows={2}
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'رؤية ورسالة الشركة التفصيلية (عربي)' : 'Detailed Mission (Arabic)'}</label>
              <textarea
                rows={2}
                value={formData.detailedMissionAr || ''}
                onChange={(e) => setFormData({ ...formData, detailedMissionAr: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-1 font-semibold text-slate-300">{lang === 'ar' ? 'الخدمات المقدمة (مفصولة بفاصلة)' : 'Services Provided (comma separated)'}</label>
              <input
                type="text"
                value={formData.servicesAr.join(', ')}
                onChange={(e) => setFormData({ ...formData, servicesAr: e.target.value.split(',').map((s) => s.trim()) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white mb-2"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingSub(null); }}
              className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{lang === 'ar' ? 'حفظ بيانات الشركة' : 'Save Subsidiary'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid List of Subsidiaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subsidiaries.map((sub) => (
          <div key={sub.id} className="p-6 rounded-2xl bg-[#112236] border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={sub.logoUrl} alt={sub.nameAr} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#C9A961]/20 text-[#C9A961] text-[10px] font-bold">
                      {sub.badgeAr}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {lang === 'ar' ? sub.nameAr : sub.nameEn}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(sub)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-[#C9A961] border border-slate-700"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:text-red-300 border border-red-900/50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#C9A961] font-semibold">{lang === 'ar' ? sub.taglineAr : sub.taglineEn}</p>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{lang === 'ar' ? sub.descriptionAr : sub.descriptionEn}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Est. {sub.establishedYear}</span>
              <span>+{sub.projectsCount} Projects</span>
              <span>{sub.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
