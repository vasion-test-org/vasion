'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import Card from '@/components/globalComponents/Card';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import PaginatedCards from './PaginatedCards';

const BlogCards = ({ blok }) => {
  const [blogs, setBlogs] = useState([]);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const storyblokApi = getStoryblokApi();
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
        });
  
        allBlogs = [...allBlogs, ...data.stories];
  
        // If we received fewer than perPage, we’re on the last page
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
  }, []);
  

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container {...storyblokEditable(blok)}>
        {blogs.length > 0 && (
          <PaginatedCards blok={{ ...blok, cards: blogs, card_type: 'resource' }} />
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
