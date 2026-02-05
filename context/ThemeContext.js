'use client';

import { createContext, useContext } from 'react';

import { ThemeProvider } from 'styled-components';

import { buttonThemes, darkTheme, defaultTheme, lightTheme } from '@/styles/theme';

const themes = {
  button: buttonThemes,
  dark: darkTheme,
  default: defaultTheme,
  light: lightTheme,
};

const ThemeContext = createContext(themes.default);

export const ThemeProviderWrapper = ({ children }) => {
  return <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>;
};

export const useAvailableThemes = () => useContext(ThemeContext);
