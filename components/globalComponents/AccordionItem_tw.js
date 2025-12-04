"use client";
import React, { useState, useRef, useEffect } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "@/styles/colors";
import DownChevron from "@/assets/svg/ChevronDown.svg";

const AccordionItem_tw = ({ accordionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chevronRef = useRef(null);
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);

  const toggleAccordion = async () => {
    const { default: gsap } = await import('gsap');

    setIsOpen(!isOpen);

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotation: isOpen ? 0 : 180,
        color: isOpen ? colors.txtPrimary : colors.primaryOrange,
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
          ease: "power2.out",
          onComplete: () => {
            if (isOpen) {
              gsap.set(contentRef.current, { height: "auto" });
            }
          },
        });
      }
    };

    initAnimation();
  }, [isOpen]);

  const headerContent = accordionItem.copy_blocks[0];

  const contentBlocks = accordionItem.copy_blocks.slice(1);

  return (
    <div className="flex flex-col py-[1.5vw] border-t border-[#808085] last:border-b last:border-[#808085] fullWidth:py-6 fullWidth:border-t fullWidth:border-[#808085] fullWidth:last:border-b fullWidth:last:border-[#808085] tablet:py-[2.344vw] tablet:border-t tablet:border-[#808085] tablet:last:border-b tablet:last:border-[#808085] mobile:py-[5vw] mobile:border-t mobile:border-[#808085] mobile:last:border-b mobile:last:border-[#808085]">
      <div className="cursor-pointer w-full" onClick={toggleAccordion}>
        {headerContent && (
          <div
            className="flex justify-between items-center w-full"
            {...storyblokEditable(headerContent)}
          >
            <RichTextRenderer
              className={headerContent.component}
              document={headerContent.copy}
            />
            <div className="flex items-center justify-center" ref={chevronRef}>
              <DownChevron className="h-[1.563vw] w-[1.563vw] fullWidth:h-[25px] fullWidth:w-[25px] tablet:h-[2.441vw] tablet:w-[2.441vw] mobile:h-[5.208vw] mobile:w-[5.208vw]" />
            </div>
          </div>
        )}
      </div>

      <div className="h-0 overflow-hidden" ref={contentRef}>
        <div
          className="pt-[1.5vw] fullWidth:pt-6 tablet:pt-[2.344vw] mobile:pt-[5vw]"
          ref={contentInnerRef}
        >
          {contentBlocks.map((copy, idx) => (
            <div
              key={copy._uid || `${copy.component}-${idx}`}
              {...storyblokEditable(copy)}
            >
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

export default AccordionItem_tw;

