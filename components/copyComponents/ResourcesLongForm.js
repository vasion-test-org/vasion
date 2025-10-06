'use client';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
// import ResourcesTOC from '@/components/ResourcesTOC';

const ResourcesLongForm = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper>
        <ResourcesLongFormContainer>
          <RichTextRenderer
            key={`copy-`}
            document={blok.copy}
            blok={blok}
            responsiveTextStyles={blok?.responsive_text_styles}
          />
        </ResourcesLongFormContainer>
        {/* <ResourcesTOC copy={blok.copy} /> */}
      </Wrapper>
    </ThemeProvider>
  );
};

const ResourcesLongFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46.875vw;
  margin: 2.5vw 0;

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: -0.625vw;
  }

  img {
    border-radius: 24px;
  }

  div:empty {
    height: 1.25vw;

    ${media.fullWidth} {
      height: 20px;
    }

    ${media.tablet} {
      height: 1.953vw;
    }

    ${media.mobile} {
      height: 4.167vw;
    }
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: auto;
  width: 63.125vw;

  ${media.fullWidth} {
    width: 1010px;
  }

  ${media.tablet} {
    width: 92.188vw;
  }

  ${media.mobile} {
    width: unset;
  }
`;
export default ResourcesLongForm;
