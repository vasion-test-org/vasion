import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from './renderers/RichTextRenderer';
// import colors from 'styles/colors';
// import text from 'styles/text';

const CTA = (blok) => {
  // console.log(blok)
  return <CtaWrapper {...storyblokEditable(blok)}>hellow wrapper</CtaWrapper>;
};

const CtaWrapper = styled.div`
  padding: 4.167vw 6.667vw;
`;
export default CTA;
