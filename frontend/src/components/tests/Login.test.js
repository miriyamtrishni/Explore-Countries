// src/components/__tests__/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import authService from '../../services/auth.service';

jest.mock('../../services/auth.service');

describe('Login component', () => {
  test('submits username and password', () => {
    authService.login.mockResolvedValue({});
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    expect(authService.login).toHaveBeenCalledWith('user', 'pass');
  });
});
