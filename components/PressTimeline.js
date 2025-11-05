"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RichTextRenderer from "./renderers/RichTextRenderer";
import { storyblokEditable } from "@storyblok/react";

const PressTimeline = ({ blok }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedRange, setSelectedRange] = useState("2025-2020");
  const timelineRef = useRef(null);
  const starRef = useRef(null);

  const dateRanges = {
    "2025-2020": [],
    "2019-2017": [],
  };

  blok.cards.forEach((card) => {
    if (
      card.date.includes("2021") ||
      card.date.includes("2020") ||
      card.date.includes("2024") ||
      card.date.includes("2025")
    ) {
      dateRanges["2025-2020"].push(card);
    } else if (card.date.includes("2019") || card.date.includes("2017")) {
      dateRanges["2019-2017"].push(card);
    }
  });

  useEffect(() => {
    setFilteredCards(dateRanges[selectedRange]);
  }, [selectedRange]);

  useEffect(() => {
    const timelineElement = timelineRef.current;
    const starElement = starRef.current;

    if (!timelineElement || !starElement) return;

    gsap.set(starElement, { y: 0 });
    gsap.killTweensOf(starElement);

    gsap.to(starElement, {
      scrollTrigger: {
        scroller: timelineElement,
        trigger: timelineElement,
        start: "top top",
        endTrigger: "#last-element",
        end: "bottom bottom",
        scrub: 2,
      },
      y: () => timelineElement.offsetHeight - starElement.offsetHeight,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.scroller === timelineElement) {
          trigger.kill();
        }
      });
    };
  }, [filteredCards]);

  const handleButtonClick = (range) => {
    setSelectedRange(range);
  };

  const cards = filteredCards.map((card, index) => {
    const isLastElement = index === filteredCards.length - 1;

    return (
      <TimelineCardContainer
        key={card.date}
        id={isLastElement ? "last-element" : undefined}
      >
        <Date>{card.date}</Date>
        <Card {...storyblokEditable(card)}>
          <RichTextRenderer document={card.header} />
          <RichTextRenderer document={card.body_copy} />
          {/* <StyledLink href={card.link}>{card.linkText}</StyledLink> */}
        </Card>
      </TimelineCardContainer>
    );
  });

  return (
    <Wrapper>
      <IntroContainer>
        <IntroHeader>Press Releases</IntroHeader>
        <ButtonContainer>
          {Object.keys(dateRanges).map((range) => (
            <Button
              key={range}
              onClick={() => handleButtonClick(range)}
              isActive={selectedRange === range}
            >
              {range}
            </Button>
          ))}
        </ButtonContainer>
      </IntroContainer>
      <TimelineContainer>
        <TLGradient />
        <LineDiv>
          <TimelineStar
            src="/images/uiElements/VasionStarNewsroom.webp"
            ref={starRef}
          />
          <Line />
        </LineDiv>
        <Timeline ref={timelineRef}>
          <CardContainer>{cards}</CardContainer>
        </Timeline>
      </TimelineContainer>
    </Wrapper>
  );
};

const BodyCopy = styled.p`
  ${text.bodyMd};
  margin-bottom: 1.806vw;

  ${media.fullWidth} {
    margin-bottom: 26px;
  }

  ${media.tablet} {
    margin-bottom: 2.539vw;
  }

  ${media.mobile} {
    margin-bottom: 6.075vw;
  }
`;

const Header = styled.p`
  ${text.bodyMdBold};
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  gap: 1.042vw;
  border-radius: 0.417vw;
  padding: 1.111vw;

  ${media.fullWidth} {
    gap: 15px;
    border-radius: 6px;
    padding: 16px;
  }

  ${media.tablet} {
    gap: 1.465vw;
    border-radius: 0.586vw;
    padding: 1.563vw;
  }

  ${media.mobile} {
    gap: 3.505vw;
    border-radius: 1.402vw;
    padding: 3.738vw;
  }
`;

const CardContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 54.375vw;
  gap: 4.167vw;

  ${media.fullWidth} {
    width: 783px;
    gap: 60px;
  }

  ${media.tablet} {
    width: 76.465vw;
    gap: 5.859vw;
  }

  ${media.mobile} {
    width: 80.841vw;
    gap: 14.019vw;
  }
`;

const Date = styled.p`
  ${text.bodySm};
  color: ${colors.grey500};
