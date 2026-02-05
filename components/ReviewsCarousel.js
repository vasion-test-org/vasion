'use client';

import React, { useEffect } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import { horizontalLoop } from 'functions/horizontalLoop';
import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

import RichTextRenderer from './renderers/RichTextRenderer';

const ReviewsCarousel = ({ blok }) => {
  const redditReviews = blok?.reviews;
  const statsList = blok?.stats;

  const hasStats = statsList && statsList?.length > 0;

  const clonedReviews = [...redditReviews, ...redditReviews, ...redditReviews];
  const clonedStats = hasStats ? [...statsList, ...statsList, ...statsList] : [];
  const dragReviews = clonedReviews.map((rev, index) => {
    const hasValidLink = rev.link?.[0]?.link_url?.url;

    return (
      <ReviewItem
        {...(hasValidLink && {
          href: rev.link[0].link_url.url,
          rel: 'noopener noreferrer',
          target: '_blank',
        })}
        className="reviewItems"
        haslink={hasValidLink}
        key={index}
      >
        {<Stars alt={'Five Star Rating'} src="/images/HomepageStars.webp" />}
        <div {...storyblokEditable(rev)}>
          <RichTextRenderer document={rev?.body_copy} />
        </div>
        {rev?.body_copy_attribution && (
          <AttributionDiv>
            <RichTextRenderer document={rev.body_copy_attribution} />
          </AttributionDiv>
        )}

        <RedditTextContainer>
          {hasValidLink && (
            <>
              <div {...storyblokEditable(rev.link[0].link_text)}>
                <RedditText> {rev.link[0].link_text}</RedditText>
              </div>
              <RedditOpener alt={'compose-new-tab'} src="/images/RedditNewTab.webp" />
            </>
          )}
        </RedditTextContainer>
      </ReviewItem>
    );
  });

  const dragStats = hasStats
    ? clonedStats.map((statItem, index) => {
        return (
          <StatDiv className={'statsDraggable'} key={index}>
            <StyledStat>{statItem?.stat}</StyledStat>
            <div {...storyblokEditable(statItem)}>
              <RichTextRenderer document={statItem.copy[0].copy} />
            </div>
          </StatDiv>
        );
      })
    : null;

  useEffect(() => {
    const initCarousel = async () => {
      const [{ default: gsap }, { default: Draggable }, { default: InertiaPlugin }] =
        await Promise.all([import('gsap'), import('gsap/Draggable'), import('gsap/InertiaPlugin')]);

      gsap.registerPlugin(Draggable, InertiaPlugin);

      horizontalLoop(`.reviewItems`, {
        deep: true,
        draggable: true,
        paddingRight: 0,
        repeat: -1,
        speed: 0.6,
      });

      if (hasStats) {
        horizontalLoop(`.statsDraggable`, {
          paddingRight: 10,
          repeat: -1,
          // draggable: true,
          speed: 0.3,
        });
      }
    };

    initCarousel();
  }, [hasStats]);

  return (
    <SpacingWrapper spacing={blok.section_spacing} spacingOffset={blok.offset_spacing}>
      <Wrapper id="reddit-reviews">
        <HeaderContainer spacing={blok.section_spacing} spacingOffset={blok.offset_spacing}>
          <div {...storyblokEditable(blok)}>
            <RichTextRenderer document={blok?.header} />
          </div>
          <div {...storyblokEditable(blok)}>
            <RichTextRenderer document={blok?.subheader} />
          </div>
        </HeaderContainer>
        <VisibleContainer>
          <BlurLeft />
          <BlurRight />
          <MasonryBlocks>{dragReviews}</MasonryBlocks>
        </VisibleContainer>

        {/* Conditionally render the stats section */}
        {hasStats && (
          <ByTheNumbers>
            <BlurStatLeft />
            <BlurStatRight />
            <BottomHeaderWrapper>
              <div {...storyblokEditable(blok)}>
                <RichTextRenderer document={blok?.bottom_section_header} />
              </div>
            </BottomHeaderWrapper>
            <VisibleStatsContainer>
              {dragStats}
              <DecorativeStroke className="decorative-stroke">
                <LineDecoration />
                <VasionStar alt={'vasion-star-logo'} src="/images/DraggableWhiteVasionStar.webp" />
              </DecorativeStroke>
            </VisibleStatsContainer>
          </ByTheNumbers>
        )}
      </Wrapper>
    </SpacingWrapper>
  );
};

