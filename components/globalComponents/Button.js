import React from 'react';

import styled from 'styled-components';
// import media from 'styles/media';
// import colors from 'styles/colors';
// import text from 'styles/text';
const Button = ({ buttonData }) => {
console.log(buttonData)
return (
<ButtonWrapper layout={buttonData.layout}>
  <Link></Link>
</ButtonWrapper>
)
}

export default Button

const Link = styled.div`
  
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: ${props => `${props.layout}`};
`