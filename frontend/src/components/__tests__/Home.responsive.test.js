import React from 'react';
import { render, screen } from '@testing-library/react';
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

describe('Home Component Responsive Behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockCountries });
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders search and filter controls in a row on large screens', async () => {
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const controlsContainer = screen.getByTestId('controls-container');
    expect(controlsContainer).toHaveClass('md:flex-row');
  });

  test('renders search and filter controls in a column on small screens', async () => {
    window.innerWidth = 640;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const controlsContainer = screen.getByTestId('controls-container');
    expect(controlsContainer).toHaveClass('flex-col');
  });

  test('renders country cards in a grid with appropriate columns', async () => {
    window.innerWidth = 1024;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const cardsContainer = screen.getByTestId('cards-container');
    expect(cardsContainer).toHaveClass('lg:grid-cols-4');
  });

  test('adjusts grid columns for medium screens', async () => {
    window.innerWidth = 768;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const cardsContainer = screen.getByTestId('cards-container');
    expect(cardsContainer).toHaveClass('md:grid-cols-3');
  });

  test('adjusts grid columns for small screens', async () => {
    window.innerWidth = 640;
    window.dispatchEvent(new Event('resize'));

    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const cardsContainer = screen.getByTestId('cards-container');
    expect(cardsContainer).toHaveClass('sm:grid-cols-2');
  });

  test('maintains proper spacing between elements', async () => {
    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const controlsContainer = screen.getByTestId('controls-container');
    const cardsContainer = screen.getByTestId('cards-container');

    expect(controlsContainer).toHaveClass('gap-4');
    expect(cardsContainer).toHaveClass('gap-8');
  });

  test('ensures country cards maintain proper aspect ratio', async () => {
    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const countryCards = screen.getAllByTestId('country-card');
    countryCards.forEach(card => {
      expect(card).toHaveClass('aspect-[4/3]');
    });
  });

  test('ensures images maintain proper aspect ratio', async () => {
    renderWithProviders(<Home />);

    await screen.findByText('Test Country 1');

    const flagImages = screen.getAllByRole('img');
    flagImages.forEach(img => {
      expect(img).toHaveClass('object-cover');
    });
  });
}); 