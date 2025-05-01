"use client";
import React from "react";
import styled from "styled-components";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";

const FigmaEmbed = ({ blok }) => {
  // console.log(blok);
  const handleNavigate = (link) => {
    window.open(link, "_blank");
  };
  const allButtons = blok.buttons.map((button) => (
    <ButtonImage
      loading="lazy"
      src={button.button_image.filename}
      alt={button.button_image.filename}
      onClick={() => handleNavigate(button.link_url.url)}
    />
  ));
  return (
    <Wrapper spacingOffset={blok.offset_spacing} spacing={blok.section_spacing}>
      <ContentDiv>
        <Header>{blok.header}</Header>
        <BodyCopy>{blok.body_copy}</BodyCopy>
        <Buttons>{allButtons}</Buttons>
      </ContentDiv>
      <FigmaEmbedWindow src={blok.figma_embed_link.url} />
    </Wrapper>
  );
};

const FigmaEmbedWindow = styled.iframe`
  width: 56.667vw;
  height: 39.931vw;

  ${media.fullWidth} {
    width: 816px;
    height: 575px;
  }

  ${media.tablet} {
    width: 50.391vw;
    height: 56.152vw;
  }

  ${media.mobile} {
    width: 97.196vw;
    height: 122.664vw;
  }
`;
const ButtonImage = styled.img`
  cursor: pointer;
  width: 12.153vw;
  height: 3.542vw;

  ${media.fullWidth} {
    width: 175px;
    height: 51px;
  }

  ${media.tablet} {
    width: 14.746vw;
    height: 4.395vw;
  }

  ${media.mobile} {
    width: 40.888vw;
    height: 11.916vw;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.486vw;

  ${media.fullWidth} {
    gap: 7px;
  }

  ${media.tablet} {
    gap: 0.684vw;
  }

  ${media.mobile} {
    gap: 1.636vw;
  }
`;
const BodyCopy = styled.p`
  ${text.bodyMd};
`;
const Header = styled.h3`
  ${text.h3};
`;
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.111vw;
  width: 25.278vw;

  ${media.fullWidth} {
    gap: 16px;
    width: 364px;
  }

  ${media.tablet} {
    gap: 1.563vw;
    width: 35.547vw;
  }

  ${media.mobile} {
    gap: 3.738vw;
    width: 85.047vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: center;
  gap: 9.097vw;
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

    gap: 131px;
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

    gap: 5.859vw;
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

    flex-direction: column-reverse;
    gap: 7.477vw;
  }
`;
export default FigmaEmbed;
