import React from 'react';

import {
  BodyHeadline,
  currencyConverter,
  formatNumber,
  Link,
  PageWrapper,
  Stat,
  StatCopy,
  StatDiv,
  StatHeader,
  StatsContainer,
  StatTable,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableRow,
  TabTable,
  TabTableHeader,
  TabTableHeaderRow,
  Text,
} from 'components/BusinessCaseTool/PDFComponents';

import PDFFooter from './PDFFooter';

const PDFPage9 = ({ currency, savingsFormData }) => {
  const { adminPay, itPay, printerQty, resolveTickets, tickets } = savingsFormData;

  return (
    <PageWrapper>
      <BodyHeadline>Your Projected Savings from Reducing IT Helpdesk Tickets</BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>

        <TableHeaderRow>
          <TableHeader>Productivity Savings</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
        </TableHeaderRow>

        <TableRow>
          <TableData>Low (30%)</TableData>
          <TableData>{formatNumber((tickets * 0.4 * resolveTickets * 0.3) / 60)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.3) / 60) * (parseInt(itPay) + parseInt(adminPay))
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.3) / 60) * 3)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.3) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                3
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.3) / 60) * 5)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.3) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                5
            )}
          </TableData>
        </TableRow>

        <TableRow>
          <TableData>Medium (50%)</TableData>
          <TableData>{formatNumber((tickets * 0.4 * resolveTickets * 0.5) / 60)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.5) / 60) * (parseInt(itPay) + parseInt(adminPay))
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.5) / 60) * 3)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.5) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                3
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.5) / 60) * 5)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.5) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                5
            )}
          </TableData>
        </TableRow>

        <TableRow>
          <TableData>High (90%)</TableData>
          <TableData>{formatNumber((tickets * 0.4 * resolveTickets * 0.9) / 60)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.9) / 60) * (parseInt(itPay) + parseInt(adminPay))
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.9) / 60) * 3)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.9) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                3
            )}
          </TableData>
          <TableData>{formatNumber(((tickets * 0.4 * resolveTickets * 0.9) / 60) * 5)}</TableData>
          <TableData>
            {currency}
            {formatNumber(
              ((tickets * 0.4 * resolveTickets * 0.9) / 60) *
                (parseInt(itPay) + parseInt(adminPay)) *
                5
            )}
          </TableData>
        </TableRow>
      </TabTable>

      <Text>
        In the table above, you can see how many hours you can save for both IT support and admin
        staff if you reduce your print-related issues by 30%, 50%, or 90%. Additionally, you
        eliminate the total cost of those wasted hours—an expense you can reinvest into
        revenue-generating tasks.
      </Text>

      <StatTable>
        <StatHeader>KEY FIGURES ABOUT PRINT-RELATED HELPDESK CALLS</StatHeader>
        <StatsContainer>
          <StatDiv>
            <Stat>40%</Stat>
            <StatCopy>The percentage of helpdesk calls that are print-related</StatCopy>
          </StatDiv>
          <StatDiv>
            <Stat>
              {currency}
              {currencyConverter(22, currency)}
            </Stat>
            <StatCopy>The average salary of an admin</StatCopy>
          </StatDiv>
          <StatDiv>
            <Stat>2 hours</Stat>
            <StatCopy>The average time it takes to resolve a print-related ticket</StatCopy>
          </StatDiv>
        </StatsContainer>
      </StatTable>
      <BodyHeadline>Your Projected Savings from Reducing Printer Driver Updates</BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader colspan="2">TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>

        <TableHeaderRow>
          <TableHeader>Productivity Savings</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Productivity Savings (Hours)</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
        </TableHeaderRow>

        <TableRow>
          <TableData>Low (30%)</TableData>
          <TableData>{formatNumber((printerQty * 15) / 60)}</TableData>
          <TableData>
            {currency}
            {formatNumber(((printerQty * 15) / 60) * itPay)}
          </TableData>
          <TableData>{formatNumber(((printerQty * 15) / 60) * 3)}</TableData>
          <TableData>
            {currency}
            {formatNumber(((printerQty * 15) / 60) * itPay * 3)}
          </TableData>
          <TableData>{formatNumber(((printerQty * 15) / 60) * 5)}</TableData>
          <TableData>
            {currency}
            {formatNumber(((printerQty * 15) / 60) * itPay * 5)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        The table above shows the time spent updating drivers once a year and its resulting costs.
        We estimate that it takes{' '}
        <Link href="https://theprinterjam.com/how-long-to-install-a-printer-driver/">
          five to 15 minutes to update a printer driver
        </Link>
        ; however, PrinterLogic updates your printer drivers automatically, nearly eliminating the
        time spent on this task
      </Text>
      <BodyHeadline>Curious how we got these numbers?</BodyHeadline>
      <Text>
        It was a tricky equation, but our team gathered research from trusted sources to give you
        the most reasonable cost savings according to your provided information. Explore the rest of
        the document to discover how we calculated your print savings after eliminating your print
        servers with PrinterLogic.
      </Text>
      <PDFFooter>9</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage9;
