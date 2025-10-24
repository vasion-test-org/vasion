'use client';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const SpotifyEmbed = ({ blok }) => {
  // Extract iframe HTML from blok data
  const iframeHtml = blok?.iframe_html || blok?.embed_code || '';

  // Parse the iframe HTML to extract attributes
  const parseIframeAttributes = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const iframe = doc.querySelector('iframe');

    if (!iframe) return null;

    return {
      src: iframe.getAttribute('src'),
      width: iframe.getAttribute('width'),
      height: iframe.getAttribute('height'),
      allowFullScreen: iframe.getAttribute('allowfullscreen'),
      allow: iframe.getAttribute('allow'),
      loading: iframe.getAttribute('loading'),
      style: iframe.getAttribute('style'),
      dataTestId: iframe.getAttribute('data-testid'),
    };
  };

  const iframeAttrs = parseIframeAttributes(iframeHtml);

  if (!iframeAttrs) {
    return null;
  }

  return (
    <Wrapper>
      <EmbedContainer>
        <StyledIframe
          data-testid={iframeAttrs.dataTestId}
          src={iframeAttrs.src}
          width={iframeAttrs.width}
          height={iframeAttrs.height}
          frameBorder="0"
          allowFullScreen={iframeAttrs.allowFullScreen}
          allow={iframeAttrs.allow}
          loading={iframeAttrs.loading}
          data-anchor-id={blok.anchor_id}
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
  justify-content: center;
  padding: 3.75vw;

  ${media.fullWidth} {
    padding: 60px;
  }

  ${media.tablet} {
    padding: 5.859vw;
  }

  ${media.mobile} {
    padding: 12.5vw;
  }
`;

const EmbedContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  max-width: 624px;
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
