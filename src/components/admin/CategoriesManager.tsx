import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubsidiaryCategory } from '../../types';
import { Tag, Plus, Edit2, Trash2, CheckCircle2, Building2, Layers, Sparkles, AlertCircle } from 'lucide-react';

export const CategoriesManager: React.FC = () => {
  const {
    lang,
    subsidiaryCategories,
    addSubsidiaryCategory,
    updateSubsidiaryCategory,
    deleteSubsidiaryCategory,
    subsidiaries,
  } = useApp();

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingAr, setEditingAr] = useState('');
  const [editingEn, setEditingEn] = useState('');

  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatAr.trim()) return;

    const catId = `cat-${Date.now()}`;
    addSubsidiaryCategory({
      id: catId,
      nameAr: newCatAr.trim(),
      nameEn: newCatEn.trim() || newCatAr.trim(),
    });

    setNewCatAr('');
    setNewCatEn('');
    setSuccessMsg(lang === 'ar' ? 'تمت إضافة التصنيف الديناميكي بنجاح!' : 'Dynamic Category added successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleStartEdit = (cat: SubsidiaryCategory) => {
    setEditingCatId(cat.id);
    setEditingAr(cat.nameAr);
    setEditingEn(cat.nameEn);
  };

  const handleSaveEdit = (id: string) => {
    if (!editingAr.trim()) return;
    updateSubsidiaryCategory(id, {
      nameAr: editingAr.trim(),
      nameEn: editingEn.trim() || editingAr.trim(),
    });
    setEditingCatId(null);
    setSuccessMsg(lang === 'ar' ? 'تم تحديث بيانات التصنيف!' : 'Category updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (id === 'all') {
      alert(lang === 'ar' ? 'لا يمكن حذف تصنيف "الكل"' : 'Cannot delete "All" category');
      return;
    }
    if (window.confirm(lang === 'ar' ? 'هل أنت تأكد من حذف هذا التصنيف الديناميكي؟' : 'Are you sure you want to delete this category?')) {
      deleteSubsidiaryCategory(id);
      setSuccessMsg(lang === 'ar' ? 'تم حذف التصنيف!' : 'Category deleted!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-transparent border border-[#C9A961]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A961]/20 text-[#C9A961] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'محتوى ديناميكي متطور' : 'Dynamic Content Engine'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة تصنيفات الشركات الديناميكية (Dynamic Categories Manager)' : 'Dynamic Categories Manager'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'ar'
              ? 'تتيح لك هذه الشاشة إضافة وتعديل وتنظيم تصنيفات خدمات وشركات المجموعة التابعة تلقائياً على الموقع الرئيسي بمرونة كاملة.'
              : 'Add, edit, and reorganize dynamic categories for all subsidiary companies with real-time site updates.'}
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add New Category Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Plus className="w-5 h-5 text-[#C9A961]" />
          <span>{lang === 'ar' ? 'إضافة تصنيف ديناميكي جديد' : 'Create New Dynamic Category'}</span>
        </h3>

        <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {lang === 'ar' ? 'اسم التصنيف (بالعربية)' : 'Category Name (Arabic)'}
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'ar' ? 'مثال: الأمن السيبراني والأنظمة' : 'e.g. Cybersecurity'}
              value={newCatAr}
              onChange={(e) => setNewCatAr(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {lang === 'ar' ? 'اسم التصنيف (بالإنجليزي)' : 'Category Name (English)'}
            </label>
            <input
              type="text"
              placeholder={lang === 'ar' ? 'مثال: Cybersecurity & Systems' : 'e.g. Cybersecurity & Systems'}
              value={newCatEn}
              onChange={(e) => setNewCatEn(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Existing Dynamic Categories List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'التصنيفات المتاحة حالياً' : 'Active Dynamic Categories'}</span>
          </h3>
          <span className="text-xs font-mono font-bold text-[#C9A961]">
            {subsidiaryCategories.length} {lang === 'ar' ? 'تصنيف' : 'Categories'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subsidiaryCategories.map((cat) => {
            const assignedSubCount = subsidiaries.filter((s) => s.category === cat.id).length;
            const isEditing = editingCatId === cat.id;

            return (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4 transition-all hover:border-[#C9A961]/40"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editingAr}
                      onChange={(e) => setEditingAr(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white"
                      placeholder="اسم التصنيف بالعربي"
                    />
                    <input
                      type="text"
                      value={editingEn}
                      onChange={(e) => setEditingEn(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white"
                      placeholder="Category name in English"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingCatId(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        onClick={() => handleSaveEdit(cat.id)}
                        className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#0B1929] text-xs font-bold"
                      >
                        {lang === 'ar' ? 'حفظ' : 'Save'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#C9A961]" />
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {lang === 'ar' ? cat.nameAr : cat.nameEn}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono dir-ltr">
                          ID: {cat.id} • {cat.nameEn}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(cat)}
                          className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:text-[#C9A961] text-slate-700 dark:text-slate-300"
                          title="Edit Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {cat.id !== 'all' && (
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#C9A961]" />
                        <span>
                          {assignedSubCount}{' '}
                          {lang === 'ar' ? 'شركات مسجلة تحت هذا التصنيف' : 'subsidiaries under category'}
                        </span>
                      </span>

                      <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                        {cat.id === 'all' ? (lang === 'ar' ? 'افتراضي' : 'Default') : (lang === 'ar' ? 'ديناميكي' : 'Dynamic')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
