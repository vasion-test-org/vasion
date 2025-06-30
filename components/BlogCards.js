'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import Card from '@/components/globalComponents/Card';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import PaginatedCards from './PaginatedCards';
import { usePathname } from 'next/navigation';

const BlogCards = ({ blok }) => {
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
      // console.log('Fetched ALL blogs:', allBlogs.length);
    };

    fetchAllBlogs();
  }, [pathname]); // Add pathname as dependency to refetch when language changes

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container {...storyblokEditable(blok)}>
        {blogs.length > 0 && (
          <PaginatedCards
            blok={{ ...blok, cards: blogs, card_type: 'resource' }}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default BlogCards;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
