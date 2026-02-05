'use client';
import React, { useEffect } from 'react';

import styled from 'styled-components';

import CarouselArrow from '@/assets/svg/CarouselArrow.svg';
import { horizontalLoop } from '@/functions/horizontalLoop';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

const ImageCarousel = ({ blok }) => {
  const Images = blok.carousel_assets[0].images.map((image, index) => (
    <CarouselImage
      className={'carouselImages'}
      id={`img-${index}`}
      key={image.filename}
      src={image.filename}
    />
  ));

  useEffect(() => {
    const initCarousel = async () => {
      const { default: gsap } = await import('gsap');

      const imgArray = gsap.utils.toArray('.carouselImages');

      const loop = horizontalLoop(imgArray, {
        deep: true,
        paddingRight: 4,
        paused: true,
      });

      imgArray.forEach((img, i) =>
        img.addEventListener('click', () =>
          loop.toIndex(i, { duration: 0.8, ease: 'power1.inOut' })
        )
      );

      document
        .querySelector('#rightArrow')
        .addEventListener('click', () => loop.next({ duration: 0.4, ease: 'power1.inOut' }));
      document
        .querySelector('#leftArrow')
        .addEventListener('click', () => loop.previous({ duration: 0.4, ease: 'power1.inOut' }));
    };

    initCarousel();
  }, []);

  return (
    <Wrapper>
      <Header>{blok.header}</Header>
      <Carousel>
        <LeftArrow id="leftArrow" />
        <CarouselImageContainer>
          <Slides>{Images}</Slides>
        </CarouselImageContainer>
        <RightArrow id="rightArrow" />
      </Carousel>
    </Wrapper>
  );
};
export default ImageCarousel;

const RightArrow = styled(CarouselArrow)`
  position: relative;
  z-index: 2;
  rotate: 180deg;
  width: 2.083vw;
  height: 3.472vw;
  cursor: pointer;

  ${media.fullWidth} {
    width: 30px;
    height: 50px;
  }

  ${media.tablet} {
    width: 2.93vw;
    height: 4.883vw;
  }

  ${media.mobile} {
    width: 3.505vw;
    height: 5.841vw;
  }
`;
const LeftArrow = styled(CarouselArrow)`
  position: relative;
  z-index: 2;
  width: 2.083vw;
  height: 3.472vw;
  cursor: pointer;

  ${media.fullWidth} {
    width: 30px;
    height: 50px;
  }

  ${media.tablet} {
    width: 2.93vw;
    height: 4.883vw;
  }

  ${media.mobile} {
    width: 3.505vw;
    height: 5.841vw;
  }
`;
const CarouselImage = styled.img`
  min-width: 100%;
  height: 100%;
`;
const Slides = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  width: 63.333vw;
`;
const CarouselImageContainer = styled.div`
  position: relative;
  height: 100%;
`;
const Carousel = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 2.639vw;
  width: 71.319vw;
  height: 43.75vw;
`;
const Header = styled.h2`
  ${text.h2};
  color: ${colors.primaryPurple};
  margin-bottom: 5.069vw;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 63.819vw;
  padding: 5.556vw 9.653vw;
`;
