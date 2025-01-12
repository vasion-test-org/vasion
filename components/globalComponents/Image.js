import React from 'react';

import styled from 'styled-components';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Image = ({imageAlt, imageSrc}) => {
  // console.log(imageAlt, imageSrc)
return (
<ImageWrapper alt={imageAlt} src={imageSrc}/>
)
}

const ImageWrapper = styled.img`
  width: auto;
  height: auto;
`
export default Image