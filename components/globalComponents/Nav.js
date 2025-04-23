'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useRouter, usePathname } from 'next/navigation';
import NextLink from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from './Button';
import text from '@/styles/text';
import colors from '@/styles/colors';
import Icons from '@/components/renderers/Icons';
import Image from './Image';
import LinkArrow from 'assets/svg/LinkArrow.svg';
import LanguageGlobe from 'assets/svg/languageglobe.svg';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AnchorNavigator from '@/components/globalComponents/AnchorNavigator';

gsap.registerPlugin(ScrollTrigger);

const Nav = ({ blok }) => {
  const router = useRouter();
  const path = usePathname();

  const [language, setLanguage] = useState('en');
  const [navItems, setNavItems] = useState(blok.english_nav_items);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const { locale } = useRouter();

  useEffect(() => {
    function checkPathLocale(url) {
      const { pathname } = new URL(url, 'https://vasion.com');
      const pathLocale = pathname.split('/')[1];
      const supportedLocales = ['en', 'fr', 'de'];
      const defaultLocale = 'en';

      const lang = supportedLocales.includes(pathLocale)
        ? pathLocale
        : defaultLocale;
      setLanguage(lang);

      if (lang === 'de') {
        setNavItems(blok.german_nav_items);
      } else if (lang === 'fr') {
        setNavItems(blok.french_nav_items);
      } else {
        setNavItems(blok.english_nav_items);
      }
    }

    if (path) {
      checkPathLocale(path);
    }
  }, [path, blok]);

  const slugParts = path.split('/').filter(Boolean);
  const currentLocale = ['de', 'fr'].includes(slugParts[0])
    ? slugParts[0]
    : null;
  const nonHomeSlug = currentLocale
    ? slugParts.slice(1).join('/')
    : slugParts.join('/');

  const handleNavigate = (locale) => {
    const basePath = locale === 'en' ? '' : `/${locale}`;
    const newPath = nonHomeSlug
      ? `${basePath}/${nonHomeSlug}`
      : basePath || '/';
    router.push(newPath);
  };

  const mappedNav = navItems.map((item, index) => (
    <KeyDiv key={`item.tab_name-${index}`}>
      <Tab className='tabs'>{item.tab_name}</Tab>
      <Dropdown className='dropdowns' id={`dropdown-${index}`}>
        {item.tab_columns.map((column, colIdx) => (
          <Column key={`column.column_header-${colIdx}`}>
            <ColumnHeader>{column.column_header}</ColumnHeader>
            {column.nav_items.map((navItem, itemIdx) => {
              const formattedIconString = navItem.icon.replace(/\s+/g, '');
              const IconComponent = Icons[formattedIconString] || null;

              const rawUrl = navItem.item_link?.cached_url || '#';
              const isExternal =
                rawUrl.startsWith('http://') || rawUrl.startsWith('https://');
              const supportedLocales = ['en', 'fr', 'de'];
              const rawPathParts = rawUrl.split('/').filter(Boolean);
              const alreadyHasLocale = supportedLocales.includes(
                rawPathParts[0]
              );

              const normalizedUrl = isExternal
                ? rawUrl
                : `/${
                    alreadyHasLocale ? '' : currentLocale ?? ''
                  }/${rawUrl}`.replace(/\/+/g, '/');

              return (
                <StyledNextLink
                  href={isExternal ? normalizedUrl : normalizedUrl}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  passHref
                  key={`item-${navItem._uid}`}
                >
                  <NavItem
                    card={navItem.card}
                    card_size={navItem.card_size}
                    role='link'
                    tabIndex={0}
                  >
                    {navItem.card &&
                      navItem.card_size &&
                      navItem.card_size !== 'small' && (
                        <ImageWrapper card_size={navItem.card_size}>
                          <Image images={navItem?.card_image?.[0].media} />
                        </ImageWrapper>
                      )}
                    {IconComponent && (
                      <NavIconWrapper
                        card={navItem.card}
                        card_size={navItem.card_size}
                      >
                        <IconComponent />
                      </NavIconWrapper>
                    )}
                    <NavCopy>
                      <NavItemCopy card_size={navItem.card_size}>
                        <RichTextRenderer document={navItem.item_copy} />
                      </NavItemCopy>
                      {navItem.card_size === 'medium' && (
                        <StyledAnchor
                          onClick={(e) => e.stopPropagation()}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                          Learn More
                        </StyledAnchor>
                      )}
                      {navItem.sub_copy && navItem.card && (
                        <NavItemSubCopy>{navItem.sub_copy}</NavItemSubCopy>
                      )}
                    </NavCopy>
                  </NavItem>
                </StyledNextLink>
              );
            })}
          </Column>
        ))}
      </Dropdown>
    </KeyDiv>
  ));

  const navReady = navItems && navItems.length > 0;

  useEffect(() => {
    if (!navReady) return;

    const footer = document.querySelector('.footer');
    if (!footer) return;

    const anchorNav = document.querySelector('.anchorNav');
    if (!anchorNav) return;

    const footerOffset = footer.offsetTop + footer.offsetHeight;

    const anchorTl = gsap.timeline({
      scrollTrigger: {
        start: '+=125 top',
        // markers: true,
        scrub: true,
      },
    });

    anchorTl.to('.anchorNav', { autoAlpha: 1 });

    ScrollTrigger.create({
      trigger: '.desktopNav',
      start: 'top top',
      end: `${footerOffset}px`,
      pin: true,
      pinSpacing: false,
    });
  }, [navReady]);

  useEffect(() => {
    if (!navReady) return;

    gsap.set('.dropdowns', { autoAlpha: 0, display: 'flex' });

    const allTabs = gsap.utils.toArray('.tabs');
    const allDropdowns = gsap.utils.toArray('.dropdowns');
    const navWrapper = document.querySelector('.mainNavWrapper');

    let isAnimating = false;
    let queuedIndex = null;

    const closeDropdown = () => {
      isAnimating = true;
      return gsap.to('.dropdowns', {
        autoAlpha: 0,
        duration: 0.35,
        onComplete: () => {
          isAnimating = false;
          if (queuedIndex !== null) {
            const indexToOpen = queuedIndex;
            queuedIndex = null;
            openDropdown(indexToOpen);
          }
        },
      });
    };

    const openDropdown = (index) => {
      if (isAnimating) {
        queuedIndex = index;
        return;
      }
      gsap.to(`#dropdown-${index}`, {
        autoAlpha: 1,
        duration: 0.35,
      });
    };

    allTabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => {
        closeDropdown().then(() => {});
        queuedIndex = index;
      });
    });

    allDropdowns.forEach((dropdown) => {
      dropdown.addEventListener('mouseleave', closeDropdown);
    });

    if (navWrapper) {
      navWrapper.addEventListener('mouseleave', closeDropdown);
    }

    return () => {
      allTabs.forEach((tab, index) => {
        tab.removeEventListener('mouseenter', () => openDropdown(index));
      });
      allDropdowns.forEach((dropdown) => {
        dropdown.removeEventListener('mouseleave', closeDropdown);
      });
      if (navWrapper) {
        navWrapper.removeEventListener('mouseleave', closeDropdown);
      }
    };
  }, [navReady, anchorNav]);

  useEffect(() => {
    const handleGlobeHover = () => {
      gsap.to('#languageItemsContainer', { width: '100%' });
    };

    const handleGlobeExit = () => {
      gsap.to('#languageItemsContainer', { width: '0%' });
    };

    const globe = document.querySelector('#globe');
    const langSelector = document.querySelector('#languageSelector');

    globe?.addEventListener('mouseenter', handleGlobeHover);
    langSelector?.addEventListener('mouseleave', handleGlobeExit);

    return () => {
      globe?.removeEventListener('mouseenter', handleGlobeHover);
      langSelector?.removeEventListener('mouseleave', handleGlobeExit);
    };
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <>
        <TopNav>
          <TopElementsContainer>
            <Banner>
              <BannerMessage>{blok.banner}</BannerMessage>
              {blok?.banner_link?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} />
                </div>
              ))}
            </Banner>
            <LanguageSelector id='languageSelector'>
              <LanguageItems id='languageItemsContainer'>
                <LanguageItem onClick={() => handleNavigate('en')}>
                  English
                </LanguageItem>
                <LanguageItem onClick={() => handleNavigate('fr')}>
                  French
                </LanguageItem>
                <LanguageItem onClick={() => handleNavigate('de')}>
                  German
                </LanguageItem>
              </LanguageItems>
              <LanguageIcon id='globe' />
            </LanguageSelector>
          </TopElementsContainer>
        </TopNav>
        <MainNavWrapper className='mainNavWrapper desktopNav'>
          <MainInner>
            <MainContent>
              <a href='/'>
                <VasionLogo src='/images/logos/vasion-logo-purple.webp' />
              </a>
              <Tabs>{mappedNav}</Tabs>
            </MainContent>
            {blok?.button?.map(($buttonData) => (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData?.link_text}
              >
                <Button $buttonData={$buttonData} />
              </div>
            ))}
          </MainInner>
          <AnchorNavigator />
        </MainNavWrapper>
      </>
    </ThemeProvider>
  );
};

