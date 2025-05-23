"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";

import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";
import getMedia from "@/functions/getMedia";
import Button from "./globalComponents/Button";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyblokEditable } from "@storyblok/react/rsc";

gsap.registerPlugin(ScrollTrigger);

const CustomerLogos = ({ blok }) => {
  // console.log(blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const categoryRef = useRef(`#${blok?.logos_category}`);
  const logosRef = useRef(`.${blok?.logos_category}-logos`);
  const mainCardRef = useRef(`.${blok?.logos_category}-mainContent`);
  const cardsRef = useRef(`.${blok?.logos_category}-cards`);
  const moreRef = useRef(`.${blok?.logos_category}-more`);
  const remainingRef = useRef(`.${blok?.logos_category}-remaining`);
  const primaryLogoCount = getMedia(9, 9, 6);
  // const remainingLogoCount = getMedia(9,9,6,0)
  const primaryLogos = blok?.logos?.slice(0, primaryLogoCount);
  const remainingLogos = blok?.logos?.slice(primaryLogoCount);

  const allLogos = primaryLogos?.map((logo) => (
    <Logo
      key={logo.filename}
      alt={logo?.alt}
      loading="lazy"
      className={`${blok?.logos_category}-logos`}
      src={logo.filename}
    />
  ));

  const logoOverflow = remainingLogos?.map((logo) => (
    <Logo
      key={logo.filename}
      loading="lazy"
      className={`${blok?.logos_category}-logos`}
      src={logo.filename}
      alt={logo?.alt}
    />
  ));

  useEffect(() => {
    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: categoryRef.current,
        start: "top 40%",
        end: "bottom bottom",
        // markers: true,
      },
    });

    logoTl
      .from(cardsRef.current, {
        y: 500,
        duration: 1.25,
        stagger: 0.1,
        ease: "power4",
      })
      .from(mainCardRef.current, { autoAlpha: 0, duration: 2.25 }, ">-.75")
      .from(logosRef.current, { autoAlpha: 0, duration: 1.75 }, "<");

    const moreTl = gsap.timeline({ paused: true });
    moreTl
      .to(remainingRef.current, {
        margin: "40, 0",
        height: "auto",
        duration: 0.5,
      })
      .reversed(true)
      .to(remainingRef.current, { autoAlpha: 1, duration: 0.5 }, ">-.25")
      .reversed(true);

    function expand() {
      moreTl.reversed() ? moreTl.play() : moreTl.reverse();
      moreRef.current.textContent = moreTl.reversed()
        ? `See other ${blok?.logos_category} Clients`
        : `Collapse other ${blok?.logos_category} Clients`;
    }

    moreRef.current.addEventListener("click", () => expand());
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        id={blok?.logos_category}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
      >
        <CardsDiv main_side={blok?.main_side} {...storyblokEditable(blok)}>
          {/* <Link href={blok?.main_link[0].link_url.url}> */}
          <MainCard className={`${blok?.logos_category}-cards`}>
            <MainLogo
              loading="lazy"
              className={`${blok?.logos_category}-mainContent`}
              src={blok?.main_logo?.filename}
              alt={blok?.main_logo?.alt}
            />
            <MainHeadline className={`${blok?.logos_category}-mainContent`}>
              {blok?.main_headline}
            </MainHeadline>
            <MainBody className={`${blok?.logos_category}-mainContent`}>
              {blok?.main_copy}
            </MainBody>
            {blok?.main_link?.map(($buttonData) => (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData?.link_text}
              >
                <Button
                  key={$buttonData?.link_text}
                  $buttonData={$buttonData}
                />
              </div>
            ))}
          </MainCard>
          {/* </Link> */}
          <LogosCard
            className={`${blok?.logos_category}-cards`}
            cardcolor={blok?.cardColor}
          >
            <LogoCategoryDiv className={`${blok?.logos_category}-logos`}>
              <LogosCategory>{blok?.logos_category}</LogosCategory>
            </LogoCategoryDiv>
            <LogosDiv>{allLogos}</LogosDiv>
          </LogosCard>
        </CardsDiv>
        <RemainingLogos
          className={`${blok?.logos_category}-remaining`}
          cardcolor={blok?.cardColor}
        >
          {logoOverflow}
        </RemainingLogos>
        <SeeMoreDiv ref={moreRef} className={`${blok?.logos_category}-more`}>
          See other {blok?.logos_category} Clients
        </SeeMoreDiv>
      </Wrapper>
    </ThemeProvider>
  );
};

const Logo = styled.img`
  width: 13.333vw;
  height: 7.5vw;

  ${media.fullWidth} {
    width: 192px;
    height: 108px;
  }

  ${media.tablet} {
    width: 18.75vw;
    height: 10.547vw;
  }

  ${media.mobile} {
    width: 43.86vw;
    height: 25.234vw;
  }
`;
const LogosDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  column-gap: 2.083vw;

  ${media.fullWidth} {
    column-gap: 30px;
  }

  ${media.tablet} {
    column-gap: 2.93vw;
  }

  ${media.mobile} {
    justify-content: unset;
    column-gap: unset;
  }
