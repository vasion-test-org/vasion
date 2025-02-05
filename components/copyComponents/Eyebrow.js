import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const Eyebrow = ({ className, children }) => {
  return <StyledEyebrow className={className}>{children}</StyledEyebrow>;
};

export default Eyebrow;

const StyledEyebrow = styled.div`
  text-transform: uppercase;
 
  &.eyebrow {
    font-weight: 700;
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
    font-size: 2.804vw;
    line-height: 4.206vw;
  }
  }

  &.tag {
    font-weight: 600;
    font-size: 0.625vw;
    line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 10px;
      line-height: 12px;
  }

  ${media.tablet} {
    font-size: 0.977vw;
    line-height: 1.172vw;
  }

  ${media.mobile} {
    font-size: 2.336vw;
    line-height: 2.804vw;
  }
  }

  &.tagLight {
    font-weight: 400;
    font-size: 0.625vw;
      line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 10px;
      line-height: 12px;
  }

  ${media.tablet} {
    font-size: 0.977vw;
    line-height: 1.172vw;
  }

  ${media.mobile} {
    font-size: 2.336vw;
    line-height: 2.804vw;
  }
  }
`;
