'use client'
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const Embed = ({ blok }) => {
  return (
    <Wrapper>
      <StyledIframe alt='styled iframe' src={blok.embed_link} allowFullScreen />
    </Wrapper>
  );
};
export default Embed;

const StyledIframe = styled.iframe`
  width: 81.5vw;
  height: 100%;
  border: none;
 
  ${media.fullWidth} {
    width: 1304px;
    
  }
  ${media.tablet} {
    width: 87.891vw;
   
  }
  ${media.mobile} {
    /* width: 90vw; */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.75vw;
  height: 56.25vw;

  ${media.fullWidth} {
    padding: 60px;
    height: 900px;
  }

  ${media.tablet} {
    padding: 5.859vw;
    height: 75vw;
  }
  
  ${media.mobile} {
    /* padding: 12.5vw;
    height: 95vw; */
    display: none;
  }
`
