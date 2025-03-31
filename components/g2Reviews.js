"use client";
import React from "react";
import styled, { ThemeProvider } from "styled-components";
import media from "@/styles/media";
import Button from "@/components/globalComponents/Button";
const G2Reviews = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <SubText>What Customers Are Saying</SubText>
        <Heading>THE RECOMMENDED ZERO TRUST SOLUTION</Heading>
      </HeaderContainer>
      <ReviewBadges>
        <G2Image
          loading="lazy"
          src="/images/zero-trust/zt-award-group-2.png"
          alt=""
        />
        <G2Image loading="lazy" src="/images/zero-trust/zt-leader.png" alt="" />
        <G2Image
          loading="lazy"
          src="/images/zero-trust/zt-award-group.png"
          alt=""
        />
      </ReviewBadges>
      <PullQuoteContainer>
        <Image loading="lazy" src="/images/zero-trust/review-1.png" alt="" />
        <Image loading="lazy" src="/images/zero-trust/review-2.png" alt="" />
        <Image loading="lazy" src="/images/zero-trust/review-3.png" alt="" />
        <Image loading="lazy" src="/images/zero-trust/review-4.png" alt="" />
      </PullQuoteContainer>
      <Button
        $buttonData={{
          theme: "primary",
          link_url: {
            url: "https://www.g2.com/products/printerlogic/reviews#reviews",
            target: "_blank",
          },
          link_text: "Read Our Reviews →",
          layout: "row",
          link_size: "medium",
        }}
      />
    </Wrapper>
  );
};
export default G2Reviews;

const G2Image = styled.img`
  width: 19.514vw;
  ${media.fullWidth} {
    width: 281px;
  }
  ${media.tablet} {
    width: 19.531vw;
  }
  ${media.mobile} {
    width: 50vw;
  }
`;
const HeaderContainer = styled.div`
  margin: 4.444vw auto;
  text-align: center;
  ${media.fullWidth} {
    margin: 64px auto;
  }
  ${media.tablet} {
    margin: 6.25vw auto;
  }
  ${media.mobile} {
    margin: 17.067vw auto;
  }
`;
const SubText = styled.p`
  font-family: Archivo;
  font-size: 1.25vw;
  line-height: 1.667vw;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
  ${media.fullWidth} {
    font-size: 18px;
    line-height: 24px;
  }
  ${media.tablet} {
    font-size: 1.758vw;
    line-height: 2.344vw;
  }
  ${media.mobile} {
    font-size: 4.8vw;
    line-height: 6.4vw;
  }
`;
const Heading = styled.h2`
  font-family: "Archivo";
  font-weight: 700;
  font-size: 3.333vw;
  line-height: 3.889vw;
  margin-top: 1.111vw;
  ${media.fullWidth} {
    font-size: 48px;
    line-height: 56px;
    margin-top: 16px;
  }
  ${media.tablet} {
    font-size: 4.688vw;
    line-height: 5.469vw;
    margin-top: 1.563vw;
  }
  ${media.mobile} {
    font-size: 10.133vw;
    line-height: 11.2vw;
    margin-top: 3.2vw;
  }
`;
const ReviewBadges = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${media.fullWidth} {
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    flex-direction: column;
  }
`;
const PullQuoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 4.444vw auto;
  justify-content: center;
  align-items: center;
  ${media.fullWidth} {
    margin: 64px auto;
  }
  ${media.tablet} {
    margin: 6.25vw auto;
  }
  ${media.mobile} {
    width: 50vw;
    margin: 8.25vw auto;
  }
`;
const Link = styled.a`
  font-family: Archivo;
  font-size: 1.25vw;
  line-height: 1.875vw;
  font-weight: 700;
  letter-spacing: 0em;
  text-align: center;
  ${media.fullWidth} {
    font-size: 18px;
    line-height: 27px;
  }
  ${media.tablet} {
    font-size: 1.758vw;
    line-height: 2.637vw;
  }
  ${media.mobile} {
    font-size: 4.8vw;
    line-height: 7.2vw;
  }
`;
const Image = styled.img`
  width: 37.5vw;
  ${media.fullWidth} {
    width: 540px;
  }
  ${media.tablet} {
    width: 52.734vw;
  }
  ${media.mobile} {
    width: 90vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
