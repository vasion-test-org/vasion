"use client";
import React from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import styled, { ThemeProvider } from "styled-components";
import media from "@/styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";

import { useAvailableThemes } from "@/context/ThemeContext";
import { ScreenContext } from "@/components/providers/Screen";
import Button from "@/components/globalComponents/Button";
import Image from "@/components/globalComponents/Image";
import LogoCube from "./LogoCube";
import LightboxBtn from "@/components/LightboxButton";
import { useRouter } from "next/navigation";

const Hero = ({ blok }) => {
  const router = useRouter();
  // console.log("HERO", blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  let customTheme = blok.custom_theme?.[0] || {};
  if (!blok.custom_theme_builder) {
    customTheme = undefined;
  }

  const handleNavigate = (link) => {
    const isExternalLink = link.startsWith("http") || link.startsWith("https");
    if (isExternalLink) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  // console.log(blok.centered_image);
  return (
    <ThemeProvider theme={{ ...selectedTheme, customtheme: customTheme }}>
      <HeroBGWrapper>
        <HeroWrapper
          layout={blok.hero_layout}
          gap={blok.gap}
          spacingOffset={blok.offset_spacing}
          spacing={blok.section_spacing}
          centered={!blok?.hero_asset[0]}
          socials={blok.socials}
        >
          <ContentWrapper
            socials={blok.socials}
            centered={!blok?.hero_asset[0] && !blok.socials}
            centered_image={blok.centered_image}
          >
            {blok?.hero_asset[0] && blok.centered_image && (
              <ImageWrapper {...storyblokEditable(blok)}>
                <Image
                  images={blok.hero_asset}
                  // borderRadius={blok.hero_asset?.[0]?.border_radius}
                />
              </ImageWrapper>
            )}
            {blok.hero_copy.map((copy) => (
              <div {...storyblokEditable(copy)} key={copy.component}>
                <RichTextRenderer
                  document={copy.copy}
                  responsiveTextStyles={copy.responsive_text_styles}
                />
              </div>
            ))}
            {!blok?.socials && (
              <ButtonRow>
                {blok?.button_group?.map(($buttonData) => (
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
              </ButtonRow>
            )}
            {blok?.light_box_button && blok?.light_box_button[0]?.form_id && (
              <LightboxBtn blok={blok?.light_box_button[0]} />
            )}
          </ContentWrapper>
          {blok?.hero_asset[0] && !blok.centered_image && (
            <ImageWrapper {...storyblokEditable(blok)}>
              <Image
                images={blok.hero_asset}
                // borderRadius={blok.hero_asset?.[0]?.border_radius}
              />
            </ImageWrapper>
          )}
          {blok?.socials && (
            <SocialCTA>
              <SocialLogoContainer>
                <SocialLink href={"https://www.facebook.com/VasionSoftware"}>
                  <SocailLogo
                    loading="lazy"
                    src="/images/icons/Facebook.webp"
                    alt="facebook-logo"
                  />
                </SocialLink>
                <SocialLink
                  href={"https://www.linkedin.com/company/printerlogic/"}
                >
                  <SocailLogo
                    loading="lazy"
                    src="/images/icons/LinkedIn.webp"
                    alt="linkedin-logo"
                  />
                </SocialLink>
                <SocialLink href={"https://x.com/VasionSoftware"}>
                  <SocailLogo
                    loading="lazy"
                    src="/images/icons/Twitter.webp"
                    alt="twitter-logo"
                  />
                </SocialLink>
              </SocialLogoContainer>
              <ButtonRow socials>
                {blok?.button_group?.map(($buttonData) => (
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
              </ButtonRow>
            </SocialCTA>
          )}
          {blok.review_buttons && (
            <ReviewButtons>
              <ReviewButton
                src={"images/reviewButton.webp"}
                alt={"review-us"}
                width="164"
                height="62"
                onClick={() => handleNavigate("/review-us")}
              />
              <ReviewButton
                src={"images/reviewButton-1.webp"}
                alt={"G2 Reviews"}
                width="164"
                height="62"
                onClick={() => handleNavigate("/review-us")}
              />
              <ReviewButton
                src={"images/reviewButton-2.webp"}
                alt={"Review Us"}
                width="164"
                height="62"
                onClick={() => handleNavigate("/review-us")}
              />
              <AnchorButton href="#reddit-reviews">
                <ReviewButton
                  src={"images/ReviewButton-4.webp"}
                  alt={"Reviews"}
                />
              </AnchorButton>
            </ReviewButtons>
          )}
        </HeroWrapper>
        {blok.attached_logo_cube && <LogoCube blok={blok.logo_cube[0]} />}
      </HeroBGWrapper>
    </ThemeProvider>
  );
};

const AnchorButton = styled.a`
  scroll-behavior: smooth !important;
  cursor: pointer;
  text-decoration: none;
`;

const ReviewButton = styled.img`
  cursor: pointer;
  width: 12.25vw;
  height: 4vw;
  transition: transform 0.2s;

  ${media.fullWidth} {
    width: 196px;
    height: 64px;
  }

  ${media.tablet} {
    width: 18.016vw;
    height: 6.578vw;
  }

  ${media.mobile} {
    width: 27.5vw;
    height: 11vw;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ReviewButtons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 20vw;
  right: 10vw;

  ${media.fullWidth} {
    top: 320px;
    right: 150px;
  }

  ${media.tablet} {
    top: 30.84vw;
    right: 2.191vw;
  }

  ${media.mobile} {
    top: 40.84vw;
    right: 8.191vw;
  }
`;
const SocailLogo = styled.img`
  width: 2.222vw;
  height: 2.222vw;
  ${media.fullWidth} {
    width: 32px;
    height: 32px;
  }

  ${media.tablet} {
    width: 3.125vw;
    height: 3.125vw;
  }

  ${media.mobile} {
    width: 6.667vw;
    height: 6.667vw;
  }
`;
const SocialLink = styled.a`
  text-decoration: none;
`;
const SocialLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.972vw;
  ${media.fullWidth} {
    gap: 14px;
  }

  ${media.tablet} {
    gap: 1.367vw;
  }

  ${media.mobile} {
    gap: 2.917vw;
  }
`;
const SocialCTA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.389vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 4.167vw;
  }
`;

const ImageWrapper = styled.div`
  max-width: 37.5vw;

  ${media.fullWidth} {
    max-width: 600px;
  }

  ${media.tablet} {
    max-width: 58.594vw;
  }

  ${media.mobile} {
    min-width: 100%;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: min-content;
  gap: 0.75vw;
  margin-top: ${(props) => (props.socials ? "unset" : "2vw")};

  ${media.fullWidth} {
    gap: 12px;
    margin-top: ${(props) => (props.socials ? "unset" : "32px")};
  }

  ${media.tablet} {
    gap: 1.172vw;
    margin-top: ${(props) => (props.socials ? "unset" : "3.125vw")};
  }

  ${media.mobile} {
    gap: 2.5vw;
    margin-top: ${(props) => (props.socials ? "unset" : "6.667vw")};
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: ${(props) =>
    props.centered_image ? "center" : props.centered ? "center" : "left"};

  align-items: ${(props) =>
    props.centered_image ? "center" : props.centered ? "center" : "start"};

  width: ${(props) =>
    props.socials
      ? "clamp(27.75vw, 100%, 26.5vw)"
      : "clamp(27.75vw, 100%, 54.75vw)"};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.25vw;
  }

  .eyebrow {
    margin-bottom: 0.75vw;
  }

  ${media.fullWidth} {
    width: ${(props) =>
      props.socials
        ? "clamp(444px, 100%, 424px)"
        : "clamp(444px, 100%, 876px)"};
  }

  ${media.tablet} {
    width: clamp(39.453vw, 100%, 58.984vw);
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => `${props.layout || "row"}`};
  align-items: center;
  justify-content: ${(props) => (props.centered ? "center" : "space-between")};
  color: ${(props) =>
    props.theme.customtheme?.text_color?.value || props.theme.hero.textColor};

  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "6vw 9.25vw 0"
        : props.spacing
          ? `calc(${props.spacing} / 1600 * 100vw) 9.25vw 0`
          : "6vw 9.25vw 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 9.25vw 6vw"
        : props.spacing
          ? `0 9.25vw calc(${props.spacing} / 1600 * 100vw)`
          : "0 9.25vw 6vw";
    }
    return props.spacing === "default"
      ? "6vw 9.25vw"
      : props.spacing
        ? `calc(${props.spacing} / 1600 * 100vw) 9.25vw`
        : "6vw 9.25vw";
  }};

  gap: ${(props) =>
    props.socials
      ? "46vw"
      : props.gap === "default"
        ? "3.75vw"
        : props.gap
          ? `calc(${props.gap} / 1600 * 100vw)`
          : "3.75vw"};

  ${media.fullWidth} {
    max-width: 1600px;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "96px 148px 0"
          : props.spacing
            ? `${props.spacing}px 148px 0`
            : "96px 148px 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 148px 96px"
          : props.spacing
            ? `0 148px ${props.spacing}px`
            : "0 148px 96px";
      }
      return props.spacing === "default"
        ? "96px 148px"
        : props.spacing
          ? `${props.spacing}px 148px`
          : "96px 148px";
    }};
    gap: ${(props) =>
      props.socials
        ? "736px"
        : props.gap === "default"
          ? "60px"
          : props.gap
            ? `${props.gap}px`
            : "60px"};
  }

  ${media.tablet} {
    max-width: 100%;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.859vw 3.906vw 0"
          : props.spacing
            ? `calc(${props.spacing} / 1024 * 100vw) 3.906vw 0`
            : "5.859vw 3.906vw 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 3.906vw 5.859vw"
          : props.spacing
            ? `0 3.906vw calc(${props.spacing} / 1024 * 100vw)`
            : "0 3.906vw 5.859vw";
      }
      return props.spacing === "default"
        ? "5.859vw 3.906vw"
        : props.spacing
          ? `calc(${props.spacing} / 1024 * 100vw) 3.906vw`
          : "5.859vw 3.906vw";
    }};
    gap: ${(props) =>
      props.socials
        ? "45.996vw"
        : props.gap === "default"
          ? "3.906vw"
          : props.gap
            ? `calc(${props.gap}/ 1024 * 100vw) `
            : "3.906vw"};
  }

  ${media.mobile} {
    flex-direction: ${(props) => (props.socials ? "column" : "column-reverse")};
    align-items: ${(props) => (props.socials ? "flex-start" : "center")};
    max-width: 100%;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "12.5vw 5.417vw 0"
          : props.spacing
            ? `calc(${props.spacing} / 480 * 100vw) 5.417vw 0`
            : "12.5vw 5.417vw 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 5.417vw 12.5vw"
          : props.spacing
            ? `0 5.417vw calc(${props.spacing} / 480 * 100vw)`
            : "0 5.417vw 12.5vw";
      }
      return props.spacing === "default"
        ? "5.417vw 5.417vw"
        : props.spacing
          ? `calc(${props.spacing} / 480 * 100vw) 5.417vw`
          : "5.417vw 5.417vw";
    }};
    gap: ${(props) =>
      props.socials
        ? "8.333vw"
        : props.gap === "default"
          ? "5.417vw"
          : props.gap
            ? `calc(${props.gap}/ 480 * 100vw) `
            : "5.417vw"};
  }
`;

const HeroBGWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.theme.customtheme?.background_color?.value || props.theme.hero.bg};
`;
export default Hero;
