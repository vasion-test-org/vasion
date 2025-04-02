'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Card from './globalComponents/Card';
import EventCard from './globalComponents/EventCard';
import { horizontalLoop } from '@/functions/horizontalLoop';
import SideArrow from '@/assets/svg/side-arrow.svg';
import colors from '@/styles/colors';
import text from '@/styles/text';
import ResourceCard from './globalComponents/ResourceCard';
const PaginatedCards = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const currentIndex = useRef(0);
  console.log(blok);
  const mappedCards = [];
// console.log(blok.cards)
  for (let i = 0; i < blok.cards.length; i += 6) {
    const chunk = blok.cards.slice(i, i + 6);
    mappedCards.push(
      <CardChunk
        key={`chunk-${i / 6}`}
        card_type={blok.card_type}
        className='cardChunks'
      >
        {chunk.map((card, index) => {
          if (blok.card_type === 'default') {
            return <Card key={`card-${i + index}`} paginated content={card} />;
          } else if (blok.card_type === 'event') {
            return (
              <EventCard
                key={`card-${i + index}`}
                even={index % 2 === 1}
                content={card}
              />
            );
          } else if (blok.card_type === 'resource') {
            return (
              <ResourceCard
                key={`card-${i + index}`}
                paginated
                index={index}
                content={card}
              />
            );
          }
        })}
      </CardChunk>
    );
  }

  const mappedPages = mappedCards.map((page, index) => (
    <PageNumberBlock className='pageNumberBlocks' key={`block-${index}`} id={`block-${index}`}>
      {index + 1}
    </PageNumberBlock>
  ));


  useEffect(() => {
    const cardChunks = gsap.utils.toArray('.cardChunks');
    const totalItems = cardChunks.length;

    const cardsLoop = horizontalLoop(cardChunks, {
      paused: true,
      center: true,
    });

    const pageNavTl = gsap.timeline({});

    document.querySelector('.next').addEventListener('click', () => {
      cardsLoop.next({ duration: 0.4, ease: 'power1.inOut' });
      currentIndex.current = (currentIndex.current + 1) % totalItems;
      pageNavTl
        .to('.pageNumberBlocks', { backgroundColor: 'unset' })
        .to(`#block-${currentIndex.current}`, { backgroundColor: colors.grey100 });
    });

    document.querySelector('.prev').addEventListener('click', () => {
      cardsLoop.previous({ duration: 0.4, ease: 'power1.inOut' });
      currentIndex.current = (currentIndex.current - 1 + totalItems) % totalItems;
      pageNavTl
        .to('.pageNumberBlocks', { backgroundColor: 'unset' })
        .to(`#block-${currentIndex.current}`, { backgroundColor: colors.grey100 });
    });

    const pageNumberBlocks = gsap.utils.toArray('.pageNumberBlocks');
    const pageBlocksTl = gsap.timeline({});

    pageNumberBlocks.forEach((block, index) => {
      block.addEventListener('click', () => {
        cardsLoop.toIndex(index, {
          duration: 0.4,
          ease: 'power1.inOut',
        });
        currentIndex.current = index;
        pageBlocksTl
          .to('.pageNumberBlocks', { backgroundColor: 'unset' })
          .to(`#block-${index}`, { backgroundColor: colors.grey100 });
      });
    });

    return () => {
      document.querySelector('.next').removeEventListener('click', this);
      document.querySelector('.prev').removeEventListener('click', this);
      pageNumberBlocks.forEach((block) => {
        block.removeEventListener('click', this);
      });
    };
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
          spacingOffset={blok.offset_spacing}
          spacing={blok.section_spacing}
      >
        {blok.card_type === 'event' && (
          <EventHeaderContainer>
            <EventHeaders>Events</EventHeaders>
            <EventHeaders>Details</EventHeaders>
          </EventHeaderContainer>
        )}
        <CardsContainer card_type={blok.card_type}>
          {mappedCards}
        </CardsContainer>
        <PaginationDiv>
          <PageNavigation className='prev'>Previous</PageNavigation>
          {mappedPages}
          <PageNavigation className='next'>Next</PageNavigation>
        </PaginationDiv>
      </Wrapper>
    </ThemeProvider>
  );
};

const PageNumberBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5vw;
  height: 1.625vw;
  /* border-right: 1px solid ${colors.txtSubtle}; */
  border-radius: 0.25vw;
`;

const PageNavigation = styled.div`
  padding: 0.75vw 1vw;
  /* border-right: 1px solid ${colors.txtSubtle}; */
`;
const PaginationDiv = styled.div`
  ${text.bodySm};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.grey100};
  border-radius: 0.75vw;
  margin-top: 2vw;

  :last-child {
    border-right: none;
  }
`;

const CardChunk = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.card_type === 'event' ? 'column' : 'row'};
  flex-wrap: ${(props) => (props.card_type === 'event' ? 'nowrap' : 'wrap')};
  gap: ${(props) => (props.card_type === 'event' ? '0' : '1.25vw')};
  min-width: 100%;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625vw;
  overflow: hidden;
  width: 81.5vw;
  padding: 0.313vw;
`;

const EventHeaders = styled.div`
  ${text.bodySmBold};
`;
const EventHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.lightPurpleGrey};
  width: 81.5vw;
  padding: 1.5vw 1vw;
  border-radius: 1vw 1vw 0 0;
  gap: 37.938vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
        ? `${props.spacing}px 0 0`
        : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
        ? `0 0 ${props.spacing}px`
        : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '3.75vw 0';
  }};
  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '60px 0';
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '5.859vw 0';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '12.5vw 0';
    }};
  }
`;
export default PaginatedCards;
