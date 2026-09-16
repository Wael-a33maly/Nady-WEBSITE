import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { WhyUsFeature } from '../../types';
import { Plus, Edit2, Trash2, Award, ShieldAlert, Clock, Cpu, ShieldCheck, Zap, Star, Lock, HeartHandshake, Sparkles, CheckCircle2, X, AlertTriangle } from 'lucide-react';

const availableIcons = [
  { name: 'ShieldAlert', labelAr: 'درع إنذار', labelEn: 'Shield Alert', icon: ShieldAlert },
  { name: 'Award', labelAr: 'جائزة / اعتماد', labelEn: 'Award', icon: Award },
  { name: 'Clock', labelAr: 'ساعة / 24 ساعة', labelEn: 'Clock', icon: Clock },
  { name: 'Cpu', labelAr: 'معالج / تقنية', labelEn: 'CPU', icon: Cpu },
  { name: 'ShieldCheck', labelAr: 'درع أمان', labelEn: 'Shield Check', icon: ShieldCheck },
  { name: 'Zap', labelAr: 'سرعة / استجابة', labelEn: 'Zap', icon: Zap },
  { name: 'Star', labelAr: 'نجمة جودة', labelEn: 'Star', icon: Star },
  { name: 'Lock', labelAr: 'قفل حماية', labelEn: 'Lock', icon: Lock },
  { name: 'HeartHandshake', labelAr: 'مصافحة وشراكة', labelEn: 'Handshake', icon: HeartHandshake },
  { name: 'Sparkles', labelAr: 'نظافة وتألق', labelEn: 'Sparkles', icon: Sparkles },
];

