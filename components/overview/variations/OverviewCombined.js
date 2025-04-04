"use client";
import React from "react";
import styled from "styled-components";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";
import Button from "components/globalComponents/Button";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Parenthesis from "@/assets/svg/Parenthesis.svg";
import { storyblokEditable } from "@storyblok/react/rsc";
const Combined = ({ blok }) => {
  console.log("Combined->", blok);
  const statlist = blok?.stats?.stat_list?.map((item) => {
    return (
      <StatItem {...storyblokEditable(item)} key={item._uid}>
        <StatHeadline>{item?.headline}</StatHeadline>
        <StatBody>
          <RichTextRenderer document={item?.body_copy} />
        </StatBody>
      </StatItem>
    );
  });

  return (
    <Wrapper
      spacingOffset={blok.offset_spacing}
      spacing={blok.section_spacing}
      {...storyblokEditable(blok)}
    >
      <ContentDiv {...storyblokEditable(blok)}>
        <Quotation />
        <QuoteBlock>
          {/* {blok?.quote?.quote_image?.[0]?.media[0]?.filename && ( */}
          {/*   <QuoteImageStart */}
          {/*     src={blok?.quote?.quote_image[0].media[0].filename} */}
          {/*     alt={blok?.quote?.quote_image[0]?.media[0].alt} */}
          {/*   /> */}
          {/* )} */}
          <QuoteCopy>
            {blok?.quote?.copy?.find((item) => item.component === "header")
              ?.copy?.content && (
              <Header {...storyblokEditable(blok.quote.copy)}>
                <RichTextRenderer
                  document={
                    blok?.quote?.copy?.find(
                      (item) => item.component === "header",
                    )?.copy
                  }
                />
              </Header>
            )}

            {blok?.quote?.copy?.find((item) => item.component === "body_copy")
              ?.copy?.content && (
              <BodyCopy {...storyblokEditable(blok.quote.copy[0 || 1])}>
                <RichTextRenderer
                  document={
                    blok?.quote?.copy?.find(
                      (item) => item.component === "body_copy",
                    )?.copy
                  }
                />
              </BodyCopy>
            )}
            {blok.quote?.copy && blok.quote?.copy.length >= 2 && (
              <Attribution>
                -
                <RichTextRenderer
                  document={
                    blok.quote.copy.length === 3
                      ? blok?.quote.copy[2].copy
                      : blok.quote?.copy[1].copy
                  }
                />
              </Attribution>
            )}
          </QuoteCopy>
          {blok?.quote?.quote_image[0]?.media[0]?.filename && (
            <QuoteSideImg
              src={blok?.quote?.quote_image[0]?.media[0].filename}
              alt={blok?.quote?.quote_image[0]?.media[0].alt}
            />
          )}
        </QuoteBlock>

        <Divider />

        <StatBlock>
          <HeaderDiv>
            <Headline>{blok?.stats?.headline}</Headline>
          </HeaderDiv>
          {blok?.stats?.stat_logo_header?.filename && (
            <ImageHeadline
              src={blok?.stats?.stat_logo_header?.filename}
              alt={blok?.stats?.stat_logo_header?.alt}
            />
          )}
          <StatItemsContainer>{statlist}</StatItemsContainer>
        </StatBlock>
        {blok?.link?.link_text && (
          <Button
            $buttonData={{
              theme: "orange_link",
              link_url: { url: blok.link.link_url },
              link_text: blok?.link.link_text,
              link_size: "small",
            }}
          />
        )}
      </ContentDiv>
    </Wrapper>
  );
};

export default Combined;

const ImageHeadline = styled.img`
  width: 10.347vw;
  height: 2.083vw;

  ${media.fullWidth} {
    width: 149px;
    height: 30px;
  }

  ${media.tablet} {
    width: 14.551vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    width: 34.813vw;
    height: 7.009vw;
    margin-bottom: 2.804vw;
    margin-top: 9.346vw;
  }
`;

const StatBody = styled.div`
  ${text.bodySm};

  ${media.mobile} {
    ${text.bodySm}
  }
`;

