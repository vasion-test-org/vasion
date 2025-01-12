import { render, MARK_STYLED } from 'storyblok-rich-text-react-renderer';
import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const RichTextRenderer = ({ document, centered }) => {
  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      // if (className === 'eyebrow') {
      //   return <Eyebrow>{children}</Eyebrow>;
      // }
      // Add more class mappings as needed
      return (
        <RichText centered={centered} className={className}>
          {children}
        </RichText>
      );
    },
  };

  return <div>{render(document, { markResolvers: customMarkResolvers })}</div>;
};

export default RichTextRenderer;

const RichText = styled.div`
  width: ${(props) => (props.centered ? '75.278vw' : 'auto')};
  text-align: ${(props) => (props.centered ? 'center' : 'left')};

  &.bodyMd {
    font-family: 'Archivo';
    font-style: normal;
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

  &.eyebrow {
    font-family: 'Archivo';
    text-transform: uppercase;
    font-weight: 700;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 2.8px;
    }

    ${media.desktop} {
      font-size: 0.972vw;
      line-height: 1.25vw;
      letter-spacing: 0.188vw;
    }

    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
      letter-spacing: 0.293vw;
    }

    ${media.mobile} {
      font-size: 2.804vw;
      line-height: 4.206vw;
      letter-spacing: 0.701vw;
    }
  }

  h3 {
    font-family: 'Archivo Bold';
    font-style: normal;
    font-weight: 700;

    ${media.fullWidth} {
      font-size: 32px;
      line-height: 40px;
    }

    ${media.desktop} {
      font-size: 2.222vw;
      line-height: 2.778vw;
    }

    ${media.tablet} {
      font-size: 3.125vw;
      line-height: 3.906vw;
    }

    ${media.mobile} {
      font-size: 6.075vw;
      line-height: 7.477vw;
    }
  }
`;
