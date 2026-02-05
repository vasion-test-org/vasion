import React from 'react';

import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

const PDFFooter = ({ children, white }) => {
  return <Wrapper white={white}>printerlogic.com | {children}</Wrapper>;
};

const Wrapper = styled.div`
  ${text.bodyMd};
  color: ${(props) => (props.white ? colors.white : colors.black)};
  position: absolute;
  bottom: 3.472vw;
  right: 3.472vw;
  width: max-content;
`;
export default PDFFooter;
