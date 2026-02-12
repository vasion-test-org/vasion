'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { ScreenContext } from '@/components/providers/Screen';
import colors from '@/styles/colors';
import media from '@/styles/media';
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
        code,
        key,
        keyCode,
        type: 'KEY_DOWN',
      },
      '*'
    );
  };

  const sendKeyUp = (key, code, keyCode) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow || !iframeLoaded) return;

    iframe.contentWindow.postMessage(
      {
        code,
        key,
        keyCode,
        type: 'KEY_UP',
      },
      '*'
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

  const handleSinglePress = (key, code, keyCode) => {
    sendKeyDown(key, code, keyCode);
    setTimeout(() => {
      sendKeyUp(key, code, keyCode);
    }, 100);
  };

  return (
    <Wrapper>
      <IframeWrapper fullwidth={blok.fullwidth}>
        <StyledIframe
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
          data-anchor-id={blok.anchor_id}
          ref={iframeRef}
          src={blok.embed_link}
          scrolling="no"
        />
      </IframeWrapper>
      {!mobile && !tablet && (
        <DesktopInstructions>
          <InstructionsCard>
            <ControllerTitle>Game Controls</ControllerTitle>
            <ControlsText>Use keyboard arrows </ControlsText>
            <ControlsText>
              <strong>← / →</strong> or <strong>A / D</strong> to move
            </ControlsText>
            <ControlsText>
              Press <strong>SPACE BAR</strong> to start
            </ControlsText>
            <ControlsText>
              Pause with <strong>ESC</strong>
            </ControlsText>
          </InstructionsCard>
        </DesktopInstructions>
      )}
      {
        <MobileControls>
          <ControlsContainer>
            <StartButton
              onClick={() => handleSinglePress(' ', 'Space', 32)}
              onTouchEnd={(e) => e.preventDefault()}
              onTouchStart={() => handleSinglePress(' ', 'Space', 32)}
            >
              START
            </StartButton>

            <DirectionalRow>
              <ControlButton
                onMouseDown={() => handleKeyDown('ArrowLeft', 'ArrowLeft', 37)}
                onMouseLeave={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
                onMouseUp={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
                onTouchEnd={() => handleKeyUp('ArrowLeft', 'ArrowLeft', 37)}
                onTouchStart={() => handleKeyDown('ArrowLeft', 'ArrowLeft', 37)}
              >
                ←
              </ControlButton>
              <ControlButton
                onMouseDown={() => handleKeyDown('ArrowRight', 'ArrowRight', 39)}
                onMouseLeave={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
                onMouseUp={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
                onTouchEnd={() => handleKeyUp('ArrowRight', 'ArrowRight', 39)}
                onTouchStart={() => handleKeyDown('ArrowRight', 'ArrowRight', 39)}
              >
                →
              </ControlButton>
            </DirectionalRow>

            <PauseButton
              onClick={() => handleSinglePress('Escape', 'Escape', 27)}
              onTouchEnd={(e) => e.preventDefault()}
              onTouchStart={() => handleSinglePress('Escape', 'Escape', 27)}
            >
              PAUSE
            </PauseButton>
          </ControlsContainer>
        </MobileControls>
      }
    </Wrapper>
  );
};

export default GameEmbed;
const ControllerTitle = styled.h2`
  ${text.h2};
`;
const ControlsText = styled.p`
  ${text.bodyMd};
`;
const StyledIframe = styled.iframe`
  width: 50vw;
  height: 50vw;
  border-top-right-radius: 0.75vw;
  border-top-left-radius: 0.75vw;
  border: none;
  overflow: hidden;
  transform-origin: center;
  aspect-ratio: 1/1;
  overflow: hidden;

  ${media.fullWidth} {
    width: 980px;
    height: 980px;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  ${media.tablet} {
    width: 75.875vw;
    height: 75.875vw;
    border-top-right-radius: 1.72vw;
    border-top-left-radius: 1.72vw;
  }
  ${media.mobile} {
    width: 100vw;
    height: 100vw;
    transform-origin: top left;
    border-top-right-radius: 0.75vw;
    border-top-left-radius: 0.75vw;
  }
`;
const IframeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${(props) => (props.fullwidth ? 'rgb(26, 31, 33)' : 'transparent')};
  ${media.mobile} {
    min-height: 480px;
    height: 480px;
    display: inline-block;
  }
`;

const MobileControls = styled.div`
  position: relative;
  z-index: 100;

  ${media.desktop} {
    display: none;
  }
  ${media.fullWidth}{
  display:none;
  }
  ${media.tablet} {
    justify-self:center;
    width: 75.875vw;
    padding: 4.167vw;
    background: #1b1d21;
    backdrop-filter: blur(10px);
    border-bottom-left-radius: 1.563vw;
    border-bottom-right-radius: 1.563vw;
  }
  ${media.mobile} {
    width:100vw;
    bottom: 23.167vw;
    padding: 4.167vw;
    background: #1b1d21;
    backdrop-filter: blur(10px);
    border-top: 2px solid rgba(255, 255, 255, 0.1);
    border-bottom-left-radius: 1.563vw;
    border-bottom-right-radius: 1.563vw;
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
`;

const DesktopInstructions = styled.div`
  padding: 2.5vw 0vw;
  margin: 0vw 2.5vw;
  margin-bottom: 2.5vw;
  border-bottom-left-radius: 1.563vw;
  border-bottom-right-radius: 1.563vw;
  width: 50vw;
  background-color: rgb(26, 31, 33);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;

  ${media.fullWidth} {
    padding: 40px 0px;
    margin: 0px 40px;
    margin-bottom: 40px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    width: 980px;
  }
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
  padding: 1.5vw 1.75vw;
  border-radius: 0.5vw;
  width: 38.25vw;
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
    padding: 24px 28px;
    border-radius: 8px;
    width: 25.25vw;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    display: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  flex-direction: column;
`;
