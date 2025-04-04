import React from 'react';

import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import PDFFooter from './PDFFooter';

const TableOfContents = () => {
  const contents = [
    {
      header: 'Your Estimated Savings with PrinterLogic',
      number: 4,
      list: [
        {
          point: 'Your Total Projected Cost Savings',
        },
        {
          point: 'Your Total Projected Productivity Savings',
        },
        {
          point: 'Your Total Carbon Emissions Reduction',
        },
      ],
    },
    {
      header: 'Eliminating Your Print Servers',
      number: 5,
      list: [
        {
          point: 'The Average Cost of a Print Server',
        },
        {
          point: 'The Cost of a Security Breach',
        },
        {
          point: 'The Impact Print Servers Have on Your Carbon Footprint',
        },
      ],
    },
    {
      header: 'Minimizing Wasted Productivity',
      number: 7,
      list: [
        {
          point: 'Productivity Loss from Print-Related Helpdesk Tickets',
        },
        {
          point: 'Productivity Loss from Failed Printer Deployments',
        },
        {
          point: 'Productivity Loss from Printer Driver Updates',
        },
        {
          point: 'The Costs of Print-Related Productivity Loss',
        },
      ],
    },
    {
      header: 'Reducing Consumable Waste',
      number: 10,
      list: [
        {
          point: 'The Impact of Enforcing Print Policies',
        },
        {
          point: 'The Benefits of Pull Printing',
        },
        {
          point: 'The Benefits of Print Visibility',
        },
        {
          point: 'The Impact Printers Have on Your Carbon Footprint',
        },
      ],
    },
    {
      header: 'Frequently Asked Questions',
      number: 13,
      list: [
        {
          point: 'Should I eliminate my print servers?',
        },
        {
          point: 'What are the benefits of eliminating print servers?',
        },
        {
          point: 'What are the financial costs of print servers?',
        },
        {
          point: 'How does PrinterLogic help me reduce IT helpdesk tickets?',
        },
      ],
    },
  ];

  const allContent = contents.map((tocSection) => (
    <TOCSection>
      <SectionHeaderDiv>
        <SectionHeader>{tocSection.header}</SectionHeader>
        <SectionNumber>{tocSection.number}</SectionNumber>
      </SectionHeaderDiv>
      <SectionList>
        {tocSection.list.map((point) => (
          <SectionPoint>{point.point}</SectionPoint>
        ))}
      </SectionList>
    </TOCSection>
  ));
  return (
    <Wrapper>
      <HeaderDiv>
        <Star src='/images/BusinessCaseTool/OrangeStar.webp' alt='Star' />
        <Header>Table of Contents</Header>
      </HeaderDiv>
      <TableOfContent>{allContent}</TableOfContent>
      <PDFFooter>3</PDFFooter>
    </Wrapper>
  );
};

const SectionPoint = styled.li`
  ${text.bodyLg};
  color: ${colors.grey600};
`;
const SectionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.111vw;

  ${media.fullWidth} {
    gap: 16px;
  }

  li::marker {
    color: ${colors.lightPurple};
  }
`;

const SectionNumber = styled.p`
  ${text.h4};
  color: ${colors.lightPurple};
  margin-left: auto;
`;
const SectionHeader = styled.h3`
  ${text.pdfH3};
`;
const SectionHeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TOCSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.111vw;

  ${media.fullWidth} {
    gap: 16px;
  }
`;
const TableOfContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.431vw;
  margin: 5.625vw 0 0 6.6vw;
  width: 50.139vw;

  ${media.fullWidth} {
    gap: 35px;
    margin: 81px 0 0 95px;
    width: 722px;
  }
`;
const Header = styled.h1`
  ${text.pdfH1};
  color: ${colors.primaryPurple};
`;
const Star = styled.img`
  width: 3.859vw;
  height: 3.859vw;

  ${media.fullWidth} {
    width: 56px;
    height: 56px;
  }
`;
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.431vw;

  ${media.fullWidth} {
    gap: 35px;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: url('/images/BusinessCaseTool/TOCBG.webp');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 129.167vw;
  padding: 15.069vw 12.847vw 0 16.806vw;

  ${media.fullWidth} {
    width: 1440px;
    height: 1860px;
  }
`;
export default TableOfContents;
