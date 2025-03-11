'use client'
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const LongFormText = ({ blok }) => {
  // console.log(blok)
return (
<LongFormTextContainer {...storyblokEditable(blok.copy)}>

   <RichTextRenderer key={`copy-`} document={blok.copy}/>

 
</LongFormTextContainer>
)
}

const LongFormTextContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
  width: 81.5vw;

  div {
    margin-bottom: 1.563vw;
  }

  h1, h2, h3, h4, h5 {
    margin-bottom: 1.563vw;
  }

  div:empty {
    margin-bottom: unset;
}


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