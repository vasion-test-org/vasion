import React from 'react';

import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

const CoverPage = ({ contactFormData }) => {
  return (
    <Cover>
      <BannerImg alt="front page banner" src="/images/BusinessCaseTool/FrontPageBanner.webp" />
      <IntroDiv>
        <Title>A Business Case for PrinterLogic</Title>
        <CompanyName>Created for {contactFormData?.company}</CompanyName>
      </IntroDiv>
      <KeyContact>
        <KeyContactHeader>Your Key Contact:</KeyContactHeader>
        <KeyContactName>{contactFormData?.name}</KeyContactName>
        <KeyContactEmail>{contactFormData?.repEmail}</KeyContactEmail>
      </KeyContact>
    </Cover>
  );
};

const KeyContactEmail = styled.p`
  font-family: Archivo;
  font-size: 1.829vw;
  font-style: normal;
  font-weight: 400;
  line-height: 3.354vw;

  ${media.fullWidth} {
    font-size: 26px;
    line-height: 48px;
  }
`;
const KeyContactName = styled.p`
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  font-size: 1.829vw;
  line-height: 3.354vw;

  ${media.fullWidth} {
    font-size: 26px;
    line-height: 48px;
  }
`;
const KeyContactHeader = styled.p`
  font-family: Archivo;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  font-size: 1.524vw;
  line-height: 4.878vw; /* 320% */

  ${media.fullWidth} {
    font-size: 22px;
    line-height: 70px;
  }
`;
const KeyContact = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  gap: 1.042vw;
  margin: 0 0 0 7.292vw;

  ${media.fullWidth} {
    gap: 15px;
    margin: 0 0 0 105px;
  }
`;
const CompanyName = styled.h3`
  ${text.h3};
  font-family: Archivo;
  font-style: normal;
  font-weight: 400;
  font-size: 3.049vw;
  line-height: 8.232vw;

  ${media.fullWidth} {
    font-size: 44px;
    line-height: 119px;
  }
`;
const Title = styled.h1`
  color: ${colors.white};
  font-family: Archivo;
  font-style: normal;
  font-weight: 700;
  font-size: 8.537vw;
  line-height: 8.537vw;

  ${media.fullWidth} {
    font-size: 123px;
    line-height: 123px;
  }
`;
const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  gap: 3.472vw;
  margin: 3.472vw 0 6.944vw 7.292vw;
  width: 71.806vw;

  ${media.fullWidth} {
    gap: 50px;
    margin: 50px 0 100px 105px;
    width: 1034px;
  }
`;
const BannerImg = styled.img`
  width: 100vw;
  height: 11.111vw;
  margin-top: 14.722vw;

  ${media.fullWidth} {
    width: 1440px;
    height: 160px;
    margin-top: 212px;
  }
`;
const Cover = styled.div`
  display: flex;
  flex-direction: column;
  background: url('/images/BusinessCaseTool/FrontPageImg.webp');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 129.444vw;

  ${media.fullWidth} {
    width: 1440px;
    height: 1864px;
  }
`;
export default CoverPage;
