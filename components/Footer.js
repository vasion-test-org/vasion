"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
// import { NeatGradient } from "@firecms/neat";
import VasionStarSVG from "@/assets/svg/VasionStarBig.svg";
import VasionSmall from "@/assets/svg/SmallVasion.svg";
import colors from "@/styles/colors";
import media from "@/styles/media";
import text from "@/styles/text";
import gsap from "gsap";
import GlobalButton from "components/buttons/GlobalButton";
import Facebook from "@/assets/svg/footer/Facebook.svg";
import Twitter from "@/assets/svg/footer/Twitter.svg";
import LinkedIn from "@/assets/svg/footer/LinkedIn.svg";
// import { navigate } from "gatsby";
import { useRouter } from "next/router";

const Footer = () => {
  const config = {
    colors: [
      {
        color: "#E3533B",
        enabled: true,
      },
      {
        color: "#201435",
        enabled: true,
      },
      {
        color: "#002027",
        enabled: true,
      },
      {
        color: "#8C5ED8",
        enabled: true,
      },
      {
        color: "#f5e1e5",
        enabled: false,
      },
    ],
    speed: 7,
    horizontalPressure: 3,
    verticalPressure: 5,
    waveFrequencyX: 10,
    waveFrequencyY: 10,
    waveAmplitude: 0,
    shadows: 0,
    highlights: 1,
    colorBrightness: 1.1,
    colorSaturation: 5,
    wireframe: false,
    colorBlending: 8,
    backgroundColor: "#201435",
    backgroundAlpha: 1,
    grainScale: 2,
    grainSparsity: 0,
    grainIntensity: 0.1,
    grainSpeed: 1,
    resolution: 1.05,
  };

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: "50% 50%",
        // markers: true,
      },
    });

    tl.from("#vasionfootersvg", {
      yPercent: 100,
      duration: 2,
      ease: "back.out",
    });
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("gradientCanvas");

    if (canvas) {
      const neat = new NeatGradient({
        ref: canvas,
        ...config,
      });
    }
  }, []);

  const links = [
    {
      columnHeader: "Platform",
      links: [
        {
          linkName: "Overview",
          link: "/vasion-overview/",
        },
        {
          linkName: "Capture",
          link: "/capture",
        },
        {
          linkName: "Workflow",
          link: "/workflow",
        },
        {
          linkName: "Signature",
          link: "/signature",
        },
        {
          linkName: "Print",
          link: "/print",
        },
        {
          linkName: "Content Management",
          link: "/content-management",
        },
        {
          linkName: "Beta Program",
          link: "/beta-flight-program/",
        },
        // {
        //   linkName: 'Storage',
        //   link: '/'
        // },
        // {
        //   linkName: 'Reports',
        //   link: '/'
        // },
        // {
        //   linkName: 'Templates',
        //   link: '/'
        // },
        // {
        //   linkName: 'Admin',
        //   link: '/'
        // },
      ],
    },
    {
      columnHeader: "Company",
      links: [
        {
          linkName: "About Us",
          link: "/about-us/",
        },
        {
          linkName: "Visit Us",
          link: "/vasion-executive-briefing-center",
        },
        {
          linkName: "Careers",
          link: "/careers",
        },
        {
          linkName: "Giving",
          link: "/vasion-gives-back/",
        },
        {
          linkName: "Our Customers",
          link: "https://printerlogic.com/customers/",
        },
        {
          linkName: "Newsroom",
          link: "/newsroom",
        },
        // {
        //   linkName: 'Pricing',
        //   link: '/'
        // },
        {
          linkName: "Review Us",
          link: "/review-us/",
        },
        {
          linkName: "Contact Us",
          link: "/contact-us",
        },
      ],
    },
    {
      columnHeader: "Partners",
      links: [
        {
          linkName: "Become a Partner",
          link: "https://partners.vasion.com/prm/English/s/applicant?_gl=1*17bd9ww*_gcl_au*MzY3MTY3NjY5LjE3MjUzODgwMDg.*_ga*MjQzMzgxOTYyLjE2ODczNTg1NTQ.*_ga_407WZSYMN0*MTcyOTI5ODAwNC4yNTAuMS4xNzI5Mjk5OTA2LjAuMC4w",
        },
        {
          linkName: "Partner Overview",
          link: "/partner-overview/",
        },
        {
          linkName: "Ecosystem Partners",
          link: "/ecosystem-partners/",
        },
        {
          linkName: "MSP Partners",
          link: "/msp-partner/",
        },
        {
          linkName: "Sales Partners",
          link: "/sales-partners/",
        },
      ],
    },
    {
      columnHeader: "Resources",
      links: [
        {
          linkName: "Blog",
          link: "/blog",
        },
        {
          linkName: "Resource Library",
          link: "/resources",
        },
        {
          linkName: "Tech Support",
          link: "/technical-support",
        },
        {
          linkName: "Supported Printers",
          link: "https://printerlogic.com/cpa/",
        },
        {
          linkName: "Knowledge Base",
          link: "https://kb.printerlogic.com/s/",
        },
      ],
    },
  ];

  const allLinksColumns = links.map((column) => (
    <LinkColumn key={column.columnHeader}>
      <LinkColumnHeader>{column.columnHeader}</LinkColumnHeader>
      {column.links.map((link) => {
        const isExternal =
          link.link.startsWith("http://") || link.link.startsWith("https://");

        return (
          <Link
            key={link.linkName}
            href={link.link}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {link.linkName}
          </Link>
        );
      })}
    </LinkColumn>
  ));

  const handleNavigate = (link) => {
    const router = useRouter();
    const isExternalLink = link.startsWith("http") || link.startsWith("https");
    if (isExternalLink) {
      window.open(link, "_blank");
    } else {
      router.push(link);
      // navigate(link);
    }
  };
  return (
    <Wrapper className="footer">
      <MainFooterContainer>
        <LogoContainer>
          <Logo onClick={() => handleNavigate("/")} />
          <Address>432 S. Tech Ridge Drive, St. George, Utah 84770 USA</Address>
          <VasionStar />
        </LogoContainer>
        <AllLinksContainer>{allLinksColumns}</AllLinksContainer>
        {/* <GradientBlend />
        <GradientWrapper>
          <canvas
            id="gradientCanvas"
            style={{ width: "100%", height: "100%" }}
          ></canvas>
        </GradientWrapper> */}
      </MainFooterContainer>
      <ButtonContainer>
        <SocialsContainer>
          <SocialIcon
            onClick={() =>
              handleNavigate("https://www.facebook.com/VasionSoftware")
            }
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon
            onClick={() =>
              handleNavigate(
                "https://x.com/i/flow/login?redirect_after_login=%2FVasionSoftware",
              )
            }
          >
            <Twitter />
          </SocialIcon>
          <SocialIcon
            onClick={() =>
              handleNavigate(
                "https://www.linkedin.com/company/vasion-software/posts/?feedView=all",
              )
            }
          >
            <LinkedIn />
          </SocialIcon>
        </SocialsContainer>
        <GlobalButton demo fill>
          SCHEDULE A DEMO
        </GlobalButton>
      </ButtonContainer>
      <LegalDiv>
        <LegalLinks>
          <LegalLink onClick={() => handleNavigate("/privacy-policy/")}>
            Privacy Policy
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate("/imprint/")}>
            Imprint
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate("/cookie-information/")}>
            Cookies
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate("/legal/")}>Legal</LegalLink>
        </LegalLinks>
        © 2024 PrinterLogic. All Rights Reserved
      </LegalDiv>
      <VasionFooter
        src={"@/images/uiElements/VasionFooterPNG.png"}
        id="vasion-footer-svg"
      />
    </Wrapper>
  );
};

