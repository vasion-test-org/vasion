'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter, usePathname } from 'next/navigation';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Button from './Button';
import text from '@/styles/text';
import colors from '@/styles/colors';
import IconRenderer from '@/components/renderers/Icons';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from './Image';
import LinkArrow from 'assets/svg/LinkArrow.svg';
import LanguageGlobe from 'assets/svg/languageglobe.svg';
import AnchorNavigator from '@/components/globalComponents/AnchorNavigator';
import { getStoryblokApi } from '@/lib/storyblok';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';

gsap.registerPlugin(ScrollTrigger);
const MobileNav = ({ blok }) => {
  const router = useRouter();
  const path = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const dropdownIndex = useRef(null);
  const [currentNavItems, setCurrentNavItems] = useState(
    blok?.english_nav_items || []
  );
  const isOpen = useRef(false);
  const copycomponents = [
    'body_copy',
    'header',
    'eyebrow',
    'long_form_text',
    'copy_block',
  ];
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [openTabIndex, setOpenTabIndex] = useState(null);
  const mobileOpenRef = useRef(false);

  const slugParts = path.split('/').filter(Boolean);
  const currentLocale = ['de', 'fr'].includes(slugParts[0])
    ? slugParts[0]
    : null;
  const nonHomeSlug = currentLocale
    ? slugParts.slice(1).join('/')
    : slugParts.join('/');

  useEffect(() => {
    setActiveLanguage(currentLocale ?? 'en');
    if (currentLocale === 'de') {
      setCurrentNavItems(blok?.german_nav_items || []);
    } else if (currentLocale === 'fr') {
      setCurrentNavItems(blok?.french_nav_items || []);
    } else {
      setCurrentNavItems(blok?.english_nav_items || []);
    }
  }, [currentLocale, blok]);

  // Close mobile dropdown when pathname changes
  useEffect(() => {
    closeMobileDropdown();
  }, [path]);

  // Add click-based language selector for mobile with GSAP animations
  useEffect(() => {
    const handleClickOutside = (event) => {
      const languageSelector = document.querySelector('.language-selector');
      if (languageSelector && !languageSelector.contains(event.target)) {
        setShowLanguageDropdown(false);
        // Animate language items container closing
        gsap.to('#languageItemsContainer', { width: '0%', duration: 0.35 });
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);

  const toggleLanguageDropdown = () => {
    if (showLanguageDropdown) {
      // Animate language items container closing
      gsap.to('#languageItemsContainer', { width: '0%', duration: 1 });
    } else {
      // Animate language items container opening
      gsap.to('#languageItemsContainer', { width: '100%', duration: 2 });
    }
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  // Function to close mobile dropdown
  const closeMobileDropdown = () => {
    const dropdown = document.querySelector('.mobileDropdown');
    const hamburger = document.querySelector('.hamburger');

    if (!dropdown || !mobileOpenRef.current) return;

    // Close dropdown with animation
    gsap.to(dropdown, {
      height: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => gsap.set(dropdown, { display: 'none' }),
    });

    // Reset hamburger animation
    if (hamburger) {
      gsap.to('#slice-0', { top: '0', rotate: 0, duration: 0.3 });
      gsap.to('#slice-1', { opacity: 1, duration: 0.3 });
      gsap.to('#slice-2', { top: '0', rotate: 0, duration: 0.3 });
    }

    // Reset state
    mobileOpenRef.current = false;
    isOpen.current = false;
    dropdownIndex.current = null;
    setOpenTabIndex(null);
  };

  const handleNavigate = async (locale) => {
    const basePath = locale === 'en' ? '' : `/${locale}`;
    const newPath = nonHomeSlug
      ? `${basePath}/${nonHomeSlug}`
      : basePath || '/';

    try {
      const storyblokApi = getStoryblokApi();
      const storySlug = nonHomeSlug || 'home';

      const { data } = await storyblokApi.get(`cdn/stories/${storySlug}`, {
        version: 'published',
        language: locale,
      });

      if (data.story) {
        // Update navigation items immediately based on selected language
        if (locale === 'de') {
          setCurrentNavItems(blok?.german_nav_items || []);
        } else if (locale === 'fr') {
          setCurrentNavItems(blok?.french_nav_items || []);
        } else {
          setCurrentNavItems(blok?.english_nav_items || []);
        }

        setActiveLanguage(locale);
        setShowLanguageDropdown(false);
        // Animate language items container closing
        gsap.to('#languageItemsContainer', { width: '0%', duration: 0.35 });
        // Close mobile dropdown before navigation
        closeMobileDropdown();
        router.push(newPath);
      } else {
        setTooltipMessage(
          'This page is not yet available in the selected language'
        );
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }
    } catch (error) {
      setTooltipMessage(
        'This page is not yet available in the selected language'
      );
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }
  };

  const mappedNav = currentNavItems.map((item, index) => {
    let navItemCount = 0;
    let ctaRendered = false;

    return (
      <Tab key={`tab-${index}`}>
        <TabHeader className="tabHeader" isOpen={openTabIndex === index}>
          {item.tab_name}
        </TabHeader>
        <TabDropdown className="tabDropdowns" id={`tabHeader-${index}`}>
          {item.tab_columns.map((column, colIndex) => (
            <NavItemsDiv key={`column-${colIndex}`}>
              {column?.column_header && (
                <ColumnHeader>{column.column_header}</ColumnHeader>
              )}
              <NavItemsContainer>
                {column.nav_items.map((navItem, itemIndex) => {
                  navItemCount++;
                  const formattedIconString = navItem.icon.replace(/\s+/g, '');
                  const IconComponent = ({ ...props }) => (
                    <IconRenderer iconName={formattedIconString} {...props} />
                  );
                  const rawUrl = navItem.item_link?.cached_url || '#';
                  const isExternal =
                    rawUrl.startsWith('http://') ||
                    rawUrl.startsWith('https://');
                  const normalizedUrl = isExternal
                    ? rawUrl
                    : rawUrl.startsWith('/')
                    ? rawUrl
                    : `/${rawUrl}`;

                  const handleClick = () => {
                    if (normalizedUrl === '#') return;

                    // Close mobile dropdown before navigation
                    closeMobileDropdown();

                    if (isExternal) {
                      window.open(
                        normalizedUrl,
                        '_blank',
                        'noopener,noreferrer'
                      );
                    } else {
                      window.location.href = normalizedUrl;
                    }
                  };

                  return (
                    <React.Fragment key={`item-${navItem._uid}`}>
                      <NavItem
                        card={navItem.card}
                        card_size={navItem.card_size}
                        onClick={handleClick}
                        role="link"
                        tabIndex={0}
                      >
                        {navItem.card &&
                          navItem.card_size &&
                          navItem.card_size !== 'small' && (
                            <ImageWrapper card_size={navItem.card_size}>
                              <Image images={navItem?.card_image?.[0].media} />
                            </ImageWrapper>
                          )}
                        {formattedIconString && (
                          <NavIconWrapper
                            card={navItem.card}
                            card_size={navItem.card_size}
                          >
                            <IconComponent />
                          </NavIconWrapper>
                        )}
                        <NavCopy>
                          <NavItemCopy card_size={navItem.card_size}>
                            <NavItemTitleWrapper>
                              <RichTextRenderer document={navItem.item_copy} />
                              {navItem.add_chevron_arrow &&
                                !navItem.orange_chevron && (
                                  <ChevronArrow
                                    src="/images/uiElements/chevron-arrow-label.webp"
                                    alt={'chevron-orange-link'}
                                  />
                                )}
                            </NavItemTitleWrapper>
                            {navItem?.button_group?.map(($buttonData) => {
                              return (
                                <CardButtonContainer
                                  {...storyblokEditable($buttonData)}
                                  key={$buttonData.link_text}
                                >
                                  <Button
                                    key={$buttonData.link_text}
                                    $buttonData={$buttonData}
                                  />
                                </CardButtonContainer>
                              );
                            })}
                          </NavItemCopy>
                          {navItem.card_size === 'medium' && (
                            <Link
                              href={normalizedUrl}
                              target={isExternal ? '_blank' : '_self'}
                              rel={
                                isExternal ? 'noopener noreferrer' : undefined
                              }
                              onClick={(e) => e.stopPropagation()}
                            >
                              Learn More
                            </Link>
                          )}
                          {navItem.sub_copy && navItem.card && (
                            <NavItemSubCopy>{navItem.sub_copy}</NavItemSubCopy>
                          )}
                        </NavCopy>
                      </NavItem>

                      {/* INSERT CTA AFTER THE 3RD NAV ITEM OVERALL, ONLY ONCE */}
                      {navItemCount === 3 &&
                        !ctaRendered &&
                        item.cta &&
                        item.cta?.[0]?.media?.[0]?.media?.[0]?.filename &&
                        (() => {
                          ctaRendered = true;
                          return (
                            <DropDownCTA
                              bgimg={
                                item.cta?.[0]?.media?.[0]?.media?.[0]?.filename
                              }
                            >
                              {item.cta?.[0]?.copy_sections.map(
                                (ctaItem, ctaIndex) => (
                                  <div
                                    key={`cta-item-${ctaIndex}`}
                                    {...storyblokEditable(ctaItem)}
                                  >
                                    {copycomponents.includes(
                                      ctaItem.component
                                    ) ? (
                                      <RichTextRenderer
                                        document={ctaItem.copy}
                                        blok={ctaItem}
                                      />
                                    ) : (
                                      <ComponentRenderer blok={ctaItem} />
                                    )}
                                  </div>
                                )
                              )}
                            </DropDownCTA>
                          );
                        })()}
                    </React.Fragment>
                  );
                })}
              </NavItemsContainer>
            </NavItemsDiv>
          ))}
        </TabDropdown>
      </Tab>
    );
  });

  // If no navigation data, show a fallback
  if (!currentNavItems || currentNavItems.length === 0) {
    const fallbackNav = [
      {
        tab_name: 'Test Tab',
        tab_columns: [
          {
            column_header: 'Test Column',
            nav_items: [
              {
                _uid: 'test-item',
                item_copy: {
                  content: [
                    { type: 'paragraph', content: [{ text: 'Test Item' }] },
                  ],
                },
                item_link: { cached_url: '#' },
                icon: 'home',
              },
            ],
          },
        ],
      },
    ];

    const fallbackMappedNav = fallbackNav.map((item, index) => (
      <Tab key={`fallback-tab-${index}`}>
        <TabHeader className="tabHeader" isOpen={false}>
          {item.tab_name}
        </TabHeader>
        <TabDropdown className="tabDropdowns" id={`tabHeader-${index}`}>
          {item.tab_columns.map((column, colIndex) => (
            <NavItemsDiv key={`fallback-column-${colIndex}`}>
              {column?.column_header && (
                <ColumnHeader>{column.column_header}</ColumnHeader>
              )}
              <NavItemsContainer>
                {column.nav_items.map((item, itemIndex) => (
                  <NavItem
                    key={`fallback-item-${item._uid}`}
                    onClick={() => {}}
                    role="link"
                    tabIndex={0}
                  >
                    <NavCopy>
                      <NavItemCopy>
                        <RichTextRenderer document={item.item_copy} />
                      </NavItemCopy>
                    </NavCopy>
                  </NavItem>
                ))}
              </NavItemsContainer>
            </NavItemsDiv>
          ))}
        </TabDropdown>
      </Tab>
    ));

    return (
      <>
        <TopNav>
          <Banner>
            <BannerMessage>{blok?.banner || 'Test Banner'}</BannerMessage>
            <BannerLink>
              {blok?.banner_link?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button
                    key={$buttonData?.link_text}
                    $buttonData={$buttonData}
                  />
                </div>
              ))}
            </BannerLink>
          </Banner>
        </TopNav>
        <MainWrapper className="mainNavWrapper mobileNav">
          <a href="/">
            <VasionLogo src="/images/logos/vasion-logo-purple.webp" />
          </a>
          <HamburgerContainer className="hamburger">
            <HamSlice id="slice-0" />
            <ShortHamSlice id="slice-1" />
            <HamSlice id="slice-2" />
          </HamburgerContainer>
          <Dropdown className="mobileDropdown">
            {fallbackMappedNav}
            <ButtonContainer>
              <LanguageSelectorContainer>
                <LanguageSelector
                  id="languageSelector"
                  className="language-selector"
                >
                  <LanguageItems
                    id="languageItemsContainer"
                    show={showLanguageDropdown}
                  >
                    <LanguageItem
                      onClick={() => handleNavigate('en')}
                      isActive={activeLanguage === 'en'}
                    >
                      English
                    </LanguageItem>
                    <LanguageItem
                      onClick={() => handleNavigate('fr')}
                      isActive={activeLanguage === 'fr'}
                    >
                      French
                    </LanguageItem>
                    <LanguageItem
                      onClick={() => handleNavigate('de')}
                      isActive={activeLanguage === 'de'}
                    >
                      German
                    </LanguageItem>
                  </LanguageItems>
                  <LanguageIcon id="globe" onClick={toggleLanguageDropdown} />
                  {showTooltip && <Tooltip>{tooltipMessage}</Tooltip>}
                </LanguageSelector>
              </LanguageSelectorContainer>
              {blok?.button?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} stretch />
                </div>
              ))}
            </ButtonContainer>
          </Dropdown>
          <AnchorNavigator />
        </MainWrapper>
      </>
    );
  }

  useEffect(() => {
    // console.log('MobileNav useEffect - setting up dropdowns');
    // console.log('GSAP available:', typeof gsap !== 'undefined');

    gsap.set('.tabDropdowns', { height: 0, display: 'none' });
    gsap.set('.mobileDropdown', { height: 0, display: 'none' });
    gsap.set('#languageItemsContainer', { width: '0%' });

    const allTabs = gsap.utils.toArray('.tabHeader');
    const hamburger = document.querySelector('.hamburger');

    // console.log('Found tabs:', allTabs.length);
    // console.log('Found hamburger:', !!hamburger);

    let tl = gsap.timeline({ paused: true });

    const hamburgerTl = gsap
      .timeline({ paused: true, reversed: true })
      .set('#mainDrop', { padding: '4.673vw 0' })
      .to('#mainDrop', { height: 'auto', duration: 0.5 })
      .to('#slice-0', { top: '1.95vw', rotate: 45 }, '<')
      .to('#slice-1', { opacity: 0 }, '<')
      .to('#slice-2', { top: '-1.075vw', rotate: -45 }, '<');

    const toggleMobileDropdown = () => {
      // console.log('Toggle mobile dropdown clicked');
      const dropdown = document.querySelector('.mobileDropdown');
      if (!dropdown) {
        console.error('Mobile dropdown element not found');
        return;
      }

      if (mobileOpenRef.current) {
        gsap.to(dropdown, {
          height: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(dropdown, { display: 'none' }),
        });
      } else {
        gsap.set(dropdown, { display: 'flex' });
        gsap.to(dropdown, {
          height: '89vh',
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }

      mobileOpenRef.current = !mobileOpenRef.current;

      if (hamburgerTl.reversed()) {
        hamburgerTl.play();
      } else {
        hamburgerTl.reverse();
      }
    };

    if (hamburger) {
      hamburger.addEventListener('click', toggleMobileDropdown);
    }

    const openDropdown = (index) => {
      // console.log('Opening dropdown for index:', index);
      tl.clear();

      if (dropdownIndex.current === index && isOpen.current) {
        // console.log('Closing dropdown for index:', index);
        tl.to(`#tabHeader-${index}`, { height: 0 }).set(`#tabHeader-${index}`, {
          display: 'none',
        });
        isOpen.current = false;
        dropdownIndex.current = null;
        setOpenTabIndex(null);
        tl.play();
        return;
      }

      dropdownIndex.current = index;
      isOpen.current = true;
      setOpenTabIndex(index);

      tl.to('.tabDropdowns', { height: 0 })
        .set('.tabDropdowns', { display: 'none' }, '>-0.15')
        .set(`#tabHeader-${index}`, { display: 'flex' })
        .to(`#tabHeader-${index}`, { height: 'auto' });

      tl.play();
    };

    // Store event listener functions for proper cleanup
    const tabClickHandlers = allTabs.map((tab, index) => {
      const handler = () => openDropdown(index);
      tab.addEventListener('click', handler);
      // console.log(`Added click handler for tab ${index}`);
      return { tab, handler };
    });

    return () => {
      // console.log('Cleaning up MobileNav event listeners');
      // Clean up tab event listeners
      tabClickHandlers.forEach(({ tab, handler }) => {
        tab.removeEventListener('click', handler);
      });

      // Clean up hamburger event listener
      if (hamburger) {
        hamburger.removeEventListener('click', toggleMobileDropdown);
      }
    };
  }, []);

  useEffect(() => {
    const mobileAnchorTl = gsap.timeline({
      scrollTrigger: {
        start: '2% 1%',
        end: '10% 90%',
        // markers: true,
        scrub: true,
      },
    });

    mobileAnchorTl.fromTo('.anchorNav', { autoAlpha: 0 }, { autoAlpha: 1 });

    ScrollTrigger.create({
      trigger: '.mobileNav',
      start: 'top top',
      end: () => `${document.body.scrollHeight - window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
  }, []);

  return (
    <>
      <TopNav>
        <Banner>
          <BannerMessage>{blok.banner}</BannerMessage>
          <BannerLink>
            {blok?.banner_link?.map(($buttonData) => (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData?.link_text}
              >
                <Button
                  key={$buttonData?.link_text}
                  $buttonData={$buttonData}
                />
              </div>
            ))}
          </BannerLink>
        </Banner>
      </TopNav>
      <MainWrapper className="mainNavWrapper mobileNav">
        <a href="/">
          <VasionLogo src="/images/logos/vasion-logo-purple.webp" />
        </a>
        <HamburgerContainer className="hamburger">
          <HamSlice id="slice-0" />
          <ShortHamSlice id="slice-1" />
          <HamSlice id="slice-2" />
        </HamburgerContainer>
        <Dropdown className="mobileDropdown">
          {mappedNav}
          <ButtonContainer>
            <LanguageSelectorContainer>
              <LanguageSelector
                id="languageSelector"
                className="language-selector"
              >
                <LanguageItems
                  id="languageItemsContainer"
                  show={showLanguageDropdown}
                >
                  <LanguageItem
                    onClick={() => handleNavigate('en')}
                    isActive={activeLanguage === 'en'}
                  >
                    English
                  </LanguageItem>
                  <LanguageItem
                    onClick={() => handleNavigate('fr')}
                    isActive={activeLanguage === 'fr'}
                  >
                    French
                  </LanguageItem>
                  <LanguageItem
                    onClick={() => handleNavigate('de')}
                    isActive={activeLanguage === 'de'}
                  >
                    German
                  </LanguageItem>
                </LanguageItems>
                <LanguageIcon id="globe" onClick={toggleLanguageDropdown} />
                {showTooltip && <Tooltip>{tooltipMessage}</Tooltip>}
              </LanguageSelector>
            </LanguageSelectorContainer>
            {blok?.button?.map(($buttonData) => (
              <div
                {...storyblokEditable($buttonData)}
                key={$buttonData?.link_text}
              >
                <Button
                  $buttonData={$buttonData}
                  stretch
                  onNavigate={closeMobileDropdown}
                />
              </div>
            ))}
          </ButtonContainer>
        </Dropdown>
        <AnchorNavigator />
      </MainWrapper>
    </>
  );
};
const DropDownCTA = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 93.333vw;
    height: 15vw;
    border-radius: 1.042vw;
    margin: 0vw 1.667vw;
    padding: 0vw 1.667vw;
    background-image: url(${(props) => props.bgimg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;
const CardButtonContainer = styled.div`
  margin-top: 12px;

  ${media.mobile} {
  }
`;
const ChevronArrow = styled.img`
  ${media.mobile} {
    width: ${(props) => (props?.orangearrow ? '5vw' : '2.5vw')};
    height: ${(props) => (props?.orangearrow ? '5vw' : '2.5vw')};
  }
`;

const ButtonContainer = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: ${colors.white};
    width: 100%;
    padding: 15.167vw 3.333vw;
    flex: 1;
    gap: 3.333vw;
  }
`;
const BannerArrow = styled(LinkArrow)`
  ${media.mobile} {
    width: 1.869vw;
    height: 1.869vw;
    margin-left: 0.935vw;
  }
`;
const BannerLink = styled.div`
  ${media.mobile} {
    margin-left: 2.336vw;
  }
`;
const BannerMessage = styled.p``;
const Banner = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: row;
    ${text.tagLight};
    color: ${colors.white};
  }
`;
const TopNav = styled.div`
  ${media.mobile} {
    background-image: url('images/TopBar_M.png');
    background-color: ${colors.darkPurple};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0vw 3.738vw;
    height: 7.607vw;
  }
`;
const HamSlice = styled.div`
  position: relative;
  width: 100%;
  height: 0.5vw;
  border-radius: 1.168vw;
  background-color: ${colors.primaryPurple};
`;
const ShortHamSlice = styled(HamSlice)`
  width: 80%;
`;

const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1vw;
  width: 4.673vw;
  height: auto;
`;
const Link = styled.a`
  ${text.tag};
  color: ${colors.txtSubtle};
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;

  ${media.mobile} {
    border-radius: 0.833vw;

    // Large Cards
    ${(props) =>
      props.card_size === 'large' &&
      `
      width: 32.292vw;
      height: 17.083vw;
    `}

    // Small Cards
    ${(props) =>
      props.card_size === 'small' &&
      `
      width: 8.496vw;
      aspect-ratio:1;
    `}
        // Medium Cards 
    ${(props) =>
      props.card_size === 'medium' &&
      `
      flex-shrink: 0;
      align-self: stretch;
      width:17.188vw;
      aspect-ratio:1;
    `}
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; // This prevents stretching
      object-position: center; // Centers the image
    }
  }
`;
// const ImageWrapper = styled.div`
//   overflow: hidden;

//   ${media.mobile} {
//     border-radius: 0.417vw;
//     min-height: ${(props) =>
//       props.card_size === 'large' ? '17.083vw' : '7.617vw'};
//     min-width: ${(props) =>
//       props.card_size === 'large' ? '32.292vw' : '8.496vw'};
//     max-width: ${(props) =>
//       props.card_size === 'large' ? '32.292vw' : 'unset'};
//   }
// `;
const NavItemSubCopy = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const NavItemTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
const NavItemCopy = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: ${(props) =>
      props.card_size === 'large' ? '3.333vw' : 'unset'};
  }
`;
const NavCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  ${media.mobile} {
    gap: 0.899vw;
  }
`;
const NavIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.card ? 'start' : 'unset')};
  flex-shrink: 0;

  ${media.mobile} {
    width: ${(props) =>
      props.card && props.card_size ? '8.998vw' : '5.208vw'};
    min-width: ${(props) =>
      props.card && props.card_size ? '8.998vw' : '5.33vw'};

    aspect-ratio: 1;
  }

  svg {
    align-self: ${(props) => (props.card ? 'start' : 'unset')};
    width: 100%;
    height: 100%;
    flex-shrink: 0;
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

    box-shadow: ${(props) =>
      props.card && props.card_size === 'large'
        ? '0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)'
        : 'unset'};
    gap: ${(props) =>
      props.card_size === 'small'
        ? '3.399vw'
        : props.card_size === 'medium'
        ? '3.333vw'
        : props.card_size === 'large'
        ? '3.333vw'
        : '1.667vw'};

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
        ? '2.5vw 1.667vw'
        : props.card_size === 'medium'
        ? '0.877vw 3.333vw 0.877vw 0.877vw'
        : props.card_size === 'large'
        ? '1.667vw 3.333vw 1.667vw 1.667vw'
        : '1.667vw 3.333vw 1.667vw 1.667vw'};
    border-radius: 0.391vw;
    height: ${(props) =>
      props.card_size === 'large'
        ? 'fit-content'
        : props.card_size === 'medium'
        ? '18.75vw'
        : 'auto'};
  }
  &:hover {
    background: ${colors.lightPurpleGrey};
    box-shadow: ${(props) =>
      props.card && props.card_size === 'large'
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
  ${media.mobile} {
    margin: 3.125vw 1.667vw;
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
`;
const NavItemsDiv = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 96.667vw;
  }
`;
const TabDropdown = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.667vw 1.667vw 5vw 1.667vw;
  gap: 3.333vw;
  /* overflow: hidden; */ /* Temporarily removed for testing */

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    padding: 1.667vw 1.667vw 5vw 1.667vw;
    gap: 6.667vw;
    overflow: hidden;
  }
`;
const TabHeader = styled.div`
  ${text.bodySm};
  padding: 3.542vw 3.333vw;
  height: 10.833vw;
  /* margin-bottom: 3.333vw; */
  width: 100%;
  background: ${(props) =>
    props.isOpen ? 'rgba(61, 37, 98, 0.05)' : colors.white};
  cursor: pointer; /* Add cursor pointer for better UX */

  ${media.mobile} {
    ${text.bodySm};
    padding: 3.542vw 3.333vw;
    height: 10.833vw;
    /* margin-bottom: 3.333vw; */
    width: 100%;
    background: ${(props) =>
      props.isOpen ? 'rgba(61, 37, 98, 0.05)' : colors.white};
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
    display: none;
    flex-direction: column;
    height: 89vh;
    width: 100%;
    top: 12.708vw;
    left: 0;
    /* border: 1px solid red; */
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const VasionLogo = styled.img`
  ${media.mobile} {
    width: 20.833vw;
    height: 2.917vw;
  }
`;
const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background: ${colors.white};
  width: 100%;
  max-width: 100%;
  z-index: 10;
  height: 12.821vw;
  padding: 0 3.333vw;
  /* border: 1px solid blue; */

  ${media.mobile} {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: ${colors.white};
    width: 100%;
    max-width: 100%;
    z-index: 10;
    height: 12.821vw;
    padding: 0 3.333vw;
    /* border: 1px solid blue; */
  }
`;

const LanguageIcon = styled(LanguageGlobe)`
  ${media.mobile} {
    width: 4.673vw;
    height: 4.673vw;
    cursor: pointer;
    margin-left: 0.694vw;
    filter: grayscale(100%) contrast(0.7) brightness(0.8); /* Make the globe icon grey */

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
  }
`;

const LanguageItem = styled.div`
  ${media.mobile} {
    ${text.bodySm};
    color: ${(props) =>
      props.isActive ? colors.primaryOrange : colors.txtSubtle};
    padding: 0.208vw;
    border-radius: 0.139vw;
    cursor: pointer;
    white-space: nowrap;

    ${media.fullWidth} {
      padding: 3px;
      border-radius: 2px;
    }

    ${media.tablet} {
      padding: 0.293vw;
      border-radius: 0.195vw;
    }

    &:hover {
      background-color: ${colors.primaryOrange};
      color: ${colors.white};
    }
  }
`;

const LanguageSelectorContainer = styled.div`
  ${media.mobile} {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3.333vw;
    width: 98%;
  }
`;

const LanguageSelector = styled.div`
  ${media.mobile} {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    width: 100%;
  }
`;

const LanguageItems = styled.div`
  ${media.mobile} {
    ${text.bodySm};
    color: ${colors.txtSubtle};
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    width: 0%;
    gap: 1.042vw;
    justify-content: flex-end;

    ${media.fullWidth} {
      gap: 15px;
    }

    ${media.tablet} {
      gap: 1.465vw;
    }
  }
`;

const Tooltip = styled.div`
  ${media.mobile} {
    ${text.bodySm};
    position: absolute;
    background: ${colors.darkPurple};
    color: ${colors.white};
    padding: 2.083vw 3.125vw;
    border-radius: 0.833vw;
    top: calc(100% + 2.083vw);
    left: 0;
    z-index: 9999;
    white-space: nowrap;
    box-shadow: 0 0.417vw 0.833vw rgba(0, 0, 0, 0.2);
    pointer-events: none;

    &:after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 2.083vw;
      border-width: 1.042vw;
      border-style: solid;
      border-color: transparent transparent ${colors.darkPurple} transparent;
    }
  }
`;

export default MobileNav;
