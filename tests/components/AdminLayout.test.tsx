import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AdminLayout } from '../../src/components/admin/AdminLayout';
import { AppProvider } from '../../src/context/AppContext';

vi.mock('recharts', async () => {
  const actual = await vi.importActual<any>('recharts');
  return {
    ...actual,
    ResponsiveContainer: ({ children }: any) => <div className="responsive-container">{children}</div>,
  };
});

describe('AdminLayout - Sidebar & Header Layout Verification', () => {
  it('1. Confirms the sidebar bottom footer buttons (logout, theme, lang, view site) are removed from the sidebar', () => {
    const { container } = render(
      <AppProvider>
        <AdminLayout />
      </AppProvider>
    );

    const aside = container.querySelector('aside');
    expect(aside).not.toBeNull();

    if (aside) {
      // Confirms the old sidebar footer controls are absent from aside
      expect(aside.querySelector('.border-t')).toBeNull();
      // Confirms "عرض الواجهة العامة" is absent from aside
      expect(aside.textContent).not.toContain('عرض الواجهة العامة');
      expect(aside.textContent).not.toContain('View Public Site');
    }

    // Confirms the actions remain accessible in the dashboard header
    const headerControls = container.querySelector('#dashboard-header-controls');
    expect(headerControls).not.toBeNull();
    expect(container.querySelector('#header-btn-language')).not.toBeNull();
    expect(container.querySelector('#header-btn-theme')).not.toBeNull();
    expect(container.querySelector('#header-btn-logout')).not.toBeNull();
    expect(container.querySelector('#header-btn-view-site')).not.toBeNull();
  });
});
