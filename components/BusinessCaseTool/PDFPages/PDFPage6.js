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

const PDFPage6 = ({ savingsFormData }) => {
  const { serverQty } = savingsFormData;

  return (
    <PageWrapper>
      <BodyHeadline>The Cost of a Security Breach</BodyHeadline>
      <Text>
        Print servers aren’t just a waste of money, they're susceptible to hacks
        and data theft. Remember{' '}
        <Link href='https://printerlogic.com/print-nightmare/'>
          PrintNightmare
        </Link>
        ? Attackers had free access to attack all connected devices via specific
        inbound Remote Procedure Protocols that failed to restrict the
        administration of printers and related drivers. Since July 2021, over{' '}
        <Link href='https://usa.kaspersky.com/about/press-releases/2022_cybercriminals-are-increasingly-exploiting-vulnerabilities-in-windows-print-spooler'>
          65,000 attacks have targeted print servers
        </Link>
        , and around 31,000 attacks happened in 2022. Falling victim to one of
        these vulnerabilities could prove costly, too. According to{' '}
        <Link href='https://quocirca.com/quocirca-print-security-landscape-2023-executive-summary/#:~:text=On%20average%2C%20the%20cost%20of,on%20business%20continuity%20(30%25).'>
          Quocirca’s 2023 Print Security Landscape
        </Link>
        , the average cost of a print-related data breach is over $904,000
        (€851,000, $1.4 million, £743,000). In short, print servers are still
        an ongoing security vulnerability that PrinterLogic customers do not
        worry about after eliminating them. Now, that is a very nice additional
        benefit!
      </Text>
      <BodyHeadline>
        The Impact Print Servers Have on Your Carbon Footprint
      </BodyHeadline>
      <Text>
        Print servers also consume energy, increasing your organization's carbon
        footprint.  
        <Link href='https://www.manxtechgroup.com/how-much-will-a-server-cost-uk/'>
          According to Manxtech
        </Link>
        , a small server uses 5-8 kWh of power daily. One of our customers
        eliminated 140 print servers. Using the Manxtech figure, this would
        equate to over 216,000 kg of carbon emissions a year—
        <Link href='https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results'>
          nearly enough to drive to the moon and back!
        </Link>
      </Text>
      <BodyHeadline>
        Your Projected Carbon Emissions Reduction from Eliminating Print Servers
      </BodyHeadline>
      <TabTable>
        <TabTableHeaderRow>
          <TabTableHeader></TabTableHeader>
          <TabTableHeader>Year 1</TabTableHeader>
          <TabTableHeader>Year 3</TabTableHeader>
          <TabTableHeader>Year 5</TabTableHeader>
        </TabTableHeaderRow>
        <TableHeaderRow>
          <TableHeader>Sustainability Carbon Reduction</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
          <TableHeader>Total Savings (kg)</TableHeader>
        </TableHeaderRow>
        <TableRow>
          <TableData>Print Server Carbon Reduction</TableData>
          <TableData>{formatNumber(serverQty * 2069)}</TableData>
          <TableData>{formatNumber(serverQty * 2069 * 3)}</TableData>
          <TableData>{formatNumber(serverQty * 2069 * 5)}</TableData>
        </TableRow>
      </TabTable>
      <Text>
        The above table gives you an idea of the cumulative effect that print
        servers have on your organization's environmental impact.{' '}
        <Link href='https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results'>
          Over five years, you will eliminate 56,680 kg of carbon emissions
        </Link>
        , which is the equivalent of driving{' '}
        <Link href='https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results'>
          a car around the world over (eight) times!
        </Link>
      </Text>
      <PDFFooter>6</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage6;
