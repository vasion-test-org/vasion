import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import Image from '../globalComponents/Image';
import media from '@/styles/media';
import styled from 'styled-components';
import RichTextRenderer from './RichTextRenderer';
const ComponentRenderer = ({ blok }) => {
  if (!blok) return null;
  // console.log(blok);
  switch (blok.component) {
    case 'assets':
      return (
        <BlockWrapper {...storyblokEditable(blok)}>
          <Image images={blok.media} borderradius={blok.border_radius} />
        </BlockWrapper>
      );
    case 'copy_block':
      return (
        <CopyDiv>
          {blok.copy_block_sections.map((copy, index) => (
            <BlockWrapper key={index} {...storyblokEditable(copy)}>
              <RichTextRenderer document={copy.copy} />
            </BlockWrapper>
          ))}
        </CopyDiv>
      );

    default:
      return null;
  }
};

const CopyDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 38.25vw;
  gap: 1vw;

  ${media.fullWidth} {
    width: 612px;
    gap: 16px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const BlockWrapper = styled.div``;
export default ComponentRenderer;
