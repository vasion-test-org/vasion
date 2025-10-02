'use client';
import React, { useMemo, useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import ResourcesTOC from '@/components/ResourcesTOC';

const ResourcesLongForm = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  // Extract headers and their IDs from the copy document
  const extractHeaderData = (document) => {
    const headers = [];

    if (!document || !document.content) return headers;

    const processNode = (node) => {
      if (node.type === 'heading') {
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
            text: text.trim(),
            id: id,
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

  const headers = useMemo(() => extractHeaderData(blok.copy), [blok.copy]);

  // Add IDs to header elements after render
  useEffect(() => {
    const addIdsToHeaders = () => {
      headers.forEach((header) => {
        // Find header element by text content
        const headerElements = Array.from(
          document.querySelectorAll(
            '#resources-long-form h1, #resources-long-form h2, #resources-long-form h3, #resources-long-form h4, #resources-long-form h5'
          )
        );

        headerElements.forEach((element) => {
          if (element.textContent.trim() === header.text && !element.id) {
            element.id = header.id;
          }
        });
      });
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(addIdsToHeaders, 100);

    return () => clearTimeout(timer);
  }, [headers]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper toc={blok.table_of_contents}>
        <ResourcesLongFormContainer id="resources-long-form">
          <RichTextRenderer
            key={`copy-`}
            document={blok.copy}
            blok={blok}
            responsiveTextStyles={blok?.responsive_text_styles}
          />
        </ResourcesLongFormContainer>
        <ResourcesTOC copy={blok.copy} toc={blok.table_of_contents} />
      </Wrapper>
    </ThemeProvider>
  );
};

const ResourcesLongFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46.875vw;
  margin: 2.5vw 0;

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: -0.625vw;
  }

  img {
    border-radius: 24px;
  }

  div:empty {
    height: 1.25vw;

    ${media.fullWidth} {
      height: 20px;
    }

    ${media.tablet} {
      height: 1.953vw;
    }

    ${media.mobile} {
      height: 4.167vw;
    }
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.toc ? 'left' : 'center')};
  justify-self: center;
  height: auto;
  width: 63.125vw;

  ${media.fullWidth} {
    width: 1010px;
  }

  ${media.tablet} {
    width: 92.188vw;
    justify-content: center;
  }

  ${media.mobile} {
    justify-content: center;
    width: unset;
  }
`;
export default ResourcesLongForm;
