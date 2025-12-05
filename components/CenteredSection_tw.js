'use client';
import React, { useContext } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import dynamic from 'next/dynamic';
import Image from '@/components/globalComponents/Image';
import Video from '@/components/globalComponents/Video';
import Button from '@/components/globalComponents/Button';
import Form from './Form';
import { ScreenContext } from '@/components/providers/Screen';

// Dynamic imports for heavy components
const Cards_tw = dynamic(
  () => import('@/components/centeredSections/Cards_tw'),
  {
    loading: () => <div style={{ height: '200px' }} />,
  },
);

const IconCards = dynamic(() => import('@/components/IconCards'), {
  loading: () => <div style={{ height: '200px' }} />,
});

const Grid = dynamic(() => import('@/components/centeredSections/Grid'), {
  loading: () => <div style={{ height: '200px' }} />,
});

const Accordion = dynamic(
  () => import('@/components/centeredSections/Accordion'),
  {
    loading: () => <div style={{ height: '100px' }} />,
  },
);

const Stats = dynamic(() => import('@/components/centeredSections/Stats'), {
  loading: () => <div style={{ height: '150px' }} />,
});

const Rotator = dynamic(() => import('@/components/centeredSections/Rotator'), {
  loading: () => <div style={{ height: '200px' }} />,
  ssr: false, // Disable SSR for animations
});

const StackedCards = dynamic(
  () => import('@/components/centeredSections/StackedCards'),
  {
    loading: () => <div style={{ height: '200px' }} />,
  },
);

const Badges = dynamic(() => import('@/components/centeredSections/Badges'), {
  loading: () => <div style={{ height: '100px' }} />,
});

const BadgesMobile = dynamic(
  () => import('@/components/centeredSections/BadgesMobile'),
  {
    loading: () => <div style={{ height: '100px' }} />,
  },
);

const LogosGallery = dynamic(
  () => import('@/components/centeredSections/LogosGallery'),
  {
    loading: () => <div style={{ height: '150px' }} />,
  },
);

const ReviewCtaCards = dynamic(
  () => import('@/components/centeredSections/ReviewCtaCards'),
  {
    loading: () => <div style={{ height: '200px' }} />,
  },
);

