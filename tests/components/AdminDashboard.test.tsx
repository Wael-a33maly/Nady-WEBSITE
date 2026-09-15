import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/src/context/AppContext';
import { AdminDashboard } from '@/src/components/admin/AdminDashboard';

vi.mock('@/src/services/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/services/api')>();
  return {
    ...actual,
    fetchAllContent: vi.fn().mockResolvedValue(null),
  };
});

describe('AdminDashboard - Operational Analytics & Scope Audit', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderDashboard = (onNavigateTab?: any) => {
    return render(
      <AppProvider>
        <AdminDashboard onNavigateTab={onNavigateTab} />
      </AppProvider>
    );
  };

  it('1. Strictly removes the ungrounded staff metric card ("الكادر والمشرفين", "2,450+", "99.8% معدل التواجد الميداني")', () => {
    renderDashboard();

    // Verify "2,450+" and "99.8%" and "معدل التواجد الميداني" are NOT in the document
    expect(screen.queryByText(/2,450/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/99\.8%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/معدل التواجد الميداني/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/الكادر والمشرفين/i)).not.toBeInTheDocument();
  });

  it('2. Renders real operational metric cards matching authentic project data', () => {
    renderDashboard();

    // Metric cards must be present and reflect real data
    expect(screen.getByText(/طلبات عروض الأسعار|Contract Proposals/i)).toBeInTheDocument();
    expect(screen.getByText(/رسائل واستفسارات التواصل|Customer Inquiries/i)).toBeInTheDocument();
    expect(screen.getByText(/طلبات التوظيف والكوادر|Job Applications/i)).toBeInTheDocument();
    expect(screen.getByText(/شركات المجموعة التابعة|Group Subsidiaries/i)).toBeInTheDocument();
    expect(screen.getByText(/الخدمات المعتمدة بالموقع|Approved Services/i)).toBeInTheDocument();
    expect(screen.getByText(/المشاريع المنفذة والشركاء|Portfolio & Partners/i)).toBeInTheDocument();
  });

  it('3. Renders fulfillment pipeline metrics and sector distribution', () => {
    renderDashboard();

    expect(screen.getByText(/كفاءة الاستجابة ومعدلات معالجة المعاملات|Fulfillment Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/معالجة عروض الأسعار|Quotes Processing/i)).toBeInTheDocument();
    expect(screen.getByText(/التجاوب مع الاستفسارات|Inquiries Response/i)).toBeInTheDocument();
    expect(screen.getByText(/فرز ملفات التوظيف|Application Screening/i)).toBeInTheDocument();
    expect(screen.getByText(/توزيع الطلبات حسب القطاع|Demand By Business Sector/i)).toBeInTheDocument();
  });

  it('4. Allows toggling recent records tabs between Quotes, Inquiries, and Careers', async () => {
    const user = userEvent.setup();
    const { container } = renderDashboard();

    // Tab buttons exist
    const quotesTabBtn = container.querySelector('#tab-btn-recent-quotes') as HTMLButtonElement;
    const inquiriesTabBtn = container.querySelector('#tab-btn-recent-inquiries') as HTMLButtonElement;
    const careersTabBtn = container.querySelector('#tab-btn-recent-careers') as HTMLButtonElement;

    expect(quotesTabBtn).not.toBeNull();
    expect(inquiriesTabBtn).not.toBeNull();
    expect(careersTabBtn).not.toBeNull();

    // Switch to Inquiries tab
    await user.click(inquiriesTabBtn);
    expect(screen.getByText(/موضوع الاستفسار|Subject/i)).toBeInTheDocument();

    // Switch to Careers tab
    await user.click(careersTabBtn);
    expect(screen.getByText(/الوظيفة المرشح لها|Position Applied/i)).toBeInTheDocument();
  });

  it('5. Triggers onNavigateTab when clicking shortcuts or metric cards', async () => {
    const user = userEvent.setup();
    const navigateSpy = vi.fn();
    const { container } = renderDashboard(navigateSpy);

    const quotesMetricCard = container.querySelector('#metric-card-quotes');
    expect(quotesMetricCard).not.toBeNull();
    if (quotesMetricCard) {
      await user.click(quotesMetricCard);
      expect(navigateSpy).toHaveBeenCalledWith('quotes');
    }

    const shortcutCareersBtn = container.querySelector('#shortcut-careers');
    expect(shortcutCareersBtn).not.toBeNull();
    if (shortcutCareersBtn) {
      await user.click(shortcutCareersBtn);
      expect(navigateSpy).toHaveBeenCalledWith('careers');
    }
  });

  it('6. Places quick actions bar at the top before metrics grid with all 12 direct shortcuts', async () => {
    const user = userEvent.setup();
    const navigateSpy = vi.fn();
    const { container } = renderDashboard(navigateSpy);

    const quickActionsBar = container.querySelector('#dashboard-quick-actions');
    const metricsGrid = container.querySelector('#dashboard-metrics-grid');

    expect(quickActionsBar).not.toBeNull();
    expect(metricsGrid).not.toBeNull();

    // Verify ordering in DOM: quickActionsBar is placed before metricsGrid
    if (quickActionsBar && metricsGrid) {
      const positionComparison = quickActionsBar.compareDocumentPosition(metricsGrid);
      // Node.DOCUMENT_POSITION_FOLLOWING is 4
      expect(positionComparison & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }

    // Check all 12 shortcut buttons
    const shortcuts = [
      { id: 'shortcut-quotes', tab: 'quotes' },
      { id: 'shortcut-inquiries', tab: 'inquiries' },
      { id: 'shortcut-careers', tab: 'careers' },
      { id: 'shortcut-subsidiaries', tab: 'subsidiaries' },
      { id: 'shortcut-categories', tab: 'categories' },
      { id: 'shortcut-services', tab: 'services' },
      { id: 'shortcut-projects', tab: 'projects' },
      { id: 'shortcut-partners', tab: 'partners' },
      { id: 'shortcut-whyus', tab: 'whyUs' },
      { id: 'shortcut-team', tab: 'team' },
      { id: 'shortcut-logo', tab: 'logo' },
      { id: 'shortcut-settings', tab: 'settings' },
    ];

    for (const item of shortcuts) {
      const btn = container.querySelector(`#${item.id}`) as HTMLButtonElement;
      expect(btn).not.toBeNull();
      await user.click(btn);
      expect(navigateSpy).toHaveBeenCalledWith(item.tab);
    }
  });

  it('7. Places English date and time directly beneath the slogan, cancels the total records badge, and renders language/theme/logout with view site button below', async () => {
    const user = userEvent.setup();
    const { container } = renderDashboard();

    // 1. Slogan and English datetime positioning
    const slogan = container.querySelector('#dashboard-subtitle');
    const englishDateTime = container.querySelector('#dashboard-datetime-english');
    expect(slogan).not.toBeNull();
    expect(englishDateTime).not.toBeNull();

    // Verify enlarged and bold styling
    expect(englishDateTime?.className).toContain('font-bold');
    expect(englishDateTime?.className).toContain('text-sm');

    // Slogan comes before English date/time
    if (slogan && englishDateTime) {
      const pos = slogan.compareDocumentPosition(englishDateTime);
      expect(pos & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }

    // 2. Confirms "سجل تشغيلي" is cancelled / absent
    expect(container.textContent).not.toContain('سجل تشغيلي');
    expect(container.textContent).not.toContain('Total Records');

    // 3. Header Action Controls
    const headerControls = container.querySelector('#dashboard-header-controls');
    expect(headerControls).not.toBeNull();

    const langBtn = container.querySelector('#header-btn-language') as HTMLButtonElement;
    const themeBtn = container.querySelector('#header-btn-theme') as HTMLButtonElement;
    const logoutBtn = container.querySelector('#header-btn-logout') as HTMLButtonElement;
    const viewSiteBtn = container.querySelector('#header-btn-view-site') as HTMLAnchorElement;

    expect(langBtn).not.toBeNull();
    expect(themeBtn).not.toBeNull();
    expect(logoutBtn).not.toBeNull();
    expect(viewSiteBtn).not.toBeNull();

    // View site button is below the row of 3 buttons
    if (langBtn && viewSiteBtn) {
      const pos = langBtn.compareDocumentPosition(viewSiteBtn);
      expect(pos & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }

    // Verify interaction works without error
    await user.click(langBtn);
    await user.click(themeBtn);
    await user.click(logoutBtn);
    await user.click(viewSiteBtn);
  });
});
