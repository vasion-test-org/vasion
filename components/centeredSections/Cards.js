import React from 'react';

import styled from 'styled-components';
import Card from '@/components/globalComponents/Card';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const Cards = ({cardData}) => {
  // console.log(cardData)
return (
<CardsContainer>
  {cardData.map((card, index) => 
    <Card key={`card-${index}`} content={card}/>
  )}
</CardsContainer>
)
}

export default Cards

const CardsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
  width: 95.125vw;

  ${media.fullWidth} {
    gap: 40px;
  width: 1522px;
  }
  
  ${media.tablet} {
    gap: 2.344vw;
    width: 92.188vw;
  }
  
  ${media.mobile} {
    gap: 5vw;
    width: 89.167vw;
  }
`