import clsx from 'clsx';
import Image from 'next/image';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { tw } from '@/lib/cn';
import { storyblokEditable } from '@storyblok/react/rsc';

import CarouselAnimator from './CarouselAnimator';

/**
 * LogoCube Component (Server Component)
 * Displays a carousel of company logos with optional header text.
 * Supports transparent and themed backgrounds.
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
        aria-label="Trusted by leading companies"
        className={clsx(
          'flex w-full items-center justify-center',
          // Mobile-first: start with mobile padding, increase for larger screens
          'px-4 sm:px-10',
          // Vertical padding based on offset_spacing
          offsetSpacing === 'top' && 'pt-15 pb-0',
          offsetSpacing === 'bottom' && 'pt-0 pb-15',
          !offsetSpacing && 'py-15'
        )}
      >
        <div
          className={clsx(
            'w-full overflow-hidden mx-auto',
            // Background
            isTransparent ? 'bg-transparent' : theme === 'dark' ? 'bg-purple-dark' : theme === 'light' ? 'bg-white' : 'bg-purple',
            // Text color
            theme === 'light' ? 'text-txt-primary' : 'text-white',
            // Max width
            isTransparent ? 'max-w-full' : 'max-w-326',
            // Padding - using tw() for variant groups
            tw`p-15 md:p-10 sm:(px-7 pt-11 pb-17)`,
            // Border radius
            'rounded-3xl sm:rounded-4xl'
          )}
        >
          {/* Using tw() for grouped responsive classes */}
          <div className={tw`flex flex-col items-center justify-center gap-10 md:gap-5 sm:gap-9`}>
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
              aria-label="Company logos carousel"
              className={clsx(
                'flex w-full items-center overflow-hidden gap-5 m-0 p-0 list-none',
                shouldCenter ? 'justify-center' : 'justify-start'
              )}
            >
              {logosToDisplay.map((logo, index) => (
                <li
                  key={logo.filename || logo.alt || index}
                  className="cubeLogos shrink-0 list-none"
                >
                  <Image
                    alt={logo.alt || 'Company logo'}
                    // Using tw() for variant groups
                    className={tw`w-50 h-25 sm:(w-56 h-28)`}
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
