import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from './renderers/RichTextRenderer';
// import colors from 'styles/colors';
// import text from 'styles/text';
import Button from './globalComponents/Button';

const PillCTA = ({blok}) => {
   const themes = useAvailableThemes();
    const selectedTheme = themes[blok.theme] || themes.default;
  console.log(blok)
  return<ThemeProvider theme={selectedTheme}>
    <PillContainer>
    <CtaWrapper {...storyblokEditable(blok)}>
      <ContentWrapper>
    {blok.copy_sections.map((copy) => (
        <div key={copy.component} {...storyblokEditable(copy)}>
          <RichTextRenderer
            className={copy.component}
            document={copy.copy}
            centered
          />
        </div>
      ))}
      </ContentWrapper>
       {blok?.button_group?.map((buttonData) => (
                <div
                  {...storyblokEditable(buttonData)}
                  key={buttonData?.link_text}
                >
                  <Button key={buttonData?.link_text} buttonData={buttonData} />
                </div>
              ))}
      </CtaWrapper>;

    </PillContainer>
    
    </ThemeProvider>
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`
const CtaWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
  padding: 3.75vw 6vw;
  width: 81.5vw;
  border-radius: 1.5vw;
  background: ${(props) => props.theme.pillCta.cardBg};
  color: ${(props) => props.theme.pillCta.textColor};
  text-align: left;
  justify-content: space-between;
  gap: 3.75vw;

  ${media.fullWidth} {
    gap: 60px;
    padding: 60px 96px;
    width: 1304px;
    border-radius: 24px;
  }
  
  ${media.tablet} {
    gap: 5.859vw;
    width: 92.188vw;
    border-radius: 2.344vw;
    padding: 5.859vw 3.906vw;
  }
  
  ${media.mobile} {
    flex-direction: column;
    text-align: center;
    gap: 3.333vw;
    padding: 8.333vw 5vw;
    width: 89.167vw;
    border-radius: 5vw;
  }
`;

const PillContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`;

export default PillCTA;
