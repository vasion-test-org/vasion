'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';

const ResourceAuthor = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <AuthorContainer>
          {blok?.assets && blok.assets.length > 0 && (
            <AuthorImageWrapper>
              <Image
                images={blok.assets}
                borderradius={50}
                width={80}
                height={80}
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
          </AuthorTextWrapper>
        </AuthorContainer>

        {/* Buttons moved outside AuthorContainer */}

        {blok?.button_group && blok.button_group.length > 0 && (
          <ButtonContainer>
            {blok.button_group.map(($buttonData) => {
              console.log('Button data in ResourceAuthor:', $buttonData);
              console.log('Has link_img?:', !!$buttonData?.link_img);
              console.log('link_img object:', $buttonData?.link_img);
              console.log(
                'link_img filename:',
                $buttonData?.link_img?.filename,
              );
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
      </Wrapper>
    </ThemeProvider>
  );
};

export default ResourceAuthor;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorImageWrapper = styled.div`
  flex-shrink: 0;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  overflow: hidden;

  ${media.fullWidth} {
    width: 80px;
    height: 80px;
  }

  ${media.tablet} {
    width: 7.813vw;
    height: 7.813vw;
  }

  ${media.mobile} {
    width: 16.667vw;
    height: 16.667vw;
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
    flex-direction: column;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 46.875vw;
  gap: 1.25vw;
  border-top: 0.063vw solid #c8c9ce;
  border-bottom: 0.063vw solid #c8c9ce;
  padding: 2.5vw 0vw !important;
  box-sizing: border-box;

  ${media.fullWidth} {
    gap: 20px;
    max-width: 750px;
    padding: 40px 0px !important;
    border-top: 1px solid #c8c9ce;
    border-bottom: 1px solid #c8c9ce;
  }

  ${media.tablet} {
    gap: 1.953vw;
    max-width: 66.797vw;
    padding: 2.441vw 0vw;
    border-top: 0.098vw solid #c8c9ce;
    border-bottom: 0.098vw solid #c8c9ce;
  }

  ${media.mobile} {
    gap: 4.167vw;
    max-width: 89.167vw;
    border-top: 0.5px solid #c8c9ce;
    border-bottom: 0.5px solid #c8c9ce;
    padding: 8.333vw 0vw !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
