'use client';
import React from 'react';

import styled from 'styled-components';

import CookieConsentVideo from '@/components/CookieConsentVideo';
import useMedia from '@/functions/useMedia';
import media from '@/styles/media';

const Video = ({
  borderradius,
  filename,
  height,
  isSideBySideVideo = false,
  thumbnails,
  videos,
  width,
}) => {
  const videoSrc = filename
    ? filename
    : useMedia(
        videos?.[0]?.filename,
        videos?.[0]?.filename,
        videos?.[1]?.filename || videos?.[0]?.filename,
        videos?.[2]?.filename || videos?.[0]?.filename
      );

  if (!videoSrc) return null;

  return (
    <CookieConsentVideo
      borderradius={borderradius}
      controls={true}
      filename={filename}
      height={height || '100%'}
      isSideBySideVideo={isSideBySideVideo}
      light={thumbnails?.[0]?.filename}
      playsinline={true}
      thumbnails={thumbnails}
      url={videoSrc}
      videos={videos}
      width={width || '100%'}
    />
  );
};

export default Video;
