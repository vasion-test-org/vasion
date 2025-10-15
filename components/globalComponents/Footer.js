'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import VasionStarSVG from '@/assets/svg/VasionStarBig.svg';
import VasionSmall from '@/assets/svg/SmallVasion.svg';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

// Lazy load GSAP only when needed
const loadGSAP = async () => {
  const { default: gsap } = await import('gsap');
  return gsap;
};

import Button from '@/components/globalComponents/Button';
import Facebook from '@/assets/svg/footer/Facebook.svg';
import Twitter from '@/assets/svg/footer/Twitter.svg';
import LinkedIn from '@/assets/svg/footer/LinkedIn.svg';
import { storyblokEditable } from '@storyblok/react/rsc';

const Footer = ({ blok }) => {
  const router = useRouter();
  const path = usePathname();
  const [language, setLanguage] = useState('en');
  const [footerColumns, setFooterColumns] = useState(blok.footer_columns);

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
      // console.log("lang", lang);
      if (lang === 'de') {
        setFooterColumns(blok.german_footer_columns);
        // console.log("blok.german_footer_columns", blok.german_footer_columns);
      } else if (lang === 'fr') {
        setFooterColumns(blok.french_footer_columns);
        // console.log("blok.french_footer_columns", blok.french_footer_columns);
      } else {
        setFooterColumns(blok.footer_columns);
        // console.log("blok.footer_columns", blok.footer_columns);
      }
    }

    if (path) {
      checkPathLocale(path);
    }
  }, [path, blok]);

  useEffect(() => {
    // Lazy load GSAP and create timeline
    loadGSAP().then((gsap) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.footer',
          start: '50% 50%',
        },
      });

      tl.from('#vasionfootersvg', {
        yPercent: 100,
        duration: 2,
        ease: 'back.out',
      });
    });
  }, []);

  useEffect(() => {
    const canvas = document.getElementById('gradientCanvas');

    if (canvas) {
    }
  }, []);
  // console.log("footerColumns", footerColumns);

  const allLinksColumns =
    footerColumns?.map((column) => (
      <LinkColumn key={column._uid}>
        <LinkColumnHeader>
          {column.column_header?.content?.[0]?.content?.[0]?.text || ''}
        </LinkColumnHeader>
        {column.links?.map((link) => {
          const url = link.link?.url || link.link?.cached_url || '';
          const isExternal =
            url.startsWith('http://') || url.startsWith('https://');

          const normalizedUrl = isExternal
            ? url
            : url.startsWith('/')
            ? url
            : `/${url}`;

          return (
            <LinkName
              key={link._uid}
              href={normalizedUrl}
              target={link.link?.target || (isExternal ? '_blank' : '_self')}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              {link.link_name}
            </LinkName>
          );
        })}
      </LinkColumn>
    )) || [];

  const handleNavigate = (link) => {
    const isExternalLink = link.startsWith('http') || link.startsWith('https');
    if (isExternalLink) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  };

  return (
    <Wrapper className="footer">
      <MainFooterContainer>
        <LogoContainer>
          <Logo onClick={() => handleNavigate('/')} />
          <Address>432 S. Tech Ridge Drive, St. George, Utah 84770 USA</Address>
          <VasionStar />
        </LogoContainer>
        <AllLinksContainer>{allLinksColumns}</AllLinksContainer>
      </MainFooterContainer>
      <ButtonContainer>
        <SocialsContainer>
          <SocialIcon
            onClick={() =>
              handleNavigate('https://www.facebook.com/VasionSoftware')
            }
          >
            <Facebook />
          </SocialIcon>
          <SocialIcon
            onClick={() =>
              handleNavigate(
                'https://x.com/i/flow/login?redirect_after_login=%2FVasionSoftware'
              )
            }
          >
            <Twitter />
          </SocialIcon>
          <SocialIcon
            onClick={() =>
              handleNavigate(
                'https://www.linkedin.com/company/vasion-software/posts/?feedView=all'
              )
            }
          >
            <LinkedIn />
          </SocialIcon>
        </SocialsContainer>
        {blok?.cta_button?.map(($buttonData) => (
          <div {...storyblokEditable($buttonData)} key={$buttonData?.link_text}>
            <Button $buttonData={$buttonData} />
          </div>
        ))}
      </ButtonContainer>
      <LegalDiv>
        <LegalLinks>
          <LegalLink onClick={() => handleNavigate('/privacy-policy/')}>
            Privacy Policy
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate('/imprint/')}>
            Imprint
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate('/cookie-information/')}>
            Cookies
          </LegalLink>
          |
          <LegalLink onClick={() => handleNavigate('/legal/')}>Legal</LegalLink>
        </LegalLinks>
        © 2025 Vasion. All Rights Reserved
      </LegalDiv>
      <VasionFooter
        src={'/images/uiElements/VasionFooterPNG.png'}
        id="vasionfootersvg"
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
const LinkName = styled.a`
  ${text.bodyMd};
  color: ${colors.white};
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
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
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, #201435 52%, rgba(32, 20, 53, 0) 100%),
    linear-gradient(270deg, #cc4800 1.74%, #5f47a8 99.26%), #201435;
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
