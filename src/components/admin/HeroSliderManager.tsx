import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { HeroSlide } from '../../types';
import { initialHeroSlides } from '../../data/initialData';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  SlidersHorizontal,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  X,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

const PRESET_IMAGES = [
  {
    labelAr: 'حراسة أمنية ودوريات',
    labelEn: 'Security Patrol & Guarding',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    labelAr: 'غرفة تحكم ومراقبة ذكية',
    labelEn: 'AI Operations & Monitoring Room',
    url: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80',
  },
  {
    labelAr: 'تنظيف واجهات أبراج زجاجية',
    labelEn: 'High-Rise Glass Facade Cleaning',
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
  },
  {
    labelAr: 'أبراج ومقرات تجارية فاخرة',
    labelEn: 'Luxury Corporate Towers',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  {
    labelAr: 'استقبال ومنشآت حديثة',
    labelEn: 'Modern Corporate Facility',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  },
  {
    labelAr: 'تعقيم ونظافة صناعية متطورة',
    labelEn: 'Industrial Sanitation & Hygiene',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
  },
];

export const HeroSliderManager: React.FC = () => {
  const {
    lang,
    heroSlides,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    toggleHeroSlideActive,
    reorderHeroSlides,
    updateSettings,
  } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formImage, setFormImage] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formSubtitleAr, setFormSubtitleAr] = useState('');
  const [formSubtitleEn, setFormSubtitleEn] = useState('');
  const [formBadgeAr, setFormBadgeAr] = useState('');
  const [formBadgeEn, setFormBadgeEn] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [formPrimaryBtnTextAr, setFormPrimaryBtnTextAr] = useState('');
  const [formPrimaryBtnTextEn, setFormPrimaryBtnTextEn] = useState('');
  const [formPrimaryBtnLink, setFormPrimaryBtnLink] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAddModal = () => {
    setEditingSlide(null);
    setFormImage(PRESET_IMAGES[0].url);
    setFormTitleAr('');
    setFormTitleEn('');
    setFormSubtitleAr('');
    setFormSubtitleEn('');
    setFormBadgeAr(lang === 'ar' ? 'خدمات احترافية معتمدة' : 'Certified Professional Services');
    setFormBadgeEn('Certified Professional Services');
    setFormActive(true);
    setFormPrimaryBtnTextAr('');
    setFormPrimaryBtnTextEn('');
    setFormPrimaryBtnLink('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormImage(slide.image);
    setFormTitleAr(slide.titleAr);
    setFormTitleEn(slide.titleEn);
    setFormSubtitleAr(slide.subtitleAr);
    setFormSubtitleEn(slide.subtitleEn);
    setFormBadgeAr(slide.badgeAr || '');
    setFormBadgeEn(slide.badgeEn || '');
    setFormActive(slide.active !== false);
    setFormPrimaryBtnTextAr(slide.primaryBtnTextAr || '');
    setFormPrimaryBtnTextEn(slide.primaryBtnTextEn || '');
    setFormPrimaryBtnLink(slide.primaryBtnLink || '');
    setIsModalOpen(true);
  };

  const handleDuplicateSlide = (slide: HeroSlide) => {
    const copy: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
      titleAr: `${slide.titleAr} (نسخة)`,
      titleEn: `${slide.titleEn} (Copy)`,
      active: true,
    };
    addHeroSlide(copy);
    showToast(lang === 'ar' ? 'تم تكرار الشريحة بنجاح' : 'Slide duplicated successfully');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImage.trim()) {
      alert(lang === 'ar' ? 'يرجى اختيار أو رفع صورة للشريحة' : 'Please upload or specify a slide image');
      return;
    }
    if (!formTitleAr.trim() && !formTitleEn.trim()) {
      alert(lang === 'ar' ? 'يرجى إدخال عنوان الشريحة' : 'Please enter a slide title');
      return;
    }

    const slideData: HeroSlide = {
      id: editingSlide ? editingSlide.id : `slide-${Date.now()}`,
      image: formImage.trim(),
      titleAr: formTitleAr.trim() || formTitleEn.trim(),
      titleEn: formTitleEn.trim() || formTitleAr.trim(),
      subtitleAr: formSubtitleAr.trim() || formSubtitleEn.trim(),
      subtitleEn: formSubtitleEn.trim() || formSubtitleAr.trim(),
      badgeAr: formBadgeAr.trim(),
      badgeEn: formBadgeEn.trim(),
      active: formActive,
      primaryBtnTextAr: formPrimaryBtnTextAr.trim(),
      primaryBtnTextEn: formPrimaryBtnTextEn.trim(),
      primaryBtnLink: formPrimaryBtnLink.trim(),
    };

    if (editingSlide) {
      updateHeroSlide(editingSlide.id, slideData);
      showToast(lang === 'ar' ? 'تم تحديث الشريحة بنجاح' : 'Slide updated successfully');
    } else {
      addHeroSlide(slideData);
      showToast(lang === 'ar' ? 'تمت إضافة الشريحة الجديدة إلى السلايدر' : 'New slide added to slider');
    }

    setIsModalOpen(false);
  };

  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= heroSlides.length) return;

    const newSlides = [...heroSlides];
    const temp = newSlides[index];
    newSlides[index] = newSlides[targetIndex];
    newSlides[targetIndex] = temp;
    reorderHeroSlides(newSlides);
    showToast(lang === 'ar' ? 'تم تحديث ترتيب الشرائح' : 'Slide order updated');
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        lang === 'ar'
          ? 'هل أنت متأكد من استعادة الشرائح الافتراضية للشركة؟'
          : 'Are you sure you want to restore default company slides?'
      )
    ) {
      updateSettings({ heroSlides: initialHeroSlides });
      showToast(lang === 'ar' ? 'تمت استعادة الشرائح الافتراضية بنجاح' : 'Default slides restored');
    }
  };

  const activeSlidesCount = heroSlides.filter((s) => s.active !== false).length;
  const inactiveSlidesCount = heroSlides.length - activeSlidesCount;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 font-bold text-sm"
          >
            <Check className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0B1929] p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A961]/15 text-[#C9A961] flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {lang === 'ar' ? 'إدارة سلايدر الواجهة الرئيسية' : 'Hero Slider & Images Manager'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {lang === 'ar'
                  ? 'إضافة وحذف وترتيب شرائح السلايدر، رفع الصور من جهازك، وتفعيل/تعطيل ظهور أي صورة للزوار'
                  : 'Add, upload from device, reorder, and toggle slide visibility on the live website'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            title={lang === 'ar' ? 'استعادة الشرائح الأصلية' : 'Restore original slides'}
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-2xl bg-[#C9A961] hover:bg-[#b5954f] text-[#0B1929] text-xs sm:text-sm font-bold shadow-lg shadow-[#C9A961]/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة شريحة جديدة' : 'Add New Slide'}</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0B1929] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'إجمالي الشرائح' : 'Total Slides'}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {heroSlides.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1929] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              {lang === 'ar' ? 'الشرائح المفعلة (تظهر للزوار)' : 'Active (Visible on Site)'}
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {activeSlidesCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#0B1929] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lang === 'ar' ? 'الشرائح المعطلة (مخفية مؤقتاً)' : 'Inactive (Hidden)'}
            </p>
            <p className="text-2xl font-bold text-slate-500 dark:text-slate-400 mt-1">
              {inactiveSlidesCount}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-500/10 text-slate-500 flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Info Tip Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-bold">
            {lang === 'ar'
              ? 'ميزة التحكم الفوري بظهور الشرائح ورفع الصور من جهازك:'
              : 'Direct Slide Visibility Control & Local Device Upload:'}
          </p>
          <p>
            {lang === 'ar'
              ? 'يمكنك تفعيل أو تعطيل أي شريحة فورياً عبر زر التبديل الأخضر/الرمادي دون حذفها. يمكنك أيضاً رفع صور عالية الدقة مباشرة من جهازك (JPG, PNG, WEBP) وستُحفظ وتُعرض تلقائياً في السلايدر.'
              : 'You can toggle any slide active/inactive with one click without deleting it. You can also upload high-resolution images directly from your computer, which will be saved and displayed instantly.'}
          </p>
        </div>
      </div>

      {/* Slides Grid / List */}
      <div className="space-y-4">
        {heroSlides.length === 0 ? (
          <div className="bg-white dark:bg-[#0B1929] p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'لا توجد شرائح في السلايدر حالياً' : 'No slides in the slider yet'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {lang === 'ar'
                ? 'ابدأ بإضافة شريحة جديدة أو استعد الشرائح الافتراضية الخاصة بشركة المحيط الفضي'
                : 'Start by creating a new slide or restore default company slides'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleOpenAddModal}
                className="px-5 py-2.5 rounded-2xl bg-[#C9A961] text-[#0B1929] font-bold text-xs sm:text-sm"
              >
                {lang === 'ar' ? '+ إضافة شريحة' : '+ Add Slide'}
              </button>
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm"
              >
                {lang === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}
              </button>
            </div>
          </div>
        ) : (
          heroSlides.map((slide, idx) => {
            const isActive = slide.active !== false;
            const isLocalUpload = slide.image.startsWith('data:');

            return (
              <motion.div
                key={slide.id || idx}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-3xl bg-white dark:bg-[#0B1929] border transition-all ${
                  isActive
                    ? 'border-slate-200 dark:border-slate-800 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800/60 opacity-75 bg-slate-50/50 dark:bg-slate-900/40'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  {/* Image Column */}
                  <div className="lg:col-span-4 relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-200 dark:border-slate-800 group">
                    <img
                      src={slide.image}
                      alt={slide.titleAr}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                        !isActive ? 'grayscale brightness-75' : ''
                      }`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          PRESET_IMAGES[idx % PRESET_IMAGES.length].url;
                      }}
                    />

                    {/* Badge on Image */}
                    <div className="absolute top-2.5 right-2.5 rtl:right-2.5 rtl:left-auto ltr:left-2.5 ltr:right-auto flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0B1929]/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#C9A961]" />
                      <span>{lang === 'ar' ? `شريحة #${idx + 1}` : `Slide #${idx + 1}`}</span>
                    </div>

                    {/* Local File indicator */}
                    {isLocalUpload && (
                      <div className="absolute bottom-2.5 right-2.5 rtl:right-2.5 rtl:left-auto ltr:left-2.5 ltr:right-auto px-2 py-0.5 rounded-lg bg-emerald-600/90 text-white text-[10px] font-bold shadow-md">
                        {lang === 'ar' ? 'مرفوعة من الجهاز' : 'Uploaded File'}
                      </div>
                    )}

                    {/* Deactivated Overlay Notice */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex items-center justify-center p-3 text-center">
                        <div className="space-y-1">
                          <EyeOff className="w-6 h-6 text-slate-300 mx-auto" />
                          <span className="text-xs font-bold text-white block">
                            {lang === 'ar' ? 'معطلة - مخفية من السلايدر' : 'Hidden from Slider'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Details Column */}
                  <div className="lg:col-span-5 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Active Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
                        />
                        <span>
                          {isActive
                            ? lang === 'ar'
                              ? 'مفعلة وتظهر في الموقع'
                              : 'Active & Displayed'
                            : lang === 'ar'
                            ? 'معطلة ومخفية'
                            : 'Inactive & Hidden'}
                        </span>
                      </span>

                      {/* Tag/Badge text */}
                      {(slide.badgeAr || slide.badgeEn) && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#C9A961]/15 text-[#C9A961] border border-[#C9A961]/30">
                          {lang === 'ar' ? slide.badgeAr : slide.badgeEn}
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                        {slide.titleAr}
                      </h4>
                      {slide.titleEn && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {slide.titleEn}
                        </p>
                      )}
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {lang === 'ar' ? slide.subtitleAr : slide.subtitleEn}
                    </p>
                  </div>

                  {/* Controls & Toggle Actions Column */}
                  <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-stretch justify-between gap-3 border-t lg:border-t-0 lg:border-s border-slate-200 dark:border-slate-800 pt-3 lg:pt-0 lg:ps-5">
                    {/* Direct Toggle Switch */}
                    <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <div className="text-xs">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">
                          {lang === 'ar' ? 'حالة العرض:' : 'Visibility:'}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {isActive
                            ? lang === 'ar' ? 'معروضة الآن' : 'Showing now'
                            : lang === 'ar' ? 'مخفية' : 'Hidden'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          toggleHeroSlideActive(slide.id);
                          showToast(
                            isActive
                              ? lang === 'ar' ? 'تم تعطيل عرض الشريحة' : 'Slide deactivated'
                              : lang === 'ar' ? 'تم تفعيل عرض الشريحة' : 'Slide activated'
                          );
                        }}
                        className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                          isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                        title={
                          isActive
                            ? lang === 'ar' ? 'اضغط لتعطيل الشريحة' : 'Click to deactivate'
                            : lang === 'ar' ? 'اضغط لتفعيل الشريحة' : 'Click to activate'
                        }
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                            isActive
                              ? 'translate-x-7 rtl:-translate-x-7'
                              : 'translate-x-1 rtl:-translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Order buttons */}
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSlide(idx, 'up')}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#C9A961] hover:text-[#0B1929] disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 cursor-pointer transition-colors"
                          title={lang === 'ar' ? 'تحريك للأعلى' : 'Move Up'}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === heroSlides.length - 1}
                          onClick={() => handleMoveSlide(idx, 'down')}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#C9A961] hover:text-[#0B1929] disabled:opacity-30 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 cursor-pointer transition-colors"
                          title={lang === 'ar' ? 'تحريك للأسفل' : 'Move Down'}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDuplicateSlide(slide)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                          title={lang === 'ar' ? 'تكرار الشريحة' : 'Duplicate Slide'}
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(slide)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#C9A961] hover:bg-[#C9A961]/10 transition-colors cursor-pointer"
                          title={lang === 'ar' ? 'تعديل الشريحة' : 'Edit Slide'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(slide.id)}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title={lang === 'ar' ? 'حذف الشريحة' : 'Delete Slide'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Confirmation Bar */}
                {deleteConfirmId === slide.id && (
                  <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>
                        {lang === 'ar'
                          ? 'هل أنت متأكد من حذف هذه الشريحة نهائياً؟'
                          : 'Are you sure you want to permanently delete this slide?'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          deleteHeroSlide(slide.id);
                          setDeleteConfirmId(null);
                          showToast(lang === 'ar' ? 'تم حذف الشريحة' : 'Slide deleted');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer transition-colors"
                      >
                        {lang === 'ar' ? 'نعم، حذف' : 'Yes, Delete'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-[#0B1929] w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A961]/15 text-[#C9A961] flex items-center justify-center">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {editingSlide
                        ? lang === 'ar'
                          ? 'تعديل شريحة السلايدر'
                          : 'Edit Hero Slide'
                        : lang === 'ar'
                        ? 'إضافة شريحة جديدة للسلايدر'
                        : 'Add New Hero Slide'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'ارفع صورة من جهازك، حدد النصوص، وتحكم بحالة تفعيل العرض'
                        : 'Upload image from local device, set texts, and control active status'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveModal} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Active Status Switch in Modal */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${formActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{lang === 'ar' ? 'تفعيل الشريحة في السلايدر' : 'Active in Slider'}</span>
                    </label>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'إذا تم إلغاء التفعيل، سيتم حفظ الشريحة ولكنها لن تظهر للزوار في الصفحة الرئيسية'
                        : 'If unchecked, the slide is saved in draft mode and hidden from visitors'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormActive(!formActive)}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors cursor-pointer focus:outline-none ${
                      formActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                        formActive
                          ? 'translate-x-8 rtl:-translate-x-8'
                          : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Image Upload Component (Device Upload + Drag Drop + URL Mode) */}
                <div className="space-y-3">
                  <ImageUploadInput
                    label={
                      lang === 'ar'
                        ? 'صورة الشريحة (رفع من الجهاز المحلي أو رابط)'
                        : 'Slide Image (Upload from Local Device or Paste URL)'
                    }
                    value={formImage}
                    onChange={(newVal) => setFormImage(newVal)}
                    placeholder="https://images.unsplash.com/..."
                    helpText={
                      lang === 'ar'
                        ? 'يدعم صور JPG, PNG, WEBP بدقة عالية (أقل من 8 ميجابايت)'
                        : 'Supports high-res JPG, PNG, WEBP (under 8MB)'
                    }
                  />

                  {/* Preset Suggestions */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
                      <span>{lang === 'ar' ? 'أو اختر من مكتبة الصور الجاهزة فائقة الدقة:' : 'Or pick from curated high-res photo presets:'}</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRESET_IMAGES.map((preset, pIdx) => {
                        const isSelected = formImage === preset.url;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setFormImage(preset.url)}
                            className={`p-1.5 rounded-xl border text-right rtl:text-right ltr:text-left flex items-center gap-2 transition-all cursor-pointer group ${
                              isSelected
                                ? 'border-[#C9A961] bg-[#C9A961]/10'
                                : 'border-slate-200 dark:border-slate-800 hover:border-[#C9A961]/50 bg-slate-50 dark:bg-slate-900/60'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.labelAr}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="overflow-hidden">
                              <p className="text-[11px] font-semibold text-slate-900 dark:text-slate-200 truncate">
                                {lang === 'ar' ? preset.labelAr : preset.labelEn}
                              </p>
                              <span className="text-[9px] text-[#C9A961] flex items-center gap-1">
                                {isSelected ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  lang === 'ar' ? 'اختيار' : 'Select'
                                )}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Live Preview Card */}
                {formImage && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-3">
                    <p className="text-xs font-bold text-[#C9A961] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'معاينة حية للشريحة في الموقع' : 'Live Front-End Slide Preview'}</span>
                    </p>
                    <div className="relative rounded-xl overflow-hidden aspect-[21/9] sm:aspect-[16/7] bg-slate-900 border border-white/10 flex items-end p-4 sm:p-6">
                      <img
                        src={formImage}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover brightness-75"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1929] via-[#0B1929]/50 to-transparent" />
                      <div className="relative z-10 space-y-2 max-w-xl">
                        {(formBadgeAr || formBadgeEn) && (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-[#C9A961]/20 border border-[#C9A961]/40 text-[#C9A961] text-[10px] sm:text-xs font-bold">
                            {lang === 'ar' ? formBadgeAr : formBadgeEn}
                          </span>
                        )}
                        <h4 className="text-base sm:text-2xl font-extrabold text-white leading-tight font-arabic">
                          {formTitleAr || (lang === 'ar' ? 'عنوان الشريحة يظهر هنا' : 'Slide Title Appears Here')}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2">
                          {formSubtitleAr || (lang === 'ar' ? 'وصف الشريحة التوضيحي...' : 'Slide description...')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'العنوان الرئيسي (بالعربية) *' : 'Main Title (Arabic) *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitleAr}
                      onChange={(e) => setFormTitleAr(e.target.value)}
                      placeholder="مثال: حماية متكاملة ونظافة استثنائية"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'العنوان الرئيسي (بالإنجليزية)' : 'Main Title (English)'}
                    </label>
                    <input
                      type="text"
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      placeholder="e.g. Integrated Protection & Sanitation"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none dir-ltr text-left"
                    />
                  </div>
                </div>

                {/* Badges / Sub-tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'الشارة العلوية (Badge بالعربية)' : 'Upper Badge (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={formBadgeAr}
                      onChange={(e) => setFormBadgeAr(e.target.value)}
                      placeholder="مثال: الشركة الأولى المعتمدة للحراسات الأمنية"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'الشارة العلوية (Badge بالإنجليزية)' : 'Upper Badge (English)'}
                    </label>
                    <input
                      type="text"
                      value={formBadgeEn}
                      onChange={(e) => setFormBadgeEn(e.target.value)}
                      placeholder="e.g. ISO Certified Security Enterprise"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none dir-ltr text-left"
                    />
                  </div>
                </div>

                {/* Subtitle / Paragraph */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'الوصف والتفاصيل (بالعربية)' : 'Subtitle / Description (Arabic)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formSubtitleAr}
                      onChange={(e) => setFormSubtitleAr(e.target.value)}
                      placeholder="نقدم أحدث حلول الحراسة الأمنية الفاخرة والنظافة الشاملة..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      {lang === 'ar' ? 'الوصف والتفاصيل (بالإنجليزية)' : 'Subtitle / Description (English)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formSubtitleEn}
                      onChange={(e) => setFormSubtitleEn(e.target.value)}
                      placeholder="Delivering elite security guarding and comprehensive industrial sanitation..."
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none resize-none dir-ltr text-left"
                    />
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-2xl bg-[#C9A961] hover:bg-[#b5954f] text-[#0B1929] text-xs sm:text-sm font-bold shadow-lg shadow-[#C9A961]/25 transition-all cursor-pointer"
                  >
                    {editingSlide
                      ? lang === 'ar'
                        ? 'حفظ التعديلات'
                        : 'Save Changes'
                      : lang === 'ar'
                      ? 'إضافة الشريحة'
                      : 'Add Slide'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
