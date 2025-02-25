'use client'
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
// import colors from 'styles/colors';
// import text from 'styles/text';
import Button from '@/components/globalComponents/Button';

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

  console.log(
    blok
  );
  return (
    <ThemeProvider theme={selectedTheme}>
      <PillContainer>
        <CtaWrapper
          $bgimg={bgimg?.filename}
          $ctastyle={blok.cta_style}
          {...storyblokEditable(blok)}
        >
          <ContentWrapper>
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
          {blok?.button_group?.map(($buttonData) => (
            <div
              {...storyblokEditable($buttonData)}
              key={$buttonData?.link_text}
            >
              <Button key={$buttonData?.link_text} $buttonData={$buttonData} />
            </div>
          ))}
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

  ${media.fullWidth} {
    gap: 16px;
  }

  ${media.tablet} {
    gap: 1.563vw;
  }

  ${media.mobile} {
    gap: 3.333vw;
  }
`;

const CtaWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${(props) =>
    props.$ctastyle === 'image' ? `url(${props.$bgimg})` : props.theme.cta.cardBg};
  background-size: cover;
  color: ${(props) => props.theme.cta.textColor};
  justify-content: space-between;
  flex-direction: ${(props) => (props.$ctastyle === 'pill' ? 'row' : 'column')};
  padding: ${(props) =>
    props.$ctastyle === 'pill'
      ? '3.75vw 6vw'
      : props.$ctastyle === 'image'
      ? '6vw 3.75vw 9.25vw 56.25vw'
       : props.$ctastyle === 'centered' ? '6vw 9.25vw'
      : '6vw 0'};
  width: ${(props) =>
    props.$ctastyle === 'pill'
      ? '81.5vw'
      : props.$ctastyle === 'image'
      ? '88vw'
      : '100%'};
  border-radius: ${(props) =>
    props.$ctastyle === 'pill' || props.$ctastyle === 'image'
      ? '1.5vw'
      : 'unset'};
 text-align: ${(props) =>
  ['pill', 'image'].includes(props.$ctastyle) ? 'left' : 'center'};
  gap: 3.75vw;

  ${media.fullWidth} {
    gap: 60px;
    flex-direction: ${(props) =>
      props.$ctastyle === 'pill' ? 'row' : 'column'};
    padding: ${(props) =>
      props.$ctastyle === 'pill'
        ? '60px 96px'
        : props.$ctastyle === 'image'
        ? '96px 60px 148px 900px'
        : '96px 0'};
    width: ${(props) =>
      props.$ctastyle === 'pill'
        ? '1304px'
        : props.$ctastyle === 'image'
        ? '1408px'
        : '100%'};
    border-radius: ${(props) =>
      props.$ctastyle === 'pill' || props.$ctastyle === 'image'
        ? '24px'
        : 'unset'};
  }

  ${media.tablet} {
    gap: 5.859vw;
    width: 92.188vw;
    border-radius: ${(props) =>
      props.$ctastyle === 'pill' || props.$ctastyle === 'image'
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
    gap: 3.333vw;
    padding: ${(props) =>
      props.$ctastyle === 'pill'
        ? '8.333vw 5vw'
        : props.$ctastyle === 'image'
        ? '8.333vw 4.167vw 30.833vw 39.167vw'
        : '8.333vw 5vw'};
    width: 89.167vw;
    border-radius: ${(props) =>
      props.$ctastyle === 'pill' || props.$ctastyle === 'image'
        ? '5vw'
        : 'unset'};
  }
`;

const PillContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default CTA;
