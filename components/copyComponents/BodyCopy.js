import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from '@/styles/colors';
// import text from '@/styles/text';
const BodyCopy = ({ className, children, alignment }) => {
  return <StyledBodyCopy alignment={alignment} className={className}>{children}</StyledBodyCopy>;
};

export default BodyCopy;

const StyledBodyCopy = styled.div`
  font-family: 'Archivo';
  font-weight: 400;
  text-align: ${props => `${props.alignment}`};

  strong {
      font-weight: 600;
    }

  &.bodySm {
    font-size: 0.972vw;
    line-height: 1.25vw;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
    }

    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
    }

    ${media.mobile} {
      font-size: 3.271vw;
      line-height: 4.206vw;
    }
  }
  
  &.bodyMd {
    font-size: 1.111vw;
    line-height: 1.528vw;

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
    font-size: 1.25vw;
    line-height: 1.667vw;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 24px;
    }

    ${media.tablet} {
      font-size: 1.758vw;
    line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 5.607vw;
    }
  }

  &.bodyXL {
    font-size: 1.597vw;
    line-height: 2.083vw;
    
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