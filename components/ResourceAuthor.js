'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';

const ResourceAuthor = ({ blok }) => {
  console.log('resourceAuthor', blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <AuthorContainer>
          {blok?.assets && blok.assets.length > 0 && (
            <AuthorImageWrapper>
              <Image
                images={blok.assets}
                borderradius={50}
                sizes="(max-width: 480px) 60px, (max-width: 1024px) 80px, 96px"
                width={80}
                height={80}
                priority={false}
                quality={90}
              />
            </AuthorImageWrapper>
          )}
          <AuthorTextWrapper>
            {blok?.copy_sections?.map((copy, index) => (
              <CopyWrapper
                key={copy._uid || index}
                {...storyblokEditable(copy)}
              >
                <RichTextRenderer
                  document={copy?.copy}
                  responsiveTextStyles={copy?.responsive_text_styles}
                />
              </CopyWrapper>
            ))}
          </AuthorTextWrapper>
        </AuthorContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ResourceAuthor;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorImageWrapper = styled.div`
  flex-shrink: 0;
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  overflow: hidden;

  ${media.fullWidth} {
    width: 96px;
    height: 96px;
  }

  ${media.tablet} {
    width: 5vw;
    height: 5vw;
  }

  ${media.mobile} {
    width: 12.5vw;
    height: 12.5vw;
  }
`;

const AuthorTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25vw;
  border-top: 0.5px solid #c8c9ce;
  border-bottom: 0.5px solid #c8c9ce;
  padding: 0vw 8.333vw;
  width: 100%;
  max-width: 46.875vw;

  ${media.fullWidth} {
    gap: 20px;
    max-width: 750px;
    padding: 40px 0px;
  }

  ${media.tablet} {
    gap: 1.953vw;
    max-width: 66.797vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
    max-width: 89.167vw;
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
