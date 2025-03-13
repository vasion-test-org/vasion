'use client';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from './globalComponents/Image';

const SmallQuote = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  console.log(blok);
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <SmallQuoteContainer>
          <ImageWrapper>
            <Image
            {...storyblokEditable(blok)}
              alt={blok?.quote_image[0]?.media[0]?.alt || 'Default Image'}
              images={blok?.quote_image[0]?.media}
            />
          </ImageWrapper>
          <SmallQuoteContent>
            {blok.copy.map((copy) => (
              <div {...storyblokEditable(copy)}>
                <RichTextRenderer document={copy.copy} />
              </div>
            ))}
          </SmallQuoteContent>
        </SmallQuoteContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

const ImageWrapper = styled.div`
  width: 6.688vw;
  height: 6.688vw;

  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const SmallQuoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const SmallQuoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 1.5vw;
  gap: 1.5vw;
  width: 81.5vw;
  padding: 2vw;
  background: ${(props) => props.theme.small_quote.bg};
  color: ${(props) => props.theme.small_quote.textColor};

  ${media.fullWidth} {
    width: 1304px;
    padding: 32px;
    border-radius: 24px;
    gap: 24px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
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
export default SmallQuote;
