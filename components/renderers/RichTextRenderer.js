"use client";
import {
  render,
  MARK_STYLED,
  NODE_HEADING,
  NODE_PARAGRAPH,
} from "storyblok-rich-text-react-renderer";
import React from "react";
import styled from "styled-components";
import media from "@/styles/media";
import Header from "@/components/copyComponents/Header";
import BodyCopy from "@/components/copyComponents/BodyCopy";
import Eyebrow from "@/components/copyComponents/Eyebrow";
import useMedia from "@/functions/useMedia";
import CTA from "@/components/CTA";
import SmallQuote from "../SmallQuote";
import LogoCube from "../LogoCube";
import SideBySide from "../SideBySide";
import CenteredSection from "../CenteredSection";
import NumberBlock from "../NumberBlock";

const RichTextRenderer = ({ document, responsiveTextStyles = [], blok }) => {
  if (!document) return null;
  // console.log(blok)
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return "";
    return contentArray.map((node) => node.text || "").join(" ");
  };

  // console.log(document)
  const blokResolvers = {
    cta: (props) => (
      <div className="component-wrapper">
        <CTA blok={props} />
      </div>
    ),
    small_quote: (props) => (
      <div className="component-wrapper">
        <SmallQuote blok={props} />
      </div>
    ),
    logo_cube: (props) => (
      <div className="component-wrapper">
        <LogoCube blok={props} />
      </div>
    ),
    side_by_side: (props) => (
      <div className="component-wrapper">
        <SideBySide blok={props} />
      </div>
    ),
    centered_section: (props) => (
      <div className="component-wrapper">
        <CenteredSection blok={props} />
      </div>
    ),
    number_block: (props) => (
      <div className="component-wrapper">
        <NumberBlock blok={props} />
      </div>
    ),
  };

  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, node) => {
      const level = node?.level || 1; // Get the actual heading level
      const headingText = extractText(node.content) || children;

      // Apply useMedia inside the node resolver
      const tabletStyle = responsiveTextStyles[0] || `h${level}`;
      const mobileStyle = responsiveTextStyles[1] || tabletStyle;
      const selectedHeaderStyle = useMedia(
        `h${level}`,
        `h${level}`,
        tabletStyle,
        mobileStyle,
      );
      // console.log(node, "headerStyle");
      return <Header as={selectedHeaderStyle}>{headingText}</Header>;
    },

    [NODE_PARAGRAPH]: (children, node) => {
      const className =
        node?.content?.[0]?.marks?.find((mark) => mark.type === "styled")?.attrs
          ?.class || "";

      const selectedClassName = useMedia(
        className,
        className,
        responsiveTextStyles[0],
        responsiveTextStyles[1],
      );

      return <BodyCopy className={selectedClassName}>{children}</BodyCopy>;
    },
  };

  return (
    <RichWrapper>
      {render(document, {
        blokResolvers,
        markResolvers: customMarkResolvers,
        nodeResolvers: customNodeResolvers,
      })}
    </RichWrapper>
  );
};

const RichWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;
    margin-left: 0;

    li {
      position: relative;
      padding-left: 1.563vw;
      margin-bottom: 1.25vw;
      ${media.fullWidth} {
        padding-left: 25px;
        margin-bottom: 20px;
      }
      ${media.tablet} {
        padding-left: 2.441vw;
        margin-bottom: 1.953vw;
      }
      ${media.mobile} {
        padding-left: 5.208vw;
        margin-bottom: 4.167vw;
      }
    }
    li::before {
      content: "";
      position: absolute;
      background-image: url("/images/icons/orange-check-icon.webp");
      background-size: contain;
      background-repeat: no-repeat;
      left: 0;
      top: 0;
      width: 1.25vw;
      height: 1.25vw;
      ${media.fullWidth} {
        width: 20px;
        height: 20px;
      }
      ${media.tablet} {
        width: 1.953vw;
        height: 1.953vw;
      }
      ${media.mobile} {
        width: 4.167vw;
        height: 4.167vw;
      }
    }
  }
`;

export default RichTextRenderer;
