'use client';
import React, { useEffect, useRef } from 'react';
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
  const dropdownIndex = useRef(null)
  let currentNavItems = blok.english_nav_items;
  const isOpen = useRef(false);
  
  if (path.startsWith('/de')) {
    currentNavItems = blok.german_nav_items;
  } else if (path.startsWith('/fr')) {
    currentNavItems = blok.french_nav_items;
  }

  const mappedNav = currentNavItems.map((item, index) => (
    <Tab key={`tab-${index}`}>
      <TabHeader className='tabHeader'>{item.tab_name}</TabHeader>
      <TabDropdown className='tabDropdowns' id={`tabHeader-${index}`}>
        {item.tab_columns.map((column, colIndex) => (
          <NavItemsDiv key={`column-${colIndex}`}>
             <ColumnHeader>{column.column_header}</ColumnHeader>
             <NavItemsContainer>
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
            </NavItemsContainer>
          </NavItemsDiv>
        ))}
      </TabDropdown>
    </Tab>
  ));
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.mobileNav',
      start: 'top top',
      end: () => `${document.body.scrollHeight - window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
  }, []);

  useEffect(() => {
    gsap.set('.tabDropdowns', { height: 0, display: 'none' });

    const allTabs = gsap.utils.toArray('.tabHeader');
    let tl = gsap.timeline({ paused: true });

    const openDropdown = (index) => {
      tl.clear();

      // Case 1: Clicking the same tab that's already open
      if (dropdownIndex.current === index && isOpen.current) {
        tl.to(`#tabHeader-${index}`, { height: 0 })
          .set(`#tabHeader-${index}`, { display: 'none' });
        isOpen.current = false;
        dropdownIndex.current = null;
        tl.play();
        return;
      }

      // Case 2: Clicking a new tab
      dropdownIndex.current = index;
      isOpen.current = true;

      tl.to('.tabDropdowns', { height: 0 })
        .set('.tabDropdowns', { display: 'none' }, ">-0.15")
        .set(`#tabHeader-${index}`, { display: 'flex' })
        .to(`#tabHeader-${index}`, { height: 'auto' });

      tl.play();
    };

    allTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => openDropdown(index));
    });

    return () => {
      allTabs.forEach((tab, index) => {
        tab.removeEventListener('click', () => openDropdown(index));
      });
    };
  }, []);
  

  return (
    <MainWrapper className='mainNavWrapper mobileNav'>
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
      props.card_size === 'large' ? '17.083vw' : '7.617vw'};
    min-width: ${(props) => (props.card_size === 'large' ? '32.292vw' : '8.496vw')};
    max-width: ${(props) => (props.card_size === 'large' ? '32.292vw' : 'unset')};;
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
    flex-direction: row;
    align-items: ${(props) =>
      props.card_size === 'large' ? 'start' : 'center'};
    background: ${(props) =>
      props.card_size === 'medium' ? colors.lightPurpleGrey : 'unset'};
    gap: ${(props) =>
      props.card_size === 'small'
        ? '3.333vw'
        : props.card_size === 'medium'
        ? '3.333vw' : props.card_size === 'large'
        ? '3.333vw'
        : '0.833vw'};

    width: ${(props) =>
      props.card_size === 'small'
        ? '100%'
        : props.card_size === 'medium'
        ? '93.333vw'
        : props.card_size === 'large'
        ? '93.333vw'
        : '50%'};

    padding: ${(props) =>
      props.card_size === 'small'
        ? '1.667vw 2.5vw'
        : props.card_size === 'medium'
        ? '0.833vw 5vw 0.833vw 0.833vw'
        : props.card_size === 'large'
        ? '1.667vw 3.333vw 1.667vw 1.667vw'
        : '1.667vw 3.333vw 1.667vw 1.667vw'};
    border-radius: 0.391vw;
    height: ${(props) => (props.card_size === 'large' ? '20.417vw' : props.card_size === 'medium'
        ? '18.75vw': 'auto')};
  }
  &:hover {
      background: ${colors.lightPurpleGrey};
      box-shadow: ${(props) =>
      props.card
        ? '0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)'
        : 'unset'};
      path {
          fill: ${(props) =>
            props.card ? colors.lightPurple : colors.primaryOrange};
        }
  
      g {
        path {
          fill: ${(props) =>
            props.card ? colors.white : colors.primaryOrange};
        }
      }
  
      ${Link} {
        color: ${colors.primaryOrange};
      }
    }
`;

const ColumnHeader = styled.p`
${media.mobile} {
  margin-bottom: 3.333vw;
}
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;

const NavItemsContainer = styled.div`
${media.mobile} {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  row-gap: 3.333vw;
}
`
const NavItemsDiv = styled.div`
${media.mobile} {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 96.667vw;
}
`;
const TabDropdown = styled.div`
${media.mobile} {
  display: flex;
  flex-direction: column;
  padding: 1.667vw 1.667vw 5vw 1.667vw;
  gap: 3.333vw;
}
`;
const TabHeader = styled.div`
  ${media.mobile} {
    padding: 3.542vw 3.333vw;
    height: 10.833vw;
    /* margin-bottom: 3.333vw; */
    width: 100%;
    background: rgba(61, 37, 98, 0.05);

  }
`;
const Tab = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  
  ${TabHeader}:not(:last-child) {
      border-bottom: 1px solid ${colors.ghostGrey};
    }
`;
const Dropdown = styled.div`
  ${media.mobile} {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    top: 12.708vw;
    /* border: 1px solid red; */
    overflow: scroll;
  }
`;
const Hamburger = styled.div`
  ${media.mobile} {
    width: 4.167vw;
    height: 2.292vw;
    /* border: 1px solid red; */
  }
`;
const VasionLogo = styled.img`
  ${media.mobile} {
    width: 20.833vw;
    height: 2.917vw;
  }
`;
const MainWrapper = styled.div`
  ${media.mobile} {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${colors.white};
    width: 100%;
    z-index: 10;
    height: 12.821vw;
    /* border: 1px solid blue; */
  }
`;
export default MobileNav;