export default ReviewsCarousel;

const AttributionDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const RedditOpener = styled.img`
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
const RedditText = styled.p`
  ${text.tag};
`;
const RedditTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 0.5vw;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${media.fullWidth} {
    gap: 8px;
  }
  ${media.tablet} {
    gap: 0.781vw;
  }
  ${media.mobile} {
    display: none;
    gap: 1.667vw;
  }
`;

const VasionStar = styled.img`
  align-self: center;
  width: 3vw;
  height: 3vw;

  ${media.fullWidth} {
    width: 48px;
    height: 48px;
  }
  ${media.tablet} {
    width: 4.688vw;
    height: 4.688vw;
  }
  ${media.mobile} {
    width: 10vw;
    height: 10vw;
  }
`;
const LineDecoration = styled.div`
  background-color: ${colors.ghostGrey};
  width: 78.25vw;
  height: 0.063vw;
  ${media.fullWidth} {
    width: 1252px;
    height: 1px;
  }
  ${media.tablet} {
    width: 87.109vw;
    height: 0.098vw;
  }
  ${media.mobile} {
    width: 78.333vw;
    height: 0.208vw;
  }
`;
const DecorativeStroke = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  align-self: center;
  z-index: 9;
  right: 10.563vw;
  bottom: 3.75vw;
  gap: 0.25vw;
  ${media.fullWidth} {
    right: 169px;
    bottom: 60px;
    gap: 4px;
  }

  ${media.tablet} {
    right: 3.906vw;
    bottom: 5.859vw;
    gap: 0.391vw;
  }
  ${media.mobile} {
    right: 7.292vw;
    bottom: 8.333vw;
    gap: 4px;
  }
`;
const StatBody = styled.p`
  ${text.bodySm};
  text-align: flex-start;
  align-self: flex-start;
`;
const StyledStat = styled.p`
  ${text.stat};
  color: ${colors.primaryOrange};
`;
const StatDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: flex-start;
  min-width: 14.375vw;
  ${media.fullWidth} {
    min-width: 220px;
  }
  ${media.tablet} {
    min-width: 21.484vw;
  }
  ${media.mobile} {
    min-width: 45.833vw;
  }
`;
const BlurStatLeft = styled.div`
  position: absolute;
  width: 375px;
  height: 100%;
  transform: rotate(90deg);
  left: -3.292vw;
  top: 2.847vw;
  background: linear-gradient(0deg, #190c31 0.24%, rgba(25, 12, 49, 0) 99.76%);
  z-index: 8;

  ${media.fullWidth} {
    left: -146px;
    bottom: 145px;

    width: 482px;
    height: 191px;
    top: unset;
  }
  ${media.tablet} {
    width: 38.715vw;
    height: 9.961vw;
    left: -13.547vw;
    bottom: 11.426vw;
    top: unset;
  }

  ${media.mobile} {
    top: unset;
    width: 63.958vw;
    height: 37.792vw;
    left: -24.583vw;
    bottom: 12.583vw;
    background: linear-gradient(0deg, #190c31 0.24%, rgba(25, 12, 49, 0) 99.76%);
  }
`;

