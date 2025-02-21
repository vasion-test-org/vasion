import { render, MARK_STYLED, NODE_HEADING, NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import Header from '@/components/copyComponents/Header';
import BodyCopy from '@/components/copyComponents/BodyCopy';
import Eyebrow from '@/components/copyComponents/Eyebrow';
import useMedia from '@/functions/useMedia';

const RichTextRenderer = ({ document, centered, responsiveTextStyles = [] }) => {
  if (!document) return null;

  // Extract the default heading from the document content
  const defaultHeader = document.content?.find((item) => item.type === 'heading') || null;
  const defaultHeaderContent = defaultHeader?.content || null;
  const defaultHeaderLevel = defaultHeader?.attrs?.level || 1;

  // Determine responsive text styles for headers
  const tabletStyle = responsiveTextStyles[0] || `h${defaultHeaderLevel}`;
  const mobileStyle = responsiveTextStyles[1] || tabletStyle;

  // Use useMedia to dynamically switch header style
  const selectedHeaderStyle = useMedia(`h${defaultHeaderLevel}`, tabletStyle, mobileStyle);

  // Extract default body copy class and responsive styles
  const defaultBodyClass =
    document.content?.find((item) => item.type === 'paragraph')?.content?.[0]?.marks?.find((mark) => mark.type === 'styled')?.attrs?.class || '';

  // Get body copy responsive styles
  const tabletBodyClass = responsiveTextStyles[0] || defaultBodyClass;
  const mobileBodyClass = responsiveTextStyles[1] || tabletBodyClass;

  // Use useMedia to dynamically switch body copy class
  const selectedBodyClass = useMedia(defaultBodyClass, tabletBodyClass, mobileBodyClass);

  console.log("Responsive Text Styles:", responsiveTextStyles);
  console.log("Selected Header Style:", selectedHeaderStyle);
  console.log("Selected Body Class:", selectedBodyClass);

  // Function to extract text from structured content
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return '';
    return contentArray.map((node) => node.text || '').join(' ');
  };

  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      // Apply responsive class switching using useMedia
      const selectedClassName = useMedia(className, className, tabletBodyClass, mobileBodyClass);

      if (['eyebrow', 'tag', 'tagLight'].includes(className)) {
        return <Eyebrow className={className}>{children}</Eyebrow>;
      }
      return <BodyCopy className={selectedClassName}>{children}</BodyCopy>;
    },
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, { level }) => {
      const resolvedChildren = extractText(defaultHeaderContent) || children;
      return <Header as={selectedHeaderStyle}>{resolvedChildren}</Header>;
    },
    [NODE_PARAGRAPH]: (children, node) => {
      const className =
        node?.content?.[0]?.marks?.find((mark) => mark.type === 'styled')?.attrs?.class || '';

      // Apply responsive class switching
      const selectedClassName = useMedia(className, className, tabletBodyClass, mobileBodyClass);

      return <BodyCopy className={selectedClassName}>{children}</BodyCopy>;
    },
  };

  return <RichWrapper>{render(document, { markResolvers: customMarkResolvers, nodeResolvers: customNodeResolvers })}</RichWrapper>;
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
      background-image: url('images/icons/orange-check-icon.webp');
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
