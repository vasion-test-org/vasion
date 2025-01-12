import React from 'react';

import styled from 'styled-components';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';

const Icon = ({imageAlt, imageSrc}) => {
  // console.log(imageAlt, imageSrc)
return (
<IconWrapper alt={imageAlt} src={imageSrc}/>
)
}

const IconWrapper = styled.img`
  width: 5vw;
  height: 5vw;
`
export default Icon