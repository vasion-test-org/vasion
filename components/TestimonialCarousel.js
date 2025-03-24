'use client'
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Testimonial from './Testimonial';


const TestimonialCarousel = ({ blok }) => {
const themes = useAvailableThemes();
const selectedTheme = themes[blok.theme] || themes.default;

console.log(blok.testimonials)
const mappedTestimonials = blok.testimonials.map(testimonial =>
  <TestimonialWrapper>
    <Testimonial blok={testimonial}/>
  </TestimonialWrapper>
)
return (
<ThemeProvider theme={selectedTheme}>
  <Wrapper>
  {mappedTestimonials}
  </Wrapper>
</ThemeProvider>
)
}


const TestimonialWrapper = styled.div`
position: absolute;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28vw;
  width: 100%;
`
export default TestimonialCarousel