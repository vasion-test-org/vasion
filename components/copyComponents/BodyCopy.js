import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from '@/styles/colors';
// import text from '@/styles/text';
const BodyCopy = ({ className, children }) => {
  return <StyledBodyCopy className={className}>{children}</StyledBodyCopy>;
};

export default BodyCopy;

const StyledBodyCopy = styled.div`
  font-family: 'Archivo';
  
  &.body_copy {
    font-weight: 400;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 22px;
    }

    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.528vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.148vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.14vw;
    }
  }
`;