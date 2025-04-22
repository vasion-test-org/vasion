'use client'
import React, {useEffect} from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const AnchorLink = ({ blok }) => {
const themes = useAvailableThemes();
const selectedTheme = themes[blok.theme] || themes.default;

// console.log(blok)
return (
<ThemeProvider theme={selectedTheme}>
  <AnchorWrapper className={blok.anchor_id}>{blok.anchor_header}</AnchorWrapper>
</ThemeProvider>
)
}

const AnchorWrapper = styled.div`
  display: none;
`
export default AnchorLink