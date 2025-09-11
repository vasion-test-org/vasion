'use client';
import React, { useEffect, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Image from '@/components/globalComponents/Image';
import ComponentRenderer from '@/components/renderers/ComponentRenderer';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { getSmoother } from '@/components/ScrollSmoothWrapper';

gsap.registerPlugin(ScrollTrigger);

const LRSPill = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const pillRef = useRef(null);

  useEffect(() => {
    const pillElement = pillRef.current;
    if (!pillElement) return;

    // Create a ScrollTrigger to pin the element to bottom center
    const trigger = ScrollTrigger.create({
      trigger: pillElement,
      start: 'top bottom',
      end: 'bottom bottom',
      pin: true,
      pinSpacing: false,
      onUpdate: () => {
        // Position the element at bottom center
        const centerX = window.innerWidth / 2;

        pillElement.style.position = 'fixed';
        pillElement.style.bottom = '20px';
        pillElement.style.left = '50%';
        pillElement.style.transform = 'translateX(-50%)';
        pillElement.style.zIndex = '1000';
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Wrapper ref={pillRef} {...storyblokEditable(blok)}>
        <PillContainer>
          {/* Media Section */}
          {blok.media && blok.media.length > 0 && (
            <MediaWrapper {...storyblokEditable(blok.media[0])}>
              <Image
                images={blok.media[0].media}
                borderradius={blok.media[0].border_radius}
              />
            </MediaWrapper>
          )}

          {/* Copy Sections */}
          {blok.copy_sections && blok.copy_sections.length > 0 && (
            <CopySection>
              {blok.copy_sections.map((copy) => (
                <div key={copy._uid} {...storyblokEditable(copy)}>
                  <RichTextRenderer
                    document={copy.copy}
                    responsiveTextStyles={copy.responsive_text_styles}
                  />
                </div>
              ))}
            </CopySection>
          )}

          {/* Button Section */}
          {blok.button && blok.button.length > 0 && (
            <ButtonWrapper>
              <ComponentRenderer blok={blok.button[0]} />
            </ButtonWrapper>
          )}
        </PillContainer>
      </Wrapper>
    </ThemeProvider>
  );
};

export default LRSPill;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1000;
`;

const PillContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme?.lrs_pill?.bg || '#F5F4F7'};
  border-radius: 1.063vw;
  padding: 1.25vw 2.5vw;
  gap: 1.5vw;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 90vw;
  margin: 0 auto;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  ${media.fullWidth} {
    border-radius: 17px;
    padding: 20px 40px;
    gap: 24px;
    max-width: 1200px;
  }

  ${media.tablet} {
    border-radius: 1.66vw;
    padding: 1.5vw 3vw;
    gap: 2vw;
    max-width: 95vw;
  }

  ${media.mobile} {
    flex-direction: column;
    border-radius: 3.542vw;
    padding: 3vw 4vw;
    gap: 3vw;
    text-align: center;
    max-width: 95vw;

    &:hover {
      transform: none;
    }
  }
`;

const MediaWrapper = styled.div`
  flex-shrink: 0;

  ${media.mobile} {
    order: 1;
  }
`;

const CopySection = styled.div`
  flex: 1;
  color: ${(props) => props.theme?.lrs_pill?.text_color || '#1B1D21'};

  ${media.mobile} {
    order: 2;
  }
`;

const ButtonWrapper = styled.div`
  flex-shrink: 0;

  ${media.mobile} {
    order: 3;
  }
`;
