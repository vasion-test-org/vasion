'use client';

import React, { useEffect, useState } from 'react';

import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import ReactPlayer from 'react-player'; // Change back to generic import
import Button from '@/components/globalComponents/Button';
import useMedia from '@/functions/useMedia';
import { horizontalLoop } from '@/functions/horizontalLoop';
import { useAvailableThemes } from '@/context/ThemeContext';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import getMedia from '@/functions/getMedia';
import RichTextRenderer from './renderers/RichTextRenderer';
import { storyblokEditable } from '@storyblok/react/rsc';

gsap.registerPlugin(ScrollToPlugin);

const VideoCarousel = ({ blok }) => {
  // Add this simple test at the very top
  console.log('🚀 VideoCarousel component is loading!');
  console.log('🚀 VideoCarousel blok:', blok);
  
  // Add this debugging at the top
  console.log('=== VideoCarousel Debug ===');
  console.log('Full blok object:', blok);
  console.log('Videos array:', blok.videos);
  console.log('Number of videos:', blok.videos?.length);
  
  // Debug the first video's structure
  if (blok.videos && blok.videos.length > 0) {
    console.log('First video structure:', blok.videos[0]);
    console.log('First video keys:', Object.keys(blok.videos[0]));
    
    // Check different possible paths
    console.log('video.video.filename:', blok.videos[0]?.video?.filename);
    console.log('video.asset[0].media[0].filename:', blok.videos[0]?.asset?.[0]?.media?.[0]?.filename);
    console.log('video.media[0].filename:', blok.videos[0]?.media?.[0]?.filename);
  }
  
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const videoWidth = useMedia('100%', '100%', '100%', '83.645vw');
  const videoHeight = useMedia('317px', '22.014vw', '30.957vw', '74.065vw');
  const loopPadding = getMedia('410', '410', '480', '800');
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalActive, setModalActive] = useState(null);
  const [modalActiveClick, setModalActiveClick] = useState(false);

  const allVideos = blok.videos.map((video, index) => {
    const isActive = index === activeIndex;
    
    // Fix YouTube detection for main videos too
    const videoUrl = video?.video?.filename;
    const hasYouTube = /youtube|youtu\.be/.test(videoUrl);
    
    // Debug main videos too
    console.log(`=== Main Video ${index} Debug ===`);
    console.log('Main video URL:', videoUrl);
    console.log('Is YouTube:', hasYouTube);
    console.log('Main video filename:', video?.video?.filename);
    console.log('Thumbnail sourceUrl:', video?.thumbnail?.sourceUrl);
    console.log('Thumbnail filename:', video?.thumbnail?.filename);

    return (
      <VideoContainer className={`videos`} id={`video-${index}`} key={index}>
        <VideoCover
          id={`videocover-${index}`}
          height={videoHeight}
          coverimage={video?.thumbnail?.sourceUrl}
        >
          <VideoPlayButton src='/images/uiElements/PlayButton.webp' />
        </VideoCover>
        <Video>
          <ReactPlayer
            loop
            url={video?.video.filename}
            light={!isActive && video?.thumbnail?.filename}
            playIcon={<></>}
            playing={true}
            volume={1}
            muted={true}
            controls={false}
            playsinline
            width={videoWidth}
            height={videoHeight}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                  controls: 0,
                  modestbranding: 1,
                  autoplay: 1,
                  mute: 1,
                },
              },
            }}
            onError={(error) => {
              console.error('Main video error:', error);
            }}
            onReady={() => {
              console.log('Main video ready');
            }}
          />
        </Video>
        <ContentContainer>
          {video.header && <RichTextRenderer document={video.header} />}
          {video.body_copy && <RichTextRenderer document={video.body_copy} />}
          {/* <Button>Watch Video</Button> */}
        </ContentContainer>
      </VideoContainer>
    );
  });

  const popups = blok.videos.map((video, index) => {
    const isModalActive = index === modalActive;
    
    // Fix YouTube detection - check the actual video URL
    const videoUrl = video?.video?.filename;
    const hasYouTube = /youtube|youtu\.be/.test(videoUrl);
    
    console.log(`=== Video ${index} Debug ===`);
    console.log('Video URL:', videoUrl);
    console.log('Is YouTube:', hasYouTube);
    
    // Check if URL is valid
    if (!video?.video?.filename) {
      console.error(`Video ${index} has no filename!`);
      return (
        <VideoModal
          className={`video-popup`}
          id={`popup-${index}`}
          key={index}
          onClick={() => setModalActiveClick(true)}
        >
          <PopupVideo>
            <div style={{padding: '20px', textAlign: 'center', color: 'white', backgroundColor: 'red'}}>
              ERROR: No video URL for video {index}
            </div>
          </PopupVideo>
        </VideoModal>
      );
    }

    return (
      <VideoModal
        className={`video-popup`}
        id={`popup-${index}`}
        key={index}
        onClick={() => setModalActiveClick(true)}
      >
        <PopupVideo>
          <ReactPlayer
            url={video?.video.filename}
            controls={true}
            playing={isModalActive}
            muted={!isModalActive && modalActiveClick}
            width={getMedia(800, 800, 700, 325)}
            height={getMedia(400, 400, 400, 250)}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                  controls: 1,
                  modestbranding: 1,
                },
              },
            }}
            onError={(error) => {
              console.error('Modal video error:', error);
            }}
            onReady={() => {
              console.log('Modal video ready');
            }}
            onLoadStart={() => {
              console.log('Video loading started:', video?.video.filename);
            }}
            onBuffer={() => {
              console.log('Video buffering:', video?.video.filename);
            }}
            onProgress={(state) => {
              console.log('Video progress:', state);
            }}
            onDuration={(duration) => {
              console.log('Video duration:', duration);
            }}
            fallback={<div style={{padding: '20px', textAlign: 'center', color: 'white'}}>Video failed to load</div>}
          />
        </PopupVideo>
      </VideoModal>
    );
  });

  useEffect(() => {
    const videoArray = gsap.utils.toArray('.videos');
    const popups = gsap.utils.toArray('.video-popup');
    const body = document.body;
    let activeElement;

    const loop = horizontalLoop(videoArray, {
      deep: false,
      paused: true,
      paddingRight: loopPadding,
      center: true,
      onChange: (element, index) => {
        activeElement && activeElement.classList.remove('active');
        element.classList.add('active');
        activeElement = element;
        setActiveIndex(index);
      },
    });

    const modalTl = gsap.timeline({});
    const closeTl = gsap.timeline({});

    popups.forEach((popup, index) => {
      popup.addEventListener('click', () => {
        closeTl
          .call(setModalActive(null))
          .to(`#popup-${index}`, { autoAlpha: 0 })
          .set(`#popup-${index}`, { 'z-index': -5 })
          .set(body, { overflow: 'auto' });
      });
    });

    videoArray.forEach((video, index) => {
      video.addEventListener('click', () =>
        modalTl
          .to(window, {
            duration: 0.25,
            scrollTo: {
              y: `#popup-${index}`,
              offsetY: -25,
            },
          })
          .call(setModalActive(index))
          .set(`#popup-${index}`, { 'z-index': 10000 })
          .to(`#popup-${index}`, { autoAlpha: 1 })
          .set(body, { overflow: 'hidden' }, '+=.25')
      );
    });

    document
      .querySelector('#video-prev')
      .addEventListener('click', () =>
        loop.previous({ duration: 0.4, ease: 'power1.inOut' })
      );
    document
      .querySelector('#video-next')
      .addEventListener('click', () =>
        loop.next({ duration: 0.4, ease: 'power1.inOut' })
      );
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper
        spacingOffset={blok.offset_spacing}
        spacing={blok.section_spacing}
        // Add this style to make it visible
        style={{border: '5px solid red', backgroundColor: 'yellow'}}
        // {...storyblokEditable(blok)}
      >
        {/* Add this debug div */}
        <div style={{padding: '20px', backgroundColor: 'red', color: 'white', fontSize: '20px'}}>
          🚀 VideoCarousel is rendering! Videos: {blok.videos?.length || 0}
        </div>
        
        <IntroDiv>
          {blok.header && <RichTextRenderer document={blok.header} />}
          {blok.intro_copy && <RichTextRenderer document={blok.intro_copy} />}
        </IntroDiv>
        <VideoCarouselContainer>{allVideos}</VideoCarouselContainer>
        {popups}
        <ButtonContainer>
          <PrevButton id='video-prev'>Previous</PrevButton>
          <NextButton id='video-next'>Next</NextButton>
        </ButtonContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

const PopupVideo = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 0.556vw;

  ${media.fullWidth} {
    border-radius: 8px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    border-radius: 1.402vw;
  }
`;
const VideoModal = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  width: 100vw;
  height: 105vh;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  z-index: -5;

  ${media.tablet} {
    width: 100vw;
    height: 100vh;
  }

  ${media.mobile} {
    width: 100vw;
    height: 100vh;
  }
`;
const VideoPlayButton = styled.img`
  width: 4.167vw;
  height: 4.167vw;

  ${media.fullWidth} {
    width: 60px;
    height: 60px;
  }

  ${media.tablet} {
    width: 5.859vw;
    height: 5.859vw;
  }

  ${media.mobile} {
    width: 14.019vw;
    height: 14.019vw;
  }
`;
const VideoCover = styled.div`
  position: absolute;
  display: flex;
  align-items: end;
  height: ${(props) => props.height};
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  width: 100%;
  z-index: 2;
  padding: 0.972vw 1.319vw;
  border-radius: 0.556vw;

  ${media.fullWidth} {
    padding: 14px 19px;
    border-radius: 8px;
  }

  ${media.tablet} {
    padding: 1.367vw 1.855vw;
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    padding: 4.206vw;
    border-radius: 1.402vw;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${(props) => `url(${props.coverimage})`};
    background-size: cover;
    background-position: center;
    z-index: 2;
  }
`;
const Video = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 0.556vw;

  ${media.fullWidth} {
    border-radius: 8px;
  }

  ${media.tablet} {
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    border-radius: 1.402vw;
  }
`;
const PrevButton = styled.button`
  ${text.bodySm};
  padding: 0.833vw 1.111vw;

  ${media.fullWidth} {
    padding: 12px 16px;
  }

  ${media.tablet} {
    padding: 1.172vw 1.563vw;
  }

  ${media.mobile} {
    padding: 3.738vw 3.972vw;
  }

  &:hover {
    background-color: ${colors.grey100};
  }
`;
const NextButton = styled.button`
  ${text.bodySm};
  border-left: 0.069vw solid ${colors.grey500};
  padding: 0.833vw 1.111vw;

  ${media.fullWidth} {
    border-left: 1px solid ${colors.grey500};
    padding: 12px 16px;
  }

  ${media.tablet} {
    border-left: 0.098vw solid ${colors.grey500};
    padding: 1.172vw 1.563vw;
  }

  ${media.mobile} {
    border-left: 0.234vw solid ${colors.grey500};
    padding: 3.738vw 3.972vw;
  }

  &:hover {
    background-color: ${colors.grey100};
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: max-content;
  overflow: hidden;
  border: 0.069vw solid ${colors.grey500};
  border-radius: 0.556vw;

  ${media.fullWidth} {
    border: 1px solid ${colors.grey500};
    border-radius: 8px;
  }

  ${media.tablet} {
    border: 0.098vw solid ${colors.grey500};
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    border: 0.234vw solid ${colors.grey500};
    border-radius: 1.402vw;
  }
`;
const BodyCopy = styled.p`
  ${text.bodySmBold};
  color: ${colors.grey500};
  margin-bottom: 2.778vw;

  ${media.fullWidth} {
    margin-bottom: 40px;
  }

  ${media.tablet} {
    margin-bottom: 3.906vw;
  }

  ${media.mobile} {
    margin-bottom: 4.673vw;
  }
`;
const VideoHeader = styled.p`
  ${text.bodyLgBold};
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.833vw;

  ${media.fullWidth} {
    gap: 12px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    gap: 2.804vw;
  }
`;
const VideoContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: auto;
  position: relative;
  opacity: 0.5;
  gap: 2.222vw;
  min-width: 46.944vw;
  left: -25vw;

  ${media.fullWidth} {
    gap: 32px;
    min-width: 676px;
    left: -260px;
  }

  ${media.tablet} {
    gap: 3.125vw;
    min-width: 66.016vw;
    left: -53.418vw;
  }

  ${media.mobile} {
    gap: 7.477vw;
    min-width: 83.645vw;
    left: -86.748vw;
  }

  &.active {
    opacity: 1;
  }
`;

const VideoCarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  gap: 3.472vw;

  ${media.fullWidth} {
    width: 1600px;
    gap: 50px;
  }

  ${media.tablet} {
    gap: 4.883vw;
  }

  ${media.mobile} {
    gap: 11.682vw;
  }
`;
const IntroCopy = styled.div`
  ${text.bodySmBold};
`;
const Header = styled.h3`
  ${text.h3};
`;
const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.042vw;

  ${media.fullWidth} {
    gap: 15px;
  }

  ${media.tablet} {
    gap: 1.465vw;
  }

  ${media.mobile} {
    gap: 3.505vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  gap: 4.167vw;
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
        ? `${props.spacing}px 0 0`
        : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
        ? `0 0 ${props.spacing}px`
        : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
      ? `${props.spacing}px 0`
      : '3.75vw 0';
  }};

  ${media.fullWidth} {
    width: 100vw;
    gap: 60px;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '60px 0';
    }};
  }

  ${media.tablet} {
    gap: 5.859vw;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '5.859vw 0';
    }};
  }

  ${media.mobile} {
    gap: 14.019vw;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
          ? `${props.spacing}px 0 0`
          : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
        ? `${props.spacing}px 0`
        : '12.5vw 0';
    }};
  }
`;

export default VideoCarousel;
