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
      margin-bottom: 1.875vw;
    }

    .component-wrapper * {
      margin-bottom: 0 !important;
    }
  }

  div:empty {
    display: none;
  }

  ${media.fullWidth} {
    width: 1304px;
    margin: 0 auto;
  }

  ${media.tablet} {}

  ${media.mobile} {}
`;
export default LongFormText;
