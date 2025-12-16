'use client';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { ScreenContext } from '@/components/providers/Screen';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';

const GameEmbed = ({ blok }) => {
  const iframeRef = useRef(null);
  const { mobile, tablet } = useContext(ScreenContext);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleLoad = () => {
      setIframeLoaded(true);
    };

    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      if (iframe.contentWindow) {
        setIframeLoaded(true);
      }
      return () => iframe.removeEventListener('load', handleLoad);
    }
  }, []);

  const sendKeyDown = (key, code, keyCode) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow || !iframeLoaded) return;

    iframe.contentWindow.postMessage(
      {
        type: 'KEY_DOWN',
        key,
        code,
        keyCode,
      },
      '*',
    );
  };

  const sendKeyUp = (key, code, keyCode) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow || !iframeLoaded) return;

    iframe.contentWindow.postMessage(
      {
        type: 'KEY_UP',
        key,
        code,
        keyCode,
      },
      '*',
    );
  };

  const handleKeyDown = (key, code, keyCode) => {
    const keyString = `${key}-${code}-${keyCode}`;

    if (pressedKeys.has(keyString)) return;

    setPressedKeys((prev) => new Set(prev).add(keyString));
    sendKeyDown(key, code, keyCode);
  };

  const handleKeyUp = (key, code, keyCode) => {
    const keyString = `${key}-${code}-${keyCode}`;

    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(keyString);
      return newSet;
    });

    sendKeyUp(key, code, keyCode);
  };

  // For single press keys (space, escape)
  const handleSinglePress = (key, code, keyCode) => {
    sendKeyDown(key, code, keyCode);
    setTimeout(() => {
      sendKeyUp(key, code, keyCode);
    }, 100);
  };

  return (
    <>
      <Wrapper fullwidth={blok.fullwidth}>
        <StyledIframe
          ref={iframeRef}
          data-anchor-id={blok.anchor_id}
          src={blok.embed_link}
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
        />
      </Wrapper>
      {!mobile && !tablet && (
        <DesktopInstructions>
          <InstructionsCard>
            <h2>Game Controls</h2>
            <p>
              Use keyboard arrows <strong>← / →</strong> or{' '}
              <strong>A / D</strong> to move
            </p>
            <p>
              Press <strong>SPACE BAR</strong> to start
            </p>
            <p>
              Pause with <strong>ESC</strong>
            </p>
          </InstructionsCard>
        </DesktopInstructions>
      )}
      {
        <MobileControls>
          <ControlsContainer>
            <StartButton
              onTouchStart={() => handleSinglePress(' ', 'Space', 32)}
              onClick={() => handleSinglePress(' ', 'Space', 32)}
              onTouchEnd={(e) => e.preventDefault()}
            >
              START
            </StartButton>

            <DirectionalRow>
              <ControlButton
                onTouchStart={() => handleKeyDown('ArrowLeft', 'ArrowLeft', 37)}
                onTouchEnd={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
                onMouseDown={() => handleKeyDown('ArrowLeft', 'ArrowLeft', 37)}
                onMouseUp={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
                onMouseLeave={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
              >
                ←
              </ControlButton>
              <ControlButton
                onTouchStart={() =>
                  handleKeyDown('ArrowRight', 'ArrowRight', 39)
                }
                onTouchEnd={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
                onMouseDown={() =>
                  handleKeyDown('ArrowRight', 'ArrowRight', 39)
                }
                onMouseUp={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
                onMouseLeave={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
              >
                →
              </ControlButton>
            </DirectionalRow>

            <PauseButton
              onTouchStart={() => handleSinglePress('Escape', 'Escape', 27)}
              onClick={() => handleSinglePress('Escape', 'Escape', 27)}
              onTouchEnd={(e) => e.preventDefault()}
            >
              PAUSE
            </PauseButton>
          </ControlsContainer>
        </MobileControls>
      }
    </>
  );
};

export default GameEmbed;

const StyledIframe = styled.iframe`
  width: 480px;
  height: 480px;
  border: none;
  overflow: hidden;
  transform: scale(1.8);
  transform-origin: center;

  ${media.fullWidth} {
    transform: scale(2);
  }

  ${media.tablet} {
    transform: scale(1.3);
  }
  ${media.mobile} {
    width: 480px;
    height: 480px;
    transform: scale(0.75);
    transform-origin: top left;

    @media (min-width: 390px) {
      transform: scale(0.819);
    }

    @media (min-width: 412px) {
      transform: scale(0.86);
    }
    /*Above iphone 12 pro*/
    @media (min-width: 430px) {
      transform: scale(0.85);
    }

    @media (min-width: 420px) {
      transform: scale(0.9);
    }

    @media (min-width: 440px) {
      transform: scale(0.91);
    }
  }
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
  background-color: ${(props) =>
    props.fullwidth ? 'rgb(26, 31, 33)' : 'transparent'};
  min-height: 960px;

  ${media.tablet} {
    min-height: 720px;
  }

  ${media.mobile} {
    min-height: 480px;
    height: 480px;
    display: inline-block;
    padding: 0px;
  }
`;

const MobileControls = styled.div`
  position: relative;
  z-index: 100;
  ${media.desktop} {
    display: none;
  }

  ${media.tablet} {
    padding: 4.167vw;
    background: #1b1d21;
    backdrop-filter: blur(10px);
    border-top: 2px solid rgba(255, 255, 255, 0.1);
  }
  ${media.mobile} {
    bottom: 23.167vw;
    padding: 4.167vw;
    background: #1b1d21;
    backdrop-filter: blur(10px);
    border-top: 2px solid rgba(255, 255, 255, 0.1);

    /* Iphone 12 pro*/
    @media (min-width: 390px) {
      bottom: 23.167vw;
    }
    /*Adjustin for larger phones*/

    @media (min-width: 420px) {
      bottom: 21vw;
    }

    @media (min-width: 430px) {
      bottom: 12vw;
    }
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  margin: 0 auto;

  ${media.fullWidth} {
    display: none;
  }
  ${media.tablet} {
    gap: 1.172vw;
  }
  ${media.mobile} {
    gap: 2.5vw;
  }
`;

const ControlButton = styled.button`
  ${text.stat};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.primaryOrange};
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  flex: 1;
  transition: all 0.1s ease;
  &:active {
    background: ${colors.orangeGradient};
    transform: scale(0.95);
  }

  ${media.tablet} {
    padding: 20px 30px;
    color: white;
    border: none;
    border-radius: 12px;
  }
  ${media.mobile} {
    padding: 4.167vw 6.25vw;
    color: white;
    border: none;
    border-radius: 2.5vw;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    flex: 1;
    transition: all 0.1s ease;
  }
`;

const DirectionalRow = styled.div`
  display: flex;
  justify-content: center;
  ${media.tablet} {
    gap: 1.172vw;
  }
  ${media.mobile} {
    gap: 2.5vw;
  }
`;

const StartButton = styled(ControlButton)`
  background: ${colors.purpleGradient};
  display: flex;
  flex-direction: column;
  align-items: center;

  &:active {
    background: ${colors.darkPurple};
  }
  ${media.fullWidth} {
    display: none;
  }
`;

const PauseButton = styled(ControlButton)`
  ${text.stat};
  background: ${colors.darkPurpleGradient};
  display: flex;
  flex-direction: column;
  align-items: center;

  &:active {
    background: ${colors.darkPurple};
  }
`;
const DesktopInstructions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: rgb(26, 31, 33);

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

const InstructionsCard = styled.div`
  background: white;

  text-align: center;
  padding: 2.5vw 3.75vw;
  border-radius: 0.5vw;
  max-width: 31.25vw;
  h2 {
    ${text.h2};
  }

  p {
    ${text.bodyLg};
  }

  strong {
    ${text.bodyLgBold};
    color: ${colors.primaryOrange};
  }

  ${media.fullWidth} {
    padding: 40px 60px;
    border-radius: 8px;
    max-width: 500px;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    display: none;
  }
`;
