'use client'
import React from 'react';

import styled from 'styled-components';

import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import text from '@/styles/text';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const BlogInfo = ({ blok }) => {
// console.log(blok)
const formattedDate = new Date(blok?.published_date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "2-digit",
});

return (
  <BlogInfoWrapper>
<BlogInfoDiv>
  <BlogDataDiv>
    <FormattedDate>
      {formattedDate}
    </FormattedDate>
  </BlogDataDiv>
  <BlogTitle>
    {blok.blog_title}
  </BlogTitle>
  <AuthorDiv>
    <AuthorHeadshot src={blok.author[0].headshot.filename}/>
    <Author>
      {blok.author[0].name}
    </Author>
  </AuthorDiv>
</BlogInfoDiv>
  </BlogInfoWrapper>
)
}

const Author = styled.p`
  ${text.bodyLg};
`
const AuthorHeadshot = styled.img`
  border-radius: 50%;
  width: 4.5vw;
  height: 4.5vw;

  ${media.fullWidth} {
    width: 72px;
  height: 72px;
  }
  
  ${media.tablet} {
    width: 7.031vw;
  height: 7.031vw;
  }
  
  ${media.mobile} {
    width: 15vw;
  height: 15vw;
  }
`
const AuthorDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.25vw;

  ${media.fullWidth} {
    gap: 20px;
  }
  
  ${media.tablet} {
    gap: 1.953vw;
  }
  
  ${media.mobile} {
    gap: 4.167vw;
  }
`
const BlogTitle = styled.h1`
  ${text.h1};
  width: 45.313vw;

  ${media.fullWidth} {
    width: 725px;
  }
  
  ${media.tablet} {
    width: 70.801vw;
  }
  
  ${media.mobile} {
    width: 80.083vw;
  }
`

const FormattedDate = styled.p`
  ${text.bodyMd};
`
const BlogDataDiv = styled.div`

`
const BlogInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
  gap: 1.875vw;
  width: 81.5vw;

  ${media.fullWidth} {
    gap: 30px;
  width: 1304px;
  }
  
  ${media.tablet} {
    gap: 2.93vw;
    width: 92.188vw;
  }
  
  ${media.mobile} {
    gap: 6.25vw;
    width: 89.167vw;
  }
`

const BlogInfoWrapper = styled.div`
color: white;
   background: linear-gradient(180deg, #583F99 0%, #3D2562 100%);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 3.75vw 0 3.75vw 0;
  margin-bottom: 3.75vw;

  ${media.fullWidth} {
    padding: 60px 0 60px 0;
  margin-bottom: 60px;
  }
  
  ${media.tablet} {
    padding: 5.859vw 0 5.859vw 0;
    margin-bottom: 5.859vw;
  }
  
  ${media.mobile} {
    padding: 12.5vw 0 12.5vw 0;
  margin-bottom: 12.5vw;
  }
`
export default BlogInfo