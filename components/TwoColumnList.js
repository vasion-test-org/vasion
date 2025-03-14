'use client';
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
const TwoColumnList = ({ blok }) => {
  console.log(blok);

  const introMap = blok.intro_content.map((item) => (
    <RichTextRenderer document={item.copy} />
  ));

  const column1 = blok.column_1.map((item) => (
    <ColumnItem>
      {item.icon.filename && <ItemIcon src={item.icon.filename} />}
      <ColumnCopy>
        {item.copy.map((item) => (
          <RichTextRenderer document={item.copy} />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));

  const column2 = blok.column_2.map((item) => (
    <ColumnItem>
      {item.icon.filename && <ItemIcon src={item.icon.filename} />}
      <ColumnCopy>
        {item.copy.map((item) => (
          <RichTextRenderer document={item.copy} />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));
  return (
    <Wrapper
      spacingOffset={blok.offset_spacing}
      spacing={blok.section_spacing}
      {...storyblokEditable(blok)}
    >
      <IntroContent>{introMap}</IntroContent>
      <Columns>
        <Column>{column1}</Column>
        <Column>{column2}</Column>
      </Columns>
    </Wrapper>
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
  width: 3vw;
  height: 3vw;

  ${media.fullWidth} {
    width: 48px;
  height: 48px;
  }
  
  ${media.tablet} {
    width: 4.688vw;
    height: 4.688vw;
  }
  
  ${media.mobile} {
    width: 10vw;
    height: 10vw;
  }
`;
const ColumnItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75vw;

  ${media.fullWidth} {
    gap: 12px;
  }
  
  ${media.tablet} {
    gap: 1.172vw;
  }
  
  ${media.mobile} {
    flex-direction: column;
    gap: 2.5vw;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
  width: 39.938vw;

  ${media.fullWidth} {
    gap: 40px;
  width: 639px;
  }
  
  ${media.tablet} {
    gap: 3.906vw;
  width: 45.313vw;
  }
  
  ${media.mobile} {
    gap: 8.333vw;
    width: 83.333vw;
  }
`;
const Columns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.625vw;

  ${media.fullWidth} {
    gap: 26px;
  }
  
  ${media.tablet} {
    gap: 1.563vw;
  }
  
  ${media.mobile} {
  flex-direction: column;
  gap: unset;
  }
`;
const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75vw;
  margin-bottom: 2.5vw;
  width: 81.5vw;

  ${media.fullWidth} {
    gap: 12px;
  margin-bottom: 40px;
  width: 1304px;
  }
  
  ${media.tablet} {
    gap: 12px;
    margin-bottom: 40px;
    width: 92.188vw;
  }
  
  ${media.mobile} {
    gap: 4.167vw;
  margin-bottom: 8.333vw;
  width: 83.333vw;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
export default TwoColumnList;
