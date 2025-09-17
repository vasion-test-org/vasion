'use client';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';

const ResourcesLongForm = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  return (
    <ThemeProvider theme={selectedTheme}>
      <ResourcesLongFormContainer>
        <RichTextRenderer key={`copy-`} document={blok.copy} blok={blok} />
      </ResourcesLongFormContainer>
    </ThemeProvider>
  );
};

const ResourcesLongFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46.875vw;
  margin: 2.5vw auto;

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

  ul {
    list-style: none;
    padding-left: .65vw;
    display: flex;
    flex-direction: column;

    li:before {
      background-image: unset;
      content: '';
      left: 0;
      top: .6vw;
      width: .35vw;
      height: .35vw;
      border-radius: 50%;
      background: ${colors.txtPrimary};
    }
  }
`;

export default ResourcesLongForm;
