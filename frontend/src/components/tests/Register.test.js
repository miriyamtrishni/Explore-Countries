// src/components/__tests__/Register.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';
import authService from '../../services/auth.service';

jest.mock('../../services/auth.service');

test('registers user and shows success message', async () => {
  authService.signup.mockResolvedValue({ data: { message: 'Registered!' } });
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user' } });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pass' } });
  fireEvent.click(screen.getByRole('button', { name: /Register/i }));
  await waitFor(() => expect(screen.getByText('Registered!')).toBeInTheDocument());
});
