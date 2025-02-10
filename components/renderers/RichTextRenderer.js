import { render, MARK_STYLED, MARK_BOLD, NODE_HEADING, NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';
import Header from '@/components/copyComponents/Header';
import BodyCopy from '@/components/copyComponents/BodyCopy';
import Eyebrow from '@/components/copyComponents/Eyebrow';
import useMedia from '@/functions/useMedia'; // Import your media hook

const RichTextRenderer = ({ document, centered }) => {
  if (!document) return null;

  // console.log("Incoming Document:", document);

  // Extract the default heading from the document content
  const defaultHeader = document.content?.find((item) => item.type === 'heading') || null;
  const defaultHeaderContent = defaultHeader?.content || null;
  const defaultHeaderLevel = defaultHeader?.attrs?.level || 1;

  // Extract tablet & mobile headers from the blok
  const headerBlok = document.content?.find((item) => item.type === 'blok');
  const tabletHeader = headerBlok?.attrs?.body?.find((blok) => blok.component === 'tablet_header')?.copy?.content?.[0] || null;
  const mobileHeader = headerBlok?.attrs?.body?.find((blok) => blok.component === 'mobile_header')?.copy?.content?.[0] || null;

  const tabletHeaderContent = tabletHeader?.content || null;
  const tabletHeaderLevel = tabletHeader?.attrs?.level || defaultHeaderLevel;

  const mobileHeaderContent = mobileHeader?.content || null;
  const mobileHeaderLevel = mobileHeader?.attrs?.level || defaultHeaderLevel;

  // console.log("Default Header:", defaultHeaderContent, "Level:", defaultHeaderLevel);
  // console.log("Tablet Header:", tabletHeaderContent, "Level:", tabletHeaderLevel);
  // console.log("Mobile Header:", mobileHeaderContent, "Level:", mobileHeaderLevel);

  // Use useMedia to dynamically switch header content and level
  const selectedHeaderContent = useMedia(defaultHeaderContent, defaultHeaderContent, tabletHeaderContent || defaultHeaderContent, mobileHeaderContent || defaultHeaderContent);
  const selectedHeaderLevel = useMedia(defaultHeaderLevel, defaultHeaderLevel, tabletHeaderLevel || defaultHeaderLevel, mobileHeaderLevel || defaultHeaderLevel);

  // console.log("Selected Header Content:", selectedHeaderContent, "Level:", selectedHeaderLevel);

  // Function to extract text from structured content
  const extractText = (contentArray) => {
    if (!Array.isArray(contentArray)) return '';
    return contentArray.map((node) => node.text || '').join(' ');
  };

  const customMarkResolvers = {
    [MARK_STYLED]: (children, { class: className }) => {
      if (['eyebrow', 'tag', 'tagLight'].includes(className)) {
        return <Eyebrow className={className}>{children}</Eyebrow>;
      }
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
    [MARK_BOLD]: (children) => <strong>{children}</strong>,
  };

  const customNodeResolvers = {
    [NODE_HEADING]: (children, { level }) => {
      // Use dynamically selected level and content
      const resolvedChildren = extractText(selectedHeaderContent) || children;
      return <Header as={`h${selectedHeaderLevel}`}>{resolvedChildren}</Header>;
    },
    [NODE_PARAGRAPH]: (children, node) => {
      const className =
        node?.content?.[0]?.marks?.find((mark) => mark.type === 'styled')?.attrs?.class || '';
      if (['eyebrow', 'tag', 'tagLight'].includes(className)) {
        return <Eyebrow className={className}>{children}</Eyebrow>;
      }
      return <BodyCopy className={className}>{children}</BodyCopy>;
    },
  };

  return <div>{render(document, { markResolvers: customMarkResolvers, nodeResolvers: customNodeResolvers })}</div>;
};

export default RichTextRenderer;
