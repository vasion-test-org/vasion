import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';

const Tooltip = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <TooltipWrapper>
      <TooltipContent>{message}</TooltipContent>
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  pointer-events: none;
`;

const TooltipContent = styled.div`
  ${text.bodySm};
  background-color: ${colors.darkPurple};
  color: ${colors.white};
  padding: 0.5vw 1vw;
  border-radius: 0.25vw;
  white-space: nowrap;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ${media.fullWidth} {
    padding: 8px 16px;
    border-radius: 4px;
  }

  ${media.tablet} {
    padding: 0.781vw 1.563vw;
    border-radius: 0.391vw;
  }
`;

export default Tooltip; 