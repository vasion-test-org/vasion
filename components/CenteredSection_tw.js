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

// Dynamic imports for Tailwind versions of components
const Cards_tw = dynamic(
  () => import('@/components/centeredSections/Cards_tw'),
  {
    loading: () => <div style={{ height: '200px' }} />,
  },
);

const IconCards = dynamic(() => import('@/components/IconCards'), {
  loading: () => <div style={{ height: '200px' }} />,
});

const Grid_tw = dynamic(() => import('@/components/centeredSections/Grid_tw'), {
  loading: () => <div style={{ height: '200px' }} />,
});

const Accordion_tw = dynamic(
  () => import('@/components/centeredSections/Accordion_tw'),
  {
    loading: () => <div style={{ height: '100px' }} />,
  },
);

const Stats_tw = dynamic(
  () => import('@/components/centeredSections/Stats_tw'),
  {
    loading: () => <div style={{ height: '150px' }} />,
  },
);

const Rotator = dynamic(() => import('@/components/centeredSections/Rotator'), {
  loading: () => <div style={{ height: '200px' }} />,
  ssr: false, // Disable SSR for animations
});

const StackedCards_tw = dynamic(
  () => import('@/components/centeredSections/StackedCards_tw'),
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
    if (blok.background_image?.[0]?.filename) {
      return {
        backgroundImage: `url(${blok.background_image[0].filename})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    return {
      background:
        selectedTheme.centered.bg ||
        selectedTheme.centered.background ||
        '#FFFFFF',
    };
  };

  // Get text color
  const textColor = selectedTheme.centered.textColor || '#1B1D21';

  // Calculate padding classes and inline styles for dynamic values
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  // Get padding classes for default spacing
  const getPaddingClasses = () => {
    if (spacing && spacing !== 'default') {
      return '';
    }
    if (offset === 'top') {
      return 'pt-[3.75vw] pb-0 px-0 fullWidth:pt-[60px] fullWidth:pb-0 tablet:pt-[5.859vw] tablet:pb-0 mobile:pt-[12.5vw] mobile:pb-0';
    }
    if (offset === 'bottom') {
      return 'pt-0 pb-[3.75vw] px-0 fullWidth:pt-0 fullWidth:pb-[60px] tablet:pt-0 tablet:pb-[5.859vw] mobile:pt-0 mobile:pb-[12.5vw]';
    }
    return 'py-[3.75vw] px-0 fullWidth:py-[60px] tablet:py-[5.859vw] mobile:py-[12.5vw]';
  };

  // Inline style for custom spacing (only when spacing is not 'default')
  const getPaddingStyle = () => {
    if (spacing && spacing !== 'default') {
      if (offset === 'top') {
        return {
          paddingTop: `${spacing}px`,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        };
      }
      if (offset === 'bottom') {
        return {
          paddingTop: 0,
          paddingBottom: `${spacing}px`,
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
    }
    return {};
  };

  // Attached component margin classes
  const attachedComponentMarginClasses = () => {
    let classes = 'flex flex-col items-center justify-center';
    if (blok.centered_copy) {
      classes +=
        ' mt-[1.25vw] mb-[2.5vw] fullWidth:mt-5 fullWidth:mb-10 tablet:mt-[1.953vw] tablet:mb-[3.906vw] mobile:mt-[4.167vw] mobile:mb-[8.333vw]';
    } else {
      classes +=
        ' my-[2.5vw] fullWidth:my-10 tablet:my-[3.906vw] mobile:my-[8.333vw]';
    }
    return classes;
  };

  const customSizingClasses = blok.smaller_assets
    ? 'flex w-[38.875vw] h-auto fullWidth:w-[622px] tablet:w-[49.609vw] mobile:w-[89.167vw]'
    : '';

  const videoContainerClasses = 'flex items-center justify-center max-w-full overflow-hidden rounded-xl w-[67.75vw] h-[38vw] fullWidth:w-[1084px] fullWidth:h-[608px] tablet:w-[92.188vw] tablet:h-[51.758vw] mobile:w-[89.167vw] mobile:h-[50vw]';

  return (
    <div
      className={`flex flex-col items-center justify-center gap-[1vw] w-full fullWidth:gap-4 tablet:gap-[1.563vw] mobile:gap-[3.333vw] ${getPaddingClasses()}`}
      data-anchor-id={blok.anchor_id}
      style={{
        ...getBackgroundStyle(),
        color: textColor,
        ...getPaddingStyle(),
      }}
      {...storyblokEditable(blok)}
    >
      <style>{`
        [data-centered-section-tw] span {
          color: ${textColor};
        }
      `}</style>
      <div data-centered-section-tw>
        {(blok.centered_copy?.length > 0 || blok.button_group?.length > 0) && (
          <div className="flex flex-col items-center justify-center w-[67.75vw] gap-[1vw] text-center fullWidth:w-[1084px] fullWidth:gap-4 mobile:w-[89.167vw] mobile:gap-[3.333vw]">
            {blok.centered_copy &&
              blok.centered_copy.map((copy) => (
                <div
                  {...storyblokEditable(copy)}
                  key={copy._uid || copy.component}
                  style={{ color: textColor }}
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
                  <Button
                    key={$buttonData.link_text}
                    $buttonData={$buttonData}
                  />
                </div>
              ))}
          </div>
        )}
        {blok.component_type !== '' && (
          <div className={attachedComponentMarginClasses()}>
            {blok.component_type === 'media' &&
              blok?.media[0].component === 'assets' && (
                <div className={customSizingClasses}>
                  <div className="w-full" {...storyblokEditable(blok.media)}>
                    <Image
                      images={blok.media?.[0]?.media}
                      borderradius={blok.media?.[0]?.border_radius}
                    />
                  </div>
                </div>
              )}

            {blok.component_type === 'media' &&
              blok?.media[0].component === 'video_assets' && (
                <div className="w-full" {...storyblokEditable(blok.media)}>
                  <div className={videoContainerClasses}>
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
            {blok.component_type === 'card' && blok.cards_tw && (
              <Cards_tw cardData={blok.cards_tw} />
            )}
            {blok.component_type === 'grid' && blok.grid_tw && (
              <Grid_tw gridData={blok.grid_tw} alignment={blok.grid_alignment} />
            )}
            {blok.component_type === 'stats' && blok.stats_tw && (
              <Stats_tw
                statsData={blok.stats_tw}
                toggle_card_style={blok.card_style}
                alignment={blok.stats_alignment}
              />
            )}
            {blok.component_type === 'accordion' && blok.accordion_tw && (
              <Accordion_tw accordionData={blok.accordion_tw} />
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
            {blok.component_type === 'stacked_cards' && blok.stacked_cards_tw && (
              <StackedCards_tw blok={blok.stacked_cards_tw} />
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
    </div>
  );
};

export default CenteredSection_tw;
