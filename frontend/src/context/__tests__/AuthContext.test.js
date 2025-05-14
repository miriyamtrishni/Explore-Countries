import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import axios from 'axios';

jest.mock('axios');

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, register } = useAuth();
  return (
    <div>
      <div data-testid="user-status">{user ? 'logged-in' : 'logged-out'}</div>
      <button onClick={() => login({ username: 'test', password: 'test' })}>Login</button>
      <button onClick={() => register({ username: 'test', email: 'test@test.com', password: 'test' })}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('provides initial logged out state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('user-status')).toHaveTextContent('logged-out');
  });

  test('handles successful login', async () => {
    const mockUser = { id: 1, username: 'test', email: 'test@test.com' };
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-token', ...mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('logged-in');
    });
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  test('handles successful registration', async () => {
    const mockUser = { id: 1, username: 'test', email: 'test@test.com' };
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-token', ...mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('logged-in');
    });
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  test('handles logout', async () => {
    // First login
    const mockUser = { id: 1, username: 'test', email: 'test@test.com' };
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-token', ...mockUser } });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('logged-in');
    });

    // Then logout
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByTestId('user-status')).toHaveTextContent('logged-out');
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('handles login error', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('logged-out');
    });
    expect(localStorage.getItem('token')).toBeNull();
  });
}); 