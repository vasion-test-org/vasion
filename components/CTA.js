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
        spacingOffset === 'top' && !hasCustomSpacing && 'pt-[3.75vw] pb-0 md:pt-[5.859vw] xl:pt-15',
        // Vertical padding – spacingOffset bottom
        spacingOffset === 'bottom' &&
          !hasCustomSpacing &&
          'pt-0 pb-[3.75vw] md:pb-[5.859vw] xl:pb-15',
        // Vertical padding – both
        !spacingOffset && !hasCustomSpacing && 'py-[3.75vw] md:py-[5.859vw] xl:py-15'
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
          isPillWithBg ? 'bg-[length:100%_100%]' : 'bg-cover',

          // Text align
          ['pill', 'image'].includes(ctaStyle) ? 'text-left max-sm:text-center' : 'text-center',

          // Align / justify
          isPillWithBg ? 'items-start justify-start' : 'items-center justify-between',

          // Flex direction
          isPill && !isPillWithBg ? 'lg:flex-row' : 'flex-col',

          // Gap
          isPillWithBg
            ? 'gap-[2.5vw] xl:gap-10'
            : 'gap-[3.75vw] max-sm:gap-[3.333vw] md:gap-[5.859vw] xl:gap-15',

          // Padding
          isPill && 'px-[6vw] py-[3.75vw] md:px-[3.906vw] md:py-[5.859vw] xl:px-24 xl:py-15',
          isImage &&
            'pt-[6vw] pr-[3.75vw] pb-[9.25vw] pl-[56.25vw] md:pt-[9.375vw] md:pr-[5.859vw] md:pb-[14.453vw] md:pl-[46.094vw] xl:pt-24 xl:pr-15 xl:pb-[148px] xl:pl-[900px]',
          isCentered && 'px-[9.25vw] py-[6vw] md:px-[3.906vw] md:py-[5.859vw] xl:px-0 xl:py-24',
          !isPill &&
            !isImage &&
            !isCentered &&
            'px-0 py-[6vw] md:px-[3.906vw] md:py-[5.859vw] xl:px-0 xl:py-24',
          // Mobile padding override (all styles)
          'max-sm:p-[8.333vw]',

          // Width
          isPill && 'w-[81.5vw] md:w-[92.188vw] xl:w-[1304px]',
          isImage && !fullwidth && 'w-[88vw] md:w-[92.188vw] xl:w-[1408px]',
          isImage && fullwidth && 'w-full',
          isCentered && 'w-full md:w-full',
          !isPill && !isImage && 'w-full',

          // Min-height
          isPillWithBg &&
            'min-h-[18.875vw] max-sm:min-h-[128.125vw] md:min-h-[25.586vw] xl:min-h-[302px]',
          isImage && fullwidth && 'min-h-[34.722vw]',

          // Border radius
          isImage && fullwidth && 'rounded-none',
          (isPill || isImage) &&
            !(isImage && fullwidth) &&
            'rounded-[1.5vw] max-sm:rounded-[5vw] md:rounded-[2.344vw] xl:rounded-2xl'
        )}
        style={ctaBgImage}
      >
        {/* ContentWrapper */}
        <div
          className={cn(
            'flex flex-col',
            'gap-[1vw] max-sm:gap-[3.333vw] md:gap-[1.563vw] xl:gap-4',
            isPillWithBg
              ? 'max-w-[392px]'
              : 'max-w-[75vw] max-sm:max-w-full md:max-w-[78.125vw] xl:max-w-[1200px]',
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
