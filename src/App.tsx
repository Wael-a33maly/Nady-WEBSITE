import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SubsidiariesSection } from './components/sections/SubsidiariesSection';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsBentoSection } from './components/sections/ProjectsBentoSection';
import { ClientsMarqueeSection } from './components/sections/ClientsMarqueeSection';
import { TeamSection } from './components/sections/TeamSection';
import { QuoteRequestSection } from './components/sections/QuoteRequestSection';
import { CareersSection } from './components/sections/CareersSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { MouseSpotlight } from './components/ui/MouseSpotlight';
import { SubsidiaryDetailPage } from './components/views/SubsidiaryDetailPage';
import { CareersPage } from './components/views/CareersPage';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { JobApplyModal } from './components/modals/JobApplyModal';
import { QuoteModalWrapper } from './components/modals/QuoteModalWrapper';
import { WhatsAppFloatingButton } from './components/ui/WhatsAppFloatingButton';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export function App() {
  const { lang, isAdmin, theme, activeSubsidiaryView, setActiveSubsidiaryView, isCareersPageOpen, setIsCareersPageOpen } = useApp();

  // Track URL pathname & hash for route changes
  const [currentRoute, setCurrentRoute] = React.useState(
    () => window.location.pathname + window.location.hash
  );

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname + window.location.hash);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const isExplicitAdminRoute = currentRoute.includes('/admin') || currentRoute.includes('#admin');
  const isExplicitCareersRoute = isCareersPageOpen || currentRoute.includes('/careers') || currentRoute.includes('#careers-page');

  // Handle document title & RTL attributes dynamically
  useEffect(() => {
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    document.title =
      lang === 'ar'
        ? 'حارس ونقاء | شركة الأمن والحراسة والنظافة العامة بالمملكة'
        : 'Hares & Niqaa | Enterprise Security & Commercial Cleaning Co.';
  }, [lang, theme]);

  // If in Admin Route
  if (isExplicitAdminRoute) {
    if (!isAdmin) {
      return (
        <div className={theme}>
          <AdminLogin />
        </div>
      );
    }
    return (
      <div className={theme}>
        <AdminLayout />
      </div>
    );
  }

  // If viewing a standalone subsidiary page
  if (activeSubsidiaryView) {
    return (
      <div className={theme}>
        <CustomCursor />
        <MouseSpotlight />
        <SubsidiaryDetailPage
          subsidiary={activeSubsidiaryView}
          onBack={() => setActiveSubsidiaryView(null)}
        />
        <QuoteModalWrapper />
      </div>
    );
  }

  // If viewing standalone Careers Page
  if (isExplicitCareersRoute) {
    return (
      <div className={theme}>
        <CustomCursor />
        <MouseSpotlight />
        <CareersPage
          onBack={() => {
            setIsCareersPageOpen(false);
            if (window.location.hash.includes('careers-page')) {
              window.history.pushState({}, '', '/');
            }
          }}
        />
        <JobApplyModal />
      </div>
    );
  }

  // Standard Public Landing Page
  return (
    <div className={`min-h-screen transition-colors duration-300 font-arabic ${theme === 'dark' ? 'bg-[#0B1929] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <CustomCursor />
      <MouseSpotlight />
      <Navbar />

      <main>
        <HeroSection />
        <SubsidiariesSection />
        <WhyUsSection />
        <ServicesSection />
        <ProjectsBentoSection />
        <ClientsMarqueeSection />
        <TeamSection />
        <QuoteRequestSection />
        <CareersSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Modals & Floating Tools */}
      <ServiceDetailModal />
      <ProjectDetailModal />
      <JobApplyModal />
      <QuoteModalWrapper />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
