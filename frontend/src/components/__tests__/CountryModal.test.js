import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryModal from '../CountryModal';

const mockCountry = {
  name: { common: 'Test Country' },
  flags: { png: 'flag.png' },
  population: 1000000,
  region: 'Test Region',
  capital: ['Test Capital'],
  languages: { eng: 'English' },
  currencies: { USD: { name: 'US Dollar', symbol: '$' } },
  borders: ['Border1', 'Border2']
};

describe('CountryModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders country details correctly', () => {
    render(
      <CountryModal
        country={mockCountry}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Country Details')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Population: 1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Test Region')).toBeInTheDocument();
    expect(screen.getByText('Capital: Test Capital')).toBeInTheDocument();
    expect(screen.getByText('Languages: English')).toBeInTheDocument();
    expect(screen.getByText('Currencies: US Dollar ($)')).toBeInTheDocument();
    expect(screen.getByText('Border Countries:')).toBeInTheDocument();
    expect(screen.getByText('Border1')).toBeInTheDocument();
    expect(screen.getByText('Border2')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <CountryModal
        country={mockCountry}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking outside the modal', () => {
    render(
      <CountryModal
        country={mockCountry}
        onClose={mockOnClose}
      />
    );

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('handles missing optional data gracefully', () => {
    const countryWithMissingData = {
      name: { common: 'Test Country' },
      flags: { png: 'flag.png' },
      population: 1000000,
      region: 'Test Region'
    };

    render(
      <CountryModal
        country={countryWithMissingData}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Population: 1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Test Region')).toBeInTheDocument();
    expect(screen.queryByText(/capital/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/languages/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/currencies/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/border countries/i)).not.toBeInTheDocument();
  });

  test('formats large numbers correctly', () => {
    const countryWithLargePopulation = {
      ...mockCountry,
      population: 1234567890
    };

    render(
      <CountryModal
        country={countryWithLargePopulation}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('Population: 1,234,567,890')).toBeInTheDocument();
  });
}); 