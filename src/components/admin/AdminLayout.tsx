import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../ui/BrandLogo';
import { AdminDashboard } from './AdminDashboard';
import { LogoManager } from './LogoManager';
import { SubsidiariesManager } from './SubsidiariesManager';
import { CategoriesManager } from './CategoriesManager';
import { ServicesManager } from './ServicesManager';
import { ProjectsManager } from './ProjectsManager';
import { CareersManager } from './CareersManager';
import { QuotesManager } from './QuotesManager';
import { InquiriesManager } from './InquiriesManager';
import { SettingsManager } from './SettingsManager';
import { WhyUsManager } from './WhyUsManager';
import { PartnersManager } from './PartnersManager';
import { TeamManager } from './TeamManager';
import {
  LayoutDashboard,
  Upload,
  FileText,
  MessageSquare,
  Layers,
  Settings,
  ShieldCheck,
  Menu,
  X,
  Building2,
  Tag,
  Sun,
  Moon,
  Briefcase,
  Sparkles,
  Building,
  Award,
  Users,
  Handshake,
  Globe,
  ExternalLink,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { lang, setLang, quotes, inquiries, jobApplications, theme, toggleTheme, logoutAdmin } = useApp();

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleLogout = () => {
    logoutAdmin();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'subsidiaries'
    | 'categories'
    | 'whyUs'
    | 'partners'
    | 'services'
    | 'projects'
    | 'team'
    | 'careers'
    | 'logo'
    | 'quotes'
    | 'inquiries'
    | 'settings'
  >('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const newQuotesBadge = quotes.filter((q) => q.status === 'new').length;
  const unreadInquiriesBadge = inquiries.filter((i) => i.status === 'unread').length;
  const newApplicationsBadge = jobApplications.filter((a) => a.status === 'new').length;

  const navItems = [
    {
      id: 'dashboard',
      labelAr: 'لوحة التحليلات',
      labelEn: 'Analytics Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'subsidiaries',
      labelAr: 'شركات المجموعة واللوجوهات',
      labelEn: 'Subsidiaries & Logos',
      icon: Building2,
      badge: lang === 'ar' ? 'المجموعة' : 'Subsidiaries',
    },
    {
      id: 'categories',
      labelAr: 'تصنيفات الشركات الديناميكية',
      labelEn: 'Dynamic Categories Manager',
      icon: Tag,
      badge: lang === 'ar' ? 'تصنيفات' : 'Categories',
    },
    {
      id: 'whyUs',
      labelAr: 'لماذا نحن (معايير حارس ونقاء)',
      labelEn: 'Why Choose Us Pillars',
      icon: Award,
    },
    {
      id: 'partners',
      labelAr: 'شركاء النجاح وآراء العملاء',
      labelEn: 'Partners & Client Reviews',
      icon: Handshake,
    },
    {
      id: 'services',
      labelAr: 'إدارة الخدمات الميدانية',
      labelEn: 'Services Manager',
      icon: Sparkles,
    },
    {
      id: 'projects',
      labelAr: 'سابقة الأعمال والمشاريع',
      labelEn: 'Projects & Case Studies',
      icon: Building,
    },
    {
      id: 'team',
      labelAr: 'فريق العمل القيادي',
      labelEn: 'Leadership Team',
      icon: Users,
    },
    {
      id: 'careers',
      labelAr: 'طلبات التوظيف والوظائف',
      labelEn: 'Careers & Job Applications',
      icon: Briefcase,
      count: newApplicationsBadge,
    },
    {
      id: 'quotes',
      labelAr: 'طلبات عروض الأسعار',
      labelEn: 'Quotes & Proposals',
      icon: FileText,
      count: newQuotesBadge,
    },
    {
      id: 'inquiries',
      labelAr: 'رسائل الاستفسارات',
      labelEn: 'Contact Inquiries',
      icon: MessageSquare,
      count: unreadInquiriesBadge,
    },
    {
      id: 'logo',
      labelAr: 'إدارة الهوية والشعار',
      labelEn: 'Logo & Brand Identity',
      icon: Upload,
    },
    {
      id: 'settings',
      labelAr: 'الإعدادات والوضع الليلي/النهاري',
      labelEn: 'Settings & Theme Options',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#08121f] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row relative transition-colors duration-300">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0B1929] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <BrandLogo />
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 ${
          lang === 'ar' ? 'right-0' : 'left-0'
        } z-50 w-72 bg-white dark:bg-[#0B1929] border-e border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 shadow-lg md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'
        }`}
      >
        <div className="p-5 space-y-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <BrandLogo />
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase font-mono">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'gold-gradient-bg text-[#0B1929] shadow-lg shadow-[#C9A961]/20 font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B1929]' : 'text-[#C9A961]'}`} />
                    <span>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold uppercase">
                      {item.badge}
                    </span>
                  )}

                  {item.count && item.count > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                      {item.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto min-h-screen">
        {/* Top Header Bar when not on Analytics Dashboard (so Language, Theme, View Site, Logout are always accessible in the header) */}
        {activeTab !== 'dashboard' && (
          <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className="px-3 py-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>{lang === 'ar' ? 'العودة للوحة القيادة' : 'Back to Dashboard'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switch */}
              <button
                type="button"
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-[#112236] hover:bg-slate-50 dark:hover:bg-[#162b45] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#C9A961] dark:hover:text-[#C9A961] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-[#112236] hover:bg-slate-50 dark:hover:bg-[#162b45] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#C9A961] dark:hover:text-[#C9A961] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title={theme === 'dark' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ar' ? 'نهار' : 'Light'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'ليل' : 'Dark'}</span>
                  </>
                )}
              </button>

              {/* View Front-End Site */}
              <a
                href="/"
                onClick={navigateToHome}
                className="py-1.5 px-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-[#112236] dark:hover:bg-[#162b45] border border-slate-200 dark:border-slate-800 hover:border-[#C9A961] text-slate-700 dark:text-slate-200 hover:text-[#C9A961] dark:hover:text-[#C9A961] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C9A961]" />
                <span className="hidden sm:inline">{lang === 'ar' ? 'عرض الواجهة' : 'View Site'}</span>
              </a>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="py-1.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'subsidiaries' && <SubsidiariesManager />}
        {activeTab === 'categories' && <CategoriesManager />}
        {activeTab === 'whyUs' && <WhyUsManager />}
        {activeTab === 'partners' && <PartnersManager />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'team' && <TeamManager />}
        {activeTab === 'careers' && <CareersManager />}
        {activeTab === 'logo' && <LogoManager />}
        {activeTab === 'quotes' && <QuotesManager />}
        {activeTab === 'inquiries' && <InquiriesManager />}
        {activeTab === 'settings' && <SettingsManager />}
      </main>
    </div>
  );
};
