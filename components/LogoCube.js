import Image from 'next/image';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { cn } from '@/lib/cn';
import { storyblokEditable } from '@storyblok/react/rsc';

import CarouselAnimator from './CarouselAnimator';

/**
 * LogoCube Component (Server Component)
 * Displays a carousel of company logos with optional header text.
 * Supports transparent and themed backgrounds.
 * 
 * VW Conversion Notes:
 * - Card max-width: 81.5vw (desk) = 1304px → max-w-326
 * - Card padding: 3.75rem (60px) desk, 2.5rem (40px) tab, varies mobile
 * - Logo size: 12.5vw (desk) = 200px → w-50 h-25
 * - Inner gap: 2.5rem (40px) desk → gap-10, 1.25rem (20px) tab → gap-5
 */
const LogoCube = ({ blok }) => {
  const isTransparent = blok.transparent_background;
  const theme = blok.theme || 'default';

  const defaultLogos = [
    { alt: 'NASCAR logo - Professional racing organization', image: '/images/icons/nascar.png' },
    { alt: 'ESPN logo - Sports entertainment network', image: '/images/icons/espn.png' },
    { alt: 'MetLife logo - Insurance company', image: '/images/icons/metlife.png' },
    { alt: 'Priceline logo - Travel booking service', image: '/images/icons/priceline.png' },
    { alt: 'JPMorgan logo - Financial services company', image: '/images/icons/jpMorgan.png' },
    { alt: 'GE logo - General Electric corporation', image: '/images/icons/GE.png' },
    { alt: 'Yahoo logo - Technology company', image: '/images/icons/Yahoo.png' },
    { alt: 'Aon logo - Professional services firm', image: '/images/icons/Aon.png' },
  ];

  const logosToDisplay = blok.logos?.length > 0 ? blok.logos : defaultLogos;
  const shouldCenter = logosToDisplay?.length < 6;
  const shouldAnimate = logosToDisplay?.length >= 7;

  // Map offset_spacing to Tailwind padding classes
  const getPaddingClasses = () => {
    const base = blok.offset_spacing;
    // Default: py-15 (60px), tablet: py-10 (40px approx via 5.859vw), mobile: py-15 (60px via 12.5vw)
    if (base === 'top') return 'pt-15 pb-0 tab:pt-10 mob:pt-15';
    if (base === 'bottom') return 'pt-0 pb-15 tab:pb-10 mob:pb-15';
    return 'py-15 tab:py-10 mob:py-15';
  };

  // Theme-based background classes
  const getCardBgClass = () => {
    if (isTransparent) return 'bg-transparent';
    // Map themes to Tailwind bg classes
    switch (theme) {
      case 'dark': return 'bg-purple-dark';
      case 'light': return 'bg-white';
      default: return 'bg-purple-DEFAULT';
    }
  };

  // Theme-based text color classes
  const getCardTextClass = () => {
    switch (theme) {
      case 'light': return 'text-txt-primary';
      default: return 'text-white';
    }
  };

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        aria-label="Trusted by leading companies"
        className={cn(
          'flex w-full items-center justify-center',
          getPaddingClasses(),
          // Horizontal padding for tablet/mobile
          'tab:px-10 mob:px-4'
        )}
      >
        <div
          className={cn(
            'w-full overflow-hidden',
            getCardBgClass(),
            getCardTextClass(),
            // Max width - transparent gets full, themed gets constrained
            isTransparent ? 'max-w-full' : 'max-w-326',
            // Padding - desktop: 60px, tablet: 40px 40px 60px, mobile: 45px 29px 67px
            'p-15 tab:px-10 tab:py-10 tab:pb-15 mob:px-7 mob:pt-11 mob:pb-17',
            // Border radius
            'rounded-3xl mob:rounded-4xl'
          )}
        >
          <div
            className={cn(
              'flex flex-col items-center justify-center',
              // Gap - desktop: 40px, tablet: 20px, mobile: 36px
              'gap-10 tab:gap-5 mob:gap-9'
            )}
          >
            {/* Title Container */}
            {blok.header && (
              <header className="w-full text-center">
                <RichTextRenderer
                  blok={blok}
                  document={blok.header}
                  responsiveTextStyles={blok?.responsive_text_styles}
                />
              </header>
            )}

            {/* LogoContainer - logos row */}
            <ul
              aria-label="Company logos carousel"
              role="list"
              className={cn(
                'flex w-full items-center overflow-hidden list-none gap-5 m-0 p-0',
                shouldCenter ? 'justify-center' : 'justify-start'
              )}
            >
              {logosToDisplay.map((logo, index) => (
                <li
                  key={logo.filename || logo.alt || index}
                  className="cubeLogos flex-shrink-0 list-none"
                  role="listitem"
                >
                  <Image
                    alt={logo.alt || 'Company logo'}
                    // Logo size: 200x100 desktop, 224x112 mobile
                    className="w-50 h-25 mob:w-56 mob:h-28"
                    height={100}
                    loading="lazy"
                    src={logo.filename || logo.image}
                    width={200}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Client component only for GSAP animation - minimal JS */}
      {shouldAnimate && <CarouselAnimator selector=".cubeLogos" />}
    </>
  );
};

export default LogoCube;
