/**
 * API Service for Hares & Niqaa
 * Connects React Frontend with Hostinger PHP/MySQL REST API
 */

import {
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

const API_BASE = '/api';

function getAuthToken(): string | null {
  try {
    return localStorage.getItem('hn_admin_token');
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['X-Admin-Token'] = token;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // In local dev without PHP server running, Vite serves index.html on 404/fallback
      return null;
    }

    const data = await response.json();
    if (!response.ok) {
      console.warn(`[API ${endpoint}] Error:`, data?.error || response.statusText);
      return null;
    }

    return data as T;
  } catch (err) {
    console.warn(`[API ${endpoint}] Network/Parser exception:`, err);
    return null;
  }
}

// ------------------------------------------------------------------------------
// 1. Content & Bootstrap
// ------------------------------------------------------------------------------
export interface UnifiedContentResponse {
  success: boolean;
  settings: SiteSettings;
  services: ServiceItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  subsidiaries: SubsidiaryCompany[];
  subsidiaryCategories: SubsidiaryCategory[];
  whyUsFeatures: WhyUsFeature[];
  jobPositions: JobPosition[];
  clientLogos: ClientLogo[];
  testimonials: Testimonial[];
}

export async function fetchAllContent(): Promise<UnifiedContentResponse | null> {
  return request<UnifiedContentResponse>('/content.php');
}

// ------------------------------------------------------------------------------
// 2. Authentication
// ------------------------------------------------------------------------------
export interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
  user?: { id: number; username: string; email: string };
}

export async function loginAdminApi(password: string, username: string = 'admin'): Promise<LoginResponse | null> {
  const res = await request<LoginResponse>('/auth.php?action=login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  if (res && res.success && res.token) {
    localStorage.setItem('hn_admin_token', res.token);
  }
  return res;
}

export async function verifyAdminSessionApi(): Promise<boolean> {
  const token = getAuthToken();
  if (!token) {
    localStorage.removeItem('hn_admin_auth');
    return false;
  }
  const res = await request<{ success: boolean; valid: boolean }>('/auth.php?action=check', {
    method: 'POST',
  });
  const isValid = !!res?.success && !!res?.valid;
  if (!isValid) {
    localStorage.removeItem('hn_admin_token');
    localStorage.removeItem('hn_admin_auth');
  }
  return isValid;
}

export async function logoutAdminApi(): Promise<void> {
  try {
    await request('/auth.php?action=logout', { method: 'POST' });
  } finally {
    localStorage.removeItem('hn_admin_token');
    localStorage.removeItem('hn_admin_auth');
  }
}

// ------------------------------------------------------------------------------
// 3. Settings
// ------------------------------------------------------------------------------
export async function updateSettingsApi(settings: Partial<SiteSettings>): Promise<boolean> {
  const res = await request<{ success: boolean }>('/settings.php', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 4. Quotes
// ------------------------------------------------------------------------------
export async function submitQuoteApi(quote: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): Promise<QuoteRequest | null> {
  const res = await request<{ success: boolean; quote: QuoteRequest }>('/quotes.php', {
    method: 'POST',
    body: JSON.stringify(quote),
  });
  return res?.quote || null;
}

export async function fetchQuotesApi(): Promise<QuoteRequest[]> {
  const res = await request<{ success: boolean; quotes: QuoteRequest[] }>('/quotes.php');
  return res?.quotes || [];
}

export async function updateQuoteStatusApi(id: string, status: QuoteRequest['status']): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/quotes.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return !!res?.success;
}

export async function deleteQuoteApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/quotes.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 5. Inquiries (Contact Form)
// ------------------------------------------------------------------------------
export async function submitInquiryApi(inquiry: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): Promise<ContactInquiry | null> {
  const res = await request<{ success: boolean; inquiry: ContactInquiry }>('/inquiries.php', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
  return res?.inquiry || null;
}

export async function fetchInquiriesApi(): Promise<ContactInquiry[]> {
  const res = await request<{ success: boolean; inquiries: ContactInquiry[] }>('/inquiries.php');
  return res?.inquiries || [];
}

export async function updateInquiryStatusApi(id: string, status: ContactInquiry['status']): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/inquiries.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return !!res?.success;
}

export async function deleteInquiryApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/inquiries.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 6. Job Applications
// ------------------------------------------------------------------------------
export async function submitJobApplicationApi(appData: Omit<JobApplication, 'id' | 'status' | 'appliedAt'>): Promise<JobApplication | null> {
  const res = await request<{ success: boolean; application: JobApplication }>('/job_applications.php', {
    method: 'POST',
    body: JSON.stringify(appData),
  });
  return res?.application || null;
}

export async function fetchJobApplicationsApi(): Promise<JobApplication[]> {
  const res = await request<{ success: boolean; jobApplications: JobApplication[] }>('/job_applications.php');
  return res?.jobApplications || [];
}

export async function updateJobAppStatusApi(id: string, status: JobApplication['status']): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/job_applications.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return !!res?.success;
}

