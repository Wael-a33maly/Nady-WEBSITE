import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientLogo, Testimonial } from '../../types';
import { Plus, Trash2, Edit2, Shield, Star, CheckCircle2, Quote, Building2, Image as ImageIcon, X } from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export const PartnersManager: React.FC = () => {
  const {
    lang,
    clientLogos,
    addClientLogo,
    updateClientLogo,
    deleteClientLogo,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'logos' | 'testimonials'>('logos');

  // Client Logo Form Modal
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingLogoId, setEditingLogoId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientCategory, setClientCategory] = useState('');
  const [clientLogoUrl, setClientLogoUrl] = useState('');

  // Testimonial Form Modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTMId, setEditingTMId] = useState<string | null>(null);
  const [tmNameAr, setTmNameAr] = useState('');
  const [tmNameEn, setTmNameEn] = useState('');
  const [tmCompanyAr, setTmCompanyAr] = useState('');
  const [tmCompanyEn, setTmCompanyEn] = useState('');
  const [tmRoleAr, setTmRoleAr] = useState('');
  const [tmRoleEn, setTmRoleEn] = useState('');
  const [tmAvatar, setTmAvatar] = useState('');
  const [tmContentAr, setTmContentAr] = useState('');
  const [tmContentEn, setTmContentEn] = useState('');
  const [tmRating, setTmRating] = useState(5);
  const [tmServiceType, setTmServiceType] = useState<'security' | 'cleaning' | 'integrated'>('integrated');

  const openAddLogoModal = () => {
    setEditingLogoId(null);
    setClientName('');
    setClientCategory(lang === 'ar' ? 'قطاع تجاري' : 'Commercial');
    setClientLogoUrl('https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80');
    setIsLogoModalOpen(true);
  };

  const openEditLogoModal = (logo: ClientLogo) => {
    setEditingLogoId(logo.id);
    setClientName(logo.name);
    setClientCategory(logo.category);
    setClientLogoUrl(logo.logoUrl);
    setIsLogoModalOpen(true);
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientLogoUrl) return;

    if (editingLogoId) {
      updateClientLogo(editingLogoId, {
        name: clientName,
        category: clientCategory,
        logoUrl: clientLogoUrl,
      });
    } else {
      addClientLogo({
        id: `logo-${Date.now()}`,
        name: clientName,
        category: clientCategory || 'Enterprise',
        logoUrl: clientLogoUrl,
      });
    }
    setIsLogoModalOpen(false);
  };

  const openAddTestimonialModal = () => {
    setEditingTMId(null);
    setTmNameAr('');
    setTmNameEn('');
    setTmCompanyAr('');
    setTmCompanyEn('');
    setTmRoleAr('');
    setTmRoleEn('');
    setTmAvatar('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80');
    setTmContentAr('');
    setTmContentEn('');
    setTmRating(5);
    setTmServiceType('integrated');
    setIsTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (tm: Testimonial) => {
    setEditingTMId(tm.id);
    setTmNameAr(tm.nameAr);
    setTmNameEn(tm.nameEn);
    setTmCompanyAr(tm.companyAr);
    setTmCompanyEn(tm.companyEn);
    setTmRoleAr(tm.roleAr);
    setTmRoleEn(tm.roleEn);
    setTmAvatar(tm.avatar);
    setTmContentAr(tm.contentAr);
    setTmContentEn(tm.contentEn);
    setTmRating(tm.rating);
    setTmServiceType(tm.serviceType);
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tmNameAr || !tmContentAr) return;

    if (editingTMId) {
      updateTestimonial(editingTMId, {
        nameAr: tmNameAr,
        nameEn: tmNameEn || tmNameAr,
        companyAr: tmCompanyAr,
        companyEn: tmCompanyEn || tmCompanyAr,
        roleAr: tmRoleAr,
        roleEn: tmRoleEn || tmRoleAr,
        avatar: tmAvatar,
        contentAr: tmContentAr,
        contentEn: tmContentEn || tmContentAr,
        rating: Number(tmRating),
        serviceType: tmServiceType,
      });
    } else {
      addTestimonial({
        id: `tm-${Date.now()}`,
        nameAr: tmNameAr,
        nameEn: tmNameEn || tmNameAr,
        companyAr: tmCompanyAr || 'شركة عميلة',
        companyEn: tmCompanyEn || 'Client Enterprise',
        roleAr: tmRoleAr || 'مدير المرافق',
        roleEn: tmRoleEn || 'Facilities Director',
        avatar: tmAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        contentAr: tmContentAr,
        contentEn: tmContentEn || tmContentAr,
        rating: Number(tmRating),
        serviceType: tmServiceType,
      });
    }
    setIsTestimonialModalOpen(false);
  };

  return (
    <div className="space-y-8 text-slate-900 dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة شركاء النجاح وآراء العملاء (Partners & Reviews)' : 'Partners & Client Reviews Manager'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إدارة قائمة شعارات الشركات والمؤسسات الكبرى التي تثق بحارس ونقاء بالإضافة لآراء وتقييمات العملاء.'
              : 'Manage partner logos, corporate clients, and client testimonials featured across the site.'}
          </p>
        </div>

        {/* Sub-tab toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#112236] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveSubTab('logos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'logos'
                ? 'gold-gradient-bg text-[#0B1929]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'شعارات الشركات' : 'Client Logos'} ({clientLogos.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('testimonials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'testimonials'
                ? 'gold-gradient-bg text-[#0B1929]'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'آراء وتقييمات العملاء' : 'Testimonials'} ({testimonials.length})</span>
          </button>
        </div>
      </div>

      {/* LOGOS SUB-TAB */}
      {activeSubTab === 'logos' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'قائمة الشركات والشراكات الكبرى' : 'Partner Enterprise Logos'}
            </h3>
            <button
              onClick={openAddLogoModal}
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة شركة جديدة' : 'Add Partner Logo'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientLogos.map((logo) => (
              <div
                key={logo.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm hover:border-[#C9A961]/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shrink-0">
                    <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{logo.name}</h4>
                    <span className="text-[10px] text-[#C9A961] font-semibold">{logo.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditLogoModal(logo)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#C9A961]/20 text-slate-700 dark:text-slate-300 hover:text-[#C9A961] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteClientLogo(logo.id)}
                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TESTIMONIALS SUB-TAB */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {lang === 'ar' ? 'توصيات وآراء مسؤولي الشركات' : 'Client Endorsements & Quotes'}
            </h3>
            <button
              onClick={openAddTestimonialModal}
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة رأي جديد' : 'Add Testimonial'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((tm) => (
              <div
                key={tm.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(tm.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C9A961]/10 text-[#C9A961] border border-[#C9A961]/30">
                      {tm.serviceType === 'security'
                        ? lang === 'ar' ? 'حراسات أمنية' : 'Security'
                        : tm.serviceType === 'cleaning'
                        ? lang === 'ar' ? 'نظافة صناعية' : 'Sanitation'
                        : lang === 'ar' ? 'حلول متكاملة' : 'Integrated'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold italic">
                    "{lang === 'ar' ? tm.contentAr : tm.contentEn}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={tm.avatar} alt={tm.nameAr} className="w-10 h-10 rounded-full object-cover border border-[#C9A961]" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {lang === 'ar' ? tm.nameAr : tm.nameEn}
                      </h4>
                      <p className="text-[10px] text-[#C9A961] font-semibold">
                        {lang === 'ar' ? tm.roleAr : tm.roleEn} - {lang === 'ar' ? tm.companyAr : tm.companyEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditTestimonialModal(tm)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#C9A961]/20 text-slate-700 dark:text-slate-300 hover:text-[#C9A961] transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTestimonial(tm.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
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

      {/* LOGO MODAL */}
      {isLogoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl text-slate-900 dark:text-white">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold">
                {editingLogoId ? (lang === 'ar' ? 'تعديل شركة شريكة' : 'Edit Partner Logo') : (lang === 'ar' ? 'إضافة شركة شريكة جديدة' : 'Add New Partner')}
              </h3>
              <button onClick={() => setIsLogoModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLogo} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'اسم الشركة / المؤسسة' : 'Company Name'}</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Aramco Partners"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'تصنيف القطاع' : 'Industry Category'}</label>
                <input
                  type="text"
                  value={clientCategory}
                  onChange={(e) => setClientCategory(e.target.value)}
                  placeholder="e.g. Real Estate, Banking, Energy"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <ImageUploadInput
                label={lang === 'ar' ? 'شعار الشركة (صورة)' : 'Logo Image'}
                value={clientLogoUrl}
                onChange={setClientLogoUrl}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black"
                >
                  {lang === 'ar' ? 'حفظ الشريك' : 'Save Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL MODAL */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold">
                {editingTMId ? (lang === 'ar' ? 'تعديل رأي العميل' : 'Edit Testimonial') : (lang === 'ar' ? 'إضافة رأي عميل جديد' : 'Add Testimonial')}
              </h3>
              <button onClick={() => setIsTestimonialModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'اسم العميل (بالعربية) *' : 'Name (Arabic)'}</label>
                  <input
                    type="text"
                    required
                    value={tmNameAr}
                    onChange={(e) => setTmNameAr(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'اسم العميل (بالإنجليزية)' : 'Name (English)'}</label>
                  <input
                    type="text"
                    value={tmNameEn}
                    onChange={(e) => setTmNameEn(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'اسم الشركة / المؤسسة (بالعربية)' : 'Company Name (Arabic)'}</label>
                  <input
                    type="text"
                    value={tmCompanyAr}
                    onChange={(e) => setTmCompanyAr(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'اسم الشركة (بالإنجليزية)' : 'Company Name (English)'}</label>
                  <input
                    type="text"
                    value={tmCompanyEn}
                    onChange={(e) => setTmCompanyEn(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'المسمى الوظيفي (بالعربية)' : 'Role Title (Arabic)'}</label>
                  <input
                    type="text"
                    value={tmRoleAr}
                    onChange={(e) => setTmRoleAr(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'المسمى الوظيفي (بالإنجليزية)' : 'Role Title (English)'}</label>
                  <input
                    type="text"
                    value={tmRoleEn}
                    onChange={(e) => setTmRoleEn(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'محتوى التوصية والتقييم (بالعربية) *' : 'Quote Content (Arabic)'}</label>
                <textarea
                  required
                  rows={3}
                  value={tmContentAr}
                  onChange={(e) => setTmContentAr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">{lang === 'ar' ? 'محتوى التوصية والتقييم (بالإنجليزية)' : 'Quote Content (English)'}</label>
                <textarea
                  rows={3}
                  value={tmContentEn}
                  onChange={(e) => setTmContentEn(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 focus:border-[#C9A961] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'قطاع الخدمة' : 'Service Type'}</label>
                  <select
                    value={tmServiceType}
                    onChange={(e) => setTmServiceType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  >
                    <option value="security">{lang === 'ar' ? 'حراسات أمنية' : 'Security'}</option>
                    <option value="cleaning">{lang === 'ar' ? 'نظافة صناعية' : 'Sanitation'}</option>
                    <option value="integrated">{lang === 'ar' ? 'حلول متكاملة' : 'Integrated'}</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">{lang === 'ar' ? 'التقييم بالنجوم (1 - 5)' : 'Star Rating (1 - 5)'}</label>
                  <select
                    value={tmRating}
                    onChange={(e) => setTmRating(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:border-[#C9A961] focus:outline-none"
                  >
                    <option value={5}>5 نجوم ★★★★★</option>
                    <option value={4}>4 نجوم ★★★★☆</option>
                    <option value={3}>3 نجوم ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <ImageUploadInput
                label={lang === 'ar' ? 'صورة العميل الشخصية (Avatar)' : 'Client Avatar Image'}
                value={tmAvatar}
                onChange={setTmAvatar}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black"
                >
                  {lang === 'ar' ? 'حفظ التوصية' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
