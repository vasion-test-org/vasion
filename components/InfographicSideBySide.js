"use client";
import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Image from "@/components/globalComponents/Image";
import colors from "@/styles/colors";

const InfographicSideBySide = ({ blok }) => {
  // console.log(blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        {...storyblokEditable(blok)}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        gap={blok.gap}
      >
        {blok.components.map((component) => (
          <React.Fragment key={component.id}>
            {component.component === "assets" ? (
              <SideContainer {...storyblokEditable(component)}>
                <Image
                  images={component.media}
                  borderradius={blok.border_radius}
                />
              </SideContainer>
            ) : (
              <InfographicBlok>
                <ImageContainer {...storyblokEditable(component)}>
                  <Image images={component.image[0].media} />
                </ImageContainer>
                {component.copy.map((copy) => (
                  <div {...storyblokEditable(copy)}>
                    <RichTextRenderer
                      document={copy.copy}
                      responsiveTextStyles={copy?.responsive_text_styles}
                    />
                  </div>
                ))}
              </InfographicBlok>
            )}
          </React.Fragment>
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};

const ImageContainer = styled.div`
  width: 20vw;

  ${media.fullWidth} {
    width: 320px;
  }

  ${media.tablet} {
    width: 22.656vw;
  }

  ${media.mobile} {
    width: 45.833vw;
  }
`;
const SideContainer = styled.div`
  max-width: 38.875vw;

  ${media.fullWidth} {
    max-width: 622px;
  }

  ${media.tablet} {
    max-width: 44.141vw;
  }

  ${media.mobile} {
    max-width: 89.167vw;
  }
`;
const InfographicBlok = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${colors.lightPurpleGrey};
  max-width: 38.875vw;
  gap: 2.5vw;
  padding: 3.969vw 4.625vw;
  border-radius: 1.25vw;

  ${media.fullWidth} {
    max-width: 622px;
    gap: 40px;
    padding: 64px 74px;
    border-radius: 20px;
  }

  ${media.tablet} {
    max-width: 44.141vw;
    gap: 3.906vw;
    padding: 4.443vw 3.906vw;
    border-radius: 1.953vw;
  }

  ${media.mobile} {
    max-width: 89.167vw;
    gap: 8.333vw;
    padding: 7.083vw 5.417vw;
    border-radius: 4.167vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `calc(${props.spacing}px / 1600 * 100vw) 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 calc(${props.spacing}px / 1600 * 100vw)`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `calc(${props.spacing}px / 1600 * 100vw) 0`
        : "3.75vw 0";
  }};

  gap: ${(props) =>
    props.gap === "default"
      ? "3.75vw"
      : props.gap
        ? `${props.gap}px`
        : "3.75vw"};

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
    gap: ${(props) =>
      props.gap === "default" ? "60px" : props.gap ? `${props.gap}px` : "60px"};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "3.906vw 3.906vw 0"
          : props.spacing
            ? `${props.spacing}px 3.906vw 0`
            : "3.906vw 3.906vw 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 3.906vw 3.906vw"
          : props.spacing
            ? `0 3.906vw ${props.spacing}px`
            : "0 3.906vw 3.906vw";
      }
      return props.spacing === "default"
        ? "3.906vw 3.906vw"
        : props.spacing
          ? `${props.spacing}px 3.906vw`
          : "3.906vw 3.906vw";
    }};
    gap: ${(props) =>
      props.gap === "default"
        ? "3.906vw"
        : props.gap
          ? `${props.gap}px`
          : "3.906vw"};
  }

  ${media.mobile} {
    flex-direction: column;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.417vw 5.417vw 0"
          : props.spacing
            ? `${props.spacing}px 5.417vw 0`
            : "5.417vw 5.417vw 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 5.417vw 5.417vw"
          : props.spacing
            ? `0 5.417vw ${props.spacing}px`
            : "0 5.417vw 5.417vw";
      }
      return props.spacing === "default"
        ? "5.417vw 5.417vw"
        : props.spacing
          ? `${props.spacing}px 5.417vw`
          : "5.417vw 5.417vw";
    }};
    gap: ${(props) =>
      props.gap === "default"
        ? "6.667vw"
        : props.gap
          ? `${props.gap}px`
          : "6.667vw"};
  }
`;
export default InfographicSideBySide;
