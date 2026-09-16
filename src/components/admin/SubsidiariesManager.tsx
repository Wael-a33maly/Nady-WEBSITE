import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubsidiaryCompany, SubsidiaryCategory, DetailedSubsidiaryService } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Building2,
  Tag,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
  Camera,
  Image as ImageIcon,
  Award,
  Phone,
  Mail,
  MapPin,
  Globe,
  Layers,
  BarChart3,
  FileText,
  HelpCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { ImageUploadInput } from '../common/ImageUploadInput';

type FormTab = 'identity' | 'metrics' | 'overview' | 'services' | 'certifications' | 'gallery' | 'contact';

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
    settings,
  } = useApp();

  const [editingSub, setEditingSub] = useState<SubsidiaryCompany | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [newCatAr, setNewCatAr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [activeFormTab, setActiveFormTab] = useState<FormTab>('identity');

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
    servicesAr: ['حراسة أمنية متميزة', 'نظافة صناعية وتطهير'],
    servicesEn: ['Security Guarding', 'Industrial Sanitation'],
    detailedServices: [
      {
        id: 'srv-1',
        titleAr: 'حراسة أمنية متميزة',
        titleEn: 'Security Guarding',
        descAr: 'تطبيق أعلى معايير الجودة والسلامة مع توفير تقارير دورية وإشراف ميداني مستمر 24/7.',
        descEn: 'Adhering to strict safety, continuous 24/7 supervision and automated reporting.',
      },
      {
        id: 'srv-2',
        titleAr: 'نظافة صناعية وتطهير المنشآت',
        titleEn: 'Industrial Sanitation',
        descAr: 'برامج تعقيم وتطهير بأحدث المعدات الألمانية والمواد المعتمدة دولياً.',
        descEn: 'Sterilization and sanitation programs with certified equipment and materials.',
      },
    ],
    certificationsAr: ['مرخصة رسمياً من وزارة الداخلية - الأمن العام', 'شهادة ISO 9001 للجودة والسلامة المهنية'],
    certificationsEn: ['Licensed by Ministry of Interior', 'ISO 9001 Quality Certificate'],
    galleryImages: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80'],
    clientsCount: 50,
    projectsCount: 120,
    establishedYear: '2020',
    email: 'info@silverocean.sa',
    phone: '+966 11 000 0000',
    badgeAr: 'شركة تابعة',
    badgeEn: 'Subsidiary',

    // Full Dynamic Fields
    heroSubtitleAr: `إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة • إستقلالية تشغيلية كاملة`,
    heroSubtitleEn: `A Subsidiary of ${settings.logoTextEn || 'Silver Ocean'} Holding Group • Complete Operational Autonomy`,
    projectsLabelAr: 'مشروع مكتمل',
    projectsLabelEn: 'Completed Projects',
    clientsLabelAr: 'عميل استراتيجي',
    clientsLabelEn: 'Key Clients',
    establishedLabelAr: 'سنة التأسيس',
    establishedLabelEn: 'Established',
    complianceRate: '100%',
    complianceLabelAr: 'التزام بالمعايير',
    complianceLabelEn: 'Compliance',

    overviewTagAr: 'رؤيتنا ورسالتنا التشغيلية',
    overviewTagEn: 'Mission & Core Vision',
    overviewTitleAr: 'الريادة الميدانية والتميز الاحترافي في التنفيذ',
    overviewTitleEn: 'Field Leadership & Operational Precision',
    overviewImage: '',
    overviewNoteAr: 'تأسست بمواصفات قياسية واعتمادات رسمية',
    overviewNoteEn: 'Established with benchmark standards and official credentials',

    servicesTitleAr: 'الخدمات التخصصية للشركة',
    servicesTitleEn: 'Subsidiary Services Portfolio',
    servicesSubtitleAr: 'تقدم الشركة حلولاً تنفيذية شاملة ومصممة خصيصاً لتلبية احتياجات قطاع الأعمال والجهات الحكومية.',
    servicesSubtitleEn: 'Tailored solutions designed for enterprise and governmental standards.',

    certificationsTitleAr: 'التراخيص والشهادات المعتمدة',
    certificationsTitleEn: 'Official Certifications & Licensing',
    certificationsSubtitleAr: 'جميع أنشطة الشركة مرخصة رسمياً وخاضعة لرقابة واشتراطات الجهات المعنية.',
    certificationsSubtitleEn: 'Fully compliant and licensed by official regulatory authorities.',
    certificationsStatusAr: 'سارية المفعول ومحدثة',
    certificationsStatusEn: 'Active & Validated',

    galleryTitleAr: 'صور التجهيزات والأعمال الميدانية',
    galleryTitleEn: 'Field Operations Gallery',
    gallerySubtitleAr: 'لقطات حية من مواقع العمل والفرق الميدانية',
    gallerySubtitleEn: 'Live snapshots from project sites and specialized teams',

    addressAr: 'الرياض / المملكة العربية السعودية',
    addressEn: 'Riyadh, Kingdom of Saudi Arabia',
    quoteBadgeAr: 'تواصل مباشر مع الشركة',
    quoteBadgeEn: 'Direct Inquiry',
    quoteTitleAr: 'طلب عرض سعر مباشر من الشركة التابعة',
    quoteTitleEn: 'Submit Direct Request for Proposal',
    quoteSubtitleAr: 'سيتم توجيه طلبك مباشرة للفريق الهندسي والتشغيلي لهذه الشركة للرد خلال أقل من ساعة.',
    quoteSubtitleEn: 'Your inquiry will be routed directly to this subsidiary operational leads.',
    websiteUrl: '',
    footerNoteAr: `إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة`,
    footerNoteEn: `A Subsidiary of ${settings.logoTextEn || 'Silver Ocean'} Holding Group`,
  };

  const [formData, setFormData] = useState<SubsidiaryCompany>(emptySub);

  const handleOpenCreate = () => {
    setFormData({
      ...emptySub,
      id: `sub-${Date.now()}`,
    });
    setActiveFormTab('identity');
    setEditingSub(null);
    setIsCreating(true);
  };

  const handleOpenEdit = (sub: SubsidiaryCompany) => {
    // Ensure detailedServices is populated
    let detailed = sub.detailedServices;
    if (!detailed || detailed.length === 0) {
      detailed = (sub.servicesAr || []).map((srv, idx) => ({
        id: `srv-${idx}-${Date.now()}`,
        titleAr: srv,
        titleEn: (sub.servicesEn && sub.servicesEn[idx]) || srv,
        descAr: 'تطبيق أعلى معايير الجودة والسلامة مع توفير تقارير دورية وإشراف ميداني مستمر 24/7.',
        descEn: 'Adhering to strict safety, continuous 24/7 supervision and automated reporting.',
      }));
    }

    setFormData({
      ...emptySub,
      ...sub,
      detailedServices: detailed,
    });
    setActiveFormTab('identity');
    setEditingSub(sub);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Synchronize basic services arrays with detailedServices
    const updatedSub: SubsidiaryCompany = {
      ...formData,
      servicesAr: (formData.detailedServices || []).map((s) => s.titleAr || '').filter(Boolean),
      servicesEn: (formData.detailedServices || []).map((s) => s.titleEn || s.titleAr || '').filter(Boolean),
    };

    if (isCreating) {
      addSubsidiary(updatedSub);
    } else if (editingSub) {
      updateSubsidiary(editingSub.id, updatedSub);
    }
    setIsCreating(false);
    setEditingSub(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الشركة التابعة؟' : 'Are you sure you want to delete this subsidiary?')) {
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

  // Detailed services helpers
  const handleAddService = () => {
    const newService: DetailedSubsidiaryService = {
      id: `srv-${Date.now()}`,
      titleAr: '',
      titleEn: '',
      descAr: '',
      descEn: '',
    };
    setFormData((prev) => ({
      ...prev,
      detailedServices: [...(prev.detailedServices || []), newService],
    }));
  };

  const handleUpdateService = (idx: number, field: keyof DetailedSubsidiaryService, value: string) => {
    setFormData((prev) => {
      const list = [...(prev.detailedServices || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, detailedServices: list };
    });
  };

  const handleRemoveService = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      detailedServices: (prev.detailedServices || []).filter((_, i) => i !== idx),
    }));
  };

  // Certifications list helpers
  const handleAddCert = () => {
    setFormData((prev) => ({
      ...prev,
      certificationsAr: [...(prev.certificationsAr || []), ''],
      certificationsEn: [...(prev.certificationsEn || []), ''],
    }));
  };

  const handleUpdateCert = (idx: number, isAr: boolean, value: string) => {
    setFormData((prev) => {
      if (isAr) {
        const list = [...(prev.certificationsAr || [])];
        list[idx] = value;
        return { ...prev, certificationsAr: list };
      } else {
        const list = [...(prev.certificationsEn || [])];
        list[idx] = value;
        return { ...prev, certificationsEn: list };
      }
    });
  };

  const handleRemoveCert = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      certificationsAr: (prev.certificationsAr || []).filter((_, i) => i !== idx),
      certificationsEn: (prev.certificationsEn || []).filter((_, i) => i !== idx),
    }));
  };

  // Gallery images helpers
  const handleAddGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), ''],
    }));
  };

  const handleUpdateGalleryImage = (idx: number, url: string) => {
    setFormData((prev) => {
      const list = [...(prev.galleryImages || [])];
      list[idx] = url;
      return { ...prev, galleryImages: list };
    });
  };

  const handleRemoveGalleryImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== idx),
    }));
  };

  const tabs: { id: FormTab; labelAr: string; labelEn: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'identity', labelAr: 'الهوية والغلاف', labelEn: 'Identity & Hero', icon: Building2 },
    { id: 'metrics', labelAr: 'المؤشرات والأرقام', labelEn: 'Key Metrics', icon: BarChart3 },
    { id: 'overview', labelAr: 'النبذة والرؤية', labelEn: 'Overview & Mission', icon: FileText },
    { id: 'services', labelAr: 'الخدمات التخصصية', labelEn: 'Services', icon: Sparkles },
    { id: 'certifications', labelAr: 'التراخيص والاعتمادات', labelEn: 'Certifications', icon: Award },
    { id: 'gallery', labelAr: 'معرض الصور الميداني', labelEn: 'Gallery', icon: Camera },
    { id: 'contact', labelAr: 'التواصل والفوتر', labelEn: 'Contact & Footer', icon: Phone },
  ];

  return (
    <div id="subsidiaries-manager-root" className="space-y-8 text-slate-950 dark:text-white max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-black dark:text-white font-arabic">
            {lang === 'ar' ? 'إدارة الشركات التابعة والتصنيفات (Subsidiaries & Categories Manager)' : 'Subsidiaries & Categories Manager'}
          </h2>
          <p className="text-xs text-slate-800 dark:text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إدارة شاملة وديناميكية بنسبة 100%: كل كلمة وصورة وبيان يظهر في صفحة الشركة التابعة يتم إدخاله وتعديله من هنا.'
              : '100% Dynamic Management: Every text, metric, service, certification, image, and label on the subsidiary page is managed here.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCatModal(!showCatModal)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-black dark:border-slate-700 text-black dark:text-slate-200 hover:text-[#C9A961] dark:hover:text-[#C9A961] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Tag className="w-4 h-4 text-black dark:text-[#C9A961]" />
            <span>{lang === 'ar' ? 'إدارة تصنيفات الشركات' : 'Manage Categories'}</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md hover:brightness-110 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ar' ? 'إضافة شركة تابعة جديدة' : 'Add New Subsidiary'}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC CATEGORY MANAGER PANEL */}
      {showCatModal && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112236] border border-slate-300 dark:border-slate-800 space-y-4 shadow-sm text-slate-950 dark:text-white">
          <h3 className="text-base font-bold text-[#9E7B30] dark:text-[#C9A961] flex items-center gap-2">
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
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
            />
            <input
              type="text"
              placeholder={lang === 'ar' ? 'اسم التصنيف (إنجليزي)...' : 'Category Name (English)...'}
              value={newCatEn}
              onChange={(e) => setNewCatEn(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
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
              <div key={cat.id} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs flex items-center gap-2">
                <span className="font-bold text-slate-950 dark:text-slate-200">{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                {cat.id !== 'all' && (
                  <button
                    onClick={() => deleteSubsidiaryCategory(cat.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 ml-1"
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

      {/* FULL DYNAMIC SUBSIDIARY FORM (CREATE / EDIT) */}
      {(isCreating || editingSub) && (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#112236] border border-slate-300 dark:border-[#C9A961]/40 space-y-6 shadow-xl text-slate-950 dark:text-white">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C9A961]/20 text-[#9E7B30] dark:text-[#C9A961] text-[11px] font-bold">
                {isCreating ? (lang === 'ar' ? 'إنشاء شركة تابعة جديدة' : 'Create New Subsidiary') : (lang === 'ar' ? 'تعديل بيانات الشركة الشاملة' : 'Full Subsidiary Editor')}
              </span>
              <h3 className="text-xl font-black text-slate-950 dark:text-white mt-1">
                {isCreating
                  ? (lang === 'ar' ? 'إدخال كافة بيانات ومحتوى الشركة التابعة' : 'Define All Subsidiary Content')
                  : (lang === 'ar' ? `تعديل شركة: ${formData.nameAr || editingSub?.nameAr}` : `Edit: ${formData.nameEn || editingSub?.nameEn}`)}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingSub(null); }}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Tabs Navigation Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeFormTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFormTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive
                      ? 'gold-gradient-bg text-[#0B1929] shadow-md font-black'
                      : 'bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{lang === 'ar' ? tab.labelAr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: IDENTITY & HERO */}
          {activeFormTab === 'identity' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'اسم الشركة (عربي) *' : 'Subsidiary Name (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder="مثال: شركة نقاء الأولى للحراسات الأمنية"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'اسم الشركة (إنجليزي) *' : 'Subsidiary Name (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder="e.g. Niqaa First Security Services"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'الشعار اللفظي / Tagline (عربي)' : 'Tagline (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.taglineAr}
                    onChange={(e) => setFormData({ ...formData, taglineAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder="مثال: الحماية المتكاملة واليقظة الميدانية المستمرة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'الشعار اللفظي / Tagline (إنجليزي)' : 'Tagline (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.taglineEn}
                    onChange={(e) => setFormData({ ...formData, taglineEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder="e.g. Comprehensive Protection & Operational Vigilance"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'عبارة التبعية في الهيدر (عربي)' : 'Hero Affiliation Text (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, heroSubtitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder={`إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة • إستقلالية تشغيلية كاملة`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'عبارة التبعية في الهيدر (إنجليزي)' : 'Hero Affiliation Text (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.heroSubtitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, heroSubtitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white placeholder:text-slate-500 focus:border-[#C9A961] focus:outline-none"
                    placeholder={`A Subsidiary of ${settings.logoTextEn || 'Silver Ocean'} Holding Group • Complete Operational Autonomy`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'التصنيف المخصص (Dynamic Category)' : 'Dynamic Category'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white focus:border-[#C9A961] focus:outline-none"
                  >
                    {subsidiaryCategories.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {lang === 'ar' ? cat.nameAr : cat.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">
                    {lang === 'ar' ? 'شارة الشركة (عربي / إنجليزي)' : 'Badge Labels (Arabic / English)'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.badgeAr || ''}
                      onChange={(e) => setFormData({ ...formData, badgeAr: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white text-xs"
                      placeholder="شركة تابعة"
                    />
                    <input
                      type="text"
                      value={formData.badgeEn || ''}
                      onChange={(e) => setFormData({ ...formData, badgeEn: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white text-xs"
                      placeholder="Subsidiary"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadInput
                    label={lang === 'ar' ? 'شعار الشركة التابعة (Logo Image)' : 'Subsidiary Logo Image'}
                    value={formData.logoUrl}
                    onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                    helpText={lang === 'ar' ? 'يمكنك رفع صورة الشعار من جهازك أو وضع رابط خارجي' : 'Upload logo image or paste URL'}
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadInput
                    label={lang === 'ar' ? 'صورة الغلاف الرئيسية (Hero Banner Image)' : 'Hero Banner Image'}
                    value={formData.heroImage || ''}
                    onChange={(url) => setFormData({ ...formData, heroImage: url })}
                    helpText={lang === 'ar' ? 'الصورة الكبيرة في خلفية واجهة صفحة الشركة التابعة' : 'Hero background banner for subsidiary microsite'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: METRICS & STATS */}
          {activeFormTab === 'metrics' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {lang === 'ar' ? 'تخصيص الأرقام ونصوص البطاقات الأربعة في شريط الإحصائيات السريع بأعلى الصفحة:' : 'Configure numbers and labels for the 4 quick metrics cards:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* 1. Projects */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-[#9E7B30] dark:text-[#C9A961] block">١. عدد المشاريع المنجزة</span>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-800 dark:text-slate-300">الرقم / القيمة (مثال: 120)</label>
                    <input
                      type="number"
                      value={formData.projectsCount}
                      onChange={(e) => setFormData({ ...formData, projectsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (عربي)</label>
                      <input
                        type="text"
                        value={formData.projectsLabelAr || ''}
                        onChange={(e) => setFormData({ ...formData, projectsLabelAr: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="مشروع مكتمل"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (إنجليزي)</label>
                      <input
                        type="text"
                        value={formData.projectsLabelEn || ''}
                        onChange={(e) => setFormData({ ...formData, projectsLabelEn: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="Completed Projects"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Clients */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-[#9E7B30] dark:text-[#C9A961] block">٢. عدد العملاء الاستراتيجيين</span>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-800 dark:text-slate-300">الرقم / القيمة (مثال: 50)</label>
                    <input
                      type="number"
                      value={formData.clientsCount}
                      onChange={(e) => setFormData({ ...formData, clientsCount: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (عربي)</label>
                      <input
                        type="text"
                        value={formData.clientsLabelAr || ''}
                        onChange={(e) => setFormData({ ...formData, clientsLabelAr: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="عميل استراتيجي"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (إنجليزي)</label>
                      <input
                        type="text"
                        value={formData.clientsLabelEn || ''}
                        onChange={(e) => setFormData({ ...formData, clientsLabelEn: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="Key Clients"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Established Year */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-[#9E7B30] dark:text-[#C9A961] block">٣. سنة التأسيس والخبرة</span>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-800 dark:text-slate-300">سنة التأسيس (مثال: 2020)</label>
                    <input
                      type="text"
                      value={formData.establishedYear}
                      onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (عربي)</label>
                      <input
                        type="text"
                        value={formData.establishedLabelAr || ''}
                        onChange={(e) => setFormData({ ...formData, establishedLabelAr: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="سنة التأسيس"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (إنجليزي)</label>
                      <input
                        type="text"
                        value={formData.establishedLabelEn || ''}
                        onChange={(e) => setFormData({ ...formData, establishedLabelEn: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="Established"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Compliance */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-[#9E7B30] dark:text-[#C9A961] block">٤. نسبة الالتزام بالمعايير</span>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-800 dark:text-slate-300">النسبة (مثال: 100%)</label>
                    <input
                      type="text"
                      value={formData.complianceRate || ''}
                      onChange={(e) => setFormData({ ...formData, complianceRate: e.target.value })}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                      placeholder="100%"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (عربي)</label>
                      <input
                        type="text"
                        value={formData.complianceLabelAr || ''}
                        onChange={(e) => setFormData({ ...formData, complianceLabelAr: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="التزام بالمعايير"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-[11px] font-semibold text-slate-700 dark:text-slate-400">النص (إنجليزي)</label>
                      <input
                        type="text"
                        value={formData.complianceLabelEn || ''}
                        onChange={(e) => setFormData({ ...formData, complianceLabelEn: e.target.value })}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                        placeholder="Compliance"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OVERVIEW & MISSION */}
          {activeFormTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة القسم (عربي)</label>
                  <input
                    type="text"
                    value={formData.overviewTagAr || ''}
                    onChange={(e) => setFormData({ ...formData, overviewTagAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="رؤيتنا ورسالتنا التشغيلية"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة القسم (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.overviewTagEn || ''}
                    onChange={(e) => setFormData({ ...formData, overviewTagEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Mission & Core Vision"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم النظرة العامة (عربي)</label>
                  <input
                    type="text"
                    value={formData.overviewTitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, overviewTitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="الريادة الميدانية والتميز الاحترافي في التنفيذ"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم النظرة العامة (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.overviewTitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, overviewTitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Field Leadership & Operational Precision"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف العام الرئيسي (عربي)</label>
                  <textarea
                    rows={2}
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-950 dark:text-white"
                    placeholder="نبذة عامة تظهر في الهيرو ومقدمة النظرة العامة..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف العام الرئيسي (إنجليزي)</label>
                  <textarea
                    rows={2}
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-950 dark:text-white"
                    placeholder="General description in English..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الرسالة والرؤية الميدانية المفصلة (عربي)</label>
                  <textarea
                    rows={3}
                    value={formData.detailedMissionAr || ''}
                    onChange={(e) => setFormData({ ...formData, detailedMissionAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-950 dark:text-white"
                    placeholder="شرح أهداف الشركة، منهجية العمل، والريادة في قطاعها..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الرسالة والرؤية الميدانية المفصلة (إنجليزي)</label>
                  <textarea
                    rows={3}
                    value={formData.detailedMissionEn || ''}
                    onChange={(e) => setFormData({ ...formData, detailedMissionEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-950 dark:text-white"
                    placeholder="Detailed operational mission in English..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploadInput
                    label={lang === 'ar' ? 'صورة النظرة العامة المميزة (Overview Image)' : 'Overview Showcase Image'}
                    value={formData.overviewImage || ''}
                    onChange={(url) => setFormData({ ...formData, overviewImage: url })}
                    helpText={lang === 'ar' ? 'الصورة التي تظهر بجانب نص الرؤية (إن تركت فارغة سيتم استخدام صورة الهيرو)' : 'Image displayed beside mission section'}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">نص البطاقة فوق الصورة (عربي)</label>
                  <input
                    type="text"
                    value={formData.overviewNoteAr || ''}
                    onChange={(e) => setFormData({ ...formData, overviewNoteAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="تأسست بمواصفات قياسية واعتمادات رسمية"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">نص البطاقة فوق الصورة (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.overviewNoteEn || ''}
                    onChange={(e) => setFormData({ ...formData, overviewNoteEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Established with benchmark standards"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES PORTFOLIO */}
          {activeFormTab === 'services' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم الخدمات (عربي)</label>
                  <input
                    type="text"
                    value={formData.servicesTitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, servicesTitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="الخدمات التخصصية للشركة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم الخدمات (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.servicesTitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, servicesTitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Subsidiary Services Portfolio"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف التمهيدي لقسم الخدمات (عربي)</label>
                  <input
                    type="text"
                    value={formData.servicesSubtitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, servicesSubtitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف التمهيدي لقسم الخدمات (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.servicesSubtitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, servicesSubtitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Detailed Services Cards List */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C9A961]" />
                    <span>{lang === 'ar' ? 'بطاقات الخدمات التخصصية الفردية' : 'Individual Specialized Services'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة خدمة جديدة' : 'Add Service'}</span>
                  </button>
                </div>

                {(formData.detailedServices || []).map((srv, idx) => (
                  <div key={srv.id || idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg gold-gradient-bg text-[#0B1929] font-black text-xs flex items-center justify-center shadow-xs">
                        0{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'حذف هذه الخدمة' : 'Delete'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block mb-1 font-semibold text-slate-800 dark:text-slate-300">عنوان الخدمة (عربي) *</label>
                        <input
                          type="text"
                          required
                          value={srv.titleAr}
                          onChange={(e) => handleUpdateService(idx, 'titleAr', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                          placeholder="مثال: الحراسة الثابتة وتأمين البوابات"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold text-slate-800 dark:text-slate-300">عنوان الخدمة (إنجليزي)</label>
                        <input
                          type="text"
                          value={srv.titleEn}
                          onChange={(e) => handleUpdateService(idx, 'titleEn', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                          placeholder="e.g. Static Guarding & Gate Security"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-1 font-semibold text-slate-800 dark:text-slate-300">تفاصيل وشرح الخدمة (عربي)</label>
                        <textarea
                          rows={2}
                          value={srv.descAr || ''}
                          onChange={(e) => handleUpdateService(idx, 'descAr', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                          placeholder="شرح متطلبات الخدمة وآلية تنفيذها وأعلى معايير السلامة المتبعة..."
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-1 font-semibold text-slate-800 dark:text-slate-300">تفاصيل وشرح الخدمة (إنجليزي)</label>
                        <textarea
                          rows={2}
                          value={srv.descEn || ''}
                          onChange={(e) => handleUpdateService(idx, 'descEn', e.target.value)}
                          className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-950 dark:text-white"
                          placeholder="Service execution details, supervision and standards..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS */}
          {activeFormTab === 'certifications' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم التراخيص (عربي)</label>
                  <input
                    type="text"
                    value={formData.certificationsTitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, certificationsTitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="التراخيص والشهادات المعتمدة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان قسم التراخيص (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.certificationsTitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, certificationsTitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Official Certifications & Licensing"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة حالة التراخيص (عربي)</label>
                  <input
                    type="text"
                    value={formData.certificationsStatusAr || ''}
                    onChange={(e) => setFormData({ ...formData, certificationsStatusAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="سارية المفعول ومحدثة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة حالة التراخيص (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.certificationsStatusEn || ''}
                    onChange={(e) => setFormData({ ...formData, certificationsStatusEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Active & Validated"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف التمهيدي للتراخيص (عربي)</label>
                  <input
                    type="text"
                    value={formData.certificationsSubtitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, certificationsSubtitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Certifications Items List */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A961]" />
                    <span>{lang === 'ar' ? 'قائمة الشهادات والتراخيص الرسمية المعتمدة' : 'Official Certifications List'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة ترخيص/شهادة' : 'Add Certification'}</span>
                  </button>
                </div>

                {(formData.certificationsAr || []).map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-[#C9A961]/20 text-[#C9A961] flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => handleUpdateCert(idx, true, e.target.value)}
                      className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-950 dark:text-white"
                      placeholder="اسم الترخيص أو الشهادة بالعربي..."
                    />
                    <input
                      type="text"
                      value={(formData.certificationsEn && formData.certificationsEn[idx]) || ''}
                      onChange={(e) => handleUpdateCert(idx, false, e.target.value)}
                      className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-950 dark:text-white"
                      placeholder="Certification name in English..."
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCert(idx)}
                      className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FIELD GALLERY */}
          {activeFormTab === 'gallery' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان معرض الصور (عربي)</label>
                  <input
                    type="text"
                    value={formData.galleryTitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, galleryTitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="صور التجهيزات والأعمال الميدانية"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان معرض الصور (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.galleryTitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, galleryTitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Field Operations Gallery"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الوصف الفرعي لمعرض الصور (عربي)</label>
                  <input
                    type="text"
                    value={formData.gallerySubtitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, gallerySubtitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Gallery Images List */}
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#C9A961]" />
                    <span>{lang === 'ar' ? 'صور الأعمال والميدان الخاصة بهذه الشركة' : 'Field Images Portfolio'}</span>
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#0B1929] font-bold text-xs flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'إضافة صورة جديدة' : 'Add Image'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(formData.galleryImages || []).map((imgUrl, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-300">الصورة #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      </div>

                      <ImageUploadInput
                        label={lang === 'ar' ? `رابط أو رفع الصورة #${idx + 1}` : `Image #${idx + 1}`}
                        value={imgUrl}
                        onChange={(url) => handleUpdateGalleryImage(idx, url)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT, RFQ & FOOTER */}
          {activeFormTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة نموذج عرض السعر (عربي)</label>
                  <input
                    type="text"
                    value={formData.quoteBadgeAr || ''}
                    onChange={(e) => setFormData({ ...formData, quoteBadgeAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="تواصل مباشر مع الشركة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">شارة نموذج عرض السعر (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.quoteBadgeEn || ''}
                    onChange={(e) => setFormData({ ...formData, quoteBadgeEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Direct Inquiry"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان نموذج عرض السعر (عربي)</label>
                  <input
                    type="text"
                    value={formData.quoteTitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, quoteTitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="طلب عرض سعر مباشر من الشركة التابعة"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">عنوان نموذج عرض السعر (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.quoteTitleEn || ''}
                    onChange={(e) => setFormData({ ...formData, quoteTitleEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Submit Direct Request for Proposal"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">النص التوضيحي للنموذج (عربي)</label>
                  <input
                    type="text"
                    value={formData.quoteSubtitleAr || ''}
                    onChange={(e) => setFormData({ ...formData, quoteSubtitleAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="سيتم توجيه طلبك مباشرة للفريق الهندسي والتشغيلي لهذه الشركة للرد خلال أقل من ساعة."
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">هاتف التواصل المباشر (Phone)</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="+966 11 000 0000"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">البريد الإلكتروني للشركة (Email)</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="company@silverocean.sa"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">العنوان والمقر (عربي)</label>
                  <input
                    type="text"
                    value={formData.addressAr || ''}
                    onChange={(e) => setFormData({ ...formData, addressAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="الرياض / المملكة العربية السعودية"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">العنوان والمقر (إنجليزي)</label>
                  <input
                    type="text"
                    value={formData.addressEn || ''}
                    onChange={(e) => setFormData({ ...formData, addressEn: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="Riyadh, Saudi Arabia"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">الموقع الإلكتروني الخارجي (اختياري)</label>
                  <input
                    type="url"
                    value={formData.websiteUrl || ''}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder="https://subsidiary.silverocean.sa"
                    dir="ltr"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 font-bold text-slate-950 dark:text-slate-200">نص التذييل / الفوتر أسفل الصفحة (عربي)</label>
                  <input
                    type="text"
                    value={formData.footerNoteAr || ''}
                    onChange={(e) => setFormData({ ...formData, footerNoteAr: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-950 dark:text-white"
                    placeholder={`إحدى شركات مجموعة ${settings.logoTextAr || 'المحيط الفضي'} القابضة`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Action Controls */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {activeFormTab !== 'identity' && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = tabs.findIndex((t) => t.id === activeFormTab);
                    if (idx > 0) setActiveFormTab(tabs[idx - 1].id);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-0 rotate-180" />
                  <span>{lang === 'ar' ? 'السابق' : 'Previous'}</span>
                </button>
              )}

              {activeFormTab !== 'contact' && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = tabs.findIndex((t) => t.id === activeFormTab);
                    if (idx < tabs.length - 1) setActiveFormTab(tabs[idx + 1].id);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'التالي' : 'Next'}</span>
                  <ChevronLeft className="w-4 h-4 rtl:rotate-0 rotate-180" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingSub(null); }}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl gold-gradient-bg text-[#0B1929] font-black text-xs flex items-center gap-2 shadow-lg hover:brightness-110 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حفظ كافة بيانات ومحتوى الشركة' : 'Save All Subsidiary Data'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Grid List of Subsidiaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subsidiaries.map((sub) => (
          <div key={sub.id} className="p-6 rounded-3xl bg-white dark:bg-[#112236] border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#C9A961]/50 transition-all text-slate-950 dark:text-white">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img src={sub.logoUrl} alt={sub.nameAr} className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900" />
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#C9A961]/15 text-[#9E7B30] dark:text-[#C9A961] text-[10px] font-bold">
                      {sub.badgeAr || 'شركة تابعة'}
                    </span>
                    <h4 className="text-base font-bold text-slate-950 dark:text-white mt-0.5">
                      {lang === 'ar' ? sub.nameAr : sub.nameEn}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(sub)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:text-[#C9A961] dark:hover:text-[#C9A961] border border-slate-300 dark:border-slate-700 cursor-pointer"
                    title={lang === 'ar' ? 'تعديل كافة بيانات ومحتوى الشركة' : 'Edit Full Subsidiary'}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-red-950/40 text-rose-700 dark:text-red-400 hover:text-rose-900 dark:hover:text-red-300 border border-rose-200 dark:border-red-900/50 cursor-pointer"
                    title={lang === 'ar' ? 'حذف الشركة' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#9E7B30] dark:text-[#C9A961] font-bold">{lang === 'ar' ? sub.taglineAr : sub.taglineEn}</p>
              <p className="text-xs text-slate-800 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">{lang === 'ar' ? sub.descriptionAr : sub.descriptionEn}</p>

              {/* Badges preview of dynamic capabilities */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                  {sub.detailedServices?.length || sub.servicesAr?.length || 0} {lang === 'ar' ? 'خدمات تخصصية' : 'Services'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                  {sub.certificationsAr?.length || 0} {lang === 'ar' ? 'تراخيص معتمدة' : 'Certifications'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                  {sub.galleryImages?.length || 0} {lang === 'ar' ? 'صور ميدانية' : 'Photos'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-semibold flex items-center justify-between">
              <span>{sub.establishedLabelAr || 'تأسست'}: {sub.establishedYear}</span>
              <span>+{sub.projectsCount} {sub.projectsLabelAr || 'مشروع'}</span>
              <span className="font-mono" dir="ltr">{sub.email || sub.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
