"use client";
import React, { useEffect } from "react";
import AccordionItem from "@/components/globalComponents/AccordionItem";

const Accordion_tw = ({ accordionData }) => {
  useEffect(() => {
    const controllers = [];

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

        const clickHandler = () => {
          if (tl.reversed()) {
            tl.play();
          } else {
            tl.reverse();
          }
        };

        item.addEventListener("click", clickHandler);
        controllers.push({ item, clickHandler, timeline: tl });
      });
    };

    initAccordion();

    return () => {
      controllers.forEach(({ item, clickHandler, timeline }) => {
        item.removeEventListener("click", clickHandler);
        timeline.kill();
      });
    };
  }, []);

  return (
    <div className="flex flex-col w-[81.5vw] fullWidth:w-[1304px] tablet:w-[90.234vw] mobile:w-[89.167vw]">
      {accordionData.map((accordionItem, index) => (
        <AccordionItem
          key={accordionItem._uid || `accordion-${index}`}
          accordionItem={accordionItem}
        />
      ))}
    </div>
  );
};

export default Accordion_tw;

