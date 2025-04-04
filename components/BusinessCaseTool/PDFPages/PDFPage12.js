import React from 'react';

import {
  Text,
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

const PDFPage12 = ({ savingsFormData, currency }) => {
  const { printerQty, printerCost } = savingsFormData;

  return (
    <PageWrapper>
      <BodyHeadline>
        Your Projected Cost Savings from Print Fleet Rationalization
      </BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Print Fleet Reduction Savings</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
          <TableHeader>Savings ({currency})</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Savings from a 1% reduction</TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 300) * 1 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 200) * 1 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 100) * 1 * printerCost)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 3% reduction</TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 300) * 3 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 200) * 3 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 100) * 3 * printerCost)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 5% reduction</TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 300) * 5 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 200) * 5 * printerCost)}
          </TableData>
          <TableData>
            {currency}{formatNumber((printerQty / 100) * 5 * printerCost)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        The above table demonstrates how rationalizing your fleet by just a few
        percentage points can lead to huge cost savings. This highlights the
        importance of PrinterLogic's reporting tools that give you the
        visibility to eliminate underutilized printers from your fleet.
      </Text>
      <BodyHeadline>
        The Impact Printers Have on Your Carbon Footprint
      </BodyHeadline>
      <Text>
        Printers consume energy, increasing your organization's carbon
        footprint. Modern printers use{' '}
        <Link href='https://www.photocopierleasing.co.uk/printer-leasing-blog/photocopiers-and-printers-vs-climate-change.aspx'>
          185.76 kWh of power each year
        </Link>
        . This equates to{' '}
        <Link href='https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results'>
          132 grams of carbon
        </Link>{' '}
        each year in deep sleep mode.
      </Text>
      <BodyHeadline>
        Your Projected Carbon Reduction from Print Fleet Rationalization
      </BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>TOTAL YEAR 1</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 3</TabTableHeader>
          <TabTableHeader>TOTAL YEAR 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Print Fleet Reduction Savings</TableHeader>
          <TableHeader>Total Carbon Reduction (kg)</TableHeader>
          <TableHeader>Total Carbon Reduction (kg)</TableHeader>
          <TableHeader>Total Carbon Reduction (kg)</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Savings from a 1% reduction</TableData>
          <TableData>{formatNumber((printerQty * 0.01 * 132) / 5)}</TableData>
          <TableData>
            {formatNumber(((printerQty * 0.01 * 132) / 5) * 3)}
          </TableData>
          <TableData>
            {formatNumber(((printerQty * 0.01 * 132) / 5) * 5)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 3% reduction</TableData>
          <TableData>{formatNumber((printerQty * 0.03 * 132) / 5)}</TableData>
          <TableData>
            {formatNumber(((printerQty * 0.03 * 132) / 5) * 3)}
          </TableData>
          <TableData>
            {formatNumber(((printerQty * 0.03 * 132) / 5) * 5)}
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>Savings from a 5% reduction</TableData>
          <TableData>{formatNumber((printerQty * 0.05 * 132) / 5)}</TableData>
          <TableData>
            {formatNumber(((printerQty * 0.05 * 132) / 5) * 3)}
          </TableData>
          <TableData>
            {formatNumber(((printerQty * 0.05 * 132) / 5) * 5)}
          </TableData>
        </TableRow>
      </TabTable>
      <Text>
        The table above shows how much carbon emissions you could prevent by
        identifying and eliminating underutilized printers. Over five years,
        reducing the number of printers in your fleet by 5% could have the same
        impact as recycling 25 tons of waste.
      </Text>
      <PDFFooter>12</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage12;
