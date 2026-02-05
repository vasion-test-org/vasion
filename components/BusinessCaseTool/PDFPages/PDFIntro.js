import React from 'react';

import {
  BodyHeadline,
  currencyConverter,
  formatNumber,
  Stat,
  StatDiv,
  StatHeader,
  StatsContainer,
  StatTable,
  Text,
} from 'components/BusinessCaseTool/PDFComponents';
import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

import PDFFooter from './PDFFooter';

const PDFIntro = ({ currency, savingsFormData }) => {
  return (
    <Wrapper>
      <Header>Introduction</Header>
      <BodyCopy>
        Cost-saving strategies are crucial to maintaining a healthy bottom line. However,
        traditional print environments have consistently been a blurry area where expenses add up
        but are difficult to pinpoint. Today, cloud initiatives have challenged IT teams to
        demonstrate the cost reductions of advanced print infrastructures compared to legacy
        systems. 
      </BodyCopy>
      <BodyCopy>That's where we come in. </BodyCopy>
      <BodyCopy>
        We've captured the complex data for you so you can deliver a compelling business case on the
        financial impact of traditional print architecture to senior leadership. This detailed guide
        underscores the benefits of moving to PrinterLogic. It also introduces your potential short-
        and long-term savings to quantify the impact of your current print environment.
      </BodyCopy>
      <Table>
        <TableRow>
          <TableHeader>KEY QUESTIONS</TableHeader>
          <TableHeader>YOUR ANSWERS</TableHeader>
        </TableRow>
        <TableRow>
          <TableData>How many print servers do you have?</TableData>
          <TableDataResult>{formatNumber(savingsFormData?.serverQty)}</TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How much does it cost you to procure a print server?</TableData>
          <TableDataResult>
            {currency}
            {formatNumber(savingsFormData?.serverCost)}
          </TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How many helpdesk tickets does your team receive yearly?</TableData>
          <TableDataResult>{formatNumber(savingsFormData?.tickets)}</TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How long does it take to resolve helpdesk tickets? (in Minutes)</TableData>
          <TableDataResult>{formatNumber(savingsFormData?.resolveTickets)}</TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>What is the average hourly wage for your IT Helpdesk team members?</TableData>
          <TableDataResult>
            {currency}
            {formatNumber(savingsFormData?.itPay)}
          </TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>What is the average hourly wage for your administrative staff?</TableData>
          <TableDataResult>
            {currency}
            {formatNumber(savingsFormData?.adminPay)}
          </TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How many printers do you have?</TableData>
          <TableDataResult>{formatNumber(savingsFormData?.printerQty)}</TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How much do you spend on each printer over its lifetime?</TableData>
          <TableDataResult>
            {currency}
            {formatNumber(savingsFormData?.printerCost)}
          </TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>How many pages are printed in your organization per year?</TableData>
          <TableDataResult>{formatNumber(savingsFormData?.pagesPrinted)}</TableDataResult>
        </TableRow>
        <TableRow>
          <TableData>What is your average cost per printed page?</TableData>
          <TableDataResult>
            {currency}
            {savingsFormData?.pageCost}
          </TableDataResult>
        </TableRow>
      </Table>
      {/* <StatTable>
        <StatHeader>YOUR ESTIMATED PRINT SAVINGS WITH PRINTERLOGIC</StatHeader>
        <StatsContainer>
          <StatDiv>
            <Stat>{currency}{currencyConverter(2200, currency)}</Stat>
          </StatDiv>
        </StatsContainer>
      </StatTable>
      <BodyHeadline>Curious how we got these numbers?</BodyHeadline>
      <Text>
        It was a tricky equation, but our team gathered research from trusted
        resources to give you the most reasonable cost savings according to your
        provided information. Explore the rest of the document to discover how
        we calculated your print savings after eliminating your print servers
        with PrinterLogic.
      </Text> */}
      <PDFFooter>2</PDFFooter>
    </Wrapper>
  );
};

const TableDataResult = styled.td`
  ${text.h4};
  color: ${colors.primaryPurple};
  background-color: ${colors.lightPurpleGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
`;
const TableData = styled.td`
  ${text.h5};
  color: ${colors.primaryPurple};

  ${media.mobile} {
    ${text.h4};
  }
`;
const TableHeader = styled.th`
  ${text.bodySmBold};
  color: ${colors.primaryPurple};
  border-bottom: 0.069vw solid ${colors.primaryPurple};
`;
const TableRow = styled.tr`
  height: 4.861vw;

  ${media.fullWidth} {
    height: 70px;
  }
`;
const Table = styled.table`
  align-self: center;
  width: 75vw;
  margin: 4.306vw 0 7.986vw 0;

  ${media.fullWidth} {
    width: 1080px;
    margin: 62px 0 115px 0;
  }
`;
const BodyCopy = styled.p`
  ${text.bodyLg};
  margin-bottom: 1.042vw;

  ${media.fullWidth} {
    margin-bottom: 15px;
  }
`;
const Header = styled.h2`
  ${text.pdfH1};
  color: ${colors.primaryPurple};
  margin-bottom: 1.736vw;

  ${media.fullWidth} {
    margin-bottom: 25px;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 129.167vw;
  padding: 11.111vw 11.569vw 0 11.569vw;

  ${media.fullWidth} {
    width: 1440px;
    height: 1860px;
    padding: 160px 167px 0 167px;
  }
`;
export default PDFIntro;
