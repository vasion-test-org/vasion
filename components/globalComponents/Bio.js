'use client';
import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from 'styles/media';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
const Bio = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper>
        <BioWrapper>
          <Headshot src={blok.headshot.filename} />
          <Content>
            {blok.bio &&
              blok.bio.map((copy) => (
                <div {...storyblokEditable(copy)} key={copy.component}>
                  <RichTextRenderer document={copy?.copy} />
                </div>
              ))}
          </Content>
        </BioWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;
const Headshot = styled.img`
  width: 9.375vw;
  height: 9.375vw;

  ${media.fullWidth} {
    width: 150px;
    height: 150px;
  }

  ${media.tablet} {
    width: 14.648vw;
    height: 14.648vw;
  }

  ${media.mobile} {
    width: 31.25vw;
    height: 31.25vw;
  }
`;

const BioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 81.5vw;
  gap: 1.875vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 30px;
  }

  ${media.tablet} {
    width: 92.188vw;
    gap: 2.93vw;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 89.167vw;
    gap: 6.25vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 3.75vw 0;
  background: ${(props) => props.theme.bio.bg};
  color: ${(props) => props.theme.bio.textColor};
`;
export default Bio;
