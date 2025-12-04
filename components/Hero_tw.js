'use client';
import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';
import Image from '@/components/globalComponents/Image';
import Button from '@/components/globalComponents/Button';
import LightboxBtn from '@/components/LightboxButton';
import LazySection from '@/components/LazySection';
import { useRouter } from 'next/navigation';
import useMedia from '@/functions/useMedia';

const LogoCube = dynamic(() => import('./LogoCube'), {
  loading: () => <div style={{ height: '200px' }} />,
  ssr: false,
});

const Hero_tw = ({ blok }) => {
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

  const textColor =
    selectedTheme.customtheme?.text_color?.value || selectedTheme.hero.textColor;

  const handleNavigate = (link) => {
    const isExternalLink = link.startsWith('http') || link.startsWith('https');
    if (isExternalLink) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  };

  // Get background style
  const getBackgroundStyle = () => {
    if (backgroundType === 'image' && bg_img) {
      return {
        backgroundImage: `url(${bg_img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      };
    }
    if (backgroundType === 'color' && bg_color) {
      return {
        background: bg_color,
      };
    }
    return {
      background: selectedTheme.hero.bg,
    };
  };

  // Calculate padding classes and inline styles for dynamic values
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  const getPaddingClasses = () => {
    if (spacing && spacing !== 'default') {
      return '';
    }
    if (offset === 'top') {
      return 'pt-[6vw] pb-0 px-[9.25vw] fullWidth:pt-[96px] fullWidth:pb-0 fullWidth:px-[148px] tablet:pt-[5.859vw] tablet:pb-0 tablet:px-[3.906vw] mobile:pt-[12.5vw] mobile:pb-0 mobile:px-[5.417vw]';
    }
    if (offset === 'bottom') {
      return 'pt-0 pb-[6vw] px-[9.25vw] fullWidth:pt-0 fullWidth:pb-[96px] fullWidth:px-[148px] tablet:pt-0 tablet:pb-[5.859vw] tablet:px-[3.906vw] mobile:pt-0 mobile:pb-[12.5vw] mobile:px-[5.417vw]';
    }
    return 'py-[6vw] px-[9.25vw] fullWidth:py-[96px] fullWidth:px-[148px] tablet:py-[5.859vw] tablet:px-[3.906vw] mobile:py-[12.5vw] mobile:px-[5.417vw]';
  };

  const getPaddingStyle = () => {
    if (spacing && spacing !== 'default') {
      if (offset === 'top') {
        return {
          paddingTop: `${spacing}px`,
          paddingBottom: 0,
          paddingLeft: '9.25vw',
          paddingRight: '9.25vw',
        };
      }
      if (offset === 'bottom') {
        return {
          paddingTop: 0,
          paddingBottom: `${spacing}px`,
          paddingLeft: '9.25vw',
          paddingRight: '9.25vw',
        };
      }
      return {
        paddingTop: `${spacing}px`,
        paddingBottom: `${spacing}px`,
        paddingLeft: '9.25vw',
        paddingRight: '9.25vw',
      };
    }
    return {};
  };

  // Get gap value
  const getGapValue = () => {
    if (blok.socials) {
      return '46vw';
    }
    if (blok.gap === 'default' || !blok.gap) {
      return '3.75vw';
    }
    return 'calc(' + blok.gap + ' / 1600 * 100vw)';
  };

  // Get content wrapper width
  const getContentWidth = () => {
    if (blok.blog_hero) {
      return 'w-[33.938vw] fullWidth:w-[543px] tablet:w-[46.582vw] mobile:w-[89.167vw]';
    }
    if (blok.socials) {
      return 'w-[clamp(27.75vw,100%,26.5vw)] fullWidth:w-[clamp(444px,100%,424px)] tablet:w-[clamp(39.355vw,100%,58.887vw)] mobile:w-[89.167vw]';
    }
    return 'w-[clamp(27.75vw,100%,54.75vw)] fullWidth:w-[clamp(444px,100%,876px)] tablet:w-[clamp(39.355vw,100%,58.887vw)] mobile:w-[89.167vw]';
  };

  // Get text alignment classes
  const getTextAlignment = () => {
    if (blok.centered_image) {
      return 'text-center items-center';
    }
    if (!blok?.hero_asset[0] && !blok.socials) {
      return 'text-center items-center';
    }
    return 'text-left items-start';
  };

  return (
    <div
      className="flex flex-col items-center justify-center relative"
      style={getBackgroundStyle()}
    >
      <style>{`
        @media (min-width: 1601px) {
          [data-hero-wrapper] {
            gap: ${blok.socials ? '736px' : blok.gap === 'default' || !blok.gap ? '60px' : blok.gap ? blok.gap + 'px' : '60px'};
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 148px 0 148px !important;`
                : offset === 'bottom'
                  ? `padding: 0 148px ${spacing}px 148px !important;`
                  : `padding: ${spacing}px 148px ${spacing}px 148px !important;`
              : ''}
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          [data-hero-wrapper] {
            gap: ${blok.socials
              ? '45.996vw'
              : blok.gap === 'default' || !blok.gap
                ? '3.906vw'
                : blok.gap
                  ? 'calc(' + blok.gap + ' / 1024 * 100vw)'
                  : '3.906vw'};
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 3.906vw 0 3.906vw !important;`
                : offset === 'bottom'
                  ? `padding: 0 3.906vw ${spacing}px 3.906vw !important;`
                  : `padding: ${spacing}px 3.906vw ${spacing}px 3.906vw !important;`
              : ''}
          }
        }
        @media (max-width: 480px) {
          [data-hero-wrapper] {
            gap: ${blok.socials
              ? '8.333vw'
              : blok.gap === 'default' || !blok.gap
                ? '5.417vw'
                : blok.gap
                  ? 'calc(' + blok.gap + ' / 480 * 100vw)'
                  : '5.417vw'};
            ${spacing && spacing !== 'default'
              ? offset === 'top'
                ? `padding: ${spacing}px 5.417vw 0 5.417vw !important;`
                : offset === 'bottom'
                  ? `padding: 0 5.417vw ${spacing}px 5.417vw !important;`
                  : `padding: ${spacing}px 5.417vw ${spacing}px 5.417vw !important;`
              : ''}
          }
        }
        [data-content-wrapper] h1,
        [data-content-wrapper] h2,
        [data-content-wrapper] h3,
        [data-content-wrapper] h4,
        [data-content-wrapper] h5,
        [data-content-wrapper] h6 {
          margin-bottom: 1.25vw;
        }
        @media (min-width: 1601px) {
          [data-content-wrapper] h1,
          [data-content-wrapper] h2,
          [data-content-wrapper] h3,
          [data-content-wrapper] h4,
          [data-content-wrapper] h5,
          [data-content-wrapper] h6 {
            margin-bottom: 20px;
          }
        }
        [data-content-wrapper] .eyebrow {
          margin-bottom: 0.75vw;
        }
        @media (min-width: 1601px) {
          [data-content-wrapper] .eyebrow {
            margin-bottom: 12px;
          }
        }
      `}</style>
      <div
        data-hero-wrapper
        className={`relative flex ${blok.hero_layout === 'column' ? 'flex-col' : 'flex-row'} items-center ${
          blok.centered && !blok?.hero_asset[0]
            ? 'justify-center'
            : 'justify-between'
        } ${getPaddingClasses()} fullWidth:max-w-[1600px] tablet:max-w-full mobile:flex-col-reverse ${
          blok.socials ? 'mobile:items-start' : 'mobile:items-center'
        }`}
        style={{
          color: textColor,
          gap: getGapValue(),
          ...getPaddingStyle(),
        }}
      >
        <div
          data-content-wrapper
          className={`relative flex flex-col ${getTextAlignment()} ${getContentWidth()}`}
        >
          {blok?.hero_asset[0] && blok.centered_image && (
            <div
              {...storyblokEditable(blok)}
              className={`relative w-[37.5vw] h-min top-[0.25vw] fullWidth:w-[600px] fullWidth:top-1 tablet:w-[48.828vw] tablet:top-0 mobile:w-[89.167vw] mobile:top-0 ${
                blok.blog_hero
                  ? 'max-w-[25.438vw] w-[25.438vw] self-start fullWidth:max-w-[407px] fullWidth:w-[407px] fullWidth:h-[229px] tablet:max-w-[39.746vw] tablet:w-[39.746vw] tablet:h-[22.363vw] mobile:max-w-[89.167vw] mobile:w-[89.167vw] mobile:h-[50.208vw] mobile:min-w-0'
                  : ''
              }`}
            >
              <Image
                images={blok.hero_asset}
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
            </div>
          )}
          {blok.hero_copy.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy._uid || copy.component}>
              <RichTextRenderer
                document={copy.copy}
                responsiveTextStyles={copy.responsive_text_styles}
              />
            </div>
          ))}

          {!blok?.socials && blok?.button_group?.length > 0 && (
            <div className="flex flex-row items-center w-min gap-[0.75vw] mt-[2vw] fullWidth:gap-3 fullWidth:mt-8 tablet:gap-[1.172vw] tablet:mt-[3.125vw] mobile:gap-[2.5vw] mobile:mt-[6.667vw]">
              {blok?.button_group?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData._uid || $buttonData?.link_text}
                >
                  <Button
                    key={$buttonData?.link_text}
                    $buttonData={$buttonData}
                  />
                </div>
              ))}
            </div>
          )}
          {blok.badges?.length > 0 && (
            <LazySection threshold={0.2} rootMargin="100px">
              <div className="flex flex-col mt-[2.5vw] fullWidth:mt-10 tablet:mt-[3.906vw] mobile:mt-[8.333vw]">
                {blok.badge_section_text &&
                  blok.badge_section_text.map((badge_text) => (
                    <div
                      {...storyblokEditable(badge_text)}
                      key={badge_text._uid}
                      className="mb-[0.5vw] tablet:mb-[1.563vw] mobile:mb-[3.333vw]"
                    >
                      <RichTextRenderer
                        document={badge_text?.copy}
                        responsiveTextStyles={
                          badge_text?.responsive_text_styles
                        }
                      />
                    </div>
                  ))}
                <div className="flex flex-row gap-[1vw] fullWidth:gap-4 tablet:gap-[1.563vw] mobile:gap-[3.333vw]">
                  {blok.badges.map((badge) => (
                    <a
                      key={badge._uid}
                      href={badge.link?.url || '#'}
                      target={badge.link?.target || '_self'}
                      rel="noopener noreferrer"
                      className="no-underline flex items-center justify-center"
                    >
                      <img
                        src={badge.logo?.filename}
                        alt={badge.logo?.alt || 'Badge'}
                        loading="lazy"
                        className="cursor-default w-full"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </LazySection>
          )}
          {blok?.light_box_button &&
            blok?.light_box_button[0]?.lightbox_text && (
              <LightboxBtn blok={blok?.light_box_button[0]} />
            )}
        </div>
        {blok?.hero_asset[0] && !blok.centered_image && (
          <div
            {...storyblokEditable(blok)}
            className={`relative w-[37.5vw] h-min top-[0.25vw] fullWidth:w-[600px] fullWidth:top-1 tablet:w-[48.828vw] tablet:top-0 mobile:w-[89.167vw] mobile:top-0 ${
              blok.blog_hero
                ? 'max-w-[25.438vw] w-[25.438vw] self-start fullWidth:max-w-[407px] fullWidth:w-[407px] fullWidth:h-[229px] tablet:max-w-[39.746vw] tablet:w-[39.746vw] tablet:h-[22.363vw] mobile:max-w-[89.167vw] mobile:w-[89.167vw] mobile:h-[50.208vw] mobile:min-w-0'
                : ''
            }`}
          >
            <Image
              images={blok.hero_asset}
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
            />
          </div>
        )}
        {blok?.socials && (
          <div className="flex flex-col gap-[1.389vw] fullWidth:gap-5 tablet:gap-[1.953vw] mobile:flex-col-reverse mobile:items-start mobile:gap-[4.167vw]">
            <div className="flex items-center justify-center gap-[0.972vw] fullWidth:gap-[14px] tablet:gap-[1.367vw] mobile:gap-[2.917vw]">
              <a
                href="https://www.facebook.com/VasionSoftware"
                className="no-underline"
              >
                <img
                  loading="lazy"
                  src="/images/icons/Facebook.webp"
                  alt="facebook-logo"
                  className="w-[2.222vw] h-[2.222vw] fullWidth:w-8 fullWidth:h-8 tablet:w-[3.125vw] tablet:h-[3.125vw] mobile:w-[6.667vw] mobile:h-[6.667vw]"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/printerlogic/"
                className="no-underline"
              >
                <img
                  loading="lazy"
                  src="/images/icons/LinkedIn.webp"
                  alt="linkedin-logo"
                  className="w-[2.222vw] h-[2.222vw] fullWidth:w-8 fullWidth:h-8 tablet:w-[3.125vw] tablet:h-[3.125vw] mobile:w-[6.667vw] mobile:h-[6.667vw]"
                />
              </a>
              <a
                href="https://x.com/VasionSoftware"
                className="no-underline"
              >
                <img
                  loading="lazy"
                  src="/images/icons/Twitter.webp"
                  alt="twitter-logo"
                  className="w-[2.222vw] h-[2.222vw] fullWidth:w-8 fullWidth:h-8 tablet:w-[3.125vw] tablet:h-[3.125vw] mobile:w-[6.667vw] mobile:h-[6.667vw]"
                />
              </a>
            </div>
            {blok?.button_group?.length > 0 && (
              <div className="flex flex-row items-center w-min gap-[0.75vw] fullWidth:gap-3 tablet:gap-[1.172vw] mobile:gap-[2.5vw]">
                {blok?.button_group?.map(($buttonData) => (
                  <div
                    {...storyblokEditable($buttonData)}
                    key={$buttonData._uid || $buttonData?.link_text}
                  >
                    <Button
                      key={$buttonData?.link_text}
                      $buttonData={$buttonData}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {blok.review_buttons && (
          <LazySection threshold={0.2} rootMargin="100px">
            <div className="absolute flex flex-col top-[20vw] right-[10vw] fullWidth:top-[320px] fullWidth:right-[150px] tablet:top-[30.84vw] tablet:right-[2.191vw] mobile:top-[65.84vw] mobile:right-[8.191vw]">
              <img
                src="/images/reviewButton.webp"
                alt="review-us"
                width="164"
                height="62"
                loading="lazy"
                onClick={() => handleNavigate('/review-us')}
                className="cursor-pointer w-[12.25vw] h-[4vw] transition-transform duration-200 hover:scale-110 fullWidth:w-[196px] fullWidth:h-[64px] tablet:w-[18.016vw] tablet:h-[6.578vw] mobile:w-[27.5vw] mobile:h-[11vw] mobile:object-contain"
              />
              <img
                src="/images/reviewButton-1.webp"
                alt="G2 Reviews"
                width="164"
                height="62"
                loading="lazy"
                onClick={() => handleNavigate('/review-us')}
                className="cursor-pointer w-[12.25vw] h-[4vw] transition-transform duration-200 hover:scale-110 fullWidth:w-[196px] fullWidth:h-[64px] tablet:w-[18.016vw] tablet:h-[6.578vw] mobile:w-[27.5vw] mobile:h-[11vw] mobile:object-contain"
              />
              <img
                src="/images/reviewButton-2.webp"
                alt="Review Us"
                width="164"
                height="62"
                loading="lazy"
                onClick={() => handleNavigate('/review-us')}
                className="cursor-pointer w-[12.25vw] h-[4vw] transition-transform duration-200 hover:scale-110 fullWidth:w-[196px] fullWidth:h-[64px] tablet:w-[18.016vw] tablet:h-[6.578vw] mobile:w-[27.5vw] mobile:h-[11vw] mobile:object-contain"
              />
              <a
                href="#reddit-reviews"
                className="scroll-smooth cursor-pointer no-underline"
              >
                <img
                  src="/images/ReviewButton-4.webp"
                  alt="Reviews"
                  loading="lazy"
                  className="cursor-pointer w-[12.25vw] h-[4vw] transition-transform duration-200 hover:scale-110 fullWidth:w-[196px] fullWidth:h-[64px] tablet:w-[18.016vw] tablet:h-[6.578vw] mobile:w-[27.5vw] mobile:h-[11vw] mobile:object-contain"
                />
              </a>
            </div>
          </LazySection>
        )}
      </div>
      {blok.attached_logo_cube && <LogoCube blok={blok.logo_cube[0]} />}
    </div>
  );
};

export default Hero_tw;

