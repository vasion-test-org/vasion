'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import text from '@/styles/text';
import Tools from '@/assets/svg/tools.svg';

const TableOfContent = ({ copy, toc }) => {
  const [isCopied, setIsCopied] = useState(false);

  // Extract headers from the copy document
  const extractHeaders = (document) => {
    if (!document || !document.content) return [];

    const headers = [];

    const processNode = (node) => {
      if (node.type === 'heading') {
        const level = node.level || 1;
        const text = node.content
          ? node.content
              .map(
                (item) =>
                  (item && typeof item === 'object' ? item.text : '') || ''
              )
              .join('')
          : '';

        // Check if any content within the heading has the "ignore" class
        const hasIgnoreClass =
          node.content &&
          node.content.some(
            (item) =>
              item &&
              typeof item === 'object' &&
              item.marks &&
              item.marks.some(
                (mark) =>
                  mark &&
                  mark.type === 'styled' &&
                  mark.attrs &&
                  mark.attrs.class &&
                  mark.attrs.class.includes('ignore')
              )
          );

        if (
          text &&
          typeof text === 'string' &&
          text.trim() &&
          !hasIgnoreClass
        ) {
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .trim();

          headers.push({
            id,
            text: text.trim(),
            level,
          });
        }
      }

      // Process nested content
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(processNode);
      }
    };

    document.content.forEach(processNode);
    return headers;
  };

  const headers = useMemo(() => extractHeaders(copy), [copy]);

  const scrollToHeader = (headerId) => {
    const element = document.getElementById(headerId);
    if (!element) return;

    // Native smooth scroll to the target element
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } catch {
      // Fallback for older browsers
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({ top: rect.top + scrollTop, behavior: 'smooth' });
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      // Reset the text back to "Copy blog link" after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  // const themes = useAvailableThemes();
  // const selectedTheme = themes[blok.theme] || themes.default;
  return (
    // <ThemeProvider theme={selectedTheme}>
    <Wrapper toc={toc}>
      <TOCContainer>
        <TOCHeader>Table of Contents</TOCHeader>
        <TOCList>
          {headers?.length > 0 ? (
            headers.map((header, index) => (
              <TOCItem key={index} level={header.level}>
                <TOCItemLink
                  href={`#${header.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeader(header.id);
                  }}
                >
                  <TOCItemLinkText level={header.level}>
                    {header.text}
                  </TOCItemLinkText>
                </TOCItemLink>
              </TOCItem>
            ))
          ) : (
            <TOCItem>
              <TOCItemLinkText>No headers found</TOCItemLinkText>
            </TOCItem>
          )}
        </TOCList>
      </TOCContainer>
      <BlogLink onClick={copyUrlToClipboard}>
        <Tools />
        {isCopied ? 'Link copied!' : 'Copy blog link'}
      </BlogLink>
    </Wrapper>
    // </ThemeProvider>
  );
};
const TOCList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  list-style: none;
  gap: 0.5vw;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const TOCItem = styled.li`
  ${text.bodyLg};
  color: ${colors.grey600};
  width: 100%;
`;
const TOCItemLink = styled.a`
  ${text.bodyLg};
  color: ${colors.txtSubtle};
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 0.375vw 0.75vw;
  border-radius: 0.5vw;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.txtPrimary};
    background-color: ${colors.purple100};
  }
`;
const TOCItemLinkText = styled.p`
  ${text.bodySm};
  color: inherit;
  margin: 0;
  font-size: ${(props) => (props.level > 2 ? '0.9em' : '1em')};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;
const BlogLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 0.5vw;
  ${text.bodySm};
  color: ${colors.txtSubtle};
  margin-top: 1.25vw;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primaryOrange};

    svg {
      path {
        fill: ${colors.primaryOrange};
      }
    }
  }
`;

const TOCHeader = styled.p`
  ${text.eyebrow}
  color: ${colors.txtSubtle};
  border-bottom: 1px solid ${colors.ghostGrey};
  padding-bottom: 0.75vw;
  margin-bottom: 0.75vw;
`;

const TOCContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${colors.lightPurpleGrey};
  width: 15.7vw;
  padding: 1vw;
  border-radius: 0.5vw;

  ${media.fullWidth} {
    width: 240px;
    border-radius: 8px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    border-radius: 1.667vw;
  }
`;

const Wrapper = styled.div`
  display: ${(props) => (props.toc ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 2.5vw;
  align-self: flex-start;
  padding: 5.5vw 0;

  ${media.fullWidth} {
    top: 40px;
  }

  ${media.tablet} {
    /* top: 3.906vw; */
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

export default TableOfContent;
