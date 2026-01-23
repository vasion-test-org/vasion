'use client';
import React, { useRef, useEffect, useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';
import media from '@/styles/media';
import colors from '@/styles/colors';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const CompetitiveAnalysis = ({ blok }) => {
  console.log('blok data:', blok);

  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const scrollContainerRef = useRef(null);
  const firstColumnRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const extractTableData = () => {
    if (!blok.table || !blok.table.content || !blok.table.content[0]) {
      return [];
    }

    const tableNode = blok.table.content[0];
    if (tableNode.type !== 'table' || !tableNode.content) {
      return [];
    }

    return tableNode.content.map((row) => {
      if (row.type !== 'tableRow' || !row.content) {
        return [];
      }

      return row.content.map((cell) => {
        if (cell.type !== 'tableCell') {
          return null;
        }
        return cell.content || [];
      });
    });
  };

  const tableRows = extractTableData();
  console.log('Extracted table rows:', tableRows);

  const headerRow = tableRows[0] || [];
  const dataRows = tableRows.slice(1);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const syncRowHeights = () => {
      if (!firstColumnRef.current || !scrollContainerRef.current) return;

      const firstColumnCells =
        firstColumnRef.current.querySelectorAll('[data-row]');
      const scrollableCells =
        scrollContainerRef.current.querySelectorAll('[data-row]');

      const rowGroups = {};

      firstColumnCells.forEach((cell) => {
        const rowIndex = cell.getAttribute('data-row');
        if (!rowGroups[rowIndex]) rowGroups[rowIndex] = [];
        rowGroups[rowIndex].push(cell);
      });

      scrollableCells.forEach((cell) => {
        const rowIndex = cell.getAttribute('data-row');
        if (!rowGroups[rowIndex]) rowGroups[rowIndex] = [];
        rowGroups[rowIndex].push(cell);
      });

      Object.values(rowGroups).forEach((cells) => {
        cells.forEach((cell) => {
          cell.style.height = 'auto';
        });
      });

      Object.values(rowGroups).forEach((cells) => {
        const maxHeight = Math.max(...cells.map((cell) => cell.offsetHeight));
        cells.forEach((cell) => {
          cell.style.height = `${maxHeight}px`;
        });
      });
    };

    syncRowHeights();

    const resizeObserver = new ResizeObserver(syncRowHeights);
    const images = document.querySelectorAll('img');

    if (firstColumnRef.current) resizeObserver.observe(firstColumnRef.current);
    if (scrollContainerRef.current)
      resizeObserver.observe(scrollContainerRef.current);

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', syncRowHeights);
      }
    });

    return () => {
      resizeObserver.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', syncRowHeights);
      });
    };
  }, [tableRows, isMobile]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll);

    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const renderCellContent = (cellContent) => {
    if (!cellContent || cellContent.length === 0) {
      return null;
    }

    const richTextDoc = {
      type: 'doc',
      content: cellContent,
    };

    return <RichTextRenderer document={richTextDoc} />;
  };

  const renderDesktopTable = () => (
    <TableContainer>
      {/* Sticky First Column */}
      <FirstColumn ref={firstColumnRef}>
        <HeaderCell data-row="header">
          {renderCellContent(headerRow[0] || [])}
        </HeaderCell>
        {dataRows.map((row, index) => {
          const featureCellContent = row[0] || [];
          return (
            <FeatureCell key={index} data-row={index}>
              {renderCellContent(featureCellContent)}
            </FeatureCell>
          );
        })}
      </FirstColumn>

      {/* Scrollable Columns */}
      <ScrollContainer
        ref={scrollContainerRef}
        showLeftShadow={showLeftShadow}
        showRightShadow={showRightShadow}
      >
        <ScrollContent>
          {headerRow.slice(1).map((headerCellContent, colIndex) => (
            <Column key={colIndex}>
              <HeaderCell data-row="header">
                {renderCellContent(headerCellContent)}
              </HeaderCell>
              {dataRows.map((row, rowIndex) => {
                const cellContent = row[colIndex + 1] || [];
                return (
                  <DataCell key={rowIndex} data-row={rowIndex}>
                    {renderCellContent(cellContent)}
                  </DataCell>
                );
              })}
            </Column>
          ))}
        </ScrollContent>
      </ScrollContainer>
    </TableContainer>
  );

  const renderMobileTable = () => {
    // Products from header row (slice off the first cell which is empty/feature label)
    const products = headerRow.slice(1);
    // Features are the first cell of each data row
    const features = dataRows.map((row) => row[0]);

    return (
      <TableContainer>
        {/* Sticky First Column - now contains products going down */}
        <FirstColumn ref={firstColumnRef}>
          <HeaderCell data-row="header">{/* Empty corner cell */}</HeaderCell>
          {products.map((productCell, index) => (
            <FeatureCell key={index} data-row={index}>
              {renderCellContent(productCell)}
            </FeatureCell>
          ))}
        </FirstColumn>

        {/* Scrollable Columns - now each column is a feature going across */}
        <ScrollContainer
          ref={scrollContainerRef}
          showLeftShadow={showLeftShadow}
          showRightShadow={showRightShadow}
        >
          <ScrollContent>
            {features.map((featureCell, featureIndex) => (
              <Column key={featureIndex}>
                <HeaderCell data-row="header">
                  {renderCellContent(featureCell)}
                </HeaderCell>
                {products.map((_, productIndex) => {
                  // Get data from dataRows[featureIndex][productIndex + 1]
                  const cellContent =
                    dataRows[featureIndex][productIndex + 1] || [];
                  return (
                    <DataCell key={productIndex} data-row={productIndex}>
                      {renderCellContent(cellContent)}
                    </DataCell>
                  );
                })}
              </Column>
            ))}
          </ScrollContent>
        </ScrollContainer>
      </TableContainer>
    );
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <TableWrapper
        data-anchor-id={blok.anchor_id}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        {isMobile ? renderMobileTable() : renderDesktopTable()}
        {blok.footnote && <Footnote>{blok.footnote}</Footnote>}
      </TableWrapper>
    </ThemeProvider>
  );
};

