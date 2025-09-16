'use client';
import React, { useContext } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from '@/components/globalComponents/Button';
import { ScreenContext } from '@/components/providers/Screen';
import useMedia from '@/functions/useMedia';

const BlogCta = ({ blok }) => {
  console.log(blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const { mobile } = useContext(ScreenContext);

  let customTheme = blok.custom_theme?.[0] || {};
  if (!blok.custom_theme_builder) {
    customTheme = undefined;
  }

  const backgroundType = customTheme?.background_type;
  const bg_img =
    backgroundType === 'image'
      ? useMedia(
          customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[0]?.filename ||
            customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[1]?.filename ||
            customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[2]?.filename ||
            customTheme?.background_media?.[0]?.filename,
        )
      : blok.background_image?.[0]?.filename;
  const bg_color =
    backgroundType === 'color' ? customTheme?.background_color?.value : null;

  return (
    <ThemeProvider theme={{ ...selectedTheme, customtheme: customTheme }}>
      <BlogCtaBGWrapper>
        <BlogCtaWrapper
          data-anchor-id={blok.anchor_id}
          spacingOffset={blok.offset_spacing}
          spacing={blok.section_spacing}
          bg_img={bg_img}
          bg_color={bg_color}
          background_type={backgroundType}
          {...storyblokEditable(blok)}
        >
          <ContentContainer>
            <TextSection>
              {blok.copy_sections &&
                blok.copy_sections.map((copy) => (
                  <div {...storyblokEditable(copy)} key={copy.u_id}>
                    <RichTextRenderer
                      document={copy?.copy}
                      responsiveTextStyles={copy?.responsive_text_styles}
                      gradientText={copy?.gradient}
                    />
                  </div>
                ))}
              {blok.button_group?.length > 0 && (
                <ButtonWrapper>
                  {blok.button_group.map(($buttonData) => (
                    <div
                      {...storyblokEditable($buttonData)}
                      key={$buttonData.u_id}
                    >
                      <Button
                        key={$buttonData.u_id}
                        $buttonData={$buttonData}
                      />
                    </div>
                  ))}
                </ButtonWrapper>
              )}
            </TextSection>
          </ContentContainer>
        </BlogCtaWrapper>
      </BlogCtaBGWrapper>
    </ThemeProvider>
  );
};

const ContentContainer = styled.div`
  display: flex;
  align-self: flex-start;
  width: 100%;
`;

const TextSection = styled.div`
  width: 20.625vw;
  ${media.fullWidth} {
    width: 330px;
  }
  ${media.tablet} {
    justify-content: center;
    width: 32.227vw;
  }

  ${media.mobile} {
    justify-content: center;
    width: 37.292vw;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.75vw;
  margin-top: 2vw;

  ${media.fullWidth} {
    gap: 12px;
    margin-top: 32px;
  }

  ${media.tablet} {
    gap: 1.172vw;
    margin-top: 3.125vw;
    justify-content: center;
  }

  ${media.mobile} {
    gap: 2.5vw;
    margin-top: 6.667vw;
    flex-direction: column;
    align-items: center;
  }
`;

const BlogCtaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.customtheme?.text_color?.value || 'white'};
  position: relative;
  overflow: hidden;
  width: 46.875vw;
  padding: 1.625vw;
  background: ${(props) => {
    if (props.background_type === 'image' && props.bg_img) {
      return `url(${props.bg_img})`;
    }
    if (props.background_type === 'color' && props.bg_color) {
      return `${props.bg_color}`;
    }
    if (props.bg_img) {
      return `url(${props.bg_img})`;
    }
    return 'linear-gradient(135deg, #673AB7, #9C27B0)';
  }};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  object-fit: contain;
  border-radius: 1vw;
  ${media.fullWidth} {
    width: 750px;
    padding: 26px;

    border-radius: 16px;
  }
  ${media.tablet} {
    width: 66.797vw;
    padding: 2.441vw 2.637vw;

    border-radius: 1.563vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    padding: 3.333vw 4.167vw;

    border-radius: 3.333vw;
  }
`;

const BlogCtaBGWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 15px;

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
`;
export default BlogCta;
