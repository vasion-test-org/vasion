'use client';
import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media, { mobile, desktop, tablet } from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
import ComponentRenderer from './renderers/ComponentRenderer';

const SideBySide = ({ blok }) => {
  // console.log(blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  // console.log(blok.left_extra_copy?.[0]);

  const content = (
    <>
      <ComponentRenderer
        extra_copy={blok.left_extra_copy?.[0]}
        blok={blok.left_side_component[0]}
      />
      <ComponentRenderer
        extra_copy={blok.right_extra_copy?.[0]}
        blok={blok.right_side_component[0]}
      />
    </>
  );

  const sideBySideContent = blok.card ? (
    <CardWrapper {...storyblokEditable(blok)}>
      <SideBySideWrapper
        gap={blok.gap}
        asset_form={blok.asset_form}
        extra_copy={blok.extra_copy}
      >
        {content}
      </SideBySideWrapper>
    </CardWrapper>
  ) : (
    <SideBySideWrapper
      {...storyblokEditable(blok)}
      gap={blok.gap}
      asset_form={blok.asset_form}
      extra_copy={blok.extra_copy}
      flipped={blok.flipped ? 'true' : undefined}
    >
      {content}
    </SideBySideWrapper>
  );

  return (
    <ThemeProvider theme={selectedTheme}>
      <SpacingContainer
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        flipped={blok.flipped ? 'true' : undefined}
      >
        {sideBySideContent}
      </SpacingContainer>
    </ThemeProvider>
  );
};

const SpacingContainer = styled.div`
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
        ? `calc(${props.spacing}px / 1600 * 100vw) 0 0`
        : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
        ? `0 0 calc(${props.spacing}px / 1600 * 100vw)`
        : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `calc(${props.spacing}px / 1600 * 100vw) 0`
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
          ? '3.906vw 3.906vw 0'
          : props.spacing
          ? `${props.spacing}px 3.906vw 0`
          : '3.906vw 3.906vw 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 3.906vw 3.906vw'
          : props.spacing
          ? `0 3.906vw ${props.spacing}px`
          : '0 3.906vw 3.906vw';
      }
      return props.spacing === 'default'
        ? '3.906vw 3.906vw'
        : props.spacing
        ? `${props.spacing}px 3.906vw`
        : '3.906vw 3.906vw';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.417vw 5.417vw 0'
          : props.spacing
          ? `${props.spacing}px 5.417vw 0`
          : '5.417vw 5.417vw 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 5.417vw 5.417vw'
          : props.spacing
          ? `0 5.417vw ${props.spacing}px`
          : '0 5.417vw 5.417vw';
      }
      return props.spacing === 'default'
        ? '5.417vw 5.417vw'
        : props.spacing
        ? `${props.spacing}px 5.417vw`
        : '5.417vw 5.417vw';
    }};
  }
`;

const CardWrapper = styled.div`
  background: ${(props) => props.theme.side_by_side.bg};
  color: ${(props) => props.theme.side_by_side.textColor};
  border-radius: 1.5vw;
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 3.75vw;

  ${media.fullWidth} {
    border-radius: 24px;
    padding: 60px;
  }

  ${media.tablet} {
    border-radius: 24px;
    padding: 40px;
  }

  ${media.mobile} {
    border-radius: 24px;
    padding: 32px;
  }
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => (props.extra_copy ? 'start' : 'center')};
  justify-content: center;
  text-align: left;
  background: ${(props) =>
    props.card ? 'transparent' : props.theme.side_by_side.bg};
  color: ${(props) =>
    props.card ? 'inherit' : props.theme.side_by_side.textColor};

  > * {
    margin-top: ${(props) => (props.asset_form ? '-6vw' : 'unset')};

    ${media.fullWidth} {
      margin-top: ${(props) => (props.asset_form ? '-96px' : 'unset')};
    }

    ${media.tablet} {
      margin-top: ${(props) => (props.asset_form ? '-9.375vw' : 'unset')};
    }

    ${media.mobile} {
      margin-top: ${(props) => (props.asset_form ? 'unset' : 'unset')};
    }
  }

  gap: ${(props) =>
    props.gap === 'default'
      ? '7.75vw'
      : props.gap
      ? `${props.gap}px`
      : '7.75vw'};

  ${media.fullWidth} {
    gap: ${(props) =>
      props.gap === 'default'
        ? '124px'
        : props.gap
        ? `${props.gap}px`
        : '124px'};
  }

  ${media.tablet} {
    gap: ${(props) =>
      props.gap === 'default'
        ? '3.906vw'
        : props.gap
        ? `${props.gap}px`
        : '3.906vw'};
  }

  ${media.mobile} {
    flex-direction: ${(props) =>
      props.flipped === 'true' ? 'column-reverse' : 'column'};
    gap: ${(props) =>
      props.gap === 'default'
        ? '6.667vw'
        : props.gap
        ? `${props.gap}px`
        : '6.667vw'};
  }
`;

export default SideBySide;
