'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import Card from '@/components/globalComponents/Card';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import PaginatedCards from './PaginatedCards';

const ResourceCards = ({ blok }) => {
  const [resources, setResources] = useState([]);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  useEffect(() => {
    const fetchAllResources = async () => {
      const storyblokApi = getStoryblokApi();
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
        });
  
        allResources = [...allResources, ...data.stories];
  
        // If we received fewer than perPage, we’re on the last page
        if (data.stories.length < perPage) {
          keepFetching = false;
        } else {
          page++;
        }
      }
  
      setResources(allResources);
      console.log('Fetched ALL resources:', allResources.length);
    };
  
    fetchAllResources();
  }, []);
  

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container {...storyblokEditable(blok)}>
        {resources.length > 0 && (
          <PaginatedCards blok={{ ...blok, cards: resources, card_type: 'resource' }} />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ResourceCards;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
