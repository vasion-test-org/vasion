import React from "react";
import media from "styles/media";
import text from "styles/text";
import colors from "styles/colors";
import styled from "styled-components";
import calendarClock from "images/calendarClock.webp";
import locationOn from "images/locationOn.webp";
import { ReactComponent as ArrowLinkSVG } from "images/linkArrow.svg";

// import Pill from "components/Pill";

const FeaturedCard = ({ featuredCard }) => {
  return (
    <Wrapper>
      <EventImageWrapper
        desktopSrc={featuredCard?.image?.sourceUrl}
        mobileSrc={featuredCard?.mobileImage?.sourceUrl}
        alt={featuredCard?.altText}
      />
      <Content>
        <HeaderAndTag>
          {/* <Pill
            backgroundColor={featuredCard?.tagBackground}
            htmlContent={featuredCard?.tag}
          /> */}
          <Header>{featuredCard?.header}</Header>
        </HeaderAndTag>
        <DateAndTime>
          <IconAndText>
            <Icon src={locationOn} alt={"Nav Pin"} />
            <TextContent>{featuredCard?.location}</TextContent>
          </IconAndText>
          <IconAndText>
            <Icon src={calendarClock} alt={"Calendar"} />
            <TextContent>{featuredCard?.date}</TextContent>
          </IconAndText>
        </DateAndTime>
        <TextContent>{featuredCard?.body}</TextContent>
        <LargeLink
          href={featuredCard?.linkUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {featuredCard?.linkText}
          <ArrowLink />
        </LargeLink>
      </Content>
    </Wrapper>
  );
};
export default FeaturedCard;
const TextContent = styled.p`
  ${text.bodyMd};
  color: ${colors?.txtSubtle};
  max-width: 48.25vw;

  ${media.fullWidth} {
    max-width: 772px;
  }
  ${media.tablet} {
    max-width: 40.234vw;
  }
  ${media.mobile} {
    max-width: 86.458vw;
  }
`;

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
const Header = styled.h4`
  ${text.h4};
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
const EventImageWrapper = styled.div`
  background-image: url(${(props) => props.desktopSrc});
  background-size: cover;
  background-position: center;
  width: 28.75vw;
  height: 19.125vw;

  ${media.fullWidth} {
    width: 460px;
    height: 306px;
  }
  ${media.tablet} {
    width: 44.922vw;
    height: 29.883vw;
  }
  ${media.mobile} {
    background-image: url(${(props) => props.mobileSrc});
    width: 86.458vw;
    height: 40.417vw;
  }
`;
const ArrowLink = styled(ArrowLinkSVG)`
  width: 0.556vw;
  height: 0.556vw;
  margin-left: 0.556vw;
  transition: transform 0.3s ease-in-out;
  ${media.fullWidth} {
    width: 8px;
    height: 8px;
    margin-left: 8px;
  }

  ${media.tablet} {
    width: 0.781vw;
    height: 0.781vw;
    margin-left: 0.781vw;
  }

  ${media.mobile} {
    width: 1.869vw;
    height: 1.869vw;
    margin-left: 1.869vw;
  }
  path {
    fill: ${(props) => (props.color ? props.color : colors.primaryOrange)};
  }
`;

const LargeLink = styled.a`
  position: relative;
  ${text.bodyMd}
  text-decoration: none;
  width: fit-content;
  color: ${colors?.primaryOrange};
  border-color: ${colors?.primaryOrange};
  border: 0.063vw solid #ff5100;
  padding: 0.75vw 1vw;
  border-radius: 1.75vw;
  transition: background .2s ease;
  margin-top: 2vw;

${media.fullWidth}{
  border: 1px solid #ff5100;
  padding: 12px 16px;
  border-radius: 28px;
  transition: background .2s ease;
  margin-top: 32px;
}
${media.tablet}{
  border: 0.098vw solid #ff5100;
  padding: 1.172vw 1.563vw;
  border-radius: 2.734vw;
  transition: background .2s ease;
  margin-top: 3.125vw;
}
${media.mobile}{
  border: 0.208vw solid #ff5100;
  padding: 2.5vw 3.333vw;
  border-radius: 5.833vw;
  transition: background .2s ease;
  margin-top: 6.667vw;
}
  ${media.hover} {
    &&:hover {
    background: ${colors?.primaryOrange};
    color:${colors?.white};
    ${ArrowLink} {
      path{
      fill: ${colors?.white};
    }
    transform: translateX(5px);
    transition: transform 750ms ease-in-out;
  }
  ${ArrowLink} {
    transition: transform 750ms ease;
  }
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
  margin-top: 2.5vw;

  ${media.fullWidth} {
    gap: 32px;
    margin-top: 40px;
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
`;
