'use client'
import React from 'react';

import styled from 'styled-components';
import GridItem from '@/components/globalComponents/GridItem';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const Grid = ({gridData, alignment}) => {
  // console.log(gridData)
return (
<GridContainer>
  {gridData.map((gridItem, index) => 
    <GridItem key={`card-${index}`} content={gridItem} alignment={alignment}/>
  )}
</GridContainer>
)
}

export default Grid

const GridContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 81.5vw;
  gap: 2.5vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 40px;
  }
  
  ${media.tablet} {
    width: 92.188vw;
    gap: 1.953vw;
  }
  
  ${media.mobile} {
    width: 89.167vw;
    gap: 8.333vw;
  }
`