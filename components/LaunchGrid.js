"use client";
import React, { useContext } from "react";
import Button from "@/components/globalComponents/Button";
import { ScreenContext } from "@/components/providers/Screen";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Card from "./globalComponents/Card";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import colors from "@/styles/colors";
import useMedia from "@/functions/useMedia";

const LaunchGrid = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const responsiveBackground = useMedia(
    blok?.launch_cta?.[0]?.assets?.[1]?.filename,
    blok?.launch_cta?.[0]?.assets?.[1]?.filename,
    blok?.launch_cta?.[0]?.assets?.[2]?.filename,
    blok?.launch_cta?.[0]?.assets?.[3]?.filename,
  );

  const ctaCopy = blok.launch_cta[0].copy_section.map((copy, index) => {
    return <RichTextRenderer document={copy.copy} key={index} />;
  });

  const cards = blok?.cards?.map((card) => {
    if (!card.Image?.filename) return null;
    const cardContent = {
      content: card.content,
      Button: card.Button,
      Image: card.Image,
      has_hover: card.has_hover,
      image_border: card.image_border,
      blur_card: card.blur_card,
    };

    return (
      <Card
        key={card._uid}
        blur={card.blur_card}
        content={cardContent}
        {...storyblokEditable(card)}
      >
        <CardImage src={card.Image.filename} />
        <CardCopy>
          {card.content?.map((copyItem) => (
            <div key={copyItem._uid}>
              <RichTextRenderer document={copyItem.copy} />
            </div>
          ))}
        </CardCopy>
        {card?.Button?.map(($buttonData) => (
          <ButtonWrapper
            {...storyblokEditable($buttonData)}
            key={$buttonData.link_text}
          >
            <Button key={$buttonData.link_text} $buttonData={$buttonData} />
          </ButtonWrapper>
        ))}
      </Card>
    );
  });
  const ctaContent = (
    <CtaContent>
      <Tag>
        <RichTextRenderer document={blok?.launch_cta[0]?.tag?.[0]?.copy} />
      </Tag>
      <CtaCopy {...storyblokEditable(blok?.launch_cta?.[0])}>{ctaCopy}</CtaCopy>
      {blok?.launch_cta?.[0]?.button_group?.map(($buttonData) => (
        <div {...storyblokEditable($buttonData)} key={$buttonData.link_text}>
          <Button key={$buttonData.link_text} $buttonData={$buttonData} />
        </div>
      ))}
    </CtaContent>
  );

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacing={blok.section_spacing}
        spacingOffset={blok.offset_spacing}
      >
        <ContentWrapper>
          {!mobile && <Cta bg={responsiveBackground}>{ctaContent}</Cta>}
          {mobile && (
            <MobileCta>
              <TopMobile bg={responsiveBackground}></TopMobile>
              <BottomMobile>{ctaContent}</BottomMobile>
            </MobileCta>
          )}
        </ContentWrapper>
        <CardsWrapper>{cards}</CardsWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default LaunchGrid;
