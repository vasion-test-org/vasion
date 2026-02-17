'use client';

import React, { useEffect, useState } from 'react';

import SideArrow from '@/assets/svg/side-arrow.svg';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { horizontalLoop } from '@/functions/horizontalLoop';
import { cn } from '@/lib/cn';

import Testimonial from './Testimonial';

const TestimonialCarousel = ({ blok }) => {
  const themeKey = blok.theme || 'default';
  const isDark = themeKey === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);
  const tagTopics = blok.testimonials?.[activeIndex]?.tag_topics;

  useEffect(() => {
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    let onNext, onPrev;

    const initCarousel = async () => {
      const { default: gsap } = await import('gsap');
      const testimonialsArr = gsap.utils.toArray('.testimonials');
      const testimonialLoop = horizontalLoop(testimonialsArr, {
        centered: true,
        onChange: (element) => {
          const index = testimonialsArr.indexOf(element);
          setActiveIndex(index);
        },
        paused: true,
      });

      onNext = () => {
        testimonialLoop.next({ duration: 0.4, ease: 'power1.inOut' });
        setActiveIndex((prev) => (prev + 1) % blok.testimonials.length);
      };
      onPrev = () => {
        testimonialLoop.previous({ duration: 0.4, ease: 'power1.inOut' });
        setActiveIndex((prev) => (prev === 0 ? blok.testimonials.length - 1 : prev - 1));
      };

      if (nextBtn) nextBtn.addEventListener('click', onNext);
      if (prevBtn) prevBtn.addEventListener('click', onPrev);
    };

    initCarousel();

    return () => {
      if (nextBtn && onNext) nextBtn.removeEventListener('click', onNext);
      if (prevBtn && onPrev) prevBtn.removeEventListener('click', onPrev);
    };
  }, [blok.testimonials.length]);

  const handlePrevKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  const handleNextKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  const mappedTestimonials = blok.testimonials.map((testimonial, i) => (
    <div className="testimonials" key={testimonial._uid || i}>
      <Testimonial blok={testimonial} />
    </div>
  ));

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center',
        isDark ? 'bg-testimonial-dark' : 'bg-purple-lightGrey',
        'p-6 md:p-10 lg:px-37 lg:py-15'
      )}
    >
      <div className="absolute top-13 right-6 z-10 flex flex-row items-center justify-center gap-5 md:top-18 md:right-38 md:gap-5 lg:top-28 lg:right-60 lg:gap-5">
        {tagTopics?.content && tagTopics.content.length > 0 && (
          <div
            className="bg-purple-tag font-archivo text-body-sm text-purple flex items-center rounded-xl px-3 py-0.5 font-semibold md:rounded-3xl md:px-3 md:py-1"
            key={activeIndex}
          >
            <RichTextRenderer document={tagTopics} />
          </div>
        )}
        <div
          aria-label="Previous testimonial"
          className="prev bg-orange focus:ring-purple-border inline-flex cursor-pointer items-center justify-center rounded-full p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          role="button"
          tabIndex={0}
          onKeyDown={handlePrevKeyDown}
        >
          <SideArrow aria-hidden />
        </div>
        <div
          aria-label="Next testimonial"
          className="next bg-orange focus:ring-purple-border inline-flex cursor-pointer items-center justify-center rounded-full p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          role="button"
          tabIndex={0}
          onKeyDown={handleNextKeyDown}
        >
          <SideArrow aria-hidden className="rotate-180" />
        </div>
      </div>
      <div id="wrapper" className="flex w-100 overflow-hidden sm:w-175 md:w-236 lg:w-326">
        {mappedTestimonials}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
