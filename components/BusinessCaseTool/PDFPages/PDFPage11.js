import React from 'react';

import {
  Text,
  Strong,
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
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage11 = ({ savingsFormData, currency }) => {
  const {
    pagesPrinted,
    pageCost
  } = savingsFormData;

  const pageCostSwitch = (pageCost) => {
    if(pageCost === '') {
      return 0.02
    } else {
      return pageCost
    }
  }
  return (
    <PageWrapper>
      <BodyHeadline>
        Your Projected Savings from Print Volume Reduction
      </BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader colspan='2'>TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader colspan='2'>TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader colspan='2'>TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>

        <TableHeaderRow>
          <TableHeader>Print Pages Savings</TableHeader>
          <TableHeader>Pages Not Printed</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Pages Not Printed</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Pages Not Printed</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
        </TableHeaderRow>

        <TableRow>
          <TableData>Savings from a 10% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 10))}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 10) * pageCostSwitch(pageCost))}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 10) * 3)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 10) * pageCostSwitch(pageCost) * 3)}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 10) * 5)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 10) * pageCostSwitch(pageCost) * 5)}
          </TableData>
        </TableRow>

        <TableRow>
          <TableData>Savings from a 20% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 20))}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 20) * pageCostSwitch(pageCost))}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 20) * 3)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 20) * pageCostSwitch(pageCost) * 3)}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 20) * 5)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 20) * pageCostSwitch(pageCost) * 5)}
          </TableData>
        </TableRow>

        <TableRow>
          <TableData>Savings from a 30% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 30))}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 30) * pageCostSwitch(pageCost))}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 30) * 3)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 30) * pageCostSwitch(pageCost) * 3)}
          </TableData>
          <TableData>
          {formatNumber(((pagesPrinted / 100) * 30) * 5)}
          </TableData>
          <TableData>
            {currency}
            {formatNumber(((pagesPrinted / 100) * 30) * pageCostSwitch(pageCost) * 5)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        In the above table,{' '}
        <Strong>we used your number of {currency}{pageCost} print cost per page</Strong>. You
        can see the number of pages not printed and the associated cost savings
        at a 10%, 20%, and 30% reduction. Not only does print consumable
        reduction save you money, but it also helps to reduce your carbon
        footprint!
      </Text>
      <BodyHeadline>
        Your Projected Carbon Emissions Reduction After Minimizing Print Volumes
      </BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>
            Sustainability Carbon Reduction for Printed Paper
          </TableHeader>
          <TableHeader>Reduced Carbon (kg)</TableHeader>
          <TableHeader>Reduced Carbon (kg)</TableHeader>
          <TableHeader>Reduced Carbon (kg)</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Savings from a 10% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 10 * 6) / 1000)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 10 * 6) / 1000) * 3)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 10 * 6) / 1000) * 5)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 20% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 20 * 6) / 1000)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 20 * 6) / 1000) * 3)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 20 * 6) / 1000) * 5)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 30% reduction</TableData>
          <TableData>
            {formatNumber(((pagesPrinted / 100) * 30 * 6) / 1000)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 30 * 6) / 1000) * 3)}
          </TableData>
          <TableData>
            {formatNumber((((pagesPrinted / 100) * 30 * 6) / 1000) * 5)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        In the above table, we demonstrate how reducing print volumes decreases
        your carbon footprint. Over five years, you could reduce your carbon
        emissions by up to 360,000 kg, the equivalent of removing 294
        gasoline-powered vehicles from the roads.
      </Text>
      <BodyHeadline>The Benefits of Print Visibility</BodyHeadline>
      <Text>
        PrinterLogic enables you to monitor printing volumes across your fleet.
        With increased visibility over your printer objects, you can identify
        and remove underutilized printers from operation.{' '}
        <Link href='https://www.loffler.com/buying-printer-office-copy-machine-cost'>
          According to Loffler
        </Link>
        , a typical office printer costs between $1,000 and $20,000 over its
        lifetime, depending on quality and usage. By identifying underutilized
        printers, you can eliminate ongoing maintenance and replacement costs.
      </Text>
      <PDFFooter>11</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage11;
