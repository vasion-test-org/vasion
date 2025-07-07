"use client";
import React from "react";

import { storyblokEditable } from "@storyblok/react/rsc";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import media, { mobile, desktop, tablet } from "@/styles/media";
import ComponentRenderer from "./renderers/ComponentRenderer";

const SideBySide = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const isLeftAsset = blok.left_side_component?.[0]?.component === "assets";
  const isRightAsset = blok.right_side_component?.[0]?.component === "assets";
  const isLeftVideo =
    blok.left_side_component?.[0]?.component === "video_assets";
  const isRightVideo =
    blok.right_side_component?.[0]?.component === "video_assets";

  const isSideBySideAsset = isLeftAsset && isRightAsset;
  const isSideBySideVideo = isLeftVideo || isRightVideo;

  const content = (
    <>
      <ComponentRenderer
        // className="preformContent"
        extra_copy={blok.left_extra_copy?.[0]}
        blok={blok.left_side_component[0]}
        isSideBySideAsset={isSideBySideAsset}
        isSideBySideVideo={isSideBySideVideo}
      />
      <ComponentRenderer
        extra_copy={blok.right_extra_copy?.[0]}
        blok={blok.right_side_component[0]}
        isSideBySideAsset={isSideBySideAsset}
        isSideBySideVideo={isSideBySideVideo}
      />
    </>
  );

  const sideBySideContent = blok.card ? (
    <CardWrapper
      {...storyblokEditable(blok)}
      flipped={blok.flipped}
      card_background_color={blok?.card_background_color?.value}
    >
      <SideBySideWrapper
        gap={blok.gap}
        asset_form={blok.asset_form}
        extra_copy={blok.extra_copy}
        card={blok.card}
        isSideBySideAsset={isSideBySideAsset}
        flipped={blok.flipped}
      >
        {content}
      </SideBySideWrapper>
    </CardWrapper>
  ) : (
    <SideBySideWrapper
      {...storyblokEditable(blok)}
      gap={blok.gap}
      asset_form={blok.asset_form}
      extra_copy={blok.extra_copy}
      flipped={blok.flipped}
      isSideBySideAsset={isSideBySideAsset}
    >
      {content}
    </SideBySideWrapper>
  );

  return (
    <ThemeProvider theme={selectedTheme}>
      <SpacingContainer
        data-anchor-id={blok.anchor_id}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
      >
        {sideBySideContent}
      </SpacingContainer>
    </ThemeProvider>
  );
};

const SpacingContainer = styled.div`
  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `${props.spacing}px / 1600 * 100vw) 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 ${(props.spacing / 1600) * 100}vw`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `${(props.spacing / 1600) * 100}vw 0`
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
  }

  ${media.mobile} {
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
  }
`;

const CardWrapper = styled.div`
  background: ${(props) =>
    props.card_background_color || props.theme.side_by_side.bg};
  color: ${(props) => props.theme.side_by_side.textColor};
  border-radius: 1.5vw;
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.card ? "3.75vw" : "3.75vw")};

  ${media.fullWidth} {
    border-radius: 24px;
    padding: ${(props) => (props.card ? "60px" : "60px")};
  }

  ${media.tablet} {
    width: 92.188vw;
    border-radius: 2.344vw;
    padding: 3.906vw 2.539vw;
  }

  ${media.mobile} {
    flex-direction: ${(props) =>
      props.flipped === true ? "column-reverse" : "column"};
    width: 89.167vw;
    border-radius: 5vw;
    padding: 5.417vw;
  }
`;

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: ${(props) => (props.extra_copy ? "start" : "center")};
  text-align: left;
  background: ${(props) =>
    props.card ? "transparent" : props.theme.side_by_side.bg};
  color: ${(props) =>
    props.card ? "inherit" : props.theme.side_by_side.textColor};

  /* Apply negative margin only to form components */
  > .form-component {
    margin-top: ${(props) => (props.asset_form ? "-12.5vw" : "unset")};

    ${media.fullWidth} {
      margin-top: ${(props) => (props.asset_form ? "-200px" : "unset")};
    }

    ${media.tablet} {
      margin-top: ${(props) => (props.asset_form ? "-9.375vw" : "unset")};
    }

    ${media.mobile} {
      width: auto !important;
      margin-top: ${(props) => (props.asset_form ? "unset" : "unset")};
    }
  }

  > * {
    ${media.mobile} {
      width: 78.333vw;
    }
  }

  gap: ${(props) =>
    props.gap === "default"
      ? props.card || props.isSideBySideAsset
        ? "3.75vw"
        : "9.25vw"
      : props.gap
        ? `${props.gap}px`
        : props.card || props.isSideBySideAsset
          ? "3.75vw"
          : "9.25vw"};

  ${media.fullWidth} {
    gap: ${(props) =>
      props.gap === "default"
        ? props.card || props.isSideBySideAsset
          ? "60px"
          : "148px"
        : props.gap
          ? `${props.gap}px`
          : props.card || props.isSideBySideAsset
            ? "60px"
            : "148px"};
  }

  ${media.tablet} {
    gap: ${(props) =>
      props.gap === "default"
        ? "3.906vw"
        : props.gap
          ? `${props.gap}px`
          : "3.906vw"};
  }

  ${media.mobile} {
    flex-direction: ${(props) =>
      props.flipped === true ? "column-reverse" : "column"};
    gap: ${(props) =>
      props.gap === "default"
        ? "6.667vw"
        : props.gap
          ? `${props.gap}px`
          : "6.667vw"};
  }
`;

export default SideBySide;
