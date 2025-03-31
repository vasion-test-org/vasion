'use client'
import React from "react";
import media from "styles/media";
import text from "styles/text";
import colors from "styles/colors";
import styled from "styled-components";
import RichTextRenderer from "./renderers/RichTextRenderer";
import Image from "./globalComponents/Image";
import Button from "./globalComponents/Button";
// import { ReactComponent as ArrowLinkSVG } from "images/linkArrow.svg";

// import Pill from "components/Pill";

const FeaturedCard = ({ blok }) => {
  // console.log(blok)
  return (
    <Wrapper>
      <CardWrapper>
      <ImageWrapper>
        <Image
                    images={blok.event_image[0].media}
                 
                  />
      </ImageWrapper>
      <Content>
        <HeaderAndTag>
          {/* <Pill
            backgroundColor={featuredCard?.tagBackground}
            htmlContent={featuredCard?.tag}
          /> */}
          <RichTextRenderer document={blok?.header}/>
        </HeaderAndTag>
        <DateAndTime>
          <IconAndText>
            <Icon src='/images/locationOn.webp' alt={"Nav Pin"} />
            <RichTextRenderer document={blok?.location}/>
          </IconAndText>
          <IconAndText>
            <Icon src='/images/calendarClock.webp' alt={"Calendar"} />
            <RichTextRenderer document={blok?.date}/>
          </IconAndText>
        </DateAndTime>
        <RichTextRenderer document={blok?.body_copy}/>
        <Button $buttonData={blok.button[0]}/>
      </Content>
      </CardWrapper>
    </Wrapper>
  );
};
export default FeaturedCard;
const ImageWrapper = styled.div`
  /* overflow: hidden; */
  /* width: 28.75vw;
  height: 19.125vw; */
  border-radius: 0.375vw;
`

const IconAndText = styled.div`
  display: flex;
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
const DateAndTime = styled.div`
  display: flex;
  flex-direction: column;
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

const HeaderAndTag = styled.div`
  display: flex;
  flex-direction: column;
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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;

  ${media.fullWidth} {
    gap: 16px;
  }
  ${media.tablet} {
    gap: 1.563vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
  }
`;

const Icon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }
  ${media.tablet} {
    width: 1.25vw;
    height: 1.25vw;
  }
  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;

const CardWrapper = styled.div`
   display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  margin-top: 2.5vw;
  width: 81.5vw;

  ${media.fullWidth} {
    gap: 32px;
    margin-top: 40px;
    width: 1304px;
  }
  ${media.tablet} {
    gap: 3.125vw;
    margin-top: 3.906vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
    margin-top: 8.333vw;
    flex-direction: column;
  }
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
