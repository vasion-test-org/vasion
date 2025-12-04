'use client';

import React, { useEffect, useState } from 'react';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import PaginatedCards_tw from './PaginatedCards_tw';
import { usePathname } from 'next/navigation';

const BlogCards_tw = ({ blok }) => {
  const [blogs, setBlogs] = useState([]);
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
    const fetchAllBlogs = async () => {
      const storyblokApi = getStoryblokApi();
      const currentLocale = getCurrentLocale();
      const perPage = 100;
      let page = 1;
      let allBlogs = [];
      let keepFetching = true;

      while (keepFetching) {
        const { data } = await storyblokApi.get('cdn/stories', {
          version: 'published',
          starts_with: 'blog/',
          is_startpage: false,
          per_page: perPage,
          page,
          language: currentLocale,
        });

        allBlogs = [...allBlogs, ...data.stories];

        // If we received fewer than perPage, we're on the last page
        if (data.stories.length < perPage) {
          keepFetching = false;
        } else {
          page++;
        }
      }

      setBlogs(allBlogs);
      
    };

    fetchAllBlogs();
  }, [pathname]); // Add pathname as dependency to refetch when language changes

  return (
    <div className="flex flex-wrap gap-4" {...storyblokEditable(blok)}>
      {blogs.length > 0 && (
        <PaginatedCards_tw
          blok={{ ...blok, cards: blogs, card_type: 'resource' }}
        />
      )}
    </div>
  );
};

export default BlogCards_tw;

