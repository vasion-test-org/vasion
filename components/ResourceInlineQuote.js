'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const ResourceInlineQuote = ({ blok }) => {
  console.log('resourceInlineQuote', blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <QuoteContainer
          bg={blok.custom_theme[0].background_color?.value}
          bordercolor={blok.custom_theme[0]?.text_color?.value}
        >
          {blok?.copy_sections?.map((copy, index) => (
            <CopyWrapper
              key={copy._uid || index}
              {...storyblokEditable(copy)}
              textcolor={blok.custom_theme[0]?.text_color?.value}
            >
              <RichTextRenderer
                document={copy?.copy}
                responsiveTextStyles={copy?.responsive_text_styles}
              />
            </CopyWrapper>
          ))}
        </QuoteContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ResourceInlineQuote;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.textcolor || 'unset'};
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 0.5vw;
  padding-left: 1.5vw;
  background: ${(props) => props.bg || 'unset'};
  border-left: 0.35vw solid ${(props) => props.bordercolor || '#7E5FDD'};

  ${media.fullWidth} {
    padding-left: 24px;
    gap: 8px;
    border-left: 5px solid ${(props) => props.bordercolor || '#7E5FDD'};
  }

  ${media.tablet} {
    padding-left: 2.344vw;
    gap: 0.781vw;
    border-left: 0.488vw solid ${(props) => props.bordercolor || '#7E5FDD'};
  }

  ${media.mobile} {
    padding-left: 5vw;
    gap: 1.667vw;
    border-left: 1.042vw solid ${(props) => props.bordercolor || '#7E5FDD'};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
          ? '3.906vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '3.906vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 3.906vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 3.906vw';
      }
      return props.spacing === 'default'
        ? '3.906vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '3.906vw 0';
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
