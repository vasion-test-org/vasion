'use client';
import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import { ScreenContext } from '@/components/providers/Screen';
import Button from '@/components/globalComponents/Button';
import Image from '@/components/globalComponents/Image';
import LogoCube from './LogoCube';
import LightboxBtn from '@/components/LightboxButton';
import { useRouter } from 'next/navigation';
import useMedia from '@/functions/useMedia';
import text from '@/styles/text';

const Hero = ({ blok }) => {
  const router = useRouter();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  let customTheme = blok.custom_theme?.[0] || {};
  if (!blok.custom_theme_builder) {
    customTheme = undefined;
  }

  const backgroundType = customTheme?.background_type;
  const bg_img =
    backgroundType === 'image'
      ? useMedia(
          customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[0]?.filename ||
            customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[1]?.filename ||
            customTheme?.background_media?.[0]?.filename,
          customTheme?.background_media?.[2]?.filename ||
            customTheme?.background_media?.[0]?.filename,
        )
      : null;
  const bg_color =
    backgroundType === 'color' ? customTheme?.background_color?.value : null;

  const handleNavigate = (link) => {
    const isExternalLink = link.startsWith('http') || link.startsWith('https');
    if (isExternalLink) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  };

  return (
    <ThemeProvider theme={{ ...selectedTheme, customtheme: customTheme }}>
      <HeroBGWrapper
        bg_img={bg_img}
        bg_color={bg_color}
        background_type={backgroundType}
        // text_alignment={blok.text_alignment}
      >
        <HeroWrapper
          layout={blok.hero_layout}
          gap={blok.gap}
          spacingOffset={blok.offset_spacing}
          spacing={blok.section_spacing}
          centered={!blok?.hero_asset[0]}
          // text_alignment={blok.text_alignment}
          socials={blok.socials}
        >
          <ContentWrapper
            socials={blok.socials}
            centered={!blok?.hero_asset[0] && !blok.socials}
            centered_image={blok.centered_image}
            // text_alignment={blok.text_alignment}
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

            {blok.badges && (
              <BadgesSectionContainer>
                {blok.badge_section_text &&
                  blok.badge_section_text.map((badge_text) => (
                    <BadgeEyebrow
                      {...storyblokEditable(badge_text)}
                      key={badge_text._uid}
                    >
                      <RichTextRenderer
                        document={badge_text?.copy}
                        responsiveTextStyles={
                          badge_text?.responsive_text_styles
                        }
                      />
                    </BadgeEyebrow>
                  ))}
                <BadgesContainer>
                  {blok.badges.map((badge) => (
                    <BadgeLink
                      key={badge._uid}
                      href={badge.link?.url || '#'}
                      target={badge.link?.target || '_self'}
                      rel="noopener noreferrer"
                    >
                      <BadgeImage
                        src={badge.logo?.filename}
                        alt={badge.logo?.alt || 'Badge'}
                      />
                    </BadgeLink>
                  ))}
                </BadgesContainer>
              </BadgesSectionContainer>
            )}
            {blok?.light_box_button &&
              blok?.light_box_button[0]?.lightbox_text && (
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
                <SocialLink href={'https://www.facebook.com/VasionSoftware'}>
                  <SocailLogo
                    loading="lazy"
                    src="/images/icons/Facebook.webp"
                    alt="facebook-logo"
                  />
                </SocialLink>
                <SocialLink
                  href={'https://www.linkedin.com/company/printerlogic/'}
                >
                  <SocailLogo
                    loading="lazy"
                    src="/images/icons/LinkedIn.webp"
                    alt="linkedin-logo"
                  />
                </SocialLink>
                <SocialLink href={'https://x.com/VasionSoftware'}>
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
                src={'/images/reviewButton.webp'}
                alt={'review-us'}
                width="164"
                height="62"
                onClick={() => handleNavigate('/review-us')}
              />
              <ReviewButton
                src={'/images/reviewButton-1.webp'}
                alt={'G2 Reviews'}
                width="164"
                height="62"
                onClick={() => handleNavigate('/review-us')}
              />
              <ReviewButton
                src={'/images/reviewButton-2.webp'}
                alt={'Review Us'}
                width="164"
                height="62"
                onClick={() => handleNavigate('/review-us')}
              />
              <AnchorButton href="#reddit-reviews">
                <ReviewButton
                  src={'/images/ReviewButton-4.webp'}
                  alt={'Reviews'}
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
    top: 65.84vw;
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
  margin-top: ${(props) => (props.socials ? 'unset' : '2vw')};

  ${media.fullWidth} {
    gap: 12px;
    margin-top: ${(props) => (props.socials ? 'unset' : '32px')};
  }

  ${media.tablet} {
    gap: 1.172vw;
    margin-top: ${(props) => (props.socials ? 'unset' : '3.125vw')};
  }

  ${media.mobile} {
    gap: 2.5vw;
    margin-top: ${(props) => (props.socials ? 'unset' : '6.667vw')};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: ${(props) => {
    // if (props.text_alignment) {
    //   return props.text_alignment;
    // }
    return props.centered_image ? 'center' : props.centered ? 'center' : 'left';
  }};

  align-items: ${(props) => {
    // if (props.text_alignment) {
    //   return props.text_alignment === 'center'
    //     ? 'center'
    //     : props.text_alignment === 'right'
    //     ? 'flex-end'
    //     : 'flex-start';
    // }
    return props.centered_image
      ? 'center'
      : props.centered
        ? 'center'
        : 'start';
  }};

  width: ${(props) =>
    props.socials
      ? 'clamp(27.75vw, 100%, 26.5vw)'
      : // : props.text_alignment
        // ? '40.25vw'
        'clamp(27.75vw, 100%, 54.75vw)'};

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
        ? 'clamp(444px, 100%, 424px)'
        : // : props.text_alignment
          // ? '644px'
          'clamp(444px, 100%, 876px)'};
  }

  ${media.tablet} {
    width: ${(props) =>
      // props.text_alignment ? '39.453vw' :
      'clamp(39.355vw, 100%, 58.887vw)'};
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => `${props.layout || 'row'}`};
  align-items: center;
  justify-content: ${(props) => {
    // if (props.text_alignment) {
    //   return props.text_alignment === 'center'
    //     ? 'center'
    //     : props.text_alignment === 'right'
    //     ? 'flex-end'
    //     : 'flex-start';
    // }
    return props.centered ? 'center' : 'space-between';
  }};
  color: ${(props) =>
    props.theme.customtheme?.text_color?.value || props.theme.hero.textColor};

  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '6vw 9.25vw 0 9.25vw'
        : props.spacing
          ? `${props.spacing}px 9.25vw 0 9.25vw`
          : '6vw 9.25vw 0 9.25vw';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 9.25vw 6vw 9.25vw'
        : props.spacing
          ? `0 9.25vw ${props.spacing}px 9.25vw`
          : '0 9.25vw 6vw 9.25vw';
    }
    return props.spacing === 'default'
      ? '6vw 9.25vw 6vw 9.25vw'
      : props.spacing
        ? `${props.spacing}px 9.25vw ${props.spacing}px 9.25vw`
        : '6vw 9.25vw 6vw 9.25vw';
  }};

  gap: ${(props) =>
    props.socials
      ? '46vw'
      : props.gap === 'default'
        ? '3.75vw'
        : props.gap
          ? `calc(${props.gap} / 1600 * 100vw)`
          : '3.75vw'};

  ${media.fullWidth} {
    max-width: 1600px;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '96px 148px 0 148px'
          : props.spacing
            ? `${props.spacing}px 148px 0 148px`
            : '96px 148px 0 148px';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 148px 96px 148px'
          : props.spacing
            ? `0 148px ${props.spacing}px 148px`
            : '0 148px 96px 148px';
      }
      return props.spacing === 'default'
        ? '96px 148px 96px 148px'
        : props.spacing
          ? `${props.spacing}px 148px ${props.spacing}px 148px`
          : '96px 148px 96px 148px';
    }};
    gap: ${(props) =>
      props.socials
        ? '736px'
        : props.gap === 'default'
          ? '60px'
          : props.gap
            ? `${props.gap}px`
            : '60px'};
  }

  ${media.tablet} {
    max-width: 100%;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 3.906vw 0 3.906vw'
          : props.spacing
            ? `${props.spacing}px 3.906vw 0 3.906vw`
            : '5.859vw 3.906vw 0 3.906vw';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 3.906vw 5.859vw 3.906vw'
          : props.spacing
            ? `0 3.906vw ${props.spacing}px 3.906vw`
            : '0 3.906vw 5.859vw 3.906vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 3.906vw 5.859vw 3.906vw'
        : props.spacing
          ? `${props.spacing}px 3.906vw ${props.spacing}px 3.906vw`
          : '5.859vw 3.906vw 5.859vw 3.906vw';
    }};
    gap: ${(props) =>
      props.socials
        ? '45.996vw'
        : props.gap === 'default'
          ? '3.906vw'
          : props.gap
            ? `calc(${props.gap}/ 1024 * 100vw) `
            : '3.906vw'};
  }

  ${media.mobile} {
    flex-direction: ${(props) => (props.socials ? 'column' : 'column-reverse')};
    align-items: ${(props) => (props.socials ? 'flex-start' : 'center')};
    max-width: 100%;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 5.417vw 0 5.417vw'
          : props.spacing
            ? `${props.spacing}px 5.417vw 0 5.417vw`
            : '12.5vw 5.417vw 0 5.417vw';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 5.417vw 12.5vw 5.417vw'
          : props.spacing
            ? `0 5.417vw ${props.spacing}px 5.417vw`
            : '0 5.417vw 12.5vw 5.417vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 5.417vw 12.5vw 5.417vw'
        : props.spacing
          ? `${props.spacing}px 5.417vw ${props.spacing}px 5.417vw`
          : '12.5vw 5.417vw 12.5vw 5.417vw';
    }};
    gap: ${(props) =>
      props.socials
        ? '8.333vw'
        : props.gap === 'default'
          ? '5.417vw'
          : props.gap
            ? `calc(${props.gap}/ 480 * 100vw) `
            : '5.417vw'};
  }
`;

const HeroBGWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    // props?.text_alignment ? props.text_alignment :
    'center'};
  justify-content: center;
  position: relative;
  background: ${(props) => {
    if (props.background_type === 'image' && props.bg_img) {
      return `url(${props.bg_img})`;
    }
    if (props.background_type === 'color' && props.bg_color) {
      return props.bg_color;
    }
    return props.theme.hero.bg;
  }};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
`;
const BadgesSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.5vw;
  ${media.fullWidth} {
    margin-top: 40px;
  }
  ${media.tablet} {
    margin-top: 3.906vw;
  }
  ${media.mobile} {
    margin-top: 8.333vw;
  }
`;

const BadgeEyebrow = styled.div`
  margin-bottom: 0.5vw;

  ${media.tablet} {
    margin-bottom: 1.563vw;
  }
  ${media.mobile} {
    margin-bottom: 3.333vw;
  }
`;

const BadgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
  ${media.fullWidth} {
    gap: 16px;
  }
  ${media.tablet} {
    gap: 1.563vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
  }
`;

const BadgeLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeImage = styled.img`
  cursor: default;
  width: 100%;
`;

export default Hero;
