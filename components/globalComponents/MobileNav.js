'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
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
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from './Image';

gsap.registerPlugin(ScrollTrigger);
const MobileNav = ({ blok }) => {
  const path = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  let currentNavItems = blok.english_nav_items;

  if (path.startsWith('/de')) {
    currentNavItems = blok.german_nav_items;
  } else if (path.startsWith('/fr')) {
    currentNavItems = blok.french_nav_items;
  }

  console.log(currentNavItems);
  const mappedNav = currentNavItems.map((item, index) => (
    <Tab key={`tab-${index}`}>
      <TabHeader>{item.tab_name}</TabHeader>
      <TabDropdown>
        {item.tab_columns.map((column, colIndex) => (
          <NavItemsDiv key={`column-${colIndex}`}>
            {column.nav_items.map((item, itemIndex) => {
              const formattedIconString = item.icon.replace(/\s+/g, '');
              const IconComponent = Icons[formattedIconString] || null;
  
              console.log(item);
  
              return (
                <NavItem
                  key={`item-${item._uid}`}
                  card={item.card}
                  card_size={item.card_size}
                >
                  {item.card && item.card_size && item.card_size !== 'small' && (
                    <ImageWrapper card_size={item.card_size}>
                      <Image images={item?.card_image?.[0].media} />
                    </ImageWrapper>
                  )}
                  {IconComponent && (
                    <NavIconWrapper card={item.card} card_size={item.card_size}>
                      <IconComponent />
                    </NavIconWrapper>
                  )}
                  <NavCopy>
                    <NavItemCopy card_size={item.card_size}>
                      <RichTextRenderer document={item.item_copy} />
                    </NavItemCopy>
                    {item.card_size === 'medium' && (
                      <Link href='/'>Learn More</Link>
                    )}
                    {item.sub_copy && item.card && (
                      <NavItemSubCopy>{item.sub_copy}</NavItemSubCopy>
                    )}
                  </NavCopy>
                </NavItem>
              );
            })}
          </NavItemsDiv>
        ))}
      </TabDropdown>
    </Tab>
  ));
  

  return (
    <MainWrapper>
      <VasionLogo src='/images/logos/vasion-logo-purple.webp' />
      <Hamburger></Hamburger>
      <Dropdown>{mappedNav}</Dropdown>
    </MainWrapper>
  );
};

const Link = styled.a`
  ${text.tag};
  color: ${colors.txtSubtle};
`;
const ImageWrapper = styled.div`
  overflow: hidden;

  ${media.mobile} {
    border-radius: 0.417vw;
    min-height: ${(props) =>
      props.card_size === 'large' ? '17.188vw' : '7.617vw'};
    min-width: ${(props) => (props.card_size === 'large' ? '100%' : '8.496vw')};
  }
`;
const KeyDiv = styled.div``;
const NavItemSubCopy = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const NavItemCopy = styled.div`
  ${media.mobile} {
    margin-left: ${(props) =>
      props.card_size === 'large' ? '3.333vw' : 'unset'};
  }
`;
const NavCopy = styled.div`
  display: flex;
  flex-direction: column;
  ${media.mobile} {
    gap: 2.083vw;
  }
`;
const NavIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.card ? 'start' : 'unset')};

  ${media.mobile} {
    width: ${(props) => (props.card && props.card_size ? '54px' : '20px')};
    height: ${(props) => (props.card && props.card_size ? 'unset' : '20px')};
  }

  svg {
    align-self: ${(props) => (props.card ? 'start' : 'unset')};
    width: 100%;
    height: 100%;
  }
`;
const NavItem = styled.div`
  ${media.mobile} {
    cursor: pointer;
    display: flex;
    flex-direction: ${(props) =>
      props.card_size === 'large' ? 'column' : 'row'};
    align-items: ${(props) =>
      props.card_size === 'large' ? 'start' : 'center'};
    background: ${(props) =>
      props.card_size === 'medium' ? colors.lightPurpleGrey : 'unset'};
    gap: ${(props) =>
      props.card_size === 'small'
        ? '3.333vw'
        : props.card_size === 'medium'
        ? '3.333vw'
        : '3.333vw'};

    width: ${(props) =>
      props.card_size === 'small'
        ? '96.667vw'
        : props.card_size === 'medium'
        ? '93.333vw'
        : props.card_size === 'large'
        ? '93.333vw'
        : 'auto'};

    padding: ${(props) =>
      props.card_size === 'small'
        ? '1.667vw 2.5vw'
        : props.card_size === 'medium'
        ? '0.833vw 5vw 0.833vw 0.833vw'
        : props.card_size === 'large'
        ? 'unset'
        : '1.667vw 3.333vw 1.667vw 1.667vw'};
    border-radius: 0.391vw;
    height: ${(props) => (props.card_size === 'large' ? '20.417vw' : 'auto')};
  }
`;
const NavItemsDiv = styled.div``;
const TabDropdown = styled.div`
  display: flex;
  flex-direction: column;
`;
const TabHeader = styled.div`
  ${media.mobile} {
    padding: 3.542vw 3.333vw;
    height: 10.833vw;
    margin-bottom: 3.333vw;
    width: 100%;
    background: rgba(61, 37, 98, 0.05);
  }
`;
const Tab = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
`;
const Dropdown = styled.div`
  ${media.mobile} {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    top: 12.708vw;
    border: 1px solid red;
  }
`;
const Hamburger = styled.div`
  ${media.mobile} {
    width: 4.167vw;
    height: 2.292vw;
    border: 1px solid red;
  }
`;
const VasionLogo = styled.div`
  ${media.mobile} {
    width: 20.833vw;
    height: 2.917vw;
  }
`;
const MainWrapper = styled.div`
  ${media.mobile} {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${colors.white};
    height: 12.821vw;
    border: 1px solid blue;
  }
`;
export default MobileNav;
