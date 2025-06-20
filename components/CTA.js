'use client';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from '@/components/globalComponents/Button';
import LightboxBtn from '@/components/LightboxButton';
import useMedia from '@/functions/useMedia';

const CTA = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const bgimg = useMedia(
    blok?.image?.[0],
    blok?.image?.[0],
    blok?.image?.[1] || blok?.image?.[0],
    blok?.image?.[2] || blok?.image?.[0]
  );
  const pillBgimg = useMedia(
    blok?.background_image?.[0],
    blok?.background_image?.[0],
    blok?.background_image?.[1] || blok?.background_image?.[0],
    blok?.background_image?.[2] ||
      blok?.background_image?.[0] ||
      blok?.background_image?.[0]
  );

  // console.log(blok);
  return (
    <ThemeProvider theme={selectedTheme}>
      <PillContainer
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
      >
        <CtaWrapper
          $bgimg={bgimg?.filename}
          $pillbgimg={pillBgimg?.filename}
          $ctastyle={blok.cta_style}
          $fullwidth={blok.fullwidth}
          {...storyblokEditable(blok)}
        >
          <ContentWrapper
            $ctastyle={blok.cta_style}
            $pillbgimg={pillBgimg?.filename}
          >
            {blok.copy_sections.map((copy) => (
              <div key={copy.component} {...storyblokEditable(copy)}>
                <RichTextRenderer
                  className={copy.component}
                  document={copy.copy}
                  $centered
                />
              </div>
            ))}
          </ContentWrapper>
          {blok?.button_group?.map(($buttonData) =>
            $buttonData.component === 'light_box_button' ? (
              <LightboxBtn key='lightbox' blok={$buttonData} />
            ) : (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData?.link_text}
              >
                <Button
                  key={$buttonData?.link_text}
                  $buttonData={$buttonData}
                />
              </div>
            )
          )}
        </CtaWrapper>
      </PillContainer>
    </ThemeProvider>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: ${(props) =>
    ['pill', 'image'].includes(props.$ctastyle) ? 'left' : 'center'};
  gap: 1vw;
  max-width: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg ? '392px' : '75vw'};

  ${media.fullWidth} {
    gap: 16px;
    max-width: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '392px' : '1200px'};
  }

  ${media.tablet} {
    max-width: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '392px' : '78.125vw'};
    gap: 1.563vw;
  }

  ${media.mobile} {
    gap: 3.333vw;
    max-width: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '392px' : '100%'};
  }
`;

const CtaWrapper = styled.div`
  display: flex;
  align-items: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg ? 'flex-start' : 'center'};
  overflow: hidden;
  background: ${(props) =>
    props.$ctastyle === 'image'
      ? `url(${props.$bgimg})`
      : props.$ctastyle === 'pill' && props.$pillbgimg
      ? `url(${props.$pillbgimg})`
      : props.theme.cta.cardBg};
  background-size: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg ? '100% 100%' : 'cover'};
  background-repeat: no-repeat;
  color: ${(props) => props.theme.cta.textColor};
  justify-content: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg
      ? 'flex-start'
      : 'space-between'};
  flex-direction: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg
      ? 'column'
      : props.$ctastyle === 'pill'
      ? 'row'
      : 'column'};
  gap: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg ? '2.5vw' : '3.75vw'};
  padding: ${(props) =>
    props.$ctastyle === 'pill'
      ? '3.75vw 6vw'
      : props.$ctastyle === 'image'
      ? '6vw 3.75vw 9.25vw 56.25vw'
      : props.$ctastyle === 'centered'
      ? '6vw 9.25vw'
      : '6vw 0'};
  width: ${(props) =>
    props.$ctastyle === 'image' && props.$fullwidth
      ? '100%'
      : props.$ctastyle === 'pill'
      ? '81.5vw'
      : props.$ctastyle === 'image'
      ? '88vw'
      : '100%'};
  min-height: ${(props) =>
    props.$ctastyle === 'pill' && props.$pillbgimg
      ? '18.875vw'
      : props.$ctastyle === 'image' && props.$fullwidth
      ? '34.722vw'
      : 'auto'};
  border-radius: ${(props) =>
    props.$ctastyle === 'image' && props.$fullwidth
      ? '0'
      : props.$ctastyle === 'pill' || props.$ctastyle === 'image'
      ? '1.5vw'
      : 'unset'};
  text-align: ${(props) =>
    ['pill', 'image'].includes(props.$ctastyle) ? 'left' : 'center'};

  ${media.fullWidth} {
    gap: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '40px' : '60px'};
    flex-direction: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg
        ? 'column'
        : props.$ctastyle === 'pill'
        ? 'row'
        : 'column'};
    padding: ${(props) =>
      props.$ctastyle === 'pill'
        ? '60px 96px'
        : props.$ctastyle === 'image'
        ? '96px 60px 148px 900px'
        : '96px 0'};
    width: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '100%'
        : props.$ctastyle === 'pill'
        ? '1304px'
        : props.$ctastyle === 'image'
        ? '1408px'
        : '100%'};
    min-height: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg
        ? '302px'
        : props.$ctastyle === 'image' && props.$fullwidth
        ? '34.722vw'
        : 'auto'};
    border-radius: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '0'
        : props.$ctastyle === 'pill' || props.$ctastyle === 'image'
        ? '24px'
        : 'unset'};
  }

  ${media.tablet} {
    gap: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '40px' : '5.859vw'};
    width: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '100%'
        : props.$ctastyle === 'centered'
        ? '100%'
        : '92.188vw'};
    min-height: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg
        ? '25.586vw'
        : props.$ctastyle === 'image' && props.$fullwidth
        ? '34.722vw'
        : 'auto'};
    border-radius: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '0'
        : props.$ctastyle === 'pill' || props.$ctastyle === 'image'
        ? '2.344vw'
        : 'unset'};
    padding: ${(props) =>
      props.$ctastyle === 'pill'
        ? '5.859vw 3.906vw'
        : props.$ctastyle === 'image'
        ? '9.375vw 5.859vw 14.453vw 46.094vw'
        : '5.859vw 3.906vw'};
  }

  ${media.mobile} {
    flex-direction: column;
    text-align: center;
    gap: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '40px' : '3.333vw'};
    width: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '100%'
        : props.$ctastyle === 'centered'
        ? '100%'
        : '89.167vw'};
    min-height: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg
        ? '128.125vw'
        : props.$ctastyle === 'image' && props.$fullwidth
        ? '34.722vw'
        : 'auto'};
    border-radius: ${(props) =>
      props.$ctastyle === 'image' && props.$fullwidth
        ? '0'
        : props.$ctastyle === 'pill' || props.$ctastyle === 'image'
        ? '5vw'
        : 'unset'};
    justify-content: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg
        ? 'flex-start'
        : 'space-between'};
    padding-top: ${(props) =>
      props.$ctastyle === 'pill' && props.$pillbgimg ? '8.333vw' : '8.333vw'};
  }
`;

const PillContainer = styled.div`
  display: flex;
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

export default CTA;
