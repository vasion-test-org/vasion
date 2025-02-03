import React from 'react';
import RichTextRenderer from '@/components/RichTextRenderer';
import styled from 'styled-components';
import Icon from '@/components/globalComponents/Icon';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const GridItem = ({content}) => {
  // console.log(content.content[0].Content)
return (
<GridItemWrapper>
  {content.icon && <Icon imageAlt={content.icon.alt} imageSrc={content.icon.filename}/>}
  {content.content.map((copy) => (
          <div key={copy.component} {...storyblokEditable(copy)}>
            <RichTextRenderer
              className={copy.component}
              document={copy.copy}
              centered
            />
          </div>
        ))}
  {/* <Button buttonData={content.Button[0]}/> */}
</GridItemWrapper>
)
}

export default GridItem

const GridItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 28.333vw;
  gap: 1.111vw;
`