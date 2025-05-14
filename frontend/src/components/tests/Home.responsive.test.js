// src/components/__tests__/Home.responsive.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';

jest.mock('axios');

test('renders single-column grid on small screens', async () => {
  axios.get.mockResolvedValue({ data: [] });
  global.innerWidth = 375;
  global.dispatchEvent(new Event('resize'));
  const { container } = render(<Home />);
  expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
});

test('includes lg:grid-cols-4 on large screens', async () => {
  axios.get.mockResolvedValue({ data: [] });
  global.innerWidth = 1200;
  global.dispatchEvent(new Event('resize'));
  const { container } = render(<Home />);
  expect(container.querySelector('.lg\\:grid-cols-4')).toBeInTheDocument();
});
