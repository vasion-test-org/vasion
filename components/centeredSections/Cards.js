import React from 'react';

import styled from 'styled-components';
import Card from '@/components/globalComponents/Card';
// import media from 'styles/media';
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.778vw;
`