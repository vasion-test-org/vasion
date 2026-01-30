'use client';

import { useEffect, useRef, useState } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';

import DownChevron from '@/assets/svg/ChevronDown.svg';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

/**
 * AccordionItem (Client Component)
 * Interactive accordion item with GSAP animations for expand/collapse.
 * Must be client component due to useState, useRef, and animation logic.
 */
const AccordionItem = ({ accordionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chevronRef = useRef(null);
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);

  // Generate unique ID for scoped styles
  const componentId = useRef(`accordion-item-${Math.random().toString(36).slice(2, 9)}`).current;

  const toggleAccordion = async () => {
    const { default: gsap } = await import('gsap');

    setIsOpen(!isOpen);

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotation: isOpen ? 0 : 180,
        color: isOpen ? '#1B1D21' : '#ff5100', // txt-primary : orange-DEFAULT
        duration: 0.3,
      });
    }
  };

  useEffect(() => {
    const initAnimation = async () => {
      const { default: gsap } = await import('gsap');

      if (contentRef.current && contentInnerRef.current) {
        const contentHeight = isOpen ? contentInnerRef.current.offsetHeight : 0;

        gsap.to(contentRef.current, {
          height: contentHeight,
          duration: 0.4,
          ease: 'power2.out',
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
    <>
      <style>{`
        .${componentId} {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 0; /* 24px */
          border-top: 1px solid #808085; /* txt-subtle */
        }
        .${componentId}:last-child {
          border-bottom: 1px solid #808085;
        }
        .${componentId}-content-inner {
          padding-top: 1.5rem; /* 24px */
        }
        .${componentId}-chevron {
          height: 1.5625rem; /* 25px */
          width: 1.5625rem;
          transition: transform 0.3s ease;
        }
        @media (max-width: 1024px) {
          .${componentId} {
            padding: 2.344vw 0;
          }
          .${componentId}-content-inner {
            padding-top: 2.344vw;
          }
          .${componentId}-chevron {
            height: 2.441vw;
            width: 2.441vw;
          }
        }
        @media (max-width: 480px) {
          .${componentId} {
            padding: 5vw 0;
          }
          .${componentId}-content-inner {
            padding-top: 5vw;
          }
          .${componentId}-chevron {
            height: 5.208vw;
            width: 5.208vw;
          }
        }
      `}</style>
      <div className={componentId}>
        <button
          id={`${componentId}-header`}
          type="button"
          className="w-full cursor-pointer bg-transparent border-none p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-border focus-visible:ring-offset-2 rounded-sm"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`${componentId}-content`}
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
                ref={chevronRef}
                className="flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <DownChevron className={`${componentId}-chevron`} />
              </div>
            </div>
          )}
        </button>

        <div
          id={`${componentId}-content`}
          ref={contentRef}
          className="h-0 overflow-hidden"
          role="region"
          aria-labelledby={`${componentId}-header`}
        >
          <div ref={contentInnerRef} className={`${componentId}-content-inner`}>
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
    </>
  );
};

export default AccordionItem;
