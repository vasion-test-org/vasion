'use client';
import React, { useContext } from 'react';
import Button from '@/components/globalComponents/Button';
import { ScreenContext } from '@/components/providers/Screen';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Card_tw from './globalComponents/Card_tw';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import colors from '@/styles/colors';
import useMedia from '@/functions/useMedia';

const LaunchGrid_tw = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const responsiveBackground = useMedia(
    blok?.launch_cta?.[0]?.assets?.[1]?.filename,
    blok?.launch_cta?.[0]?.assets?.[1]?.filename,
    blok?.launch_cta?.[0]?.assets?.[2]?.filename,
    blok?.launch_cta?.[0]?.assets?.[3]?.filename
  );

  const ctaCopy = blok.launch_cta[0].copy_section.map((copy, index) => {
    return <RichTextRenderer document={copy.copy} key={copy._uid || index} />;
  });

  const cards = blok?.cards?.map((card) => {
    if (!card.Image?.filename) return null;
    const cardContent = {
      content: card.content,
      Button: card.Button,
      Image: card.Image,
      has_hover: card.has_hover,
      image_border: card.image_border,
      blur_card: card.blur_card,
    };

    return (
      <Card_tw
        key={card._uid}
        blur={card.blur_card}
        content={cardContent}
        {...storyblokEditable(card)}
      >
        <img
          src={card.Image.filename}
          alt={card.Image.alt || ''}
          className="relative w-full h-[14.25vw] rounded-[0.375vw] fullWidth:h-[228px] fullWidth:rounded-[6px] tablet:h-[15.625vw] tablet:rounded-[0.586vw] mobile:h-[48.333vw] mobile:rounded-[1.25vw]"
        />
        <div>
          {card.content?.map((copyItem) => (
            <div key={copyItem._uid || copyItem.component}>
              <RichTextRenderer document={copyItem.copy} />
            </div>
          ))}
        </div>
        {card?.Button?.map(($buttonData) => (
          <div
            className="relative flex self-start justify-self-end mt-auto"
            {...storyblokEditable($buttonData)}
            key={$buttonData._uid || $buttonData.link_text}
          >
            <Button key={$buttonData.link_text} $buttonData={$buttonData} />
          </div>
        ))}
      </Card_tw>
    );
  });
  
  const ctaContent = (
    <div className="relative flex flex-col w-[33.25vw] fullWidth:w-[532px] tablet:w-[33.301vw] mobile:w-[79.167vw]">
      <div className="flex p-[0.25vw_0.5vw] w-fit mb-[0.75vw] bg-[#CBBFF1] rounded-[1.5vw] fullWidth:p-[4px_8px] fullWidth:rounded-[24px] fullWidth:mb-3 tablet:p-[4px_7px] tablet:rounded-[2.344vw] tablet:mb-[1.172vw] mobile:p-[0.833vw_1.667vw] mobile:rounded-[5vw] mobile:mb-[2.5vw]">
        <RichTextRenderer document={blok?.launch_cta[0]?.tag?.[0]?.copy} />
      </div>
      <div className="mb-[2.5vw] whitespace-nowrap fullWidth:mb-10 tablet:mb-[3.906vw] mobile:mb-[8.333vw]" {...storyblokEditable(blok?.launch_cta?.[0])}>
        {ctaCopy}
      </div>
      {blok?.launch_cta?.[0]?.button_group?.map(($buttonData) => (
        <div {...storyblokEditable($buttonData)} key={$buttonData._uid || $buttonData.link_text}>
          <Button key={$buttonData.link_text} $buttonData={$buttonData} />
        </div>
      ))}
    </div>
  );

  // Calculate padding
  const spacing = blok.section_spacing;
  const offset = blok.offset_spacing;

  const getPaddingClasses = () => {
    if (spacing && spacing !== 'default') {
      return '';
    }
    if (offset === 'top') {
      return 'pt-[3.75vw] pb-0 px-0 fullWidth:pt-[60px] fullWidth:pb-0 tablet:pt-[5.859vw] tablet:pb-0 mobile:pt-[12.5vw] mobile:pb-0';
    }
    if (offset === 'bottom') {
      return 'pt-0 pb-[3.75vw] px-0 fullWidth:pt-0 fullWidth:pb-[60px] tablet:pt-0 tablet:pb-[5.859vw] mobile:pt-0 mobile:pb-[12.5vw]';
    }
    return 'py-[3.75vw] px-0 fullWidth:py-[60px] tablet:py-[5.859vw] mobile:py-[12.5vw]';
  };

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
      className={`flex flex-col items-center justify-center gap-[2.5vw] bg-[#F5F4F7] fullWidth:gap-10 tablet:gap-[3.906vw] mobile:gap-[8.333vw] ${getPaddingClasses()}`}
      style={getPaddingStyle()}
    >
      <div className="flex flex-col gap-[1.5vw] fullWidth:gap-6 tablet:gap-[7.031vw] mobile:gap-0">
        {!mobile && (
          <div
            className="relative justify-end items-center flex w-[81.5vw] h-fit min-h-[24.5vw] rounded-[0.5vw] pr-[3.75vw] bg-cover bg-no-repeat fullWidth:w-[1304px] fullWidth:rounded-[8px] fullWidth:h-fit fullWidth:min-h-[392px] fullWidth:pr-[60px] tablet:w-[92.188vw] tablet:rounded-[0.781vw] tablet:h-auto tablet:min-h-[33.594vw] tablet:pr-[5.859vw] tablet:bg-contain"
            style={{
              backgroundImage: responsiveBackground ? `url(${responsiveBackground})` : 'unset',
            }}
          >
            {ctaContent}
          </div>
        )}
        {mobile && (
          <div className="flex flex-col w-[89.167vw]">
            <div
              className="h-[63.75vw] w-[89.167vw] bg-cover bg-no-repeat rounded-[5vw_5vw_0_0]"
              style={{
                backgroundImage: responsiveBackground ? `url(${responsiveBackground})` : 'unset',
              }}
            />
            <div className="flex bg-[#201435] w-[89.167vw] h-fit p-[9.167vw_5vw] rounded-[0_0_5vw_5vw]">
              {ctaContent}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-[1.25vw] h-max fullWidth:gap-5 tablet:gap-[1.953vw] mobile:gap-[4.167vw]">
        {cards}
      </div>
    </div>
  );
};

export default LaunchGrid_tw;

