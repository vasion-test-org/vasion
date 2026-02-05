'use client';
import React, { useEffect, useRef, useState } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';

import IntegrationBloks from '@/components/globalComponents/IntegrationBloks';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

const IntegrationsGrid = ({ blok }) => {
  // console.log(blok);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 480);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  useEffect(() => {
    const initAnimations = async () => {
      const { default: gsap } = await import('gsap');

      if (!isMounted || !wrapperRef.current) return;
      const currentRef = wrapperRef.current;
      if (isMobile) {
        if (isOpen) {
          const fullHeight = currentRef.scrollHeight;
          gsap.to(currentRef, {
            duration: 1,
            ease: 'sine.out',
            height: fullHeight,
          });
        } else {
          gsap.set(currentRef, {
            height: '70vh',
          });
        }
      } else {
        gsap.set(currentRef, { height: 'auto' });
      }
    };

    initAnimations();
  }, [isOpen, isMobile, isMounted]);

  const handleViewMore = () => {
    setIsOpen(true);
  };
  return (
    <Wrapper className="integration-wrapper" ref={wrapperRef}>
      <Intro>
        <Header {...storyblokEditable(blok)}>
          <RichTextRenderer document={blok.header} />
        </Header>
        <Body {...storyblokEditable(blok)}>
          <RichTextRenderer document={blok?.body_copy} />
        </Body>
      </Intro>
      {isMounted && <IntegrationBloks isMobile={isMobile} types={blok?.integration_types} />}
      {!isOpen && isMobile && (
        <ViewMoreWrapper>
          <MoreAndCarrot>
            <ViewMore onClick={handleViewMore}>View More</ViewMore>
            <Carrot alt={''} height={'12'} src={'/images/uiElements/carrot-down'} width={'12'} />
          </MoreAndCarrot>
        </ViewMoreWrapper>
      )}
    </Wrapper>
  );
};

export default IntegrationsGrid;

const Carrot = styled.img`
  ${media.fullWidth} {
    display: none;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    width: 2.5vw;
    height: 2.5vw;
  }
`;
const ViewMore = styled.button`
  ${text.bodySmBold};
  color: ${colors?.primaryOrange};
`;
const MoreAndCarrot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewMoreWrapper = styled.div`
  ${media.fullWidth} {
    display: none;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0px;
    align-items: flex-end;
    justify-content: center;
    height: 16vw;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.9) 100%
    );
    width: 100%;
    gap: 1.667vw;
    z-index: 100;
  }
`;
const Body = styled.div`
  ${text.bodyMd}
  text-align:center;
  width: 45.125vw;

  ${media.fullWidth} {
    width: 722px;
  }
  ${media.tablet} {
    width: 70.117vw;
  }
  ${media.mobile} {
    width: 89.167vw;
  }
`;

const Header = styled.div`
  ${text.h3};
  color: ${colors?.txtPrimary};
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 67.75vw;
  padding-bottom: 1.25vw;
  gap: 1vw;

  ${media.fullWidth} {
    width: 1084px;
    padding-bottom: 20px;
    gap: 16px;
  }
  ${media.tablet} {
    width: 92.188vw;
    padding-bottom: 1.953vw;
    gap: 1.563vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    padding-bottom: 4.167vw;
    gap: 3.333vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.25vw;
  overflow: hidden;

  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
          ? `${props.spacing}px 0 0`
          : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
        ? `${props.spacing}px 0`
        : '3.75vw 0';
  }};

  ${media.fullWidth} {
    gap: 20px;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '60px 0';
    }};
  }

  ${media.tablet} {
    gap: 1.953vw;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '5.859vw 0';
    }};
    gap: 1.563vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '12.5vw 0';
    }};
    gap: 3.333vw;
  }
`;
