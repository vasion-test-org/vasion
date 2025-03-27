'use client';
import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import { useAvailableThemes } from '@/context/ThemeContext';

import Cards from '@/components/centeredSections/Cards';
import Grid from '@/components/centeredSections/Grid';
import Image from '@/components/globalComponents/Image';
import Video from '@/components/globalComponents/Video';
import Button from '@/components/globalComponents/Button';
import Accordion from '@/components/centeredSections/Accordion';
import Stats from '@/components/centeredSections/Stats';
import Form from './Form';
import Rotator from '@/components/centeredSections/Rotator'
import StackedCards from '@/components/centeredSections/StackedCards'
const CenteredSection = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok);
  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <ContentWrapper>
          {blok.centered_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy?.copy} />
            </div>
          ))}
          {blok.button_position === 'above' &&
            blok?.button_group?.map(($buttonData) => (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData.link_text}
              >
                <Button key={$buttonData.link_text} $buttonData={$buttonData} />
              </div>
            ))}
        </ContentWrapper>
        {blok.component_type !== '' && (
          <AttachedComponent>
            {blok.component_type === 'media' &&
              blok?.media[0].component === 'assets' && (
                <MediaWrapper {...storyblokEditable(blok.media)}>
                  <Image
                    images={blok.media?.[0]?.media}
                    borderradius={blok.media?.[0]?.border_radius}
                  />
                </MediaWrapper>
              )}

            {blok.component_type === 'media' &&
              blok?.media[0].component === 'video_assets' && (
                <MediaWrapper {...storyblokEditable(blok.media)}>
                  <Video
                    videos={blok.media?.[0]?.media}
                    borderradius={blok.media?.[0]?.border_radius}
                    thumbnails={blok.media?.[0]?.thumbnails}
                  />
                </MediaWrapper>
              )}

            {blok.component_type === 'card' && blok.cards && (
              <Cards cardData={blok.cards} />
            )}
            {blok.component_type === 'grid' && blok.grid && (
              <Grid gridData={blok.grid} alignment={blok.grid_alignment} />
            )}
            {blok.component_type === 'stats' && blok.stats && (
              <Stats statsData={blok.stats} alignment={blok.stats_alignment} />
            )}
            {blok.component_type === 'accordion' && blok.accordion && (
              <Accordion accordionData={blok.accordion} />
            )}
                {blok.component_type === 'rotator' && blok.rotator && (
              <Rotator rotatorData={blok.rotator} />
            )}
            {blok.component_type === 'form' && blok.form && (
              <Form blok={blok.form[0]} />
            )}
             {blok.component_type === 'stacked_cards' && blok.stacked_cards && (
              <StackedCards blok={blok.stacked_cards} />
            )}
          </AttachedComponent>
        )}
        {blok.button_position === 'below' &&
          blok?.button_group?.map(($buttonData) => (
            <div
              {...storyblokEditable($buttonData)}
              key={$buttonData.link_text}
            >
              <Button key={$buttonData.link_text} $buttonData={$buttonData} />
            </div>
          ))}
      </CenteredWrapper>
    </ThemeProvider>
  );
};

const AttachedComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 40px 0;

  ${media.fullWidth} {
    margin: 2.5vw 0;
  }

  ${media.tablet} {
    margin: 3.906vw 0;
  }

  ${media.mobile} {
    margin: 8.333vw 0;
  }
`;
const MediaWrapper = styled.div`
  max-width: 67.75vw;

  ${media.fullWidth} {
    max-width: 1084px;
  }

  ${media.tablet} {
    max-width: 92.188vw;
  }

  ${media.mobile} {
    max-width: 89.167vw;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 67.75vw;
  gap: 1vw;
  text-align: center;

  ${media.fullWidth} {
    width: 1084px;
    gap: 16px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    width: 89.167vw;
    gap: 3.333vw;
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  color: ${(props) => props.theme.centered.textColor};

  span {
    color: ${(props) => props.theme.centered.textColor};
  }
  background: ${(props) => props.theme.centered.bg};
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
    gap: 1.563vw;
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
    gap: 3.333vw;
  }
`;

export default CenteredSection;
