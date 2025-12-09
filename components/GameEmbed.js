'use client';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const GameEmbed = ({ blok }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Wait for iframe to load
    const iframe = iframeRef.current;

    const handleLoad = () => {
      try {
        // Try to dispatch event to iframe's contentWindow
        const event = new KeyboardEvent('keydown', {
          key: ' ',
          code: 'Space',
          keyCode: 32,
          which: 32,
          bubbles: true,
          cancelable: true,
        });

        iframe.contentWindow.dispatchEvent(event);
      } catch (error) {
        console.warn(
          'Cannot dispatch event to iframe due to cross-origin restrictions:',
          error,
        );
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      return () => iframe.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <Wrapper fullwidth={blok.fullwidth}>
      <StyledIframe
        ref={iframeRef}
        data-anchor-id={blok.anchor_id}
        src={blok.embed_link}
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </Wrapper>
  );
};

export default GameEmbed;
const StyledIframe = styled.iframe`
  width: 480px;
  height: 480px;
  border: none;
  overflow: hidden;
  transform: scale(1.8); /* Makes it 864px visually */
  transform-origin: center;

  ${media.fullWidth} {
    transform: scale(2); /* 960px */
  }

  ${media.tablet} {
    transform: scale(1.3); /* 720px */
  }
  ${media.mobile} {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  background-color: ${(props) =>
    props.fullwidth ? 'rgb(26, 31, 33)' : 'transparent'};

  /* Need extra space for the scaled iframe */
  min-height: 960px;

  ${media.tablet} {
    min-height: 720px;
  }
  ${media.mobile} {
    display: none;
  }
`;
iframe.contentWindow.postMessage(
  { type: 'KEY_EVENT', key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 },
  '*',
);
window.addEventListener('message', (event) => {
  if (event.data.type === 'KEY_EVENT') {
    const { key, code, keyCode } = event.data;
    const keyDownEvent = new KeyboardEvent('keydown', {
      key,
      code,
      keyCode,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(keyDownEvent);
    setTimeout(() => {
      const keyUpEvent = new KeyboardEvent('keyup', {
        key,
        code,
        keyCode,
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(keyUpEvent);
    }, 100);
  }
});
//<head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <title>Phaser Mini Game — SVG Background</title>
//   <script type="module" crossorigin src="./assets/index-DUZwJ4yL.js"></script>
//   <link rel="modulepreload" crossorigin href="./assets/phaser-DJe_tbjO.js">
//  </head>
// <body>
// <div id="game-container"></div>
// </body>
//<script type="module" crossorigin src="https://static-cdn.pl-labs.com/minigames/arkanoid/assets/index-VkBUt_zx.js"></script>
// <link rel="modulepreload" crossorigin href="https://static-cdn.pl-labs.com/minigames/arkanoid/assets/phaser-DJe_tbjO.js">
//
// <div class="controls">
//   <h2>GAME CONTROL</h2>
//   <p>Use keyboard arrows <strong>← / →</strong> or <strong>A / D</strong> to move</p>
//   <p>Press <strong>SPACE BAR</strong> to start</p>
//   <p>Pause with <strong>ESC</strong></p>
// </div>
// <script type="module" crossorigin src="https://static-cdn.pl-labs.com/minigames/arkanoid/assets/index-VkBUt_zx.js"></script>
// <link rel="modulepreload" crossorigin href="https://static-cdn.pl-labs.com/minigames/arkanoid/assets/phaser-DJe_tbjO.js">
//
//
//  https://github.com/PrinterLogic/minigames
