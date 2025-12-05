'use client';
import React, { useEffect, useState } from 'react';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import { horizontalLoop } from '@/functions/horizontalLoop';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { optimizeGSAP } from '@/lib/scriptOptimization';

const LogoCube_tw = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [gsapLoaded, setGsapLoaded] = useState(false);

  const defaultLogos = [
    { alt: 'nascar logo', image: '/images/icons/nascar.png' },
    { alt: 'espn logo', image: '/images/icons/espn.png' },
    { alt: 'metlife logo', image: '/images/icons/metlife.png' },
    { alt: 'priceline logo', image: '/images/icons/priceline.png' },
    { alt: 'jpMorgan logo', image: '/images/icons/jpMorgan.png' },
    { alt: 'GE logo', image: '/images/icons/GE.png' },
    { alt: 'Yahoo logo', image: '/images/icons/Yahoo.png' },
    { alt: 'Aon logo', image: '/images/icons/Aon.png' },
  ];

  const logosToDisplay = blok.logos?.length > 0 ? blok.logos : defaultLogos;

  useEffect(() => {
    // Load GSAP only when needed
    optimizeGSAP().then(() => {
      setGsapLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (gsapLoaded && logosToDisplay?.length >= 7) {
      const logosArr = window.gsap.utils.toArray('.cubeLogos');
      horizontalLoop(logosArr, { deep: false, repeat: -1 });
    }
  }, [logosToDisplay?.length, gsapLoaded]);

  // Get padding style for CubeWrapper
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

  // Get CardContainer classes
  const getCardContainerClasses = () => {
    const base = 'flex flex-col justify-center items-center text-center overflow-hidden';
    const borderRadius = 'rounded-[1.5vw] fullWidth:rounded-[24px] tablet:rounded-[2.344vw] mobile:rounded-[5.607vw]';
    const gap = 'gap-[2.5vw] fullWidth:gap-10 tablet:gap-[1.953vw] mobile:gap-[7.477vw]';
    
    const width = blok.transparent_background
      ? 'w-full'
      : 'w-[81.5vw] fullWidth:w-[1304px]';
    
    return `${base} ${borderRadius} ${gap} ${width}`.trim();
  };

  // Get CardContainer padding
  const getCardContainerPadding = () => {
    if (blok.transparent_background) {
      return {
        paddingTop: '3.75vw',
        paddingBottom: '3.75vw',
        paddingLeft: 0,
        paddingRight: 0,
      };
    }
    return {
      paddingTop: '3.75vw',
      paddingBottom: '3.75vw',
      paddingLeft: '6vw',
      paddingRight: '6vw',
    };
  };

  // Get CardContainer style
  const getCardContainerStyle = () => {
    return {
      background: blok.transparent_background
        ? 'transparent'
        : selectedTheme.logo_cube.cardBg,
      color: selectedTheme.logo_cube.textColor,
    };
  };

  // Get LogoContainer classes
  const getLogoContainerClasses = () => {
    const base = 'flex flex-row items-center h-auto overflow-hidden gap-[1.25vw] fullWidth:gap-5 tablet:gap-[1.953vw] mobile:gap-[4.673vw]';
    const justify = logosToDisplay?.length < 6 ? 'justify-center' : 'justify-start';
    const width = blok.transparent_background
      ? 'w-full'
      : 'w-[77.188vw] fullWidth:w-[1236px]';
    
    return `${base} ${justify} ${width}`.trim();
  };

  const allLogos = logosToDisplay.map((logo, index) => (
    <div key={logo.filename || logo.alt || index} className="cubeLogos w-auto h-auto">
      <img
        alt={logo.alt || 'Default Logo'}
        src={logo.filename || logo.image}
        className="h-[6.25vw] w-[12.5vw] fullWidth:h-[100px] fullWidth:w-[200px] tablet:h-[9.766vw] tablet:w-[19.531vw] mobile:h-[23.364vw] mobile:w-[46.729vw]"
      />
    </div>
  ));

  return (
    <>
      <style>{`
        @media (min-width: 1601px) {
          [data-logo-cube-wrapper] {
            ${blok.section_spacing && blok.section_spacing !== 'default'
              ? blok.offset_spacing === 'top'
                ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                : blok.offset_spacing === 'bottom'
                  ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                  : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
              : ''}
          }
          [data-logo-cube-card] {
            ${blok.transparent_background
              ? 'padding: 60px 0px !important;'
              : 'padding: 60px 96px !important;'}
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          [data-logo-cube-wrapper] {
            ${blok.section_spacing && blok.section_spacing !== 'default'
              ? blok.offset_spacing === 'top'
                ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                : blok.offset_spacing === 'bottom'
                  ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                  : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
              : ''}
          }
          [data-logo-cube-card] {
            ${blok.transparent_background
              ? 'padding: 3.906vw 0vw 5.859vw 0vw !important;'
              : 'padding: 3.906vw 3.906vw 5.859vw 3.906vw !important;'}
          }
        }
        @media (max-width: 480px) {
          [data-logo-cube-wrapper] {
            ${blok.section_spacing && blok.section_spacing !== 'default'
              ? blok.offset_spacing === 'top'
                ? `padding: ${blok.section_spacing}px 0 0 0 !important;`
                : blok.offset_spacing === 'bottom'
                  ? `padding: 0 0 ${blok.section_spacing}px 0 !important;`
                  : `padding: ${blok.section_spacing}px 0 ${blok.section_spacing}px 0 !important;`
              : ''}
          }
          [data-logo-cube-card] {
            padding: 9.346vw 6.075vw 14.019vw 6.075vw !important;
          }
        }
      `}</style>
      <div
        data-logo-cube-wrapper
        className="flex flex-row items-center justify-center h-auto w-full"
        style={getPaddingStyle()}
        {...storyblokEditable(blok)}
      >
        <div
          data-logo-cube-card
          className={getCardContainerClasses()}
          style={{
            ...getCardContainerStyle(),
            ...getCardContainerPadding(),
          }}
        >
          {blok.header && (
            <RichTextRenderer
              document={blok.header}
              blok={blok}
              responsiveTextStyles={blok?.responsive_text_styles}
            />
          )}
          <div className={getLogoContainerClasses()}>
            {allLogos}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoCube_tw;

