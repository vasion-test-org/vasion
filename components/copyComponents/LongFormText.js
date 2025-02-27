'use client'
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const LongFormText = ({ blok }) => {
  console.log(blok.copy.content[0])
return (
<LongFormTextContainer {...storyblokEditable(blok.copy)}>
  {blok.copy.content.map((copy, index) =>  
   <RichTextRenderer key={`copy-${index}`} document={copy}/>
)}
 
</LongFormTextContainer>
)
}

const LongFormTextContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
    margin: 0 auto;
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`
export default LongFormText