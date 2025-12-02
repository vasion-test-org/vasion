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
const Cards = dynamic(() => import('@/components/centeredSections/Cards'), {
  loading: () => <div style={{ height: '200px' }} />,
});

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

const CenteredSectionCopy = ({ blok }) => {
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
      background: selectedTheme.centered.bg || selectedTheme.centered.background || '#FFFFFF',
    };
  };

  // Get text color
  const textColor = selectedTheme.centered.textColor || '#1B1D21';

  // Calculate padding - use Tailwind classes for default, inline styles for custom spacing
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  // Get padding classes for default spacing
  const getPaddingClasses = () => {
    if (spacing && spacing !== 'default') {
      // Custom spacing will use inline styles
      return '';
    }
    // Default spacing with Tailwind classes
    if (offset === 'top') {
      return 'pt-[3.75vw] pb-0 px-0 fullWidth:pt-[60px] tablet:pt-[5.859vw] mobile:pt-[12.5vw]';
    }
    if (offset === 'bottom') {
      return 'pt-0 pb-[3.75vw] px-0 fullWidth:pb-[60px] tablet:pb-[5.859vw] mobile:pb-[12.5vw]';
    }
    return 'py-[3.75vw] px-0 fullWidth:py-[60px] tablet:py-[5.859vw] mobile:py-[12.5vw]';
  };

  // Inline style for custom spacing (only when spacing is not 'default')
  const getPaddingStyle = () => {
    if (spacing && spacing !== 'default') {
      if (offset === 'top') {
        return { paddingTop: `${spacing}px`, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 };
      }
      if (offset === 'bottom') {
        return { paddingTop: 0, paddingBottom: `${spacing}px`, paddingLeft: 0, paddingRight: 0 };
      }
      return { paddingTop: `${spacing}px`, paddingBottom: `${spacing}px`, paddingLeft: 0, paddingRight: 0 };
    }
    return {};
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-[1vw] fullWidth:gap-4 tablet:gap-[1.563vw] mobile:gap-[3.333vw] ${getPaddingClasses()}`}
      data-anchor-id={blok.anchor_id}
      style={{
        ...getBackgroundStyle(),
        color: textColor,
        ...getPaddingStyle(),
      }}
      {...storyblokEditable(blok)}
    >
      {(blok.centered_copy?.length > 0 || blok.button_group?.length > 0) && (
        <div className="flex flex-col items-center justify-center w-[67.75vw] gap-[1vw] text-center fullWidth:w-[1084px] fullWidth:gap-4 mobile:w-[89.167vw] mobile:gap-[3.333vw]">
          {blok.centered_copy &&
            blok.centered_copy.map((copy) => (
              <div {...storyblokEditable(copy)} key={copy.component} style={{ color: textColor }}>
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
                key={$buttonData.link_text}
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
        <div
          className={`flex flex-col items-center justify-center ${
            !blok.centered_copy
              ? 'mt-[2.5vw] mb-[2.5vw] fullWidth:my-10 tablet:my-[3.906vw] mobile:my-[8.333vw]'
              : 'mt-[1.25vw] mb-[2.5vw] fullWidth:mt-5 fullWidth:mb-10 tablet:mt-[1.953vw] tablet:mb-[3.906vw] mobile:mt-[4.167vw] mobile:mb-[8.333vw]'
          }`}
        >
          {blok.component_type === 'media' &&
            blok?.media[0].component === 'assets' && (
              <div
                className={`flex h-auto ${
                  blok.smaller_assets
                    ? 'w-[38.875vw] fullWidth:w-[622px] tablet:w-[49.609vw] mobile:w-[89.167vw]'
                    : ''
                }`}
              >
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
            <Cards cardData={blok.cards} />
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
            key={$buttonData.link_text}
          >
            <Button key={$buttonData.link_text} $buttonData={$buttonData} />
          </div>
        ))}
    </div>
  );
};

export default CenteredSectionCopy;
