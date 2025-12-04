'use client';

import React, { useEffect, useState } from 'react';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import PaginatedCards_tw from './PaginatedCards_tw';
import { usePathname } from 'next/navigation';

const ResourceCards_tw = ({ blok }) => {
  const [resources, setResources] = useState([]);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const pathname = usePathname();

  // Get current locale from pathname
  const getCurrentLocale = () => {
    const parts = pathname?.split('/');
    const localeCandidate = parts[1];
    const supportedLocales = ['en', 'de', 'fr'];
    return supportedLocales.includes(localeCandidate) ? localeCandidate : 'en';
  };

  useEffect(() => {
    const fetchAllResources = async () => {
      const storyblokApi = getStoryblokApi();
      const currentLocale = getCurrentLocale();
      const perPage = 100;
      let page = 1;
      let allResources = [];
      let keepFetching = true;

      while (keepFetching) {
        const { data } = await storyblokApi.get('cdn/stories', {
          version: 'published',
          starts_with: 'resources/',
          is_startpage: false,
          per_page: perPage,
          page,
          language: currentLocale,
        });

        allResources = [...allResources, ...data.stories];

        // If we received fewer than perPage, we're on the last page
        if (data.stories.length < perPage) {
          keepFetching = false;
        } else {
          page++;
        }
      }

      setResources(allResources);
      // console.log('Fetched ALL resources:', allResources.length);
    };

    fetchAllResources();
  }, [pathname]); // Add pathname as dependency to refetch when language changes

  return (
    <div className="flex flex-col flex-wrap gap-4" {...storyblokEditable(blok)}>
      {resources.length > 0 && (
        <PaginatedCards_tw
          blok={{ ...blok, cards: resources, card_type: 'resource' }}
        />
      )}
    </div>
  );
};

export default ResourceCards_tw;

