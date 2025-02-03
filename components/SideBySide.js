import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from "@storyblok/react/rsc";
import media, {mobile, desktop, tablet} from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
import ComponentRenderer from './ComponentRenderer';

const SideBySide = ({blok}) => {
return (
<SideBySideWrapper gap={blok.gap}>
  <ComponentRenderer blok={blok.left_side_component[0]}  />
  <ComponentRenderer blok={blok.right_side_component[0]} />
</SideBySideWrapper>
)
}

const SideBySideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: calc(${props => props.gap[0]} / ${desktop} * 100vw);

  ${media.fullWidth} {
    gap: ${props => `${props.gap[0]}px`};
  }
  
  ${media.tablet} {
   gap: calc(${props => props.gap[1]} / ${tablet} * 100vw);
  }
  
  ${media.mobile} {
   gap: calc(${props => props.gap[2]} / ${mobile} * 100vw);
  }
`
export default SideBySide