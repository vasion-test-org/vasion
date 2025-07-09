"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import NextLink from "next/link";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Button from "./Button";
import text from "@/styles/text";
import colors from "@/styles/colors";
import Icons from "@/components/renderers/Icons";
import Image from "./Image";
import LinkArrow from "assets/svg/LinkArrow.svg";
import LanguageGlobe from "assets/svg/languageglobe.svg";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnchorNavigator from "@/components/globalComponents/AnchorNavigator";
import VasionNavLogo from "@/assets/svg/vasion-nav-logo.svg";
import { getStoryblokApi } from "@/lib/storyblok";
import ComponentRenderer from "@/components/renderers/ComponentRenderer";

gsap.registerPlugin(ScrollTrigger);

const Nav = ({ blok }) => {
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
  ];
  const router = useRouter();
  const path = usePathname();
  // console.log("blok", blok);
  const [language, setLanguage] = useState("en");
  const [navItems, setNavItems] = useState(blok.english_nav_items);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const { locale } = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  useEffect(() => {
    function checkPathLocale(url) {
      const { pathname } = new URL(url, "https://vasion.com");
      const pathLocale = pathname.split("/")[1];
      const supportedLocales = ["en", "fr", "de"];
      const defaultLocale = "en";

      const lang = supportedLocales.includes(pathLocale)
        ? pathLocale
        : defaultLocale;
      setLanguage(lang);

      if (lang === "de") {
        setNavItems(blok.german_nav_items);
      } else if (lang === "fr") {
        setNavItems(blok.french_nav_items);
      } else {
        setNavItems(blok.english_nav_items);
      }
    }

    if (path) {
      checkPathLocale(path);
    }
  }, [path, blok]);

  const slugParts = path.split("/").filter(Boolean);
  const currentLocale = ["de", "fr"].includes(slugParts[0])
    ? slugParts[0]
    : null;
  const nonHomeSlug = currentLocale
    ? slugParts.slice(1).join("/")
    : slugParts.join("/");

  const handleNavigate = async (locale) => {
    // console.log('handleNavigate called with locale:', locale);
    const basePath = locale === "en" ? "" : `/${locale}`;
    const newPath = nonHomeSlug
      ? `${basePath}/${nonHomeSlug}`
      : basePath || "/";

    // console.log('Attempting to navigate to:', newPath);

    try {
      const storyblokApi = getStoryblokApi();
      const storySlug = nonHomeSlug || "home";

      // console.log('Checking story:', storySlug, 'in language:', locale);
      const { data } = await storyblokApi.get(`cdn/stories/${storySlug}`, {
        version: "published",
        language: locale,
      });

      // console.log('Storyblok response:', data);

      if (data.story) {
        // console.log('Story exists, navigating...');
        router.push(newPath);
      } else {
        // console.log('Story does not exist, showing tooltip');
        setTooltipMessage(
          "This page is not yet available in the selected language",
        );
        setShowTooltip(true);
        // console.log('Tooltip state updated:', { showTooltip: true, message: tooltipMessage });
        setTimeout(() => {
          setShowTooltip(false);
          // console.log('Tooltip hidden after timeout');
        }, 3000);
      }
    } catch (error) {
      // console.log('Error occurred:', error);
      setTooltipMessage(
        "This page is not yet available in the selected language",
      );
      setShowTooltip(true);
      // console.log('Tooltip state updated after error:', { showTooltip: true, message: tooltipMessage });
      setTimeout(() => {
        setShowTooltip(false);
        // console.log('Tooltip hidden after error timeout');
      }, 3000);
    }
  };

  const mappedNav = navItems.map((item, index) => {
    return (
      <KeyDiv key={`item.tab_name-${index}`}>
        <Tab className="tab tabs">{item.tab_name}</Tab>
        <Dropdown className="dropdowns" id={`dropdown-${index}`}>
          <ColumnsWrapper>
            {item.tab_columns.map((column, colIdx) => (
              <Column key={`column.column_header-${colIdx}`}>
                {column?.column_header && (
                  <ColumnHeader>{column.column_header}</ColumnHeader>
                )}
                {column.nav_items.map((navItem, itemIdx) => {
                  const formattedIconString = navItem.icon.replace(/\s+/g, "");
                  const IconComponent = Icons[formattedIconString] || null;

                  const rawUrl = navItem?.item_link?.cached_url || "#";
                  const isExternal =
                    rawUrl.startsWith("http://") ||
                    rawUrl.startsWith("https://");
                  const supportedLocales = ["en", "fr", "de"];
                  const rawPathParts = rawUrl.split("/").filter(Boolean);
                  const alreadyHasLocale = supportedLocales.includes(
                    rawPathParts[0],
                  );

                  const normalizedUrl = isExternal
                    ? rawUrl
                    : `/${
                        alreadyHasLocale ? "" : (currentLocale ?? "")
                      }/${rawUrl}`.replace(/\/+/g, "/");

                  return (
                    <StyledNextLink
                      href={isExternal ? normalizedUrl : normalizedUrl}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      passHref
                      key={`item-${navItem._uid}`}
                    >
                      <NavItem
                        card={navItem.card}
                        card_size={navItem.card_size}
                        role="link"
                        tabIndex={0}
                      >
                        {navItem.card &&
                          navItem.card_size &&
                          navItem.card_size !== "small" && (
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
                            {navItem.add_chevron_arrow && (
                              <ChevronArrow src="/images/uiElements/chevron-arrow-label.webp" />
                            )}
                          </NavItemCopy>
                          {navItem.card_size === "medium" && (
                            <StyledAnchor
                              onClick={(e) => e.stopPropagation()}
                              target={isExternal ? "_blank" : undefined}
                              rel={
                                isExternal ? "noopener noreferrer" : undefined
                              }
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
          </ColumnsWrapper>
          {item.cta && (
            <>
              {/* {console.log('CTA Data:', {
              cta: item.cta,
              copySections: item.cta?.[0]?.copy_sections,
            })} */}
              <DropDownCTA
                bgImg={item.cta?.[0]?.media?.[0]?.media?.[0]?.filename}
              >
                {item.cta?.[0]?.copy_sections.map((item, index) => (
                  <div
                    key={`item.component_${index}`}
                    {...storyblokEditable(item)}
                  >
                    {copycomponents.includes(item.component) ? (
                      <RichTextRenderer document={item.copy} blok={item} />
                    ) : (
                      <ComponentRenderer blok={item} />
                    )}
                  </div>
                ))}
              </DropDownCTA>
            </>
          )}
        </Dropdown>
      </KeyDiv>
    );
  });

  const navReady = navItems && navItems.length > 0;

  useEffect(() => {
    if (!navReady) return;

    const footer = document.querySelector(".footer");
    if (!footer) return;

    const footerOffset = footer.offsetTop + footer.offsetHeight;

    const anchorTl = gsap.timeline({
      scrollTrigger: {
        start: "2% 1%",
        end: "10% 90%",
        scrub: true,
      },
    });

    anchorTl.fromTo(".anchorNav", { autoAlpha: 0 }, { autoAlpha: 1 });

    ScrollTrigger.create({
      trigger: ".desktopNav",
      start: "top top",
      end: `${footerOffset}px`,
      pin: true,
      pinSpacing: false,
    });
  }, [navReady]);

  useEffect(() => {
    if (!navReady) return;

    gsap.set(".dropdowns", { autoAlpha: 0, display: "flex" });

    const allTabs = gsap.utils.toArray(".tabs");
    const allDropdowns = gsap.utils.toArray(".dropdowns");
    const navWrapper = document.querySelector(".mainNavWrapper");

    let isAnimating = false;
    let queuedIndex = null;

    const closeDropdown = () => {
      isAnimating = true;
      return gsap.to(".dropdowns", {
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
      tab.addEventListener("mouseenter", () => {
        closeDropdown().then(() => {});
        queuedIndex = index;
      });
    });

    allDropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseleave", closeDropdown);
    });

    if (navWrapper) {
      navWrapper.addEventListener("mouseleave", closeDropdown);
    }

    return () => {
      allTabs.forEach((tab, index) => {
        tab.removeEventListener("mouseenter", () => openDropdown(index));
      });
      allDropdowns.forEach((dropdown) => {
        dropdown.removeEventListener("mouseleave", closeDropdown);
      });
      if (navWrapper) {
        navWrapper.removeEventListener("mouseleave", closeDropdown);
      }
    };
  }, [navReady]);

  // Add new useEffect to close dropdowns on route changes
  useEffect(() => {
    if (!navReady) return;

    const closeDropdownsOnRouteChange = () => {
      gsap.to(".dropdowns", {
        autoAlpha: 0,
        duration: 0.35,
      });
    };

    // Close dropdowns when path changes
    closeDropdownsOnRouteChange();

    // Also close dropdowns when clicking any nav link
    const navLinks = document.querySelectorAll(".dropdowns a");
    navLinks.forEach((link) => {
      link.addEventListener("click", closeDropdownsOnRouteChange);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeDropdownsOnRouteChange);
      });
    };
  }, [path, navReady]); // Add path as a dependency to trigger on route changes

  useEffect(() => {
    const handleGlobeHover = () => {
      gsap.to("#languageItemsContainer", { width: "100%" });
    };

    const handleGlobeExit = () => {
      gsap.to("#languageItemsContainer", { width: "0%" });
    };

    const globe = document.querySelector("#globe");
    const langSelector = document.querySelector("#languageSelector");

    globe?.addEventListener("mouseenter", handleGlobeHover);
    langSelector?.addEventListener("mouseleave", handleGlobeExit);

    return () => {
      globe?.removeEventListener("mouseenter", handleGlobeHover);
      langSelector?.removeEventListener("mouseleave", handleGlobeExit);
    };
  }, []);

  useEffect(() => {
    if (!navReady) return;

    const tabs = document.querySelector(".tabs");
    const individualTabs = document.querySelectorAll(".tab");
    const dropdowns = document.querySelectorAll(".dropdowns");
    const backdrop = document.querySelector(".navBackdrop");

    const handleMouseEnter = () => {
      setIsHoveringNav(true);
      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      setIsHoveringNav(false);
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    // Add listeners to tabs container
    tabs?.addEventListener("mouseenter", handleMouseEnter);
    tabs?.addEventListener("mouseleave", handleMouseLeave);

    // Add listeners to individual tabs
    individualTabs.forEach((tab) => {
      tab.addEventListener("mouseenter", handleMouseEnter);
      tab.addEventListener("mouseleave", handleMouseLeave);
    });

    // Add listeners to all dropdowns
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("mouseenter", handleMouseEnter);
      dropdown.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      tabs?.removeEventListener("mouseenter", handleMouseEnter);
      tabs?.removeEventListener("mouseleave", handleMouseLeave);

      individualTabs.forEach((tab) => {
        tab.removeEventListener("mouseenter", handleMouseEnter);
        tab.removeEventListener("mouseleave", handleMouseLeave);
      });

      dropdowns.forEach((dropdown) => {
        dropdown.removeEventListener("mouseenter", handleMouseEnter);
        dropdown.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [navReady]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <>
        <NavBackdrop className="navBackdrop" />
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
            <LanguageSelector id="languageSelector">
              <LanguageItems id="languageItemsContainer">
                <LanguageItem onClick={() => handleNavigate("en")}>
                  English
                </LanguageItem>
                <LanguageItem onClick={() => handleNavigate("fr")}>
                  French
                </LanguageItem>
                <LanguageItem onClick={() => handleNavigate("de")}>
                  German
                </LanguageItem>
              </LanguageItems>
              <LanguageIcon id="globe" />

              {showTooltip && <Tooltip>{tooltipMessage}</Tooltip>}
            </LanguageSelector>
          </TopElementsContainer>
        </TopNav>
        <MainNavWrapper className="mainNavWrapper desktopNav">
          <MainInner>
            <MainContent>
              <a href="/">
                <VasionLogo />
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

const DropDownCTA = styled.div`
  display: flex;
  flex-direction: column;
  width: 60.5vw;
  height: 4.688vw;
  border-radius: 0.25vw;
  margin-top: 1.5vw;
  padding: 1.156vw 2.5vw;
  background-image: url(${(props) => props.bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${media.fullWidth} {
    width: 968px;
    height: 75px;
    border-radius: 4px;
    margin-top: 24px;
    padding: 18px 40px;
  }

  ${media.tablet} {
    width: 90.531vw;
    height: 7.324vw;
    border-radius: 0.391vw;
    margin-top: 2.344vw;
    padding: 1.758vw 3.906vw;
  }
`;
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
  position: relative;
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
  background:
    linear-gradient(
      90deg,
      #cc4800 0.11%,
      #5f47a8 38.75%,
      rgba(126, 95, 221, 0) 71.55%
    ),
    #201435;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0vw 8.278vw;
  height: 2.778vw;
  position: relative;
  z-index: 10;

  ${media.fullWidth} {
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
  min-height: ${(props) => (props.card_size === "large" ? "11vw" : "4.875vw")};
  min-width: ${(props) => (props.card_size === "large" ? "100%" : "5.438vw")};

  ${media.fullWidth} {
    min-height: ${(props) => (props.card_size === "large" ? "176px" : "78px")};
    min-width: ${(props) => (props.card_size === "large" ? "100%" : "87px")};
  }

  ${media.tablet} {
    min-height: ${(props) =>
      props.card_size === "large" ? "17.188vw" : "7.617vw"};
    min-width: ${(props) => (props.card_size === "large" ? "100%" : "8.496vw")};
  }

  ${media.mobile} {
  }
`;
const KeyDiv = styled.div``;
const NavItemSubCopy = styled.div`
  ${text.bodySm};
  color: ${colors.txtSubtle};
`;
const ChevronArrow = styled.img`
  width: 0.75vw;
  height: 0.75vw;

  ${media.fullWidth} {
    width: 12px;
    height: 12px;
  }
  ${media.tablet} {
    width: 1.172vw;
    height: 1.172vw;
  }
  ${media.mobile} {
    width: 2.5vw;
    height: 2.5vw;
  }
`;
const NavItemCopy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5vw;
  color: ${colors.grey800};
  margin-left: ${(props) => (props.card_size === "large" ? "1vw" : "unset")};

  ${media.fullWidth} {
    margin-left: ${(props) => (props.card_size === "large" ? "16px" : "unset")};
  }

  ${media.tablet} {
    ${text.bodyMd};
    margin-left: ${(props) =>
      props.card_size === "large" ? "1.563vw" : "unset"};
  }

  ${media.mobile} {
  }
`;

const NavCopy = styled.div`
  display: flex;
  flex-direction: column;
  // gap: 0.625vw;

  ${media.fullWidth} {
    // gap: 10px;
  }

  ${media.tablet} {
    // gap: 0.977vw;
  }

  ${media.mobile} {
  }
`;
const NavIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.card ? "start" : "unset")};
  min-width: ${(props) =>
    props.card && props.card_size ? "2.375vw" : "1.25vw"};
  max-width: ${(props) =>
    props.card && props.card_size ? "2.375vw" : "1.25vw"};
  height: ${(props) => (props.card && props.card_size ? "unset" : "1.25vw")};

  ${media.fullWidth} {
    min-width: ${(props) => (props.card && props.card_size ? "38px" : "20px")};
    max-width: ${(props) => (props.card && props.card_size ? "38px" : "20px")};
    height: ${(props) => (props.card && props.card_size ? "unset" : "20px")};
  }

  ${media.tablet} {
    min-width: ${(props) =>
      props.card && props.card_size ? "3.711vw" : "1.953vw"};
    max-width: ${(props) =>
      props.card && props.card_size ? "3.711vw" : "1.953vw"};
    height: ${(props) => (props.card && props.card_size ? "unset" : "1.953vw")};
  }

  ${media.mobile} {
  }

  svg {
    align-self: ${(props) => (props.card ? "start" : "unset")};
    width: 100%;
    height: 100%;
  }
`;
const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: ${(props) =>
    props.card_size === "large" ? "column" : "row"};
  align-items: ${(props) => (props.card_size === "large" ? "start" : "center")};
  background: ${(props) =>
    props.card_size === "medium" ? colors.lightPurpleGrey : "unset"};
  gap: ${(props) =>
    props.card_size === "small"
      ? "1.25vw"
      : props.card_size === "medium"
        ? "0.875vw"
        : "0.625vw"};

  width: ${(props) =>
    props.card_size === "small"
      ? "17.5vw"
      : props.card_size === "medium"
        ? "19.563vw"
        : props.card_size === "large"
          ? "19.563vw"
          : "auto"};

  padding: ${(props) =>
    props.card_size === "small"
      ? "0.75vw"
      : props.card_size === "medium"
        ? "0.25vw 0.75vw 0.25vw 0.25vw"
        : props.card_size === "large"
          ? "unset"
          : "0.25vw 0.75vw"};
  border-radius: 0.25vw;
  height: ${(props) => (props.card_size === "large" ? "13.875vw" : "auto")};
  box-shadow: ${(props) =>
    props.card_size === "large"
      ? "0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)"
      : "unset"};

  ${media.fullWidth} {
    gap: ${(props) =>
      props.card_size === "small"
        ? "20px"
        : props.card_size === "medium"
          ? "14px"
          : "10px"};

    width: ${(props) =>
      props.card_size === "small"
        ? "280px"
        : props.card_size === "medium"
          ? "313px"
          : props.card_size === "large"
            ? "313px"
            : "auto"};

    padding: ${(props) =>
      props.card_size === "small"
        ? "12px"
        : props.card_size === "medium"
          ? "4px 12px 4px 4px"
          : props.card_size === "large"
            ? "unset"
            : "4px"};
    border-radius: 4px;
    height: ${(props) => (props.card_size === "large" ? "222px" : "auto")};
  }

  ${media.tablet} {
    gap: ${(props) =>
      props.card_size === "small"
        ? "1.953vw"
        : props.card_size === "medium"
          ? "1.367vw"
          : "0.977vw"};

    width: ${(props) =>
      props.card_size === "small"
        ? "27.344vw"
        : props.card_size === "medium"
          ? "30.566vw"
          : props.card_size === "large"
            ? "30.566vw"
            : "auto"};

    padding: ${(props) =>
      props.card_size === "small"
        ? "1.172vw"
        : props.card_size === "medium"
          ? "0.391vw 1.172vw 0.391vw 0.391vw"
          : props.card_size === "large"
            ? "unset"
            : "0.391vw 1.172vw"};
    border-radius: 0.391vw;
    height: ${(props) => (props.card_size === "large" ? "21.68vw" : "auto")};
  }

  &:hover {
    border: ${(props) =>
      props.card_size === "large"
        ? "1px solid ${colors.textSubtle}"
        : props.card_size === "medium"
          ? "1px solid ${colors.txtSubtle}"
          : "unset"};
    background: ${(props) =>
      props.card_size === "large" ? "unset" : colors.lightPurpleGrey};
    box-shadow: ${(props) =>
      props.card_size === "large"
        ? "0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)"
        : props.card_size === "medium"
          ? "0px 0px 1px 0px rgba(25, 29, 30, 0.04), 0px 2px 4px 0px rgba(25, 29, 30, 0.16)"
          : "unset"};
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
  flex-direction: column;
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
    position: fixed;
    top: 6.1vw;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 1.953vw 2.344vw 2.344vw 2.344vw;
    border-radius: 0 0 1.172vw 1.172vw;
    width: 94.531vw;
  }

  ${media.mobile} {
  }
`;
const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

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
const VasionLogo = styled(VasionNavLogo)`
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
const Tooltip = styled.div`
  ${text.bodyMd};
  position: absolute;
  background: ${colors.darkPurple};
  color: ${colors.white};
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  top: calc(100% + 10px);
  right: 0;
  z-index: 9999;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  pointer-events: none;

  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 10px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent ${colors.darkPurple} transparent;
  }
`;
const NavBackdrop = styled.div`
  position: fixed;
  top: -50px;
  left: -50px;
  right: -50px;
  bottom: -50px;
  margin: 0;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%),
    linear-gradient(180deg, #3d2562 0%, rgba(61, 37, 98, 0) 25.72%);
  filter: blur(25px);
  -webkit-filter: blur(25px);
  opacity: 0;
  pointer-events: none;
  z-index: 8;
  transition: opacity 0.3s ease;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;

  /* Create cutouts for nav elements */
  &::before {
    content: "";
    position: absolute;
    top: 50px;
    left: 50px;
    right: 50px;
    height: 2.778vw; /* Top nav height */
    background: transparent;
    z-index: 9;
    pointer-events: none;
    filter: none;
    -webkit-filter: none;

    ${media.fullWidth} {
      height: 40px;
    }

    ${media.tablet} {
      height: 3.906vw;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: calc(50px + 2.778vw); /* Top nav height + offset */
    left: 50px;
    right: 50px;
    height: 3.875vw; /* Main nav height */
    background: transparent;
    z-index: 9;
    pointer-events: none;
    filter: none;
    -webkit-filter: none;

    ${media.fullWidth} {
      top: calc(50px + 40px);
      height: 62px;
    }

    ${media.tablet} {
      top: calc(50px + 3.906vw);
      height: 6.055vw;
    }
  }
`;
export default Nav;
