'use client';
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import text from '@/styles/text';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import Button from '@/components/globalComponents/Button';
const StatItem = ({ statItem }) => {
  return (
    <StatItemContainer {...storyblokEditable(statItem)}>
      <Stat>{statItem.stat}</Stat>
      <RichTextRenderer document={statItem.copy[0].copy} />
      {statItem.link[0] && (
        <ButtonContainer>
          <Button
            key={statItem.link[0].link_text}
            $buttonData={statItem.link[0]}
          />
        </ButtonContainer>
      )}
    </StatItemContainer>
  );
};
const ButtonContainer = styled.div``;
const Stat = styled.p`
  ${text.stat};
  color: ${colors.primaryOrange};
`;
const StatItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  width: 14.563vw;
  height: 12.75vw;
  gap: 1.5vw;

  ${media.fullWidth} {
    width: 233px;
    height: 204px;
    gap: 24px;
  }

  ${media.tablet} {
    width: 13.965vw;
    height: 19.336vw;
  }

  ${media.mobile} {
    width: 66.667vw;
    height: 37.917vw;
  }
`;
export default StatItem;
