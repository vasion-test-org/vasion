import React from 'react';

import Link from "next/link";
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';
// import media from 'styles/media';
// import colors from 'styles/colors';

const Button = ({ buttonData }) => {
  // console.log(buttonData);
  const themes = useAvailableThemes();
  const selectedTheme = themes.button?.[buttonData.theme] || themes.button.primary;

  const href = buttonData.link_url.email ? `mailto:${buttonData.link_url.email}` : buttonData.link_url.url || "#";
  const isExternal = buttonData.link_url.url?.startsWith("http") || buttonData.link_url.email;
  const target = buttonData.link_url.target === "_blank" || isExternal ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  return (
    <ThemeProvider theme={selectedTheme}>
      <ButtonWrapper layout={buttonData.layout}>
       <Link href={href} passHref target={target} rel={rel}>
          <StyledLink size={buttonData.link_size}>{buttonData.link_text}</StyledLink>
        </Link>
      </ButtonWrapper>
    </ThemeProvider>
  );
};

export default Button;

const StyledLink = styled.div`
  cursor: pointer;
  width: max-content;
  background: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.textColor};
  padding: ${(props) => props.theme.padding};
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.complimentaryColor};

  &:hover {
    background: ${(props) => props.theme.hoverBgColor};
    color: ${(props) => props.theme.hoverTextColor};
    border: ${(props) => props.theme.border};
    text-decoration: ${(props) => props.theme.textDecoration};
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => `${props.layout || "row"}`};
  ${(props) => (props.size === "Small" ? text.bodySm : props.size === "Large" ? text.bodyLg : text.bodyMd)};

`;
