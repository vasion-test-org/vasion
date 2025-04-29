"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "@/styles/colors";
import gsap from "gsap";
import DownChevron from "@/assets/svg/ChevronDown.svg";

const AccordionItem = ({ accordionItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const chevronRef = useRef(null);
  const contentRef = useRef(null);
  const contentInnerRef = useRef(null);

  const toggleAccordion = () => {
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
  }, [isOpen]);

  const headerContent = accordionItem.copy_blocks[0];

  const contentBlocks = accordionItem.copy_blocks.slice(1);

  return (
    <Item $isOpen={isOpen}>
      <ItemHeader onClick={toggleAccordion}>
        {headerContent && (
          <HeaderContent {...storyblokEditable(headerContent)}>
            <RichTextRenderer
              className={headerContent.component}
              document={headerContent.copy}
            />
            <ChevronWrapper ref={chevronRef}>
              <Chevron />
            </ChevronWrapper>
          </HeaderContent>
        )}
      </ItemHeader>

      <ContentWrapper ref={contentRef}>
        <ContentInner ref={contentInnerRef}>
          {contentBlocks.map((copy, idx) => (
            <div key={`${copy.component}-${idx}`} {...storyblokEditable(copy)}>
              <RichTextRenderer
                className={copy.component}
                document={copy.copy}
              />
            </div>
          ))}
        </ContentInner>
      </ContentWrapper>
    </Item>
  );
};

const ContentInner = styled.div`
  padding-top: 1.5vw;

  ${media.fullWidth} {
    padding-top: 24px;
  }

  ${media.tablet} {
    padding-top: 2.344vw;
  }

  ${media.mobile} {
    padding-top: 5vw;
  }
`;

const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chevron = styled(DownChevron)`
  height: 1.563vw;
  width: 1.563vw;

  ${media.fullWidth} {
    height: 25px;
    width: 25px;
  }

  ${media.tablet} {
    height: 2.441vw;
    width: 2.441vw;
  }

  ${media.mobile} {
    height: 5.208vw;
    width: 5.208vw;
  }
`;

const ItemHeader = styled.div`
  cursor: pointer;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ContentWrapper = styled.div`
  height: 0;
  overflow: hidden;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5vw 0;
  border-top: 0.063vw solid ${colors.txtSubtle};

  &:last-child {
    border-bottom: 0.063vw solid ${colors.txtSubtle};
  }

  ${media.fullWidth} {
    padding: 24px 0;
    border-top: 1px solid ${colors.txtSubtle};

    &:last-child {
      border-bottom: 1px solid ${colors.txtSubtle};
    }
  }

  ${media.tablet} {
    padding: 2.344vw 0;
    border-top: 0.098vw solid ${colors.txtSubtle};

    &:last-child {
      border-bottom: 0.098vw solid ${colors.txtSubtle};
    }
  }

  ${media.mobile} {
    padding: 5vw 0;
    border-top: 0.208vw solid ${colors.txtSubtle};

    &:last-child {
      border-bottom: 0.208vw solid ${colors.txtSubtle};
    }
  }
`;

export default AccordionItem;
