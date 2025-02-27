'use client'
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import text from '@/styles/text';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import Button from '@/components/globalComponents/Button';
const StatItem = ({ statItem }) => {

return (
<StatContainer>
 <Stat>{statItem.stat}</Stat>
 <RichTextRenderer document={statItem.copy[0].copy}/>
 {statItem.link[0] &&     <div
                {...storyblokEditable(statItem.link[0])}
              >
                <Button key={statItem.link[0].link_text} $buttonData={statItem.link[0]} />
              </div>}
</StatContainer>
)
}

const Stat = styled.p`
  ${text.stat};
  color: ${colors.primaryOrange};
`
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 24.625vw;
  gap: 1.5vw;

  ${media.fullWidth} {
    width: 394px;
    gap: 24px;

  }
  
  ${media.tablet} {
    width: 29.102vw;
  }
  
  ${media.mobile} {
    width: 89.167vw;
  }
`
export default StatItem