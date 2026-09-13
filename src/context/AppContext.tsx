import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ThemeMode,
  ColorPreset,
  SiteSettings,
  ServiceItem,
  ProjectItem,
  TeamMember,
  Testimonial,
  QuoteRequest,
  ContactInquiry,
  SubsidiaryCompany,
  SubsidiaryCategory,
  JobPosition,
  JobApplication,
  WhyUsFeature,
  ClientLogo,
} from '../types';
import {
  initialSiteSettings,
  initialServices,
  initialProjects,
  initialTeam,
  initialTestimonials,
  initialQuotes,
  initialInquiries,
  initialSubsidiaries,
  initialSubsidiaryCategories,
  initialJobPositions,
  initialJobApplications,
  initialWhyUsFeatures,
  initialClientLogos,
} from '../data/initialData';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isAdmin: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  changeColorPreset: (preset: ColorPreset, hex: string) => void;

  subsidiaryCategories: SubsidiaryCategory[];
  addSubsidiaryCategory: (cat: SubsidiaryCategory) => void;
  updateSubsidiaryCategory: (id: string, cat: Partial<SubsidiaryCategory>) => void;
  deleteSubsidiaryCategory: (id: string) => void;

  whyUsFeatures: WhyUsFeature[];
  addWhyUsFeature: (feature: WhyUsFeature) => void;
  updateWhyUsFeature: (id: string, feature: Partial<WhyUsFeature>) => void;
  deleteWhyUsFeature: (id: string) => void;

  subsidiaries: SubsidiaryCompany[];
  addSubsidiary: (sub: SubsidiaryCompany) => void;
  updateSubsidiary: (id: string, sub: Partial<SubsidiaryCompany>) => void;
  deleteSubsidiary: (id: string) => void;
  
  // Dedicated Full Landing Page View for a Subsidiary
  activeSubsidiaryView: SubsidiaryCompany | null;
  setActiveSubsidiaryView: (sub: SubsidiaryCompany | null) => void;
  
  services: ServiceItem[];
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  team: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  quotes: QuoteRequest[];
  addQuote: (quote: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => QuoteRequest;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  deleteQuote: (id: string) => void;

  inquiries: ContactInquiry[];
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: ContactInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Careers & Job Applications
  jobPositions: JobPosition[];
  addJobPosition: (job: JobPosition) => void;
  updateJobPosition: (id: string, job: Partial<JobPosition>) => void;
  deleteJobPosition: (id: string) => void;

  jobApplications: JobApplication[];
  addJobApplication: (appData: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>) => JobApplication;
  updateJobApplicationStatus: (id: string, status: JobApplication['status']) => void;
  deleteJobApplication: (id: string) => void;

  clientLogos: ClientLogo[];
  addClientLogo: (logo: ClientLogo) => void;
  updateClientLogo: (id: string, logo: Partial<ClientLogo>) => void;
  deleteClientLogo: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (t: Testimonial) => void;
  updateTestimonial: (id: string, t: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // Active Modals & Selected items
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  preselectedQuoteCategory: 'security' | 'cleaning' | 'integrated';
  openQuoteWithCategory: (cat: 'security' | 'cleaning' | 'integrated') => void;

  isCareerModalOpen: boolean;
  setIsCareerModalOpen: (open: boolean) => void;
  selectedJobForApply: JobPosition | null;
  openCareerModalWithJob: (job?: JobPosition | null) => void;

  isCareersPageOpen: boolean;
  setIsCareersPageOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function safeParseLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (error) {
    console.warn(`[AppContext] Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      return (localStorage.getItem('hn_lang') as Language) || 'ar';
    } catch {
      return 'ar';
    }
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      return (localStorage.getItem('hn_theme') as ThemeMode) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hn_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const savedSettings = safeParseLocalStorage<Partial<SiteSettings>>('hn_settings', {});
    return { ...initialSiteSettings, ...savedSettings };
  });

  const [subsidiaryCategories, setSubsidiaryCategories] = useState<SubsidiaryCategory[]>(() => {
    return safeParseLocalStorage('hn_subsidiary_categories', initialSubsidiaryCategories);
  });

  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryCompany[]>(() => {
    return safeParseLocalStorage('hn_subsidiaries', initialSubsidiaries);
  });

  const [whyUsFeatures, setWhyUsFeatures] = useState<WhyUsFeature[]>(() => {
    return safeParseLocalStorage('hn_why_us_features', initialWhyUsFeatures);
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    return safeParseLocalStorage('hn_services', initialServices);
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    return safeParseLocalStorage('hn_projects', initialProjects);
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    return safeParseLocalStorage('hn_team', initialTeam);
  });

  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    return safeParseLocalStorage('hn_quotes', initialQuotes);
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    return safeParseLocalStorage('hn_inquiries', initialInquiries);
  });

  const [jobPositions, setJobPositions] = useState<JobPosition[]>(() => {
    return safeParseLocalStorage('hn_job_positions', initialJobPositions);
  });

  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    return safeParseLocalStorage('hn_job_applications', initialJobApplications);
  });

  const [clientLogos, setClientLogos] = useState<ClientLogo[]>(() => {
    return safeParseLocalStorage('hn_client_logos', initialClientLogos);
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    return safeParseLocalStorage('hn_testimonials', initialTestimonials);
  });

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeSubsidiaryView, setActiveSubsidiaryView] = useState<SubsidiaryCompany | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedQuoteCategory, setPreselectedQuoteCategory] = useState<'security' | 'cleaning' | 'integrated'>('integrated');

  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobPosition | null>(null);
  const [isCareersPageOpen, setIsCareersPageOpen] = useState(false);

  // Sync lang & dir
  useEffect(() => {
    localStorage.setItem('hn_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Convert Hex to RGB helper
  const hexToRgb = (hex: string) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map((char) => char + char).join('');
    }
    const num = parseInt(cleanHex, 16);
    if (isNaN(num)) return '201, 169, 97';
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
  };

  // Sync theme & primary color hex + granular custom variables
  useEffect(() => {
    localStorage.setItem('hn_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }

    const root = document.documentElement;

    if (settings.primaryColorHex) {
      root.style.setProperty('--brand-primary', settings.primaryColorHex);
      root.style.setProperty('--brand-primary-rgb', hexToRgb(settings.primaryColorHex));
    }

    if (settings.secondaryColorHex) {
      root.style.setProperty('--brand-secondary', settings.secondaryColorHex);
    }

    // Typography & Font Colors
    root.style.setProperty('--text-dark', settings.darkTextColor || '#F8FAFC');
    root.style.setProperty('--text-muted-dark', settings.darkMutedTextColor || '#94A3B8');
    root.style.setProperty('--text-light', settings.lightTextColor || '#0F172A');
    root.style.setProperty('--text-muted-light', settings.lightMutedTextColor || '#475569');

    // Section Background Colors (Dark)
    root.style.setProperty('--bg-hero-dark', settings.heroBgDark || '#0B1929');
    root.style.setProperty('--bg-about-dark', settings.aboutBgDark || '#0D1D30');
    root.style.setProperty('--bg-services-dark', settings.servicesBgDark || '#0B1929');
    root.style.setProperty('--bg-subsidiaries-dark', settings.subsidiariesBgDark || '#0D1D30');
    root.style.setProperty('--bg-projects-dark', settings.projectsBgDark || '#0B1929');
    root.style.setProperty('--bg-whyus-dark', settings.whyUsBgDark || '#0D1D30');
    root.style.setProperty('--bg-testimonials-dark', settings.testimonialsBgDark || '#0B1929');
    root.style.setProperty('--bg-quote-dark', settings.quoteBgDark || '#0D1D30');
    root.style.setProperty('--bg-footer-dark', settings.footerBgDark || '#07111D');

    // Section Background Colors (Light)
    root.style.setProperty('--bg-hero-light', settings.heroBgLight || '#0F172A');
    root.style.setProperty('--bg-about-light', settings.aboutBgLight || '#FFFFFF');
    root.style.setProperty('--bg-services-light', settings.servicesBgLight || '#F8FAFC');
    root.style.setProperty('--bg-subsidiaries-light', settings.subsidiariesBgLight || '#F1F5F9');
    root.style.setProperty('--bg-projects-light', settings.projectsBgLight || '#FFFFFF');
    root.style.setProperty('--bg-whyus-light', settings.whyUsBgLight || '#F8FAFC');
    root.style.setProperty('--bg-testimonials-light', settings.testimonialsBgLight || '#FFFFFF');
    root.style.setProperty('--bg-quote-light', settings.quoteBgLight || '#F8FAFC');
    root.style.setProperty('--bg-footer-light', settings.footerBgLight || '#0F172A');

    // Cards & Containers
    root.style.setProperty('--card-bg-dark', settings.cardBgDark || '#112236');
    root.style.setProperty('--card-bg-light', settings.cardBgLight || '#FFFFFF');
    root.style.setProperty('--card-border-dark', settings.cardBorderDark || '#1E3A5F');
    root.style.setProperty('--card-border-light', settings.cardBorderLight || '#E2E8F0');
    root.style.setProperty('--card-radius', `${settings.cardRadiusPx || 16}px`);
  }, [theme, settings]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('hn_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist state
  useEffect(() => { localStorage.setItem('hn_subsidiary_categories', JSON.stringify(subsidiaryCategories)); }, [subsidiaryCategories]);
  useEffect(() => { localStorage.setItem('hn_subsidiaries', JSON.stringify(subsidiaries)); }, [subsidiaries]);
  useEffect(() => { localStorage.setItem('hn_why_us_features', JSON.stringify(whyUsFeatures)); }, [whyUsFeatures]);
  useEffect(() => { localStorage.setItem('hn_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('hn_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('hn_team', JSON.stringify(team)); }, [team]);
  useEffect(() => { localStorage.setItem('hn_quotes', JSON.stringify(quotes)); }, [quotes]);
  useEffect(() => { localStorage.setItem('hn_inquiries', JSON.stringify(inquiries)); }, [inquiries]);
  useEffect(() => { localStorage.setItem('hn_job_positions', JSON.stringify(jobPositions)); }, [jobPositions]);
  useEffect(() => { localStorage.setItem('hn_job_applications', JSON.stringify(jobApplications)); }, [jobApplications]);
  useEffect(() => { localStorage.setItem('hn_client_logos', JSON.stringify(clientLogos)); }, [clientLogos]);
  useEffect(() => { localStorage.setItem('hn_testimonials', JSON.stringify(testimonials)); }, [testimonials]);

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));

  const setTheme = (t: ThemeMode) => setThemeState(t);
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const loginAdmin = (pass: string) => {
    if (pass === 'admin' || pass === 'admin123' || pass === '123456') {
      setIsAdmin(true);
      localStorage.setItem('hn_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('hn_admin_auth');
  };

  const updateSettings = (newS: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newS }));
  };

  const changeColorPreset = (preset: ColorPreset, hex: string) => {
    setSettings((prev) => ({
      ...prev,
      themePreset: preset,
      primaryColorHex: hex,
    }));
  };

  const addSubsidiaryCategory = (cat: SubsidiaryCategory) => setSubsidiaryCategories((prev) => [...prev, cat]);
  const updateSubsidiaryCategory = (id: string, cat: Partial<SubsidiaryCategory>) => {
    setSubsidiaryCategories((prev) => prev.map((item) => (item.id === id ? { ...item, ...cat } : item)));
  };
  const deleteSubsidiaryCategory = (id: string) => {
    setSubsidiaryCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const addSubsidiary = (sub: SubsidiaryCompany) => setSubsidiaries((prev) => [sub, ...prev]);
  const updateSubsidiary = (id: string, sub: Partial<SubsidiaryCompany>) => {
    setSubsidiaries((prev) => prev.map((item) => (item.id === id ? { ...item, ...sub } : item)));
  };
  const deleteSubsidiary = (id: string) => setSubsidiaries((prev) => prev.filter((item) => item.id !== id));

  const addWhyUsFeature = (feature: WhyUsFeature) => setWhyUsFeatures((prev) => [...prev, feature]);
  const updateWhyUsFeature = (id: string, feature: Partial<WhyUsFeature>) => {
    setWhyUsFeatures((prev) => prev.map((item) => (item.id === id ? { ...item, ...feature } : item)));
  };
  const deleteWhyUsFeature = (id: string) => setWhyUsFeatures((prev) => prev.filter((item) => item.id !== id));

  const addService = (s: ServiceItem) => setServices((prev) => [s, ...prev]);
  const updateService = (id: string, s: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...s } : item)));
  };
  const deleteService = (id: string) => setServices((prev) => prev.filter((item) => item.id !== id));

  const addProject = (p: ProjectItem) => setProjects((prev) => [p, ...prev]);
  const updateProject = (id: string, p: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, ...p } : item)));
  };
  const deleteProject = (id: string) => setProjects((prev) => prev.filter((item) => item.id !== id));

  const addTeamMember = (m: TeamMember) => setTeam((prev) => [m, ...prev]);
  const updateTeamMember = (id: string, m: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((item) => (item.id === id ? { ...item, ...m } : item)));
  };
  const deleteTeamMember = (id: string) => setTeam((prev) => prev.filter((item) => item.id !== id));

  const addQuote = (quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): QuoteRequest => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `q-${Date.now().toString().slice(-4)}`,
      status: 'new',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setQuotes((prev) => [newQuote, ...prev]);
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  const deleteQuote = (id: string) => setQuotes((prev) => prev.filter((q) => q.id !== id));

  const addInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `inq-${Date.now().toString().slice(-4)}`,
      status: 'unread',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry['status']) => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const deleteInquiry = (id: string) => setInquiries((prev) => prev.filter((i) => i.id !== id));

  // Careers & Job Positions methods
  const addJobPosition = (job: JobPosition) => setJobPositions((prev) => [job, ...prev]);
  const updateJobPosition = (id: string, job: Partial<JobPosition>) => {
    setJobPositions((prev) => prev.map((j) => (j.id === id ? { ...j, ...job } : j)));
  };
  const deleteJobPosition = (id: string) => setJobPositions((prev) => prev.filter((j) => j.id !== id));

  const addJobApplication = (appData: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>): JobApplication => {
    const newApp: JobApplication = {
      ...appData,
      id: `app-${Date.now().toString().slice(-4)}`,
      status: 'new',
      appliedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setJobApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const updateJobApplicationStatus = (id: string, status: JobApplication['status']) => {
    setJobApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const deleteJobApplication = (id: string) => setJobApplications((prev) => prev.filter((a) => a.id !== id));

  const addClientLogo = (logo: ClientLogo) => setClientLogos((prev) => [logo, ...prev]);
  const updateClientLogo = (id: string, logo: Partial<ClientLogo>) =>
    setClientLogos((prev) => prev.map((item) => (item.id === id ? { ...item, ...logo } : item)));
  const deleteClientLogo = (id: string) => setClientLogos((prev) => prev.filter((item) => item.id !== id));

  const addTestimonial = (t: Testimonial) => setTestimonials((prev) => [t, ...prev]);
  const updateTestimonial = (id: string, t: Partial<Testimonial>) =>
    setTestimonials((prev) => prev.map((item) => (item.id === id ? { ...item, ...t } : item)));
  const deleteTestimonial = (id: string) => setTestimonials((prev) => prev.filter((item) => item.id !== id));

  const openQuoteWithCategory = (cat: 'security' | 'cleaning' | 'integrated') => {
    setPreselectedQuoteCategory(cat);
    setIsQuoteModalOpen(true);
  };

  const openCareerModalWithJob = (job?: JobPosition | null) => {
    setSelectedJobForApply(job || null);
    setIsCareerModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        theme,
        setTheme,
        toggleTheme,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        settings,
        updateSettings,
        changeColorPreset,
        subsidiaryCategories,
        addSubsidiaryCategory,
        updateSubsidiaryCategory,
        deleteSubsidiaryCategory,
        subsidiaries,
        addSubsidiary,
        updateSubsidiary,
        deleteSubsidiary,
        whyUsFeatures,
        addWhyUsFeature,
        updateWhyUsFeature,
        deleteWhyUsFeature,
        activeSubsidiaryView,
        setActiveSubsidiaryView,
        services,
        addService,
        updateService,
        deleteService,
        projects,
        addProject,
        updateProject,
        deleteProject,
        team,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        quotes,
        addQuote,
        updateQuoteStatus,
        deleteQuote,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        jobPositions,
        addJobPosition,
        updateJobPosition,
        deleteJobPosition,
        jobApplications,
        addJobApplication,
        updateJobApplicationStatus,
        deleteJobApplication,
        clientLogos,
        addClientLogo,
        updateClientLogo,
        deleteClientLogo,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        selectedService,
        setSelectedService,
        selectedProject,
        setSelectedProject,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        preselectedQuoteCategory,
        openQuoteWithCategory,
        isCareerModalOpen,
        setIsCareerModalOpen,
        selectedJobForApply,
        openCareerModalWithJob,
        isCareersPageOpen,
        setIsCareersPageOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

