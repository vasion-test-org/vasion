import React from 'react';

import {
  Text,
  PageWrapper,
  BodyHeadline,
  Link,
  PurpleHeader,
  Strong,
  List,
  ListItem,
  BoxedText,
} from 'components/BusinessCaseTool/PDFComponents';
import PDFFooter from './PDFFooter';

const PDFPage7 = () => {
  return (
    <PageWrapper>
      <PurpleHeader>3. Minimizing Wasted Productivity</PurpleHeader>
      <Text>
        Organizations want to improve productivity for many reasons, including
        increased profitability, faster customer response times, competitive
        advantage, and employee satisfaction, to name a few.  By improving how
        you manage your print fleet, you can reduce wasted time and costs
        associated with printer and print server downtime.
      </Text>
      <BodyHeadline>
        Productivity Loss from Print-Related Helpdesk Tickets
      </BodyHeadline>
      <Text>
        How many helpdesk calls does your team receive daily? Weekly? Monthly?
        And how many of them are print-related?{' '}
        <Link href='https://www.gartner.com/en/documents/3995547'>
          Gartner{' '}
        </Link>
        estimates that print-related helpdesk tickets account for 40% of an IT
        team's workload, and according to{' '}
        <Link href='https://blog.superfast-it.com/it-support-help-desk-response-time#:~:text=Waiting%204%2D8%20hours%20for,a%20reactive%20technical%20support%20issue.'>
          Superfast IT
        </Link>
        , it takes around four hours to resolve a helpdesk ticket. More than
        just your support teams are wasting this time addressing printing
        issues. Your users are also wasting time waiting for their printers to
        work so they can continue their work—doubling your productivity loss.
      </Text>
      <Text>
        This doesn’t just apply to the centralized and decentralized print
        server models, either. Admins utilizing the unmanaged direct IP model
        can expect just as many issues. Below are a few reasons unmanaged direct
        IP print environments cause high helpdesk ticket volumes.
      </Text>
      <List>
        <ListItem>
          <Strong>Time-consuming Configuration</Strong>: Printer drivers have to
          be configured on every workstation. Not to mention IT teams have to
          keep up with changes and driver updates. 
        </ListItem>
        <ListItem>
          <Strong>Difficult Printer Replacement</Strong>: Changing out a printer
          could require IT staff to touch all affected workstations, which is
          time-consuming. In dynamic environments, these efforts will inevitably
          fall behind, hurting user productivity. 
        </ListItem>
        <ListItem>
          <Strong>Less Oversight and Management</Strong>: Employees need
          centralized group policy management to set their own printing rules,
          making it hard to keep up with print environments. 
        </ListItem>
      </List>
      <BoxedText>
        In our experience, most printing issues are more straightforward to
        resolve as it is usually a printer driver or scripting issue, so we used
        a two-hour resolution time to generate your potential productivity
        savings.{' '}
      </BoxedText>
      <PDFFooter>7</PDFFooter>
    </PageWrapper>
  );
};

export default PDFPage7;
