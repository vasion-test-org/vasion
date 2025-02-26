'use client'
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const StatItem = ({ statItem }) => {
  console.log(statItem)
return (
<StatContainer>
 herro
</StatContainer>
)
}

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24.625vw;

  ${media.fullWidth} {
    width: 395px;
  }
  
  ${media.tablet} {
    width: 29.102vw;
  }
  
  ${media.mobile} {
    width: 89.167vw;
  }
`
export default StatItem