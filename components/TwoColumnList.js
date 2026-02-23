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

  const introItemsWithContent = blok?.intro_content?.filter(
    (item) => item?.copy && hasRichTextContent(item.copy)
  );
  const introMap = introItemsWithContent?.map((item, index) => (
    <RichTextRenderer document={item.copy} key={index} />
  ));

  const column1 = blok?.column_1?.map((item, index) => (
    <div
      key={`col1-item-${index}`}
      className={tw`flex w-80 flex-row items-start gap-2 md:w-auto md:gap-3`}
    >
      {item?.icon?.filename && (
        <Image
          src={item.icon.filename}
          alt=""
          width={item.small_icon ? 40 : 64}
          height={item.small_icon ? 40 : 64}
          className={cn(
            'shrink-0',
            item.small_icon ? 'h-auto w-8 md:w-8 lg:w-10' : 'h-auto w-14 md:w-14 lg:w-16'
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
    <div key={`col2-item-${index}`} className={tw`flex flex-row items-start gap-2 md:gap-3`}>
      {item?.icon?.filename && (
        <Image
          src={item.icon.filename}
          alt=""
          width={item?.small_icon ? 40 : 64}
          height={item?.small_icon ? 40 : 64}
          className={cn(
            'shrink-0',
            item?.small_icon ? 'h-auto w-8 md:w-8 lg:w-10' : 'h-auto w-14 md:w-14 lg:w-16'
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
        'w-full max-w-full overflow-hidden',
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
          'flex w-full max-w-full flex-col items-center justify-center gap-10',
          'px-6 py-5 md:px-10 md:py-10',
          isDarkTheme ? 'bg-purple-lightGrey' : 'bg-white',
          'text-txt-primary',
          'rounded-2xl'
        )}
      >
        {introItemsWithContent?.length > 0 && (
          <div
            className={cn(
              'flex min-w-0 flex-col gap-5 md:gap-3',
              'w-full max-w-full md:max-w-236 xl:max-w-326',
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
            'flex min-w-0 flex-col gap-10 md:flex-row md:gap-4 lg:gap-7 xl:gap-7',
            'self-end',
            blok.comparison ? 'w-max max-w-full' : 'w-full max-w-full md:max-w-236 xl:max-w-326'
          )}
        >
          <div
            className={cn(
              'flex min-w-0 flex-col gap-5',
              hasTwoColumns ? 'w-full max-w-full md:max-w-116 lg:max-w-160 xl:max-w-160' : 'w-full'
            )}
          >
            {column1}
          </div>
          {hasTwoColumns && (
            <div className="flex w-full max-w-full min-w-0 flex-col gap-5 md:max-w-116 lg:max-w-160 xl:max-w-160">
              {column2}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

function hasRichTextContent(doc) {
  if (!doc?.content?.length) return false;
  return doc.content.some((node) => {
    if (typeof node?.text === 'string' && node.text.trim().length > 0) return true;
    if (node?.content?.length) return hasRichTextContent({ content: node.content });
    return false;
  });
}

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
