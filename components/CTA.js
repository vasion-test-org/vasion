'use client';
import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';

import Button from '@/components/globalComponents/Button';
import LightboxBtn from '@/components/LightboxButton';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import useMedia from '@/functions/useMedia';
import { cn } from '@/lib/cn';

const CTA = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const bgimg = useMedia(
    blok?.image?.[0],
    blok?.image?.[0],
    blok?.image?.[1] || blok?.image?.[0],
    blok?.image?.[2] || blok?.image?.[0]
  );
  const pillBgimg = useMedia(
    blok?.background_image?.[0],
    blok?.background_image?.[0],
    blok?.background_image?.[1] || blok?.background_image?.[0],
    blok?.background_image?.[2] || blok?.background_image?.[0]
  );

  const ctaStyle = blok.cta_style;
  const fullwidth = blok.fullwidth;
  const isPill = ctaStyle === 'pill';
  const isImage = ctaStyle === 'image';
  const isCentered = ctaStyle === 'centered';
  const isPillWithBg = isPill && pillBgimg?.filename;

  const spacing = blok.section_spacing;
  const spacingOffset = blok.offset_spacing;
  const hasCustomSpacing = spacing && spacing !== 'default';

  // Theme-driven classes via useAvailableThemes (mirrors original ThemeProvider usage)
  const themeTextColor = selectedTheme?.cta?.textColorClass ?? 'text-white';
  const themeCardBg = selectedTheme?.cta?.cardBgClass ?? 'bg-purple';

  const ctaBgImage =
    isImage && bgimg?.filename
      ? { backgroundImage: `url(${bgimg.filename})` }
      : isPillWithBg
        ? { backgroundImage: `url(${pillBgimg.filename})` }
        : undefined;

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        // Vertical padding – spacingOffset top
        spacingOffset === 'top' && !hasCustomSpacing && 'pt-4.5 pb-0 md:pt-15',
        // Vertical padding – spacingOffset bottom
        spacingOffset === 'bottom' && !hasCustomSpacing && 'pt-0 pb-4.5 md:pb-15',
        // Vertical padding – both
        !spacingOffset && !hasCustomSpacing && 'py-4.5 md:py-15'
      )}
      style={
        hasCustomSpacing
          ? {
              paddingTop: spacingOffset === 'bottom' ? 0 : `${spacing}px`,
              paddingBottom: spacingOffset === 'top' ? 0 : `${spacing}px`,
            }
          : undefined
      }
    >
      <div
        {...storyblokEditable(blok)}
        className={cn(
          'flex flex-col overflow-hidden',
          themeTextColor,
          !ctaBgImage && themeCardBg,
          ctaBgImage && 'bg-no-repeat',
          isPillWithBg ? 'bg-size-[100%_100%]' : 'bg-cover bg-right',

          // Text align
          ['pill', 'image'].includes(ctaStyle) ? 'text-left max-sm:text-center' : 'text-center',

          // Align / justify
          isPillWithBg ? 'items-start justify-start' : 'items-center justify-between',

          // Flex direction: pill without bg — column on mobile only, row from sm up
          isPill && !isPillWithBg ? 'max-sm:flex-col sm:flex-row' : 'flex-col',
          // Gap
          isPillWithBg ? 'gap-3 xl:gap-10' : 'gap-4.5 max-sm:gap-4 md:gap-4',

          // Padding
          isPill && 'px-7 py-4.5 md:px-10 md:py-15 lg:px-16 xl:px-24',
          isImage &&
            'items-center pt-7 pr-4.5 pb-11 pl-67.5 sm:items-start sm:pl-[50vw] md:pt-24 md:pr-15 md:pb-37 md:pl-125 lg:pl-120 xl:pl-200',
          isCentered && 'px-11 py-7 md:px-10 md:py-15 lg:px-18 xl:px-0 xl:py-24',
          !isPill &&
            !isImage &&
            !isCentered &&
            'px-0 py-7 md:px-10 md:py-15 lg:px-18 xl:px-0 xl:py-24',
          // Mobile padding override (all styles)
          'max-sm:p-10',

          // Width

          isPill && 'max-sm:w-90 sm:w-180 md:w-275 lg:w-310 xl:w-352',
          isImage && !fullwidth && 'w-106 sm:w-[85vw] md:w-236 lg:w-268 xl:w-325',
          isImage && fullwidth && 'w-full',
          isCentered && 'w-full md:w-full',
          !isPill && !isImage && 'w-full',

          // Min-height
          isPillWithBg && 'min-h-22.5 max-sm:min-h-154 md:min-h-65.5 lg:min-h-70 xl:min-h-75.5',
          isImage && fullwidth && 'min-h-41.5',

          // Border radius: pill and image (when not image+fullwidth) get radius at all breakpoints
          isImage && fullwidth && 'rounded-none',
          (isPill || isImage) && !(isImage && fullwidth) && 'rounded-2xl'
        )}
        style={ctaBgImage}
      >
        {/* ContentWrapper */}
        <div
          className={cn(
            'flex flex-col',
            'gap-1.25 max-sm:gap-4 md:gap-4',
            isPillWithBg ? 'max-w-98' : 'xl:max-w-wide max-w-107 max-sm:max-w-full md:max-w-200',
            ['pill', 'image'].includes(ctaStyle) ? 'text-left max-sm:text-center' : 'text-center'
          )}
        >
          {blok.copy_sections?.map((copy) => (
            <div key={copy.component} {...storyblokEditable(copy)}>
              <RichTextRenderer $centered className={copy.component} document={copy.copy} />
            </div>
          ))}
        </div>

        {blok?.button_group?.map(($buttonData) =>
          $buttonData.component === 'light_box_button' ? (
            <LightboxBtn blok={$buttonData} key="lightbox" />
          ) : (
            <div {...storyblokEditable($buttonData)} key={$buttonData?.link_text}>
              <Button $buttonData={$buttonData} key={$buttonData?.link_text} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CTA;
