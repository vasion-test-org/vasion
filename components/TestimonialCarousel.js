'use client';
import React, { useEffect } from 'react';

import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Testimonial from './Testimonial';

import { horizontalLoop } from '@/functions/horizontalLoop';
import colors from '@/styles/colors';
import SideArrow from '@/assets/svg/side-arrow.svg';

const TestimonialCarousel = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;

  // console.log(blok.testimonials);
  const mappedTestimonials = blok.testimonials.map((testimonial) => (
    <TestimonialWrapper className='testimonials'>
      <Testimonial className='testimonials' blok={testimonial} />
    </TestimonialWrapper>
  ));

  useEffect(() => {
    const testimonialsArr = gsap.utils.toArray('.testimonials');
    const testimonialLoop = horizontalLoop(testimonialsArr, { paused: true });

    document
      .querySelector('.next')
      .addEventListener('click', () =>
        testimonialLoop.next({ duration: 0.4, ease: 'power1.inOut' })
      );
    document
      .querySelector('.prev')
      .addEventListener('click', () =>
        testimonialLoop.previous({ duration: 0.4, ease: 'power1.inOut' })
      );
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper>
        <Buttons>
          <Button className='prev'>
            <SideArrow />
          </Button>
          <Button className='next'>
            <NextSideArrow />
          </Button>
        </Buttons>
        <Testimonials>{mappedTestimonials}</Testimonials>
      </Wrapper>
    </ThemeProvider>
  );
};

const NextSideArrow = styled(SideArrow)`
  rotate: 180deg;
`;
const Button = styled.div`
  cursor: pointer;
  background: ${colors.primaryOrange};
  padding: 0.5vw;
  border-radius: 6.25vw;

  ${media.fullWidth} {
    padding: 8px;
    border-radius: 100px;
  }

  ${media.tablet} {
    padding: 0.781vw;
    border-radius: 9.766vw;
  }

  ${media.mobile} {
    padding: 1.667vw;
    border-radius: 20.833vw;
  }
`;
const Buttons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  z-index: 2;
  top: 7vw;
  right: 15vw;
  gap: 1.25vw;

  ${media.fullWidth} {
    top: 112px;
    right: 240px;
    gap: 20px;
  }

  ${media.tablet} {
    top: 7vw;
    right: 15vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    top: 11vw;
    right: 5vw;
    gap: 4.167vw;
  }
`;
const TestimonialWrapper = styled.div``;
const Testimonials = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 81.5vw;

  ${media.fullWidth} {
    width: 1304px;
  }

  ${media.tablet} {
    width: 92.188vw;
  }

  ${media.mobile} {
    width: 89.167vw;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: auto;
  width: 100%;
  background: ${(props) => props.theme.testimonial.bg};
  padding: 3.75vw 9.25vw;

  ${media.fullWidth} {
    padding: 60px 148px;
  }

  ${media.tablet} {
    padding: 3.906vw;
  }

  ${media.mobile} {
    padding: 5.417vw;
  }
`;
export default TestimonialCarousel;
