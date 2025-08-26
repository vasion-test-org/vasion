'use client';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import { useAvailableThemes } from '@/context/ThemeContext';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const TwoColumnList = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const introMap = blok?.intro_content?.map((item, index) => (
    <RichTextRenderer
      document={item.copy}
      key={`intro-${item._uid || index}`}
    />
  ));

  const column1 = blok?.column_1?.map((item, index) => (
    <ColumnItem key={`col1-item-${item._uid || index}`}>
      {item?.icon?.filename && (
        <ItemIcon small_icons={blok.small_icons} src={item.icon.filename} />
      )}
      <ColumnCopy>
        {item?.copy?.map((copyItem, columnIndex) => (
          <RichTextRenderer
            document={copyItem.copy}
            key={`col1-copy-${copyItem._uid || columnIndex}`}
          />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));

  const column2 = blok?.column_2?.map((item, index) => (
    <ColumnItem key={`col2-item-${item._uid || index}`}>
      {item?.icon?.filename && (
        <ItemIcon small_icons={blok?.small_icons} src={item?.icon?.filename} />
      )}
      <ColumnCopy>
        {item?.copy?.map((copyItem, copyIndex) => (
          <RichTextRenderer
            key={`col2-copy-${copyItem._uid || copyIndex}`}
            document={copyItem.copy}
          />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));

  // console.log('column 2',column2)
  return (
    <ComponentWrapper
      spacingOffset={blok.spacing_offset}
      spacing={blok.spacing}
    >
      <ThemeProvider theme={selectedTheme}>
        <Wrapper {...storyblokEditable(blok)}>
          {blok.intro_content && (
            <IntroContent alignment={blok.alignment}>{introMap}</IntroContent>
          )}
          <ColumnContainer comparison={blok.comparison}>
            <Column doublecolumn={column2.length < 0}>{column1}</Column>
            {column2.length > 0 && <Column>{column2}</Column>}
          </ColumnContainer>
        </Wrapper>
      </ThemeProvider>
    </ComponentWrapper>
  );
};

const ColumnCopy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75vw;

  ${media.fullWidth} {
    gap: 12px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    gap: 2.5vw;
  }
`;
const ItemIcon = styled.img`
  padding: unset !important;
  width: ${(props) => (props.small_icons ? '1.25vw' : '3vw')};
  height: ${(props) => (props.small_icons ? '1.25vw' : '3vw')};

  ${media.fullWidth} {
    width: ${(props) => (props.small_icons ? '20px' : '48px')};
    height: ${(props) => (props.small_icons ? '20px' : '48px')};
  }

  ${media.tablet} {
    width: ${(props) => (props.small_icons ? '1.953vw' : '4.688vw')};
    height: ${(props) => (props.small_icons ? '1.953vw' : '4.688vw')};
  }

  ${media.mobile} {
    width: ${(props) => (props.small_icons ? '4.167vw' : '10vw')};
    height: ${(props) => (props.small_icons ? '4.167vw' : '10vw')};
  }
`;
const ColumnItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.75vw;

  ${media.fullWidth} {
    gap: 12px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    align-items: unset;
    gap: 1.5vw;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25vw;
  width: ${(props) => (props.doublecolumn ? '39.938vw' : '100%')};

  ${media.fullWidth} {
    gap: 20px;
    width: ${(props) => (props.doublecolumn ? '639px' : '100%')};
  }

  ${media.tablet} {
    gap: 1.953vw;
    width: ${(props) => (props.doublecolumn ? '45.313vw' : '100%')};
  }

  ${media.mobile} {
    gap: 4.167vw;
    width: ${(props) => (props.doublecolumn ? '83.333vw' : '100%')};
  }
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.625vw;
  /* margin-left: 21.875vw; */
  width: ${(props) => (props.comparison ? 'max-content' : '81.5vw')};

  ${media.fullWidth} {
    gap: 26px;
    width: ${(props) => (props.comparison ? 'max-content' : '1304px')};
    /* margin-left: 350px; */
  }

  ${media.tablet} {
    gap: 1.563vw;
    width: ${(props) => (props.comparison ? 'max-content' : '92.188vw')};
    /* margin-left: 18vw; */
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 8.167vw;
    width: ${(props) => (props.comparison ? 'max-content' : '89.167vw')};
  }
`;
const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75vw;
  /* margin-bottom: 2.5vw; */
  width: 81.5vw;
  text-align: ${(props) => (props.alignment ? props.alignment : 'left')};

  ${media.fullWidth} {
    gap: 12px;
    /* margin-bottom: 40px; */
    width: 1304px;
  }

  ${media.tablet} {
    gap: 12px;
    /* margin-bottom: 40px; */
    width: 92.188vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
    /* margin-bottom: 8.333vw; */
    width: 83.333vw;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.two_column_list.bg};
  justify-self: center;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
  color: ${(props) => props.theme.two_column_list.textColor};
  /* padding: 5vw 0vw; */

  ${media.fullWidth} {
    gap: 40px;
    /* padding: 80px 0px; */
  }

  ${media.tablet} {
    gap: 3.906vw;
    /* padding: 5.859vw 0vw; */
  }

  ${media.mobile} {
    gap: 8.333vw;
    /* padding: 8.333vw 0vw; */
  }
`;
const ComponentWrapper = styled.div`
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0 0'
        : props.spacing
        ? `${props.spacing}px 0 0 0`
        : '3.75vw 0 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw 0'
        : props.spacing
        ? `0 0 ${props.spacing}px 0`
        : '0 0 3.75vw 0';
    }
    return props.spacing === 'default'
      ? '3.75vw 0 3.75vw 0'
      : props.spacing
      ? `${props.spacing}px 0 ${props.spacing}px 0`
      : '3.75vw 0 3.75vw 0';
  }};

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0 0`
          : '60px 0 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px 0'
          : props.spacing
          ? `0 0 ${props.spacing}px 0`
          : '0 0 60px 0';
      }
      return props.spacing === 'default'
        ? '60px 0 60px 0'
        : props.spacing
        ? `${props.spacing}px 0 ${props.spacing}px 0`
        : '60px 0 60px 0';
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0 0`
          : '5.859vw 0 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw 0'
          : props.spacing
          ? `0 0 ${props.spacing}px 0`
          : '0 0 5.859vw 0';
      }
      return props.spacing === 'default'
        ? '5.859vw 0 5.859vw 0'
        : props.spacing
        ? `${props.spacing}px 0 ${props.spacing}px 0`
        : '5.859vw 0 5.859vw 0';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0 0`
          : '12.5vw 0 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw 0'
          : props.spacing
          ? `0 0 ${props.spacing}px 0`
          : '0 0 12.5vw 0';
      }
      return props.spacing === 'default'
        ? '12.5vw 0 12.5vw 0'
        : props.spacing
        ? `${props.spacing}px 0 ${props.spacing}px 0`
        : '12.5vw 0 12.5vw 0';
    }};
  }
`;
export default TwoColumnList;