export default CompetitiveAnalysis;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 4px;
  }

  ${(props) =>
    props.showLeftShadow &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(to right, rgba(0,0,0,0.1), transparent);
      pointer-events: none;
      z-index: 1;
    }
  `}

  ${(props) =>
    props.showRightShadow &&
    `
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(to left, rgba(0,0,0,0.1), transparent);
      pointer-events: none;
      z-index: 1;
    }
  `}
`;

const ScrollContent = styled.div`
  display: flex;
  min-width: min-content;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 10.417vw;
  border-right: 1px solid #e5e7eb;
  &:first-child {
    background: #f9fafb;
  }

  &:last-child {
    border-right: none;
  }

  ${media.fullWidth} {
    min-width: 167px;
  }

  ${media.tablet} {
    min-width: 16.276vw;
  }

  ${media.mobile} {
    min-width: 38vw;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5vw 5vw;
  border-bottom: 2px solid #e5e7eb;
  background: transparent;
  font-weight: 600;
  ${media.fullWidth} {
    padding: 24px 80px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
  }

  p {
    text-align: center;
    margin: 0;
  }

  img {
    width: 9.875vw;
    height: 2.5vw;
    height: auto;
    display: block;

    ${media.fullWidth} {
      width: 158px;
    }
    ${media.tablet} {
      width: 15.43vw;
    }
    ${media.mobile} {
      width: 32.917vw;
    }
  }
`;

const FeatureCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25vw 1vw;
  border-bottom: 1px solid #e5e7eb;
  ${text.bodyLgBold};
  &:last-child {
    border-bottom: none;
  }

  ${media.fullWidth} {
    padding: 20px 16px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
    max-width: 160px;
  }
  a {
    color: ${colors.txtPrimary};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryOrange};
    }

    &:visited {
      color: ${colors.darkOrange};
    }
  }
  p {
    margin: 0;
  }
`;

const DataCell = styled.div`
  ${text.bodyMd};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25vw 1vw;
  border-bottom: 1px solid #e5e7eb;
  max-width: 19.875vw;
  &:last-child {
    border-bottom: none;
  }

  ${media.fullWidth} {
    padding: 20px 16px;
    max-width: 318px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
    max-width: 20.898vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
    max-width: 33.333vw;
  }

  p {
    text-align: center;
    margin: 0;
  }

  img {
    padding: 0.25vw;
    display: flex;
    justify-self: center;
    width: 1.75vw;
    height: auto;

    ${media.fullWidth} {
      width: 28px;
      padding: 4px;
    }
    ${media.tablet} {
      width: 2.734vw;
      padding: 0.391vw;
    }
    ${media.mobile} {
      width: 5.833vw;
      padding: 0.833vw;
    }
  }
`;

const Footnote = styled.p`
  margin-top: 1.25vw;
  color: #6b7280;
  font-style: italic;

  ${media.fullWidth} {
    margin-top: 20px;
    font-size: 12px;
  }

  ${media.tablet} {
    margin-top: 1.953vw;
    font-size: 1.172vw;
  }

  ${media.mobile} {
    margin-top: 4.167vw;
    font-size: 2.5vw;
  }
`;

const TableContainer = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 0.5vw;
  overflow: hidden;
  background: white;
  max-width: 81.5vw;

  ${media.fullWidth} {
    border-radius: 8px;
    max-width: 1304px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
    max-width: 92.188vw;
  }

  ${media.mobile} {
    border-radius: 1.667vw;
    width: 89.167vw;
  }
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e5e7eb;
  flex-shrink: 0;
  z-index: 2;
`;

const TableWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
          ? `${props.spacing}px 0 0`
          : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
        ? `${props.spacing}px 0`
        : '3.75vw 0';
  }};

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '60px 0';
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '5.859vw 0';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '12.5vw 0';
    }};
  }
`;
