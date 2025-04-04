import React from 'react';

import {
  Text,
  PageWrapper,
  BodyHeadline,
  Strong,
  PurpleHeader,
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage13 = () => {
  return (
    <PageWrapper>
      <PurpleHeader>5. Frequently Asked Questions</PurpleHeader>
      <BodyHeadline>
        <Strong>Q:</Strong> Should I eliminate my print server(s)?
      </BodyHeadline>
      <Text>
        The decision to eliminate print servers should be evaluated carefully
        based on your organization's designed server infrastructure. While cost
        reductions may vary, the benefits of streamlining print infrastructure
        through eliminating print servers and adopting PrinterLogic are clear.
        By embracing this logical and simplified approach, organizations achieve
        significant cost savings, improved management efficiency, and a more
        seamless printing experience for their users.
      </Text>
      <BodyHeadline>
        <Strong>Q:</Strong> What are the benefits of eliminating my print
        servers?
      </BodyHeadline>
      <Text>
        In today's digital landscape, organizations strive to optimize their
        operations and minimize costs. Your print infrastructure is one area
        where you can make significant improvements in a short period of time.
        By eliminating print servers, you can unlock many benefits and better
        utilize valuable resources. This opens opportunities to transition to
        cloud-based services for all functions, resulting in streamlined
        operations and reduced management complexity. 
      </Text>
      <Text>
        {' '}
        PrinterLogic offers a valuable solution for optimizing print
        architecture management. By eliminating multiple points of management
        and simplifying print queue configuration and deployment processes,
        PrinterLogic enhances overall efficiency. This centralized approach
        reduces costs and improves the overall user experience.
      </Text>
      <BodyHeadline>
        <Strong>Q:</Strong> What's the impact of eliminating virtual print
        servers?
      </BodyHeadline>
      <Text>
        Eliminating virtual print servers and associated licensed software can
        generate operational cost savings. In cases where servers in remote
        locations are dedicated to providing file, print, and domain services,
        decommissioning print services becomes significant. By eliminating print
        services, organizations can retire all virtual servers hosted in these
        locations. This opens opportunities to transition to cloud-based
        services for all functions, resulting in streamlined operations and
        reduced management complexity. The historical challenge of eliminating
        print services makes this an especially compelling option.
      </Text>
      <PDFFooter>13</PDFFooter>
    </PageWrapper>
  );
};

export default PDFPage13;
