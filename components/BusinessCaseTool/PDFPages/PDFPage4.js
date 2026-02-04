import React from 'react';

import {
  BodyHeadline,
  formatNumber,
  PageWrapper,
  printServerCost,
  PurpleHeader,
  Strong,
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

const PDFPage4 = ({ currency, savingsFormData }) => {
  const {
    adminPay,
    itPay,
    pageCost,
    pagesPrinted,
    printerCost,
    printerQty,
    resolveTickets,
    serverCost,
    serverQty,
    tickets,
  } = savingsFormData;

  //total estimated savings

  const year1Savings = {
    highSavings:
      (printerQty / 300) * 5 * printerCost +
      (pagesPrinted / 100) * 30 * pageCost * 1 +
      ((printerQty * 15) / 60) * itPay * 1 +
      ((tickets * 0.4 * resolveTickets * 0.9) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 1 +
      serverQty * printServerCost(currency) * 1 +
      serverQty * serverCost,

    lowSavings:
      (printerQty / 300) * 1 * printerCost +
      (pagesPrinted / 100) * 10 * pageCost * 1 +
      ((printerQty * 15) / 60) * itPay * 1 +
      ((tickets * 0.4 * resolveTickets * 0.3) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 1 +
      serverQty * printServerCost(currency) * 1 +
      serverQty * serverCost,

    midSavings:
      (printerQty / 300) * 3 * printerCost +
      (pagesPrinted / 100) * 20 * pageCost * 1 +
      ((printerQty * 15) / 60) * itPay * 1 +
      ((tickets * 0.4 * resolveTickets * 0.5) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 1 +
      serverQty * printServerCost(currency) * 1 +
      serverQty * serverCost,
  };

  const year3Savings = {
    highSavings:
      (printerQty / 200) * 5 * printerCost +
      (pagesPrinted / 100) * 30 * pageCost * 3 +
      ((printerQty * 15) / 60) * itPay * 3 +
      ((tickets * 0.4 * resolveTickets * 0.9) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 3 +
      serverQty * printServerCost(currency) * 3 +
      serverQty * serverCost,

    lowSavings:
      (printerQty / 200) * 1 * printerCost +
      (pagesPrinted / 100) * 10 * pageCost * 3 +
      ((printerQty * 15) / 60) * itPay * 3 +
      ((tickets * 0.4 * resolveTickets * 0.3) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 3 +
      serverQty * printServerCost(currency) * 3 +
      serverQty * serverCost,

    midSavings:
      (printerQty / 200) * 3 * printerCost +
      (pagesPrinted / 100) * 20 * pageCost * 3 +
      ((printerQty * 15) / 60) * itPay * 3 +
      ((tickets * 0.4 * resolveTickets * 0.5) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 3 +
      serverQty * printServerCost(currency) * 3 +
      serverQty * serverCost,
  };

  const year5Savings = {
    highSavings:
      (printerQty / 100) * 5 * printerCost +
      (pagesPrinted / 100) * 30 * pageCost * 5 +
      ((printerQty * 15) / 60) * itPay * 5 +
      ((tickets * 0.4 * resolveTickets * 0.9) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 5 +
      serverQty * printServerCost(currency) * 5 +
      serverQty * serverCost,

    lowSavings:
      (printerQty / 100) * 1 * printerCost +
      (pagesPrinted / 100) * 10 * pageCost * 5 +
      ((printerQty * 15) / 60) * itPay * 5 +
      ((tickets * 0.4 * resolveTickets * 0.3) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 5 +
      serverQty * printServerCost(currency) * 5 +
      serverQty * serverCost,

    midSavings:
      (printerQty / 100) * 3 * printerCost +
      (pagesPrinted / 100) * 20 * pageCost * 5 +
      ((printerQty * 15) / 60) * itPay * 5 +
      ((tickets * 0.4 * resolveTickets * 0.5) / 60) * (parseInt(itPay) + parseInt(adminPay)) * 5 +
      serverQty * printServerCost(currency) * 5 +
      serverQty * serverCost,
  };

  // total estimated productivity savings

  const year1ProductivitySavings = {
    highSavings: ((printerQty * 15) / 60) * 1 + ((tickets * 0.4 * resolveTickets * 0.9) / 60) * 1,
    lowSavings: ((printerQty * 15) / 60) * 1 + ((tickets * 0.4 * resolveTickets * 0.3) / 60) * 1,
    midSavings: ((printerQty * 15) / 60) * 1 + ((tickets * 0.4 * resolveTickets * 0.5) / 60) * 1,
  };

  const year3ProductivitySavings = {
    highSavings: ((printerQty * 15) / 60) * 3 + ((tickets * 0.4 * resolveTickets * 0.9) / 60) * 3,
    lowSavings: ((printerQty * 15) / 60) * 3 + ((tickets * 0.4 * resolveTickets * 0.3) / 60) * 3,
    midSavings: ((printerQty * 15) / 60) * 3 + ((tickets * 0.4 * resolveTickets * 0.5) / 60) * 3,
  };

  const year5ProductivitySavings = {
    highSavings: ((printerQty * 15) / 60) * 5 + ((tickets * 0.4 * resolveTickets * 0.9) / 60) * 5,
    lowSavings: ((printerQty * 15) / 60) * 5 + ((tickets * 0.4 * resolveTickets * 0.3) / 60) * 5,
    midSavings: ((printerQty * 15) / 60) * 5 + ((tickets * 0.4 * resolveTickets * 0.5) / 60) * 5,
  };

  // total carbon emission savings
  const year1CarbonSavings = {
    highSavings:
      ((printerQty * 0.05 * 132) / 5) * 1 +
      (((pagesPrinted / 100) * 30 * 6) / 1000) * 1 +
      serverQty * 2069 * 1,
    lowSavings:
      ((printerQty * 0.01 * 132) / 5) * 1 +
      (((pagesPrinted / 100) * 10 * 6) / 1000) * 1 +
      serverQty * 2069 * 1,
    midSavings:
      ((printerQty * 0.03 * 132) / 5) * 1 +
      (((pagesPrinted / 100) * 20 * 6) / 1000) * 1 +
      serverQty * 2069 * 1,
  };

  const year3CarbonSavings = {
    highSavings:
      ((printerQty * 0.05 * 132) / 5) * 3 +
      (((pagesPrinted / 100) * 30 * 6) / 1000) * 3 +
      serverQty * 2069 * 3,
    lowSavings:
      ((printerQty * 0.01 * 132) / 5) * 3 +
      (((pagesPrinted / 100) * 10 * 6) / 1000) * 3 +
      serverQty * 2069 * 3,
    midSavings:
      ((printerQty * 0.03 * 132) / 5) * 3 +
      (((pagesPrinted / 100) * 20 * 6) / 1000) * 3 +
      serverQty * 2069 * 3,
  };

  const year5CarbonSavings = {
    highSavings:
      ((printerQty * 0.05 * 132) / 5) * 5 +
      ((pagesPrinted / 100) * 30 * 6) / 1000 +
      serverQty * 2069 * 5,
    lowSavings:
      ((printerQty * 0.01 * 132) / 5) * 5 +
      (((pagesPrinted / 100) * 10 * 6) / 1000) * 5 +
      serverQty * 2069 * 5,
    midSavings:
      ((printerQty * 0.03 * 132) / 5) * 5 +
      (((pagesPrinted / 100) * 20 * 6) / 1000) * 5 +
      serverQty * 2069 * 5,
  };

  return (
    <PageWrapper>
      <PurpleHeader>1. Your Savings with PrinterLogic</PurpleHeader>
      <BodyHeadline>Your Total Projected Cost Savings</BodyHeadline>
      <Text>
        Based on the figures you've provided,{' '}
        <Strong>
          we estimate that you will save between{' '}
          {`(${currency}${formatNumber(year5Savings?.lowSavings)})`} and{' '}
          {`(${currency}${formatNumber(year5Savings?.highSavings)})`} over five years
        </Strong>{' '}
        by removing legacy print infrastructure, boosting productivity, and rationalizing your
        printer fleet. These numbers vary greatly based on your approach and the implementation of
        the cost-saving features we provide.
      </Text>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>Year 1</TabTableHeader>
          <TabTableHeader>Year 3</TabTableHeader>
          <TabTableHeader>Year 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Benefits Realized</TableHeader>
          <TableHeader>Total Savings ({currency})</TableHeader>
          <TableHeader>Total Savings ({currency})</TableHeader>
          <TableHeader>Total Savings ({currency})</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Low</TableData>
          <TableData>
            {currency}
            {formatNumber(year1Savings?.lowSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year3Savings?.lowSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year5Savings?.lowSavings)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Mid</TableData>
          <TableData>
            {currency}
            {formatNumber(year1Savings?.midSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year3Savings?.midSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year5Savings?.midSavings)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>High</TableData>
          <TableData>
            {currency}
            {formatNumber(year1Savings?.highSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year3Savings?.highSavings)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(year5Savings?.highSavings)}
          </TableData>
        </TableRow>
      </TabTable>
      <BodyHeadline>Your Total Projected Productivity Savings</BodyHeadline>
      <Text>
        You can achieve the following productivity savings by eliminating helpdesk tickets and
        automating print driver updates.
      </Text>

      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>Year 1</TabTableHeader>
          <TabTableHeader>Year 3</TabTableHeader>
          <TabTableHeader>Year 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Benefits Realized</TableHeader>
          <TableHeader>Total Savings (Hours)</TableHeader>
          <TableHeader>Total Savings (Hours)</TableHeader>
          <TableHeader>Total Savings (Hours)</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Low</TableData>
          <TableData>{formatNumber(year1ProductivitySavings?.lowSavings)}</TableData>
          <TableData>{formatNumber(year3ProductivitySavings?.lowSavings)}</TableData>
          <TableData>{formatNumber(year5ProductivitySavings?.lowSavings)}</TableData>
        </TableRow>
        <TableRow>
          <TableData>Mid</TableData>
          <TableData>{formatNumber(year1ProductivitySavings?.midSavings)}</TableData>
          <TableData>{formatNumber(year3ProductivitySavings?.midSavings)}</TableData>
          <TableData>{formatNumber(year5ProductivitySavings?.midSavings)}</TableData>
        </TableRow>
        <TableRow>
          <TableData>High</TableData>
          <TableData>{formatNumber(year1ProductivitySavings?.highSavings)}</TableData>
          <TableData>{formatNumber(year3ProductivitySavings?.highSavings)}</TableData>
          <TableData>{formatNumber(year5ProductivitySavings?.highSavings)}</TableData>
        </TableRow>
      </TabTable>

      <BodyHeadline>Your Total Projected Carbon Emissions Reduction</BodyHeadline>
      <Text>
        You can reduce carbon emissions by eliminating print servers and implementing eco-friendly
        print features like pull printing to reduce print volumes.
      </Text>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>Year 1</TabTableHeader>
          <TabTableHeader>Year 3</TabTableHeader>
          <TabTableHeader>Year 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Benefits Realized</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Low</TableData>
          <TableData>{formatNumber(year1CarbonSavings?.lowSavings)}</TableData>
          <TableData>{formatNumber(year3CarbonSavings?.lowSavings)}</TableData>
          <TableData>{formatNumber(year5CarbonSavings?.lowSavings)}</TableData>
        </TableRow>
        <TableRow>
          <TableData>Mid</TableData>
          <TableData>{formatNumber(year1CarbonSavings?.midSavings)}</TableData>
          <TableData>{formatNumber(year3CarbonSavings?.midSavings)}</TableData>
          <TableData>{formatNumber(year5CarbonSavings?.midSavings)}</TableData>
        </TableRow>
        <TableRow>
          <TableData>High</TableData>
          <TableData>{formatNumber(year1CarbonSavings?.highSavings)}</TableData>
          <TableData>{formatNumber(year3CarbonSavings?.highSavings)}</TableData>
          <TableData>{formatNumber(year5CarbonSavings?.highSavings)}</TableData>
        </TableRow>
      </TabTable>
      <PDFFooter>4</PDFFooter>
    </PageWrapper>
  );
};

export default PDFPage4;
