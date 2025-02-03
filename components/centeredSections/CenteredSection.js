import React, { useContext } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import Cards from "@/components/centeredSections/Cards";
import Grid from "@/components/centeredSections/Grid";
import Image from "@/components/globalComponents/Image";
import styled, { ThemeProvider } from "styled-components";
import { ScreenContext } from "@/components/Providers/Screen";
import RichTextRenderer from "@/components/RichTextRenderer";
import Button from "../globalComponents/Button";
import { useAvailableThemes } from "@/context/ThemeContext";

const CenteredSection = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  const themes = useAvailableThemes(); 
  const selectedTheme = themes[blok.theme] || themes.light; 

  return (
    <ThemeProvider theme={selectedTheme}>
      <CenteredWrapper {...storyblokEditable(blok)}>
        <ContentWrapper>
          {blok.centered_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} alignment={copy.alignment} />
            </div>
          ))}
          {blok.button.map((buttonData) => (
            <Button key={buttonData.label} buttonData={buttonData} />
          ))}
        </ContentWrapper>

        {blok?.media?.map((mediaOptions) => (
          <Image
            key={mediaOptions.alt}
            imageAlt={mediaOptions.alt}
            imageSrc={mediaOptions.filename}
          />
        ))}

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
  color: ${(props) => props.theme.textColor}; 
`;

export default CenteredSection;


