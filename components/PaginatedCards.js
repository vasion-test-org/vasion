"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Card from "./globalComponents/Card";
import EventCard from "./globalComponents/EventCard";
import { horizontalLoop } from "@/functions/horizontalLoop";
import SideArrow from "@/assets/svg/side-arrow.svg";
import colors from "@/styles/colors";
import text from "@/styles/text";
import ResourceCard from "./globalComponents/ResourceCard";

const PaginatedCards = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  const currentIndex = useRef(0);
  const cardsLoop = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const mappedCards = [];

  for (let i = 0; i < blok.cards.length; i += 6) {
    const chunk = blok.cards.slice(i, i + 6);
    mappedCards.push(
      <CardChunk
        key={`chunk-${i / 6}`}
        card_type={blok.card_type}
        className="cardChunks"
      >
        {chunk.map((card, index) => {
          if (blok.card_type === "default") {
            return (
              <Card
                key={`card-${i + index}`}
                borderradius="6"
                paginated
                content={card}
              />
            );
          } else if (blok.card_type === "event") {
            return (
              <EventCard
                key={`card-${i + index}`}
                even={index % 2 === 1}
                content={card}
              />
            );
          } else if (blok.card_type === "resource") {
            return (
              <ResourceCard
                key={`card-${i + index}`}
                paginated
                index={index}
                content={card}
                borderradius="6"
              />
            );
          }
        })}
      </CardChunk>,
    );
  }

  const goToPage = (index) => {
    if (!cardsLoop.current) return;
    cardsLoop.current.toIndex(index, {
      duration: 0.4,
      ease: "power1.inOut",
    });
    currentIndex.current = index;
    setCurrentPage(index);
  };

  const getPaginatedNumbers = () => {
    const totalPages = mappedCards.length;
    const maxPagesToShow = 5;
    const pageList = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pageList.push(i);
      }
    } else {
      const left = Math.max(0, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage > 1) {
        pageList.push(0);
        if (currentPage > 2) pageList.push("left-ellipsis");
      }

      for (let i = left; i <= right; i++) {
        pageList.push(i);
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) pageList.push("right-ellipsis");
        pageList.push(totalPages - 1);
      }
    }

    return pageList;
  };

  const mappedPages = getPaginatedNumbers().map((page, i) => {
    if (page === "left-ellipsis" || page === "right-ellipsis") {
      return <Ellipsis key={`ellipsis-${i}`}>...</Ellipsis>;
    }

    return (
      <PageNumberBlock
        className="pageNumberBlocks"
        key={`block-${page}`}
        id={`block-${page}`}
        onClick={() => goToPage(page)}
        style={{
          backgroundColor: currentPage === page ? colors.grey100 : "unset",
        }}
      >
        {page + 1}
      </PageNumberBlock>
    );
  });

  useEffect(() => {
    const cardChunks = gsap.utils.toArray(".cardChunks");
    const totalItems = cardChunks.length;

    cardsLoop.current = horizontalLoop(cardChunks, {
      paused: true,
      center: true,
    });

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    const handleNext = () => {
      const newIndex = (currentIndex.current + 1) % totalItems;
      cardsLoop.current.next({ duration: 0.4, ease: "power1.inOut" });
      currentIndex.current = newIndex;
      setCurrentPage(newIndex);
    };

    const handlePrev = () => {
      const newIndex = (currentIndex.current - 1 + totalItems) % totalItems;
      cardsLoop.current.previous({ duration: 0.4, ease: "power1.inOut" });
      currentIndex.current = newIndex;
      setCurrentPage(newIndex);
    };

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    return () => {
      nextBtn.removeEventListener("click", handleNext);
      prevBtn.removeEventListener("click", handlePrev);
    };
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
      >
        {blok.card_type === "event" && (
          <EventHeaderContainer>
            <EventHeaders>Events</EventHeaders>
            <EventHeaders>Details</EventHeaders>
          </EventHeaderContainer>
        )}
        <CardsContainer card_type={blok.card_type}>
          {mappedCards}
        </CardsContainer>
        <PaginationDiv>
          <PageNavigation className="prev">Previous</PageNavigation>
          {mappedPages}
          <PageNavigation className="next">Next</PageNavigation>
        </PaginationDiv>
      </Wrapper>
    </ThemeProvider>
  );
};

const PageNumberBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5vw;
  height: 1.625vw;
  border-radius: 0.25vw;
  cursor: pointer;

  ${media.fullWidth} {
    width: 40px;
    height: 26px;
    border-radius: 4px;
  }

  ${media.tablet} {
    width: 3.906vw;
    height: 2.539vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    width: 8.333vw;
    height: 5.417vw;
    border-radius: 0.833vw;
  }
`;

const Ellipsis = styled.div`
  padding: 0 0.5vw;
  color: ${colors.grey300};
  user-select: none;

  ${media.fullWidth} {
    padding: 0 8px;
  }

  ${media.tablet} {
    padding: 0 0.781vw;
  }

  ${media.mobile} {
    padding: 0 1.667vw;
  }
`;

const PageNavigation = styled.div`
  padding: 0.75vw 1vw;
  cursor: pointer;

  ${media.fullWidth} {
    padding: 12px 16px;
  }

  ${media.tablet} {
    padding: 1.172vw 1.563vw;
  }

  ${media.mobile} {
    padding: 2.5vw 3.333vw;
  }
`;

const PaginationDiv = styled.div`
  ${text.bodySm};
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.grey100};
  border-radius: 0.75vw;
  margin-top: 2vw;

  ${media.fullWidth} {
    border-radius: 12px;
    margin-top: 32px;
  }

  ${media.tablet} {
    border-radius: 1.172vw;
    margin-top: 3.125vw;
  }

  ${media.mobile} {
    border-radius: 2.5vw;
    margin-top: 6.667vw;
  }

  :last-child {
    border-right: none;
  }
`;

const CardChunk = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.card_type === "event" ? "column" : "row"};
  flex-wrap: ${(props) => (props.card_type === "event" ? "nowrap" : "wrap")};
  gap: ${(props) => (props.card_type === "event" ? "0" : "1.25vw")};
  min-width: 100%;

  ${media.fullWidth} {
    gap: 20px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 0.625vw;
  width: 81.5vw;
  padding: 0.313vw;

  ${media.fullWidth} {
    gap: 10px;
    width: 1304px;
    padding: 5px;
  }

  ${media.tablet} {
    gap: 0.977vw;
    width: 92.188vw;
    padding: 0.488vw;
  }

  ${media.mobile} {
    gap: 2.083vw;
    width: 89.167vw;
    padding: 1.042vw;
  }
`;

const EventHeaders = styled.div`
  ${text.bodySmBold};
`;

const EventHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${colors.lightPurpleGrey};
  width: 81.5vw;
  padding: 1.5vw 1vw;
  border-radius: 1vw 1vw 0 0;
  gap: 37.938vw;

  ${media.fullWidth} {
    width: 1304px;
    padding: 24px 16px;
    border-radius: 16px 16px 0 0;
    gap: 607px;
  }

  ${media.tablet} {
    width: 92.188vw;
    padding: 2.344vw 1.563vw;
    border-radius: 1.563vw 1.563vw 0 0;
    gap: 59.277vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    padding: 5vw 3.333vw;
    border-radius: 3.333vw 3.333vw 0 0;
    gap: 126.458vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

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

export default PaginatedCards;