const LegalLink = styled.a`
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${colors.primaryOrange};
  }
`;
const LegalLinks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.347vw;

  ${media.fullWidth} {
    gap: 5px;
  }

  ${media.tablet} {
    gap: 0.488vw;
  }

  ${media.mobile} {
    gap: 1.168vw;
  }
`;
const LegalDiv = styled.div`
  ${text.bodyMd};
  color: ${colors.txtSubtle};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 3;
  margin: 0 10.278vw;
  padding: 2.222vw 0;

  ${media.fullWidth} {
    align-self: center;
    width: 1244px;
    padding: 32px 0;
  }

  ${media.tablet} {
    padding: 3.125vw 0;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 4.673vw;
    padding: 7.477vw 0;
  }
`;
const VasionFooter = styled.img`
  position: absolute;
  width: 100%;
  bottom: 12vw;
  height: 13.75vw;

  ${media.fullWidth} {
    bottom: 173px;
    height: 10.75vw;
  }

  ${media.tablet} {
    bottom: 16.895vw;
    height: 17.336vw;
  }

  ${media.mobile} {
    bottom: 12.421vw;
    height: 21.262vw;
  }
`;
const GradientBlend = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  background: linear-gradient(
    180.5deg,
    #201435 10.81%,
    rgba(32, 20, 53, 0.93) 25.34%,
    rgba(32, 20, 53, 0.85) 38.55%,
    rgba(32, 20, 53, 0.77) 47.61%,
    rgba(32, 20, 53, 0.55) 66.31%,
    rgba(32, 20, 53, 0.33) 78.97%,
    rgba(32, 20, 53, 0.13) 90.51%,
    rgba(255, 255, 255, 0) 98.31%
  );
  top: 47vw;
  height: 27.778vw;

  ${media.fullWidth} {
    top: 677px;
    height: 400px;
  }

  ${media.tablet} {
    top: 64.648vw;
    height: 39.063vw;
  }

  ${media.mobile} {
    left: 0;
    top: 276.673vw;
    height: 52.458vw;
  }
`;
const GradientWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 47vw;
  height: 44.278vw;

  ${media.fullWidth} {
    top: 677px;
    height: 638px;
  }

  ${media.tablet} {
    top: 66.074vw;
    height: 62.305vw;
  }

  ${media.mobile} {
    left: 0;
    top: 279.757vw;
    height: 149.065vw;
  }
