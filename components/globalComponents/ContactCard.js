import React, { useState } from 'react';
import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import RichTextRenderer from '../renderers/RichTextRenderer';
// import emailIcon from "images/EmailIcon.webp";
// import orangeEmailIcon from "images/orangeEmailIcon.webp";
import Image from '@/components/globalComponents/Image';
const ContactCard = ({ blok }) => {
  const [active, setActive] = useState(false);
  console.log(blok.headshot[0].media);
  return (
    <CardWrapper
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ImageWrapper>
        <Image images={blok.headshot[0].media} alt={'contact portrait'} />
      </ImageWrapper>
      <TextContent>
        <NameAndTitle>
          <RichWrapper>
          <RichTextRenderer document={blok?.contactee} />
          </RichWrapper>
          <RichTextRenderer document={blok?.position} />
        </NameAndTitle>
        <EmailDiv>
          {/* <EmailIcon
            src={active ? orangeEmailIcon : emailIcon}
            alt={"Email Tag"}
          /> */}
          <Email href={`mailto:${blok?.email.url}`} $active={active}>
            {blok.email.url}
          </Email>
        </EmailDiv>
      </TextContent>
    </CardWrapper>
  );
};

export default ContactCard;

const RichWrapper = styled.div`
  margin-bottom: 0.5vw;
`
const ImageWrapper = styled.div`
  width: 11.25vw;
  height: 11.25vw;
`;
const Email = styled.a`
  text-decoration: none;
  ${text.bodySmBold};
  color: ${(props) =>
    props.$active ? `${colors.primaryOrange}` : `${colors.grey500}`};
`;
const EmailIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;
  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;
const EmailDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  ${media.fullWidth} {
    gap: 16px;
  }

  ${media.tablet} {
    gap: 1.563vw;
  }

  ${media.mobile} {
    gap: 1.869vw;
  }
`;
const NameAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.5vw;
  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5vw;
  }
`;

const CardWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 38.5vw;
  padding: 1.5vw;
  gap: 0.5vw;
  background-color: ${colors.lightPurpleGrey};
  border-radius: 0.375vw;
  &:hover {
    /* background-color: ${colors.grey75}; */
    -webkit-box-shadow: 0.139vw 0.903vw 1.389vw 0.069vw rgba(0, 0, 0, 0.17);
    box-shadow: 0.139vw 0.903vw 1.389vw 0.069vw rgba(0, 0, 0, 0.17);
    transition-duration: 0.75s;
  }
  ${media.fullWidth} {
    width: 616px;
    padding: 24px;
    gap: 8px;
    border-radius: 6px;
  }

  ${media.tablet} {
    width: 50%;
    padding: 2.344vw;
    gap: 0.781vw;
    border-radius: 0.586vw;
  }

  ${media.mobile} {
    width: 100%;
    padding: 4.206vw 2.804vw;
    gap: 1.667vw;
    border-radius: 1.25vw;
  }
`;
