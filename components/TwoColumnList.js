'use client';

import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

import { useAvailableThemes } from '@/context/ThemeContext';
import { cn, tw } from '@/lib/cn';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const TwoColumnList = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const isDarkTheme = selectedTheme?.two_column_list?.bg === themes.dark?.two_column_list?.bg;
  const spacing = blok.spacing;
  const spacingOffset = blok.spacing_offset;
  const isDefaultSpacing = spacing === 'default' || spacing == null;
  const customSpacingPx = !isDefaultSpacing && spacing != null ? Number(spacing) : null;

  const introMap = blok?.intro_content?.map((item, index) => (
    <RichTextRenderer document={item.copy} key={index} />
  ));

  const column1 = blok?.column_1?.map((item, index) => (
    <div
      key={`col1-item-${index}`}
      className={tw`flex w-80 flex-row items-center gap-2 md:w-auto md:items-center md:gap-3`}
    >
      {item?.icon?.filename && (
        <Image
          src={item.icon.filename}
          alt=""
          width={item?.small_icon ? 32 : 48}
          height={item?.small_icon ? 32 : 48}
          className={cn(
            'shrink-0',
            item.small_icon ? 'h-6 w-6 md:h-6 md:w-6 lg:h-8 lg:w-8' : 'h-12 w-12'
          )}
          aria-hidden
        />
      )}
      <div className="flex flex-col justify-center gap-3">
        {columnCopyItems(item?.copy, `col1-${index}`)}
      </div>
    </div>
  ));

  const column2 = blok?.column_2?.map((item, index) => (
    <div
      key={`col2-item-${index}`}
      className={tw`flex flex-row items-center gap-2 md:items-center md:gap-3`}
    >
      {item?.icon?.filename && (
        <Image
          src={item.icon.filename}
          alt=""
          width={item?.small_icon ? 32 : 48}
          height={item?.small_icon ? 32 : 48}
          className={cn(
            'shrink-0',
            item?.small_icon ? 'h-6 w-6 md:h-6 md:w-6 lg:h-8 lg:w-8' : 'h-12 w-12'
          )}
          aria-hidden
        />
      )}
      <div className="flex flex-col justify-center gap-3">
        {columnCopyItems(item?.copy, `col2-${index}`)}
      </div>
    </div>
  ));

  const hasTwoColumns = column2?.length > 0;

  return (
    <section
      className={cn(
        'w-full overflow-hidden',
        isDefaultSpacing && spacingOffset === 'top' && 'pt-4.5 md:pt-15',
        isDefaultSpacing && spacingOffset === 'bottom' && 'pb-4.5 md:pb-15',
        isDefaultSpacing && !spacingOffset && 'py-4.5 md:py-15',
        customSpacingPx != null && spacingOffset === 'top' && `pt-[${customSpacingPx}px]`,
        customSpacingPx != null && spacingOffset === 'bottom' && `pb-[${customSpacingPx}px]`,
        customSpacingPx != null && !spacingOffset && `py-[${customSpacingPx}px]`
      )}
    >
      <div
        {...storyblokEditable(blok)}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-10',
          'py-5 md:py-10',
          isDarkTheme ? 'bg-purple-lightGrey' : 'bg-white',
          'text-txt-primary'
        )}
      >
        {blok.intro_content && (
          <div
            className={cn(
              'flex flex-col gap-5 md:gap-3',
              'w-100 md:w-236 xl:w-326',
              blok.alignment === 'center' && 'text-center',
              blok.alignment === 'right' && 'text-right',
              !blok.alignment && 'text-left'
            )}
          >
            {introMap}
          </div>
        )}
        <div
          className={cn(
            'relative left-7 flex flex-col gap-10 sm:left-15 sm:flex-row sm:gap-0 md:left-35 md:flex-row md:gap-4 lg:left-45 lg:gap-7 xl:gap-7',
            'center',
            blok.comparison ? 'w-max' : 'w-107 md:w-236 xl:w-326'
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-5',
              hasTwoColumns ? 'w-100 md:w-116 lg:w-160 xl:w-160' : 'w-full'
            )}
          >
            {column1}
          </div>
          {hasTwoColumns && (
            <div className="flex w-100 flex-col gap-5 md:w-116 lg:w-160 xl:w-160">{column2}</div>
          )}
        </div>
      </div>
    </section>
  );
};

function columnCopyItems(copyItems, keyPrefix = 'col') {
  if (!copyItems?.length) return null;
  return copyItems.map((item, columnIndex) => (
    <RichTextRenderer
      document={item.copy}
      key={keyPrefix ? `${keyPrefix}-${columnIndex}` : columnIndex}
    />
  ));
}

export default TwoColumnList;
