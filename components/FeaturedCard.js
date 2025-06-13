'use client';
import React from 'react';
import media from 'styles/media';
import text from 'styles/text';
import colors from 'styles/colors';
import styled from 'styled-components';
import RichTextRenderer from './renderers/RichTextRenderer';
import Image from './globalComponents/Image';
import Button from './globalComponents/Button';
// import { ReactComponent as ArrowLinkSVG } from "images/linkArrow.svg";

// import Pill from "components/Pill";

const FeaturedCard = ({ blok }) => {
  // console.log(blok);
  const getTagBackgroundColor = (tagContent) => {
    const tagText =
      tagContent?.content?.[0]?.content?.[0]?.text?.toLowerCase() || '';
    if (tagText.includes('trade show')) {
      return 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)';
    }
    if (tagText.includes('conference')) {
      return colors.orange100;
    }
    return 'transparent';
  };

  return (
    <Wrapper spacingOffset={blok.offset_spacing} spacing={blok.section_spacing}>
      <CardWrapper>
        <RichTextRenderer document={blok?.featured_title} />
        <CardInnerWrapper>
          <ImageWrapper>
            <Image images={blok.event_image[0].media} />
          </ImageWrapper>
          <Content>
            <HeaderAndTag>
              <Tag $bgColor={getTagBackgroundColor(blok?.card_tag)}>
                <RichTextRenderer document={blok?.card_tag} />
              </Tag>
              <RichTextRenderer document={blok?.header} />
            </HeaderAndTag>
            <DateAndTime>
              <IconAndText>
                <Icon src='/images/locationOn.webp' alt={'Nav Pin'} />
                <RichTextRenderer document={blok?.location} />
              </IconAndText>
              <IconAndText>
                <Icon src='/images/calendarClock.webp' alt={'Calendar'} />
                <RichTextRenderer document={blok?.date} />
              </IconAndText>
            </DateAndTime>
            <RichTextRenderer document={blok?.body_copy} />
            <Button $buttonData={blok.button[0]} />
          </Content>
        </CardInnerWrapper>
      </CardWrapper>
    </Wrapper>
  );
};
export default FeaturedCard;

const Tag = styled.div`
  border-radius: 1.5vw;
  padding: 0.25vw 0.5vw;
  background: ${(props) => props.$bgColor || 'transparent'};
  width: fit-content;
`;
const ImageWrapper = styled.div`
  /* overflow: hidden; */
  /* width: 28.75vw;
  height: 19.125vw; */
  border-radius: 0.375vw;
`;

const IconAndText = styled.div`
  display: flex;
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
const DateAndTime = styled.div`
  display: flex;
  flex-direction: column;
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

const HeaderAndTag = styled.div`
  display: flex;
  flex-direction: column;
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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;

  ${media.fullWidth} {
    gap: 16px;
  }
  ${media.tablet} {
    gap: 1.563vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
  }
`;

const Icon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }
  ${media.tablet} {
    width: 1.25vw;
    height: 1.25vw;
  }
  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;

const CardInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  margin-top: 2.5vw;
  width: 81.5vw;

  ${media.fullWidth} {
    gap: 32px;
    margin-top: 40px;
    width: 1304px;
  }
  ${media.tablet} {
    gap: 3.125vw;
    margin-top: 3.906vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
    margin-top: 8.333vw;
    flex-direction: column;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
