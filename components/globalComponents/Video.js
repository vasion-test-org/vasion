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

  console.log('Video component - videoSrc:', videoSrc);
  console.log('Video component - thumbnails:', thumbnails);

  return (
    <VideoWrapper
      borderradius={borderradius}
      isSideBySideVideo={isSideBySideVideo}
    >
      <ReactPlayer
        url={videoSrc}
        width='100%'
        height='100%'
        controls={true}
        playsinline={true}
        fileConfig={{
          attributes: {
            crossOrigin: 'anonymous',
            preload: 'metadata'
          }
        }}
        onError={(error) => {
          console.error('Video error:', error);
          console.error('Video URL that failed:', videoSrc);
        }}
        onReady={() => {
          console.log('Video ready');
        }}
        onLoadStart={() => {
          console.log('Video load started');
        }}
        onLoad={() => {
          console.log('Video loaded');
        }}
      />
      {/* Fallback for debugging */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(255,0,0,0.1)', 
        pointerEvents: 'none',
        zIndex: 1
      }}>
        Debug: {videoSrc ? 'URL exists' : 'No URL'}
      </div>
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  width: ${(props) => (props.isSideBySideVideo ? '32vw' : '67.75vw')};
  height: ${(props) => (props.isSideBySideVideo ? '24vw' : '38vw')};
  min-height: 200px;
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;
  background-color: #000;
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
