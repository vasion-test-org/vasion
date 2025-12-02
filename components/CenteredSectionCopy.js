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

  // Calculate padding values for each breakpoint
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  const getPadding = (defaultTop, defaultBottom, defaultBoth) => {
    if (offset === 'top') {
      return spacing === 'default'
        ? defaultTop
        : spacing
          ? `${spacing}px 0 0`
          : defaultTop;
    }
    if (offset === 'bottom') {
      return spacing === 'default'
        ? defaultBottom
        : spacing
          ? `0 0 ${spacing}px`
          : defaultBottom;
    }
    return spacing === 'default'
      ? defaultBoth
      : spacing
        ? `${spacing}px 0`
        : defaultBoth;
  };

  const fullWidthPadding = getPadding('60px 0 0', '0 0 60px', '60px 0');
  const tabletPadding = getPadding('5.859vw 0 0', '0 0 5.859vw', '5.859vw 0');
  const mobilePadding = getPadding('12.5vw 0 0', '0 0 12.5vw', '12.5vw 0');

  return (
    <>
      <style>{`
        .centered-section-copy-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1vw;
        }
        @media (min-width: 1601px) {
          .centered-section-copy-wrapper {
            gap: 16px;
            padding: ${fullWidthPadding};
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .centered-section-copy-wrapper {
            gap: 1.563vw;
            padding: ${tabletPadding};
          }
        }
        @media (max-width: 480px) {
          .centered-section-copy-wrapper {
            gap: 3.333vw;
            padding: ${mobilePadding};
          }
        }
        .centered-section-copy-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 67.75vw;
          gap: 1vw;
          text-align: center;
        }
        @media (min-width: 1601px) {
          .centered-section-copy-content {
            width: 1084px;
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .centered-section-copy-content {
            width: 89.167vw;
            gap: 3.333vw;
          }
        }
        .centered-section-copy-attached {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 1.25vw 0 2.5vw;
        }
        @media (min-width: 1601px) {
          .centered-section-copy-attached {
            margin: 20px 0 40px;
          }
          .centered-section-copy-attached.no-centered-copy {
            margin: 40px 0;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .centered-section-copy-attached {
            margin: 1.953vw 0 3.906vw;
          }
          .centered-section-copy-attached.no-centered-copy {
            margin: 3.906vw 0;
          }
        }
        @media (max-width: 480px) {
          .centered-section-copy-attached {
            margin: 4.167vw 0 8.333vw;
          }
          .centered-section-copy-attached.no-centered-copy {
            margin: 8.333vw 0;
          }
        }
        .centered-section-copy-custom-sizing {
          display: flex;
          width: 38.875vw;
          height: auto;
        }
        @media (min-width: 1601px) {
          .centered-section-copy-custom-sizing {
            width: 622px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .centered-section-copy-custom-sizing {
            width: 49.609vw;
          }
        }
        @media (max-width: 480px) {
          .centered-section-copy-custom-sizing {
            width: 89.167vw;
          }
        }
        .centered-section-copy-media-wrapper {
          width: 100%;
        }
        .centered-section-copy-video-container {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          overflow: hidden;
          width: 67.75vw;
          height: 38vw;
          border-radius: 12px;
        }
        @media (min-width: 1601px) {
          .centered-section-copy-video-container {
            width: 1084px;
            height: 608px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .centered-section-copy-video-container {
            width: 92.188vw;
            height: 51.758vw;
          }
        }
        @media (max-width: 480px) {
          .centered-section-copy-video-container {
            width: 89.167vw;
            height: 50vw;
          }
        }
        .centered-section-copy-wrapper span {
          color: ${textColor};
        }
      `}</style>
      <div
        className="centered-section-copy-wrapper"
        data-anchor-id={blok.anchor_id}
        style={{
          ...getBackgroundStyle(),
          color: textColor,
        }}
        {...storyblokEditable(blok)}
      >
        {(blok.centered_copy?.length > 0 || blok.button_group?.length > 0) && (
          <div className="centered-section-copy-content">
            {blok.centered_copy &&
              blok.centered_copy.map((copy) => (
                <div {...storyblokEditable(copy)} key={copy.component}>
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
            className={`centered-section-copy-attached ${
              !blok.centered_copy ? 'no-centered-copy' : ''
            }`}
          >
            {blok.component_type === 'media' &&
              blok?.media[0].component === 'assets' && (
                <div
                  className={
                    blok.smaller_assets
                      ? 'centered-section-copy-custom-sizing'
                      : ''
                  }
                >
                  <div
                    className="centered-section-copy-media-wrapper"
                    {...storyblokEditable(blok.media)}
                  >
                    <Image
                      images={blok.media?.[0]?.media}
                      borderradius={blok.media?.[0]?.border_radius}
                    />
                  </div>
                </div>
              )}

            {blok.component_type === 'media' &&
              blok?.media[0].component === 'video_assets' && (
                <div
                  className="centered-section-copy-media-wrapper"
                  {...storyblokEditable(blok.media)}
                >
                  <div className="centered-section-copy-video-container">
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
    </>
  );
};

export default CenteredSectionCopy;

