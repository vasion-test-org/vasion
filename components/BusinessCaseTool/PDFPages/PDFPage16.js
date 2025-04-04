import React from 'react';

import styled from 'styled-components';
import media from 'styles/media';

import {
  PageWrapper,
  BodyHeadline,
  Strong,
  ListItem,
  OrderedList,
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage16 = () => {
  return (
    <PageWrapper>
      <OrderedList start='3'>
        <ListItem>
          <Strong>Centralized Printer Management: </Strong> PrinterLogic
          provides a centralized management console that allows administrators
          to manage all of their printers from a single interface. This reduces
          helpdesk tickets related to printer configuration, troubleshooting,
          and maintenance by providing a single point of control for all
          printers in the organization.
        </ListItem>
        <ListItem>
          <Strong>Driver Management: </Strong> PrinterLogic's driver management
          feature allows administrators to manage printer drivers from a central
          location. This improved control reduces helpdesk tickets related to
          driver installations, compatibility issues, and driver conflicts.
        </ListItem>
        <ListItem>
          <Strong>Print Queue Management: </Strong> PrinterLogic offers advanced
          print queue management features that allow administrators to monitor
          print queues, view job histories, and identify and resolve issues
          before they get to the helpdesk. This reduces helpdesk tickets related
          to print queue issues and provides a more efficient and streamlined
          printing experience.
        </ListItem>
      </OrderedList>
      <BodyHeadline>
        <Strong>Q:</Strong> How does PrinterLogic help me reduce print volumes?
      </BodyHeadline>
      <CustomStrong>
        Here are three features of PrinterLogic that can help reduce print
        volumes and minimize consumable usage:
      </CustomStrong>
      <OrderedList>
        <ListItem>
          <Strong>Secure Release Printing: </Strong>PrinterLogic's Secure
          Release Printing feature can help reduce unnecessary print volumes by
          allowing users to hold print jobs until they are ready to release
          them. This feature automatically erases print jobs that are no longer
          needed and reduces waste from unclaimed printouts.
        </ListItem>
        <ListItem>
          <Strong>Print Quota Management: </Strong> PrinterLogic's Print Quota
          Management feature can help reduce print volumes by setting limits on
          the number of pages or print jobs that users can print, encouraging
          users to be more mindful of their printing habits and reducing waste
          from unnecessary or excessive printing.
        </ListItem>
        <ListItem>
          <Strong>Print Reporting and Analytics: </Strong> PrinterLogic's print
          analytics feature can help reduce print volumes by providing detailed
          reports on print usage across the organization. This can help identify
          areas where print volumes are high and provide insights into how
          printing can be reduced or eliminated across users or groups.
        </ListItem>
      </OrderedList>
      <PDFFooter>16</PDFFooter>
    </PageWrapper>
  );
};

const CustomStrong = styled(Strong)`
  margin-bottom: 1.389vw;

  ${media.fullWidth} {
    margin-bottom: 20px;
  }
`;

export default PDFPage16;
