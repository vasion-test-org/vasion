'use client';
import React from 'react';

import styled from 'styled-components';
import colors from 'styles/colors';

import StatItem from '@/components/globalComponents/StatItem';
import media from '@/styles/media';
// import text from 'styles/text';
const Stats = ({ alignment, statsData, toggle_card_style }) => {
  return (
    <StatsContainer card_style={toggle_card_style}>
      {statsData.map((statItem, index) => (
        <StatItem alignment={alignment} key={`stat-item-${index}`} statItem={statItem} />
      ))}
    </StatsContainer>
  );
};

export default Stats;

const StatsContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 81.5vw;
  gap: 3.75vw;
  background: ${(props) => (props.card_style ? colors.lightPurpleGrey : 'unset')};
  padding: 1.625vw 6vw;
  border-radius: 1.25vw;
  ${media.fullWidth} {
    width: 1304px;
    gap: 60px;
    padding: 26px 96px;
    border-radius: 20px;
  }

  ${media.tablet} {
    width: 92.188vw;
    gap: 5.859vw;
    border-radius: 1.953vw;
    padding: 2.539vw 9.375vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    gap: 8.333vw;
    border-radius: 4.167vw;
    padding: 5.417vw 11.25vw;
  }
`;
