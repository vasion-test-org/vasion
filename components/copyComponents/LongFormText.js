'use client';
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const LongFormText = ({ blok }) => {
  // console.log(blok)
  return (
    <BackgroundWrapper
      backgroundColor={blok.background_color?.value}
      spacingOffset={blok.offset_spacing}
      spacing={blok.section_spacing}
    >
      <LongFormTextContainer {...storyblokEditable(blok.copy)}>
        <RichTextRenderer
          key={`copy-`}
          document={blok.copy}
          blok={blok}
          responsiveTextStyles={blok?.responsive_text_styles}
        />
      </LongFormTextContainer>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  background: ${(props) => props.backgroundColor || 'transparent'};

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

const LongFormTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 81.5vw;
  margin: 0 auto;

  /* Go into RichWrapper and apply spacing to children except .component-wrapper */
  & > div {
    width: 100%;

    > *:not(.component-wrapper) {
      /* margin-bottom: 1.875vw;

      ${media.fullWidth} {
        margin-bottom: 30px;
      }

      ${media.tablet} {
        margin-bottom: 2.93vw;
      }

      ${media.mobile} {
        margin-bottom: 6.25vw;
      } */
    }

    .component-wrapper * {
      margin-bottom: 0 !important;
    }
  }

  div:empty {
    height: 1.25vw;

    ${media.fullWidth} {
      height: 20px;
    }

    ${media.tablet} {
      height: 1.953vw;
    }

    ${media.mobile} {
      height: 4.167vw;
    }
  }

  ${media.fullWidth} {
    width: 1304px;
  }
`;

export default LongFormText;
