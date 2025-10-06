'use client';
import {
  render,
  MARK_STYLED,
  NODE_HEADING,
  NODE_PARAGRAPH,
} from 'storyblok-rich-text-react-renderer';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import Header from '@/components/copyComponents/Header';
import BodyCopy from '@/components/copyComponents/BodyCopy';
import Eyebrow from '@/components/copyComponents/Eyebrow';
import useMedia from '@/functions/useMedia';
import CTA from '@/components/CTA';
import SmallQuote from '../SmallQuote';
import LogoCube from '../LogoCube';
import SideBySide from '../SideBySide';
import CenteredSection from '../CenteredSection';
import NumberBlock from '../NumberBlock';
import TwoColumnList from '@/components/TwoColumnList';
import colors from '@/styles/colors';
import text from '@/styles/text';
import GradientText from '@/components/globalComponents/GradientText';
import ResourceCta from '@/components/ResourceCta';
import ResourceInlineQuote from '@/components/ResourceInlineQuote';
import ResourceAuthor from '@/components/ResourceAuthor';
import ResourceArticle from '@/components/ResourceArticle';

const RichTextRenderer = ({
  document,
  responsiveTextStyles = [],
  blok,
  gradientText,
}) => {
  if (!document) return null;
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return '';
    return contentArray.map((node) => node.text || '').join(' ');
  };
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
    resource_cta: (props) => (
      <div className="component-wrapper">
        <ResourceCta blok={props} />
      </div>
    ),
    resource_inline_quote: (props) => (
      <div className="component-wrapper">
        <ResourceInlineQuote blok={props} />
      </div>
    ),
    resource_author: (props) => (
      <div className="component-wrapper">
        <ResourceAuthor blok={props} />
      </div>
    ),
    resource_article: (props) => (
      <div className="component-wrapper">
        <ResourceArticle blok={props} />
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

      const headerContent = (
        <Header as={selectedHeaderStyle} className={selectedHeaderStyle}>
          {headingText}
        </Header>
      );

      return gradientText ? (
        <GradientText>{headerContent}</GradientText>
      ) : (
        headerContent
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
  gap: 1.25vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
  }
  a {
    color: ${colors.primaryOrange};
  }
  img {
    padding: 1.25vw 0;
    max-width: 100%;

    ${media.fullWidth} {
      padding: 20px 0;
    }

    ${media.tablet} {
      padding: 1.953vw 0;
    }

    ${media.mobile} {
      padding: 4.167vw 0;
    }
  }

  ol {
    position: relative;
    list-style: none;
    counter-reset: list-number;
    margin-left: 3.472vw;
    /* margin-top: 2.5vw; */
    margin-bottom: 2.5vw;

    ${media.fullWidth} {
      margin-left: 50px;
      /* margin-top: 40px; */
      margin-bottom: 40px;
    }

    ${media.tablet} {
      margin-left: 4.883vw;
      /* margin-top: 3.906vw; */
      margin-bottom: 3.906vw;
    }

    ${media.mobile} {
      margin-left: 11.682vw;
      /* margin-top: 9.346vw; */
      margin-bottom: 9.346vw;
    }
    li:last-child {
      margin-bottom: 0;
    }
    li {
      /* min-height: 2.5vw; */
      margin-bottom: 1.667vw;

      ${media.fullWidth} {
        /* min-height: 36px; */
        margin-bottom: 24px;
      }

      ${media.tablet} {
        /* min-height: 3.516vw; */
        margin-bottom: 2.344vw;
      }

      ${media.mobile} {
        /* min-height: 8.411vw; */
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
    display: flex;
    flex-direction: column;

    li {
      position: relative;
    }

    li:before {
      background-image: unset;
      content: '';
      position: absolute;
      left: -1vw;
      top: 0.4vw;
      width: 0.35vw;
      height: 0.35vw;
      border-radius: 50%;
      background: ${colors.txtPrimary};

      ${media.fullWidth} {
        left: -16px;
        top: 6px;
        width: 6px;
        height: 6px;
      }

      ${media.tablet} {
        left: -1.563vw;
        top: 0.586vw;
        width: 0.586vw;
        height: 0.586vw;
      }

      ${media.mobile} {
        left: -3.333vw;
        top: 1.25vw;
        width: 1.25vw;
        height: 1.25vw;
      }
    }
  }
`;

export default RichTextRenderer;
