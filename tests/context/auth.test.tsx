import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useApp } from '@/src/context/AppContext';
import { loginAdminApi } from '@/src/services/api';

vi.mock('@/src/services/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/services/api')>();
  return {
    ...actual,
    loginAdminApi: vi.fn(),
    verifyAdminSessionApi: vi.fn().mockResolvedValue(true),
    fetchAllContent: vi.fn().mockResolvedValue(null),
    fetchQuotesApi: vi.fn().mockResolvedValue([]),
    fetchInquiriesApi: vi.fn().mockResolvedValue([]),
    fetchJobApplicationsApi: vi.fn().mockResolvedValue([]),
  };
});

describe('Authentication & loginAdmin (src/context/AppContext.tsx)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('1. Success: loginAdminApi returns token -> isAdmin=true and writes hn_admin_auth', async () => {
    vi.mocked(loginAdminApi).mockResolvedValueOnce({
      success: true,
      token: 'valid-session-jwt-token-999',
      user: { id: 1, username: 'admin', email: 'admin@hares-niqaa.com' },
    });

    const { result } = renderHook(() => useApp(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      ),
    });

    expect(result.current.isAdmin).toBe(false);

    let res: { success: boolean; error?: string } | undefined;
    await act(async () => {
      res = await result.current.loginAdmin('CorrectPassword123!');
    });

    expect(res?.success).toBe(true);
    expect(result.current.isAdmin).toBe(true);
    expect(localStorage.getItem('hn_admin_auth')).toBe('true');
  });

  it('2. Credential failure: { success: false } -> remains isAdmin=false and returns error', async () => {
    vi.mocked(loginAdminApi).mockResolvedValueOnce({
      success: false,
      error: 'كلمة المرور غير صحيحة',
    });

    const { result } = renderHook(() => useApp(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      ),
    });

    let res: { success: boolean; error?: string } | undefined;
    await act(async () => {
      res = await result.current.loginAdmin('WrongPassword!');
    });

    expect(res?.success).toBe(false);
    expect(res?.error).toBe('كلمة المرور غير صحيحة');
    expect(result.current.isAdmin).toBe(false);
    expect(localStorage.getItem('hn_admin_auth')).toBeNull();
  });

  it('3. Network down in PROD: returns connection_failed, never logs in (regression test for SHA-256 bypass removal)', async () => {
    // Set PROD environment
    vi.stubEnv('DEV', false);

    // Simulate network down: API returns null
    vi.mocked(loginAdminApi).mockResolvedValue(null);

    const { result } = renderHook(() => useApp(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      ),
    });

    // Attempt login with default admin123 in PROD
    let res1: { success: boolean; error?: string } | undefined;
    await act(async () => {
      res1 = await result.current.loginAdmin('admin123');
    });

    expect(res1?.success).toBe(false);
    expect(res1?.error).toBe('connection_failed');
    expect(result.current.isAdmin).toBe(false);
    expect(localStorage.getItem('hn_admin_auth')).toBeNull();

    // Attempt login with SHA-256 hash or plaintext admin
    let res2: { success: boolean; error?: string } | undefined;
    await act(async () => {
      res2 = await result.current.loginAdmin('240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9');
    });

    expect(res2?.success).toBe(false);
    expect(res2?.error).toBe('connection_failed');
    expect(result.current.isAdmin).toBe(false);
    expect(localStorage.getItem('hn_admin_auth')).toBeNull();
  });

  it('4. DEV-only vs PROD behavior: in DEV with network failure admin123 logs in, in PROD it is rejected', async () => {
    // A) In DEV mode (import.meta.env.DEV = true)
    vi.stubEnv('DEV', true);
    vi.mocked(loginAdminApi).mockResolvedValue(null);

    const { result: devResult } = renderHook(() => useApp(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      ),
    });

    let devLoginRes: { success: boolean; error?: string } | undefined;
    await act(async () => {
      devLoginRes = await devResult.current.loginAdmin('admin123');
    });

    expect(devLoginRes?.success).toBe(true);
    expect(devResult.current.isAdmin).toBe(true);
    expect(localStorage.getItem('hn_admin_auth')).toBe('true');

    // B) In PROD mode (import.meta.env.DEV = false)
    localStorage.clear();
    vi.stubEnv('DEV', false);

    const { result: prodResult } = renderHook(() => useApp(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <AppProvider>{children}</AppProvider>
      ),
    });

    let prodLoginRes: { success: boolean; error?: string } | undefined;
    await act(async () => {
      prodLoginRes = await prodResult.current.loginAdmin('admin123');
    });

    expect(prodLoginRes?.success).toBe(false);
    expect(prodLoginRes?.error).toBe('connection_failed');
    expect(prodResult.current.isAdmin).toBe(false);
    expect(localStorage.getItem('hn_admin_auth')).toBeNull();
  });
});
