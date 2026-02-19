'use client';

import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';

import Button from '@/components/globalComponents/Button';
import LightboxBtn from '@/components/LightboxButton';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import useMedia from '@/functions/useMedia';
import { cn, tw } from '@/lib/cn';

const CTA = ({ blok }) => {
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
    blok?.background_image?.[2] || blok?.background_image?.[0] || blok?.background_image?.[0]
  );

  const ctaStyle = blok.cta_style;
  const fullwidth = blok.fullwidth;
  const isPillWithBg = ctaStyle === 'pill' && pillBgimg?.filename;
  const isImage = ctaStyle === 'image';
  const isCentered = ctaStyle === 'centered';
  const isPill = ctaStyle === 'pill';

  const themeName = blok.theme || 'default';
  const themeCtaBg =
    themeName === 'dark'
      ? 'bg-cta-dark'
      : themeName === 'light'
        ? 'bg-purple-lightGrey'
        : 'bg-purple';
  const themeCtaText =
    themeName === 'light' ? 'text-txt-primary' : 'text-white';

  const spacing = blok.section_spacing;
  const spacingOffset = blok.offset_spacing;

  const pillContainerPadding = cn(
    'flex w-full items-center justify-center',
    spacingOffset === 'top' &&
      (spacing === 'default' ? 'pt-15 pb-0' : typeof spacing === 'number' ? `pt-[${spacing}px] pb-0` : 'pt-15 pb-0'),
    spacingOffset === 'bottom' &&
      (spacing === 'default' ? 'pt-0 pb-15' : typeof spacing === 'number' ? `pb-[${spacing}px] pt-0` : 'pt-0 pb-15'),
    !spacingOffset &&
      (spacing === 'default' ? 'py-15' : typeof spacing === 'number' ? `py-[${spacing}px]` : 'py-15')
  );

  const contentWrapperClasses = cn(
    'flex flex-col gap-4',
    isPillWithBg ? 'max-w-98' : 'max-w-full md:max-w-200 xl:max-w-300',
    ['pill', 'image'].includes(ctaStyle) ? 'lg:text-left' : 'text-center'
  );

  const ctaWrapperBg =
    isImage && bgimg?.filename
      ? { backgroundImage: `url(${bgimg.filename})` }
      : isPillWithBg && pillBgimg?.filename
        ? { backgroundImage: `url(${pillBgimg.filename})` }
        : undefined;

  return (
    <div className={pillContainerPadding}>
      <div
        {...storyblokEditable(blok)}
        className={cn(
          'flex flex-col overflow-hidden text-center',
          themeCtaText,
          !ctaWrapperBg && themeCtaBg,
          ctaWrapperBg && 'bg-no-repeat',
          isPillWithBg && 'bg-[length:100%_100%]',
          !isPillWithBg && 'bg-cover',
          isPillWithBg ? 'items-start justify-start' : 'items-center justify-between',
          isPill && !isPillWithBg && 'lg:flex-row',
          isPillWithBg ? 'gap-10' : tw`gap-4 md:gap-4 lg:gap-15`,
          ['pill', 'image'].includes(ctaStyle) && 'lg:text-left',
          // Padding - mobile first, then md, then xl
          isPill && tw`py-4.5 px-7 md:(py-15 px-10) xl:(py-15 px-24)`,
          isImage &&
            tw`pt-7 pr-4.5 pb-11 pl-68 md:(pt-24 pr-15 pb-37 pl-118) xl:(pt-24 pr-15 pb-37 pl-225)`,
          isCentered && tw`py-11 px-7 md:(py-15 px-10) xl:(py-24 px-0)`,
          !isPill && !isImage && !isCentered && tw`py-7 px-0 md:(py-15 px-10) xl:(py-24 px-0)`,
          // Width
          isImage && fullwidth && 'w-full',
          isPill && 'w-107 md:w-236 lg:w-326',
          isImage && !fullwidth && 'w-107 md:w-236 lg:w-352',
          (isCentered || (isImage && fullwidth)) && 'w-full',
          !isPill && !isImage && 'w-full',
          // Min-height
          isPillWithBg && 'min-h-154 md:min-h-66 xl:min-h-76',
          isImage && fullwidth && 'min-h-42 md:min-h-89 xl:min-h-139',
          // Border-radius
          isImage && fullwidth && 'rounded-none',
          (isPill || isImage) && !(isImage && fullwidth) && 'rounded-2xl'
        )}
        style={ctaWrapperBg}
      >
        <div className={contentWrapperClasses}>
          {blok.copy_sections?.map((copy) => (
            <div key={copy.component} {...storyblokEditable(copy)}>
              <RichTextRenderer className={copy.component} document={copy.copy} />
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
