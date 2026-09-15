import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { SubsidiariesManager } from '../../src/components/admin/SubsidiariesManager';
import { AppProvider } from '../../src/context/AppContext';

describe('SubsidiariesManager - Light Mode Dark Text & Contrast Verification', () => {
  it('1. Renders the main title and container with high-contrast black text in light mode', () => {
    const { container } = render(
      <AppProvider>
        <SubsidiariesManager />
      </AppProvider>
    );

    const root = container.querySelector('#subsidiaries-manager-root');
    expect(root).not.toBeNull();
    expect(root?.className).toContain('text-slate-950');

    const heading = screen.getByText(/إدارة الشركات التابعة والتصنيفات/i);
    expect(heading).not.toBeNull();
    expect(heading.className).toContain('text-slate-950');
  });

  it('2. Shows dynamic category manager with black text and light inputs', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppProvider>
        <SubsidiariesManager />
      </AppProvider>
    );

    const catToggleBtn = screen.getByText(/إدارة تصنيفات الشركات/i);
    await user.click(catToggleBtn);

    const catHeading = screen.getByText(/إنشاء وإدارة التصنيفات المخصصة للشركات/i);
    expect(catHeading).not.toBeNull();

    const arabicInput = screen.getByPlaceholderText(/اسم التصنيف الجديد \(عربي\)/i);
    expect(arabicInput).not.toBeNull();
    expect(arabicInput.className).toContain('text-slate-950');
  });

  it('3. Renders creation form with high-contrast black labels and light inputs', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppProvider>
        <SubsidiariesManager />
      </AppProvider>
    );

    const addBtn = screen.getByText(/إضافة شركة تابعة جديدة/i);
    await user.click(addBtn);

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    expect(form?.className).toContain('bg-white');
    expect(form?.className).toContain('text-slate-950');

    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThan(0);
    labels.forEach((label) => {
      expect(label.className).toContain('text-slate-900');
    });
  });

  it('4. Subsidiary cards render with white card background and black title/description text', () => {
    const { container } = render(
      <AppProvider>
        <SubsidiariesManager />
      </AppProvider>
    );

    const cards = container.querySelectorAll('.grid > div');
    expect(cards.length).toBeGreaterThan(0);

    const firstCard = cards[0];
    expect(firstCard.className).toContain('bg-white');
    expect(firstCard.className).toContain('text-slate-950');
  });
});