`;

const TimelineCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.694vw;

  ${media.fullWidth} {
    gap: 10px;
  }

  ${media.tablet} {
    gap: 0.977vw;
  }

  ${media.mobile} {
    gap: 2.336vw;
  }
`;

const Line = styled.div`
  height: 100%;
  margin-top: 1.736vw;
  width: 0.139vw;
  border: 0.069vw solid ${colors.grey75};

  ${media.fullWidth} {
    margin-top: 25px;
    width: 2px;
    border: 1px solid ${colors.grey75};
  }

  ${media.tablet} {
    top: 2.441vw;
    width: 0.195vw;
    border: 0.098vw solid ${colors.grey75};
  }

  ${media.mobile} {
    margin-top: 5.841vw;
    width: 0.467vw;
    border: 0.234vw solid ${colors.grey75};
  }
`;

const TimelineStar = styled.img`
  width: 2.083vw;
  height: 2.083vw;

  ${media.fullWidth} {
    width: 30px;
    height: 30px;
  }

  ${media.tablet} {
    width: 2.93vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    width: 7.009vw;
    height: 7.009vw;
  }
`;

const LineDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const Timeline = styled.div`
  position: relative;
  overflow-y: scroll;
  height: auto;
  display: flex;
  flex-direction: row;
  width: 54.375vw;
  gap: 4.167vw;

  ${media.fullWidth} {
    width: 783px;
    gap: 60px;
  }

  ${media.tablet} {
    width: 76.465vw;
    gap: 5.859vw;
  }

  ${media.mobile} {
    width: 80.841vw;
    gap: 14.019vw;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TLGradient = styled.div`
  position: absolute;
  width: 100%;
  height: 8.944vw;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(232, 224, 235, 0) 0%,
    rgba(232, 224, 235, 0.7) 30%,
    #e8e0eb 50%
  );

  ${media.fullWidth} {
    height: 129px;
  }

  ${media.tablet} {
    width: 101%;
    height: 12.598vw;
  }

  ${media.mobile} {
    width: 101%;
    height: 30.14vw;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  width: auto;
  display: flex;
  flex-direction: row;
  height: 40.417vw;
  gap: 1.806vw;

  ${media.fullWidth} {
    height: 582px;
    gap: 26px;
  }

  ${media.tablet} {
    height: 51vw;
    gap: 2.539vw;
  }

  ${media.mobile} {
    height: 132.944vw;
    gap: 3.037vw;
  }
`;

const Button = styled.button`
  ${(props) => (props.isActive ? text.bodySmBold : text.bodySm)};
  padding: 0.833vw 1.111vw;
  border: 0.069vw solid
    ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
  background-color: ${(props) =>
    props.isActive ? colors.purple100 : colors.white};
  color: ${(props) => (props.isActive ? colors.black : colors.black)};

  ${media.fullWidth} {
    padding: 12px 16px;
    border: 1px solid
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
  }

  ${media.tablet} {
    padding: 1.172vw 1.563vw;
    border: 0.098vw
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
  }

  ${media.mobile} {
    padding: 2.804vw 3.738vw;
    border: 0.234vw
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
  }

  &:hover {
    background-color: ${(props) =>
      props.isActive ? colors.primaryHover : colors.grey75};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 0.069vw solid
    ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
  border-radius: 0.417vw;

  ${media.fullWidth} {
    border: 1px solid
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
    border-radius: 6px;
  }

  ${media.tablet} {
    border: 0.098vw solid
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
    border-radius: 0.586vw;
  }

  ${media.mobile} {
    border: 0.234vw solid
      ${(props) => (props.isActive ? colors.borderPurple : colors.grey100)};
    border-radius: 1.402vw;
  }
`;

const IntroHeader = styled.h3`
  ${text.h3};
`;

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.778vw;

  ${media.fullWidth} {
    gap: 40px;
  }

  ${media.tablet} {
    gap: 2.93vw;
  }

  ${media.mobile} {
    gap: 7.009vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  background: ${colors.lightPurpleGradient};
  gap: 3.819vw;
  padding-top: 4.167vw;

  ${media.fullWidth} {
    width: 100vw;
    gap: 55px;
    padding-top: 60px;
  }

  ${media.tablet} {
    gap: 4.883vw;
    padding-top: 5.859vw;
  }

  ${media.mobile} {
    gap: 7.009vw;
    padding-top: 14.019vw;
  }
`;

export default PressTimeline;
