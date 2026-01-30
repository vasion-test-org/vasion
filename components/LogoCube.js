import Image from 'next/image';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { defaultTheme, darkTheme, lightTheme } from '@/styles/theme';
import { storyblokEditable } from '@storyblok/react/rsc';

import CarouselAnimator from './CarouselAnimator';

// Theme lookup - static, no context needed
const themes = {
  default: defaultTheme,
  dark: darkTheme,
  light: lightTheme,
};

/**
 * LogoCube Component (Server Component)
 * Displays a carousel of company logos with optional header text.
 * Supports transparent and themed backgrounds.
 */
const LogoCube = ({ blok }) => {
  const isTransparent = blok.transparent_background;
  const selectedTheme = themes[blok.theme] || themes.default;

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

  // Generate unique ID for scoped styles
  const componentId = `logo-cube-${blok._uid || 'default'}`;

  // Calculate spacing based on props
  const hasCustomSpacing = blok.section_spacing && blok.section_spacing !== 'default';
  const customSpacing = hasCustomSpacing ? `${blok.section_spacing}px` : null;

  // Determine padding class based on offset_spacing
  let paddingClass = 'logo-cube-py'; // default: both
  if (blok.offset_spacing === 'top') paddingClass = 'logo-cube-pt';
  if (blok.offset_spacing === 'bottom') paddingClass = 'logo-cube-pb';

  // Theme colors (from static theme object)
  const cardBg = selectedTheme?.logo_cube?.cardBg || '#3d2562';
  const textColor = selectedTheme?.logo_cube?.textColor || 'white';

  return (
    <>
      {/* Scoped CSS for responsive styles - no JS needed! */}
      <style>{`
        .${componentId} {
          --card-bg: ${isTransparent ? 'transparent' : cardBg};
          --card-color: ${textColor};
          --custom-spacing: ${customSpacing || '3.75rem'};
        }
        
        /* Wrapper padding - Desktop/Fullwidth */
        .${componentId}.logo-cube-py { padding-top: ${customSpacing || '3.75rem'}; padding-bottom: ${customSpacing || '3.75rem'}; }
        .${componentId}.logo-cube-pt { padding-top: ${customSpacing || '3.75rem'}; padding-bottom: 0; }
        .${componentId}.logo-cube-pb { padding-top: 0; padding-bottom: ${customSpacing || '3.75rem'}; }
        
        /* Card - Desktop */
        .${componentId} .logo-cube-card {
          background: var(--card-bg);
          color: var(--card-color);
          max-width: ${isTransparent ? '100%' : '81.5rem'};
          padding: 3.75rem;
          border-radius: 1.5rem;
        }
        
        /* Inner container gap - Desktop */
        .${componentId} .logo-cube-inner { gap: 2.5rem; }
        
        /* Logo size - Desktop */
        .${componentId} .logo-cube-logo { width: 12.5rem; height: 6.25rem; }
        
        /* Tablet styles (481px - 1024px) */
        @media (min-width: 481px) and (max-width: 1024px) {
          .${componentId} { padding-left: 2.5rem; padding-right: 2.5rem; }
          .${componentId}.logo-cube-py { padding-top: ${customSpacing || '5.859vw'}; padding-bottom: ${customSpacing || '5.859vw'}; }
          .${componentId}.logo-cube-pt { padding-top: ${customSpacing || '5.859vw'}; }
          .${componentId}.logo-cube-pb { padding-bottom: ${customSpacing || '5.859vw'}; }
          
          .${componentId} .logo-cube-card {
            max-width: 100%;
            padding: 2.5rem 2.5rem 3.75rem;
            border-radius: 1.5rem;
          }
          .${componentId} .logo-cube-inner { gap: 1.25rem; }
        }
        
        /* Mobile styles (max 480px) */
        @media (max-width: 480px) {
          .${componentId} { padding-left: 1rem; padding-right: 1rem; }
          .${componentId}.logo-cube-py { padding-top: ${customSpacing || '12.5vw'}; padding-bottom: ${customSpacing || '12.5vw'}; }
          .${componentId}.logo-cube-pt { padding-top: ${customSpacing || '12.5vw'}; }
          .${componentId}.logo-cube-pb { padding-bottom: ${customSpacing || '12.5vw'}; }
          
          .${componentId} .logo-cube-card {
            max-width: 100%;
            padding: 2.8125rem 1.8125rem 4.1875rem;
            border-radius: 1.6875rem;
          }
          .${componentId} .logo-cube-inner { gap: 2.25rem; }
          .${componentId} .logo-cube-logo { width: 14rem; height: 7rem; }
        }
      `}</style>

      <section
        {...storyblokEditable(blok)}
        aria-label="Trusted by leading companies"
        className={`${componentId} ${paddingClass}`}
        style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="logo-cube-card" style={{ overflow: 'hidden', width: '100%' }}>
          <div
            className="logo-cube-inner"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* Title Container */}
            {blok.header && (
              <header style={{ width: '100%', textAlign: 'center' }}>
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
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                overflow: 'hidden',
                listStyle: 'none',
                gap: '1.25rem',
                justifyContent: shouldCenter ? 'center' : 'flex-start',
                margin: 0,
                padding: 0,
              }}
            >
              {logosToDisplay.map((logo, index) => (
                <li
                  key={logo.filename || logo.alt || index}
                  className="cubeLogos"
                  role="listitem"
                  style={{ flexShrink: 0, listStyle: 'none' }}
                >
                  <Image
                    alt={logo.alt || 'Company logo'}
                    className="logo-cube-logo"
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
