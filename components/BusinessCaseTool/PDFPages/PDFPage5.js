import React from 'react';
import PDFFooter from './PDFFooter';

import {
  Text,
  Strong,
  Italic,
  PurpleHeader,
  PageWrapper,
  BodyHeadline,
  TableData,
  TableHeader,
  TabTableHeader,
  TabTableHeaderRow,
  TabTable,
  TableHeaderRow,
  TableRow,
  Link,
  formatNumber,
  StatTable,
  StatHeader,
  StatsContainer,
  StatDiv,
  Stat,
  StatCopy,
  printServerCost,
  currencyConverter
} from 'components/BusinessCaseTool/PDFComponents';

const PDFPage5 = ({ savingsFormData, currency }) => {
  const { serverQty } = savingsFormData;

  return (
    <PageWrapper>
      <PurpleHeader>2. Eliminating Your Print Servers</PurpleHeader>
      <Italic>
        If you currently utilize unmanaged direct IP or virtual servers in your
        print environment, or marked “0” for your total number of print servers,
        move on to Section 3.
      </Italic>
      <Text>
        Print servers are a legitimate pain for anyone responsible for them. Not
        only do they need energy to run and cool, but they also force your IT
        team to spend too much time updating and installing patches. Plus, you
        waste time and money on procuring and maintaining them.  
      </Text>
      <Text>
        Another reason to consider moving away from print servers is due to{' '}
        <Link href='https://learn.microsoft.com/en-us/lifecycle/announcements/windows-server-2012-r2-end-of-support'>
          Windows Server 2012 and 2012 R2 reaching their end of support
        </Link>
        , meaning your organization's IT infrastructure could be at risk if
        changes aren’t made quickly. So what's your next move?  Will you pay to
        update to Windows 2022 and keep using servers? Or are you looking for
        new solutions that accelerate your move to the cloud? Whatever your
        decision is, the goal is to help you weigh the pros and cons of servers
        and make the best decision for your organization.
      </Text>
      <BodyHeadline>The Average Cost of a Print Server</BodyHeadline>
      <Text>
        According to{' '}
        <Link href='https://quocirca.com/content/universal-print-cloud-momentum/'>
          Quocirca’s Cloud Print Services Study
        </Link>
        , the cost of acquiring and provisioning a print server hovers near {' '}   
        {currency}{currencyConverter(2300, currency)}. They also require ongoing running costs of close to  {' '}   
        {currency}{currencyConverter(1800, currency)} per
        year and incur costs of {' '}   
        {currency}{currencyConverter(800, currency)} annually in energy and security, according
        to{' '}
        <Link href='https://www.manxtechgroup.com/how-much-will-a-server-cost-uk/'>
          Manxtech
        </Link>
        .{' '}
        <Link href='https://www.servermonkey.com/blog/when-to-replace-a-business-server-5-signs-its-time.html#:~:text=Some%20IT%20professionals%20recommend%20replacing,5%20years%2C%20depending%20on%20usage.'>
          Server Monkey
        </Link>{' '}
        suggests that the traditional industry standard for server replacements
        has been 3-5 years, meaning{' '}
        <Strong>
          each of your print servers costs you over {' '}   
        {currency}{currencyConverter(15300, currency)} to procure and
          maintain over five years
        </Strong>
        —a cost that PrinterLogic customers can eliminate entirely.
      </Text>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>Year 1</TabTableHeader>
          <TabTableHeader>Year 3</TabTableHeader>
          <TabTableHeader>Year 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Print Server Savings</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Total from Eliminating Servers</TableData>
          <TableData>{currency}{formatNumber(serverQty * printServerCost(currency))}</TableData>
          <TableData>{currency}{formatNumber(serverQty * printServerCost(currency) * 3)}</TableData>
          <TableData>
            {currency}{formatNumber(serverQty * printServerCost(currency) * 5 + serverQty * 1300)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        In the above table, you can see that PrinterLogic could{' '}
        <Strong>
          save you {currency}{formatNumber(serverQty * printServerCost(currency) * 5 + serverQty * 1300)} in five years if you remove your {serverQty} servers.
        </Strong>
      </Text>
      <StatTable>
        <StatHeader>KEY FIGURES ABOUT ELIMINATING PRINT SERVERS</StatHeader>
        <StatsContainer>
          <StatDiv>
            <Stat>{currency}{currencyConverter(2200, currency)}</Stat>
            <StatCopy>The cost to buy and maintain a print server</StatCopy>
          </StatDiv>
          <StatDiv>
            <Stat>{currency}{currencyConverter(1600, currency)}</Stat>
            <StatCopy>The annual cost of ongoing management</StatCopy>
          </StatDiv>
          <StatDiv>
            <Stat>{currency}{currencyConverter(800, currency)}</Stat>
            <StatCopy>
              The yearly power and security costs of print servers
            </StatCopy>
          </StatDiv>
        </StatsContainer>
      </StatTable>
      <PDFFooter>5</PDFFooter>
    </PageWrapper>
  );
};

export default PDFPage5;
