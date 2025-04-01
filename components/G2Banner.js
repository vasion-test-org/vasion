"use client";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";

const G2Banner = () => {
  return (
    <Background>
      <Wrapper>
        <Heading>The #1 Print Management Software on G2</Heading>
        <FlexContainer>
          <SpotLightImage
            loading="lazy"
            alt="spotlight Image"
            src="/images/G2/23/summer/SpotlightBadge.webp"
          />
          <BadgeContainer>
            <SupportingBadge
              loading="lazy"
              alt="highest"
              src="/images/G2/23/summer/BestRelationship.webp"
            />
            <SupportingBadge
              alt="results"
              src="/images/G2/23/summer/BestResults.webp"
            />
            <SupportingBadge
              loading="lazy"
              alt="momentum"
              src="/images/G2/23/summer/BestSupport.webp"
            />
            <SupportingBadge
              loading="lazy"
              alt="implement"
              src="/images/G2/23/summer/BestUsability.webp"
            />
            <SupportingBadge
              loading="lazy"
              alt="usability"
              src="/images/G2/23/summer/MomentumLeader.webp"
            />
            <SupportingBadge
              loading="lazy"
              alt="relationship"
              src="/images/G2/23/summer/MostImplementable.webp"
            />
          </BadgeContainer>
        </FlexContainer>
      </Wrapper>
    </Background>
  );
};

export default G2Banner;

const Background = styled.div`
  background-color: ${colors.primaryPurple};
  width: 100%;
  padding: 5.556vw 0vw;

  ${media.fullWidth} {
    padding: 80px 0px;
    width: 100%;
  }
  ${media.tablet} {
    width: 100%;
    padding: 7.813vw 0vw;
  }
  ${media.mobile} {
    width: 100%;
    padding: 9.346vw 0vw;
  }
`;
const Heading = styled.h2`
  color: ${colors.white};
  ${text.h3};
  font-weight: 700;
  padding-bottom: 2.083vw;

  ${media.fullWidth} {
    padding-bottom: 30px;
  }
  ${media.tablet} {
    padding-bottom: 2.93vw;
  }
  ${media.mobile} {
    padding-bottom: 5.607vw;
    text-align: center;
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4.861vw;

  ${media.fullWidth} {
    gap: 70px;
  }
  ${media.tablet} {
    gap: 6.836vw;
  }
  ${media.mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5.607vw;
  }
`;
const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 26.486vw;
  gap: 2.431vw;

  ${media.fullWidth} {
    width: 367px;
    gap: 35px;
  }
  ${media.tablet} {
    width: 35.84vw;
    gap: 3.418vw;
  }
  ${media.mobile} {
    gap: 1.402vw;
    width: 73.196vw;
  }
`;
const SpotLightImage = styled.img`
  width: 23.056vw;
  ${media.fullWidth} {
    width: 332px;
  }
  ${media.tablet} {
    width: 32.422vw;
  }
  ${media.mobile} {
    width: 77.57vw;
  }
`;
const SupportingBadge = styled.img`
  width: 6.875vw;

  ${media.fullWidth} {
    width: 99px;
  }
  ${media.tablet} {
    width: 9.668vw;
  }
  ${media.mobile} {
    width: 23.131vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  jusify-self: center;
  align-items: center;
  justify-content: center;
`;
