'use client';
import React from 'react';
import styled from 'styled-components';
import media from '@/styles/media';

const Embed = ({ blok }) => {
  return (
    <Wrapper>
      <StyledIframe
        data-anchor-id={blok.anchor_id}
        id="game-container"
        alt="styled game iframe"
        src={blok.embed_link}
        allowFullScreen
      />
    </Wrapper>
  );
};
export default Embed;
//#game-container
//
const StyledIframe = styled.iframe`
  width: 100vw;
  height: 100%;
  border: none;

  ${media.fullWidth} {
    width: 1304px;
  }
  ${media.tablet} {
    width: 100vw;
    height: 750px;
  }
  ${media.mobile} {
    /* width: 90vw; */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.75vw;
  height: 56.25vw;

  ${media.fullWidth} {
    padding: 60px;
    height: 900px;
  }

  ${media.tablet} {
    padding: 0px;
    height: 100%;
  }

  ${media.mobile} {
    /* padding: 12.5vw;
    height: 95vw; */
    display: none;
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
