'use client';
import React, { useEffect } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import { horizontalLoop } from '@/functions/horizontalLoop';
import media from 'styles/media';
import text from '@/styles/text';
import colors from '@/styles/colors';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Testimonial from './Testimonial';
import SideArrow from '@/assets/svg/side-arrow.svg';

const TestimonialCarousel = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const tagTopics = blok.testimonials?.[0]?.tag_topics;

  useEffect(() => {
    const initCarousel = async () => {
      const { default: gsap } = await import('gsap');

      const testimonialsArr = gsap.utils.toArray('.testimonials');
      const testimonialLoop = horizontalLoop(testimonialsArr, {
        centered: true,
        paused: true,
      });

      document
        .querySelector('.next')
        .addEventListener('click', () =>
          testimonialLoop.next({ duration: 0.4, ease: 'power1.inOut' }),
        );
      document
        .querySelector('.prev')
        .addEventListener('click', () =>
          testimonialLoop.previous({ duration: 0.4, ease: 'power1.inOut' }),
        );
    };

    initCarousel();
  }, []);

  const mappedTestimonials = blok.testimonials.map((testimonial, i) => (
    <TestimonialWrapper key={testimonial._uid || i} className="testimonials">
      <Testimonial blok={testimonial} />
    </TestimonialWrapper>
  ));

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper>
        <Buttons>
          {tagTopics?.content && tagTopics.content.length > 0 && (
            <Tag>
              <RichTextRenderer document={tagTopics} />
            </Tag>
          )}
          <Button className="prev">
            <SideArrow />
          </Button>
          <Button className="next">
            <NextSideArrow />
          </Button>
        </Buttons>
        <Testimonials>{mappedTestimonials}</Testimonials>
      </Wrapper>
    </ThemeProvider>
  );
};

const Tag = styled.div`
  ${text.tagBold};
  display: flex;
  align-items: center;
  background-color: ${colors.purpleTag};
  color: ${colors.primaryPurple};
  padding: 0.23vw 0.85vw;
  border-radius: 1.5vw;

  ${media.fullWidth} {
    border-radius: 24px;
    padding: 0px 12px;
  }
  ${media.tablet} {
    border-radius: 2.344vw;
    padding: 0.3vw 1.172vw;
  }
  ${media.mobile} {
    border-radius: 5vw;
    padding: 0.7vw 2.5vw;
  }
`;
const NextSideArrow = styled(SideArrow)`
  rotate: 180deg;
`;
const Button = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${colors.primaryOrange};
  padding: 0.5vw;
  border-radius: 100%;

  ${media.fullWidth} {
    padding: 8px;
  }

  ${media.tablet} {
    padding: 0.781vw;
  }

  ${media.mobile} {
    padding: 1.667vw;
  }
`;
const Buttons = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  flex-direction: column;
  height: auto;
  width: 100%;
  background: ${(props) => props.theme.testimonial.bg};
`;
export default TestimonialCarousel;