const StyledNextLink = styled(NextLink)`
  ${text.tag};
  color: ${colors.txtSubtle};
`;
const StyledAnchor = styled.span`
  ${text.tag};
  color: ${colors.primaryOrange};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${colors.primaryOrange};
  }
`;

const TopElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: unset;
  justify-content: space-between;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
  }

  ${media.tablet} {
    max-width: unset;
  }
`;
const LanguageIcon = styled(LanguageGlobe)`
  width: 1.667vw;
  height: 1.667vw;
  margin-left: 0.694vw;

  ${media.fullWidth} {
    width: 24px;
    height: 24px;
    margin-left: 10px;
  }

  ${media.tablet} {
    width: 2.344vw;
    height: 2.344vw;
    margin-left: 0.977vw;
  }

  ${media.mobile} {
  }
`;
const LanguageItem = styled.div`
  border-radius: 0.139vw;
  padding: 0.208vw;

  ${media.fullWidth} {
    border-radius: 2px;
    padding: 3px;
  }

  ${media.tablet} {
    border-radius: 0.195vw;
    padding: 0.293vw;
  }

  ${media.mobile} {
  }

  &:hover {
    background-color: ${colors.primaryOrange};
    color: ${colors.white};
  }
`;
const LanguageItems = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 0%;
  gap: 1.042vw;

  ${media.fullWidth} {
    gap: 15px;
  }

  ${media.tablet} {
    gap: 1.465vw;
  }

  ${media.mobile} {
  }
`;
const LanguageSelector = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;
const BannerArrow = styled(LinkArrow)`
  width: 0.556vw;
  height: 0.556vw;
  margin-left: 0.278vw;

  ${media.fullWidth} {
    width: 8px;
    height: 8px;
    margin-left: 4px;
  }

  ${media.tablet} {
    width: 0.781vw;
    height: 0.781vw;
    margin-left: 0.391vw;
  }

  ${media.mobile} {
  }
`;
const BannerLink = styled.div`
  cursor: pointer;

  &:hover {
    ${BannerArrow} {
      transition-duration: 500ms;
      margin-left: 0.556vw;

      ${media.fullWidth} {
        margin-left: 8px;
      }

      ${media.tablet} {
        margin-left: 0.781vw;
      }

      ${media.mobile} {
      }
    }
  }
`;
const BannerMessage = styled.p``;
const Banner = styled.div`
  ${text.bodySm};
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${colors.white};
  gap: 2.222vw;

  ${media.fullWidth} {
    gap: 32px;
  }

  ${media.tablet} {
    gap: 3.125vw;
  }

  ${media.mobile} {
  }
`;

