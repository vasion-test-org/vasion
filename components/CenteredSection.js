'use client';
import React, { useContext } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import Cards from '@/components/centeredSections/Cards';
import IconCards from '@/components/IconCards';
import Grid from '@/components/centeredSections/Grid';
import Image from '@/components/globalComponents/Image';
import Video from '@/components/globalComponents/Video';
import Button from '@/components/globalComponents/Button';
import Accordion from '@/components/centeredSections/Accordion';
import Stats from '@/components/centeredSections/Stats';
import Form from './Form';
import Rotator from '@/components/centeredSections/Rotator';
import StackedCards from '@/components/centeredSections/StackedCards';
import Badges from '@/components/centeredSections/Badges';
import BadgesMobile from '@/components/centeredSections/BadgesMobile';
import { ScreenContext } from '@/components/providers/Screen';
import LogosGallery from '@/components/centeredSections/LogosGallery';
import ReviewCtaCards from '@/components/centeredSections/ReviewCtaCards';

const CenteredSection = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const { mobile } = useContext(ScreenContext);
  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper
        data-anchor-id={blok.anchor_id}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        backgroundImage={blok.background_image?.[0]?.filename}
        {...storyblokEditable(blok)}
      >
        {(blok.centered_copy || blok.button_group) && (
          <ContentWrapper>
            {blok.centered_copy &&
              blok.centered_copy.map((copy) => (
                <div {...storyblokEditable(copy)} key={copy.component}>
                  <RichTextRenderer
                    document={copy?.copy}
                    responsiveTextStyles={copy?.responsive_text_styles}
                    gradientText={copy?.gradient}
                  />
                </div>
              ))}
            {blok.button_position === 'above' &&
              blok?.button_group?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData.link_text}
                >
                  <Button
                    key={$buttonData.link_text}
                    $buttonData={$buttonData}
                  />
                </div>
              ))}
          </ContentWrapper>
        )}
        {blok.component_type !== '' && (
          <AttachedComponent>
            {blok.component_type === 'media' &&
              blok?.media[0].component === 'assets' && (
                <CustomSizing custom_size={blok.smaller_assets}>
                  <MediaWrapper {...storyblokEditable(blok.media)}>
                    <Image
                      images={blok.media?.[0]?.media}
                      borderradius={blok.media?.[0]?.border_radius}
                    />
                  </MediaWrapper>
                </CustomSizing>
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
            {blok.component_type === 'icon_cards' && blok.icon_cards && (
              <IconCards blok={blok.icon_cards} />
            )}
            {blok.component_type === 'card' && blok.cards && (
              <Cards cardData={blok.cards} />
            )}
            {blok.component_type === 'grid' && blok.grid && (
              <Grid gridData={blok.grid} alignment={blok.grid_alignment} />
            )}
            {blok.component_type === 'stats' && blok.stats && (
              <Stats
                statsData={blok.stats}
                toggle_card_style={blok.card_style}
                alignment={blok.stats_alignment}
              />
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
            {blok.component_type === 'logo_gallery' && blok.logo_gallery && (
              <LogosGallery logoData={blok.logo_gallery} />
            )}
            {blok.component_type === 'stacked_cards' && blok.stacked_cards && (
              <StackedCards blok={blok.stacked_cards} />
            )}
            {blok.component_type === 'badges' && blok.badges && (
              <>
                {mobile ? (
                  <BadgesMobile badges={blok?.badges?.[0]} />
                ) : (
                  <Badges badges={blok?.badges?.[0]} />
                )}
              </>
            )}
            {blok.component_type === 'review_cta' && blok.review_cta && (
              <ReviewCtaCards blok={blok.review_cta} />
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
const CustomSizing = styled.div`
  display: flex;
  width: ${(props) => (props.custom_size ? '38.875vw ' : 'unset')};
  height: auto;

  ${media.fullWidth} {
    width: ${(props) => (props.custom_size ? '622px ' : 'unset')};
  }
  ${media.tablet} {
    width: ${(props) => (props.custom_size ? '49.609vw ' : 'unset')};
  }
  ${media.mobile} {
    width: ${(props) => (props.custom_size ? '89.167vw ' : 'unset')};
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
    align-self: centered;
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
  background: ${(props) =>
    props.backgroundImage
      ? `url(${props.backgroundImage})`
      : props.theme.centered.bg};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  span {
    color: ${(props) => props.theme.centered.textColor};
  }

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
