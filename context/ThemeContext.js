'use client'

import { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme, darkTheme, primaryTheme } from "@/styles/theme"; 

const themes = {
  default: defaultTheme,
  dark: darkTheme,
  primary: primaryTheme,
};

const ThemeContext = createContext(themes.default); 

export const ThemeProviderWrapper = ({ children }) => {
  return <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>;
};

export const useAvailableThemes = () => useContext(ThemeContext);
