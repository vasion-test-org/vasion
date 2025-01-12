import React, { useContext } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import Cards from '@/components/centeredSections/Cards';
import Grid from '@/components/centeredSections/Grid';
import Image from '@/components/globalComponents/Image';
import styled from 'styled-components';
import { ScreenContext } from '@/components/Providers/Screen';
import RichTextRenderer from '@/components/RichTextRenderer';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const CenteredSection = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  return (
    <CenteredWrapper {...storyblokEditable(blok)}>
      <RichTextRenderer document={blok.intro_content[0].Content} centered />
      {blok.media.map((mediaOptions) => (
        <Image
          key={mediaOptions.alt}
          imageAlt={mediaOptions.alt}
          imageSrc={mediaOptions.filename}
        />
      ))}
      {blok.cards && <Cards cardData={blok.cards} />}
      {blok.grid && <Grid gridData={blok.grid} />}
    </CenteredWrapper>
  );
};

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.111vw;
`;

export default CenteredSection;
