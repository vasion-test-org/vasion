'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { storyblokEditable } from '@storyblok/react/rsc';

import Facebook from '@/assets/svg/footer/Facebook.svg';
import LinkedIn from '@/assets/svg/footer/LinkedIn.svg';
import Twitter from '@/assets/svg/footer/Twitter.svg';
import VasionSmall from '@/assets/svg/SmallVasion.svg';
import VasionStarSVG from '@/assets/svg/VasionStarBig.svg';
import Button from '@/components/globalComponents/Button';
import { cn, tw } from '@/lib/cn';

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
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
        rotation: '+=360',
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
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
        rotation: '+=360',
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
      <div className={tw`flex flex-col gap-6 sm:gap-6 md:gap-5 xl:gap-5`} key={column._uid}>
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
              className="text-body-md font-archivo hover:text-orange cursor-pointer whitespace-nowrap text-white no-underline"
              href={normalizedUrl}
              key={link._uid}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              target={link.link?.target || (isExternal ? '_blank' : '_self')}
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
      className={tw`footer bg-footer xl:(h-320 gap-13) md:(h-320 gap-13) sm:(h-425 gap-9) relative bottom-0 flex h-355 flex-col gap-14 overflow-hidden print:hidden`}
    >
      {/* 2. MainFooterContainer - row with logo and links */}
      {/* Desktop: gap-63 pt-22 pb-12 | xl: gap-57 pt-20 pb-11 | md: gap-26 pt-20 px-8 pb-11 | sm: flex-col gap-11 pt-22 px-7 pb-12 */}
      <div
        className={tw`xl:(gap-57 pb-11) md:(gap-26 pb-11) sm:(flex-col pb-12) relative flex h-auto w-full flex-row items-start justify-center gap-11 gap-63 px-7 px-8 pt-20 pt-22 pb-12`}
      >
        {/* 3. LogoContainer - column with logo, address, star */}
        {/* Desktop: gap-6 w-67 | xl: gap-5 w-60 | md: gap-5 w-60 | sm: gap-6 w-61 */}
        <div
          className={tw`xl:(gap-5 w-60) md:(gap-5 w-60) sm:(gap-6 w-61) flex w-67 flex-col gap-6`}
        >
          {/* 4. Logo - VasionSmall SVG */}
          {/* Desktop: w-67 h-9 | xl: w-60 h-8 | md: w-45 h-6 | sm: w-50 h-7 */}
          <VasionSmall
            className={tw`xl:(w-60 h-8) md:(w-45 h-6) sm:(w-50 h-7) h-9 w-67 cursor-pointer`}
            alt="vasion-logo"
            onClick={() => handleNavigate('/')}
          />
          {/* 5. Address - div with bodyMd txtSubtle */}
          <div className="text-body-md font-archivo text-txt-subtle">
            432 S. Tech Ridge Drive, St. George, Utah 84770 USA
          </div>
          {/* 6. VasionStar - SVG with hover animation, hidden on mobile */}
          {/* Desktop: mt-14 w-16 h-16 | xl: mt-12 w-15 h-15 | md: mt-12 w-15 h-15 | sm: hidden */}
          <div
            className={cn(
              'cursor-pointer self-start',
              'mt-14 h-16 w-16',
              'xl:mt-12 xl:h-15 xl:w-15',
              'md:mt-12 md:h-15 md:w-15',
              'sm:hidden'
            )}
            id="vasion-star-svg"
            ref={starRef}
          >
            <VasionStarSVG className="h-full w-full" />
          </div>
        </div>

        {/* 7. AllLinksContainer - row of link columns */}
        {/* Desktop: gap-17 | xl: gap-15 | md: gap-15 | sm: flex-wrap gap-17 */}
        <div className={tw`sm:(flex-wrap gap-17) flex flex-row gap-17 md:gap-15 xl:gap-15`}>
          {allLinksColumns}
        </div>
      </div>

      {/* 11. ButtonContainer - socials and CTA button with borders */}
      {/* Desktop: mx-41 py-9 | xl: mx-0 w-311 self-center py-8 | md: py-8 | sm: flex-col items-center gap-9 py-9 */}
      <div
        className={tw`border-grey-700 xl:(mx-0 py-8) sm:(flex-col py-9) relative z-10 mx-41 flex w-311 flex-row items-center justify-between gap-9 self-center border-y py-9 md:py-8`}
      >
        {/* 12. SocialsContainer - row of social icons */}
        {/* Desktop: gap-4 | xl: gap-3.5 | md: gap-3.5 | sm: gap-4 */}
        <div className={tw`flex flex-row items-center gap-4 sm:gap-4 md:gap-3.5 xl:gap-3.5`}>
          {/* 13. SocialIcon - Facebook */}
          {/* Desktop: w-9 h-9 | xl: w-8 h-8 | md: w-8 h-8 | sm: w-9 h-9 */}
          <div
            className={tw`[&_path]:hover:fill-orange xl:(w-8 h-8) md:(w-8 h-8) sm:(w-9 h-9) h-9 w-9 cursor-pointer`}
            onClick={() => handleNavigate('https://www.facebook.com/VasionSoftware')}
          >
            <Facebook />
          </div>
          {/* 13. SocialIcon - Twitter */}
          <div
            className={tw`[&_path]:hover:fill-orange xl:(w-8 h-8) md:(w-8 h-8) sm:(w-9 h-9) h-9 w-9 cursor-pointer`}
            onClick={() =>
              handleNavigate('https://x.com/i/flow/login?redirect_after_login=%2FVasionSoftware')
            }
          >
            <Twitter />
          </div>
          {/* 13. SocialIcon - LinkedIn */}
          <div
            className={tw`[&_path]:hover:fill-orange xl:(w-8 h-8) md:(w-8 h-8) sm:(w-9 h-9) h-9 w-9 cursor-pointer`}
            onClick={() =>
              handleNavigate('https://www.linkedin.com/company/vasion-software/posts/?feedView=all')
            }
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
        className={tw`text-body-md font-archivo text-txt-subtle xl:(mx-0 py-8) sm:(flex-col py-9) relative z-10 mx-41 flex w-311 flex-row items-center justify-between gap-6 self-center py-9 md:py-8`}
      >
        {/* 15. LegalLinks - row of legal link anchors */}
        {/* Desktop: gap-1.5 | xl: gap-1 | md: gap-1 | sm: gap-1.5 */}
        <div className={tw`flex flex-row gap-1.5 sm:gap-1.5 md:gap-1 xl:gap-1`}>
          {/* 16. LegalLink × 4 */}
          <a
            className="hover:text-orange cursor-pointer no-underline"
            onClick={() => handleNavigate('/privacy-policy/')}
          >
            Privacy Policy
          </a>
          |
          <a
            className="hover:text-orange cursor-pointer no-underline"
            onClick={() => handleNavigate('/imprint/')}
          >
            Imprint
          </a>
          |
          <a
            className="hover:text-orange cursor-pointer no-underline"
            onClick={() => handleNavigate('/cookie-information/')}
          >
            Cookies
          </a>
          |
          <a
            className="hover:text-orange cursor-pointer no-underline"
            onClick={() => handleNavigate('/legal/')}
          >
            Legal
          </a>
        </div>
        © {new Date().getFullYear()} Vasion. All Rights Reserved
      </div>

      {/* 17. VasionFooter - absolute positioned footer image */}
      {/* Desktop: bottom-48 h-55 | xl: bottom-43 h-43 | md: bottom-43 h-44 | sm: bottom-15 h-26 */}
      <Image
        className={tw`xl:(bottom-43 h-43) md:(bottom-43 h-44) sm:(bottom-15 h-26) absolute bottom-48 h-55 w-full`}
        alt="Vasion footer decoration"
        height={220}
        id="vasionfootersvg"
        src="/images/uiElements/VasionFooterPNG.png"
        width={1600}
      />
    </div>
  );
};

export default Footer;
