'use client'
import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import { useAvailableThemes } from '@/context/ThemeContext';
import { ScreenContext } from '@/components/Providers/Screen';
import Button from '@/components/globalComponents/Button';
import Image from '@/components/globalComponents/Image';
const Hero = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  let customTheme = blok.custom_theme?.[0] || {};
  if (!blok.custom_theme_builder) {
    customTheme = undefined;
  }

  // console.log( blok);
  return (
    <ThemeProvider theme={{ ...selectedTheme, customtheme: customTheme }}>
      <HeroBGWrapper>
        <HeroWrapper
          layout={blok.hero_layout}
          gap={blok.gap}
          spacing={blok.section_spacing}
        >
          <ContentWrapper>
            {blok.hero_copy.map((copy) => (
              <div {...storyblokEditable(copy)} key={copy.component}>
                <RichTextRenderer
                  document={copy.copy}
                  responsiveTextStyles={copy.responsive_text_styles}
                />
              </div>
            ))}
            <ButtonRow>
              {blok?.button_group?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button
                    key={$buttonData?.link_text}
                    $buttonData={$buttonData}
                  />
                </div>
              ))}
            </ButtonRow>
          </ContentWrapper>
          {blok?.hero_asset && (
            <ImageWrapper {...storyblokEditable(blok)}>
              <Image
                images={blok.hero_asset}
                // borderRadius={blok.hero_asset?.[0]?.border_radius}
              />
            </ImageWrapper>
          )}
        </HeroWrapper>
      </HeroBGWrapper>
    </ThemeProvider>
  );
};

const ImageWrapper = styled.div`
  max-width: 37.5vw;

  ${media.fullWidth} {
    max-width: 600px;
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75vw;
  margin-top: 2vw;

  ${media.fullWidth} {
    gap: 12px;
    margin-top: 32px;
  }

  ${media.tablet} {
    gap: 1.172vw;
    margin-top: 3.125vw;
  }

  ${media.mobile} {
    gap: 2.5vw;
    margin-top: 6.667vw;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: clamp(27.75vw, 100%, 54.75vw);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.25vw;
  }

  .eyebrow {
    margin-bottom: 0.75vw;
  }

  ${media.fullWidth} {
    width: clamp(444px, 100%, 876px);
  }

  ${media.tablet} {
    width: clamp(39.453vw, 100%, 58.984vw);
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => `${props.layout || 'row'}`};
  align-items: center;
  justify-content: space-between;
  color: ${(props) =>
    props.theme.customtheme?.text_color?.value || props.theme.hero.textColor};
  padding: ${(props) =>
    props.spacing === 'default'
      ? '6vw 9.25vw'
      : props.spacing
      ? `calc(${props.spacing} / 1600 * 100vw) 9.25vw`
      : '6vw 9.25vw'};

  gap: ${(props) =>
    props.gap === 'default'
      ? '3.75vw'
      : props.gap
      ? `calc(${props.gap} / 1600 * 100vw)`
      : '3.75vw'};

  ${media.fullWidth} {
    max-width: 1600px;
    padding: ${(props) =>
      props.spacing === 'default'
        ? '96px 148px'
        : props.spacing
        ? `${props.spacing}px 148px`
        : '96px 148px'};
    gap: ${(props) =>
      props.gap === 'default' ? '60px' : props.gap ? `${props.gap}px` : '60px'};
  }

  ${media.tablet} {
    max-width: 100%;
    padding: ${(props) =>
      props.spacing === 'default'
        ? '5.859vw 3.906vw'
        : props.spacing
        ? `calc(${props.spacing} / 1024 * 100vw) 3.906vw`
        : '5.859vw 3.906vw'};
    gap: ${(props) =>
      props.gap === 'default'
        ? '3.906vw'
        : props.gap
        ? `${props.gap}px`
        : '3.906vw'};
  }

  ${media.mobile} {
    flex-direction: column-reverse;
    max-width: 100%;
    padding: ${(props) =>
      props.spacing === 'default'
        ? '5.417vw'
        : props.spacing
        ? `calc(${props.spacing} / 480 * 100vw) 5.417vw`
        : '5.417vw'};
    gap: ${(props) =>
      props.gap === 'default'
        ? '5.417vw'
        : props.gap
        ? `${props.gap}px`
        : '5.417vw'};
  }
`;

const HeroBGWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.theme.customtheme?.background_color?.value || props.theme.hero.bg};
`;
export default Hero;
