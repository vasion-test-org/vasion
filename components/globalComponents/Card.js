import React from 'react';
import RichTextRenderer from '@/components/RichTextRenderer';
import styled from 'styled-components';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Card = ({ content }) => {
  console.log('card-content', content);
  return (
    <CardWrapper>
      {content.Image && (
        <Image imageAlt={content.Image.alt} filename={content.Image.filename} />
      )}
      <ContentWrapper>
        {content.content.map((copy, index) => (
          <div key={`card-copy-${index}`} {...storyblokEditable(copy)}>
            <RichTextRenderer
              className={copy.component}
              document={copy.copy}
            />
          </div>
        ))}
      <Button buttonData={content.Button[0]}/>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Card;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0vw 1.111vw 1.111vw 1.111vw;
  gap: 1.111vw;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  width: clamp(24.306vw, 100%, 28.333vw);
  gap: 1.111vw;
  border-radius: 1.111vw;
  text-align: left;
`;
