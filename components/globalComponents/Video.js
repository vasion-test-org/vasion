'use client';
import React from 'react';
import CookieConsentVideo from '@/components/CookieConsentVideo';
import styled from 'styled-components';
import media from '@/styles/media';
import useMedia from '@/functions/useMedia';

const Video = ({
  videos,
  borderradius,
  filename,
  thumbnails,
  isSideBySideVideo = false,
  width,
  height,
}) => {
  let videoSrc = filename
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
      videos={videos}
      borderradius={borderradius}
      filename={filename}
      thumbnails={thumbnails}
      isSideBySideVideo={isSideBySideVideo}
      url={videoSrc}
      width={width || '100%'}
      height={height || '100%'}
      controls={true}
      light={thumbnails?.[0]?.filename}
      playsinline={true}
    />
  );
};


export default Video;
