'use client';
import React, { useRef, useEffect, useContext } from 'react';
import { ScreenContext } from '@/components/providers/Screen';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';
import media from '@/styles/media';
import colors from '@/styles/colors';

const CompetitiveAnalysis = ({ blok }) => {
  // console.log('CompetitiveAnalysis', blok);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const scrollContainerRef = useRef(null);
  const firstColumnRef = useRef(null);
  const mobileScrollContainerRef = useRef(null);
  const mobileFirstColumnRef = useRef(null);

  const { mobile } = useContext(ScreenContext);

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
  const headerRow = tableRows[0] || [];
  const dataRows = tableRows.slice(1);
  const products = headerRow.slice(1);
  const features = dataRows.map((row) => row[0]);
  useEffect(() => {
    const syncRowHeights = () => {
      const firstColRef = mobile ? mobileFirstColumnRef : firstColumnRef;
      const scrollRef = mobile ? mobileScrollContainerRef : scrollContainerRef;

      if (!firstColRef.current || !scrollRef.current) return;

      const firstColumnCells =
        firstColRef.current.querySelectorAll('[data-row]');
      const scrollableCells = scrollRef.current.querySelectorAll('[data-row]');

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

    const firstColRef = mobile ? mobileFirstColumnRef : firstColumnRef;
    const scrollRef = mobile ? mobileScrollContainerRef : scrollContainerRef;

    // Scope image queries to only this component's refs
    const images = [
      ...(firstColRef.current?.querySelectorAll('img') || []),
      ...(scrollRef.current?.querySelectorAll('img') || []),
    ];

    if (firstColRef.current) resizeObserver.observe(firstColRef.current);
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);

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
  }, [tableRows, mobile]);

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

  return (
    <ThemeProvider theme={selectedTheme}>
      <TableWrapper
        data-anchor-id={blok.anchor_id}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        {/* Desktop table this is Hidden on mobile */}
        <DesktopTableWrapper>
          <TableContainer suppressHydrationWarning>
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

            <ScrollContainer ref={scrollContainerRef} suppressHydrationWarning>
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
        </DesktopTableWrapper>

        {/* Mobile table Hidden on desktop */}
        <MobileTableWrapper>
          <TableContainer suppressHydrationWarning>
            <FirstColumn ref={mobileFirstColumnRef}>
              <HeaderCell data-row="header">
                {/* Empty corner cell */}
              </HeaderCell>
              {products.map((productCell, index) => (
                <FeatureCell key={index} data-row={index}>
                  {renderCellContent(productCell)}
                </FeatureCell>
              ))}
            </FirstColumn>

            <ScrollContainer
              ref={mobileScrollContainerRef}
              suppressHydrationWarning={true}
            >
              <ScrollContent>
                {features.map((featureCell, featureIndex) => (
                  <Column key={featureIndex}>
                    <HeaderCell data-row="header">
                      {renderCellContent(featureCell)}
                    </HeaderCell>
                    {products.map((_, productIndex) => {
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
        </MobileTableWrapper>

        {blok.footnote && (
          <Footnote {...storyblokEditable(blok.footnote)}>
            <RichTextRenderer document={blok.footnote} />
          </Footnote>
        )}
      </TableWrapper>
    </ThemeProvider>
  );
};

export default CompetitiveAnalysis;

const DesktopTableWrapper = styled.div`
  display: block;

  ${media.mobile} {
    display: none;
  }
`;

const MobileTableWrapper = styled.div`
  display: none;

  ${media.mobile} {
    display: block;
  }
`;

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

    &:first-child {
      background: transparent;
    }
  }
`;
const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5vw 5vw;
  text-align: center;
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

  p,
  span {
    ${text.bodyMd};
    margin: 0;
    text-align: center;
  }

  a {
    ${text.bodyMd};
    margin: 0;
    text-align: center;
    color: ${colors.txtPrimary};
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryOrange};
    }

    &:visited {
      color: ${text.darkOrange};
    }
  }

  div,
  div[class*='BodyCopy'] {
    ${text.bodyMd};
  }

  img {
    display: block;
    width: 9.875vw;
    height: auto;

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
  ${text.bodyMd};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.25vw 1vw;
  border-bottom: 1px solid #e5e7eb;

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
    width: 33.333vw;
    &:nth-child(2) {
      background: ${colors.lightPurpleGrey};
    }
  }

  /* Force text sizing on all text elements overriding rich text*/
  p,
  span,
  b,
  a,
  div,
  div[class*='BodyCopy'] {
    ${text.bodyMdBold} !important;
    margin: 0;
    text-align: center;
  }

  /* Combined a styles */
  a {
    color: ${colors.txtPrimary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryOrange};
    }

    &:visited {
      color: ${colors.darkOrange};
    }
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
    max-width: unset;
    padding: 4.167vw 3.333vw;

    &[data-row='0'] {
      background: ${colors.lightPurpleGrey};
    }
  }

  /* Force text sizing on all text elements */
  p,
  span,
  a,
  div,
  div[class*='BodyCopy'] {
    ${text.bodyMd} !important;
    text-align: center;
    margin: 0;
  }

  /* Specifically target link styling */
  a {
    color: ${colors.txtPrimary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${colors.primaryOrange};
    }

    &:visited {
      color: ${colors.darkOrange};
    }
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
      width: 7.833vw;
      padding: 0.833vw;
    }
  }
`;

const Footnote = styled.div`
  color: ${colors.txtPrimary};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 1.25vw;
  color: #6b7280;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
    margin-top: 20px;
  }

  ${media.tablet} {
    ${text.bodyMd};
    margin-top: 1.953vw;
    width: 92.188vw;
  }

  ${media.mobile} {
    margin-top: 4.167vw;
    width: 89.167vw;
  }

  /* Override RichTextRenderer nested styles */
  .BodyCopy__StyledBodyCopy-sc-4fe6b91b-0,
  div[class*='BodyCopy__StyledBodyCopy'],
  div[class*='BodyCopy'] {
    ${text.bodyMd};
    position: relative;
    display: inline-block;
    gap: 0.5vw;

    ${media.fullWidth} {
      gap: 8px;
    }

    ${media.tablet} {
      gap: 0.6vw;
    }

    ${media.mobile} {
      gap: 1.5vw;
    }
  }

  /* Keep bold/strong text together - no breaks inside */
  .BodyCopy__StyledBodyCopy-sc-4fe6b91b-0 strong,
  .BodyCopy__StyledBodyCopy-sc-4fe6b91b-0 b,
  div[class*='BodyCopy__StyledBodyCopy'] strong,
  div[class*='BodyCopy__StyledBodyCopy'] b,
  div[class*='BodyCopy'] strong,
  div[class*='BodyCopy'] b {
    ${text.bodyMd}
    display: inline;
    font-weight: bold;
    white-space: nowrap;
  }

  /* Target images inside BodyCopy */
  .BodyCopy__StyledBodyCopy-sc-4fe6b91b-0 img,
  div[class*='BodyCopy__StyledBodyCopy'] img,
  div[class*='BodyCopy'] img {
    position: relative;
    width: 1.75vw;
    height: auto;
    flex-shrink: 0;
    padding: unset;
    top: 0.313vw;
    margin-right: 0.5vw;

    ${media.fullWidth} {
      width: 28px;
      top: 5px;
      margin-right: 15px;
    }

    ${media.tablet} {
      width: 2.734vw;
      top: 0.488vw;
      margin-right: 1.144vw;
    }

    ${media.mobile} {
      width: 5.833vw;
      top: 1.042vw;
      margin-right: 2vw;
    }
  }
`;

const TableContainer = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 0.5vw;
  overflow: hidden;
  background: transparent;
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
    max-width: unset;
    width: 89.167vw;
  }
`;
const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 0.208vw solid #e5e7eb;
  flex-shrink: 0;

  ${media.fullWidth} {
    border-right: 1px solid #e5e7eb;
  }
  ${media.tablet} {
    border-right: 0.098vw solid #e5e7eb;
  }
  ${media.mobile} {
    border-right: 0.508vw solid #e5e7eb;
    -webkit-box-shadow: -2px 2px 25px -7px rgba(0, 0, 0, 0.33);
    box-shadow: -2px 2px 25px -7px rgba(0, 0, 0, 0.33);
  }
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
    max-height: min-content;
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
