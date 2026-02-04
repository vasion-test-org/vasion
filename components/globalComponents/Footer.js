'use client';

import React, { useEffect, useState, useRef } from 'react';

import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

import Facebook from '@/assets/svg/footer/Facebook.svg';
import LinkedIn from '@/assets/svg/footer/LinkedIn.svg';
import Twitter from '@/assets/svg/footer/Twitter.svg';
import VasionSmall from '@/assets/svg/SmallVasion.svg';
import VasionStarSVG from '@/assets/svg/VasionStarBig.svg';
import Button from '@/components/globalComponents/Button';
import { cn, tw } from '@/lib/cn';
import { storyblokEditable } from '@storyblok/react/rsc';

/**
 * Footer Component
 * Container count: 17 elements (preserved from styled-components)
 * Must remain client component due to: useState, useEffect, useRouter, GSAP
 */
const Footer = ({ blok }) => {
  const router = useRouter();
  const path = usePathname();
  const [language, setLanguage] = useState('en');
  const [footerColumns, setFooterColumns] = useState(blok.footer_columns);
  const starRef = useRef(null);

  useEffect(() => {
    function checkPathLocale(url) {
      const { pathname } = new URL(url, 'https://vasion.com');
      const pathLocale = pathname.split('/')[1];
      const supportedLocales = ['en', 'fr', 'de'];
      const defaultLocale = 'en';

      const lang = supportedLocales.includes(pathLocale) ? pathLocale : defaultLocale;
      setLanguage(lang);
      if (lang === 'de') {
        setFooterColumns(blok.german_footer_columns);
      } else if (lang === 'fr') {
        setFooterColumns(blok.french_footer_columns);
      } else {
        setFooterColumns(blok.footer_columns);
      }
    }

    if (path) {
      checkPathLocale(path);
    }
  }, [path, blok]);

  useEffect(() => {
    const star = starRef.current;
    if (!star) {
      return;
    }
    let spinAnimation;

    const handleMouseEnter = async () => {
      const { default: gsap } = await import('gsap');
      spinAnimation = gsap.to(star, {
        rotation: '+=360',
        duration: 1.5,
        repeat: -1,
        ease: 'linear',
      });
    };

    const handleMouseLeave = () => {
      if (spinAnimation) {
        spinAnimation.kill();
      }
    };

    const handleClick = () => {
      router.push('/component-testing');
    };

    star.addEventListener('mouseenter', handleMouseEnter);
    star.addEventListener('mouseleave', handleMouseLeave);
    star.addEventListener('click', handleClick);

    return () => {
      star.removeEventListener('mouseenter', handleMouseEnter);
      star.removeEventListener('mouseleave', handleMouseLeave);
      star.removeEventListener('click', handleClick);
      if (spinAnimation) {
        spinAnimation.kill();
      }
    };
  }, [router]);

  const handleNavigate = (link) => {
    const isExternalLink = link.startsWith('http') || link.startsWith('https');
    if (isExternalLink) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  };

  useEffect(() => {
    const star = document.getElementById('vasion-star-svg');
    if (!star) {
      return;
    }

    let spinAnimation;

    const handleMouseEnter = async () => {
      const { default: gsap } = await import('gsap');
      spinAnimation = gsap.to(star, {
        rotation: '+=360',
        duration: 1.5,
        repeat: -1,
        ease: 'linear',
      });
    };

    const handleMouseLeave = () => {
      if (spinAnimation) {
        spinAnimation.kill();
      }
    };

    const handleClick = () => {
      router.push('/component-testing');
    };

    star.addEventListener('mouseenter', handleMouseEnter);
    star.addEventListener('mouseleave', handleMouseLeave);
    star.addEventListener('click', handleClick);

    return () => {
      star.removeEventListener('mouseenter', handleMouseEnter);
      star.removeEventListener('mouseleave', handleMouseLeave);
      star.removeEventListener('click', handleClick);
      if (spinAnimation) {
        spinAnimation.kill();
      }
    };
  }, []);

  // LinkColumn rendered for each footer column
  const allLinksColumns =
    footerColumns?.map((column) => (
      // 8. LinkColumn - flex col with gap
      // Desktop: gap 1.389vw×16=22px→gap-6 | xl: 20px→gap-5 | md: 1.953vw×10.24=20px→gap-5 | sm: 4.673vw×4.8=22px→gap-6
      <div
        key={column._uid}
        className={tw`flex flex-col gap-6 xl:gap-5 md:gap-5 sm:gap-6`}
      >
        {/* 9. LinkColumnHeader - p tag with bodyMd and txtSubtle */}
        <p className="text-body-md font-archivo text-txt-subtle">
          {column.column_header?.content?.[0]?.content?.[0]?.text || ''}
        </p>
        {column.links?.map((link) => {
          const url = link.link?.url || link.link?.cached_url || '';
          const isExternal = url.startsWith('http://') || url.startsWith('https://');
          const normalizedUrl = isExternal ? url : url.startsWith('/') ? url : `/${url}`;

          return (
            // 10. LinkName - a tag with bodyMd, white, hover orange
            <a
              key={link._uid}
              href={normalizedUrl}
              target={link.link?.target || (isExternal ? '_blank' : '_self')}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-body-md font-archivo text-white cursor-pointer no-underline whitespace-nowrap hover:text-orange"
            >
              {link.link_name}
            </a>
          );
        })}
      </div>
    )) || [];

  return (
    // 1. Wrapper - main footer container with gradient background
    // Desktop: h-355 gap-14 | xl: h-320 gap-13 | md: h-320 gap-13 | sm: h-425 gap-9
    <div
      className={tw`
        footer
        relative flex flex-col overflow-hidden bg-footer bottom-0 print:hidden
        h-355 gap-14
        xl:(h-320 gap-13)
        md:(h-320 gap-13)
        sm:(h-425 gap-9)
      `}
    >
      {/* 2. MainFooterContainer - row with logo and links */}
      {/* Desktop: gap-63 pt-22 pb-12 | xl: gap-57 pt-20 pb-11 | md: gap-26 pt-20 px-8 pb-11 | sm: flex-col gap-11 pt-22 px-7 pb-12 */}
      <div
        className={tw`
          relative flex flex-row items-start justify-center w-full h-auto
          gap-63 pt-22 pb-12
          xl:(gap-57 pt-20 pb-11)
          md:(gap-26 pt-20 px-8 pb-11)
          sm:(flex-col gap-11 pt-22 px-7 pb-12)
        `}
      >
        {/* 3. LogoContainer - column with logo, address, star */}
        {/* Desktop: gap-6 w-67 | xl: gap-5 w-60 | md: gap-5 w-60 | sm: gap-6 w-61 */}
        <div
          className={tw`
            flex flex-col
            gap-6 w-67
            xl:(gap-5 w-60)
            md:(gap-5 w-60)
            sm:(gap-6 w-61)
          `}
        >
          {/* 4. Logo - VasionSmall SVG */}
          {/* Desktop: w-67 h-9 | xl: w-60 h-8 | md: w-45 h-6 | sm: w-50 h-7 */}
          <VasionSmall
            onClick={() => handleNavigate('/')}
            alt="vasion-logo"
            className={tw`
              cursor-pointer
              w-67 h-9
              xl:(w-60 h-8)
              md:(w-45 h-6)
              sm:(w-50 h-7)
            `}
          />
          {/* 5. Address - div with bodyMd txtSubtle */}
          <div className="text-body-md font-archivo text-txt-subtle">
            432 S. Tech Ridge Drive, St. George, Utah 84770 USA
          </div>
          {/* 6. VasionStar - SVG with hover animation, hidden on mobile */}
          {/* Desktop: mt-14 w-16 h-16 | xl: mt-12 w-15 h-15 | md: mt-12 w-15 h-15 | sm: hidden */}
          <div
            ref={starRef}
            id="vasion-star-svg"
            className={cn(
              'cursor-pointer self-start',
              'mt-14 w-16 h-16',
              'xl:mt-12 xl:w-15 xl:h-15',
              'md:mt-12 md:w-15 md:h-15',
              'sm:hidden'
            )}
          >
            <VasionStarSVG className="w-full h-full" />
          </div>
        </div>

        {/* 7. AllLinksContainer - row of link columns */}
        {/* Desktop: gap-17 | xl: gap-15 | md: gap-15 | sm: flex-wrap gap-17 */}
        <div
          className={tw`
            flex flex-row
            gap-17
            xl:gap-15
            md:gap-15
            sm:(flex-wrap gap-17)
          `}
        >
          {allLinksColumns}
        </div>
      </div>

      {/* 11. ButtonContainer - socials and CTA button with borders */}
      {/* Desktop: mx-41 py-9 | xl: mx-0 w-311 self-center py-8 | md: py-8 | sm: flex-col items-center gap-9 py-9 */}
      <div
        className={tw`
          relative flex flex-row justify-between z-10 border-y border-grey-700
          mx-41 py-9
          xl:(mx-0 w-311 self-center py-8)
          md:py-8
          sm:(flex-col items-center gap-9 py-9)
        `}
      >
        {/* 12. SocialsContainer - row of social icons */}
        {/* Desktop: gap-4 | xl: gap-3.5 | md: gap-3.5 | sm: gap-4 */}
        <div
          className={tw`
            flex flex-row items-center
            gap-4
            xl:gap-3.5
            md:gap-3.5
            sm:gap-4
          `}
        >
          {/* 13. SocialIcon - Facebook */}
          {/* Desktop: w-9 h-9 | xl: w-8 h-8 | md: w-8 h-8 | sm: w-9 h-9 */}
          <div
            onClick={() => handleNavigate('https://www.facebook.com/VasionSoftware')}
            className={tw`
              cursor-pointer [&_path]:hover:fill-orange
              w-9 h-9
              xl:(w-8 h-8)
              md:(w-8 h-8)
              sm:(w-9 h-9)
            `}
          >
            <Facebook />
          </div>
          {/* 13. SocialIcon - Twitter */}
          <div
            onClick={() =>
              handleNavigate('https://x.com/i/flow/login?redirect_after_login=%2FVasionSoftware')
            }
            className={tw`
              cursor-pointer [&_path]:hover:fill-orange
              w-9 h-9
              xl:(w-8 h-8)
              md:(w-8 h-8)
              sm:(w-9 h-9)
            `}
          >
            <Twitter />
          </div>
          {/* 13. SocialIcon - LinkedIn */}
          <div
            onClick={() =>
              handleNavigate('https://www.linkedin.com/company/vasion-software/posts/?feedView=all')
            }
            className={tw`
              cursor-pointer [&_path]:hover:fill-orange
              w-9 h-9
              xl:(w-8 h-8)
              md:(w-8 h-8)
              sm:(w-9 h-9)
            `}
          >
            <LinkedIn />
          </div>
        </div>
        {blok?.cta_button?.map(($buttonData) => (
          <div {...storyblokEditable($buttonData)} key={$buttonData?.link_text}>
            <Button $buttonData={$buttonData} />
          </div>
        ))}
      </div>

      {/* 14. LegalDiv - legal links and copyright */}
      {/* Desktop: mx-41 py-9 | xl: mx-0 w-311 self-center py-8 | md: py-8 | sm: flex-col items-center gap-6 py-9 */}
      <div
        className={tw`
          relative flex flex-row justify-between z-10 text-body-md font-archivo text-txt-subtle
          mx-41 py-9
          xl:(mx-0 w-311 self-center py-8)
          md:py-8
          sm:(flex-col items-center gap-6 py-9)
        `}
      >
        {/* 15. LegalLinks - row of legal link anchors */}
        {/* Desktop: gap-1.5 | xl: gap-1 | md: gap-1 | sm: gap-1.5 */}
        <div
          className={tw`
            flex flex-row
            gap-1.5
            xl:gap-1
            md:gap-1
            sm:gap-1.5
          `}
        >
          {/* 16. LegalLink × 4 */}
          <a
            onClick={() => handleNavigate('/privacy-policy/')}
            className="cursor-pointer no-underline hover:text-orange"
          >
            Privacy Policy
          </a>
          |
          <a
            onClick={() => handleNavigate('/imprint/')}
            className="cursor-pointer no-underline hover:text-orange"
          >
            Imprint
          </a>
          |
          <a
            onClick={() => handleNavigate('/cookie-information/')}
            className="cursor-pointer no-underline hover:text-orange"
          >
            Cookies
          </a>
          |
          <a
            onClick={() => handleNavigate('/legal/')}
            className="cursor-pointer no-underline hover:text-orange"
          >
            Legal
          </a>
        </div>
        © {new Date().getFullYear()} Vasion. All Rights Reserved
      </div>

      {/* 17. VasionFooter - absolute positioned footer image */}
      {/* Desktop: bottom-48 h-55 | xl: bottom-43 h-43 | md: bottom-43 h-44 | sm: bottom-15 h-26 */}
      <Image
        src="/images/uiElements/VasionFooterPNG.png"
        id="vasionfootersvg"
        alt="Vasion footer decoration"
        width={1600}
        height={220}
        className={tw`
          absolute w-full
          bottom-48 h-55
          xl:(bottom-43 h-43)
          md:(bottom-43 h-44)
          sm:(bottom-15 h-26)
        `}
      />
    </div>
  );
};

export default Footer;
