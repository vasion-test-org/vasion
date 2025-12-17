'use client';
import React from 'react';
import styled from 'styled-components';
import media from 'styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import SpotifyIcon from '@/assets/svg/pod-spotify.svg';
import ApplePodcastsIcon from '@/assets/svg/pod-apple.svg';
import YoutubeIcon from '@/assets/svg/pod-youtube.svg';
import RssIcon from '@/assets/svg/pod-rss.svg';

const PodcastSidebar = ({
  image,
  title,
  body,
  spotifyUrl,
  applePodcastsUrl,
  youtubeUrl,
  rssUrl,
  imageAlt = 'Podcast cover image',
}) => {
  const socialLinks = [
    { icon: SpotifyIcon, url: spotifyUrl, label: 'Listen on Spotify' },
    {
      icon: ApplePodcastsIcon,
      url: applePodcastsUrl,
      label: 'Listen on Apple Podcasts',
    },
    { icon: YoutubeIcon, url: youtubeUrl, label: 'Watch on YouTube' },
    { icon: RssIcon, url: rssUrl, label: 'RSS Feed' },
  ].filter((link) => link.url);

  return (
    <Wrapper>
      {image && (
        <ImageContainer>
          <PodcastImage src={image} alt={imageAlt} />
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
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
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
