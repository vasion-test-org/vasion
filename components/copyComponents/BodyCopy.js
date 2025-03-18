'use client'
import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from '@/styles/colors';
// import text from '@/styles/text';
const BodyCopy = ({ className, children}) => {
  return <StyledBodyCopy className={className}>{children}</StyledBodyCopy>;
};

export default BodyCopy;

const StyledBodyCopy = styled.div`
  display: inline-block;
  font-family: 'Archivo';
  font-weight: 400;
  white-space: pre-wrap;

  &.bold {
    font-weight: 600;
  }

  &.bodySm {
    font-size: 0.875vw;
    line-height: 1.125vw;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
    }

    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
    }

    ${media.mobile} {
      font-size: 2.917vw;
      line-height: 3.75vw;
    }
  }
  
  &.bodyMd {
    font-size: 1vw;
    line-height: 1.375vw;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 22px;
    }

    ${media.tablet} {
      font-size: 16px;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.14vw;
    }
  }

    
  &.bodyLrg {
    
    font-size: 1.125vw;
    line-height: 1.5vw;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 24px;
    }

    ${media.tablet} {
      font-size: 1.758vw;
    line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 3.75vw;
      line-height: 4.583vw;
    }
  }

  &.bodyXL {
    font-size: 1.438vw;
      line-height: 1.875vw;
    
    ${media.fullWidth} {
      font-size: 23px;
      line-height: 30px;
    }

    ${media.tablet} {
      font-size: 2.246vw;
      line-height: 2.93vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 5.14vw;
    }
  }
`;