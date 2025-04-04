'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';

const Button = ({ $buttonData }) => {
  // console.log($buttonData)
  const themes = useAvailableThemes();
  const selectedTheme =
    themes.button?.[$buttonData?.theme] || themes.button.primary;

  const href = $buttonData?.link_url?.email
    ? `mailto:${$buttonData?.link_url.email}`
    : $buttonData?.link_url?.cached_url || '#';


  const target = $buttonData?.link_url?.target;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  return (
    <ButtonWrapper layout={$buttonData?.layout} size={$buttonData?.link_size}>
      <ThemeProvider theme={selectedTheme}>
        {target !== '_blank' ? (
          <Link href={`/${href}`} passHref>
            <StyledSpan>{$buttonData?.link_text}</StyledSpan>
          </Link>
        ) : (
          <StyledLink href={href} target={target} rel={rel}>
            {$buttonData?.link_text}
          </StyledLink>
        )}
      </ThemeProvider>
    </ButtonWrapper>
  );
};

export default Button;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: auto;
  padding: ${(props) => props.theme.padding};
  background: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.textColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    background: ${(props) => props.theme.hoverBgColor};
    color: ${(props) => props.theme.hoverTextColor};
    border: 1px solid ${(props) => props.theme.border};
  }
`
const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: auto;
  padding: ${(props) => props.theme.padding};
  background: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.textColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    background: ${(props) => props.theme.hoverBgColor};
    color: ${(props) => props.theme.hoverTextColor};
    border: 1px solid ${(props) => props.theme.border};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.layout || 'row'};
  gap: 1.5vw;
  ${(props) =>
    props.size === 'small'
      ? text.bodySm
      : props.size === 'large'
      ? text.bodyLg :
      props.size === 'tiny'
      ? text.tagLight
      : text.bodyMd};
  width: max-content;
`;
