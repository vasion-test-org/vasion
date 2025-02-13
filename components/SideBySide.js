import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media, { mobile, desktop, tablet } from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
import ComponentRenderer from './renderers/ComponentRenderer';

const SideBySide = ({ blok }) => {
  // console.log(blok)
  return (
    <SideBySideWrapper
      spacing={blok.section_spacing}
      {...storyblokEditable(blok)}
      gap={blok.gap}
    >
      <ComponentRenderer blok={blok.left_side_component[0]} />
      <ComponentRenderer blok={blok.right_side_component[0]} />
    </SideBySideWrapper>
  );
};

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding: ${(props) =>
    props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `calc(${props.spacing}px / 1600 * 100vw) 0`
      : '3.75vw 0'};

gap: ${(props) =>
    props.gap === 'default'
      ? '7.75vw'
      : props.gap
      ? `${props.gap}px`
      : '7.75vw'};

  ${media.fullWidth} {
    padding: ${(props) =>
    props.spacing === 'default'
      ? '60px 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '60px 0'};
    gap: ${(props) =>
    props.gap === 'default'
      ? '124px'
      : props.gap
      ? `${props.gap}px`
      : '124px'};
  }

  ${media.tablet} {
    padding: ${(props) =>
    props.spacing === 'default'
      ? '3.906vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '3.906vw 0'};
    gap: ${(props) =>
    props.gap === 'default'
      ? '3.906vw'
      : props.gap
      ? `${props.gap}px`
      : '3.906vw'};
  }

  ${media.mobile} {
    flex-direction: column;
    padding: ${(props) =>
    props.spacing === 'default'
      ? '5.417vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '5.417vw 0'};
    gap: ${(props) =>
    props.gap === 'default'
      ? '6.667vw'
      : props.gap
      ? `${props.gap}px`
      : '6.667vw'};
  }
`;
export default SideBySide;
