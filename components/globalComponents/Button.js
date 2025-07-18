'use client';
import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAvailableThemes } from '@/context/ThemeContext';
import text from '@/styles/text';
import LinkArrowSVG from '@/assets/svg/LinkArrow.svg';
import media from '@/styles/media';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getStoryblokApi } from '@/lib/storyblok';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const Button = ({ $buttonData, stretch }) => {
  const themes = useAvailableThemes();
  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  const selectedTheme =
    themes.button?.[$buttonData?.theme] || themes.button.primary;

  const isEmail = $buttonData?.link_url?.email;
  const rawHref = isEmail
    ? `mailto:${$buttonData?.link_url.email}`
    : $buttonData?.link_url?.cached_url || '#';

  const target = $buttonData?.link_url?.target;
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  const isExternal = rawHref.startsWith('http');
  const alreadyLocalized =
    rawHref.startsWith('/de') ||
    rawHref.startsWith('/fr') ||
    rawHref.startsWith('/en');

  const slugParts = pathname.split('/').filter(Boolean);
  const currentLocale = ['de', 'fr'].includes(slugParts[0])
    ? slugParts[0]
    : null;

  let normalizedUrl =
    isEmail || isExternal || alreadyLocalized
      ? rawHref
      : `/${currentLocale ?? ''}/${rawHref}`.replace(/\/+/g, '/');

  // Check if page exists in Storyblok and fallback to English if needed
  const checkPageExistsAndNavigate = async (e) => {
    // If it's an external link, email, or anchor link, proceed normally
    if (isExternal || isEmail || $buttonData?.link_url?.anchor) {
      return; // Let the normal click handler proceed
    }

    // Only check for internal links that aren't already localized
    if (!alreadyLocalized && currentLocale && currentLocale !== 'en') {
      e.preventDefault();

      try {
        const storyblokApi = getStoryblokApi();
        const storySlug = rawHref === '/' ? 'home' : rawHref.replace(/^\//, '');

        // First try to get the page in the current locale
        const { data } = await storyblokApi.get(`cdn/stories/${storySlug}`, {
          version: 'published',
          language: currentLocale,
        });

        if (data.story) {
          // Page exists in current locale, navigate normally
          router.push(normalizedUrl);
        } else {
          // Page doesn't exist in current locale, fallback to English
          const englishUrl = `/${rawHref}`.replace(/\/+/g, '/');
          router.push(englishUrl);
        }
      } catch (error) {
        console.error('Error checking page existence:', error);
        // If there's an error, fallback to English
        const englishUrl = `/${rawHref}`.replace(/\/+/g, '/');
        router.push(englishUrl);
      }
    }
  };

  // Handle anchor scrolling with GSAP
  const handleClick = (e) => {
    if ($buttonData?.link_url?.anchor) {
      // First try to find by ID
      let anchorElement = document.getElementById($buttonData.link_url.anchor);

      // If not found by ID, try to find by data-anchor-id attribute
      if (!anchorElement) {
        anchorElement = document.querySelector(
          `[data-anchor-id="${$buttonData.link_url.anchor}"]`
        );
      }

      if (anchorElement) {
        // Only prevent default if we found the element and can scroll to it
        e.preventDefault();

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: anchorElement,
            offsetY: 200,
            center: true,
          },
          ease: 'power2.out',
        });
      }
    }
  };

  // Add anchor to URL if it exists
  if ($buttonData?.link_url?.anchor) {
    normalizedUrl += `#${$buttonData.link_url.anchor}`;
  }

  // Combined click handler
  const handleButtonClick = async (e) => {
    // Handle anchor scrolling first
    handleClick(e);

    // Then check page existence if needed
    await checkPageExistsAndNavigate(e);
  };

  return (
    <ButtonWrapper layout={$buttonData?.layout} size={$buttonData?.link_size}>
      <ThemeProvider theme={selectedTheme}>
        {target !== '_blank' ? (
          <NextLink href={normalizedUrl} passHref onClick={handleButtonClick}>
            <StyledSpan stretch={stretch}>{$buttonData?.link_text}</StyledSpan>
            {$buttonData?.theme.includes('link') && <StyledLinkArrow />}
          </NextLink>
        ) : (
          <StyledLink
            href={normalizedUrl}
            target={target}
            rel={rel}
            onClick={handleButtonClick}
          >
            {$buttonData?.link_text}
            {$buttonData?.theme.includes('link') && <StyledLinkArrow />}
          </StyledLink>
        )}
      </ThemeProvider>
    </ButtonWrapper>
  );
};

export default Button;

// Styled Components
const NextLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const StyledLinkArrow = styled(LinkArrowSVG)`
  width: 0.5vw;
  height: 0.5vw;

  ${media.fullWidth} {
    width: 8px;
    height: 8px;
  }

  ${media.tablet} {
    width: 0.781vw;
    height: 0.781vw;
  }

  ${media.mobile} {
    width: 1.667vw;
    height: 1.667vw;
  }

  path {
    fill: ${(props) => props.theme.textColor};
  }
`;

const StyledSpan = styled.p`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  min-width: ${(props) => (props.stretch ? '100%' : 'auto')};
  width: auto;
  gap: 0.5vw;
  padding: ${(props) => props.theme.padding};
  background: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.textColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    background: ${(props) => props.theme.hoverBgColor};
    color: ${(props) => props.theme.hoverTextColor};
    border: 1px solid ${(props) => props.theme.border};
  }
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: auto;
  gap: 0.5vw;
  padding: ${(props) => props.theme.padding};
  background: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.textColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    background: ${(props) => props.theme.hoverBgColor};
    color: ${(props) => props.theme.hoverTextColor};
    border: 1px solid ${(props) => props.theme.border};
  }

  a:visited {
    color: inherit;
    text-decoration: none;
  }

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.layout || 'row'};
  gap: 1.5vw;

  ${(props) =>
    props.size === 'small'
      ? text.bodySm
      : props.size === 'large'
      ? text.bodyLg
      : props.size === 'tiny'
      ? text.tagLight
      : text.bodyMd};

  width: max-content;
`;
