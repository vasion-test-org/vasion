'use client';
import React from 'react';
import styled from 'styled-components';
import RichTextRenderer from './renderers/RichTextRenderer';
import colors from '@/styles/colors';
import media from '@/styles/media';

const ReviewBadgeCta = ({ blok }) => {
  // console.log(blok);
  return (
    <Wrapper spacingOffset={blok.offset_spacing} spacing={blok.section_spacing}>
      <CardWrapper>
        <CopyDiv>
          {blok.copy.map((item, index) => (
            <RichTextRenderer
              key={`copy-${item._uid || index}`}
              document={item.copy}
            />
          ))}
        </CopyDiv>
        <Badges>
          {blok.badges.map((item, index) => (
            <BadgeArray key={`badge-${item._uid || index}`}>
              {item.media.map((mediaItem, mediaIndex) => (
                <Badge
                  key={`media-${mediaItem._uid || mediaIndex}`}
                  src={mediaItem.filename}
                />
              ))}
            </BadgeArray>
          ))}
        </Badges>
      </CardWrapper>
    </Wrapper>
  );
};

const Badge = styled.img`
  width: 100%;
  height: 100%;

  ${media.mobile} {
    width: 14.583vw;
  }
`;

const BadgeArray = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-right: 0.063vw solid ${colors.mediumPurple};
  padding: 0 2.45vw;
  gap: 0.4vw;

  ${media.fullWidth} {
    border-right: 1px solid ${colors.mediumPurple};
    padding: 0 39px;
    gap: 6px;
  }

  ${media.tablet} {
    border-right: 0.208vw solid ${colors.mediumPurple};
    padding: 0 3.809vw;
    gap: 0.586vw;
  }

  ${media.mobile} {
    border-right: 0.098vw solid ${colors.mediumPurple};
    padding: 0 8.125vw;
    gap: 0.586vw;
  }

  &:last-child {
    border-right: none;
    padding-right: 0;

    ${media.mobile} {
      padding-right: 8.125vw;
    }
  }
`;
const Badges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2.5vw;

  ${media.fullWidth} {
    margin-top: 40px;
  }

  ${media.tablet} {
    margin-top: 3.906vw;
  }

  ${media.mobile} {
    flex-wrap: wrap;
    gap: 2.5vw;
    margin-bottom: 8.333vw;
    margin-top: unset;
  }
`;

const CopyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colors.white};
  background: linear-gradient(
      206deg,
      rgba(255, 255, 255, 0) 67.76%,
      #ffffff 99.07%
    ),
    linear-gradient(143deg, rgba(255, 255, 255, 0) 68.52%, #ffffff 93.57%),
    linear-gradient(150deg, rgba(61, 37, 98, 0) 66.02%, #7e5fdd 100.52%),
    linear-gradient(217deg, rgba(255, 81, 0, 0) 53.9%, #ff5100 132.9%),
    linear-gradient(180deg, #190c30 -0.27%, #3d2562 126.67%);
  background-blend-mode: overlay, overlay, normal, normal, normal;
  border-radius: 1.5vw;
  width: 81.5vw;
  padding: 2.5vw 3.75vw;

  ${media.fullWidth} {
    border-radius: 24px;
    width: 1304px;
    padding: 40px 60px;
  }

  ${media.tablet} {
    width: 92.188vw;
    border-radius: 2.344vw;
    padding: 3.906vw 5.859vw;
  }

  ${media.mobile} {
    flex-direction: column-reverse;
    border-radius: 5vw;
    width: 89.167vw;
    padding: 6.667vw 3.438vw;
    text-align: left;
  }
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
export default ReviewBadgeCta;