`;
const SocialIcon = styled.div`
  width: 2.222vw;
  height: 2.222vw;

  ${media.fullWidth} {
    width: 32px;
    height: 32px;
  }

  ${media.tablet} {
    width: 3.125vw;
    height: 3.125vw;
  }

  ${media.mobile} {
    width: 7.477vw;
    height: 7.477vw;
  }

  cursor: pointer;

  &:hover {
    path {
      fill: ${colors.primaryOrange};
    }
  }
`;
const SocialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.972vw;

  ${media.fullWidth} {
    gap: 14px;
  }

  ${media.tablet} {
    gap: 1.367vw;
  }

  ${media.mobile} {
    gap: 3.271vw;
  }
`;
const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 3;
  margin: 0 10.278vw;
  padding: 2.222vw 0;
  border-top: 0.069vw solid ${colors.grey700};
  border-bottom: 0.069vw solid ${colors.grey700};

  ${media.fullWidth} {
    align-self: center;
    width: 1244px;
    padding: 32px 0;
    border-top: 1px solid ${colors.grey700};
    border-bottom: 1px solid ${colors.grey700};
  }

  ${media.tablet} {
    padding: 3.125vw 0;
    border-top: 0.098vw solid ${colors.grey700};
    border-bottom: 0.098vw solid ${colors.grey700};
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 7.477vw;
    padding: 7.477vw 0;
    border-top: 0.234vw solid ${colors.grey700};
    border-bottom: 0.234vw solid ${colors.grey700};
  }
`;
const Link = styled.a`
  ${text.bodyMd};
  color: ${colors.white};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: ${colors.primaryOrange};
  }
`;
const LinkColumnHeader = styled.p`
  ${text.bodyMd};
  color: ${colors.txtSubtle};
`;
const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.389vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
    gap: 4.673vw;
  }
`;
const AllLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.167vw;

  ${media.fullWidth} {
    gap: 60px;
  }

  ${media.tablet} {
    gap: 5.859vw;
  }

  ${media.mobile} {
    flex-wrap: wrap;
    gap: 14.019vw;
  }
`;
const VasionStar = styled(VasionStarSVG)`
  margin-top: 3.472vw;
  width: 4.167vw;
  height: 4.167vw;

  ${media.fullWidth} {
    margin-top: 50px;
    width: 60px;
    height: 60px;
  }

  ${media.tablet} {
    margin-top: 4.883vw;
    width: 5.859vw;
    height: 5.859vw;
  }

  ${media.mobile} {
    display: none;
  }
`;
const Address = styled.div`
  ${text.bodyMd};
  color: ${colors.txtSubtle};
`;
const Logo = styled(VasionSmall)`
  width: 16.667vw;
  height: 2.292vw;

  ${media.fullWidth} {
    width: 240px;
    height: 33px;
  }

  ${media.tablet} {
    width: 17.578vw;
    height: 2.441vw;
  }

  ${media.mobile} {
    width: 42.056vw;
    height: 5.841vw;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.389vw;
  width: 16.667vw;

  ${media.fullWidth} {
    gap: 20px;
    width: 240px;
  }

  ${media.tablet} {
    gap: 1.953vw;
    width: 23.438vw;
  }

  ${media.mobile} {
    gap: 4.673vw;
    width: 50.467vw;
  }
`;
const MainFooterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: ${colors.darkPurple};
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 15.694vw;
  padding: 5.556vw 0vw 2.917vw 0vw;
  height: auto;

  ${media.fullWidth} {
    gap: 226px;
    padding: 80px 0px 42px 0px;
  }

  ${media.tablet} {
    gap: 10.156vw;
    padding: 7.813vw 3.125vw 4.102vw 3.125vw;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 9.346vw;
    padding: 18.692vw 6.075vw 9.813vw 6.075vw;
  }
`;
const Wrapper = styled.footer`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background-color: ${colors.darkPurple};
  height: 88.806vw;
  gap: 3.611vw;
  bottom: 0;

  ${media.fullWidth} {
    height: 1279px;
    gap: 52px;
  }

  ${media.tablet} {
    height: 124.902vw;
    gap: 5.078vw;
  }

  ${media.mobile} {
    height: 353.738vw;
    gap: 7.477vw;
  }

  @media print {
    display: none;
  }
`;

export default Footer;
