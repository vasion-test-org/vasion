'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import { useAvailableThemes } from '@/context/ThemeContext';
import { horizontalLoop } from '@/functions/horizontalLoop';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';
import text from '@/styles/text';
import Button from './globalComponents/Button';

const Testimonial = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok);

  return (
    <ThemeProvider theme={selectedTheme}>
      <TestimonialWrapper layout={blok.layout} spacing={blok.section_spacing}>
        <TestimonialCard>
          <TestimonialContent>
            <TestimonialEyebrow>{blok?.eyebrow || 'Testimonial'}</TestimonialEyebrow>
            {blok.quote.map((copy) => (
              <div {...storyblokEditable(copy)} key={copy.component}>
                <RichTextRenderer document={copy.copy} />
              </div>
            ))}
            {blok?.quote_source_info && (
              <SourceWrapper
                {...storyblokEditable(blok.quote_source_info)}
                key={blok.quote_source_info.component}
              >
                <RichTextRenderer document={blok?.quote_source_info[0]?.copy} />
                {blok?.link?.map(($buttonData) => (
                  <ButtonWrapper
                    {...storyblokEditable($buttonData)}
                    key={$buttonData?.link_text}
                  >
                    <Button
                      key={$buttonData?.link_text}
                      $buttonData={$buttonData}
                    />
                  </ButtonWrapper>
                ))}
              </SourceWrapper>
            )}
          </TestimonialContent>
          {blok?.media[0] && (
            <ImageWrapper {...storyblokEditable(blok)}>
              <Image
                images={blok.media[0]?.media}
                // borderRadius={blok.hero_asset?.[0]?.border_radius}
              />
            </ImageWrapper>
          )}
        </TestimonialCard>
      </TestimonialWrapper>
    </ThemeProvider>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 1.25vw;
 ${media.fullWidth} {
  margin-top: 20px;
 }
 
 ${media.tablet} {
  margin-top: 1.953vw;
 }
 
 ${media.mobile} {
  margin-top: 4.167vw;
 }
`
const SourceWrapper = styled.div`
  margin-top: 3.75vw;

  ${media.fullWidth} {
    margin-top: 60px;
  }

  ${media.tablet} {
    margin-top: 5.859vw;
  }

  ${media.mobile} {
  }
`;
const ImageWrapper = styled.div`
  align-content: center;
  min-width: 24vw;
  max-width: 24vw;
  overflow: hidden;
  border-radius: 1.25vw;

  ${media.fullWidth} {
    min-width: 384px;
    max-width: 384px;
  }

  ${media.tablet} {
    min-width: 32.813vw;
    max-width: 32.813vw;
  }

  ${media.mobile} {
    min-width: 89.167vw;
    max-width: 89.167vw;
  }
`;
const TestimonialEyebrow = styled.p`
  margin-bottom: 2vw;
  ${text.eyebrow};

  ${media.fullWidth} {
    margin-bottom: 32px;
  }

  ${media.tablet} {
    margin-bottom: 3.125vw;
  }

  ${media.mobile} {
  }
`;
const TestimonialContent = styled.div`
  text-align: left;
  max-width: 81.5vw;

  ${media.fullWidth} {
    max-width: 1304px;
  }

  ${media.tablet} {
    width: 45.703vw;
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;
const TestimonialCard = styled.div`
  background: ${(props) => props.theme.testimonial.bg};
  display: flex;
  flex-direction: ${(props) => `${props.layout || 'row'}`};
  height: auto;
  border-radius: 1.5vw;
  width: 81.5vw;
  gap: 3.75vw;
  padding: 3.75vw;

  ${media.fullWidth} {
    border-radius: 24px;
    width: 1304px;
    gap: 60px;
    padding: 60px;
  }

  ${media.tablet} {
    border-radius: 2.344vw;
    width: 92.188vw;
    gap: 5.859vw;
    padding: 3.906vw;
  }

  ${media.mobile} {
    flex-direction: column;
    border-radius: unset;
    width: 100%;
    gap: 8.333vw;
    padding: 6.667vw 5.417vw;
  }
`;
const TestimonialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) =>
    props.spacing === 'default'
      ? '3.75vw 0vw'
      : props.spacing
      ? `calc(${props.spacing} / 1600 * 100vw) 0vw`
      : '3.75vw 0vw'};

  ${media.fullWidth} {
    padding: ${(props) =>
      props.spacing === 'default'
        ? '60px 0px'
        : props.spacing
        ? `calc(${props.spacing} / 1600 * 1600px) 0px`
        : '60px 0px'};
  }

  ${media.tablet} {
    padding: ${(props) =>
      props.spacing === 'default'
        ? '3.906vw 0vw'
        : props.spacing
        ? `calc(${props.spacing} / 1024 * 100vw) 0vw`
        : '3.906vw 0vw'};
  }

  ${media.mobile} {
    padding: ${(props) =>
      props.spacing === 'default'
        ? '3.906vw 0vw 0vw 0vw'
        : props.spacing
        ? `calc(${props.spacing} / 428 * 100vw) 0vw`
        : '3.906vw 0vw 0vw 0vw'};
  }
`;
export default Testimonial;
