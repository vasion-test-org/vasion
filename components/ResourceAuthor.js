'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import Schedule from 'assets/svg/schedule.svg';

const ResourceAuthor = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;

  const line_seperators = {
    top: blok?.top_divider,
    bottom: blok?.lower_divider,
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <Division divider={line_seperators}>
          <AuthorContainer isblogend={blok.blog_end}>
            {blok?.assets && blok.assets.length > 0 && !blok.blog_end && (
              <AuthorImageWrapper
                isblogend={blok?.blog_end}
                buttons={blok.button_group.length > 0}
              >
                <Image
                  images={blok.assets}
                  borderradius={50}
                  width={80}
                  height={80}
                  priority={false}
                />
              </AuthorImageWrapper>
            )}

            {blok?.assets && blok.assets.length > 0 && blok.blog_end && (
              <AuthorImageWrapper
                isblogend={blok.blog_end}
                buttons={blok.button_group.length > 0}
              >
                <Image
                  images={blok.assets}
                  borderradius={50}
                  width={40}
                  height={40}
                  priority={false}
                />
              </AuthorImageWrapper>
            )}
            <AuthorTextWrapper>
              {blok?.copy_sections?.map((copy, index) => (
                <CopyWrapper
                  key={copy._uid || index}
                  {...storyblokEditable(copy)}
                >
                  <RichTextRenderer
                    document={copy?.copy}
                    responsiveTextStyles={copy?.responsive_text_styles}
                  />
                </CopyWrapper>
              ))}

              {blok?.button_group && blok.button_group.length > 0 && (
                <ButtonContainer>
                  {blok.button_group.map(($buttonData) => {
                    return (
                      <div
                        {...storyblokEditable($buttonData)}
                        key={$buttonData._uid || $buttonData.link_text}
                      >
                        <Button
                          key={$buttonData._uid || $buttonData.link_text}
                          $buttonData={$buttonData}
                        />
                      </div>
                    );
                  })}
                </ButtonContainer>
              )}
            </AuthorTextWrapper>
            {!blok.blog_end /** Only applies when Author is at the intro of the blog*/ && (
              <AuthorIsOnTopTextWrapper>
                <Schedule width={20} height={20} />
                {blok?.extended_copy?.map((copy, index) => (
                  <CopyWrapper
                    key={copy._uid || index}
                    {...storyblokEditable(copy)}
                  >
                    <RichTextRenderer
                      document={copy?.copy}
                      responsiveTextStyles={copy?.responsive_text_styles}
                    />
                  </CopyWrapper>
                ))}
              </AuthorIsOnTopTextWrapper>
            )}
          </AuthorContainer>
        </Division>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ResourceAuthor;

const AuthorIsOnTopTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.25vw;

  ${media.fullWidth} {
    gap: 4px;
  }
  ${media.tablet} {
    gap: 0.391vw;
  }
  ${media.mobile} {
    gap: 0.833vw;
  }
`;
const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const AuthorImageWrapper = styled.div`
  flex-shrink: 0;
  width: ${(props) => (props?.isblogend ? '5vw' : '2.5vw')};
  border-radius: 50%;
  overflow: hidden;
  img {
    padding: 0px !important;
  }
  ${media.fullWidth} {
    width: ${(props) => (props?.isblogend ? '80px' : '40px')};
    img {
      padding: 0px !important;
    }
  }
  ${media.tablet} {
    width: ${(props) => (props?.isblogend ? '3.613vw' : '3.906vw')};
    img {
      padding: 0vw !important;
    }
  }
  ${media.mobile} {
    width: ${(props) => (props?.isblogend ? '16.667vw' : '8.333vw')};
    img {
      padding: 0vw !important;
    }
  }
`;

const AuthorTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1vw;
  margin-top: 1.5vw;
  width: 100%;
  max-width: 46.875vw;

  ${media.fullWidth} {
    gap: 16px;
    margin-top: 24px;
    max-width: 750px;
  }

  ${media.tablet} {
    gap: 1.563vw;
    margin-top: 1.953vw;
    max-width: 66.797vw;
  }

  ${media.mobile} {
    gap: 3.333vw;
    margin-top: 4.167vw;
    max-width: 89.167vw;
    flex-direction: row;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.isblogend ? 'flex-start' : 'center')};
  width: 100%;
  box-sizing: border-box;
  max-width: 46.875vw;
  gap: ${(props) => (props.isblogend ? '1.25vw' : '0.5vw')};
  padding: ${(props) =>
    props.isblogend ? '2.5vw 0vw' : '1.25vw 0vw'} !important;

  ${media.fullWidth} {
    gap: ${(props) => (props.isblogend ? '20px' : '8px')};
    max-width: 750px;
    padding: ${(props) =>
      props.isblogend ? '40px 0px' : '20px 0px'} !important;
  }

  ${media.tablet} {
    gap: ${(props) => (props.isblogend ? '1.855vw' : '0.781vw')};
    max-width: 66.797vw;
    padding: ${(props) => (props.isblogend ? '2.344vw 0vw' : '2.344vw 0vw')};
  }

  ${media.mobile} {
    gap: ${(props) => (props.isblogend ? '4.167vw' : '1.667vw')};
    max-width: 89.167vw;
    padding: ${(props) =>
      props.isblogend ? '8.125vw 0vw' : '4.167vw 0vw'} !important;
  }
`;
const Division = styled.div`
  display: flex;
  flex-direction: space-between;

  width: 100%;

  border-top: ${(props) =>
    props.divider.top ? '0.063vw solid #c8c9ce' : 'unset'};
  border-bottom: ${(props) =>
    props.divider.bottom ? '0.063vw solid #c8c9ce' : 'unset'};

  ${media.fullWidth} {
    border-top: ${(props) =>
      props.divider.top ? '1px solid #c8c9ce' : 'unset'};
    border-bottom: ${(props) =>
      props.divider.bottom ? '1px solid #c8c9ce' : 'unset'};
  }

  ${media.tablet} {
    border-top: ${(props) =>
      props.divider.top ? '0.098vw solid #c8c9ce' : 'unset'};
    border-bottom: ${(props) =>
      props.divider.bottom ? '0.098vw solid #c8c9ce' : 'unset'};
  }

  ${media.mobile} {
    border-top: ${(props) =>
      props.divider.top ? '0.5px solid #c8c9ce' : 'unset'};
    border-bottom: ${(props) =>
      props.divider.bottom ? '0.5px solid #c8c9ce' : 'unset'};
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
          ? '3.906vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '3.906vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 3.906vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 3.906vw';
      }
      return props.spacing === 'default'
        ? '3.906vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '3.906vw 0';
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
