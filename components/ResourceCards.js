'use client';

import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { getStoryblokApi, storyblokEditable } from '@storyblok/react/rsc';
import Card from '@/components/globalComponents/Card';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const ResourceCards = ({ blok }) => {
  const [resources, setResources] = useState([]);
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  // useEffect(() => {
  //   const fetchResources = async () => {
  //     const storyblokApi = getStoryblokApi();
  //     const { data } = await storyblokApi.get('cdn/stories', {
  //       version: 'draft', // or 'published'
  //       starts_with: 'resources/',
  //       is_startpage: false,
  //     });
  //     setResources(data.stories);
  //     console.log(data.stories)
  //   };

  //   fetchResources();
  // }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Container {...storyblokEditable(blok)}>
        {/* {resources.map((resource) => (
          <Card
            key={resource.uuid}
            title={resource.content.title}
            description={resource.content.description}
            image={resource.content.image?.filename}
            // Add other props as required by your Card component
          />
        ))} */}
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
