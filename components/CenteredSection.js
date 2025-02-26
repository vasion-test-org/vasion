'use client';
import React, { useContext } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import { useAvailableThemes } from '@/context/ThemeContext';
import { ScreenContext } from '@/components/Providers/Screen';

import Cards from '@/components/centeredSections/Cards';
import Grid from '@/components/centeredSections/Grid';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import Accordion from '@/components/centeredSections/Accordion';
import Stats from "@/components/centeredSections/Stats";
const CenteredSection = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok)
  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper {...storyblokEditable(blok)}>
        <ContentWrapper>
          {blok.centered_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} />
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
        <AttachedComponent>
          {blok.component_type === 'media' && blok?.media && (
            <MediaWrapper {...storyblokEditable(blok.media)}>
              <Image
                images={blok.media?.[0]?.media}
                borderRadius={blok.media?.[0]?.border_radius}
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
        </AttachedComponent>
          {blok.button_position === 'below' &&
            blok?.button_group?.map(($buttonData) => (
              <div
                buttonPosition={blok.button_position}
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
  padding: 3.75vw 0;
  padding: ${(props) =>
    props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '3.75vw 0'};

  ${media.fullWidth} {
    gap: 16px;
    padding: ${(props) =>
      props.spacing === 'default'
        ? '60px 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '60px 0'};
  }

  ${media.tablet} {
    padding: ${(props) =>
      props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '5.859vw 0'};
    gap: 1.563vw;
  }

  ${media.mobile} {
    padding: ${(props) =>
      props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '12.5vw 0'};
    gap: 3.333vw;
  }
`;

export default CenteredSection;
