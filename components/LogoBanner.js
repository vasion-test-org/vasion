"use client";
import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LogoBanner = ({ blok }) => {
  console.log("Logo Banner", blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".logo-banner",
      start: "top top",
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger &&
          trigger.trigger.classList.contains("logo-banner")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        className="logo-banner"
        spacing={blok.section_spacing}
        spacingOffset={blok.offset_spacing}
        {...storyblokEditable(blok)}
      >
        <Logo
          src={blok.assets.filename}
          alt="centered-banner-logo"
          {...storyblokEditable(blok)}
        />
      </Wrapper>
    </ThemeProvider>
  );
};

export default LogoBanner;

const Logo = styled.img`
  width: 9.375vw;
  height: 4.015vw;

  ${media.fullWidth} {
    width: 150px;
    height: 64.24px;
  }
  ${media.tablet} {
    width: 11.719vw;
    height: 5.019vw;
  }
  ${media.mobile} {
    width: 25vw;
    height: 10.706vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 6.5vw;
  background: ${(props) => props.theme.logo_banner.bg};
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
  position: relative;
  z-index: 20;

  ${media.fullWidth} {
    height: 104px;
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
    height: 8.925vw;
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
    height: 19.04vw;
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
