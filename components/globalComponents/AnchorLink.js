'use client';
import React, { useEffect } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from 'styles/media';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';

const AnchorLink = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  // console.log(blok)
  return (
    <ThemeProvider theme={selectedTheme}>
      <AnchorWrapper className={blok.anchor_id}>{blok.anchor_header}</AnchorWrapper>
    </ThemeProvider>
  );
};

const AnchorWrapper = styled.div`
  display: none;
`;
export default AnchorLink;
