// src/components/__tests__/Home.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';
jest.mock('axios');

jest.mock('axios');

describe('Home component', () => {
  const mockCountries = [
    { 
      cca3: 'ABC',
      flags: { png: 'flag.png', svg: 'flag.svg' },
      name: { common: 'Testland', nativeName: { abc: { common: 'Testn' } } },
      population: 1000,
      region: 'Test',
      subregion: 'Subtest',
      capital: ['Cap'],
      tld: ['.tld'],
      currencies: { TST: { name: 'Test Dollar' } },
      languages: { t: 'Testish' },
      borders: ['DEF']
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockCountries });
  });

  test('renders loading then country cards', async () => {
    render(<Home />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Testland')).toBeInTheDocument());
    expect(screen.getByText(/Population:/)).toBeInTheDocument();
  });

  test('search triggers correct API call', async () => {
    render(<Home />);
    await waitFor(() => screen.getByText('Testland'));
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    fireEvent.change(screen.getByPlaceholderText(/Search for a country/i), { target: { value: 'Test' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Test'));
  });
});
