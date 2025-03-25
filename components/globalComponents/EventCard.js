import React from 'react';
import media from '@/styles/media';
import text from '@/styles/text';
import colors from '@/styles/colors';
import styled from 'styled-components';
import Button from '@/components/globalComponents/Button';
import RichTextRenderer from '../renderers/RichTextRenderer';

const EventCard = ({ content, even }) => {
  console.log(even);
  return (
    <Wrapper even={even}>
      <EventInfoContainer>
        <EventImage src={content.icon.filename} />
        <EventContent>
          <HeaderContainer>
            <RichTextRenderer document={content.header} />
          </HeaderContainer>
          <RichTextRenderer document={content.event_summary} />
        </EventContent>
      </EventInfoContainer>
      <DetailsContainer>
        <Details>
          <DetailDiv>
            <DetailIcon src='/images/locationOn.webp' />
            <RichTextRenderer document={content.location}/>
          </DetailDiv>
          <DetailDiv>
            <DetailIcon src='/images/calendarClock.webp' />
            <RichTextRenderer document={content.date}/>
          </DetailDiv>
        </Details>
        {content.link[0] &&
         <Button $buttonData={content.link[0]} />
       }
      </DetailsContainer>
    </Wrapper>
  );
};

const DetailIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;
`;
const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
`;
const EventImage = styled.img`
  width: 3.625vw;
  height: 3.625vw;
`;
const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2vw 1.5vw;
  width: 100%;
  gap: 16.25vw;
  background: ${(props) => (props.even ? colors.lightPurpleGrey : colors.white)};
`;
export default EventCard;
