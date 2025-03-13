'use client'
import { render, MARK_STYLED, NODE_HEADING, NODE_PARAGRAPH, NODE_BLK  } from 'storyblok-rich-text-react-renderer';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import Header from '@/components/copyComponents/Header';
import BodyCopy from '@/components/copyComponents/BodyCopy';
import Eyebrow from '@/components/copyComponents/Eyebrow';
import useMedia from '@/functions/useMedia';
import CTA from '@/components/CTA';
import Button from '../globalComponents/Button';
const RichTextRenderer = ({ document, centered, responsiveTextStyles = [] }) => {
  if (!document) return null;

  // Function to extract text from structured content
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return '';
    return contentArray.map((node) => node.text || '').join(' ');
  };

  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
  };

  const getBlok = (document) => {
    switch (document.component) {
      case 'global_link':
        return <Button/>;
      default:
        return document.component;
    }
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, node) => {
      const level = node?.level || 1; // Get the actual heading level
      const headingText = extractText(node.content) || children;
  
      // Apply useMedia inside the node resolver
      const tabletStyle = responsiveTextStyles[0] || `h${level}`;
      const mobileStyle = responsiveTextStyles[1] || tabletStyle;
      const selectedHeaderStyle = useMedia(`h${level}`, `h${level}`, tabletStyle, mobileStyle);
  // console.log(node, "headerStyle");
      return <Header as={selectedHeaderStyle}>{headingText}</Header>;
    },

    [NODE_PARAGRAPH]: (children, node) => {
      const className =
        node?.content?.[0]?.marks?.find((mark) => mark.type === 'styled')?.attrs?.class || '';

      const selectedClassName = useMedia(className, className, responsiveTextStyles[0], responsiveTextStyles[1]);

      return <BodyCopy className={selectedClassName}>{children}</BodyCopy>;
    },
    [NODE_BLK]: (node) => {
      if (!node?.attrs?.id) return null; // Skip if no valid blok ID

      switch (node.attrs.component) {
        case 'global_link':
          return <Button {...node.attrs} />;
        case 'cta':
          return <CTA {...node.attrs} />;
        default:
          return null; // Skip unknown bloks
      }
    }
  };

  return (
    <RichWrapper>
      {render(document, {
        markResolvers: customMarkResolvers,
        nodeResolvers: customNodeResolvers,
        blok: getBlok(document)
      })}
    </RichWrapper>
  );
};

const RichWrapper = styled.div`
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
      content: '';
      position: absolute;
      background-image: url('/images/icons/orange-check-icon.webp');
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
