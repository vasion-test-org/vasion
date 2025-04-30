import React from "react";
import media from "@/styles/media";
import text from "@/styles/text";
import colors from "@/styles/colors";
import styled from "styled-components";
import Button from "@/components/globalComponents/Button";
import RichTextRenderer from "../renderers/RichTextRenderer";
import { storyblokEditable } from "@storyblok/react/rsc";

const EventCard = ({ content, even }) => {
  return (
    <Wrapper {...storyblokEditable(content)} even={even}>
      <EventInfoContainer>
        <EventImage src={content.icon.filename} />
        <EventContent>
          <HeaderContainer {...storyblokEditable(content.header)}>
            <RichTextRenderer document={content.header} />
          </HeaderContainer>
          <RichTextRenderer document={content.event_summary} />
        </EventContent>
      </EventInfoContainer>
      <DetailsContainer>
        <Details>
          <DetailDiv>
            <DetailIcon src="/images/locationOn.webp" />
            <RichTextRenderer document={content.location} />
          </DetailDiv>
          <DetailDiv>
            <DetailIcon src="/images/calendarClock.webp" />
            <RichTextRenderer document={content.date} />
          </DetailDiv>
        </Details>
        {content.link[0] && <Button $buttonData={content.link[0]} />}
      </DetailsContainer>
    </Wrapper>
  );
};

const DetailIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;
const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw; 

  ${media.mobile} {
    gap: 1.667vw;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;

  ${media.mobile} {
    gap: 1.667vw;
  }
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column;
    gap: 1.667vw;
  }

`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;
const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 18.188vw;
  gap: 0.5vw;

  ${media.mobile} {
    width: 100%;
      gap: 1.667vw;
  }
`;
const EventImage = styled.img`
  width: 3.625vw;
  height: 3.625vw;

  ${media.mobile} {
    display: none;
  }
`;
const EventInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1vw;

  ${media.mobile} {
    flex-direction: column;
    gap: 3.333vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) =>
    props.even ? colors.lightPurpleGrey : colors.white};
    width: 100%;
  padding: 2vw 1.5vw;
  gap: 16.25vw;

  ${media.fullWidth} {
    padding: 32px 24px;
    gap: 260px;
  }

  ${media.tablet} {
      padding: 3.125vw 2.344vw;
    gap: 25.391vw;
  }

  ${media.mobile} {
    align-items: flex-start;
    flex-direction: column;
    padding: 6.667vw 5vw;
    gap: 3.333vw;
  }
    
`;
export default EventCard;
