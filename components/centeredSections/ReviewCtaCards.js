import React from 'react';
import styled from 'styled-components';
import RichTextRenderer from '../renderers/RichTextRenderer';
import colors from '@/styles/colors';
import Button from '@/components/globalComponents/Button';
import media from '@/styles/media';

const ReviewCtaCards = ({ blok }) => {

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

  ${media.fullWidth} {
    margin-top: 32px;
  }

  ${media.tablet} {
    margin-top: 3.125vw;
  }

  ${media.mobile} {
    margin-top: 6.667vw;
  }
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
  align-items: center;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;

const ReviewCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: ${colors.darkPurple};
  border-radius: 1.25vw;
  padding: 1.5vw 2vw 1.25vw 2vw;
  width: 25.813vw;
  min-height: 8.25vw;
  transition: background 0.3s ease;
  background-blend-mode: hard-light, hard-light, normal;

  ${media.fullWidth} {
    width: 413px;
    min-height: 132px;
    border-radius: 20px;
    padding: 24px 32px 20px 32px;
  }

  ${media.tablet} {
    width: 28.613vw;
    min-height: 12.891vw;
    border-radius: 1.953vw;
    padding: 2.344vw 3.125vw 1.953vw 3.125vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    min-height: 27.5vw;
    border-radius: 4.167vw;
    padding: 5vw 6.667vw 4.167vw 6.667vw;
  }

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

  ${media.fullWidth} {
    gap: 32px;
  }

  ${media.tablet} {
    gap: 3.125vw;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 6.667vw;
  }
`;

export default ReviewCtaCards;