const BottomMobile = styled.div`
  display: flex;
  background: ${colors.darkPurple};
  width: 89.167vw;
  height: fit-content;
  padding: 9.167vw 5vw;
  border-radius: 0 0 5vw 5vw;
`;
const TopMobile = styled.div`
  height: 63.75vw;
  width: 89.167vw;
  background: ${(props) => (props?.bg ? `url(${props?.bg})` : "unset")};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5vw 5vw 0 0;
`;
const MobileCta = styled.div`
  display: flex;
  flex-direction: column;
  width: 89.167vw;
`;
const CardCopy = styled.div``;
const CardImage = styled.img`
  position: relative;
  width: 100%;
  height: 14.25vw;
  border-radius: 0.375vw;

  ${media.fullWidth} {
    height: 228px;
    border-radius: 6px;
  }
  ${media.tablet} {
    height: 15.625vw;
    border-radius: 0.586vw;
  }
  ${media.mobile} {
    height: 48.333vw;
    border-radius: 1.25vw;
  }
`;
// const Card = styled.div`
//   position: relative;
//   filter: ${(props) => (props?.blur ? `blur(0.25vw)` : "unset")};
//   display: flex;
//   flex-direction: column;
//   width: 26.313vw;
//   gap: 1vw;
//   padding: 0.5vw;
//   border-radius: 1vw;
//   background: #fff;
//   box-shadow:
//     0vw 0vw 0.063vw 0vw rgba(25, 29, 30, 0.04),
//     0vw 0.125vw 0.25vw 0vw rgba(25, 29, 30, 0.16);
//   ${media.fullWidth} {
//     filter: ${(props) => (props?.blur ? `blur(4px)` : "unset")};
//     width: 421px;
//     gap: 16px;
//     border-radius: 16px;
//     padding: 8px;
//     background: #fff;
//     box-shadow:
//       0px 0px 1px 0px rgba(25, 29, 30, 0.04),
//       0px 2px 4px 0px rgba(25, 29, 30, 0.16);
//   }
//   ${media.tablet} {
//     filter: ${(props) => (props?.blur ? `blur(0.391vw)` : "unset")};
//     width: 29.395vw;
//     gap: 1.563vw;
//     border-radius: 1.563vw;
//     padding: 0.781vw;
//     background: #fff;
//     box-shadow:
//       0vw 0vw 0.098vw 0vw rgba(25, 29, 30, 0.04),
//       0vw 0.195vw 0.391vw 0vw rgba(25, 29, 30, 0.16);
//   }
//   ${media.mobile} {
//     display: ${(props) => (props?.blur ? "none" : "flex")};
//     width: 89.167vw;
//     gap: 3.333vw;
//     border-radius: 3.333vw;
//     padding: 1.667vw;
//     background: #fff;
//     box-shadow:
//       0vw 0vw 0.208vw 0vw rgba(25, 29, 30, 0.04),
//       0vw 0.417vw 0.833vw 0vw rgba(25, 29, 30, 0.16);
//   }
// `;
const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-self: flex-start;
  justify-self: flex-end;
  margin-top: auto;
`;
const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25vw;
  height: max-content;
  ${media.fullWidth} {
    gap: 20px;
  }
  ${media.tablet} {
    gap: 1.953vw;
  }
  ${media.mobile} {
    gap: 4.167vw;
  }
`;
const CtaCopy = styled.div`
  margin-bottom: 2.5vw;
  text-wrap: none;
  ${media.fullWidth} {
    margin-bottom: 40px;
  }
  ${media.tablet} {
    margin-bottom: 3.906vw;
  }
  ${media.mobile} {
    margin-bottom: 8.333vw;
  }
`;
const Tag = styled.div`
  display: flex;
  padding: 0.25vw 0.5vw;
  width: fit-content;
  margin-bottom: 0.75vw;
  background-color: ${colors.purple200};
  border-radius: 1.5vw;

  ${media.fullWidth} {
    padding: 4px 8px;
    border-radius: 24px;
    margin-bottom: 12px;
  }
  ${media.tablet} {
    padding: 4px 7px;
    border-radius: 2.344vw;
    margin-bottom: 1.172vw;
  }
  ${media.mobile} {
    padding: 0.833vw 1.667vw;
    border-radius: 5vw;
    margin-bottom: 2.5vw;
  }
`;
const CtaContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 33.25vw;

  ${media.fullWidth} {
    width: 532px;
  }
  ${media.tablet} {
    width: 33.301vw;
  }
  ${media.mobile} {
    width: 79.167vw;
  }
`;

const Cta = styled.div`
  position: relative;
  justify-content: right;
  align-items: center;
  display: flex;
  width: 81.5vw;
  height: fit-content;
  min-height: 24.5vw;
  border-radius: 0.5vw;
  padding-right: 3.75vw;
  background: ${(props) => (props?.bg ? `url(${props.bg})` : "unset")};
  background-size: cover;
  background-repeat: no-repeat;

  ${media.fullWidth} {
    width: 1304px;
    border-radius: 8px;
    height: fit-content;
    min-height: 392px;
    padding-right: 60px;
  }
  ${media.tablet} {
    width: 92.188vw;
    border-radius: 0.781vw;
    height: auto;
    min-height: 33.594vw;
    padding-right: 5.859vw;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }
  ${media.tablet} {
    gap: 7.031vw;
  }
  ${media.mobile} {
    gap: 0vw;
  }
`;
const CopyWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
  background: ${colors.lightPurpleGrey};
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
    gap: 40px;
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
    gap: 3.906vw;
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
    gap: 8.333vw;
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
