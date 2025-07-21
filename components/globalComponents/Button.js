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

// Utility function to check if a page exists in Storyblok
const checkPageExists = async (slug, locale) => {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: 'published',
      language: locale,
    });
    return !!data.story;
  } catch (error) {
    return false;
  }
};

// Utility function to get the story slug from URL
const getStorySlugFromUrl = (url) => {
  if (!url || url === '#') return 'home';

  // Remove leading slash and split
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  const parts = cleanUrl.split('/').filter(Boolean);

  // If it's already localized, remove the locale part
  const supportedLocales = ['en', 'de', 'fr'];
  if (supportedLocales.includes(parts[0])) {
    return parts.slice(1).join('/') || 'home';
  }

  return parts.join('/') || 'home';
};

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

  // Handle navigation with Storyblok page existence check
  const handleNavigation = async (e) => {
    // Handle anchor scrolling first
    if ($buttonData?.link_url?.anchor) {
      let anchorElement = document.getElementById($buttonData.link_url.anchor);
      if (!anchorElement) {
        anchorElement = document.querySelector(
          `[data-anchor-id="${$buttonData.link_url.anchor}"]`
        );
      }
      if (anchorElement) {
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
        return;
      }
    }

    // Skip Storyblok check for external links, emails, or if target is _blank
    if (isEmail || isExternal || target === '_blank') {
      return;
    }

    // For internal navigation, check if page exists
    e.preventDefault();

    const storySlug = getStorySlugFromUrl(rawHref);
    const targetLocale = currentLocale || 'en';

    // First try to check if the page exists in the current locale
    const pageExists = await checkPageExists(storySlug, targetLocale);

    if (pageExists) {
      // Page exists in current locale, navigate normally
      router.push(normalizedUrl);
    } else if (targetLocale !== 'en') {
      // Page doesn't exist in current locale, try English fallback
      const englishExists = await checkPageExists(storySlug, 'en');
      if (englishExists) {
        // Navigate to English version
        const englishUrl = `/${rawHref}`.replace(/\/+/g, '/');
        router.push(englishUrl);
      } else {
        // Neither version exists, navigate anyway (will show 404)
        router.push(normalizedUrl);
      }
    } else {
      // Already trying English version, navigate anyway
      router.push(normalizedUrl);
    }
  };

  // Add anchor to URL if it exists
  if ($buttonData?.link_url?.anchor) {
    normalizedUrl += `#${$buttonData.link_url.anchor}`;
  }

  return (
    <ButtonWrapper layout={$buttonData?.layout} size={$buttonData?.link_size}>
      <ThemeProvider theme={selectedTheme}>
        {target !== '_blank' ? (
          <NextLink href={normalizedUrl} passHref onClick={handleNavigation}>
            <StyledSpan stretch={stretch}>{$buttonData?.link_text}</StyledSpan>
            {$buttonData?.theme.includes('link') && <StyledLinkArrow />}
          </NextLink>
        ) : (
          <StyledLink
            href={normalizedUrl}
            target={target}
            rel={rel}
            onClick={handleNavigation}
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
