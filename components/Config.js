'use client';

import React, { useEffect, useState } from 'react';
import Footer from './globalComponents/Footer';
import Nav from './globalComponents/Nav';
import MobileNav from './globalComponents/MobileNav';
import styled from 'styled-components';
import media from '@/styles/media';
import { usePathname } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';
import { usePageData } from '@/context/PageDataContext';

const Config = ({ blok, children }) => {
  const pathname = usePathname();
  const [configData, setConfigData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { pageData } = usePageData();

  // Cache setup
  const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
  const getCacheKey = (locale) => `vasion:nav-config:${locale}`;

  const getLocaleFromPath = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };



  useEffect(() => {
    const fetchConfig = async () => {
      setIsLoading(true);
      const locale = getLocaleFromPath();

      // Try cached config for this locale first (for instant render on subsequent visits)
      try {
        if (typeof window !== 'undefined') {
          const cachedRaw = window.localStorage.getItem(getCacheKey(locale));
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            if (
              cached?.data &&
              Date.now() - (cached.timestamp || 0) < CACHE_TTL_MS
            ) {
              setConfigData(cached.data);
              setIsLoading(false);
            }
          }
        }
      } catch (e) {
        // ignore cache errors
      }

      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get('cdn/stories/config', {
          version: 'published',
          language: locale,
        });
        setConfigData(data?.story?.content ?? null);
        // Update cache
        try {
          if (typeof window !== 'undefined' && data?.story?.content) {
            window.localStorage.setItem(
              getCacheKey(locale),
              JSON.stringify({
                timestamp: Date.now(),
                data: data.story.content,
              })
            );
          }
        } catch (e) {
          // ignore cache set errors
        }
      } catch (error) {
        console.error('Failed to fetch config:', error);
        // If no cache was available, keep configData as-is (possibly null)
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [pathname]);

  const shouldHideNav = pageData?.content?.hide_nav === true;
  const shouldHideFooter = pageData?.content?.hide_footer === true;

  // Show nav only when config is available (cached or fetched) and not explicitly hidden
  const shouldShowNav = !shouldHideNav && !!configData;

  return (
    <>
      {shouldShowNav && (
        <NavWrapper>
          <Nav blok={configData?.nav?.[0]} />
        </NavWrapper>
      )}

      {shouldShowNav && (
        <MobileNavWrapper>
          <MobileNav blok={configData?.nav?.[0]} />
        </MobileNavWrapper>
      )}

      {/* <ChildrenVisibilityWrapper $visible={!!configData || !isLoading}> */}
      {children}
      {/* </ChildrenVisibilityWrapper> */}

      {configData && !shouldHideFooter && (
        <Footer blok={configData.footer?.[0]} />
      )}
    </>
  );
};

// const ChildrenVisibilityWrapper = styled.div`
//   visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
// `;

const NavWrapper = styled.div`
  display: block;
  ${media.mobile} {
    display: none;
  }

  @media print {
    display: none;
  }
`;

const MobileNavWrapper = styled.div`
  display: none;
  ${media.mobile} {
    display: block;
  }

  @media print {
    display: none;
  }
`;

export default Config;
