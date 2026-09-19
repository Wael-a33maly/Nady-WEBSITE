export type Language = 'ar' | 'en';
export type ThemeMode = 'dark' | 'light';

export type ColorPreset = 'gold' | 'emerald' | 'blue' | 'purple' | 'ruby' | 'custom';

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  detailedDescAr: string;
  detailedDescEn: string;
  category: 'security' | 'cleaning' | 'integrated';
  iconName: string; // Lucide icon name
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'security' | 'cleaning' | 'integrated';
  clientAr: string;
  clientEn: string;
  locationAr: string;
  locationEn: string;
  date: string;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  statsAr: string;
  statsEn: string;
  badgeAr: string;
  badgeEn: string;
  subsidiaryId?: string;
}

export interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  image: string;
  bioAr: string;
  bioEn: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Testimonial {
  id: string;
  nameAr: string;
  nameEn: string;
  companyAr: string;
  companyEn: string;
  roleAr: string;
  roleEn: string;
  avatar: string;
  contentAr: string;
  contentEn: string;
  rating: number;
  serviceType: 'security' | 'cleaning' | 'integrated';
}

export interface WhyUsFeature {
  id: string;
  iconName: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  badgeAr: string;
  badgeEn: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  logoUrl: string;
  category: string;
  categoryAr?: string;
  categoryEn?: string;
}

export interface SubsidiaryCategory {
  id: string;
  nameAr: string;
  nameEn: string;
}

export interface DetailedSubsidiaryService {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
}

export interface SubsidiaryCompany {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  logoUrl: string;
  heroImage?: string;
  iconName: string;
  category: string; // Dynamic category ID
  descriptionAr: string;
  descriptionEn: string;
  detailedMissionAr?: string;
  detailedMissionEn?: string;
  servicesAr: string[];
  servicesEn: string[];
  detailedServices?: DetailedSubsidiaryService[];
  certificationsAr?: string[];
  certificationsEn?: string[];
  galleryImages?: string[];
  clientsCount: number;
  projectsCount: number;
  establishedYear: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  badgeAr?: string;
  badgeEn?: string;

  // Fully dynamic elements for every part of the subsidiary screen
  heroSubtitleAr?: string;
  heroSubtitleEn?: string;
  projectsLabelAr?: string;
  projectsLabelEn?: string;
  clientsLabelAr?: string;
  clientsLabelEn?: string;
  establishedLabelAr?: string;
  establishedLabelEn?: string;
  complianceRate?: string;
  complianceLabelAr?: string;
  complianceLabelEn?: string;

  overviewTagAr?: string;
  overviewTagEn?: string;
  overviewTitleAr?: string;
  overviewTitleEn?: string;
  overviewImage?: string;
  overviewNoteAr?: string;
  overviewNoteEn?: string;

  servicesTitleAr?: string;
  servicesTitleEn?: string;
  servicesSubtitleAr?: string;
  servicesSubtitleEn?: string;

  certificationsTitleAr?: string;
  certificationsTitleEn?: string;
  certificationsSubtitleAr?: string;
  certificationsSubtitleEn?: string;
  certificationsStatusAr?: string;
  certificationsStatusEn?: string;

  galleryTitleAr?: string;
  galleryTitleEn?: string;
  gallerySubtitleAr?: string;
  gallerySubtitleEn?: string;

  addressAr?: string;
  addressEn?: string;
  quoteBadgeAr?: string;
  quoteBadgeEn?: string;
  quoteTitleAr?: string;
  quoteTitleEn?: string;
  quoteSubtitleAr?: string;
  quoteSubtitleEn?: string;
  footerNoteAr?: string;
  footerNoteEn?: string;
}

export interface QuoteRequest {
  id: string;
  serviceCategory: 'security' | 'cleaning' | 'integrated';
  serviceName: string;
  propertyArea: string; // e.g., 500 sqm or 10 guards
  headcountNeeded: string;
  location: string;
  contractDuration: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  notes?: string;
  status: 'new' | 'processing' | 'completed';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  badgeAr?: string;
  badgeEn?: string;
  active?: boolean;
  primaryBtnTextAr?: string;
  primaryBtnTextEn?: string;
  primaryBtnLink?: string;
  secondaryBtnTextAr?: string;
  secondaryBtnTextEn?: string;
  secondaryBtnLink?: string;
  order?: number;
}

export interface JobPosition {
  id: string;
  titleAr: string;
  titleEn: string;
  departmentAr: string;
  departmentEn: string;
  locationAr: string;
  locationEn: string;
  typeAr: string; // e.g. "دوام كامل"
  typeEn: string; // e.g. "Full Time"
  descriptionAr: string;
  descriptionEn: string;
  requirementsAr: string[];
  requirementsEn: string[];
  active: boolean;
  postedDate: string;
}

export interface JobApplication {
  id: string;
  jobPositionId?: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  experienceYears: string;
  notes?: string;
  cvFileName?: string;
  cvFileData?: string; // Base64 data url or text preview
  status: 'new' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface SiteSettings {
  companyNameAr: string;
  companyNameEn: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSecondary?: string;
  addressAr: string;
  addressEn: string;
  workingHoursAr?: string;
  workingHoursEn?: string;
  logoUrl: string;
  logoTextAr: string;
  logoTextEn: string;
  sloganAr?: string;
  sloganEn?: string;
  
  // Theme & Color Settings
  themePreset: ColorPreset;
  primaryColorHex: string;
  secondaryColorHex?: string;

  // Typography & Font Colors
  darkTextColor?: string;
  darkMutedTextColor?: string;
  lightTextColor?: string;
  lightMutedTextColor?: string;

  // Section Background Colors (Dark Mode)
  heroBgDark?: string;
  aboutBgDark?: string;
  servicesBgDark?: string;
  subsidiariesBgDark?: string;
  projectsBgDark?: string;
  whyUsBgDark?: string;
  testimonialsBgDark?: string;
  quoteBgDark?: string;
  footerBgDark?: string;

  // Section Background Colors (Light Mode)
  heroBgLight?: string;
  aboutBgLight?: string;
  servicesBgLight?: string;
  subsidiariesBgLight?: string;
  projectsBgLight?: string;
  whyUsBgLight?: string;
  testimonialsBgLight?: string;
  quoteBgLight?: string;
  footerBgLight?: string;

  // Cards & Containers Customization
  cardBgDark?: string;
  cardBgLight?: string;
  cardBorderDark?: string;
  cardBorderLight?: string;
  cardRadiusPx?: number;
  
  // Client & Partners Display Mode on Frontend
  clientDisplayMode?: 'marquee' | 'grid';
  
  // Hero Section Customization
  heroBadgeAr: string;
  heroBadgeEn: string;
  heroTitleAr: string;
  heroTitleEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroSlides?: HeroSlide[];
  
  // About Section Customization
  aboutTitleAr: string;
  aboutTitleEn: string;
  aboutDescAr: string;
  aboutDescEn: string;
  aboutVisionAr: string;
  aboutVisionEn: string;

  // Stats
  yearsExperience: number;
  happyClients: number;
  completedProjects: number;
  securityGuardsCount: number;

  // Social Links
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
}

