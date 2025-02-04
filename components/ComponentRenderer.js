import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import Image from './globalComponents/Image';
import styled from 'styled-components';
import RichTextRenderer from './RichTextRenderer';
const ComponentRenderer = ({ blok }) => {
  if (!blok) return null;
  // console.log(blok);
  switch (blok.component) {
    case 'image':
      return (
        <BlockWrapper {...storyblokEditable(blok)}>
          {blok?.Image?.map((mediaOptions, index) => (
            <Image
              key={index}
              imageAlt={mediaOptions.alt || 'Default Alt Text'}
              imageSrc={mediaOptions.filename}
              style={{ border_radius: blok.border_radius }}
            />
          ))}
        </BlockWrapper>
      );
    case 'copy_block':
      return (
        <BlockWrapper {...storyblokEditable(blok)}>
          <RichTextRenderer document={blok.header} className='header' />
          <RichTextRenderer document={blok.eyebrow} className='eyebrow' />
          <RichTextRenderer document={blok.body_copy} className='body_copy' />
        </BlockWrapper>
      );
    default:
      return null;
  }
};

const BlockWrapper = styled.div``;
export default ComponentRenderer;
