"use client";
import React from "react";

import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import text from "@/styles/text";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "@/styles/colors";
import Button from "@/components/globalComponents/Button";
const StatItem = ({ statItem }) => {
  return (
    <StatContainer {...storyblokEditable(statItem)}>
      <Stat>{statItem.stat}</Stat>
      <RichTextRenderer document={statItem.copy[0].copy} />
      {statItem.link[0] && (
        <Button
          key={statItem.link[0].link_text}
          $buttonData={statItem.link[0]}
        />
      )}
    </StatContainer>
  );
};

const Stat = styled.p`
  ${text.stat};
  color: ${colors.primaryOrange};
`;
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 14.563vw;
  gap: 1.5vw;

  ${media.fullWidth} {
    width: 394px;
    width: 233px;
    gap: 24px;
  }

  ${media.tablet} {
    width: 13.965vw;
  }

  ${media.mobile} {
    width: 66.667vw;
  }
`;
export default StatItem;
