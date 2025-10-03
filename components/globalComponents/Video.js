'use client';
import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import media from '@/styles/media';
import useMedia from '@/functions/useMedia';

const Video = ({
  videos,
  borderradius,
  filename,
  thumbnails,
  isSideBySideVideo = false,
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
    <VideoWrapper
      borderradius={borderradius}
      isSideBySideVideo={isSideBySideVideo}
    >
      <ReactPlayer
        width='100%'
        height='100%'
        controls={true}
        playsInline={true}
        poster={thumbnails?.[0]?.filename}
        onError={(error) => {
          console.error('Video error:', error);
        }}
        onLoad={() => {
          console.log('Video ready');
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </ReactPlayer>
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  width: ${(props) => (props.isSideBySideVideo ? '32vw' : '67.75vw')};
  height: ${(props) => (props.isSideBySideVideo ? '24vw' : '38vw')};
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;
  ${media.fullWidth} {
    width: ${(props) => (props.isSideBySideVideo ? '512px' : '1084px')};
    height: ${(props) => (props.isSideBySideVideo ? '384px' : '608px')};
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }
  ${media.tablet} {
    width: ${(props) => (props.isSideBySideVideo ? '44.531vw' : '92.188vw')};
    height: ${(props) => (props.isSideBySideVideo ? '33.398vw' : '51.758vw')};
  }
  ${media.mobile} {
    width: 89.167vw;
    height: 50vw;
  }
`;

export default Video;
