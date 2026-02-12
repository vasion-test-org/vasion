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
 * Footer Component - Converted from styled-components
 *
 * Tailwind Mobile-First Conversion:
 * - Base (no prefix) = mobile styles (0-480px)
 * - md: = tablet styles (481-1024px)
 * - lg: = desktop styles (1025-1600px)
 * - xl: = fullWidth styles (1601px+)
 *
 * Each breakpoint inherits from smaller breakpoints unless overridden.
 */
const Footer = ({ blok }) => {
  const testClasses = tw`md:(flex-col w-60) lg:(flex-col w-67) xl:(flex-col w-60) flex w-75 flex-row items-start justify-start gap-5 gap-6`;
  console.log('Generated classes:', testClasses);
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
      // Kill any existing animation
      if (spinAnimation) {
        spinAnimation.kill();
      }
      // Start infinite spin
      spinAnimation = gsap.to(star, {
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
        rotation: '+=360',
      });
    };

    const handleMouseLeave = async () => {
      const { default: gsap } = await import('gsap');
      if (spinAnimation) {
        spinAnimation.kill();
      }

      // Get current rotation
      const currentRotation = gsap.getProperty(star, 'rotation');

      // Calculate nearest full rotation (0, 360, 720, etc.)
      const targetRotation = Math.round(currentRotation / 360) * 360;

      // Smoothly decelerate back to original position
      spinAnimation = gsap.to(star, {
        rotation: targetRotation,
        duration: 1.5,
        ease: 'power2.out', // Smooth deceleration
        onComplete: () => {
          // Reset to 0 to prevent accumulated values
          gsap.set(star, { rotation: 0 });
        },
      });
    };

    const handleClick = () => {
      router.push('/games/ticket-crunch');
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
  // Original: gap: 1.389vw (desktop) | 20px (xl) | 1.953vw (md) | 4.673vw (mobile)
  // Mobile: 4.673vw × 4.8 = 22px → gap-6
  // Tablet: 1.953vw × 10.24 = 20px → gap-5
  // Desktop: 1.389vw × 16 = 22px → gap-6 (same as mobile, no change needed)
  // FullWidth: 20px → gap-5 (same as tablet)
  const allLinksColumns =
    footerColumns?.map((column) => (
      <div className={tw`flex flex-col gap-6 md:gap-5`} key={column._uid}>
        <p className="font-archivo text-body-md text-txt-subtle">
          {column.column_header?.content?.[0]?.content?.[0]?.text || ''}
        </p>
        {column.links?.map((link) => {
          const url = link.link?.url || link.link?.cached_url || '';
          const isExternal = url.startsWith('http://') || url.startsWith('https://');
          const normalizedUrl = isExternal ? url : url.startsWith('/') ? url : `/${url}`;

          return (
            <a
              className="font-archivo text-body-md hover:text-orange focus:text-orange cursor-pointer whitespace-nowrap text-white no-underline focus:underline focus:outline-none"
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
    // 1. Wrapper
    // Mobile: 353.738vw × 4.8 = 1698px → h-425, 7.477vw × 4.8 = 36px → gap-9
    // Tablet: 124.902vw × 10.24 = 1279px → h-320, 5.078vw × 10.24 = 52px → gap-13
    // Desktop: 88.806vw × 16 = 1421px → h-355, 3.611vw × 16 = 58px → gap-14
    // FullWidth: 1279px → h-320, 52px → gap-13
    <div
      className={tw`footer bg-footer md:(h-320 gap-13) lg:(h-355 gap-14) xl:(h-320 gap-13) relative bottom-0 flex h-425 flex-col gap-9 overflow-hidden print:hidden`}
    >
      {/* 2. MainFooterContainer */}
      {/* Mobile: flex-col, 9.346vw×4.8=45px→gap-11, pt:18.692vw×4.8=90px→pt-22, px:6.075vw×4.8=29px→px-7, pb:9.813vw×4.8=47px→pb-12 */}
      {/* Tablet: flex-row, 10.156vw×10.24=104px→gap-26, pt:7.813vw×10.24=80px→pt-20, px:3.125vw×10.24=32px→px-8, pb:4.102vw×10.24=42px→pb-10 */}
      {/* Desktop: flex-row, 15.694vw×16=251px→gap-63, pt:5.556vw×16=89px→pt-22, px:0, pb:2.917vw×16=47px→pb-12 */}
      {/* FullWidth: flex-row, 226px→gap-57, pt:80px→pt-20, px:0, pb:42px→pb-10 */}
      <div
        className={tw`md:(flex-row pb-10) lg:(gap-63 pb-12) xl:(gap-57 pb-10) relative flex h-auto w-full flex-col items-start justify-center gap-11 px-7 pt-20 pb-12`}
      >
        {/*prettier-ignore*/}
        <div
        className="flex w-75 flex-col items-start justify-start gap-6 sm:flex-row md:flex-col md:w-60 md:gap-5 lg:flex-col lg:w-67 lg:gap-6 xl:flex-col xl:w-60 xl:gap-5"
        >
          {/* Inner column for logo + address */}
          <div className={tw`flex flex-col gap-6`}>
            {/* 4. Logo (VasionSmall) */}
          <VasionSmall
            alt="vasion-logo"
            className={tw`h-7 w-50 cursor-pointer md:(w-45 h-6) lg:(w-67 h-9) xl:(w-60 h-8)`}
            onClick={() => handleNavigate('/')}
          />
            {/* 5. Address */}
            <div className={tw`font-archivo text-body-md text-txt-subtle`}>
              432 S. Tech Ridge Drive, St. George, Utah 84770 USA
            </div>
          </div>

          {/* 6. VasionStar - right side on mobile, below on tablet+ */}

          {/*prettier-ignore*/}
          <div
            className={tw`md:(mt-12 h-15 w-15) lg:(mt-14 h-17 w-17) xl:(mt-12 h-15 w-15) block h-18 w-18 cursor-pointer self-start`}
            id="vasion-star-svg"
            ref={starRef}
          >
            <VasionStarSVG className={tw`h-full w-full`} />
          </div>
        </div>
        <div
          className={tw`md:(flex-nowrap gap-15) flex flex-row flex-wrap gap-10 lg:gap-17 xl:gap-15`}
        >
          {allLinksColumns}
        </div>
      </div>

      {/* 11. ButtonContainer */}
      {/* Mobile: flex-col, items-center, mx:10.278vw×4.8=49px→mx-12, gap:7.477vw×4.8=36px→gap-9, py:7.477vw×4.8=36px→py-9 */}
      {/* Tablet: flex-row, mx:10.278vw×10.24=105px→mx-26, py:3.125vw×10.24=32px→py-8 */}
      {/* Desktop: flex-row, mx:10.278vw×16=164px→mx-41, py:2.222vw×16=36px→py-9 */}
      {/* FullWidth: flex-row, mx:0, w:1244px→w-311, self-center, py:32px→py-8 */}
      <div
        className={tw`border-grey-700 md:(flex-row py-8) lg:(mx-41 py-9) xl:(mx-0 py-8) relative z-10 mx-12 flex w-311 flex-col items-center justify-between gap-9 self-center border-y py-9`}
      >
        {/* 12. SocialsContainer */}
        {/* Mobile: 3.271vw×4.8=16px→gap-4 */}
        {/* Tablet: 1.367vw×10.24=14px→gap-3.5 */}
        {/* Desktop: 0.972vw×16=16px→gap-4 */}
        {/* FullWidth: 14px→gap-3.5 */}
        <div className={tw`flex flex-row items-center gap-4 md:gap-3.5 lg:gap-4 xl:gap-3.5`}>
          {/* 13. SocialIcon */}
          {/* Mobile: 7.477vw×4.8=36px→w-9 h-9 */}
          {/* Tablet: 3.125vw×10.24=32px→w-8 h-8 */}
          {/* Desktop: 2.222vw×16=36px→w-9 h-9 */}
          {/* FullWidth: 32px→w-8 h-8 */}
          <button
            aria-label="Visit Vasion on Facebook"
            className={tw`md:(h-8 w-8) lg:(h-9 w-9) xl:(h-8 w-8) [&_path]:hover:fill-orange focus:(outline-none ring-orange ring-offset-purple-dark) h-9 w-9 cursor-pointer rounded border-none bg-transparent p-0 ring-2 ring-offset-2`}
            type="button"
            onClick={() => handleNavigate('https://www.facebook.com/VasionSoftware')}
          >
            <Facebook />
          </button>
          <button
            aria-label="Visit Vasion on X (Twitter)"
            className={tw`md:(h-8 w-8) lg:(h-9 w-9) xl:(h-8 w-8) [&_path]:hover:fill-orange focus:(outline-none ring-orange ring-offset-purple-dark) h-9 w-9 cursor-pointer rounded border-none bg-transparent p-0 ring-2 ring-offset-2`}
            type="button"
            onClick={() =>
              handleNavigate('https://x.com/i/flow/login?redirect_after_login=%2FVasionSoftware')
            }
          >
            <Twitter />
          </button>
          <button
            aria-label="Visit Vasion on LinkedIn"
            className={tw`md:(h-8 w-8) lg:(h-9 w-9) xl:(h-8 w-8) [&_path]:hover:fill-orange focus:(outline-none ring-orange ring-offset-purple-dark) h-9 w-9 cursor-pointer rounded border-none bg-transparent p-0 ring-2 ring-offset-2`}
            type="button"
            onClick={() =>
              handleNavigate('https://www.linkedin.com/company/vasion-software/posts/?feedView=all')
            }
          >
            <LinkedIn />
          </button>
        </div>
        {blok?.cta_button?.map(($buttonData) => (
          <div {...storyblokEditable($buttonData)} key={$buttonData?.link_text}>
            <Button $buttonData={$buttonData} />
          </div>
        ))}
      </div>

      {/* 14. LegalDiv */}
      {/* Mobile: flex-col, items-center, mx:10.278vw×4.8=49px→mx-12, gap:4.673vw×4.8=22px→gap-6, py:7.477vw×4.8=36px→py-9 */}
      {/* Tablet: flex-row, mx:10.278vw×10.24=105px→mx-26, py:3.125vw×10.24=32px→py-8 */}
      {/* Desktop: flex-row, mx:10.278vw×16=164px→mx-41, py:2.222vw×16=36px→py-9 */}
      {/* FullWidth: flex-row, mx:0, w:1244px→w-311, self-center, py:32px→py-8 */}
      <div
        className={tw`font-archivo text-body-md text-txt-subtle md:(flex-row py-8) lg:(mx-41 py-9) xl:(mx-0 py-8) relative z-10 mx-12 flex w-311 flex-col items-center justify-between gap-6 self-center py-9`}
      >
        {/* 15. LegalLinks */}
        {/* Mobile: 1.168vw×4.8=6px→gap-1.5 */}
        {/* Tablet: 0.488vw×10.24=5px→gap-1 */}
        {/* Desktop: 0.347vw×16=6px→gap-1.5 */}
        {/* FullWidth: 5px→gap-1 */}
        <div className={tw`flex flex-row gap-1.5 md:gap-1 lg:gap-1.5 xl:gap-1`}>
          <button
            className="hover:text-orange font-inherit focus:text-orange cursor-pointer border-none bg-transparent p-0 text-inherit no-underline focus:underline focus:outline-none"
            type="button"
            onClick={() => handleNavigate('/privacy-policy/')}
          >
            Privacy Policy
          </button>
          |
          <button
            className="hover:text-orange font-inherit focus:text-orange cursor-pointer border-none bg-transparent p-0 text-inherit no-underline focus:underline focus:outline-none"
            type="button"
            onClick={() => handleNavigate('/imprint/')}
          >
            Imprint
          </button>
          |
          <button
            className="hover:text-orange font-inherit focus:text-orange cursor-pointer border-none bg-transparent p-0 text-inherit no-underline focus:underline focus:outline-none"
            type="button"
            onClick={() => handleNavigate('/cookie-information/')}
          >
            Cookies
          </button>
          |
          <button
            className="hover:text-orange font-inherit focus:text-orange cursor-pointer border-none bg-transparent p-0 text-inherit no-underline focus:underline focus:outline-none"
            type="button"
            onClick={() => handleNavigate('/legal/')}
          >
            Legal
          </button>
        </div>
        © {new Date().getFullYear()} Vasion. All Rights Reserved
      </div>

      {/* 17. VasionFooter (Image) */}
      {/* Mobile: bottom:12.421vw×4.8=60px→bottom-15, height:21.262vw×4.8=102px→h-26 */}
      {/* Tablet: bottom:16.895vw×10.24=173px→bottom-43, height:17.336vw×10.24=178px→h-44 */}
      {/* Desktop: bottom:12vw×16=192px→bottom-48, height:13.75vw×16=220px→h-55 */}
      {/* FullWidth: bottom:173px→bottom-43, height:172px→h-43 */}
      <Image
        alt="Vasion footer decoration"
        className={tw`md:(bottom-43 h-44) lg:(bottom-48 h-55) xl:(bottom-43 h-43) absolute bottom-15 h-26 w-full`}
        height={220}
        id="vasionfootersvg"
        src="/images/uiElements/VasionFooterPNG.png"
        width={1600}
      />
    </div>
  );
};

export default Footer;
