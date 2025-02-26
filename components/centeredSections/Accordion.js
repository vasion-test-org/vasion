'use client'
import React, {useEffect} from 'react';

import styled from 'styled-components';

import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import colors from '@/styles/colors';
import gsap from 'gsap'
import AccordionItem from '@/components/globalComponents/AccordionItem';

const Accordion = ({ accordionData }) => {
// console.log(accordionData)

useEffect(() => {
  const accordionItems = gsap.utils.toArray('.accordionItem');

  accordionItems.forEach((item) => {
    const tl = gsap.timeline({ paused: true, reversed: true });
    tl.to(item, {
      height: 'auto',
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

}, []);

return (
<AccordionContainer>
  {accordionData.map((accordionItem, index) => 
    <AccordionItem key={`accordion-${index}`} accordionItem={accordionItem} />
  )}
</AccordionContainer>
)
}

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
`
export default Accordion