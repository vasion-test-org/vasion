"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import AccordionItem from "@/components/globalComponents/AccordionItem";

const Accordion = ({ accordionData }) => {
  // console.log(accordionData)

  useEffect(() => {
    const initAccordion = async () => {
      const { default: gsap } = await import('gsap');

      const accordionItems = gsap.utils.toArray(".accordionItem");

      accordionItems.forEach((item) => {
        const tl = gsap.timeline({ paused: true, reversed: true });
        tl.to(item, {
          height: "auto",
          duration: 0.3,
          ease: "power2.inOut",
        });

        item.addEventListener("click", function () {
          if (tl.reversed()) {
            tl.play();
          } else {
            tl.reverse();
          }
        });
      });
    };

    initAccordion();
  }, []);

  return (
    <AccordionContainer>
      {accordionData.map((accordionItem, index) => (
        <AccordionItem
          key={`accordion-${index}`}
          accordionItem={accordionItem}
        />
      ))}
    </AccordionContainer>
  );
};

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
  }

  ${media.tablet} {
    width: 90.234vw;
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;
export default Accordion;

