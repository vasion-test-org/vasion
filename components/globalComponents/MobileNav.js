"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import Button from "./Button";
import text from "@/styles/text";
import colors from "@/styles/colors";
import Icons from "@/components/renderers/Icons";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "./Image";
import LinkArrow from "assets/svg/LinkArrow.svg";
import AnchorNavigator from "@/components/globalComponents/AnchorNavigator";

gsap.registerPlugin(ScrollTrigger);
const MobileNav = ({ blok }) => {
  const path = usePathname();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const dropdownIndex = useRef(null);
  let currentNavItems = blok.english_nav_items;
  const isOpen = useRef(false);
  // console.log(blok);
  if (path.startsWith("/de")) {
    currentNavItems = blok.german_nav_items;
  } else if (path.startsWith("/fr")) {
    currentNavItems = blok.french_nav_items;
  }

  const handleNavigate = (locale) => {
    const basePath = locale === "en" ? "" : `/${locale}`;
    const path = nonHomeSlug ? `${basePath}/${nonHomeSlug}` : basePath || "/";
    router.push(path);
  };
  const mappedNav = currentNavItems.map((item, index) => (
    <Tab key={`tab-${index}`}>
      <TabHeader className="tabHeader">{item.tab_name}</TabHeader>
      <TabDropdown className="tabDropdowns" id={`tabHeader-${index}`}>
        {item.tab_columns.map((column, colIndex) => (
          <NavItemsDiv key={`column-${colIndex}`}>
            <ColumnHeader>{column.column_header}</ColumnHeader>
            <NavItemsContainer>
              {column.nav_items.map((item, itemIndex) => {
                const formattedIconString = item.icon.replace(/\s+/g, "");
                const IconComponent = Icons[formattedIconString] || null;
                const rawUrl = item.item_link?.cached_url || "#";
                const isExternal =
                  rawUrl.startsWith("http://") || rawUrl.startsWith("https://");
                const normalizedUrl = isExternal
                  ? rawUrl
                  : rawUrl.startsWith("/")
                    ? rawUrl
                    : `/${rawUrl}`;

                const handleClick = () => {
                  if (normalizedUrl === "#") return;
                  if (isExternal) {
                    window.open(normalizedUrl, "_blank", "noopener,noreferrer");
                  } else {
                    window.location.href = normalizedUrl;
                  }
                };

                return (
                  <NavItem
                    key={`item-${item._uid}`}
                    card={item.card}
                    card_size={item.card_size}
                    onClick={handleClick}
                    role="link"
                    tabIndex={0}
                  >
                    {item.card &&
                      item.card_size &&
                      item.card_size !== "small" && (
                        <ImageWrapper card_size={item.card_size}>
                          <Image images={item?.card_image?.[0].media} />
                        </ImageWrapper>
                      )}
                    {IconComponent && (
                      <NavIconWrapper
                        card={item.card}
                        card_size={item.card_size}
                      >
                        <IconComponent />
                      </NavIconWrapper>
                    )}
                    <NavCopy>
                      <NavItemCopy card_size={item.card_size}>
                        <RichTextRenderer document={item.item_copy} />
                      </NavItemCopy>
                      {item.card_size === "medium" && (
                        <Link
                          href={normalizedUrl}
                          target={isExternal ? "_blank" : "_self"}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Learn More
                        </Link>
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
    const mobileAnchorTl = gsap.timeline({
      scrollTrigger: {
        start: "2% 1%",
        end: "10% 90%",
        // markers: true,
        scrub: true,
      },
    });

    mobileAnchorTl.fromTo(".anchorNav", { autoAlpha: 0 }, { autoAlpha: 1 });

    ScrollTrigger.create({
      trigger: ".mobileNav",
      start: "top top",
      end: () => `${document.body.scrollHeight - window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      // markers: true,
    });
  }, []);

  useEffect(() => {
    gsap.set(".tabDropdowns", { height: 0, display: "none" });
    gsap.set(".mobileDropdown", { height: 0, display: "none" });

    const allTabs = gsap.utils.toArray(".tabHeader");
    const hamburger = document.querySelector(".hamburger");

    let tl = gsap.timeline({ paused: true });
    let mobileOpen = false; // <- track open state

    const hamburgerTl = gsap
      .timeline({ paused: true, reversed: true })
      .set("#mainDrop", { padding: "4.673vw 0" })
      .to("#mainDrop", { height: "auto", duration: 0.5 })
      .to("#slice-0", { top: "1.95vw", rotate: 45 }, "<")
      .to("#slice-1", { opacity: 0 }, "<")
      .to("#slice-2", { top: "-1.075vw", rotate: -45 }, "<");

    const toggleMobileDropdown = () => {
      const dropdown = document.querySelector(".mobileDropdown");
      if (!dropdown) return;

      if (mobileOpen) {
        gsap.to(dropdown, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => gsap.set(dropdown, { display: "none" }),
        });
      } else {
        gsap.set(dropdown, { display: "flex" });
        gsap.to(dropdown, {
          height: "100vh",
          duration: 0.4,
          ease: "power2.inOut",
        });
      }

      mobileOpen = !mobileOpen;

      if (hamburgerTl.reversed()) {
        hamburgerTl.play();
      } else {
        hamburgerTl.reverse();
      }
    };

    if (hamburger) {
      hamburger.addEventListener("click", toggleMobileDropdown);
    }

    const openDropdown = (index) => {
      tl.clear();

      if (dropdownIndex.current === index && isOpen.current) {
        tl.to(`#tabHeader-${index}`, { height: 0 }).set(`#tabHeader-${index}`, {
          display: "none",
        });
        isOpen.current = false;
        dropdownIndex.current = null;
        tl.play();
        return;
      }

      dropdownIndex.current = index;
      isOpen.current = true;

      tl.to(".tabDropdowns", { height: 0 })
        .set(".tabDropdowns", { display: "none" }, ">-0.15")
        .set(`#tabHeader-${index}`, { display: "flex" })
        .to(`#tabHeader-${index}`, { height: "auto" });

      tl.play();
    };

    allTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => openDropdown(index));
    });

    return () => {
      allTabs.forEach((tab, index) => {
        tab.removeEventListener("click", () => openDropdown(index));
      });

      if (hamburger) {
        hamburger.removeEventListener("click", toggleMobileDropdown);
      }
    };
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
        <Dropdown className="mobileDropdown">{mappedNav}</Dropdown>
        <AnchorNavigator />
      </MainWrapper>
    </>
  );
};

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
    background-image: url("images/TopBar_M.png");
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

  ${media.mobile} {
    border-radius: 0.417vw;
    min-height: ${(props) =>
      props.card_size === "large" ? "17.083vw" : "7.617vw"};
    min-width: ${(props) =>
      props.card_size === "large" ? "32.292vw" : "8.496vw"};
    max-width: ${(props) =>
      props.card_size === "large" ? "32.292vw" : "unset"};
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
      props.card_size === "large" ? "3.333vw" : "unset"};
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
  align-self: ${(props) => (props.card ? "start" : "unset")};

  ${media.mobile} {
    width: ${(props) => (props.card && props.card_size ? "54px" : "20px")};
    height: ${(props) => (props.card && props.card_size ? "unset" : "20px")};
  }

  svg {
    align-self: ${(props) => (props.card ? "start" : "unset")};
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
      props.card_size === "large" ? "start" : "center"};
    background: ${(props) =>
      props.card_size === "medium" ? colors.lightPurpleGrey : "unset"};
    gap: ${(props) =>
      props.card_size === "small"
        ? "3.333vw"
        : props.card_size === "medium"
          ? "3.333vw"
          : props.card_size === "large"
            ? "3.333vw"
            : "0.833vw"};

    width: ${(props) =>
      props.card_size === "small"
        ? "100%"
        : props.card_size === "medium"
          ? "93.333vw"
          : props.card_size === "large"
            ? "93.333vw"
            : "50%"};

    padding: ${(props) =>
      props.card_size === "small"
        ? "1.667vw 2.5vw"
        : props.card_size === "medium"
          ? "0.833vw 5vw 0.833vw 0.833vw"
          : props.card_size === "large"
            ? "1.667vw 3.333vw 1.667vw 1.667vw"
            : "1.667vw 3.333vw 1.667vw 1.667vw"};
    border-radius: 0.391vw;
    height: ${(props) =>
      props.card_size === "large"
        ? "20.417vw"
        : props.card_size === "medium"
          ? "18.75vw"
          : "auto"};
  }
  &:hover {
    background: ${colors.lightPurpleGrey};
    box-shadow: ${(props) =>
      props.card
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
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    padding: 1.667vw 1.667vw 5vw 1.667vw;
    gap: 3.333vw;
    overflow: hidden;
  }
`;
const TabHeader = styled.div`
  ${media.mobile} {
    ${text.bodySm};
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
    display: none;
    flex-direction: column;
    height: 100vh;
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
export default MobileNav;
