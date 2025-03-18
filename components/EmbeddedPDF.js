'use client'
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const EmbeddedPDF = ({ blok }) => {
  return (
    <Wrapper>
      <StyledIframe alt='styled iframe' src={blok.pdf_link} allowFullScreen />
    </Wrapper>
  );
};
export default EmbeddedPDF;

const StyledIframe = styled.iframe`
  width: 62.5vw;
  height: 75vw;

  ${media.fullWidth} {
    width: 900px;
    height: 1200px;
  }
  ${media.tablet} {
    width: 87.891vw;
    height: 97.656vw;
  }
  ${media.mobile} {
    width: 90vw;
    height: 186.916vw;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.125vw;
`
