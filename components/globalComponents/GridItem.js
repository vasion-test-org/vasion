import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled from 'styled-components';

import Button from '@/components/globalComponents/Button';
import Icon from '@/components/globalComponents/Icon';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const GridItem = ({ alignment, content }) => {
  // console.log(content.content[0].Content)
  // console.log(content)
  return (
    <GridItemWrapper alignment={alignment}>
      {content.icon && (
        <div key={content.icon.filename} {...storyblokEditable(content)}>
          <Icon imageAlt={content.icon.alt} imageSrc={content.icon.filename} />
        </div>
      )}
      {content.content.map((copy) => (
        <div key={copy.component} {...storyblokEditable(copy)}>
          <RichTextRenderer centered className={copy.component} document={copy.copy} />
        </div>
      ))}
      {/* <Button $buttonData={content.Button[0]}/> */}
    </GridItemWrapper>
  );
};

export default GridItem;

const GridItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: ${(props) => props.alignment || 'unset'};
  text-align: ${(props) => props.alignment || 'left'};
  width: 18.5vw;
  gap: 1vw;

  ${media.fullWidth} {
    width: 296px;
    gap: 16px;
  }

  ${media.tablet} {
    width: 21.582vw;
    gap: 1.563vw;
  }

  ${media.mobile} {
    width: clamp(89.167vw, 100%, 89.167vw);
    gap: 3.333vw;
  }
`;
