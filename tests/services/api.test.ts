import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  fetchAllContent,
  loginAdminApi,
  changeAdminPasswordApi,
  verifyAdminSessionApi,
} from '@/src/services/api';

describe('API Service Layer (src/services/api.ts)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('1. Returns JSON object as-is on successful 200 response', async () => {
    const mockPayload = {
      success: true,
      settings: { companyNameAr: 'حارس ونقاء' },
      services: [],
      projects: [],
      team: [],
      subsidiaries: [],
      subsidiaryCategories: [],
      whyUsFeatures: [],
      jobPositions: [],
      clientLogos: [],
      testimonials: [],
    };

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(mockPayload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    const result = await fetchAllContent();
    expect(result).not.toBeNull();
    expect(result).toEqual(mockPayload);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('2. Returns { success: false, error } on 401 error response with JSON (does NOT return null)', async () => {
    const errorPayload = {
      success: false,
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    };

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(errorPayload), {
        status: 401,
        statusText: 'Unauthorized',
        headers: { 'Content-Type': 'application/json' },
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    const result = await loginAdminApi('wrongPassword');
    // Must NOT be null - preserves previous security fix
    expect(result).not.toBeNull();
    expect(result?.success).toBe(false);
    expect(result?.error).toBe('اسم المستخدم أو كلمة المرور غير صحيحة');
  });

  it('3. Returns null on network exception (fetch throws)', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error / connection failure'));
    vi.stubGlobal('fetch', mockFetch);

    const result = await fetchAllContent();
    expect(result).toBeNull();
  });

  it('4. Returns null on non-JSON response (e.g. static HTML fallback or 404 HTML)', async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response('<!DOCTYPE html><html><body>Not Found</body></html>', {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    const result = await fetchAllContent();
    expect(result).toBeNull();
  });

  it('5. changeAdminPasswordApi sends currentPassword, newPassword in body and Authorization: Bearer from localStorage', async () => {
    const fakeToken = 'secret-jwt-or-session-token-12345';
    localStorage.setItem('hn_admin_token', fakeToken);

    let capturedUrl = '';
    let capturedOptions: RequestInit | undefined;

    const mockFetch = vi.fn().mockImplementation((url: string, options?: RequestInit) => {
      capturedUrl = url;
      capturedOptions = options;
      return Promise.resolve(
        new Response(
          JSON.stringify({
            success: true,
            message: 'Password changed successfully',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        )
      );
    });
    vi.stubGlobal('fetch', mockFetch);

    const result = await changeAdminPasswordApi('OldPassword123!', 'NewPassword456!');

    expect(result).toEqual({
      success: true,
      message: 'Password changed successfully',
    });

    expect(capturedUrl).toContain('/api/auth.php?action=change_password');
    expect(capturedOptions?.method).toBe('POST');

    const headers = capturedOptions?.headers as Record<string, string>;
    expect(headers).toBeDefined();
    expect(headers['Authorization']).toBe(`Bearer ${fakeToken}`);
    expect(headers['X-Admin-Token']).toBe(fakeToken);

    const body = JSON.parse(capturedOptions?.body as string);
    expect(body).toEqual({
      currentPassword: 'OldPassword123!',
      newPassword: 'NewPassword456!',
    });
  });
});