export async function deleteJobAppApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/job_applications.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 7. Services CRUD
// ------------------------------------------------------------------------------
export async function createServiceApi(service: ServiceItem): Promise<boolean> {
  const res = await request<{ success: boolean }>('/services.php', {
    method: 'POST',
    body: JSON.stringify(service),
  });
  return !!res?.success;
}

export async function updateServiceApi(id: string, service: Partial<ServiceItem>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/services.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  });
  return !!res?.success;
}

export async function deleteServiceApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/services.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 8. Projects CRUD
// ------------------------------------------------------------------------------
export async function createProjectApi(project: ProjectItem): Promise<boolean> {
  const res = await request<{ success: boolean }>('/projects.php', {
    method: 'POST',
    body: JSON.stringify(project),
  });
  return !!res?.success;
}

export async function updateProjectApi(id: string, project: Partial<ProjectItem>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/projects.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  });
  return !!res?.success;
}

export async function deleteProjectApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/projects.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 9. Team CRUD
// ------------------------------------------------------------------------------
export async function createTeamMemberApi(member: TeamMember): Promise<boolean> {
  const res = await request<{ success: boolean }>('/team.php', {
    method: 'POST',
    body: JSON.stringify(member),
  });
  return !!res?.success;
}

export async function updateTeamMemberApi(id: string, member: Partial<TeamMember>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/team.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(member),
  });
  return !!res?.success;
}

export async function deleteTeamMemberApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/team.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 10. Subsidiaries CRUD
// ------------------------------------------------------------------------------
export async function createSubsidiaryApi(sub: SubsidiaryCompany): Promise<boolean> {
  const res = await request<{ success: boolean }>('/subsidiaries.php', {
    method: 'POST',
    body: JSON.stringify(sub),
  });
  return !!res?.success;
}

export async function updateSubsidiaryApi(id: string, sub: Partial<SubsidiaryCompany>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/subsidiaries.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(sub),
  });
  return !!res?.success;
}

export async function deleteSubsidiaryApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/subsidiaries.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 11. Subsidiary Categories CRUD
// ------------------------------------------------------------------------------
export async function createSubsidiaryCategoryApi(cat: SubsidiaryCategory): Promise<boolean> {
  const res = await request<{ success: boolean }>('/subsidiary_categories.php', {
    method: 'POST',
    body: JSON.stringify(cat),
  });
  return !!res?.success;
}

export async function updateSubsidiaryCategoryApi(id: string, cat: Partial<SubsidiaryCategory>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/subsidiary_categories.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(cat),
  });
  return !!res?.success;
}

export async function deleteSubsidiaryCategoryApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/subsidiary_categories.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 12. Why Us Features CRUD
// ------------------------------------------------------------------------------
export async function createWhyUsFeatureApi(feature: WhyUsFeature): Promise<boolean> {
  const res = await request<{ success: boolean }>('/why_us.php', {
    method: 'POST',
    body: JSON.stringify(feature),
  });
  return !!res?.success;
}

export async function updateWhyUsFeatureApi(id: string, feature: Partial<WhyUsFeature>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/why_us.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(feature),
  });
  return !!res?.success;
}

export async function deleteWhyUsFeatureApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/why_us.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 13. Job Positions CRUD
// ------------------------------------------------------------------------------
export async function createJobPositionApi(job: JobPosition): Promise<boolean> {
  const res = await request<{ success: boolean }>('/job_positions.php', {
    method: 'POST',
    body: JSON.stringify(job),
  });
  return !!res?.success;
}

export async function updateJobPositionApi(id: string, job: Partial<JobPosition>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/job_positions.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(job),
  });
  return !!res?.success;
}

export async function deleteJobPositionApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/job_positions.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 14. Client Logos CRUD
// ------------------------------------------------------------------------------
export async function createClientLogoApi(logo: ClientLogo): Promise<boolean> {
  const res = await request<{ success: boolean }>('/client_logos.php', {
    method: 'POST',
    body: JSON.stringify(logo),
  });
  return !!res?.success;
}

export async function updateClientLogoApi(id: string, logo: Partial<ClientLogo>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/client_logos.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(logo),
  });
  return !!res?.success;
}

export async function deleteClientLogoApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/client_logos.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}

// ------------------------------------------------------------------------------
// 15. Testimonials CRUD
// ------------------------------------------------------------------------------
export async function createTestimonialApi(testimonial: Testimonial): Promise<boolean> {
  const res = await request<{ success: boolean }>('/testimonials.php', {
    method: 'POST',
    body: JSON.stringify(testimonial),
  });
  return !!res?.success;
}

export async function updateTestimonialApi(id: string, testimonial: Partial<Testimonial>): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/testimonials.php?id=${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(testimonial),
  });
  return !!res?.success;
}

export async function deleteTestimonialApi(id: string): Promise<boolean> {
  const res = await request<{ success: boolean }>(`/testimonials.php?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  return !!res?.success;
}