const CenteredSection_tw = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const { mobile } = useContext(ScreenContext);

  // Get background style
  const getBackgroundStyle = () => {
    const backgroundImage = blok.background_image?.[0]?.filename;
    if (backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    return {
      background: selectedTheme.centered.bg,
    };
  };

  // Get padding style
  const getPaddingStyle = () => {
    const spacing = blok.section_spacing;
    const offset = blok.offset_spacing;

    if (offset === 'top') {
      if (spacing === 'default' || !spacing) {
        return {
          paddingTop: '3.75vw',
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        };
      }
      return {
        paddingTop: `${spacing}px`,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      };
    }

    if (offset === 'bottom') {
      if (spacing === 'default' || !spacing) {
        return {
          paddingTop: 0,
          paddingBottom: '3.75vw',
          paddingLeft: 0,
          paddingRight: 0,
        };
      }
      return {
        paddingTop: 0,
        paddingBottom: `${spacing}px`,
        paddingLeft: 0,
        paddingRight: 0,
      };
    }

    if (spacing === 'default' || !spacing) {
      return {
        paddingTop: '3.75vw',
        paddingBottom: '3.75vw',
        paddingLeft: 0,
        paddingRight: 0,
      };
    }
    return {
      paddingTop: `${spacing}px`,
      paddingBottom: `${spacing}px`,
      paddingLeft: 0,
      paddingRight: 0,
    };
  };

  // Get text color style
  const getTextColorStyle = () => {
    return {
      color: selectedTheme.centered.textColor,
    };
  };

  // Get AttachedComponent margin classes
  const getAttachedComponentClasses = (hasCenteredCopy) => {
    if (hasCenteredCopy) {
      return 'my-[1.25vw] fullWidth:my-[20px] tablet:my-[1.953vw] mobile:my-[4.167vw]';
    }
    return 'my-[2.5vw] fullWidth:my-[40px] tablet:my-[3.906vw] mobile:my-[8.333vw]';
  };

  return (
    <>
      <style>{`
        [data-centered-section-tw] span {
          color: ${selectedTheme.centered.textColor};
        }
        @media (min-width: 1601px) {
          [data-centered-section-tw] {
            gap: 16px;
            ${
              blok.section_spacing && blok.section_spacing !== 'default'
                ? blok.offset_spacing === 'top'
                  ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                  : blok.offset_spacing === 'bottom'
                    ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                    : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
                : ''
            }
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          [data-centered-section-tw] {
            gap: 1.563vw;
            ${
              blok.section_spacing && blok.section_spacing !== 'default'
                ? blok.offset_spacing === 'top'
                  ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                  : blok.offset_spacing === 'bottom'
                    ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                    : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
                : ''
            }
          }
        }
        @media (max-width: 480px) {
          [data-centered-section-tw] {
            gap: 3.333vw;
            ${
              blok.section_spacing && blok.section_spacing !== 'default'
                ? blok.offset_spacing === 'top'
                  ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                  : blok.offset_spacing === 'bottom'
                    ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                    : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
                : ''
            }
          }
        }
      `}</style>
      <div
        data-anchor-id={blok.anchor_id}
        data-centered-section-tw
        className="flex flex-col items-center justify-center gap-[1vw] fullWidth:gap-4 tablet:gap-[1.563vw] mobile:gap-[3.333vw]"
        style={{
          ...getBackgroundStyle(),
          ...getTextColorStyle(),
          ...getPaddingStyle(),
        }}
        {...storyblokEditable(blok)}
      >
        {(blok.centered_copy?.length > 0 || blok.button_group?.length > 0) && (
          <div className="flex flex-col items-center justify-center w-[67.75vw] gap-[1vw] text-center fullWidth:w-[1084px] fullWidth:gap-4 mobile:w-[89.167vw] mobile:gap-[3.333vw]">
            {blok.centered_copy &&
              blok.centered_copy.map((copy) => (
                <div
                  {...storyblokEditable(copy)}
                  key={copy._uid || copy.component}
                >
                  <RichTextRenderer
                    document={copy?.copy}
                    responsiveTextStyles={copy?.responsive_text_styles}
                    gradientText={copy?.gradient}
                  />
                </div>
              ))}
            {blok.button_position === 'above' &&
              blok?.button_group?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData._uid || $buttonData.link_text}
                >
                  <Button $buttonData={$buttonData} />
                </div>
              ))}
          </div>
        )}
        {blok.component_type !== '' && (
          <div
            className={`flex flex-col items-center justify-center ${getAttachedComponentClasses(!!blok.centered_copy)}`}
          >
            {blok.component_type === 'media' &&
              blok?.media?.[0]?.component === 'assets' && (
                <div
                  className={`flex h-auto ${
                    blok.smaller_assets
                      ? 'w-[38.875vw] fullWidth:w-[622px] tablet:w-[49.609vw] mobile:w-[89.167vw]'
                      : 'w-auto'
                  }`}
                >
                  <div className="w-full" {...storyblokEditable(blok.media)}>
                    <Image
                      images={blok?.media?.[0]?.media}
                      borderradius={blok?.media?.[0]?.border_radius}
                    />
                  </div>
                </div>
              )}

            {blok.component_type === 'media' &&
              blok?.media[0].component === 'video_assets' && (
                <div className="w-full" {...storyblokEditable(blok.media)}>
                  <div className="flex items-center justify-center max-w-full overflow-hidden w-[67.75vw] h-[38vw] rounded-xl fullWidth:w-[1084px] fullWidth:h-[608px] tablet:w-[92.188vw] tablet:h-[51.758vw] mobile:w-[89.167vw] mobile:h-[50vw]">
                    <Video
                      videos={blok.media?.[0]?.media}
                      borderradius={blok.media?.[0]?.border_radius}
                      thumbnails={blok.media?.[0]?.thumbnails}
                      width="100%"
                    />
                  </div>
                </div>
              )}
            {blok.component_type === 'icon_cards' && blok.icon_cards && (
              <IconCards blok={blok.icon_cards} />
            )}
            {blok.component_type === 'card' && blok.cards && (
              <Cards_tw cardData={blok.cards} />
            )}
            {blok.component_type === 'grid' && blok.grid && (
              <Grid gridData={blok.grid} alignment={blok.grid_alignment} />
            )}
            {blok.component_type === 'stats' && blok.stats && (
              <Stats
                statsData={blok.stats}
                toggle_card_style={blok.card_style}
                alignment={blok.stats_alignment}
              />
            )}
            {blok.component_type === 'accordion' && blok.accordion && (
              <Accordion accordionData={blok.accordion} />
            )}
            {blok.component_type === 'rotator' && blok.rotator && (
              <Rotator rotatorData={blok.rotator} />
            )}
            {blok.component_type === 'form' && blok.form && (
              <Form blok={blok.form[0]} />
            )}
            {blok.component_type === 'logo_gallery' && blok.logo_gallery && (
              <LogosGallery logoData={blok.logo_gallery} />
            )}
            {blok.component_type === 'stacked_cards' && blok.stacked_cards && (
              <StackedCards blok={blok.stacked_cards} />
            )}
            {blok.component_type === 'badges' && blok.badges && (
              <>
                {mobile ? (
                  <BadgesMobile badges={blok?.badges?.[0]} />
                ) : (
                  <Badges badges={blok?.badges?.[0]} />
                )}
              </>
            )}
            {blok.component_type === 'review_cta' && blok.review_cta && (
              <ReviewCtaCards blok={blok.review_cta} />
            )}
          </div>
        )}
        {blok.button_position === 'below' &&
          blok?.button_group?.map(($buttonData) => (
            <div
              {...storyblokEditable($buttonData)}
              key={$buttonData._uid || $buttonData.link_text}
            >
              <Button key={$buttonData.link_text} $buttonData={$buttonData} />
            </div>
          ))}
      </div>
    </>
  );
};

export default CenteredSection_tw;
