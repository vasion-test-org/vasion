'use client';

import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';

import Image from '@/components/globalComponents/Image';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { cn, tw } from '@/lib/cn';

import Button from './globalComponents/Button';

const Testimonial = ({ blok }) => {
  const themeKey = blok.theme || 'default';
  const isDark = themeKey === 'dark';
  const layout = blok.layout;
  const spacing = blok.section_spacing;
  const spacingMap = {
    40: 'py-10',
    60: 'py-15',
    80: 'py-20',
  };
  const spacingClasses =
    spacing === 'default' || !spacing
      ? tw`py-4.5 md:py-10 lg:py-15`
      : spacingMap[spacing] ?? tw`py-4.5 md:py-10 lg:py-15`;

  return (
    <div className={cn('flex flex-col items-center justify-center', spacingClasses)}>
      <div
        className={cn(
          // 1. Base (mobile)
          'flex h-auto w-full gap-10 rounded-none p-6 py-18',
          isDark ? 'bg-testimonial-dark text-white' : 'bg-purple-lightGrey text-txt-primary',
          // 2. Tablet
          tw`md:(w-236 p-10) gap-15 rounded-3xl`,
          // 3. Desktop
          tw`lg:(w-326 p-15)`,
          // 4. Layout (column vs row)
          layout === 'column' ? 'flex-col' : tw`flex-col lg:flex-row`
        )}
      >
        <div className="w-90 text-left sm:w-165 md:w-375 lg:max-w-480">
          <p className="font-archivo text-eyebrow !mb-3.5 uppercase md:!mb-4 lg:!mb-4">
            {blok?.eyebrow || 'Testimonial'}
          </p>
          {blok.quote.map((copy) => (
            <div {...storyblokEditable(copy)} key={copy.component}>
              <RichTextRenderer document={copy.copy} />
            </div>
          ))}
          {blok?.quote_source_info && (
            <div className="mt-4.5 md:mt-15">
              {blok.quote_source_info.map((sourceInfo) => (
                <div
                  {...storyblokEditable(sourceInfo)}
                  key={sourceInfo._uid || sourceInfo.component}
                >
                  <RichTextRenderer document={sourceInfo?.copy} />
                </div>
              ))}
              {blok?.link?.map(($buttonData) => (
                <div
                  className="mt-5"
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?._uid || $buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} />
                </div>
              ))}
            </div>
          )}
        </div>
        {blok?.media[0] && (
          <div
            {...storyblokEditable(blok)}
            className="max-w-107 min-w-107 overflow-hidden rounded-md md:max-w-84 md:min-w-84 md:rounded-3xl lg:max-w-96 lg:min-w-96"
          >
            <Image
              alt={blok.media[0]?.media?.[0]?.alt || 'Testimonial source'}
              images={blok.media[0]?.media}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
