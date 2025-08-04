'use client';

import React, { useEffect, useState } from 'react';
import Footer from './globalComponents/Footer';
import Nav from './globalComponents/Nav';
import MobileNav from './globalComponents/MobileNav';
import SchemaMarkup from './SchemaMarkup';
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

  const getLocaleFromPath = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };

  // Fallback navigation data for 404 pages or when config fetch fails
  const getFallbackNavData = () => {
    const locale = getLocaleFromPath();
    return {
      nav: [
        {
          banner:
            locale === 'en'
              ? 'Free Trial Available'
              : locale === 'fr'
              ? 'Essai gratuit disponible'
              : 'Kostenlose Testversion verfügbar',
          english_nav_items: [
            {
              tab_name: 'Products',
              tab_columns: [
                {
                  column_header: 'Print Management',
                  nav_items: [
                    {
                      _uid: 'fallback-print',
                      tab_name: 'Print Management',
                      icon: 'Print',
                      item_copy: {
                        type: 'doc',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              { type: 'text', text: 'Print Management' },
                            ],
                          },
                        ],
                      },
                      item_link: { cached_url: '/print/' },
                    },
                  ],
                },
              ],
            },
          ],
          french_nav_items: [
            {
              tab_name: 'Produits',
              tab_columns: [
                {
                  column_header: "Gestion d'impression",
                  nav_items: [
                    {
                      _uid: 'fallback-print-fr',
                      tab_name: "Gestion d'impression",
                      icon: 'Print',
                      item_copy: {
                        type: 'doc',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              { type: 'text', text: "Gestion d'impression" },
                            ],
                          },
                        ],
                      },
                      item_link: { cached_url: '/fr/print/' },
                    },
                  ],
                },
              ],
            },
          ],
          german_nav_items: [
            {
              tab_name: 'Produkte',
              tab_columns: [
                {
                  column_header: 'Druckverwaltung',
                  nav_items: [
                    {
                      _uid: 'fallback-print-de',
                      tab_name: 'Druckverwaltung',
                      icon: 'Print',
                      item_copy: {
                        type: 'doc',
                        content: [
                          {
                            type: 'paragraph',
                            content: [
                              { type: 'text', text: 'Druckverwaltung' },
                            ],
                          },
                        ],
                      },
                      item_link: { cached_url: '/de/print/' },
                    },
                  ],
                },
              ],
            },
          ],
          button: [],
        },
      ],
      footer: [
        {
          // Basic footer structure
        },
      ],
    };
  };

  useEffect(() => {
    const fetchConfig = async () => {
      setIsLoading(true);
      const locale = getLocaleFromPath();

      try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get('cdn/stories/config', {
          version: 'published',
          language: locale,
        });
        setConfigData(data?.story?.content ?? null);
      } catch (error) {
        console.error('Failed to fetch config:', error);
        // Use fallback data when config fetch fails (like on 404 pages)
        setConfigData(getFallbackNavData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [pathname]);

  const shouldHideNav = pageData?.content?.hide_nav === true;
  const shouldHideFooter = pageData?.content?.hide_footer === true;

  // Show navigation even if configData is null (fallback case) but not if explicitly hidden
  const shouldShowNav = !shouldHideNav && (configData || !isLoading);

  return (
    <>
      <SchemaMarkup />
      {shouldShowNav && (
        <NavWrapper>
          <Nav blok={configData?.nav?.[0] || getFallbackNavData().nav[0]} />
        </NavWrapper>
      )}

      {shouldShowNav && (
        <MobileNavWrapper>
          <MobileNav
            blok={configData?.nav?.[0] || getFallbackNavData().nav[0]}
          />
        </MobileNavWrapper>
      )}

      <ChildrenVisibilityWrapper $visible={!!configData || !isLoading}>
        {children}
      </ChildrenVisibilityWrapper>

      {configData && !shouldHideFooter && (
        <Footer blok={configData.footer?.[0]} />
      )}
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
