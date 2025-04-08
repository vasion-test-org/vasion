"use client";
import React, { useEffect, useState } from "react";
import { useThankYou } from "@/context/ThankYouContext";
import styled from "styled-components";
import colors from "@/styles/colors";
import ComponentRenderer from "@/components/renderers/ComponentRenderer";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";

const ThankYou = () => {
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
  ];
  const { thankYouCopy } = useThankYou();

  // useEffect(() => {
  //   // console.log("Another Page - Thank You Copy:", thankYouCopy);
  // }, [thankYouCopy]);

  return (
    <Wrapper>
      <Content>
        {thankYouCopy?.map((item, index) => (
          <div key={`item.component_${index}`}>
            {copycomponents.includes(item.component) ? (
              <RichTextRenderer document={item.copy} blok={item} />
            ) : (
              <ComponentRenderer blok={item} />
            )}
          </div>
        ))}
      </Content>
    </Wrapper>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryPurple};
  color: ${colors.white};
  width: 100%;
  height: 100vh;
`;
export default ThankYou;
