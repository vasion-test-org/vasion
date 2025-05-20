"use client";
import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import media from "@/styles/media";
import { storyblokEditable } from "@storyblok/react/rsc";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "styles/colors";
// import text from 'styles/text';
import Button from "@/components/globalComponents/Button";
import useMedia from "@/functions/useMedia";

const InfographicPill = ({ blok }) => {
  console.log("InfographicPill", blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const backgroundColor =
    blok.theme === "default" || blok.theme === "light"
      ? colors?.lightPurpleGrey
      : colors?.primaryPurple;
  const imageSrc =
    blok.gallery && blok.gallery.length > 0
      ? useMedia(
          blok.gallery[0]?.filename,
          blok.gallery[0]?.filename,
          blok.gallery[1]?.filename || blok.gallery[0]?.filename,
          blok.gallery[2]?.filename || blok.gallery[0]?.filename,
        )
      : null;
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper>
        <PillWrapper
          backgroundcolor={backgroundColor}
          flipcontent={blok.flip_content}
        >
          <MediaWrapper {...storyblokEditable(blok)}>
            {imageSrc && (
              <SideImage
                src={imageSrc}
                alt={blok.gallery[0]?.alt || ""}
                borderradius={blok.image_border}
              />
            )}
          </MediaWrapper>
          <CopySection>
            {blok.copy_section && (
              <div {...storyblokEditable(blok.copy_section)}>
                <RichTextRenderer document={blok.copy_section} />
              </div>
            )}
          </CopySection>
        </PillWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default InfographicPill;
const CopySection = styled.div`
  max-width: 50.25vw;

  ${media.fullWidth} {
    max-width: 804px;
  }
  ${media.tablet} {
    max-width: 122.083vw;
  }
  ${media.mobile} {
    max-width: 376px;
  }
`;
const SideImage = styled.img`
  width: 20vw;
  height: 15vw;
  border-radius: ${(props) =>
    props.borderradius ? `${props.borderradius}` : "unset"};
  object-fit: contain;
  ${media.fullWidth} {
    width: 320px;
    height: 240px;
  }
  ${media.tablet} {
    width: 22.656vw;
    height: 16.992vw;
  }
  ${media.mobile} {
    width: 45.833vw;
    height: 34.375vw;
  }
`;
const MediaWrapper = styled.div`
  max-width: 67.75vw;

  ${media.fullWidth} {
    max-width: 1084px;
  }

  ${media.tablet} {
    max-width: 92.188vw;
  }

  ${media.mobile} {
    max-width: 89.167vw;
  }
`;

const PillWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props?.flipcontent ? "row-reverse" : "row")};
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundcolor};
  width: 81.5vw;
  height: 19vw;
  gap: 3.75vw;
  border-radius: 1.063vw;

  ${media.fullWidth} {
    width: 1304px;
    height: 304px;
    gap: 60px;
    border-radius: 17px;
  }
  ${media.tablet} {
    width: 92.188vw;
    height: 23.242vw;
    gap: 3.906vw;
    border-radius: 1.66vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    height: 66.875vw;
    flex-direction: ${(props) =>
      props?.flipcontent ? "column-reverse" : "column"};
    gap: 8.333vw;
    border-radius: 3.542vw;
    text-align: center;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `${props.spacing}px 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `${props.spacing}px 0`
        : "3.75vw 0";
  }};
`;
