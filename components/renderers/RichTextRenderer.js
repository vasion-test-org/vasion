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
import colors from "@/styles/colors";

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
 a {
  color: ${colors.primaryOrange};
 }
  img {
    max-width: 56.25vw

    ${media.fullWidth} {
      max-width: 900px
    }
    
    ${media.tablet} {
      max-width: 58.594vw
    }
    
    ${media.mobile} {
      max-width: 82vw
    }
  }

  &.eyebrow {
    font-weight: 700;
    font-size: 0.875vw;
    line-height: 1.125vw;
    letter-spacing: 0.175vw;
    text-transform: uppercase;

    ${media.fullWidth} {
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 3px;
  }

  ${media.tablet} {
    font-size: 1.367vw;
    line-height: 1.758vw;
  }

  ${media.mobile} {
    font-size: 2.804vw;
    line-height: 4.206vw;
  }
  }

  &.tag {
    font-weight: 600;
    font-size: 0.625vw;
    line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 10px;
      line-height: 12px;
  }

  ${media.tablet} {
    font-size: 0.977vw;
    line-height: 1.172vw;
  }

  ${media.mobile} {
    font-size: 2.336vw;
    line-height: 2.804vw;
  }
  }

  &.tagLight {
    font-weight: 400;
    font-size: 0.625vw;
      line-height: 0.75vw;

    ${media.fullWidth} {
      font-size: 10px;
      line-height: 12px;
  }

  ${media.tablet} {
    font-size: 0.977vw;
    line-height: 1.172vw;
  }

  ${media.mobile} {
    font-size: 2.336vw;
    line-height: 2.804vw;
  }
  }

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
