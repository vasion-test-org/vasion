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
const Nav = ({ blok }) => {
  const path = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  // console.log(blok);

  let currentNavItems = blok.english_nav_items;

  if (path.startsWith('/de')) {
    currentNavItems = blok.german_nav_items;
  } else if (path.startsWith('/fr')) {
    currentNavItems = blok.french_nav_items;
  }

  // console.log(currentNavItems[0].tab_columns[0].nav_items[0]);

  const mappedNav = currentNavItems.map((item, index) => (
    <KeyDiv key={`item.tab_name-${index}`}>
      <Tab className='tabs'>{item.tab_name}</Tab>
      <Dropdown className='dropdowns' id={`dropdown-${index}`}>
        {item.tab_columns.map((column, index) => (
          <Column key={`column.column_header-${index}`}>
            <ColumnHeader>{column.column_header}</ColumnHeader>
            {column.nav_items.map((item, index) => {
              const formattedIconString = item.icon.replace(/\s+/g, '');

              let IconComponent = Icons[formattedIconString] || null;
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
                      {IconComponent ? <IconComponent /> : null}
                    </NavIconWrapper>
                  )}
                  <NavCopy>
                    <NavItemCopy card_size={item.card_size}>
                      <RichTextRenderer document={item.item_copy} />
                    </NavItemCopy>
                    {item.card_size === 'medium' && 
                        <Link href='/'>Learn More</Link>
                    }
                    {item.sub_copy && item.card && (
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

  useEffect(() => {
    ScrollTrigger.create({
      trigger: '.mainNavWrapper',
      start: 'top top',
      end: () => `${document.body.scrollHeight - window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
  }, []);

  useEffect(() => {
    gsap.set('.dropdowns', { autoAlpha: 0 });

    const allTabs = gsap.utils.toArray('.tabs');

    const tl = gsap.timeline({});

    const openDropdown = (index) => {
      console.log(index);
      tl.set(`.dropdowns`, { autoAlpha: 0 }).to(`#dropdown-${index}`, {
        autoAlpha: 1,
        duration: 0.35,
      });
    };

    allTabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => openDropdown(index));
    });
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <MainNavWrapper className='mainNavWrapper'>
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

const Link = styled.a`
  ${text.tag};
  color: ${colors.txtSubtle};
`
const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 0.125vw;
  min-height: ${(props) => (props.card_size === 'large' ? '11vw' : '4.875vw')};
  min-width: ${(props) => (props.card_size === 'large' ? '100%' : '5.438vw')};

  ${media.fullWidth} {
    min-height: ${(props) => (props.card_size === 'large' ? '176px' : '78px')};
  min-width: ${(props) => (props.card_size === 'large' ? '100%' : '87px')};
  }
  
  ${media.tablet} {
    min-height: ${(props) => (props.card_size === 'large' ? '17.188vw' : '7.617vw')};
    min-width: ${(props) => (props.card_size === 'large' ? '100%' : '8.496vw')};
  }
  
  ${media.mobile} {
  
  }
`;
const KeyDiv = styled.div``;
const NavItemSubCopy = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const NavItemCopy = styled.div`
 margin-left: ${(props) =>
    props.card_size === 'large'
      ? '1vw'
      : 'unset'};

       ${media.fullWidth} {
        margin-left: ${(props) =>
    props.card_size === 'large'
      ? '16px'
      : 'unset'};
       }
       
       ${media.tablet} {
        margin-left: ${(props) =>
    props.card_size === 'large'
      ? '1.563vw'
      : 'unset'};
       }
       
       ${media.mobile} {
       
       }
`;
const NavCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625vw;

  ${media.fullWidth} {
    gap: 10px;
  }
  
  ${media.tablet} {
    gap: 0.977vw;
  }
  
  ${media.mobile} {
  
  }
`;
const NavIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.card ? 'start' : 'unset')};
  width: ${(props) => (props.card && props.card_size ? '3.375vw' : '1.25vw')};
  height: ${(props) => (props.card && props.card_size  ? 'unset' : '1.25vw')};

  ${media.fullWidth} {
    width: ${(props) => (props.card && props.card_size ? '54px' : '20px')};
    height: ${(props) => (props.card && props.card_size  ? 'unset' : '20px')};
  }
  
  ${media.tablet} {
    width: ${(props) => (props.card && props.card_size ? '5.273vw' : '1.953vw')};
    height: ${(props) => (props.card && props.card_size  ? 'unset' : '1.953vw')};
  }
  
  ${media.mobile} {
  
  }

  svg {
    align-self: ${(props) => (props.card ? 'start' : 'unset')};
    width: 100%;
    height: 100%;
  }
`;
const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: ${(props) =>
    props.card_size === 'large' ? 'column' : 'row'};
  align-items: ${(props) => (props.card_size === 'large' ? 'start' : 'center')};
  background: ${(props) =>
    props.card_size === 'medium' ? colors.lightPurpleGrey : 'unset'};
  gap: ${(props) =>
    props.card_size === 'small'
      ? '1.25vw'
      : props.card_size === 'medium'
      ? '0.875vw'
      : '0.625vw'};

  width: ${(props) =>
    props.card_size === 'small'
      ? '17.5vw'
      : props.card_size === 'medium'
      ? '19.563vw'
      : props.card_size === 'large'
      ? '19.563vw'
      : 'auto'};

  padding: ${(props) =>
    props.card_size === 'small'
      ? '0.75vw'
      : props.card_size === 'medium'
      ? '0.25vw 0.75vw 0.25vw 0.25vw'
      : props.card_size === 'large'
      ? 'unset' : '0.25vw 0.75vw'};
  border-radius: 0.25vw;
  height: ${(props) => (props.card_size === 'large' ? '13.875vw' : 'auto')};
  box-shadow: ${(props) =>
    props.card_size === 'large'
      ? '0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)'
      : 'unset'};

${media.fullWidth} {
  gap: ${(props) =>
    props.card_size === 'small'
      ? '20px'
      : props.card_size === 'medium'
      ? '14px'
      : '10px'};

  width: ${(props) =>
    props.card_size === 'small'
      ? '280px'
      : props.card_size === 'medium'
      ? '313px'
      : props.card_size === 'large'
      ? '313px'
      : 'auto'};

  padding: ${(props) =>
    props.card_size === 'small'
      ? '12px'
      : props.card_size === 'medium'
      ? '4px 12px 4px 4px'
      : props.card_size === 'large'
      ? 'unset' : '4px 12px'};
  border-radius: 4px;
  height: ${(props) => (props.card_size === 'large' ? '222px' : 'auto')};
}

${media.tablet} {
  gap: ${(props) =>
    props.card_size === 'small'
      ? '1.953vw'
      : props.card_size === 'medium'
      ? '1.367vw'
      : '0.977vw'};

  width: ${(props) =>
    props.card_size === 'small'
      ? '27.344vw'
      : props.card_size === 'medium'
      ? '30.566vw'
      : props.card_size === 'large'
      ? '30.566vw'
      : 'auto'};

  padding: ${(props) =>
    props.card_size === 'small'
      ? '1.172vw'
      : props.card_size === 'medium'
      ? '0.391vw 1.172vw 0.391vw 0.391vw'
      : props.card_size === 'large'
      ? 'unset' : '0.391vw 1.172vw'};
  border-radius: 0.391vw;
  height: ${(props) => (props.card_size === 'large' ? '21.68vw' : 'auto')};
}

${media.mobile} {

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
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }
  
  ${media.tablet} {
    gap: 2.344vw;
  }
  
  ${media.mobile} {
  
  }
`;
const Dropdown = styled.div`
  position: absolute;
  background: ${colors.white};
  display: flex;
  flex-direction: row;
  width: max-content;
  height: auto;
  overflow: hidden;
  top: 2.7vw;
  left: 0vw;
  padding: 1.25vw 1.5vw 1.5vw 1.5vw;
  border-radius: 0 0 0.75vw 0.75vw;

  ${media.fullWidth} {
    top: 43px;
  left: 0px;
  padding: 20px 24px 24px 24px;
  border-radius: 0 0 12px 12px;
  }
  
  ${media.tablet} {
    top: 4.199vw;
  left: 0vw;
  padding: 1.953vw 2.344vw 2.344vw 2.344vw;
  border-radius: 0 0 1.172vw 1.172vw;
  }
  
  ${media.mobile} {
  
  }

  ${Column}:not(:last-child) {
    padding-right: 2vw;
    border-right: 1px solid ${colors.grey50};

    ${media.fullWidth} {
      padding-right: 32px;
    }
    
    ${media.tablet} {
      padding-right: 3.125vw;
    }
    
    ${media.mobile} {
    
    }
  }

  ${Column}:not(:first-child) {
    padding: 0 2vw;

    ${media.fullWidth} {
      padding: 0 32px;
    }
    
    ${media.tablet} {
      padding: 0 3.125vw;
    }
    
    ${media.mobile} {
    
    }
  }

  ${Column}:last-child {
    padding-right: unset;
    padding-left: 2vw;
    
    ${media.fullWidth} {
      padding: 0 32px;
    }
    
    ${media.tablet} {
      padding: 0 3.125vw;
    }
    
    ${media.mobile} {
    
    }
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

  ${media.fullWidth} {
    height: 26px;
  padding: 4px 2px;
  border-radius: 4px;
  }
  
  ${media.tablet} {
    height: 2.539vw;
  padding: 0.391vw 0.195vw;
  border-radius: 0.391vw;
  }
  
  ${media.mobile} {
  
  }

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

  ${media.fullWidth} {
    gap: 16px;
  }
  
  ${media.tablet} {
    gap: 1.563vw;
  }
  
  ${media.mobile} {
  
  }
`;
const VasionLogo = styled.img`
  width: 7.5vw;
  height: 0.938vw;

  ${media.fullWidth} {
    width: 120px;
  height: 15px;
  }
  
  ${media.tablet} {
    width: 9.766vw;
    height: 1.27vw;
  }
  
  ${media.mobile} {
  
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2vw;

  ${media.fullWidth} {
    gap: 32px;
  }
  
  ${media.tablet} {
    gap: 3.125vw;
  }
  
  ${media.mobile} {
  
  }
`;
const MainInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
  }
  
  ${media.tablet} {
    width: 96.875vw;
  }
  
  ${media.mobile} {
  
  }
`;
const MainNavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  height: 3.875vw;

  ${media.fullWidth} {
    height: 62px;
  }
  
  ${media.tablet} {
    padding: 0 1.563vw;
    height: 6.055vw;
  }
  
  ${media.mobile} {
  
  }
`;
export default Nav;
