import React from 'react';

import styled from 'styled-components';
import GridItem from '@/components/globalComponents/GridItem';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const Grid = ({gridData}) => {
  // console.log(gridData)
return (
<GridContainer>
  {gridData.map((gridItem, index) => 
    <GridItem key={`card-${index}`} content={gridItem}/>
  )}
</GridContainer>
)
}

export default Grid

const GridContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.778vw;
`