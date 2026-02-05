import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled from 'styled-components';

import Button from '@/components/globalComponents/Button';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

import RichTextRenderer from '../renderers/RichTextRenderer';

const EventCard = ({ content, even }) => {
  const getTagStyles = (tagContent) => {
    const tagText = tagContent?.content?.[0]?.content?.[0]?.text?.toLowerCase() || '';
    if (tagText.includes('trade show')) {
      return {
        background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)',
        color: colors.pink,
      };
    }
    if (tagText.includes('conference')) {
      return {
        background: colors.orange100,
        color: colors.primaryOrange,
      };
    }
    return {
      background: 'transparent',
      color: 'inherit',
    };
  };

  return (
    <Wrapper {...storyblokEditable(content)} even={even}>
      <EventInfoContainer>
        <EventImage src={content.icon.filename} />
        <EventContent>
          <HeaderContainer {...storyblokEditable(content.header)}>
            <RichTextRenderer document={content.header} />
            {content.tag && (
              <Tag $styles={getTagStyles(content.tag)}>
                <RichTextRenderer document={content.tag} />
              </Tag>
            )}
          </HeaderContainer>
          <RichTextRenderer document={content.event_summary} />
        </EventContent>
      </EventInfoContainer>
      <DetailsContainer>
        <Details>
          <DetailDiv>
            <DetailIcon src="/images/locationOn.webp" />
            <RichTextRenderer document={content.location} />
          </DetailDiv>
          <DetailDiv>
            <DetailIcon src="/images/calendarClock.webp" />
            <RichTextRenderer document={content.date} />
          </DetailDiv>
        </Details>
        {content.link[0] && <Button $buttonData={content.link[0]} />}
      </DetailsContainer>
    </Wrapper>
  );
};

const DetailIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;
const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column;
    gap: 1.667vw;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
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
const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 25.125vw;
  gap: 0.5vw;

  ${media.fullWidth} {
    width: 402px;
    gap: 8px;
  }

  ${media.mobile} {
    width: 100%;
    gap: 1.667vw;
  }
`;
const EventImage = styled.img`
  width: 3.625vw;
  height: 3.625vw;

  ${media.fullWidth} {
    width: 58px;
    height: 58px;
  }

  ${media.mobile} {
    display: none;
  }
`;
const EventInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1vw;

  ${media.fullWidth} {
    gap: 16px;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 3.333vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => (props.even ? colors.lightPurpleGrey : colors.white)};
  width: 100%;
  padding: 2vw 1.5vw;
  gap: 16.25vw;

  ${media.fullWidth} {
    padding: 32px 24px;
    gap: 260px;
  }

  ${media.tablet} {
    padding: 3.125vw 2.344vw;
    gap: 25.391vw;
  }

  ${media.mobile} {
    align-items: flex-start;
    flex-direction: column;
    padding: 6.667vw 5vw;
    gap: 3.333vw;
  }
`;

const Tag = styled.div`
  border-radius: 1.5vw;
  padding: 0.25vw 0.5vw;
  background: ${(props) => props.$styles.background};
  color: ${(props) => props.$styles.color};
  width: fit-content;

  p {
    color: inherit;
  }
`;

export default EventCard;
