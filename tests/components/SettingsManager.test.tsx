import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '@/src/context/AppContext';
import { SettingsManager } from '@/src/components/admin/SettingsManager';
import { changeAdminPasswordApi } from '@/src/services/api';

vi.mock('@/src/services/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/src/services/api')>();
  return {
    ...actual,
    changeAdminPasswordApi: vi.fn(),
    fetchAllContent: vi.fn().mockResolvedValue(null),
    updateSettingsApi: vi.fn().mockResolvedValue(true),
  };
});

describe('SettingsManager - Password Change UI (src/components/admin/SettingsManager.tsx)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <AppProvider>
        <SettingsManager />
      </AppProvider>
    );
  };

  const getInputsAndSubmitButton = (container: HTMLElement) => {
    const currentInput = container.querySelector<HTMLInputElement>(
      'input[autoComplete="current-password"]'
    )!;
    const newPasswordInputs = container.querySelectorAll<HTMLInputElement>(
      'input[autoComplete="new-password"]'
    );
    const nextInput = newPasswordInputs[0];
    const confirmInput = newPasswordInputs[1];
    const submitBtn = screen.getByRole('button', {
      name: /تحديث كلمة المرور|Update Password/i,
    });

    return { currentInput, nextInput, confirmInput, submitBtn };
  };

  it('1. When required fields are missing/empty: validation stops request and changeAdminPasswordApi is NOT called', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    const { currentInput, nextInput, confirmInput, submitBtn } =
      getInputsAndSubmitButton(container);

    // Fill only current password, leaving new and confirm empty
    await user.type(currentInput, 'CurrentPass123!');
    await user.click(submitBtn);

    expect(
      screen.getByText(/يرجى ملء جميع حقول كلمة المرور|Please fill in all password fields/i)
    ).toBeInTheDocument();
    expect(changeAdminPasswordApi).not.toHaveBeenCalled();
  });

  it('2. When new password is < 8 characters or missing digits: validation message appears and API is NOT called', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    const { currentInput, nextInput, confirmInput, submitBtn } =
      getInputsAndSubmitButton(container);

    // Password without digits and less than 8 chars
    await user.type(currentInput, 'OldValidPass123!');
    await user.type(nextInput, 'short');
    await user.type(confirmInput, 'short');
    await user.click(submitBtn);

    expect(
      screen.getByText(/8 خانات على الأقل وتحتوي على حروف وأرقام|at least 8 characters long/i)
    ).toBeInTheDocument();
    expect(changeAdminPasswordApi).not.toHaveBeenCalled();

    // Password with >= 8 chars but NO digits
    await user.clear(nextInput);
    await user.clear(confirmInput);
    await user.type(nextInput, 'onlylettersandlonger');
    await user.type(confirmInput, 'onlylettersandlonger');
    await user.click(submitBtn);

    expect(
      screen.getByText(/8 خانات على الأقل وتحتوي على حروف وأرقام|at least 8 characters long/i)
    ).toBeInTheDocument();
    expect(changeAdminPasswordApi).not.toHaveBeenCalled();
  });

  it('3. When confirmation does not match new password: error message appears and API is NOT called', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    const { currentInput, nextInput, confirmInput, submitBtn } =
      getInputsAndSubmitButton(container);

    await user.type(currentInput, 'OldPass123!');
    await user.type(nextInput, 'NewStrongPass456!');
    await user.type(confirmInput, 'DifferentPass789!');
    await user.click(submitBtn);

    expect(
      screen.getByText(/غير متطابقين|do not match/i)
    ).toBeInTheDocument();
    expect(changeAdminPasswordApi).not.toHaveBeenCalled();
  });

  it('4. When new password is same as current password: error message appears and API is NOT called', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    const { currentInput, nextInput, confirmInput, submitBtn } =
      getInputsAndSubmitButton(container);

    await user.type(currentInput, 'IdenticalPass123!');
    await user.type(nextInput, 'IdenticalPass123!');
    await user.type(confirmInput, 'IdenticalPass123!');
    await user.click(submitBtn);

    expect(
      screen.getByText(/مختلفة عن كلمة المرور الحالية|must be different from current password/i)
    ).toBeInTheDocument();
    expect(changeAdminPasswordApi).not.toHaveBeenCalled();
  });

  it('5. When all inputs are valid: calls changeAdminPasswordApi, displays success message, and clears inputs', async () => {
    const user = userEvent.setup();
    localStorage.setItem('hn_admin_token', 'admin-session-active-token');

    vi.mocked(changeAdminPasswordApi).mockResolvedValueOnce({
      success: true,
      message: 'Password changed successfully',
    });

    const { container } = renderComponent();
    const { currentInput, nextInput, confirmInput, submitBtn } =
      getInputsAndSubmitButton(container);

    await user.type(currentInput, 'OldPass123!');
    await user.type(nextInput, 'NewPass789!');
    await user.type(confirmInput, 'NewPass789!');

    await user.click(submitBtn);

    // Verify API called with exact trimmed passwords
    expect(changeAdminPasswordApi).toHaveBeenCalledTimes(1);
    expect(changeAdminPasswordApi).toHaveBeenCalledWith('OldPass123!', 'NewPass789!');

    // Verify success banner appears
    await waitFor(() => {
      expect(
        screen.getByText(/تم تغيير كلمة المرور بنجاح|Password changed successfully/i)
      ).toBeInTheDocument();
    });

    // Verify input fields are cleared
    expect(currentInput.value).toBe('');
    expect(nextInput.value).toBe('');
    expect(confirmInput.value).toBe('');
  });
});
