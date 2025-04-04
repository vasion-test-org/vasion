import React from 'react';

import {
  Text,
  PageWrapper,
  BodyHeadline,
  Link,
  Strong,
  currencyConverter
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage8 = ({ currency }) => {
  return (
    <PageWrapper>
      <BodyHeadline>Productivity Loss from Failed Deployments</BodyHeadline>
      <Text>
        Faulty MSIs, incorrect permissions, and driver conflicts cause
        deployments via GPOs and scripts to be shotty at best—particularly when
        managing a hybrid work environment. Employees traveling between offices
        need access to printers and rely on IT to constantly deliver printers
        when they change locations. This process alone decreases productivity
        because users must wait for admins to deploy and install printers for
        them. And this is the best-case scenario. 
      </Text>
      <Text>
        Imagine if the deployment fails. You’re responsible for troubleshooting
        the issue, and the user calls the helpdesk because they still don't have
        access to their desired printer, creating another situation where
        productivity decreases for admins and end users.
      </Text>
      <BodyHeadline>Productivity Loss from Printer Driver Updates</BodyHeadline>
      <Text>
        It's difficult to determine a precise time for how long it takes to
        update a printer driver because of varying factors such as the size of
        the driver, the speed of the internet connection, and the processing
        power of the computer. However, in general, updating a printer driver
        should take between five to 15 minutes. With PrinterLogic, this is a
        thing of the past, as automated driver updates handle the work for you.
      </Text>
      <BodyHeadline>
        Calculating the Costs of Print-Related Productivity Loss
      </BodyHeadline>
      <Text>
        Let’s start with the bad news.{' '}
        <Link href='https://www.bmc.com/blogs/service-desk-automation/'>
          BMC
        </Link>{' '}
        has calculated that the average helpdesk call costs between {' '}{currency}{currencyConverter(20, currency)}-{currency}{currencyConverter(100, currency)} to
        resolve. If we add the {' '}{currency}{currencyConverter(22, currency)} per hour{' '}
        <Link href='https://www.salary.com/research/salary/benchmark/administrative-assistant-i-hourly-wages#:~:text=The%20average%20hourly%20wage%20for,falls%20between%20%2419%20and%20%2424'>
          salary.com
        </Link>{' '}
        states the average admin staff member earns, it’s easy to recognize the
        financial impact print-related helpdesk tickets have on your bottom
        line.
      </Text>
      <Text>
        Now for the good news. A{' '}
        <Link href='https://printerlogic.com/blog/how-to-drastically-reduce-printer-related-service-desk-calls/'>
          TechValidate survey of 228 PrinterLogic users showed
        </Link>{' '}
        that 77% of PrinterLogic customers saw at least a 30% reduction in
        helpdesk calls. What's more impressive is that 62% of those customers
        saw a reduction in service desk calls by more than 50%.{' '}
        <Strong>
          And to top it all off, 41% saw a reduction of greater than 70%, while
          15% saw a drop of more than 90%.
        </Strong>
         
      </Text>
      <PDFFooter>8</PDFFooter>
    </PageWrapper>
  );
};
export default PDFPage8;
