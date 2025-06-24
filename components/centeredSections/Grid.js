"use client";
import React from "react";

import styled from "styled-components";
import GridItem from "@/components/globalComponents/GridItem";
import media from "@/styles/media";
const Grid = ({ gridData, alignment }) => {
  const itemCount = gridData.length;

  return (
    <GridContainer itemCount={itemCount}>
      {gridData.map((gridItem, index) => (
        <GridItem
          key={`grid-item-${index}`}
          content={gridItem}
          alignment={alignment}
        />
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  justify-content: center;
  width: 81.5vw;
  gap: 2.5vw;

  /* DEFAULT: 3 items per row (for 3, 6+ items) */
  > * {
    flex: 1 1 calc(33.333% - 1.667vw);
    max-width: calc(33.333% - 1.667vw);
  }

  /* 4 ITEMS: All on one row */
  ${(props) =>
    props.itemCount === 4 &&
    `
    > * {
      flex: 1 1 calc(25% - 1.875vw);
      max-width: calc(25% - 1.875vw);
    }
  `}

  /* 2 ITEMS: Both on one row */
  ${(props) =>
    props.itemCount === 2 &&
    `
    > * {
      flex: 1 1 calc(50% - 1.25vw);
      max-width: calc(50% - 1.25vw);
    }
  `}
  
  /* 1 ITEM: Centered */
  ${(props) =>
    props.itemCount === 1 &&
    `
    > * {
      flex: 1 1 auto;
      max-width: 400px;
    }
  `}
  
  ${media.fullWidth} {
    width: 1304px;
    gap: 40px;

    /* DEFAULT: 3 items per row */
    > * {
      flex: 1 1 calc(33.333% - 26.667px);
      max-width: calc(33.333% - 26.667px);
    }

    /* 4 ITEMS: All on one row */
    ${(props) =>
      props.itemCount === 4 &&
      `
      > * {
        flex: 1 1 calc(25% - 30px);
        max-width: calc(25% - 30px);
      }
    `}

    /* 2 ITEMS: Both on one row */
    ${(props) =>
      props.itemCount === 2 &&
      `
      > * {
        flex: 1 1 calc(50% - 20px);
        max-width: calc(50% - 20px);
      }
    `}
    
    /* 1 ITEM: Centered */
    ${(props) =>
      props.itemCount === 1 &&
      `
      > * {
        flex: 1 1 auto;
        max-width: 500px;
      }
    `}
  }

  ${media.tablet} {
    width: 92.188vw;
    gap: 1.953vw;

    /* Tablet: 2 items per row for most cases */
    > * {
      flex: 1 1 calc(50% - 0.977vw);
      max-width: calc(50% - 0.977vw);
    }

    /* Tablet: Keep 4 items as 2x2 */
    ${(props) =>
      props.itemCount === 4 &&
      `
      > * {
        flex: 1 1 calc(50% - 0.977vw);
        max-width: calc(50% - 0.977vw);
      }
    `}

    /* Tablet: 1 item full width */
    ${(props) =>
      props.itemCount === 1 &&
      `
      > * {
        flex: 1 1 100%;
        max-width: 100%;
      }
    `}
  }

  ${media.mobile} {
    width: 89.167vw;
    gap: 8.333vw;

    /* Mobile: Always single column */
    > * {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
`;

export default Grid;
