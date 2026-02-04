'use client';

import { useEffect, useRef, useState } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';

import DownChevron from '@/assets/svg/ChevronDown.svg';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { cn } from '@/lib/cn';

/**
 * AccordionItem (Client Component)
 * Interactive accordion item with GSAP animations for expand/collapse.
 * Must be client component due to useState, useRef, and animation logic.
 * 
 * VW Conversion Notes:
 * - Padding: 1.5vw (desk) / 2.344vw (tab) / 5vw (mob) all = 24px → py-6
 * - Chevron: 1.563vw (desk) / 2.441vw (tab) / 5.208vw (mob) all = 25px → size-6
 * - Content padding: Same as above → pt-6
 */
const AccordionItem = ({ accordionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chevronRef = useRef(null);
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);
  // Use accordionItem._uid for deterministic ID that matches parent key
  const componentId = `accordion-item-${accordionItem._uid}`;

  const toggleAccordion = async () => {
    const { default: gsap } = await import('gsap');

    setIsOpen(!isOpen);

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        color: isOpen ? '#1B1D21' : '#ff5100', // txt-primary : orange-DEFAULT
        duration: 0.3,
        rotation: isOpen ? 0 : 180,
      });
    }
  };

  useEffect(() => {
    const initAnimation = async () => {
      const { default: gsap } = await import('gsap');

      if (contentRef.current && contentInnerRef.current) {
        const contentHeight = isOpen ? contentInnerRef.current.offsetHeight : 0;

        gsap.to(contentRef.current, {
          duration: 0.4,
          ease: 'power2.out',
          height: contentHeight,
          onComplete: () => {
            if (isOpen) {
              gsap.set(contentRef.current, { height: 'auto' });
            }
          },
        });
      }
    };

    initAnimation();
  }, [isOpen]);

  const headerContent = accordionItem.copy_blocks?.[0];
  const contentBlocks = accordionItem.copy_blocks?.slice(1) || [];

  return (
    <div
      className={cn(
        'flex flex-col py-6',
        'border-t border-txt-subtle',
        'last:border-b last:border-txt-subtle'
      )}
    >
      <button
        className={cn(
          'w-full cursor-pointer bg-transparent border-none p-0 text-left',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-border focus-visible:ring-offset-2 rounded-sm'
        )}
        aria-controls={`${componentId}-content`}
        aria-expanded={isOpen}
        id={`${componentId}-header`}
        type="button"
        onClick={toggleAccordion}
      >
        {headerContent && (
          <div
            className="flex justify-between items-center w-full gap-4"
            {...storyblokEditable(headerContent)}
          >
            <div className="flex-1">
              <RichTextRenderer
                className={headerContent.component}
                document={headerContent.copy}
              />
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center flex-shrink-0"
              ref={chevronRef}
            >
              <DownChevron className="size-6 transition-transform duration-300" />
            </div>
          </div>
        )}
      </button>

      <div
        aria-labelledby={`${componentId}-header`}
        className="h-0 overflow-hidden"
        id={`${componentId}-content`}
        ref={contentRef}
        role="region"
      >
        <div className="pt-6" ref={contentInnerRef}>
          {contentBlocks.map((copy, idx) => (
            <div key={copy._uid || `content-${idx}`} {...storyblokEditable(copy)}>
              <RichTextRenderer
                className={copy.component}
                document={copy.copy}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
