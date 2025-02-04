import React, { useContext } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import styled, { ThemeProvider } from "styled-components";
import media from "@/styles/media";

import { useAvailableThemes } from "@/context/ThemeContext";
import { ScreenContext } from "@/components/Providers/Screen";

import RichTextRenderer from "@/components/RichTextRenderer";
import Cards from "@/components/centeredSections/Cards";
import Grid from "@/components/centeredSections/Grid";
import Image from "@/components/globalComponents/Image";
import Button from "@/components/globalComponents/Button";

const CenteredSection = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  const themes = useAvailableThemes(); 
  const selectedTheme = themes[blok.theme] || themes.default; 
  // console.log(blok)
  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper {...storyblokEditable(blok)}>
        <ContentWrapper>
          {blok.centered_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} alignment={copy.alignment} />
            </div>
          ))}
          {blok.buttons.map((buttonData) => (
             <div {...storyblokEditable(buttonData)} key={buttonData.link_text}>
            <Button key={buttonData.link_text} buttonData={buttonData} />
            </div>
          ))}
        </ContentWrapper>

        {blok?.media &&
        <div {...storyblokEditable(blok.media)}>
          <Image
            images={blok.media?.[0]?.media}
            borderRadius={blok.media?.[0]?.border_radius}
          />
          </div>
        }

        {blok.cards && <Cards cardData={blok.cards} />}
        {blok.grid && <Grid gridData={blok.grid} />}
      </CenteredWrapper>
    </ThemeProvider>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75.278vw;
  gap: 1.111vw;
`;

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.111vw;
  /* background: ${(props) => props.theme.cardBg};  */
  color: ${(props) => props.theme.centered.textColor}; 
  padding: 4.167vw 0;

  ${media.fullWidth} {
    padding: 60px 0;
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`;

export default CenteredSection;


