import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientLogo, Testimonial } from '../../types';
import {
  Plus,
  Trash2,
  Edit2,
  Shield,
  Star,
  CheckCircle2,
  Quote,
  Building2,
  Image as ImageIcon,
  X,
  Sliders,
  Activity,
  LayoutGrid,
  Info,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

export interface PartnersManagerProps {
  initialSubTab?: 'logos' | 'testimonials';
}

export const PartnersManager: React.FC<PartnersManagerProps> = ({ initialSubTab = 'logos' }) => {
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
    settings,
    updateSettings,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'logos' | 'testimonials'>(initialSubTab);

  // Sync if initialSubTab prop changes
  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

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
            {activeSubTab === 'testimonials'
              ? (lang === 'ar' ? 'إدارة آراء وتقييمات العملاء (Client Testimonials)' : 'Client Testimonials & Reviews Manager')
              : (lang === 'ar' ? 'إدارة شركاء النجاح وشعارات الشركات (Partners & Clients)' : 'Partners & Corporate Clients Manager')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {activeSubTab === 'testimonials'
              ? (lang === 'ar'
                  ? 'إدارة التوصيات والآراء المعتمدة لمسؤولي وممثلي الشركات والمؤسسات التي تظهر على الموقع.'
                  : 'Manage corporate testimonials and client endorsements displayed on the website.')
              : (lang === 'ar'
                  ? `إدارة قائمة شعارات الشركات والمؤسسات الكبرى التي تثق بـ ${settings.logoTextAr || 'المحيط الفضي'}.`
                  : 'Manage partner logos and corporate clients featured across the site.')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Add Button based on active sub tab */}
          {activeSubTab === 'testimonials' ? (
            <button
              onClick={openAddTestimonialModal}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة رأي جديد' : 'Add Testimonial'}</span>
            </button>
          ) : (
            <button
              onClick={openAddLogoModal}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إضافة شريك جديد' : 'Add Partner'}</span>
            </button>
          )}

          {/* Sub-tab toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#112236] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveSubTab('logos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
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
      </div>

      {/* LOGOS SUB-TAB */}
      {activeSubTab === 'logos' && (
        <div className="space-y-6">
          {/* Homepage Display Mode Configuration Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#C9A961]" />
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'طريقة عرض شركاء النجاح في شاشة الموقع الرئيسية' : 'Homepage Partner Cards Display Layout'}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {lang === 'ar'
                    ? 'حدد طريقة ظهور كروت الشركات لزوار الواجهة الرئيسية (يتم تطبيق التغيير فورياً على الموقع دون ظهور أزرار التبديل للزوار).'
                    : 'Choose how corporate partner cards appear to public visitors on the homepage (changes apply instantly without public switcher controls).'}
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C9A961]/15 text-[#C9A961] border border-[#C9A961]/30 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ar'
                    ? (settings.clientDisplayMode === 'grid' ? 'الوضع المطبق حالياً: شبكة الشركاء' : 'الوضع المطبق حالياً: شريط متحرك مستمر')
                    : (settings.clientDisplayMode === 'grid' ? 'Active: Partner Grid' : 'Active: Continuous Flow')}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Option 1: Marquee */}
              <button
                type="button"
                onClick={() => updateSettings({ clientDisplayMode: 'marquee' })}
                className={`p-4 rounded-xl border-2 text-start transition-all cursor-pointer flex items-start gap-3.5 ${
                  (settings.clientDisplayMode || 'marquee') === 'marquee'
                    ? 'border-[#C9A961] bg-amber-500/5 dark:bg-[#0E1D30] shadow-md shadow-[#C9A961]/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1827]/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    (settings.clientDisplayMode || 'marquee') === 'marquee'
                      ? 'bg-[#C9A961] text-[#0B1929]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'شريط متحرك مستمر' : 'Continuous Marquee Flow'}
                    </h5>
                    {(settings.clientDisplayMode || 'marquee') === 'marquee' && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#C9A961] text-[#0B1929]">
                        {lang === 'ar' ? 'مفعّل' : 'Active'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {lang === 'ar'
                      ? 'كروت عريضة وفخمة تتحرك في شريط سينمائي انسيابي لا نهائي مع توقف سلس عند تمرير مؤشر الفأرة.'
                      : 'Continuous infinite horizontal flow with automatic pause when hovering over any card.'}
                  </p>
                </div>
              </button>

              {/* Option 2: Grid */}
              <button
                type="button"
                onClick={() => updateSettings({ clientDisplayMode: 'grid' })}
                className={`p-4 rounded-xl border-2 text-start transition-all cursor-pointer flex items-start gap-3.5 ${
                  settings.clientDisplayMode === 'grid'
                    ? 'border-[#C9A961] bg-amber-500/5 dark:bg-[#0E1D30] shadow-md shadow-[#C9A961]/10'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0c1827]/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    settings.clientDisplayMode === 'grid'
                      ? 'bg-[#C9A961] text-[#0B1929]'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'شبكة الشركاء' : 'Partner Grid View'}
                    </h5>
                    {settings.clientDisplayMode === 'grid' && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-[#C9A961] text-[#0B1929]">
                        {lang === 'ar' ? 'مفعّل' : 'Active'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {lang === 'ar'
                      ? 'توزيع كروت الشركات في شبكة أعمدة ثابتة ومتناسقة تتيح معاينة جميع الشركاء دفعة واحدة.'
                      : 'Structured responsive multi-column grid displaying all corporate clients at once.'}
                  </p>
                </div>
              </button>
            </div>
          </div>

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
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl p-1.5 overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center">
                    <img src={logo.logoUrl} alt={logo.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{logo.name}</h4>
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
          {/* Testimonials Workflow & Guidance Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/5 dark:bg-[#0E1D30] border border-[#C9A961]/30 space-y-3">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#C9A961]/15 text-[#C9A961] shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{lang === 'ar' ? 'كيفية تسجيل وإدارة آراء وتقييمات العملاء:' : 'How Testimonials & Reviews are Registered:'}</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar' ? (
                    <>
                      <strong>التسجيل يتم بالكامل وحصرياً من خلال لوحة التحكم (هنا):</strong> نظراً لأن خدمات الحراسات الأمنية والنظافة موجهة لشركات وجهات كبرى ومصارف (B2B Enterprise)، لا يوجد نموذج عشوائي في الواجهة الخارجية لتجنب التعليقات غير الموثوقة. يتم إدخال التوصيات الرسمية المعتمدة من مسؤولي تلك الشركات عبر زر <span className="text-[#C9A961] font-bold">"إضافة رأي جديد"</span> الموضح بالأعلى وأدناه. يمكنك إدخال اسم العميل، مسمى منصبه، اسم الشركة، نوع الخدمة، التقييم بالنجوم، ونص الرأي باللغتين العربية والإنجليزية.
                    </>
                  ) : (
                    <>
                      <strong>Exclusively managed via the Admin Dashboard:</strong> For B2B corporate security and sanitation, official client testimonials from enterprise directors are curated and entered directly using the <span className="text-[#C9A961] font-bold">"Add Testimonial"</span> button below and above to ensure verified endorsements.
                    </>
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {lang === 'ar' ? 'اعتماد ونشر فوري على الموقع' : 'Instant live publishing'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {lang === 'ar' ? 'تعديل أو حذف مرن في أي وقت' : 'Full edit/delete control'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {lang === 'ar' ? 'دعم صور ومسميات مدراء الشركات' : 'Supports executive avatars & corporate titles'}
                  </span>
                </div>
              </div>
            </div>
          </div>

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

          {testimonials.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#112236] border border-dashed border-slate-300 dark:border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C9A961]/10 text-[#C9A961] flex items-center justify-center mx-auto">
                <Quote className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'لا توجد آراء أو توصيات مضافة حتى الآن' : 'No testimonials added yet'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'أضف أول تقييم رسمي معتمد لأحد مسؤولي الشركات لعرضه فورياً في الواجهة الرئيسية للموقع.'
                    : 'Add the first official client endorsement to feature on the homepage.'}
                </p>
              </div>
              <button
                onClick={openAddTestimonialModal}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md hover:brightness-105 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إضافة رأي جديد' : 'Add Testimonial'}</span>
              </button>
            </div>
          ) : (
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
          )}
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
