'use client';
import React from 'react';

import styled from 'styled-components';

import media from '@/styles/media';

// Helper function to extract attribute value from HTML string using regex
const extractAttribute = (html, attr) => {
  // Match both single and double quotes, and handle attributes without quotes
  const regex = new RegExp(`${attr}=["']([^"']*)["']|${attr}=([^\\s>]+)`, 'i');
  const match = html.match(regex);
  return match ? match[1] || match[2] : null;
};

const SpotifyEmbed = ({ blok }) => {
  // Extract iframe HTML from blok data
  const iframeHtml = blok || '';

  // Check if the HTML contains an iframe
  if (!iframeHtml || !iframeHtml.includes('<iframe')) {
    return null;
  }

  // Extract the src attribute using regex (works on both server and client)
  const src = extractAttribute(iframeHtml, 'src');

  if (!src) {
    return null;
  }

  const width = extractAttribute(iframeHtml, 'width') || '624';
  const height = extractAttribute(iframeHtml, 'height') || '351';
  const allow =
    extractAttribute(iframeHtml, 'allow') ||
    'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  const loading = extractAttribute(iframeHtml, 'loading') || 'lazy';

  return (
    <Wrapper>
      <EmbedContainer>
        <StyledIframe
          allowFullScreen
          allow={allow}
          frameBorder="0"
          height={height}
          loading={loading}
          src={src}
          width={width}
        />
      </EmbedContainer>
    </Wrapper>
  );
};

export default SpotifyEmbed;

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 3.75vw 0;

  ${media.fullWidth} {
    padding: 60px 0;
  }

  ${media.tablet} {
    padding: 5.859vw 0;
  }

  ${media.mobile} {
    padding: 12.5vw 0;
  }
`;

const EmbedContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 352px;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  ${media.tablet} {
    max-width: 87.891vw;
    height: 49.5vw;
  }

  ${media.mobile} {
    max-width: 90vw;
    height: 50.6vw;
  }

  ${media.fullWidth} {
    max-width: 624px;
    height: 352px;
  }
`;
