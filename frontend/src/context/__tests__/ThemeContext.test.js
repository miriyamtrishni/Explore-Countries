import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Test component that uses the theme context
const TestComponent = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div data-testid="theme-status">{darkMode ? 'dark' : 'light'}</div>
    </div>
  );
};

describe('ThemeContext', () => {
  test('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  test('toggles between light and dark themes', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByText('Toggle Theme');
    const themeStatus = screen.getByTestId('theme-status');
    
    // Initial state should be light
    expect(themeStatus).toHaveTextContent('light');
    
    // Toggle to dark
    fireEvent.click(toggleButton);
    expect(themeStatus).toHaveTextContent('dark');
    
    // Toggle back to light
    fireEvent.click(toggleButton);
    expect(themeStatus).toHaveTextContent('light');
  });

  test('persists theme preference in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByText('Toggle Theme');
    
    // Toggle to dark
    fireEvent.click(toggleButton);
    expect(localStorage.getItem('darkMode')).toBe('true');
    
    // Toggle back to light
    fireEvent.click(toggleButton);
    expect(localStorage.getItem('darkMode')).toBe('false');
  });
}); 