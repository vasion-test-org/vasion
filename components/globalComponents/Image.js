import React from 'react';

import styled from 'styled-components';
import media from '@/styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Image = ({imageAlt, imageSrc, style}) => {
  // console.log(imageAlt, imageSrc)
return (
<ImageWrapper alt={imageAlt} src={imageSrc} border_radius={style.border_radius}/>
)
}

const ImageWrapper = styled.img`
  width: auto;
  height: auto;
  border-radius: ${props => `${props.border_radius}px`};

  ${media.fullWidth} {
    border-radius: ${props => `${props.border_radius}px`};
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`
export default Image