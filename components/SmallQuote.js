"use client";
import React from "react";

import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Image from "./globalComponents/Image";
import ComponentRenderer from "./renderers/ComponentRenderer";

const SmallQuote = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
  ];
  // console.log(blok);
  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <SmallQuoteContainer>
          <OrangeQuote src="/images/uiElements/Orange_Quote_Mark.webp" />
          {blok?.quote_image[0]?.media && (
            <ImageWrapper>
              <Image
                {...storyblokEditable(blok)}
                alt={blok?.quote_image[0]?.media[0]?.alt || "Default Image"}
                images={blok?.quote_image[0]?.media}
              />
            </ImageWrapper>
          )}
          <SmallQuoteContent>
            {blok.copy.map((item, index) => (
              // console.log(item)
              <div key={`item.component_${index}`} {...storyblokEditable(item)}>
                {copycomponents.includes(item.component) ? (
                  <RichTextRenderer document={item.copy} blok={item} />
                ) : (
                  <ComponentRenderer blok={item} />
                )}
              </div>
            ))}
          </SmallQuoteContent>
        </SmallQuoteContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

const OrangeQuote = styled.img`
  position: absolute;
  height: 3.75vw;
  width: 3.75vw;
  top: -1.9vw;
  left: 2vw;

  ${media.fullWidth} {
    height: 60px;
    width: 60px;
    top: -30px;
    left: 32px;
  }

  ${media.tablet} {
    height: 5.859vw;
    width: 5.859vw;
    top: -2.93vw;
    left: 3.125vw;
  }

  ${media.mobile} {
    height: 12.5vw;
    width: 12.5vw;
    top: -6.25vw;
    left: 6.667vw;
  }
`;
const ImageWrapper = styled.div`
  width: 6.688vw;
  height: 6.688vw;

  ${media.fullWidth} {
    width: 107px;
    height: 107px;
  }

  ${media.tablet} {
    height: 10.449vw;
    width: 10.449vw;
  }

  ${media.mobile} {
    display: none;
  }
`;
const SmallQuoteContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5vw;
  }
`;
const SmallQuoteContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border-radius: 1.5vw;
  gap: 1.5vw;
  width: 81.5vw;
  padding: 2vw;
  background: ${(props) => props.theme.small_quote.bg};
  color: ${(props) => props.theme.small_quote.textColor};

  ${media.fullWidth} {
    width: 1304px;
    padding: 32px;
    border-radius: 24px;
    gap: 24px;
  }

  ${media.tablet} {
    width: 92.188vw;
    padding: 3.125vw;
    border-radius: 2.344vw;
    gap: 2.344vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    padding: 5.833vw;
    border-radius: 5vw;
    gap: unset;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
          ? "3.906vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "3.906vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 3.906vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 3.906vw";
      }
      return props.spacing === "default"
        ? "3.906vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "3.906vw 0";
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
export default SmallQuote;
