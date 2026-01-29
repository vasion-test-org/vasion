'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import { horizontalLoop } from '@/functions/horizontalLoop';
import { cn } from '@/lib/cn';
import { optimizeGSAP } from '@/lib/scriptOptimization';
import { storyblokEditable } from '@storyblok/react/rsc';

/**
 * LogoCube Component
 * Displays a carousel of company logos with optional header text.
 * Supports transparent and themed backgrounds.
 */
const LogoCube = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const isTransparent = blok.transparent_background;

  const defaultLogos = [
    { alt: 'NASCAR logo - Professional racing organization', image: '/images/icons/nascar.png' },
    { alt: 'ESPN logo - Sports entertainment network', image: '/images/icons/espn.png' },
    { alt: 'MetLife logo - Insurance company', image: '/images/icons/metlife.png' },
    { alt: 'Priceline logo - Travel booking service', image: '/images/icons/priceline.png' },
    { alt: 'JPMorgan logo - Financial services company', image: '/images/icons/jpMorgan.png' },
    { alt: 'GE logo - General Electric corporation', image: '/images/icons/GE.png' },
    { alt: 'Yahoo logo - Technology company', image: '/images/icons/Yahoo.png' },
    { alt: 'Aon logo - Professional services firm', image: '/images/icons/Aon.png' },
  ];

  const logosToDisplay = blok.logos?.length > 0 ? blok.logos : defaultLogos;
  const shouldCenter = logosToDisplay?.length < 6;

  useEffect(() => {
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

  // Get wrapper vertical padding based on offset and custom spacing
  const getWrapperPadding = () => {
    const hasCustomSpacing = blok.section_spacing && blok.section_spacing !== 'default';
    
    // Default padding: 60px (py-15) desktop, 60px tablet, 60px mobile
    // These match: 3.75vw@1600=60px, 5.859vw@1024=60px, 12.5vw@480=60px
    if (hasCustomSpacing) {
      return ''; // Custom spacing handled via inline style
    }
    
    if (blok.offset_spacing === 'top') {
      return 'pt-15 pb-0';
    }
    if (blok.offset_spacing === 'bottom') {
      return 'pt-0 pb-15';
    }
    return 'py-15';
  };

  // Get custom spacing inline style
  const getWrapperStyle = () => {
    if (!blok.section_spacing || blok.section_spacing === 'default') {
      return {};
    }
    const spacing = `${blok.section_spacing}px`;
    if (blok.offset_spacing === 'top') {
      return { paddingTop: spacing, paddingBottom: 0 };
    }
    if (blok.offset_spacing === 'bottom') {
      return { paddingTop: 0, paddingBottom: spacing };
    }
    return { paddingTop: spacing, paddingBottom: spacing };
  };

  // Card background based on transparent prop and theme
  const getCardStyle = () => {
    if (isTransparent) {
      return { background: 'transparent' };
    }
    return {
      background: selectedTheme?.logo_cube?.cardBg || '#3d2562',
      color: selectedTheme?.logo_cube?.textColor || 'white',
    };
  };

  return (
    <section
      {...storyblokEditable(blok)}
      aria-label="Trusted by leading companies"
      className={cn(
        'flex w-full items-center justify-center',
        getWrapperPadding()
      )}
      style={getWrapperStyle()}
    >
      {/* Card container */}
      <div
        className={cn(
          'overflow-hidden rounded-3xl',
          // Width: transparent = 100%, solid = 1304px (max-w-326)
          isTransparent ? 'w-full' : 'max-w-326',
          // Padding: transparent has different padding than solid
          isTransparent
            ? 'px-0 py-15 tab:py-10 tab:pb-15 mob:pt-11 mob:pb-18'
            : 'px-24 py-15 tab:p-10 tab:pb-15 mob:px-7 mob:pt-11 mob:pb-18',
          // Border radius adjustments
          'tab:rounded-3xl mob:rounded-[27px]'
        )}
        style={getCardStyle()}
      >
        {/* Inner container with gap */}
        <div
          className={cn(
            'flex flex-col items-center justify-center',
            'gap-10 tab:gap-5 mob:gap-9'
          )}
        >
          {/* Title/Header */}
          {blok.header && (
            <header className="w-full text-center">
              <RichTextRenderer
                blok={blok}
                document={blok.header}
                responsiveTextStyles={blok?.responsive_text_styles}
              />
            </header>
          )}

          {/* Logos container */}
          <ul
            aria-label="Company logos carousel"
            className={cn(
              'flex items-center overflow-hidden gap-5',
              // Width: transparent = 100%, solid = 1236px (max-w-309)
              isTransparent ? 'w-full' : 'w-full max-w-309',
              // Justify: center if less than 6 logos, otherwise start (for scrolling)
              shouldCenter ? 'justify-center' : 'justify-start'
            )}
            role="list"
          >
            {logosToDisplay.map((logo, index) => (
              <li
                key={logo.filename || logo.alt || index}
                className="cubeLogos flex-shrink-0"
                role="listitem"
              >
                <Image
                  alt={logo.alt || 'Company logo'}
                  className={cn(
                    // Desktop: 200×100px (w-50 h-25)
                    'h-25 w-50',
                    // Mobile: 224×112px (w-56 h-28)
                    'mob:h-28 mob:w-56'
                  )}
                  height={100}
                  loading="lazy"
                  src={logo.filename || logo.image}
                  width={200}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LogoCube;
