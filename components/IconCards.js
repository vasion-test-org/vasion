"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";
import RichTextRenderer from "./renderers/RichTextRenderer";
import { storyblokEditable } from "@storyblok/react";

const IconCards = ({ blok }) => {
  const cards = blok?.map((card, index) => {
    return (
      <Card key={card.title + index} {...storyblokEditable(card)}>
        <NumberIntro>
          <Counter>{index + 1}</Counter>
          <Title>{card.title}</Title>
        </NumberIntro>
        <Icon
          width={90}
          height={90}
          src={card?.icon?.filename}
          alt={card?.icon?.alt}
        />
        <TextContainer>
          <Headline>
            <RichTextRenderer document={card?.headline} />
          </Headline>
          <BodyCopy>
            <RichTextRenderer document={card?.body_copy} />
          </BodyCopy>
        </TextContainer>
      </Card>
    );
  });

  return <Wrapper {...storyblokEditable(blok)}>{cards}</Wrapper>;
};

export default IconCards;

const BodyCopy = styled.div`
  ${text.bodySm};
`;

const Headline = styled.div`
  ${text.bodyLgBold};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Icon = styled.img`
  align-self: center;
  width: 90px;
  height: 90px;
`;

const Title = styled.p`
  ${text.bodyXLBold};
`;

const Counter = styled.div`
  ${text.bodyLg};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  border: 0.2vw solid ${colors.primaryOrange};
  color: ${colors.primaryOrange};
  font-weight: 600;

  ${media.fullWidth} {
    width: 32px;
    height: 32px;
    border: 4px solid ${colors.primaryOrange};
  }
  ${media.tablet} {
    width: 3.125vw;
    height: 3.125vw;
    border: 0.391vw solid ${colors.primaryOrange};
  }
  ${media.mobile} {
    width: 6.833vw;
    height: 6.833vw;
    border: 0.833vw solid ${colors.primaryOrange};
  }
`;

const NumberIntro = styled.div`
  display: flex;
  text-align: center;
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1vw;
  width: 19.125vw;
  padding: 1.625vw;
  gap: 2vw;
  background: linear-gradient(180deg, #f5f4f7 0%, #e8e0eb 100%);

  ${media.fullWidth} {
    width: 306px;
    border-radius: 16px;
    padding: 26px;
    gap: 32px;
  }
  ${media.tablet} {
    width: 44.141vw;
    border-radius: 1.563vw;
    padding: 2.539vw;
    gap: 3.125vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    border-radius: 3.333vw;
    padding: 5.417vw;
    gap: 6.667vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 81.5vw;
  align-items: stretch;
  gap: 1.625vw;

  ${media.fullWidth} {
    width: 1304px;
    gap: 26px;
  }
  ${media.tablet} {
    flex-wrap: wrap;
    width: 92.188vw;
    gap: 3.906vw;
  }
  ${media.mobile} {
    flex-direction: column;
    width: 89.167vw;
    gap: 5vw;
  }
`;
