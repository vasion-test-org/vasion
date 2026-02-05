import React from 'react';

import {
  BodyHeadline,
  ListItem,
  OrderedList,
  PageWrapper,
  Strong,
  Text,
} from 'components/BusinessCaseTool/PDFComponents';
import styled from 'styled-components';
// import StyledLink from 'components/StyledLink';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

import PDFFooter from './PDFFooter';

const PDFPage17 = () => {
  return (
    <PageWrapper>
      <BodyHeadline>
        <Strong>Q:</Strong> How does PrinterLogic help me rationalize my print fleet?
      </BodyHeadline>
      <CustomStrong>
        Here are five features from PrinterLogic that can help organizations identify underutilized
        printers:
      </CustomStrong>
      <OrderedList>
        <ListItem>
          <Strong>Printer Usage Reports: </Strong> PrinterLogic offers detailed usage reports that
          track printer usage across the organization. These reports can help identify underutilized
          printers that may be candidates for removal or consolidation.
        </ListItem>
        <ListItem>
          <Strong>Printer Mapping: </Strong> PrinterLogic allows organizations to map printers to
          specific users or groups. This feature can help identify assigned printers to users who no
          longer need them or groups that have too many printers assigned to them.
        </ListItem>
        <ListItem>
          <Strong>Centralized Management: </Strong> PrinterLogic provides a centralized management
          console that allows administrators to manage all their printers from a single interface,
          making it easy to identify unused printers.
        </ListItem>
        <ListItem>
          <Strong>Print Queue Management: </Strong> PrinterLogic offers advanced print queue
          management features that allow administrators to monitor print queues, view job histories,
          and identify unused printers.
        </ListItem>
        <ListItem>
          <Strong>Automated Printer Deployments: </Strong> PrinterLogic's automated printer
          deployment feature allows administrators to automatically deploy printers to users or
          groups based on specific criteria. Admins can set up deployments based on IP address to
          give users access to printers on the go, which is particularly useful for roaming nurses,
          students moving between buildings, and hybrid workers.
        </ListItem>
      </OrderedList>
      {/* <CTASection>
        <ContentContainer>
          <BodyHeadline white>
            Want more information on PrinterLogic?
          </BodyHeadline>
          <Text white>
            Explore our recent customer reviews and in-depth content to help you
            make informed decisions about SaaS print management.
          </Text>
        </ContentContainer>
        <CTAContainer>
          <CardLink href='https://vasion.drift.click/how_to_convince_your_boss'>
            <CTA>
              <CTAEyebrow>GUIDE</CTAEyebrow>
              <CTAHeader>
                How to Convince Your Boss You Need PrinterLogic
              </CTAHeader>
              <CTABody>
                Follow our 6-step guide to persuade your boss that going
                serverless is the only way.
              </CTABody>
              <StyledLink href='https://vasion.drift.click/how_to_convince_your_boss'>
                Read the Guide
              </StyledLink>
            </CTA>
          </CardLink>

          <CardLink href='https://info.printerlogic.com/rs/338-HTA-134/images/170619_WP___Eliminating_Print_Servers.pdf'>
            <CTA>
              <CTAEyebrow>WHITE PAPER</CTAEyebrow>
              <CTAHeader>Eliminating Print Servers</CTAHeader>
              <CTABody>
                Get a technical overview of “why” and “how” PrinterLogic
                eliminates print servers for IT pros like you.
              </CTABody>
              <StyledLink href='https://info.printerlogic.com/rs/338-HTA-134/images/170619_WP___Eliminating_Print_Servers.pdf'>
                Read the White Paper
              </StyledLink>
            </CTA>
          </CardLink>

          <CardLink href='https://www.g2.com/products/printerlogic/reviews'>
            <CTA>
              <CTAEyebrow>Customer Reviews</CTAEyebrow>
              <CTAHeader>PrinterLogic G2 Page</CTAHeader>
              <CTABody>
                Check out our badges and learn what customers are saying about
                our SaaS print management platform.
              </CTABody>
              <StyledLink href='https://www.g2.com/products/printerlogic/reviews'>
                See the Reviews
              </StyledLink>
            </CTA>
          </CardLink>
        </CTAContainer>
      </CTASection> */}
      <PDFFooter white>17</PDFFooter>
    </PageWrapper>
  );
};

const CardLink = styled.a`
  text-decoration: none;
  color: unset;
`;
const CTABody = styled.p`
  ${text.bodyMd};
`;
const CTAHeader = styled.h5`
  ${text.h5};
`;
const CTAEyebrow = styled.p`
  ${text.eyebrow};
  color: ${colors.grey200};
  margin-bottom: 0.694vw;

  ${media.fullWidth} {
    margin-bottom: 10px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const CTA = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  height: 100%;
  padding: 3.472vw 1.111vw;
  border-radius: 0.972vw;
  width: 23.681vw;
  gap: 1.389vw;

  ${media.fullWidth} {
    padding: 50px 16px;
    border-radius: 14px;
    width: 341px;
    gap: 20px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const CTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: min-content;
  gap: 1.806vw;

  ${media.fullWidth} {
    gap: 26px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const ContentContainer = styled.div`
  width: 74.837vw;

  ${media.fullWidth} {
    width: 1078px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const CTASection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/images/BusinessCaseTool/CtaBackground.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 20px;
  padding-top: 6.111vw;
  gap: 4.167vw;
  width: 100vw;
  height: 61.208vw;
  left: -12.55vw;

  ${media.fullWidth} {
    gap: 60px;
    width: 1440px;
    height: 881px;
    left: -181px;
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
const CustomStrong = styled(Strong)`
  margin-bottom: 1.389vw;

  ${media.fullWidth} {
    margin-bottom: 20px;
  }
`;
export default PDFPage17;
