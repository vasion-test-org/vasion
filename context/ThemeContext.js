'use client'

import { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme, buttonThemes, lightTheme } from "@/styles/theme"; 

const themes = {
  default: defaultTheme,
  dark: darkTheme,
  button: buttonThemes,
  light: lightTheme,
};

const ThemeContext = createContext(themes.default); 

export const ThemeProviderWrapper = ({ children }) => {
  return <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>;
};

export const useAvailableThemes = () => useContext(ThemeContext);
