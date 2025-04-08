"use client";
import React from "react";

import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
const TwoColumnList = ({ blok }) => {
  // console.log(blok);

  const introMap = blok?.intro_content?.map((item) => (
    <RichTextRenderer document={item.copy} />
  ));

  const column1 = blok?.column_1?.map((item, index) => (
    <ColumnItem key={`col1-item-${index}`}>
      {item?.icon?.filename && (
        <ItemIcon small_icons={blok.small_icons} src={item.icon.filename} />
      )}
      <ColumnCopy>
        {item?.copy?.map((item) => (
          <RichTextRenderer document={item.copy} />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));

  const column2 = blok?.column_2?.map((item, index) => (
    <ColumnItem key={`col2-item-${index}`}>
      {item?.icon?.filename && (
        <ItemIcon small_icons={blok?.small_icons} src={item?.icon?.filename} />
      )}
      <ColumnCopy>
        {item?.copy?.map((copyItem, copyIndex) => (
          <RichTextRenderer
            key={`col2-copy-${index}-${copyIndex}`}
            document={copyItem.copy}
          />
        ))}
      </ColumnCopy>
    </ColumnItem>
  ));

  // console.log('column 2',column2)
  return (
    <Wrapper
      spacingOffset={blok.offset_spacing}
      spacing={blok.section_spacing}
      {...storyblokEditable(blok)}
    >
      <IntroContent alignment={blok.alignment}>{introMap}</IntroContent>
      <Columns comparison={blok.comparison}>
        <Column doublecolumn={column2.length < 0}>{column1}</Column>
        {column2.length > 0 && <Column>{column2}</Column>}
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
  width: ${(props) => (props.small_icons ? "1.25vw" : "3vw")};
  height: ${(props) => (props.small_icons ? "1.25vw" : "3vw")};

  ${media.fullWidth} {
    width: ${(props) => (props.small_icons ? "20px" : "48px")};
    height: ${(props) => (props.small_icons ? "20px" : "48px")};
  }

  ${media.tablet} {
    width: ${(props) => (props.small_icons ? "1.953vw" : "4.688vw")};
    height: ${(props) => (props.small_icons ? "1.953vw" : "4.688vw")};
  }

  ${media.mobile} {
    width: ${(props) => (props.small_icons ? "4.167vw" : "10vw")};
    height: ${(props) => (props.small_icons ? "4.167vw" : "10vw")};
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
  width: ${(props) => (props.doublecolumn ? "39.938vw" : "100%")};

  ${media.fullWidth} {
    gap: 40px;
    width: ${(props) => (props.doublecolumn ? "639px" : "100%")};
  }

  ${media.tablet} {
    gap: 3.906vw;
    width: ${(props) => (props.doublecolumn ? "45.313vw" : "100%")};
  }

  ${media.mobile} {
    gap: 8.333vw;
    width: ${(props) => (props.doublecolumn ? "83.333vw" : "100%")};
  }
`;
const Columns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.625vw;
  width: ${(props) => (props.comparison ? "max-content" : "81.5vw")};

  ${media.fullWidth} {
    gap: 26px;
    width: ${(props) => (props.comparison ? "max-content" : "1304px")};
  }

  ${media.tablet} {
    gap: 1.563vw;
    width: ${(props) => (props.comparison ? "max-content" : "92.188vw")};
  }

  ${media.mobile} {
    flex-direction: column;
    gap: unset;
    width: ${(props) => (props.comparison ? "max-content" : "89.167vw")};
  }
`;
const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75vw;
  margin-bottom: 2.5vw;
  width: 81.5vw;
  text-align: ${(props) => (props.alignment ? props.alignment : "left")};

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
  justify-self: center;
  align-items: center;
  justify-content: center;

  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `${props.spacing}px 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `${props.spacing}px 0`
        : "3.75vw 0";
  }};

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "60px 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "60px 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 60px"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 60px";
      }
      return props.spacing === "default"
        ? "60px 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "60px 0";
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.859vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "5.859vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 5.859vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 5.859vw";
      }
      return props.spacing === "default"
        ? "5.859vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "5.859vw 0";
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "12.5vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "12.5vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 12.5vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 12.5vw";
      }
      return props.spacing === "default"
        ? "12.5vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "12.5vw 0";
    }};
  }
`;
export default TwoColumnList;
