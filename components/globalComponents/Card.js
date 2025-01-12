import React from 'react';
import RichTextRenderer from '@/components/RichTextRenderer';
import styled from 'styled-components';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Card = ({content}) => {
  // console.log(content.content[0].Content)
return (
<CardWrapper>
  {content.Image && <Image imageAlt={content.Image.alt} imageSrc={content.Image.filename}/>}
  <ContentWrapper>
    <RichTextRenderer document={content.content[0].Content}/>
  </ContentWrapper>
  {/* <Button buttonData={content.Button[0]}/> */}
</CardWrapper>
)
}

export default Card

const ContentWrapper = styled.div`
  padding: 1.111vw;
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  overflow: hidden;
  width: 28.333vw;
  gap: 1.111vw;
  border-radius: 1.111vw;
`