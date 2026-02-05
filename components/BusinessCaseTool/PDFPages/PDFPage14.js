import React from 'react';

import {
  BodyHeadline,
  ListItem,
  OrderedList,
  PageWrapper,
  Strong,
} from 'components/BusinessCaseTool/PDFComponents';

import PDFFooter from './PDFFooter';

const PDFPage14 = () => {
  return (
    <PageWrapper>
      <BodyHeadline>
        <Strong>Q:</Strong> What are the financial costs of my print servers?
      </BodyHeadline>
      <OrderedList>
        <ListItem>
          <Strong>Hardware Costs:</Strong> The cost of purchasing the server hardware, such as the
          server itself, storage devices, networking equipment, peripherals such as keyboards and
          monitors, and any backups for disaster recovery.{' '}
        </ListItem>
        <ListItem>
          <Strong>Software Costs:</Strong> Licensing costs for the operating system and other
          software applications required to run the server.{' '}
        </ListItem>
        <ListItem>
          <Strong>Electricity Costs:</Strong> Running a server requires a significant amount of
          electricity, which can result in high energy bills.{' '}
        </ListItem>
        <ListItem>
          <Strong>Internet Connectivity Costs:</Strong> If the server is hosted offsite, there may
          be additional costs for internet connectivity.
        </ListItem>
        <ListItem>
          <Strong>Cooling Costs: </Strong> Servers generate a lot of heat and require additional
          cooling to prevent overheating, which translates into additional costs for cooling
          equipment and electricity usage.
        </ListItem>
        <ListItem>
          <Strong>Backup and Recovery Costs:</Strong> The cost of setting up and maintaining a
          backup and recovery system to protect against data loss.
        </ListItem>
        <ListItem>
          <Strong>Security Costs:</Strong> Investing in security measures such as firewalls,
          antivirus software, and intrusion detection systems can help protect the server from cyber
          threats. However, these measures can be costly.
        </ListItem>
        <ListItem>
          <Strong>Maintenance Costs:</Strong> Regular maintenance of the server hardware and
          software can help prevent issues from arising, but this comes at a cost.
        </ListItem>
        <ListItem>
          <Strong>Upgrades and Replacement Costs:</Strong> As technology advances, hardware and
          software become outdated and require upgrading or replacement. This can result in
          significant costs.
        </ListItem>
        <ListItem>
          <Strong> Management Costs:</Strong> If a third-party provider manages the server,
          additional costs may be associated with their services.
        </ListItem>
      </OrderedList>
      <PDFFooter>14</PDFFooter>
    </PageWrapper>
  );
};

export default PDFPage14;
