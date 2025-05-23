"use client";
import React from "react";

import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import text from "@/styles/text";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";

const NumberBlock = ({ blok }) => {
  // console.log(blok)
  return (
    <NumberBlockContainer {...storyblokEditable(blok.header[0])}>
      <NumberBlockDiv bg={blok.block_color.value} color={blok.text_color.value}>
        {blok.number}
      </NumberBlockDiv>
      <RichTextRenderer
        key={`copy-`}
        document={blok.header[0].copy}
        blok={blok}
      />
    </NumberBlockContainer>
  );
};

const NumberBlockDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color ? `${props.color}` : "unset")};
  background: ${(props) => (props.bg ? `${props.bg}` : "unset")};
  width: 4.5vw;
  height: 4.5vw;
  border-radius: 0.5vw;

  ${media.fullWidth} {
    width: 72px;
    height: 72px;
    border-radius: 8px;
  }

  ${media.tablet} {
    width: 7.031vw;
    height: 7.031vw;
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    width: 15vw;
    height: 15vw;
    border-radius: 1.667vw;
  }
`;
const NumberBlockContainer = styled.div`
  ${text.h3};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw;
  padding: 1.875vw 0;

  ${media.fullWidth} {
    gap: 32px;
    padding: 30px 0;
  }

  ${media.tablet} {
    gap: 3.125vw;
    padding: 2.93vw 0;
  }

  ${media.mobile} {
    gap: 6.667vw;
    padding: 6.25vw 0;
  }
`;
export default NumberBlock;

