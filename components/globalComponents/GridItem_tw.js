import React from 'react';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Icon from '@/components/globalComponents/Icon';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';

const GridItem_tw = ({ content, alignment }) => {
  // Get alignment classes
  const getAlignmentClasses = () => {
    if (alignment === 'center') {
      return 'items-center text-center';
    }
    if (alignment === 'right') {
      return 'items-end text-right';
    }
    return 'items-start text-left';
  };

  return (
    <div
      className={`flex flex-col h-auto w-[18.5vw] gap-[1vw] fullWidth:w-[296px] fullWidth:gap-4 tablet:w-[21.582vw] tablet:gap-[1.563vw] mobile:w-[89.167vw] mobile:gap-[3.333vw] ${getAlignmentClasses()}`}
    >
      {content.icon && (
        <div key={content.icon.filename} {...storyblokEditable(content)}>
          <Icon imageAlt={content.icon.alt} imageSrc={content.icon.filename} />
        </div>
      )}
      {content.content.map((copy) => (
        <div key={copy._uid || copy.component} {...storyblokEditable(copy)}>
          <RichTextRenderer
            className={copy.component}
            document={copy.copy}
            centered
          />
        </div>
      ))}
      {/* <Button $buttonData={content.Button[0]}/> */}
    </div>
  );
};

export default GridItem_tw;

