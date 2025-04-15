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

  const getLocaleFromPath = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
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

  return (
    <>
      {configData && (
        <NavWrapper>
          <Nav blok={configData.nav?.[0]} />
        </NavWrapper>
      )}

      {configData && (
        <MobileNavWrapper>
          <MobileNav blok={configData.nav?.[0]} />
        </MobileNavWrapper>
      )}

      <ChildrenVisibilityWrapper $visible={!!configData}>
        {children}
      </ChildrenVisibilityWrapper>

      {configData && <Footer blok={configData.footer?.[0]} />}
    </>
  );
};

const ChildrenVisibilityWrapper = styled.div`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

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