const StatHeadline = styled.p`
  ${text.h3};
  color: ${colors.primaryOrange};
`;
const StatItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  flex-wrap: wrap;
  gap: 0.25vw;

  ${media.fullWidth} {
    gap: 4px;
  }

  ${media.tablet} {
    gap: 0.391vw;
  }

  ${media.mobile} {
    ${text.bodySm}
    align-items: flex-start;
    text-align: flex-start;
    width: 45.093vw;
    gap: 0.833vw;
  }
`;
const StatItemsContainer = styled.div`
  display: flex;
  gap: 3.75vw;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${media.fullWidth} {
    gap: 60px;
  }

  ${media.tablet} {
    gap: 5.859vw;
    align-items: flex-start;
    justify-content: flex-start;
  }

  ${media.mobile} {
    gap: 3.333vw;
    width: fit-content;
    flex-direction: column;
    align-self: flex-start;
    justify-content: flex-start;
  }
`;
const Headline = styled.h4`
  ${text.bodyXlBold};

  ${media.mobile} {
    ${text.bodyLgBold};
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-self: center;
`;
const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.25vw;
  width: 100%;
  gap: 1vw;
  ${media.fullWidth} {
    gap: 16px;
    margin-bottom: 20px;
  }

  ${media.tablet} {
    gap: 1.563vw;
    margin-bottom: 1.953vw;
  }

  ${media.mobile} {
    align-items: flex-start;
    align-self: flex-start;
    gap: 3.333vw;
    margin-bottom: 4.167vw;
  }
`;
// Stats Component

const Divider = styled.div`
  width: 100%;
  background-color: ${colors.grey75};
  height: 0.063vw;
  border-radius: 3.125vw;

  ${media.fullWidth} {
    height: 1px;
    border-radius: 50px;
  }

  ${media.tablet} {
    height: 0.098vw;
    border-radius: 4.883vw;
  }

  ${media.mobile} {
    height: 0.208vw;
    border-radius: 10.417vw;
  }
`;

//Quote Component
const QuoteSideImg = styled.img`
  width: 22.222vw;
  height: 7.222vw;

  ${media.fullWidth} {
    width: 320px;
    height: 104px;
  }

  ${media.tablet} {
    width: 31.25vw;
    height: 10.156vw;
  }

  ${media.mobile} {
    width: 74.766vw;
    height: 24.299vw;
  }
`;
const Attribution = styled.div`
  display: flex;
  ${text.bodyMd};
`;

const BodyCopy = styled.div`
  ${text.bodyLg};

  ${media.mobile} {
    ${text.bodyMd};
  }
`;

const Header = styled.div`
  ${text.h4};
`;

const QuoteCopy = styled.div`
  display: flex;
  justify-content: center;
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

const QuoteImageStart = styled.img`
  height: 7.431vw;
  width: 7.431vw;
  border-radius: 8px;
  ${media.fullWidth} {
    height: 107px;
    width: 107px;
  }

  ${media.tablet} {
    height: 10.449vw;
    width: 10.449vw;
  }

  ${media.mobile} {
    display: none;
  }
`;

const Quotation = styled(Parenthesis)`
  position: absolute;
  top: -1.989vw;
  left: 2.083vw;
  width: 3.75vw;
  height: 3.75vw;
  z-index: 2;
  ${media.fullWidth} {
    top: -20px;
    left: 30px;
    width: 60px;
    height: 60px;
  }

  ${media.tablet} {
    top: -3.5vw;
    left: 2.93vw;
    width: 5.859vw;
    height: 5.859vw;
  }

  ${media.mobile} {
    top: -6.573vw;
    left: 7.944vw;
    width: 12.5vw;
    height: 12.5vw;
  }
`;
const QuoteBlock = styled.div`
  display: flex;
  gap: 1.5vw;
  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5vw;
    flex-direction: column;
  }
`;
const ContentDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${colors.lightPurpleGrey};
  width: 79.444vw;
  border-radius: 1.667vw;
  padding: 3.25vw 2vw;
  gap: 1.25vw;

  ${media.fullWidth} {
    width: 1144px;
    border-radius: 24px;
    padding: 52px 32px;
    gap: 24px;
  }

  ${media.tablet} {
    width: 91.992vw;
    border-radius: 2.344vw;
    padding: 3.906vw 3.125vw;
    gap: 2.344vw;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 88.084vw;
    border-radius: 5.607vw;
    padding: 8.333vw 6.667vw;
    gap: 20px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-self: center;
  flex-direction: column;
  z-index: 1;
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