const TopNav = styled.nav`
  background-image: url('images/TopBar.png');
  background-color: ${colors.darkPurple};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0vw 8.278vw;
  height: 2.778vw;

  ${media.fullWidth} {
    background-image: unset;
    background-color: ${colors.darkPurple};
    padding: 0px 148px;
    height: 40px;
  }

  ${media.tablet} {
    padding: 0vw 1.563vw;
    height: 3.906vw;
  }

  ${media.mobile} {
  }
`;
const Link = styled.a`
  ${text.tag};
  color: ${colors.txtSubtle};
`;
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
    min-height: ${(props) =>
      props.card_size === 'large' ? '17.188vw' : '7.617vw'};
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
  color: ${colors.grey800};
  margin-left: ${(props) => (props.card_size === 'large' ? '1vw' : 'unset')};

  ${media.fullWidth} {
    margin-left: ${(props) => (props.card_size === 'large' ? '16px' : 'unset')};
  }

  ${media.tablet} {
    margin-left: ${(props) =>
      props.card_size === 'large' ? '1.563vw' : 'unset'};
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
  min-width: ${(props) =>
    props.card && props.card_size ? '2.375vw' : '1.25vw'};
  max-width: ${(props) =>
    props.card && props.card_size ? '2.375vw' : '1.25vw'};
  height: ${(props) => (props.card && props.card_size ? 'unset' : '1.25vw')};

  ${media.fullWidth} {
    min-width: ${(props) => (props.card && props.card_size ? '38px' : '20px')};
    max-width: ${(props) => (props.card && props.card_size ? '38px' : '20px')};
    height: ${(props) => (props.card && props.card_size ? 'unset' : '20px')};
  }

  ${media.tablet} {
    min-width: ${(props) =>
      props.card && props.card_size ? '3.711vw' : '1.953vw'};
    max-width: ${(props) =>
      props.card && props.card_size ? '3.711vw' : '1.953vw'};
    height: ${(props) => (props.card && props.card_size ? 'unset' : '1.953vw')};
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
      ? 'unset'
      : '0.25vw 0.75vw'};
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
        ? 'unset'
        : '4px'};
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
        ? 'unset'
        : '0.391vw 1.172vw'};
    border-radius: 0.391vw;
    height: ${(props) => (props.card_size === 'large' ? '21.68vw' : 'auto')};
  }

  ${media.mobile} {
  }
  &:hover {
    background: ${(props) =>
      props.card_size === 'large' ? 'unset' : colors.lightPurpleGrey};
    box-shadow: ${(props) =>
      props.card_size === 'large'
        ? '0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)'
        : props.card_size === 'medium'
        ? '0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)'
        : 'unset'};
    path {
      fill: ${(props) =>
        props.card ? colors.lightPurple : colors.primaryOrange};
    }

    g {
      path {
        fill: ${(props) => (props.card ? colors.white : colors.primaryOrange)};
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
  display: none;
  flex-direction: row;
  width: max-content;
  height: auto;
  overflow: hidden;
  z-index: 11;
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
  padding: 0.125vw 0.25vw;
  border-radius: 0.25vw;

  ${media.fullWidth} {
    height: 26px;
    padding: 2px 4px;
    border-radius: 4px;
  }

  ${media.tablet} {
    height: 2.539vw;
    padding: 0.195vw 0.391vw;
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
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${colors.white};
  height: 3.875vw;
  z-index: 10;

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
