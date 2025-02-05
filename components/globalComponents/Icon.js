import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Icon = ({imageAlt, imageSrc}) => {
  // console.log(imageAlt, imageSrc)
return (
<IconWrapper alt={imageAlt} src={imageSrc}/>
)
}

const IconWrapper = styled.img`
  width: 4.5vw;
  height: 4.5vw;

  ${media.fullWidth} {
    width: 72px;
    height: 72px;
  }
  
  ${media.tablet} {
    width: 7.031vw;
    height: 7.031vw;
  }
  
  ${media.mobile} {
    width: 15vw;
    height: 15vw;
  }
`
export default Icon