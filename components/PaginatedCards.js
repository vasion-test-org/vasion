'use client'
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const PaginatedCards = ({ blok }) => {
const themes = useAvailableThemes();
const selectedTheme = themes[blok.theme] || themes.default;

console.log(blok)
return (
<ThemeProvider theme={selectedTheme}>

</ThemeProvider>
)
}
export default PaginatedCards
