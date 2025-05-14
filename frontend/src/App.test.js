// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
//import authService from '../services/auth.service';
import authService from './services/auth.service';

jest.mock('../services/auth.service');

test('renders Explore Countries on home route', () => {
  authService.getCurrentUser.mockReturnValue(null);
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument();
});
