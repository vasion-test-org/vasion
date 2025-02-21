'use client'
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

const CenteredSection = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok.grid_alignment)
  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper {...storyblokEditable(blok)}>
        <ContentWrapper>
          {blok.centered_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} />
            </div>
          ))}
          {blok?.button_group?.map((buttonData) => (
            <div {...storyblokEditable(buttonData)} key={buttonData.link_text}>
              <Button key={buttonData.link_text} buttonData={buttonData} />
            </div>
          ))}
        </ContentWrapper>

        {blok.component_type === 'media' && blok?.media && (
          <div {...storyblokEditable(blok.media)}>
            <Image
              images={blok.media?.[0]?.media}
              borderRadius={blok.media?.[0]?.border_radius}
            />
          </div>
        )}

        {blok.component_type === 'cards' && blok.cards && (
          <Cards cardData={blok.cards} />
        )}
        {blok.component_type === 'grid' && blok.grid && (
          <Grid gridData={blok.grid} alignment={blok.grid_alignment}/>
        )}
      </CenteredWrapper>
    </ThemeProvider>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 67.75vw;
  gap: 1vw;

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
    gap: 1.563vw;  }

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
