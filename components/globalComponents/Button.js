'use client'
import React from 'react';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';

const Button = ({ $buttonData }) => {
  const themes = useAvailableThemes();
  const selectedTheme =
    themes.button?.[$buttonData?.theme] || themes.button.primary;

  const href = $buttonData?.link_url.email
    ? `mailto:${$buttonData?.link_url.email}`
    : $buttonData?.link_url.url || '#';

  const isExternal =
    $buttonData?.link_url?.url?.startsWith('http') ||
    $buttonData?.link_url?.email;
  const target =
    $buttonData?.link_url?.target === '_blank' || isExternal
      ? '_blank'
      : undefined;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  return (
    <ButtonWrapper layout={$buttonData?.layout} size={$buttonData?.link_size}>
      <ThemeProvider theme={selectedTheme}>
        <NextLink href={href} passHref target={target} rel={rel}>
          {$buttonData?.link_text}
        </NextLink>
      </ThemeProvider>
    </ButtonWrapper>
  );
};

export default Button;

const NextLink = styled(Link)`
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
    props.size === 'Small'
      ? text.bodySm
      : props.size === 'Large'
      ? text.bodyLg
      : text.bodyMd};
  width: max-content;
`;
