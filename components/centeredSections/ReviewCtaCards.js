import React from 'react';
import styled from 'styled-components';
import RichTextRenderer from '../renderers/RichTextRenderer';
import colors from '@/styles/colors';
import Button from '@/components/globalComponents/Button';

const ReviewCtaCards = ({ blok }) => {
  console.log(blok);
  return (
    <ReviewCardWrapper>
      {blok.map((card) => (
        <ReviewCard key={card.id}>
          <ReviewHeaderDiv>
            <ReviewIcon src={card.icon.filename} alt={card.title} />
            <ReviewHeader>
              <RichTextRenderer document={card.header} />
            </ReviewHeader>
          </ReviewHeaderDiv>
          <RatingDiv>
            <RatingStars src={card.rating.filename} alt={card.rating} />
            {card.link[0] && <Button $buttonData={card.link[0]} />}
          </RatingDiv>
        </ReviewCard>
      ))}
    </ReviewCardWrapper>
  );
};

const RatingStars = styled.img`
  width: auto;
  height: auto;
`;
const RatingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2vw;
`;

const ReviewHeader = styled.div`
  color: ${colors.white};
`;

const ReviewIcon = styled.img`
  width: auto;
  height: auto;
`;

const ReviewHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
  align-items: center;
`;

const ReviewCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: ${colors.darkPurple};
  border-radius: 1.25rem;
  padding: 1.5rem 2rem 1.25rem 2rem;
  width: 25.813rem;
  min-height: 8.25rem;
  transition: background 0.3s ease;
  background-blend-mode: hard-light, hard-light, normal;

  &:hover {
    background: linear-gradient(
        146deg,
        rgba(203, 191, 241, 0) 42.69%,
        rgba(203, 191, 241, 0.7) 98.69%
      ),
      linear-gradient(
        231deg,
        rgba(255, 168, 128, 0) 45.04%,
        rgba(255, 168, 128, 0.7) 112.57%
      ),
      #201435;
  }
`;

const ReviewCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;

export default ReviewCtaCards;
