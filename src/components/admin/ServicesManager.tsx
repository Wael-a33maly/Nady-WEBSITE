import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Sparkles, Check, Search, Eye, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const ServicesManager: React.FC = () => {
  const { lang, services, addService, updateService, deleteService } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyService: ServiceItem = {
    id: `srv-${Date.now().toString().slice(-4)}`,
    titleAr: '',
    titleEn: '',
    descAr: '',
    descEn: '',
    detailedDescAr: '',
    detailedDescEn: '',
    category: 'security',
    iconName: 'Shield',
    featuresAr: ['تغطية ميدانية 24/7', 'طاقم عمل مدرب ومصرح'],
    featuresEn: ['24/7 Field Coverage', 'Certified & Trained Crew'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    popular: false,
  };

  const [formData, setFormData] = useState<ServiceItem>(emptyService);
  const [featureArInput, setFeatureArInput] = useState('');
  const [featureEnInput, setFeatureEnInput] = useState('');

  const filteredServices = services.filter((s) =>
    s.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartCreate = () => {
    setFormData({
      ...emptyService,
      id: `srv-${Date.now().toString().slice(-4)}`,
    });
    setEditingService(null);
    setIsCreating(true);
  };

  const handleStartEdit = (service: ServiceItem) => {
    setFormData({ ...service });
    setEditingService(service);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr || !formData.titleEn) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم الخدمة بالعربية والإنجليزية' : 'Please enter service title in Arabic and English');
      return;
    }

    if (editingService) {
      updateService(editingService.id, formData);
      setEditingService(null);
    } else {
      addService(formData);
      setIsCreating(false);
    }
  };

  const handleAddFeatureAr = () => {
    if (!featureArInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      featuresAr: [...prev.featuresAr, featureArInput.trim()],
    }));
    setFeatureArInput('');
  };

  const handleRemoveFeatureAr = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      featuresAr: prev.featuresAr.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B1929] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إدارة الخدمات الأساسية' : 'Manage Core Services'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إضافة وتعديل وحذف الخدمات الميدانية مع إمكانية رفع صور من جهازك المحلي'
              : 'Add, edit, and delete core services with local image uploads'}
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute top-3.5 rtl:right-4 ltr:left-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={lang === 'ar' ? 'ابحث عن خدمة...' : 'Search for a service...'}
          className="w-full bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-xl rtl:pr-11 rtl:pl-4 ltr:pl-11 ltr:pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#C9A961] focus:outline-none"
        />
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-[#C9A961]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-44 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={service.image}
                  alt={service.titleAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 rtl:right-3 ltr:left-3 px-3 py-1 rounded-full bg-[#0B1929]/80 backdrop-blur-md text-[10px] font-bold text-[#C9A961] border border-[#C9A961]/30">
                  {service.category === 'security'
                    ? lang === 'ar' ? 'حراسات أمنية' : 'Security'
                    : service.category === 'cleaning'
                    ? lang === 'ar' ? 'نظافة وتعقيم' : 'Sanitation'
                    : lang === 'ar' ? 'حلول متكاملة' : 'Integrated'}
                </div>
                {service.popular && (
                  <div className="absolute top-3 rtl:left-3 ltr:right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
                    {lang === 'ar' ? 'الأكثر طلباً' : 'Popular'}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {lang === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {lang === 'ar' ? service.descAr : service.descEn}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {(lang === 'ar' ? service.featuresAr : service.featuresEn)?.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      • {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">{service.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(service)}
                  className="p-2 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(lang === 'ar' ? 'هل أنت تأكد من حذف هذه الخدمة؟' : 'Delete this service?')) {
                      deleteService(service.id);
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

      {/* Modal for Creating / Editing Service */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0B1929] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingService
                  ? lang === 'ar' ? 'تعديل بيانات الخدمة' : 'Edit Service Details'
                  : lang === 'ar' ? 'إضافة خدمة ميدانية جديدة' : 'Add New Service'}
              </h3>
              <button
                onClick={() => { setIsCreating(false); setEditingService(null); }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Local Image Upload */}
              <ImageUploadInput
                label={lang === 'ar' ? 'صورة الخدمة (ارفع من جهازك المحلي)' : 'Service Image (Upload from Local Device)'}
                value={formData.image}
                onChange={(newImg) => setFormData((prev) => ({ ...prev, image: newImg }))}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'عنوان الخدمة (بالعربية)' : 'Title (Arabic)'}
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
                    {lang === 'ar' ? 'عنوان الخدمة (بالإنجليزية)' : 'Title (English)'}
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
                    {lang === 'ar' ? 'التصنيف' : 'Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                  >
                    <option value="security">{lang === 'ar' ? 'حراسات أمنية' : 'Security'}</option>
                    <option value="cleaning">{lang === 'ar' ? 'نظافة وتعقيم' : 'Cleaning & Sanitation'}</option>
                    <option value="integrated">{lang === 'ar' ? 'حلول متكاملة' : 'Integrated Solutions'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {lang === 'ar' ? 'عرض كـ الأكثر طلباً؟' : 'Show as Popular?'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, popular: !formData.popular })}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                      formData.popular
                        ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500'
                    }`}
                  >
                    <Check className={`w-4 h-4 ${formData.popular ? 'opacity-100' : 'opacity-0'}`} />
                    <span>{formData.popular ? (lang === 'ar' ? 'نعم - مميزة' : 'Yes - Popular') : (lang === 'ar' ? 'خدمة عادية' : 'Normal Service')}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'الوصف المختصر (بالعربية)' : 'Short Description (Arabic)'}
                </label>
                <textarea
                  rows={2}
                  value={formData.descAr}
                  onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {lang === 'ar' ? 'الوصف المختصر (بالإنجليزية)' : 'Short Description (English)'}
                </label>
                <textarea
                  rows={2}
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              {/* Features Manager */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'مميزات الخدمة (نقاط القوة)' : 'Service Features (Points)'}
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureArInput}
                    onChange={(e) => setFeatureArInput(e.target.value)}
                    placeholder={lang === 'ar' ? 'أضف ميزة بالعربية...' : 'Add feature...'}
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeatureAr}
                    className="px-4 py-2 rounded-xl bg-[#C9A961] text-[#0B1929] font-bold"
                  >
                    {lang === 'ar' ? 'إضافة' : 'Add'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {formData.featuresAr.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-2"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeatureAr(idx)}
                        className="text-rose-500 hover:text-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingService(null); }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A961] to-[#b3914a] text-[#0B1929] font-bold shadow-md hover:opacity-95"
                >
                  {lang === 'ar' ? 'حفظ الخدمة' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
