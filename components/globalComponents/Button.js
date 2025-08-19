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

  // Function to check if page exists in Storyblok
  const checkPageExists = async (slug, locale) => {
    try {
      const response = await fetch(
        `/api/storyblok-check?slug=${encodeURIComponent(slug)}&locale=${locale}`,
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking page existence:', error);
      return false;
    }
  };

  // Handle anchor scrolling with GSAP
  const handleClick = async (e) => {
    console.log(normalizedUrl);

    // Handle anchor scrolling
    if ($buttonData?.link_url?.anchor) {
      // First try to find by ID
      let anchorElement = document.getElementById($buttonData.link_url.anchor);

      // If not found by ID, try to find by data-anchor-id attribute
      if (!anchorElement) {
        anchorElement = document.querySelector(
          `[data-anchor-id="${$buttonData.link_url.anchor}"]`,
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
        return;
      }
    }

    // Check if this is an internal navigation that needs page existence verification
    if (!isEmail && !isExternal && target !== '_blank') {
      e.preventDefault();

      try {
        // Extract the story slug from the normalized URL
        const urlParts = normalizedUrl.split('/').filter(Boolean);
        const locale = ['de', 'fr'].includes(urlParts[0]) ? urlParts[0] : 'en';
        const storySlug =
          locale === 'en'
            ? urlParts.join('/')
            : urlParts.slice(1).join('/') || 'home';

        // First try to fetch the story in the target locale
        const pageExists = await checkPageExists(storySlug, locale);

        if (pageExists) {
          // Page exists in the target locale, navigate normally
          router.push(normalizedUrl);
        } else {
          // Page doesn't exist in target locale, try English fallback
          if (locale !== 'en') {
            const englishStorySlug = storySlug === 'home' ? 'home' : storySlug;
            const englishPageExists = await checkPageExists(
              englishStorySlug,
              'en',
            );

            if (englishPageExists) {
              // English version exists, navigate to English URL
              const englishUrl = `/${rawHref}`.replace(/\/+/g, '/');
              router.push(englishUrl);
            } else {
              // Neither localized nor English version exists, navigate to 404 or home
              router.push('/');
            }
          } else {
            // Already trying English, page doesn't exist, navigate to home
            router.push('/');
          }
        }
      } catch (error) {
        console.error('Error checking page existence:', error);
        // On error, try to navigate to the original URL
        router.push(normalizedUrl);
      }
    }
  };

  // Add anchor to URL if it exists
  if ($buttonData?.link_url?.anchor) {
    normalizedUrl += `#${$buttonData?.link_url?.anchor}`;
  }

  return (
    <ButtonWrapper
      layout={$buttonData?.layout}
      size={$buttonData?.link_size}
      stretch={stretch}
    >
      <ThemeProvider theme={selectedTheme}>
        {target !== '_blank' ? (
          <NextLink
            href={normalizedUrl}
            passHref
            onClick={handleClick}
            stretch={stretch}
          >
            <StyledSpan stretch={stretch}>{$buttonData?.link_text}</StyledSpan>
            {$buttonData?.theme.includes('link') && <StyledLinkArrow />}
          </NextLink>
        ) : (
          <StyledLink
            href={normalizedUrl}
            target={target}
            rel={rel}
            onClick={handleClick}
            stretch={stretch}
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
  width: ${(props) => (props.stretch ? '100%' : 'auto')};
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
  width: ${(props) => (props.stretch ? '100%' : 'auto')};
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

  width: ${(props) => (props.stretch ? '100%' : 'max-content')};
`;
