import React from 'react';

import {
  BodyHeadline,
  ListItem,
  OrderedList,
  PageWrapper,
  Strong,
} from 'components/BusinessCaseTool/PDFComponents';
import styled from 'styled-components';
import media from 'styles/media';

import PDFFooter from './PDFFooter';

const PDFPage15 = () => {
  return (
    <PageWrapper>
      <BodyHeadline>
        <Strong>Q:</Strong> How do print servers waste time for IT teams?
      </BodyHeadline>
      <OrderedList>
        <ListItem>
          <Strong>Configuration and Setup:</Strong> Setting up a server can take considerable time,
          especially if you need to become more familiar with the process.
        </ListItem>
        <ListItem>
          <Strong>Software Installation:</Strong> Installing the necessary software applications and
          configuration can be time-consuming.
        </ListItem>
        <ListItem>
          <Strong>Network Setup:</Strong> Configuring the server's network settings, including IP
          addresses and routing, can be a complex and time-bound process.
        </ListItem>
        <ListItem>
          <Strong>Data Migration:</Strong> Migrating data from an old server or system is
          time-consuming.
        </ListItem>
        <ListItem>
          <Strong>Monitoring and Maintenance:</Strong>
          Ongoing monitoring and maintenance are required to ensure the server runs smoothly and
          efficiently.
        </ListItem>
        <ListItem>
          <Strong>Troubleshooting:</Strong> Fixing server issues takes IT team members out of
          commission for a while.
        </ListItem>
        <ListItem>
          <Strong>Updates and Upgrades:</Strong> Regular software updates and upgrades may be
          required, which can take time to apply and test.
        </ListItem>
        <ListItem>
          <Strong>Security Monitoring:</Strong> Constant, manual security monitoring is required to
          ensure the server is protected from cyber threats.
        </ListItem>
        <ListItem>
          <Strong>Backup and Recovery:</Strong> Regular backup and recovery procedures must be
          performed to protect against data loss, which can take time to set up and test.
        </ListItem>
        <ListItem>
          <Strong>End User Support:</Strong> If end users use the server, there may be additional
          time required to provide support and resolve issues they encounter.
        </ListItem>
      </OrderedList>
      <BodyHeadline>
        <Strong>Q:</Strong> How does PrinterLogic help me reduce IT helpdesk tickets?
      </BodyHeadline>
      <CustomStrong>
        Here are five ways that PrinterLogic can help reduce IT helpdesk tickets related to
        printing:
      </CustomStrong>
      <OrderedList>
        <ListItem>
          <Strong>Automated Printer Deployments: </Strong> PrinterLogic's automated printer
          deployment feature can help reduce helpdesk tickets related to printer setup and
          configuration. With PrinterLogic, administrators can automatically deploy printers to
          users or groups based on specific criteria, eliminating the need for manual printer
          installations and reducing the risk of configuration errors.
        </ListItem>
        <ListItem>
          <Strong>Self-Service Printer Installation: </Strong> PrinterLogic's Self-Service Printer
          Installation feature allows end users to install printers themselves without requiring IT
          assistance. This reduces helpdesk tickets related to printer installation and frees up IT
          resources to focus on more pressing issues.
        </ListItem>
      </OrderedList>
      <PDFFooter>15</PDFFooter>
    </PageWrapper>
  );
};

const CustomStrong = styled(Strong)`
  margin-bottom: 1.389vw;

  ${media.fullWidth} {
    margin-bottom: 20px;
  }
`;
export default PDFPage15;
