'use client';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const Embed = ({ blok }) => {
  return (
    <Wrapper>
      <StyledIframe
        data-anchor-id={blok.anchor_id}
        src="https://static-cdn.pl-labs.com/minigames/arkanoid/index.html"
        allowFullScreen
        scrolling="no"
        allow="accelerometer; autoplay; encrypted-media; gyroscope"
      />
    </Wrapper>
  );
};

export default Embed;

const StyledIframe = styled.iframe`
  width: 480px;
  height: 480px;
  border: none;
  transform: scale(1.8); /* Makes it 864px visually */
  transform-origin: center;

  ${media.fullWidth} {
    transform: scale(2); /* 960px */
  }

  ${media.tablet} {
    transform: scale(1.5); /* 720px */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background-color: transparent;

  /* Need extra space for the scaled iframe */
  min-height: 960px;

  ${media.tablet} {
    min-height: 720px;
  }
`;

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
