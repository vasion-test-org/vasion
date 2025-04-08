'use client';

import React, { useEffect, useState } from 'react';
import Footer from './globalComponents/Footer';
import Nav from './globalComponents/Nav';
import MobileNav from './globalComponents/MobileNav';
import styled from 'styled-components';
import media from '@/styles/media';
import { usePathname } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';

const Config = ({ blok, children }) => {
  const pathname = usePathname();
  const [configData, setConfigData] = useState(null);

  // Extract locale from the pathname (e.g., "/de/about" -> "de")
  const getLocaleFromPath = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr']; // Add more if needed
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };

  useEffect(() => {
    const fetchConfig = async () => {
      const locale = getLocaleFromPath();
      const storyblokApi = getStoryblokApi();
      const { data } = await storyblokApi.get('cdn/stories/config', {
        version: 'draft',
        language: locale,
      });
      setConfigData(data?.story?.content ?? null);
    };

    fetchConfig();
  }, [pathname]);

  if (!configData) return null; // or a loading spinner

  return (
    <>
      <NavWrapper>
        <Nav blok={configData.nav?.[0]} />
      </NavWrapper>

      <MobileNavWrapper>
        <MobileNav blok={configData.nav?.[0]} />
      </MobileNavWrapper>

      {children}

      <Footer blok={configData.footer?.[0]} />
    </>
  );
};

const NavWrapper = styled.div`
  display: block;
  ${media.mobile} {
    display: none;
  }
`;

const MobileNavWrapper = styled.div`
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

export default Config;
