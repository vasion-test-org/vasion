import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import { useAvailableThemes } from '@/context/ThemeContext';
import { ScreenContext } from '@/components/Providers/Screen';
import Button from './globalComponents/Button';
import Image from './globalComponents/Image';
const Hero = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok);
  return (
    <ThemeProvider theme={selectedTheme}>
      <HeroBGWrapper>
        <HeroWrapper
          layout={blok.hero_layout}
          gap={blok.gap}
          spacing={blok.section_spacing}
        >
          <ContentWrapper>
            {blok.hero_copy.map((copy) => (
              <div {...storyblokEditable(copy)} key={copy.component}>
                <RichTextRenderer document={copy.copy} />
              </div>
            ))}
            <ButtonRow>
              {blok?.button_group?.map((buttonData) => (
                <div
                  {...storyblokEditable(buttonData)}
                  key={buttonData?.link_text}
                >
                  <Button key={buttonData?.link_text} buttonData={buttonData} />
                </div>
              ))}
            </ButtonRow>
          </ContentWrapper>
          {blok?.hero_asset && (
            <div {...storyblokEditable(blok)}>
              <Image
                images={blok.hero_asset}
                // borderRadius={blok.hero_asset?.[0]?.border_radius}
              />
            </div>
          )}
        </HeroWrapper>
      </HeroBGWrapper>
    </ThemeProvider>
  );
};

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75vw;
  margin-top: 2vw;
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
    
  }

  ${media.mobile} {
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => `${props.layout || 'row'}`};
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.hero.textColor};
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
  }

  ${media.mobile} {
  }
`;

const HeroBGWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.hero.bg};
`;
export default Hero;
