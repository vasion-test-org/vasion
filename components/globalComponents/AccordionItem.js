"use client";
import React from "react";
import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "@/styles/colors";
import gsap from "gsap";
import DownChevron from "@/assets/svg/ChevronDown.svg";

const AccordionItem = ({ accordionItem }) => {
  return (
    <Item className="accordionItem">
      {accordionItem.copy_blocks.map((copy, index) => (
        <div key={copy.component} {...storyblokEditable(copy)}>
          <RichTextRenderer className={copy.component} document={copy.copy} />
          <Chevron src={DownChevron} alt={"down-chevron"} />

          {/* {index === 0 && <DownChevron />} */}
        </div>
      ))}
    </Item>
  );
};
const Chevron = styled(DownChevron)`
  height: 25px;
  width: 25px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1.5vw;
  padding: 1.5vw 0;
  border-top: 0.063vw solid ${colors.txtSubtle};
  height: 4.688vw;

  &:last-child {
    border-bottom: 0.063vw solid ${colors.txtSubtle};
  }

  ${media.fullWidth} {
    gap: 24px;
    padding: 24px 0;
    border-top: 1px solid ${colors.txtSubtle};
    height: 75px;
  }

  ${media.tablet} {
    gap: 2.344vw;
    padding: 2.344vw 0;
    border-top: 0.098vw solid ${colors.txtSubtle};
    height: 7.324vw;
  }

  ${media.mobile} {
    gap: 5vw;
    padding: 5vw 0;
    border-top: 0.208vw solid ${colors.txtSubtle};
    height: 15.625vw;
  }
`;
export default AccordionItem;
