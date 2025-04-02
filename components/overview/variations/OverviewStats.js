import React, { useEffect, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import gsap from "gsap";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";

const OverviewStats = ({ blok }) => {
  console.log("stats-blok", blok);
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileClick = () => {
    if (isOpen) {
      setIsOpen(false);
      gsap.to(".stats-overview-visibility", {
        autoAlpha: 0,
        height: 0,
        duration: 0.5,
      });
    } else {
      setIsOpen(true);
      gsap.to(".stats-overview-visibility", {
        autoAlpha: 1,
        height: "auto",
        duration: 0.5,
      });
    }
  };

  const statlist = blok?.stat_list?.map((item) => {
    return (
      <StatItem key={item._uid}>
        <StatHeadline>{item?.headline}</StatHeadline>
        <StatBody>
          <RichTextRenderer document={item?.body_copy} />
        </StatBody>
      </StatItem>
    );
  });

  const calloutList = blok?.overview_callout_list?.map((item) => {
    return (
      <CalloutItem key={item._uid}>
        <Icon src={item?.icon?.filename} alt={item?.icon?.alt} />
        <CalloutBody>
          <RichTextRenderer document={item?.body_copy} />
        </CalloutBody>
      </CalloutItem>
    );
  });

  return (
    <Wrapper $isopen={isOpen}>
      <ContentWrapper $isopen={isOpen}>
        <HeaderDiv>
          <Headline>{blok?.headline}</Headline>
          <ExpandCollapseIcon
            src={
              isOpen
                ? "/images/uiElements/closeVector.webp"
                : "/images/uiElements/OpenBtn"
            }
            alt={isOpen ? "close-btn" : "open-btn"}
            $isopen={isOpen}
            className={"stats-overview-close"}
            onClick={handleMobileClick}
          />
        </HeaderDiv>

        <StatItemsContainer className="stats-overview-visibility">
          {statlist}
        </StatItemsContainer>
      </ContentWrapper>
      {calloutList && calloutList.length > 0 && (
        <CalloutWrapper className="stats-overview-visibility" $isopen={isOpen}>
          <ImageHeadline
            src={blok?.callout_logo_header?.filename}
            alt={blok?.callout_logo_header?.alt}
          />
          {<CalloutListContainer>{calloutList}</CalloutListContainer>}
        </CalloutWrapper>
      )}
    </Wrapper>
  );
};

export default OverviewStats;

const CalloutBody = styled.div`
  ${text.bodySm};
`;
const Icon = styled.img`
  width: 1.389vw;
  height: 1.389vw;
  display: none;

  ${media.mobile} {
    display: flex;
    width: 4.673vw;
    height: 4.673vw;
  }
`;
const CalloutItem = styled.div`
  display: flex;
  align-items: center;

  ${media.mobile} {
    display: flex;
    gap: 0.935vw;
  }
`;
const CalloutListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.278vw;
  ${media.fullWidth} {
    gap: 4px;
  }

  ${media.tablet} {
    gap: 0.391vw;
  }

  ${media.mobile} {
    gap: 1.869vw;
  }
`;
const ImageHeadline = styled.img`
  width: 10.347vw;
  height: 2.083vw;

  ${media.fullWidth} {
    width: 149px;
    height: 30px;
  }

  ${media.tablet} {
    width: 14.551vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    width: 34.813vw;
    height: 7.009vw;
    margin-bottom: 2.804vw;
    margin-top: 9.346vw;
  }
`;
const CalloutWrapper = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;
  background-color: ${colors.lightPurpleGrey};
  width: 16.458vw;
  padding: 1.528vw 1.389vw;
  border-radius: 0.556vw;
  gap: 0.556vw;
  ${media.fullWidth} {
    width: 237px;
    padding: 22px 20px;
    border-radius: 8px;
    gap: 8px;
  }

  ${media.tablet} {
    width: 23.145vw;
    padding: 2.148vw 1.953vw;
    border-radius: 0.781vw;
    gap: 0.781vw;
  }

  ${media.mobile} {
    visibility: hidden;
    background-color: unset;
    opacity: 0;
    width: 100%;
    padding: ${(props) => (props.$isopen ? "5.14vw 4.673vw" : "unset")};
    height: 0;
  }
`;
const StatBody = styled.div`
  ${text.bodySm};

  ${media.mobile} {
    ${text.bodySm}
  }
`;

const StatHeadline = styled.p`
  ${text.h3};
  color: ${colors.primaryOrange};
`;
const StatItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 12.722vw;

  ${media.fullWidth} {
    width: 140px;
  }

  ${media.tablet} {
    width: 11.719vw;
  }

  ${media.mobile} {
    flex: unset;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${colors.lightPurpleGrey};
    padding: 2.57vw 0vw;
    width: 45.093vw;
    border-radius: 1.869vw;
  }
`;
const StatItemsContainer = styled.div`
  display: flex;
  gap: 2.5vw;

  ${media.fullWidth} {
    gap: 36px;
  }

  ${media.tablet} {
    gap: 3.516vw;
  }

  ${media.mobile} {
    visibility: hidden;
    height: 0;
    opacity: 0;
    gap: 0.935vw;
    flex-wrap: wrap;
    & > :last-child {
      width: 100%;
    }
  }
`;
const Headline = styled.h4`
  ${text.h4};
  text-wrap: nowrap;
  ${media.mobile} {
    ${text.eyebrow};
    color: ${colors.lightPurple};
  }
`;

const ExpandCollapseIcon = styled.img`
  display: none;
  ${media.mobile} {
    position: relative;
    display: inline-flex;
    left: -25px;
    width: ${(props) => (props.$isopen ? "4.297vw" : "6vw")};
    width: ${(props) => (props.$isopen ? "4.297vw" : "6vw")};
  }
`;
const HeaderDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  overflow: visible;
  text-wrap: nowrap;
  ${media.mobile} {
    width: 109%;
    padding: 9.346vw 4.673vw 4.673vw 4.673vw;
    height: 18.75vw;
    justify-content: space-between;
    background-color: #f5f4f7;
    left: -17px;
    overflow: hidden;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${colors.lightPurpleGrey};
  width: 61.389vw;
  border-radius: 0.556vw;
  padding: 2.222vw 1.389vw;
  gap: 1.389vw;

  ${media.fullWidth} {
    width: 884px;
    border-radius: 8px;
    padding: 32px 20px;
    gap: 20px;
  }

  ${media.tablet} {
    width: 68.555vw;
    border-radius: 0.781vw;
    padding: 3.125vw 1.953vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    width: 100%;
    padding: unset;
    gap: 4.673vw;
    background-color: ${(props) =>
      props.$isopen ? `${colors.white}` : "transparent"};
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  gap: 23px;
  width: 79.444vw;
  ${media.fullWidth} {
    width: 1144px;
    gap: 23px;
  }

  ${media.tablet} {
    width: 91.992vw;
    gap: 2.246vw;
  }

  ${media.mobile} {
    width: 100vw;
    gap: ${(props) => (props.$isopen ? "5.374vw" : "unset")};
    flex-direction: column;
    padding: 0vw 4.439vw;
    background-color: ${(props) =>
      props.$isopen ? `${colors.white}` : `${colors.lightPurpleGrey}`};
  }
`;
