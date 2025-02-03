import React, { useEffect } from "react";
import gsap from "gsap";
import styled, { ThemeProvider } from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import { useAvailableThemes } from "@/context/ThemeContext"; 
import { horizontalLoop } from "@/functions/horizontalLoop";
import RichTextRenderer from "./RichTextRenderer";

const LogoCube = ({ blok }) => {
  const themes = useAvailableThemes(); 
  const selectedTheme = themes[blok.theme] || themes.light; 

  useEffect(() => {
    const logosArr = gsap.utils.toArray(".cubeLogos");
    horizontalLoop(logosArr, { deep: false, repeat: -1 });
  }, []);

  const defaultLogos = [
    { alt: "nascar logo", image: "/images/icons/nascar.png" },
    { alt: "espn logo", image: "/images/icons/espn.png" },
    { alt: "metlife logo", image: "/images/icons/metlife.png" },
    { alt: "priceline logo", image: "/images/icons/priceline.png" },
    { alt: "jpMorgan logo", image: "/images/icons/jpMorgan.png" },
    { alt: "GE logo", image: "/images/icons/GE.png" },
    { alt: "Yahoo logo", image: "/images/icons/Yahoo.png" },
    { alt: "Aon logo", image: "/images/icons/Aon.png" },
  ];

  const logosToDisplay = blok.logos?.length > 0 ? blok.logos : defaultLogos;

  const allLogos = logosToDisplay.map((logo, index) => (
    <LogosDiv key={logo.filename || logo.alt || index} className="cubeLogos">
      <Logo alt={logo.alt || "Default Logo"} src={logo.filename || logo.image} />
    </LogosDiv>
  ));

  return (
    <ThemeProvider theme={selectedTheme}>
      <CubeWrapper {...storyblokEditable(blok)}>
        <CardContainer>
          <RichTextRenderer document={blok.header} blok={blok} />
          <LogoContainer>{allLogos}</LogoContainer>
        </CardContainer>
      </CubeWrapper>
    </ThemeProvider>
  );
};

// Styled Components
const LogosDiv = styled.div`
  width: auto;
  height: auto;
`;

const Logo = styled.img`
  height: 6.944vw;
  width: 13.889vw;

  ${media.fullWidth} {
    height: 100px;
    width: 200px;
  }

  ${media.tablet} {
    height: 9.766vw;
    width: 19.531vw;
  }

  ${media.mobile} {
    height: 23.364vw;
    width: 46.729vw;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: auto;
  overflow: hidden;
  gap: 1.389vw;
  width: 77.222vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    gap: 4.673vw;
  }
`;

const Header = styled(RichTextRenderer)``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.cardBg}; 
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  width: 90.556vw;
  border-radius: 1.667vw;
  padding: 4.167vw 6.667vw;
  gap: 2.778vw;

  ${media.fullWidth} {
    width: 1304px;
    border-radius: 24px;
    padding: 60px 96px;
    gap: 40px;
  }

  ${media.tablet} {
    border-radius: 2.344vw;
    padding: 3.906vw 3.906vw 5.859vw 3.906vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    border-radius: 5.607vw;
    padding: 9.346vw 6.075vw 14.019vw 6.075vw;
    gap: 7.477vw;
  }
`;

const CubeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  padding: 4.167vw 0;

  ${media.fullWidth} {
    width: 1440px;
    padding: 60px 0;
  }

  ${media.tablet} {
    padding: 5.859vw 0;
  }

  ${media.mobile} {
    padding: 9.346vw 0;
  }
`;

export default LogoCube;
