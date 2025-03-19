'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from './Button';
import text from '@/styles/text'
import colors from '@/styles/colors'

const Nav = ({ blok }) => {
  const path = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  console.log(blok);

  let currentNavItems = blok.english_nav_items;

  if (path.startsWith('/de')) {
    currentNavItems = blok.german_nav_items;
  } else if (path.startsWith('/fr')) {
    currentNavItems = blok.french_nav_items;
  }

  console.log(currentNavItems);

  const mappedNav = currentNavItems.map((item, index) => (
    <>
    <Tab>
    {item.tab_name}
    </Tab>
    <Dropdown>
      {item.tab_columns.map((column, index) => 
        <Column>
          <ColumnHeader>
          {column.column_header}
          </ColumnHeader>
          {column.nav_items.map((item, index) =>
            <NavItem>
              herro
            </NavItem>
          )}
        </Column>
      )}
    </Dropdown>
    </>
  ))

  return (
    <ThemeProvider theme={selectedTheme}>
      <MainNavWrapper>
        <MainInner>
          <MainContent>
          <VasionLogo src='/images/logos/vasion-logo-purple.webp' />
          <Tabs>{mappedNav}</Tabs>
          </MainContent>
          {blok?.button?.map(($buttonData) => (
            <div
              {...storyblokEditable($buttonData)}
              key={$buttonData?.link_text}
            >
              <Button key={$buttonData?.link_text} $buttonData={$buttonData} />
            </div>
          ))}
        </MainInner>
      </MainNavWrapper>
    </ThemeProvider>
  );
};

const NavItem = styled.div`

`
const ColumnHeader = styled.p`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`
const Column = styled.div`
  margin-bottom: 1.5vw;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
`
const Dropdown = styled.div`
position: absolute;
border: 0.063vw solid red;
top: 10vw;
left: 0vw;
display: flex;
flex-direction: row;
  width: auto;
  height: auto;
  padding: 1.25vw 1.5vw 1.5vw 1.5vw;
`
const Tab = styled.div`
    ${text.bodyMd};
    cursor: pointer;
    display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
height: 1.625vw;
  padding: 0.25vw 0.125vw;
  border-radius: 0.25vw;

  &:hover {
    background: ${(props) => props.theme.nav.tab_hover};
  }
`
const Tabs = styled.div`
position: relative;
    display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`
const VasionLogo = styled.img`
  width: 7.5vw;
  height: 0.938vw;
`;

const MainContent = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw;
`
const MainInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 81.5vw;
`;
const MainNavWrapper = styled.div`
  width: 100%;
  height: 3.875vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export default Nav;
