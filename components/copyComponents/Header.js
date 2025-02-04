import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
// import { storyblokEditable } from '@storyblok/react/rsc';

const Header = ({ as: Tag = 'h1', children }) => {
  return <StyledHeader as={Tag} level={Tag}>{children}</StyledHeader>;
};

export default Header;

const StyledHeader = styled.div`
  font-family: 'Archivo';
  
  ${({ level }) => level === 'h1' && `
    font-weight: 800;
    font-size: 4.028vw;
    line-height: 4.444vw;
    
    ${media.fullWidth} {
      font-size: 58px;
      line-height: 64px;
    }

    ${media.tablet} {
   font-size: 5.664vw;
    line-height: 6.25vw;
    }

    ${media.mobile} {
      font-size: 10.748vw;
      line-height: 12.617vw;
    }
  `}

  ${({ level }) => level === 'h2' && `
   font-weight: 700;
    font-size: 3.194vw;
    line-height: 3.889vw;

    ${media.fullWidth} {
    font-size: 46px;
    line-height: 56px;
    }

    ${media.tablet} {
      font-size: 4.492vw;
    line-height: 5.469vw;
    }

    ${media.mobile} {
      font-size: 7.477vw;
      line-height: 9.346vw;
    }
  `}

  ${({ level }) => level === 'h3' && `
     font-weight: 700;
    font-size: 2.222vw;
    line-height: 2.778vw;

    ${media.fullWidth} {
         font-size: 32px;
    line-height: 40px;
    }

    ${media.tablet} {
        font-size: 3.125vw;
    line-height: 3.906vw;
    }

    ${media.mobile} {
      font-size: 6.075vw;
      line-height: 7.477vw;
    }
  `}

  ${({ level }) => level === 'h4' && `
      font-weight: 700;
    font-size: 6.075vw;
    line-height: 7.477vw;

    ${media.fullWidth} {
        font-size: 6.075vw;
    line-height: 7.477vw;
    }

    ${media.tablet} {
        font-size: 2.539vw;
    line-height: 3.125vw;
    }

    ${media.mobile} {
      font-size: 4.673vw;
      line-height: 5.607vw;
    }
  `}
    ${({ level }) => level === 'h5' && `
      font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    ${media.fullWidth} {
       font-size: 4.673vw;
    line-height: 5.607vw;
    }

    ${media.tablet} {
         font-size: 1.953vw;
    line-height: 2.344vw;
    }

    ${media.mobile} {
         font-size: 4.673vw;
    line-height: 5.607vw;
    }
  `}
`;
