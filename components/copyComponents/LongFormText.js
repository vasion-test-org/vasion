'use client';
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const LongFormText = ({ blok }) => {
  // console.log(blok)
  return (
    <LongFormTextContainer {...storyblokEditable(blok.copy)}>
      <RichTextRenderer key={`copy-`} document={blok.copy} blok={blok} />
    </LongFormTextContainer>
  );
};

const LongFormTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2.5vw auto;
  width: 81.5vw;

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
    margin: 40px auto;
  }

  ${media.tablet} {
    margin: 3.906vw auto;
  }

  ${media.mobile} {
    margin: 8.333vw auto;
  }
`;
export default LongFormText;
