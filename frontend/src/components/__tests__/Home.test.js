import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { ThemeProvider } from '../../context/ThemeContext';
import Home from '../Home';
import axios from 'axios';

jest.mock('axios');

const mockCountries = [
  {
    cca3: 'TEST1',
    name: { common: 'Test Country 1' },
    flags: { png: 'flag1.png' },
    population: 1000000,
    region: 'Test Region',
    capital: ['Test Capital']
  },
  {
    cca3: 'TEST2',
    name: { common: 'Test Country 2' },
    flags: { png: 'flag2.png' },
    population: 2000000,
    region: 'Test Region 2',
    capital: ['Test Capital 2']
  }
];

const mockUser = {
  username: 'testuser',
  email: 'test@example.com'
};

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders loading state initially', () => {
    renderWithProviders(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders countries after successful API call', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
      expect(screen.getByText('Test Country 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Population: 1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Test Region')).toBeInTheDocument();
    expect(screen.getByText('Capital: Test Capital')).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText('No countries found.')).toBeInTheDocument();
    });
  });

  test('filters countries by search input', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    const searchButton = screen.getByText('Search');
    
    fireEvent.change(searchInput, { target: { value: 'Test Country 1' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Test Country 1');
    });
  });

  test('filters countries by region', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
    });

    const regionSelect = screen.getByRole('combobox');
    fireEvent.change(regionSelect, { target: { value: 'Test Region' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Test Region');
    });
  });

  test('opens country modal on card click', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
    });

    const countryCard = screen.getByText('Test Country 1').closest('div');
    fireEvent.click(countryCard);

    expect(screen.getByText('Country Details')).toBeInTheDocument();
  });

  test('displays welcome message with username', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    renderWithProviders(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/welcome, testuser/i)).toBeInTheDocument();
    });
  });
}); 