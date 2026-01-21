'use client';
import React, { useRef, useEffect, useState } from 'react';
import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import media from '@/styles/media';

// Icon Components
const CheckIcon = ({ color = '#6B46C1', opacity = 1 }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} opacity={opacity} />
    <path
      d="M8 12.5L10.5 15L16 9.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PartialCheckIcon = ({ color = '#6B46C1' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill={color} opacity="0.3" />
    <path
      d="M8 12.5L10.5 15L16 9.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CompetitiveAnalysis = ({ blok }) => {
  console.log('blok data:', blok);

  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const scrollContainerRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  // Parse table data
  const tableData = blok.table_data || { tbody: [], thead: [] };
  const headers = blok.column_headers
    ? blok.column_headers.split(',').map((h) => h.trim())
    : [];

  console.log('tableData:', tableData);
  console.log('headers:', headers);

  // Create a lookup map for cell configurations
  const cellConfigMap = {};
  if (blok.cell_config) {
    blok.cell_config.forEach((config) => {
      const key = `${config.row_index},${config.col_index}`;
      cellConfigMap[key] = config;
    });
  }

  console.log('cellConfigMap:', cellConfigMap);

  // Handle scroll shadows for visual feedback
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    };

    handleScroll(); // Initial check
    container.addEventListener('scroll', handleScroll);

    // Check on resize
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  // Render cell content with optional icons
  const renderCellContent = (cellValue, rowIndex, colIndex) => {
    const config = cellConfigMap[`${rowIndex},${colIndex}`];

    console.log(
      `Cell [${rowIndex},${colIndex}]:`,
      cellValue,
      'config:',
      config,
    );

    if (!config) {
      // No special configuration, just render text
      return cellValue ? <CellText>{cellValue}</CellText> : null;
    }

    const hasIcon = config.icon_type && config.icon_type !== 'none';
    const hasText = cellValue && cellValue.trim() !== '';
    const showBoth = config.show_text_with_icon && hasIcon && hasText;

    if (showBoth) {
      return (
        <CellContentStacked>
          {config.icon_type === 'check' && (
            <CheckIcon color={config.icon_color} />
          )}
          {config.icon_type === 'partial' && (
            <PartialCheckIcon color={config.icon_color} />
          )}
          {hasText && <CellText>{cellValue}</CellText>}
        </CellContentStacked>
      );
    }

    if (hasIcon) {
      return (
        <CellContentCentered>
          {config.icon_type === 'check' && (
            <CheckIcon color={config.icon_color} />
          )}
          {config.icon_type === 'partial' && (
            <PartialCheckIcon color={config.icon_color} />
          )}
        </CellContentCentered>
      );
    }

    return cellValue ? <CellText>{cellValue}</CellText> : null;
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <TableWrapper
        data-anchor-id={blok.anchor_id}
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        {...storyblokEditable(blok)}
      >
        <TableContainer>
          {/* Sticky First Column */}
          <FirstColumn>
            <HeaderCell>
              <span>{/* Empty header */}</span>
            </HeaderCell>
            {tableData.tbody?.map((row, index) => {
              // First column (index 0) contains feature names
              const featureLabel = row.body?.[0]?.value || '';
              return (
                <FeatureCell key={index}>
                  <FeatureLabel>{featureLabel}</FeatureLabel>
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
              {headers.map((header, colIndex) => (
                <Column key={colIndex}>
                  <HeaderCell>
                    <HeaderText>{header}</HeaderText>
                  </HeaderCell>
                  {tableData.tbody?.map((row, rowIndex) => {
                    // colIndex + 1 because column 0 is the feature name
                    const cellValue = row.body?.[colIndex + 1]?.value || '';
                    return (
                      <DataCell key={rowIndex}>
                        {renderCellContent(cellValue, rowIndex, colIndex)}
                      </DataCell>
                    );
                  })}
                </Column>
              ))}
            </ScrollContent>
          </ScrollContainer>
        </TableContainer>

        {blok.footnote && <Footnote>{blok.footnote}</Footnote>}
      </TableWrapper>
    </ThemeProvider>
  );
};

export default CompetitiveAnalysis;

// ... (rest of your styled components remain the same)

const TableContainer = styled.div`
  display: flex;
  border: 1px solid #e5e7eb;
  border-radius: 0.5vw;
  overflow: hidden;
  background: white;

  ${media.fullWidth} {
    border-radius: 8px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    border-radius: 1.667vw;
  }
`;

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e5e7eb;
  flex-shrink: 0;
  z-index: 2;
  min-width: 12.5vw;

  ${media.fullWidth} {
    min-width: 200px;
  }

  ${media.tablet} {
    min-width: 19.531vw;
  }

  ${media.mobile} {
    min-width: 33.333vw;
  }
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;

  /* Smooth scrolling on mobile */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  /* Hide scrollbar but keep functionality */
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

  /* Scroll shadows */
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
    min-width: 35vw;
  }
`;

const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25vw 1vw;
  min-height: 4.167vw;
  border-bottom: 2px solid #e5e7eb;
  background: ${(props) => (props.isFirstColumn ? '#f9fafb' : 'white')};
  font-weight: 600;

  ${media.fullWidth} {
    padding: 20px 16px;
    min-height: 67px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
    min-height: 6.51vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
    min-height: 13.889vw;
  }
`;

const HeaderText = styled.span`
  font-size: 1vw;
  font-weight: 600;
  text-align: center;
  color: #111827;

  ${media.fullWidth} {
    font-size: 16px;
  }

  ${media.tablet} {
    font-size: 1.563vw;
  }

  ${media.mobile} {
    font-size: 3.333vw;
  }
`;

const FeatureCell = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25vw 1vw;
  min-height: 4.167vw;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  ${media.fullWidth} {
    padding: 20px 16px;
    min-height: 67px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
    min-height: 6.51vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
    min-height: 13.889vw;
  }
`;

const FeatureLabel = styled.span`
  font-size: 0.875vw;
  color: #374151;
  font-weight: 500;

  ${media.fullWidth} {
    font-size: 14px;
  }

  ${media.tablet} {
    font-size: 1.367vw;
  }

  ${media.mobile} {
    font-size: 2.917vw;
  }
`;

const DataCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25vw 1vw;
  min-height: 4.167vw;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }

  ${media.fullWidth} {
    padding: 20px 16px;
    min-height: 67px;
  }

  ${media.tablet} {
    padding: 1.953vw 1.563vw;
    min-height: 6.51vw;
  }

  ${media.mobile} {
    padding: 4.167vw 3.333vw;
    min-height: 13.889vw;
  }
`;

const CellContentStacked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;

const CellContentCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CellText = styled.span`
  font-size: 0.75vw;
  color: #6b7280;
  text-align: center;
  line-height: 1.4;

  ${media.fullWidth} {
    font-size: 12px;
  }

  ${media.tablet} {
    font-size: 1.172vw;
  }

  ${media.mobile} {
    font-size: 2.5vw;
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
const TableWrapper = styled.div`
  display: block;
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