const BlurStatRight = styled.div`
  position: absolute;
  width: 24.563vw;
  height: 94%;
  transform: rotate(-90deg);
  right: -1.069vw;
  top: 1.472vw;
  z-index: 8;
  background: linear-gradient(0deg, #190c31 0.12%, rgba(25, 12, 49, 0) 99.89%);

  ${media.fullWidth} {
    right: -146px;
    bottom: 145px;
    width: 482px;
    height: 191px;
    top: unset;
  }
  ${media.tablet} {
    width: 38.715vw;
    height: 9.961vw;
    right: -13.547vw;
    bottom: 11.426vw;
    top: unset;
  }
  ${media.mobile} {
    width: 63.958vw;
    height: 36.792vw;
    right: -24.583vw;
    bottom: 13.583vw;
    top: unset;
    background: linear-gradient(0deg, #190c31 0.24%, rgba(25, 12, 49, 0) 99.76%);
  }
`;

const VisibleStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: hidden;
  width: 100%;
  gap: 6vw;
  ${media.fullWidth} {
    gap: 96px;
    padding: 20px;
  }
  ${media.tablet} {
    gap: 5.859vw;
    padding: 1.953vw;
  }
  ${media.mobile} {
    gap: 5vw;
    padding: 4.167vw;
  }
`;
const BottomHeaderWrapper = styled.div`
  display: flex;
  align-self: start;
  z-index: 8;
  padding: 0vw 13.625vw;

  ${media.fullWidth} {
    padding: 0px 218px;
  }
  ${media.tablet} {
    padding: 0vw 6.506vw;
  }
  ${media.mobile} {
    padding: 0px 26px;
  }
`;

const ByTheNumbers = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: center;
  background: linear-gradient(180deg, #190c31 0%, #352665 100%);
  gap: 2.5vw;
  width: 100vw;
  height: 22.875vw;
  overflow: hidden;
  ${media.fullWidth} {
    gap: 40px;
    width: 1600px;
    height: 366px;
  }
  ${media.tablet} {
    gap: 3.906vw;
    width: 100vw;
    height: 35.742vw;
  }
  ${media.mobile} {
    gap: 6.667vw;
    width: 100vw;
    height: 60.833vw;
  }
`;
const Stars = styled.img`
  width: 19.875vw;
  height: 1.5vw;
  ${media.fullWidth} {
    width: 318px;
    height: 24px;
  }
  ${media.tablet} {
    width: 31.055vw;
    height: 2.344vw;
  }
  ${media.mobile} {
    width: 66.25vw;
    height: 5vw;
  }
`;
const ReviewItem = styled.a`
  cursor: ${(props) => (props.haslink ? 'pointer' : 'default')};
  display: flex;
  flex-direction: column;
  color: ${colors?.white};
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.25vw 0.375vw rgba(0, 0, 0, 0.1);
  flex: 1;
  border: 0.037vw solid #7e5fdd;
  width: 23.875vw;
  padding: 2vw;
  gap: 1.625vw;
  background: #3d2562;
  border-radius: 1.25vw;
  @media (hover: hover) {
    &:hover {
      ${RedditTextContainer} {
        opacity: 1;
      }
    }
  }

  ${media.fullWidth} {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 0px solid #7e5fdd;
    width: 382px;
    padding: 32px;
    gap: 26px;
    background: #3d2562;
    border-radius: 20px;
  }
  ${media.tablet} {
    width: 31.055vw;
    padding: 3.125vw;
    background: #3d2562;
    border-radius: 1.953vw;
    border: 0.059vw solid #7e5fdd;
    box-shadow: 0 0.391vw 0.586vw rgba(0, 0, 0, 0.1);
    gap: 2.539vw;
  }
  ${media.mobile} {
    width: 79.583vw;
    padding: 6.667vw;
    background: #3d2562;
    border-radius: 4.167vw;
    border: 0.125vw solid #7e5fdd;
    box-shadow: 0 0.833vw 1.25vw rgba(0, 0, 0, 0.1);
    gap: 5.417vw;
    &:hover {
      ${RedditTextContainer} {
        opacity: unset;
        display: none;
      }
    }
  }
`;
const MasonryBlocks = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: max-content;
  gap: 1.25vw;
  padding: 1.25vw;
  ${media.fullWidth} {
    gap: 20px;
    padding: 20px;
  }
  ${media.tablet} {
    gap: 1.953vw;
    padding: 1.953vw;
  }
  ${media.mobile} {
    gap: 4.167vw;
    padding: 4.167vw;
  }
