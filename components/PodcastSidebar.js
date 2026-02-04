'use client';
import React from 'react';

import styled from 'styled-components';
import media from 'styles/media';

import ApplePodcastsIcon from '@/assets/svg/pod-apple.svg';
import RssIcon from '@/assets/svg/pod-rss.svg';
import SpotifyIcon from '@/assets/svg/pod-spotify.svg';
import YoutubeIcon from '@/assets/svg/pod-youtube.svg';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import text from '@/styles/text';

const PodcastSidebar = ({
  applePodcastsUrl,
  body,
  image,
  imageAlt = 'Podcast cover image',
  rssUrl,
  spotifyUrl,
  title,
  youtubeUrl,
}) => {
  const socialLinks = [
    { icon: SpotifyIcon, label: 'Listen on Spotify', url: spotifyUrl },
    {
      icon: ApplePodcastsIcon,
      label: 'Listen on Apple Podcasts',
      url: applePodcastsUrl,
    },
    { icon: YoutubeIcon, label: 'Watch on YouTube', url: youtubeUrl },
    { icon: RssIcon, label: 'RSS Feed', url: rssUrl },
  ].filter((link) => link.url);

  return (
    <Wrapper>
      {image && (
        <ImageContainer>
          <PodcastImage alt={imageAlt} src={image} />
        </ImageContainer>
      )}

      <TextContainer>
        {title && (
          <Title>
            <RichTextRenderer document={title} />
          </Title>
        )}
        {body && (
          <Body>
            <RichTextRenderer document={body} />
          </Body>
        )}
      </TextContainer>

      {socialLinks.length > 0 && (
        <SubscribeContainer>
          <SubscribeLabel>Subscribe on:</SubscribeLabel>
          <SocialLinksRow>
            {socialLinks.map((link, index) => (
              <SocialIconLink
                aria-label={link.label}
                href={link.url}
                key={index}
                rel="noopener noreferrer"
                target="_blank"
                title={link.label}
              >
                <link.icon />
              </SocialIconLink>
            ))}
          </SocialLinksRow>
        </SubscribeContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  max-width: 240px;
  position: sticky;
  top: 40px;
  align-self: flex-start;
  margin: 100px 0 50px 0;

  ${media.desktop} {
    max-width: 15vw;
    gap: 1.667vw;
    top: 2.778vw;
    margin: 6.25vw 0 3.125vw 0;
  }

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const ImageContainer = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;

  ${media.desktop} {
    width: 15vw;
    height: 16.667vw;
    border-radius: 0.556vw;
  }
`;

const PodcastImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  ${media.desktop} {
    gap: 0.556vw;
  }
`;

const Title = styled.div`
  ${text.h5};
  color: ${colors.txtPrimary};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`;

const Body = styled.div`
  ${text.bodySm};
  color: ${colors.txtPrimary};
  line-height: 1.57;

  p {
    margin: 0;
  }
`;

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  ${media.desktop} {
    gap: 0.833vw;
  }
`;

const SubscribeLabel = styled.span`
  ${text.bodyMdBold};
  color: ${colors.txtPrimary};
`;

const SocialLinksRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;

  ${media.desktop} {
    gap: 0.833vw;
  }
`;

const SocialIconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  svg {
    width: 36px;
    height: 36px;

    ${media.desktop} {
      width: 2.5vw;
      height: 2.5vw;
    }

    rect {
      transition: all 0.2s ease;
    }
  }

  &:hover {
    svg {
      rect {
        fill: ${colors.primaryOrange};
      }

      path {
        fill: ${colors.white};
      }
    }
  }
`;

export default PodcastSidebar;