`;
const LogosCategory = styled.p`
  ${text.eyebrow};
  color: ${colors.grey400};
`;
const LogoCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  width: 29.236vw;
  padding-bottom: 0.694vw;
  border-bottom: 0.069vw solid ${colors.grey75};

  ${media.fullWidth} {
    width: 421px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.grey75};
  }

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    width: 51.869vw;
    padding-bottom: 2.336vw;
    border-bottom: 0.234vw solid ${colors.grey75};
  }
`;
const LogosCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${(props) => props.theme.customer_logos.card_bg};
  height: 100%;
  gap: 1.944vw;
  border-radius: 1.667vw;
  width: 52.014vw;
  padding: 1.667vw 1.528vw 1.389vw 1.528vw;

  ${media.fullWidth} {
    border-radius: 24px;
    width: 749px;
    padding: 24px 22px 20px 22px;
  }

  ${media.tablet} {
    border-radius: 2.344vw;
    width: 60.742vw;
    padding: 2.344vw 2.148vw 1.953vw 2.148vw;
  }

  ${media.mobile} {
    width: 87.85vw;
    border-radius: 5.607vw;
    padding: 5.607vw 0vw;
  }
`;
const Link = styled.a`
  ${text.bodyMdBold};
  color: ${colors.grey500};
`;
const MainBody = styled.p`
  ${text.bodyMd};
  margin-bottom: 4.444vw;

  ${media.fullWidth} {
    margin-bottom: 64px;
  }

  ${media.tablet} {
    margin-bottom: 6.25vw;
  }

  ${media.mobile} {
    margin-bottom: 14.953vw;
  }
`;
const MainHeadline = styled.h4`
  ${text.h4};
  margin-bottom: 1.667vw;

  ${media.fullWidth} {
    margin-bottom: 24px;
  }

  ${media.tablet} {
    margin-bottom: 2.344vw;
  }

  ${media.mobile} {
    margin-bottom: 5.607vw;
  }
`;
const MainLogo = styled.img`
  width: 21.528vw;
  height: 7.917vw;
  margin-bottom: 2.778vw;

  ${media.fullWidth} {
    width: 310px;
    height: 114px;
    margin-bottom: 40px;
  }

  ${media.tablet} {
    width: 30.273vw;
    height: 11.133vw;
    margin-bottom: 3.906vw;
  }

  ${media.mobile} {
    width: 72.43vw;
    height: 26.636vw;
    margin-bottom: 9.346vw;
  }
`;
const MainCard = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.customer_logos.card_bg};
  height: auto;
  width: 24.583vw;
  border-radius: 1.667vw;
  padding: 1.667vw 1.667vw 1.667vw 1.389vw;

  ${media.fullWidth} {
    width: 354px;
    border-radius: 24px;
    padding: 24px 24px 24px 20px;
  }

  ${media.tablet} {
    width: 29.297vw;
    border-radius: 2.344vw;
    padding: 2.344vw 2.344vw 2.344vw 1.953vw;
  }

  ${media.mobile} {
    width: 87.85vw;
    border-radius: 5.607vw;
    padding: 5.607vw 5.607vw 5.607vw 4.673vw;
  }
`;
const RemainingLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  background: ${(props) => props.theme.customer_logos.card_bg};
  height: 0;
  opacity: 0;
  overflow: hidden;
  gap: 1.944vw;
  border-radius: 1.667vw;
  width: 79.444vw;
  padding: 1.667vw 1.528vw 1.389vw 1.528vw;

  ${media.fullWidth} {
    gap: 28px;
    border-radius: 24px;
    width: 1144px;
    padding: 24px 22px 20px 22px;
  }

  ${media.tablet} {
    gap: 2.93vw;
    border-radius: 2.344vw;
    width: 92.188vw;
    padding: 2.344vw 4.199vw;
  }

  ${media.mobile} {
    display: none;
  }
`;
const SeeMoreDiv = styled.div`
  ${text.eyebrow};
  color: ${colors.grey500};
  margin: 1.667vw 0;

  ${media.fullWidth} {
    margin: 24px 0;
  }

  ${media.tablet} {
    margin: 2.344vw 0;
  }

  ${media.mobile} {
    display: none;
  }

  ${media.hover} {
    &:hover {
      cursor: pointer;
      color: ${colors.primaryOrange};
    }
  }
`;
const CardsDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.main_side ? "row" : "row-reverse")};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 2.847vw;

  ${media.fullWidth} {
    gap: 41px;
  }

  ${media.tablet} {
    gap: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 5.14vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.customer_logos.bg};

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
export default CustomerLogos;
