'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from './Button';
import text from '@/styles/text';
import colors from '@/styles/colors';
import Icons from '@/components/renderers/Icons';

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

  console.log(currentNavItems[0].tab_columns[0].nav_items[0]);

  const mappedNav = currentNavItems.map((item, index) => (
    <KeyDiv key={`item.tab_name-${index}`}>
      <Tab>{item.tab_name}</Tab>
      <Dropdown>
        {item.tab_columns.map((column, index) => (
          <Column key={`column.column_header-${index}`}>
            <ColumnHeader>{column.column_header}</ColumnHeader>
            {column.nav_items.map((item, index) => {
              console.log("Item Icon String:", item.icon);
              console.log("Icons Object:", Icons);
              console.log("Resolved Component:", Icons[item.icon]); 
              const IconComponent = Icons[item.icon] || null;

              return (
                <NavItem key={`item.item_copy-${index}`} card={item.card} card_size={item.card_size}>
                  <NavIconWrapper card={item.card}>
                    {IconComponent ? <IconComponent /> : null}
                  </NavIconWrapper>
                  <NavCopy>
                    <NavItemCopy>{item.item_copy}</NavItemCopy>
                    {item.sub_copy && (
                      <NavItemSubCopy>{item.sub_copy}</NavItemSubCopy>
                    )}
                  </NavCopy>
                </NavItem>
              );
            })}
          </Column>
        ))}
      </Dropdown>
    </KeyDiv>
  ));

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

const KeyDiv = styled.div``
const NavItemSubCopy = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const NavItemCopy = styled.div`
  ${text.bodyMdBold};
`;
const NavCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625vw;
`;
const NavIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.card ? 'start' : 'unset')};
  width: ${(props) => (props.card ? '3.375vw' : '1.25vw')};
  height: ${(props) => (props.card ? 'unset' : '1.25vw')};

  svg {
  align-self: ${(props) => (props.card ? 'start' : 'unset')};
  width: 100%;
  height: 100%;
  }
`;
const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => (props.card ? '1.25vw' : '0.625vw')};
  width: ${(props) => (props.card ? '17.5vw' : 'auto')};
  padding: ${(props) => (props.card ? '0.75vw' : 'unset')};

  &:hover {
    path{

      fill: ${(props) => (props.card ? colors.lightPurplestory : colors.primaryOrange)};

    }
  }
`;
const ColumnHeader = styled.p`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
`;
const Dropdown = styled.div`
  position: absolute;
  border: 0.063vw solid red;
  top: 10vw;
  left: 0vw;
  display: flex;
  flex-direction: row;
  width: max-content;
  height: auto;
  overflow: hidden;
  padding: 1.25vw 1.5vw 1.5vw 1.5vw;
  border-radius: 0 0 0.75vw 0.75vw;

  ${Column}:not(:last-child) {
    padding-right: 2vw;
    border-right: 1px solid ${colors.txtSubtle};
  }

  ${Column}:last-child {
    padding-left: 2vw;
  }
`;
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
`;
const Tabs = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1vw;
`;
const VasionLogo = styled.img`
  width: 7.5vw;
  height: 0.938vw;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw;
`;
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
