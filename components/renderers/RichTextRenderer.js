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
import TwoColumnList from "@/components/TwoColumnList";
import colors from "@/styles/colors";
import text from "@/styles/text";

const RichTextRenderer = ({ document, responsiveTextStyles = [], blok }) => {
  if (!document) return null;
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return "";
    return contentArray.map((node) => node.text || "").join(" ");
  };

  // console.log(responsiveTextStyles[1])
  const blokResolvers = {
    two_column_list: (props) => (
      <div className="component-wrapper">
        <TwoColumnList blok={props} />
      </div>
    ),
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
    infographic_pill: (props) => (
      <div className="component-wrapper">
        <InfographicPill blok={props} />
      </div>
    ),
  };

  const customMarkResolvers = {
    // [MARK_STYLED]: (children, { class: className }) => {
    //   console.log('span class', className)
    //   return <BodyCopy className={className}>{children}</BodyCopy>;
    // },
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, node) => {
      const level = node?.level || 1;
      const headingText = extractText(node.content) || children;

      const tabletStyle = responsiveTextStyles[0] || `h${level}`;
      const mobileStyle = responsiveTextStyles[1] || tabletStyle;
      const selectedHeaderStyle = useMedia(
        `h${level}`,
        `h${level}`,
        tabletStyle,
        mobileStyle,
      );

      return (
        <Header as={selectedHeaderStyle} className={selectedHeaderStyle}>
          {headingText}
        </Header>
      );
    },

    [NODE_PARAGRAPH]: (children) => {
      const className = children?.[0]?.props?.className;

      const selectedClassName = useMedia(
        className,
        className,
        responsiveTextStyles[0],
        responsiveTextStyles[1],
      );
      // console.log('selectedClassName', selectedClassName)
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
  gap: 0.625vw;

  ${media.fullWidth} {
    gap: 10px;
  }

  ${media.tablet} {
    gap: 0.977vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
  }
  a {
    color: ${colors.primaryOrange};
  }
  img {
    max-width: 56.25vw ${media.fullWidth} {
      max-width: 900px;
    }

    ${media.tablet} {
      max-width: 58.594vw;
    }

    ${media.mobile} {
      max-width: 82vw;
    }
  }

  ol {
    position: relative;
    list-style: none;
    counter-reset: list-number;
    margin-left: 3.472vw;
    margin-top: 2.5vw;
    margin-bottom: 2.5vw;

    ${media.fullWidth} {
      margin-left: 50px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    ${media.tablet} {
      margin-left: 4.883vw;
      margin-top: 3.906vw;
      margin-bottom: 3.906vw;
    }

    ${media.mobile} {
      margin-left: 11.682vw;
      margin-top: 9.346vw;
      margin-bottom: 9.346vw;
    }
    li:last-child {
      margin-bottom: 0;
    }
    li {
      min-height: 2.5vw;
      margin-bottom: 1.667vw;

      ${media.fullWidth} {
        min-height: 36px;
        margin-bottom: 24px;
      }

      ${media.tablet} {
        min-height: 3.516vw;
        margin-bottom: 2.344vw;
      }

      ${media.mobile} {
        min-height: 8.411vw;
        margin-bottom: 5.607vw;
      }
    }

    li::before {
      ${text.bodyMdBold}
      position: absolute;
      left: -4vw;
      content: counter(list-number);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      color: ${colors.primaryOrange};
      margin-right: 0.694vw;
      width: 1.667vw;
      height: 1.667vw;
      font-size: 1.25vw;
      border: 0.2vw solid ${colors.primaryOrange};

      ${media.fullWidth} {
        left: -58px;
        margin-right: 10px;
        width: 36px;
        height: 36px;
        font-size: 18px;
        border: 3px solid ${colors.primaryOrange};
      }

      ${media.tablet} {
        left: -5vw;
        margin-right: 0.977vw;
        width: 3.516vw;
        height: 3.516vw;
        font-size: 1.758vw;
        border: 0.293vw solid ${colors.primaryOrange};
      }

      ${media.mobile} {
        left: -11vw;
        margin-right: 2.336vw;
        width: 8.411vw;
        height: 8.411vw;
        font-size: 4.206vw;
        border: 0.701vw solid ${colors.primaryOrange};
      }
    }

    li {
      counter-increment: list-number;
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