export const WhyUsManager: React.FC = () => {
  const { lang, whyUsFeatures, addWhyUsFeature, updateWhyUsFeature, deleteWhyUsFeature, settings } = useApp();

  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<WhyUsFeature | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<WhyUsFeature | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleConfirmDelete = (item: WhyUsFeature) => {
    deleteWhyUsFeature(item.id);
    setDeleteConfirmItem(null);
    showToast(
      lang === 'ar'
        ? `تم حذف معيار "${item.titleAr || item.id}" بنجاح`
        : `Pillar "${item.titleEn || item.id}" was deleted successfully`
    );
  };

  // Form states
  const [iconName, setIconName] = useState('ShieldAlert');
  const [titleAr, setTitleAr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [badgeAr, setBadgeAr] = useState('');
  const [badgeEn, setBadgeEn] = useState('');

  const resetForm = () => {
    setIconName('ShieldAlert');
    setTitleAr('');
    setTitleEn('');
    setDescAr('');
    setDescEn('');
    setBadgeAr('');
    setBadgeEn('');
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleOpenEdit = (item: WhyUsFeature) => {
    setEditingItem(item);
    setIconName(item.iconName || 'ShieldAlert');
    setTitleAr(item.titleAr);
    setTitleEn(item.titleEn);
    setDescAr(item.descAr);
    setDescEn(item.descEn);
    setBadgeAr(item.badgeAr);
    setBadgeEn(item.badgeEn);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !titleEn) return;

    if (editingItem) {
      updateWhyUsFeature(editingItem.id, {
        iconName,
        titleAr,
        titleEn,
        descAr,
        descEn,
        badgeAr: badgeAr || (lang === 'ar' ? 'مميز' : 'Featured'),
        badgeEn: badgeEn || 'Featured',
      });
    } else {
      addWhyUsFeature({
        id: `why-${Date.now()}`,
        iconName,
        titleAr,
        titleEn,
        descAr,
        descEn,
        badgeAr: badgeAr || (lang === 'ar' ? 'مميز' : 'Featured'),
        badgeEn: badgeEn || 'Featured',
      });
    }

    resetForm();
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? `إدارة قسم (لماذا تختار ${settings.logoTextAr || 'المحيط الفضي'})` : `Manage (Why Choose ${settings.logoTextEn || 'Silver Ocean'}) Features`}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'التحكم الكامل في كروت المميزات والمعايير التي تظهر بالصفحة الرئيسية.'
              : 'Full control over feature cards shown in the home page Why Us section.'}
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAdding(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold text-sm hover:bg-[#d6b76f] transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة معيار جديد' : 'Add New Pillar'}</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 start-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* List of Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {whyUsFeatures.map((item) => {
          const iconObj = availableIcons.find((i) => i.name === item.iconName) || availableIcons[0];
          const IconComp = iconObj.icon;
          const isPendingDelete = deleteConfirmItem?.id === item.id;

          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-white dark:bg-[#112236] border space-y-4 relative group shadow-sm transition-all flex flex-col justify-between ${
                isPendingDelete
                  ? 'border-red-500/80 ring-2 ring-red-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#C9A961]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A961]/15 text-[#C9A961] flex items-center justify-center border border-[#C9A961]/30">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#C9A961]/15 text-[#C9A961]">
                      {lang === 'ar' ? item.badgeAr : item.badgeEn}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 text-slate-400 hover:text-[#C9A961] rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'تعديل' : 'Edit'}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmItem(item)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>

              {/* Inline Delete Confirmation Banner */}
              {isPendingDelete && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'ar'
                        ? 'تأكيد حذف هذا المعيار من الموقع؟'
                        : 'Confirm deleting this pillar permanently?'}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmItem(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirmDelete(item)}
                      className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      {lang === 'ar' ? 'نعم، احذف' : 'Yes, Delete'}
                    </button>
                  </div>
                </div>
              )}

              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                <span>ID: {item.id} | Icon: {item.iconName}</span>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmItem(item)}
                  className="text-red-500 hover:text-red-600 hover:underline cursor-pointer text-[10px]"
                >
                  {lang === 'ar' ? 'حذف المعيار' : 'Delete Pillar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'تأكيد حذف المعيار' : 'Confirm Pillar Deletion'}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {deleteConfirmItem.id}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? `هل أنت متأكد من رغبتك في حذف معيار "${deleteConfirmItem.titleAr || deleteConfirmItem.id}" نهائياً؟ سيتم إزالته فوراً من قسم لماذا نحن بالصفحة الرئيسية.`
                : `Are you sure you want to delete "${deleteConfirmItem.titleEn || deleteConfirmItem.id}"? It will be removed immediately from the Why Us section on the homepage.`}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(deleteConfirmItem)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'نعم، حذف نهائي' : 'Yes, Delete Permanently'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add / Edit */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingItem
                  ? lang === 'ar'
                    ? 'تعديل معيار لماذا نحن'
                    : 'Edit Pillar'
                  : lang === 'ar'
                  ? 'إضافة معيار جديد'
                  : 'Add New Pillar'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {lang === 'ar' ? 'اختر أيقونة العنصر' : 'Select Icon'}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {availableIcons.map((ic) => {
                    const IconC = ic.icon;
                    const isSel = iconName === ic.name;
                    return (
                      <button
                        type="button"
                        key={ic.name}
                        onClick={() => setIconName(ic.name)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#C9A961] text-[#0B1929] border-[#C9A961] font-bold shadow'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <IconC className="w-5 h-5" />
                        <span className="text-[9px] truncate max-w-full">{ic.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'العنوان بالعربية' : 'Arabic Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none"
                    placeholder="مثال: كوادر أمنية مدربة"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'العنوان بالإنجليزية' : 'English Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none"
                    placeholder="e.g. Certified Guarding Staff"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الشارة بالعربية (Badge)' : 'Arabic Badge'}
                  </label>
                  <input
                    type="text"
                    value={badgeAr}
                    onChange={(e) => setBadgeAr(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none"
                    placeholder="مثال: أمان موثوق"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ar' ? 'الشارة بالإنجليزية (Badge)' : 'English Badge'}
                  </label>
                  <input
                    type="text"
                    value={badgeEn}
                    onChange={(e) => setBadgeEn(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none"
                    placeholder="e.g. Trusted Security"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'الوصف بالعربية' : 'Arabic Description'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={descAr}
                  onChange={(e) => setDescAr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none resize-none"
                  placeholder="ادخل تفاصيل المعيار..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ar' ? 'الوصف بالإنجليزية' : 'English Description'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:border-[#C9A961] outline-none resize-none"
                  placeholder="Enter pillar details..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold text-xs hover:bg-[#d6b76f] transition-all shadow-md cursor-pointer"
                >
                  {editingItem
                    ? lang === 'ar'
                      ? 'حفظ التعديلات'
                      : 'Save Changes'
                    : lang === 'ar'
                    ? 'إضافة الآن'
                    : 'Add Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
