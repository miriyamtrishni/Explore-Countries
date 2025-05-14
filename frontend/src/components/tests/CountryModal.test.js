// src/components/__tests__/CountryModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryModal from '../CountryModal';

describe('CountryModal component', () => {
  const country = {
    name: { common: 'Testland', nativeName: { abc: { common: 'Testn' } } },
    population: 1000,
    region: 'Test',
    subregion: 'Subtest',
    capital: ['Cap'],
    flags: { svg: 'flag.svg' },
    tld: ['.tld'],
    currencies: { TST: { name: 'Test Dollar' } },
    languages: { t: 'Testish' },
    borders: ['DEF']
  };

  test('renders details and calls onClose', () => {
    const onClose = jest.fn();
    render(<CountryModal country={country} onClose={onClose} />);
    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText(/Native Name:/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});

