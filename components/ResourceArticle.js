'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import colors from '@/styles/colors';

const ResourceArticle = ({ blok }) => {
  console.log('RESOURCE_ARTICLE', blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  let customTheme = blok.custom_theme?.[0] || {};
  if (!blok.custom_theme_builder) {
    customTheme = undefined;
  }

  const backgroundType = customTheme?.background_type;
  const bg_color =
    backgroundType === 'color' ? customTheme?.background_color?.value : null;

  const text_color = customTheme?.text_color?.value;
  return (
    <ThemeProvider theme={{ ...selectedTheme, customtheme: customTheme }}>
      <Wrapper
        spacing={blok.section_spacing}
        spacingOffset={blok.offset_spacing}
      >
        <CopyWrapper
          bg_color={bg_color}
          background_type={backgroundType}
          text_color={text_color}
        >
          {(blok?.copy_sections[0]?.copy || blok?.copy) && (
            <RichTextRenderer
              document={blok.copy_sections[0]?.copy || blok.copy}
              blok={blok}
              responsiveTextStyles={blok?.responsive_text_styles}
            />
          )}
        </CopyWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ResourceArticle;

const CopyWrapper = styled.div`
  display: flex;
  background-color: ${(props) => {
    if (props.background_type === 'color' && props.bg_color) {
      return props.bg_color;
    }
    return colors.lightPurpleGrey;
  }};
  color: ${(props) => (props.text_color ? props.text_color : 'unset')};
  padding: 2.5vw;
  border-radius: 1vw;
  ${media.fullWidth} {
    padding: 40px;
    border-radius: 16px;
  }
  ${media.tablet} {
    padding: 3.906vw;
    border-radius: 1.563vw;
  }
  ${media.mobile} {
    padding: 8.333vw;
    border-radius: 3.333vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
          ? `${props.spacing}px 0 0`
          : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
        ? `${props.spacing}px 0`
        : '3.75vw 0';
  }};
  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '60px 0';
    }};
  }
  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '5.859vw 0';
    }};
  }
  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '12.5vw 0';
    }};
  }
`;
