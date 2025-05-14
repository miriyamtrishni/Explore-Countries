// src/components/__tests__/Profile.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../Profile';
import authService from '../../services/auth.service';

jest.mock('../../services/auth.service');

describe('Profile component', () => {
  test('redirects when no user', () => {
    authService.getCurrentUser.mockReturnValue(null);
    const { container } = render(
      <MemoryRouter initialEntries={['/profile']}>
        <Profile />
      </MemoryRouter>
    );
    expect(container.innerHTML).not.toContain('Username:');
  });

  test('displays user info when logged in', () => {
    authService.getCurrentUser.mockReturnValue({ username: 'user', email: 'a@b.com', roles: ['ROLE_USER'] });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(screen.getByText(/user/)).toBeInTheDocument();
    expect(screen.getByText(/a@b.com/)).toBeInTheDocument();
  });
});
