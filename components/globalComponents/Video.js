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
  console.log('Video component props:', { videos, filename, thumbnails, isSideBySideVideo });
  
  let videoSrc = filename
    ? filename
    : useMedia(
        videos?.[0]?.filename,
        videos?.[0]?.filename,
        videos?.[1]?.filename || videos?.[0]?.filename,
        videos?.[2]?.filename || videos?.[0]?.filename
      );

  console.log('Video component - videoSrc:', videoSrc);
  console.log('Video component - thumbnails:', thumbnails);

  if (!videoSrc) {
    console.log('Video component - No videoSrc, returning null');
    return <div style={{ padding: '20px', backgroundColor: '#f0f0f0', border: '2px solid red' }}>
      DEBUG: No video source found
    </div>;
  }

  return (
    <VideoWrapper
      borderradius={borderradius}
      isSideBySideVideo={isSideBySideVideo}
    >
      {/* Test with native HTML video first */}
      <video
        src={videoSrc}
        width='100%'
        height='100%'
        controls
        style={{ backgroundColor: '#000' }}
        onError={(e) => {
          console.error('Native video error:', e);
          console.error('Native video URL:', videoSrc);
        }}
        onLoadStart={() => {
          console.log('Native video load started');
        }}
        onLoadedData={() => {
          console.log('Native video loaded');
        }}
      >
        Your browser does not support the video tag.
      </video>
      
      {/* ReactPlayer fallback */}
      <div style={{ display: 'none' }}>
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
            console.error('ReactPlayer error:', error);
            console.error('ReactPlayer URL that failed:', videoSrc);
          }}
          onReady={() => {
            console.log('ReactPlayer ready');
          }}
          onLoadStart={() => {
            console.log('ReactPlayer load started');
          }}
          onLoad={() => {
            console.log('ReactPlayer loaded');
          }}
        />
      </div>
      
      {/* Debug info */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(255,0,0,0.1)', 
        pointerEvents: 'none',
        zIndex: 1,
        fontSize: '12px',
        color: 'white',
        padding: '5px'
      }}>
        DEBUG: {videoSrc ? `URL: ${videoSrc}` : 'No URL'}
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
