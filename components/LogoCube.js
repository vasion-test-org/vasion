import Image from 'next/image';

import { storyblokEditable } from '@storyblok/react/rsc';
import clsx from 'clsx';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';

import CarouselAnimator from './CarouselAnimator';

/**
 * LogoCube Component (Server Component)
 * Displays a carousel of company logos with optional header text.
 * Supports transparent and themed backgrounds.
 *
 * Mobile-First Breakpoint Pattern:
 * - Base (no prefix) = Mobile (0-480px)
 * - md: = Tablet (481-1024px)
 * - lg: = Desktop (1025-1600px)
 * - xl: = FullWidth (1601px+)
 */
const LogoCube = ({ blok }) => {
  const isTransparent = blok.transparent_background;
  const theme = blok.theme || 'default';
  const offsetSpacing = blok.offset_spacing;

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

  return (
    <>
      <section
        {...storyblokEditable(blok)}
        className={clsx(
          'flex w-full items-center justify-center',
          // Mobile-first: base = mobile, md/lg/xl for larger
          // Mobile: px-10 (5vw×480÷4=6→but design shows more), Tablet+: px-4
          'px-10 md:px-4 lg:px-4 xl:px-4',
          // Vertical padding based on offset_spacing
          offsetSpacing === 'top' && 'pt-15 pb-0',
          offsetSpacing === 'bottom' && 'pt-0 pb-15',
          !offsetSpacing && 'py-15'
        )}
        aria-label="Trusted by leading companies"
      >
        <div
          className={clsx(
            'mx-auto w-full overflow-hidden',
            // Background
            isTransparent
              ? 'bg-transparent'
              : theme === 'dark'
                ? 'bg-purple-dark'
                : theme === 'light'
                  ? 'bg-white'
                  : 'bg-purple',
            // Text color
            theme === 'light' ? 'text-txt-primary' : 'text-white',
            // Max width
            isTransparent ? 'max-w-full' : 'max-w-326',
            // Padding - mobile-first (base=mobile, then tablet, desktop)
            // Mobile: px-7 pt-11 pb-17, Tablet: p-10, Desktop+: p-15
            'px-7 pt-11 pb-17 md:p-10 lg:p-15 xl:p-15',
            // Border radius - mobile: rounded-4xl, larger: rounded-3xl
            'rounded-4xl md:rounded-3xl lg:rounded-3xl xl:rounded-3xl'
          )}
        >
          {/* Gap: mobile=9, tablet=5, desktop+=10 */}
          <div className="flex flex-col items-center justify-center gap-9 md:gap-5 lg:gap-10 xl:gap-10">
            {blok.header && (
              <header className="w-full text-center">
                <RichTextRenderer
                  blok={blok}
                  document={blok.header}
                  responsiveTextStyles={blok?.responsive_text_styles}
                />
              </header>
            )}

            <ul
              className={clsx(
                'm-0 flex w-full list-none items-center gap-5 overflow-hidden p-0',
                shouldCenter ? 'justify-center' : 'justify-start'
              )}
              aria-label="Company logos carousel"
            >
              {logosToDisplay.map((logo, index) => (
                <li
                  className="cubeLogos shrink-0 list-none"
                  key={logo.filename || logo.alt || index}
                >
                  <Image
                    alt={logo.alt || 'Company logo'}
                    // Mobile: w-56 h-28, larger: w-50 h-25
                    className="h-28 w-56 md:h-25 md:w-50 lg:h-25 lg:w-50 xl:h-25 xl:w-50"
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

      {shouldAnimate && <CarouselAnimator selector=".cubeLogos" />}
    </>
  );
};

export default LogoCube;
