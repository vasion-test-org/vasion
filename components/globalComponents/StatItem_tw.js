'use client';
import React from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from '@/components/globalComponents/Button';

const StatItem_tw = ({ statItem }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-evenly text-center w-[14.563vw] h-[12.75vw] gap-[1.5vw] fullWidth:w-[233px] fullWidth:h-[204px] fullWidth:gap-6 tablet:w-[13.965vw] tablet:h-[19.336vw] mobile:w-[66.667vw] mobile:h-[37.917vw]"
      {...storyblokEditable(statItem)}
    >
      <p className="font-['Orbitron_Regular'] font-medium text-[3.333vw] leading-[4.028vw] fullWidth:text-[48px] fullWidth:leading-[58px] tablet:text-[4.688vw] tablet:leading-[5.664vw] mobile:text-[7.477vw] mobile:leading-[9.346vw] text-[#ff5100]">
        {statItem.stat}
      </p>
      <RichTextRenderer document={statItem.copy[0].copy} />
      {statItem.link[0] && (
        <div>
          <Button
            key={statItem.link[0].link_text}
            $buttonData={statItem.link[0]}
          />
        </div>
      )}
    </div>
  );
};

export default StatItem_tw;

