"use client";
import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import useMedia from "@/functions/useMedia";

const InfographicPill = ({ blok }) => {
  console.log("infographicPill", blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const imageSrc =
    blok.media && blok.media.length > 0 && blok.media[0]?.media?.length > 0
      ? useMedia(
          blok.media[0]?.media[0]?.filename,
          blok.media[0]?.media[0]?.filename,
          blok.media[0]?.media[1]?.filename ||
            blok.media[0]?.media[0]?.filename,
          blok.media[0]?.media[2]?.filename ||
            blok.media[0]?.media[0]?.filename,
        )
      : null;
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacing={blok.section_spacing}
        spacingOffset={blok.offset_spacing}
      >
        <PillWrapper flipcontent={blok.flip_content}>
          <MediaWrapper {...storyblokEditable(blok)}>
            {imageSrc && (
              <SideImage
                src={imageSrc}
                alt={blok.media[0]?.alt || ""}
                borderradius={blok.image_border}
              />
            )}
          </MediaWrapper>
          <CopySection>
            {blok.copy_sections &&
              blok.copy_sections.map((copy) => (
                <div {...storyblokEditable(copy)} key={copy._uid}>
                  <RichTextRenderer
                    document={copy?.copy}
                    responsiveTextStyles={copy.responsive_text_styles}
                  />
                </div>
              ))}
          </CopySection>
        </PillWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default InfographicPill;
const CopySection = styled.div`
  color: ${(props) => props.theme.infographic_pill.text_color || "unset"};
  width: 50.25vw;

  ${media.fullWidth} {
    width: 804px;
  }
  ${media.tablet} {
    width: 122.083vw;
  }
  ${media.mobile} {
    width: 78.333vw;
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
  background: ${(props) => props.theme?.infographic_pill?.bg || "unset"};
  width: 81.5vw;
  height: 19vw;
  gap: 3.75vw;
  border-radius: 1.063vw;
  padding: 3.75vw;

  ${media.fullWidth} {
    width: 1304px;
    height: 304px;
    gap: 60px;
    border-radius: 17px;
    padding: 60px;
  }
  ${media.tablet} {
    width: 92.188vw;
    height: 23.242vw;
    gap: 3.906vw;
    border-radius: 1.66vw;
    padding: 2.539vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    height: 66.875vw;
    flex-direction: ${(props) =>
      props?.flipcontent ? "column-reverse" : "column"};
    gap: 8.333vw;
    border-radius: 3.542vw;
    text-align: center;
    padding: 10.833vw;
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

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "60px 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "60px 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 60px"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 60px";
      }
      return props.spacing === "default"
        ? "60px 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "60px 0";
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.859vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "5.859vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 5.859vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 5.859vw";
      }
      return props.spacing === "default"
        ? "5.859vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "5.859vw 0";
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "12.5vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "12.5vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 12.5vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 12.5vw";
      }
      return props.spacing === "default"
        ? "12.5vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "12.5vw 0";
    }};
  }
`;
