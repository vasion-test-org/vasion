'use client'
import React from 'react';

import styled from 'styled-components';
import StatItem from '@/components/globalComponents/StatItem';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const Stats = ({statsData, alignment}) => {
  // console.log(gridData)
return (
<StatsContainer>
  {statsData.map((statItem, index) => 
    <StatItem key={`stat-item-${index}`} statItem={statItem} alignment={alignment}/>
  )}
</StatsContainer>
)
}

export default Stats

const StatsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 81.5vw;
  gap: 3.75vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 60px;
  }
  
  ${media.tablet} {
    width: 92.188vw;
    gap: 2.344vw;
  }
  
  ${media.mobile} {
    width: 89.167vw;
    gap: 8.333vw;
  }
`