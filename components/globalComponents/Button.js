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

  // Handle navigation with Storyblok page existence check
  const handleNavigate = (e) => {
    // Handle anchor scrolling first
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
        return;
      }
    }

    // If it's an external link or email, let default navigation happen
    if (isExternal || isEmail) {
      return;
    }

    // For internal links, check if the page exists in Storyblok
    e.preventDefault();

    // Call async function for internal links only
    checkStoryblokAndNavigate();
  };

  // Separate async function for Storyblok checking
  const checkStoryblokAndNavigate = async () => {
    try {
      const storyblokApi = getStoryblokApi();

      // Extract the story slug from the URL
      const urlParts = rawHref.split('/').filter(Boolean);
      const storySlug = urlParts.length > 0 ? urlParts.join('/') : 'home';

      // Check if the page exists in the current locale
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
      // Error occurred, fallback to English
      console.warn('Storyblok API error, falling back to English:', error);
      const englishUrl = `/${rawHref}`.replace(/\/+/g, '/');
      router.push(englishUrl);
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
          <NextLink href={normalizedUrl} passHref onClick={handleNavigate}>
            <StyledSpan stretch={stretch}>{$buttonData?.link_text}</StyledSpan>
            {$buttonData?.theme.includes('link') && <StyledLinkArrow />}
          </NextLink>
        ) : (
          <StyledLink
            href={normalizedUrl}
            target={target}
            rel={rel}
            onClick={handleNavigate}
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