`;

const BlurLeft = styled.div`
  position: absolute;
  transform: rotate(90deg);
  background: linear-gradient(0deg, #190c31 0.12%, rgba(25, 12, 49, 0) 99.89%);

  z-index: 8;
  position: absolute;
  left: -41.056vw;
  top: 2.361vw;
  bottom: 83px;
  width: 100%;
  height: 302px;

  ${media.fullWidth} {
    bottom: 122px;
    height: 257px;
    left: -673px;
    top: unset;
  }
  ${media.tablet} {
    height: 26.098vw;
    left: -36.297vw;
    bottom: 8.5vw;
  }
  ${media.mobile} {
    height: 23.792vw;
    left: -38.875vw;
    top: unset;
    width: 100%;
    bottom: 29.792vw;
    background: linear-gradient(0deg, #190c31 0.24%, rgba(25, 12, 49, 0) 83.88%);
  }
`;

const BlurRight = styled.div`
  position: absolute;
  transform: rotate(-90deg);
  z-index: 8;
  background: linear-gradient(1deg, #190c31 0.9%, rgba(25, 12, 49, 0) 99.16%);
  right: -41.056vw;
  bottom: 5.764vw;
  width: 100%;
  height: 302px;

  ${media.fullWidth} {
    background: linear-gradient(1deg, #190c31 0.9%, rgba(25, 12, 49, 0) 99.16%);
    right: -650px;
    bottom: 99px;
    height: 302px;
  }

  ${media.tablet} {
    background: linear-gradient(1deg, #190c31 0.9%, rgba(25, 12, 49, 0) 99.16%);
    height: 26.098vw;
    right: -36.613vw;
    bottom: 8.496vw;
  }

  ${media.mobile} {
    height: 23.792vw;
    transform: rotate(-90deg);
    right: -38.875vw;
    width: 100%;
    bottom: 29.792vw;
    background: linear-gradient(0deg, #190c31 0.24%, rgba(25, 12, 49, 0) 83.88%);
  }
`;

const ReviewText = styled.div`
  ${text.bodyMd};
  ${media.mobile} {
    ${text.bodyMLarge};
  }
`;
const VisibleContainer = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  overflow: hidden;
  width: 100vw;
  height: 38.5vw;
  margin-bottom: 6vw;

  ${media.fullWidth} {
    width: 1600px;
    height: 500px;
    margin-bottom: 96px;
  }

  ${media.tablet} {
    height: 42.969vw;
    width: 100vw;
    margin-bottom: 5.859vw;
  }

  ${media.mobile} {
    width: 100vw;
    height: 91.667vw;
    margin-bottom: 13.75vw;
  }
`;

const Subheader = styled.p`
  ${text.subtle};
  color: ${colors.txtSubtle};
`;

const Header = styled.h2`
  ${text.h2};
  width: 69.75vw;
  align-self: center;
  ${media.fullWidth} {
    width: 1084px;
  }
  ${media.tablet} {
    width: 92.188vw;
  }
  ${media.mobile} {
    width: 89.167vw;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  margin-bottom: 1.25vw;
  width: 67.75vw;
  align-items: center;
  text-align: center;
  ${media.fullWidth} {
    width: 1084px;
    gap: 16px;
    margin-bottom: 20px;
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 80vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 100%;
  color: ${colors?.white};
  background-color: ${colors.redditPurple};
  padding-top: 96px;

  ${media.fullWidth} {
    padding-top: 96px;
    width: 99.35vw;
  }
  ${media.tablet} {
    padding-top: 5.859vw;
  }
  ${media.mobile} {
    padding-top: 8.333vw;
  }
`;

const SpacingWrapper = styled.div`
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
    gap: 16px;
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
