import React from 'react';

import {
  Text,
  PageWrapper,
  BodyHeadline,
  Link,
  PurpleHeader,
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage10 = ({ currency }) => {
  return (
    <PageWrapper>
      <PurpleHeader>4. Reducing Consumable Waste</PurpleHeader>
      <Text>
        Creating a more sustainable work environment and decreasing carbon
        emissions has been a prioritized initiative for the business community.
        Many organizations see moving to the cloud as a way to reduce consumable
        usage and tackle their sustainability goals.{' '}
        <Link href='https://info.printerlogic.com/rs/338-HTA-134/images/QuocircaCloud2022VasionExcerptReport.pdf'>
          Quocirca's Sustainability Trends
        </Link>{' '}
        reports revealed that 80% of organizations had already implemented or
        planned to implement cloud printing as part of their sustainability
        strategy. PrinterLogic is one solution that makes sustainable printing
        second nature by empowering admins to automate print policies that users
        can easily follow.
      </Text>
      <BodyHeadline>The Impact of Enforcing Print Policies</BodyHeadline>
      <Text>
        Crafting an effective print policy requires more than just sharing a set
        of regulations through email or documentation. It takes a systemized,
        automated process to implement better printing practices. A successful
        policy should include a mechanism that promotes the adoption of best
        practices while also enforcing the rules—without excessive maintenance
        on your end. PrinterLogic helps you implement a system that facilitates
        compliance and encourages users to print responsibly by giving you
        control over print policies from a single pane of glass via the
        PrinterLogic Administrative Console. 
      </Text>
      <Text>
        PrinterLogic’s Administrative Console provides IT teams with a central
        location to configure defaults for all printers across an organization.
        For example, if your goal is to ensure users print duplex, you can
        configure those defaults directly within the Admin Console with just a
        few clicks. If a user needed to print simplex instead, the printer would
        revert to your configured default after the user prints.
      </Text>
      <Text>
        Using the same Console, you can set up printers to print greyscale,
        restrict access to specific printers, and set limits per user or group
        based on cost or volumes using our{' '}
        <Link href='https://printerlogic.com/print-quota-management/'>
          Print Quota Management feature
        </Link>
        . This feature is ideal for organizations or educational facilities
        looking to reduce print costs and eliminate the possibility of users
        printing accidental duplicates.
      </Text>
      <BodyHeadline>The Benefits of Pull Printing</BodyHeadline>
      <Text>
        <Link href='https://printerlogic.com/secure-release-printing-information/'>
          Secure Release Printing
        </Link>
        , PrinterLogic's pull printing technology, is another source of
        potential paper and cost savings for your organization. Typically,
        savings realized in terms of spend and pages printed when deploying a
        pull printing solution are in the region of{' '}
        <Link href='https://www.gartner.com/en/documents/2537615'>10-30%</Link>,
        with each page costing, on average,{' '}
        <Link href='https://www.tonerbuzz.com/blog/printing-costs-how-to-accurately-calculate-your-printing-cost-per-page/?utm_source=pepperjam&utm_medium=affiliate&utm_campaign=96525&clickId=4321300061#:~:text=Cost%20Per%20Page%3A%20Laser%20Printers,cents%20for%20color%20laser%20prints.'>
          {currency}0.05 - {currency}0.08 to print
        </Link>
        . This adds up over time. Secure Release Printing requires every user to
        authenticate at the printer via badge swipe, QR code scan, inputting a
        PIN and ID at the CPA, or using a mobile browser. Adding the
        authentication step in the printing process removes accidental
        duplicates, ensures documents fall into the right hands, and
        automatically erases any outstanding print jobs after 24 hours.
      </Text>
      <PDFFooter>10</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage10;
