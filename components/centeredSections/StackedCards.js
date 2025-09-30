'use client';
import React, { useContext, useRef, useState, useEffect, useMemo } from 'react';
import { useRive } from '@rive-app/react-canvas';
import { ScreenContext } from '../providers/Screen';
import gsap from 'gsap';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';
import getMedia from '@/functions/getMedia';
import ScrollTrigger from 'gsap/ScrollTrigger';
import RichTextRenderer from '../renderers/RichTextRenderer';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';

gsap.registerPlugin(ScrollTrigger);

// Module-level state for user interaction detection
let didUserInteract = false;
const subscribers = new Set();

if (typeof window !== 'undefined') {
  const onInteraction = () => {
    if (didUserInteract) return;
    didUserInteract = true;
    subscribers.forEach((callback) => callback());
    subscribers.clear();
  };

  document.addEventListener('click', onInteraction, {
    once: true,
    passive: true,
  });
  document.addEventListener('scroll', onInteraction, {
    once: true,
    passive: true,
  });
  document.addEventListener('mousemove', onInteraction, {
    once: true,
    passive: true,
  });
}

// Custom hook to conditionally load Rive based on user interaction
const useConditionalRive = () => {
  const [shouldLoadRive, setShouldLoadRive] = useState(didUserInteract);

  useEffect(() => {
    if (didUserInteract) {
      setShouldLoadRive(true);
      return;
    }

    const callback = () => setShouldLoadRive(true);
    subscribers.add(callback);

    return () => {
      subscribers.delete(callback);
    };
  }, []);

  return shouldLoadRive;
};

const RiveAnimation = ({
  src,
  index,
  isActive,
  tablet,
  mobile,
  onRiveInit,
  shouldLoad = true,
}) => {
  const shouldAutoplay = tablet || mobile || index === 0;
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef(null);
  const conditionalRive = useConditionalRive();

  // Use Intersection Observer to load animations when they come into view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Only load when in viewport, active, explicitly requested, and user has interacted
  const shouldLoadRive =
    (isInViewport || isActive) && shouldLoad && conditionalRive;

  const { rive, RiveComponent } = useRive({
    src: shouldLoadRive ? src : null,
    autoplay: shouldAutoplay && shouldLoadRive,
    // Performance optimizations
    fitCanvasToArtboardHeight: true,
    shouldResizeCanvasToArtboardHeight: true,
  });

  useEffect(() => {
    if (rive) {
      onRiveInit(rive, index);
      shouldAutoplay ? rive.play() : rive.pause();
    }
    return () => rive?.pause();
  }, [rive]);

  useEffect(() => {
    if (rive) {
      isActive ? rive.play() : rive.pause();
    }
  }, [isActive]);

  return (
    <RiveContainer ref={containerRef}>
      {shouldLoadRive ? <RiveComponent /> : null}
    </RiveContainer>
  );
};

const StackedCards = React.memo(({ blok }) => {
  // console.log(blok);
  const { mobile, tablet } = useContext(ScreenContext);

  // Performance optimization: Only load Rive animations when they're actually needed
  const stackedCardsRef = useRef(null);
  const riveInstancesRef = useRef([]);
  const [active, setActive] = useState(0);
  const [lastCard, setLastCard] = useState({});
  const [riveLoaded, setRiveLoaded] = useState(false);

  useEffect(() => {
    riveInstancesRef.current = Array(3).fill(null);
    return () => {
      riveInstancesRef.current.forEach((rive) => rive?.pause());
    };
  }, []);

  const handleRiveInit = useMemo(() => {
    return (riveInstance, index) => {
      riveInstancesRef.current[index] = riveInstance;
      if (index === 0) {
        setRiveLoaded(true);
      }
    };
  }, []);

  const handleCardMouseEnter = (index) => {
    if (!tablet && !mobile) {
      setActive(index);
    }
  };

  const handleCardMouseLeave = () => {
    if (!tablet && !mobile) {
      setActive(0);
    }
  };

  return (
    <Wrapper ref={stackedCardsRef}>
      {blok.map((card, index) => {
        const isLastCard = index === blok?.length - 1;
        const cardImage = getMedia(
          card?.background_image[0]?.filename,
          card?.background_image[0]?.filename,
          card?.background_image[1]?.filename,
          card?.background_image[2]?.filename
        );

        return (
          <CardContainer
            {...storyblokEditable(card)}
            className="stackedCards"
            key={card._uid || index}
            $active={active}
            index={index}
            $bgimg={cardImage ? cardImage : card?.background_image[0].filename}
            $last={isLastCard}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={handleCardMouseLeave}
          >
            <Content $last={isLastCard}>
              {card?.eyebrow && <RichTextRenderer document={card.eyebrow} />}
              <div {...storyblokEditable(card.header)}>
                <RichTextRenderer document={card.header} />
              </div>
              <div {...storyblokEditable(card.body_copy)}>
                <RichTextRenderer document={card.body_copy} />
              </div>
            </Content>

            <ButtonRow isLastCard={isLastCard}>
              {card?.link?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} />
                </div>
              ))}
            </ButtonRow>

            {index < 3 && (
              <RiveAnimation
                key={`rive-${index}`}
                src={card.main_asset[0].filename}
                index={index}
                isActive={active === index}
                tablet={tablet}
                mobile={mobile}
                onRiveInit={handleRiveInit}
                shouldLoad={riveLoaded || index === 0}
              />
            )}
          </CardContainer>
        );
      })}
    </Wrapper>
  );
});

StackedCards.displayName = 'StackedCards';

export default StackedCards;

const RiveContainer = styled.div`
  margin-top: 1.389vw;
  aspect-ratio: 419 / 327;
  width: 100%;
  height: auto;

  ${media.fullWidth} {
    margin-top: 20px;
    height: 349px;
  }

  ${media.tablet} {
    margin-top: unset;
    aspect-ratio: 298/248;
    height: 24.219vw;
  }

  ${media.mobile} {
    margin-top: unset;
    width: 100%;
    height: 67.917vw;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  gap: 1.667vw;
  margin-top: ${(props) => (props.isLastCard ? '2.5vw' : '1.125vw')};

  ${media.fullWidth} {
    gap: 24px;
    margin-top: ${(props) => (props.isLastCard ? '40px' : '18px')};
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5.607vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: nowrap;
  hyphens: none;
  width: ${(props) => (props?.$last ? '33.25vw' : 'fit-content')};
  gap: ${(props) => (props?.$last ? '0.75vw' : '0.5vw')};

  ${media.fullWidth} {
    width: ${(props) => (props?.$last ? '532px' : 'fit-content')};
    gap: ${(props) => (props?.$last ? '12px' : '8px')};
  }

  ${media.tablet} {
    width: ${(props) => (props?.$last ? '38.281vw' : 'fit-content')};
    height: ${(props) => (props?.$last ? 'unset' : '17.16vw')};
    gap: ${(props) => (props?.$last ? '1.172vw' : '0.781vw')};
  }

  ${media.mobile} {
    width: ${(props) => (props?.$last ? '78.333vw' : 'fit-content')};
    gap: ${(props) => (props?.$last ? '2.5vw' : '1.667vw')};
  }
`;
const CardContainer = styled.div`
  display: flex;
  opacity: ${(props) =>
    props?.$last
      ? '1'
      : props.index < 3
      ? props.$active === props.index
        ? '1'
        : '0.5'
      : '1'};
  transition: opacity 0.3s ease-out;
  flex-direction: column;
  background-image: url(${(props) => props.$bgimg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: ${(props) => (props?.$last ? 'fit-content' : '37.5vw')};
  width: ${(props) => (props?.$last ? '81.5vw' : '26.688vw')};
  padding: ${(props) => (props?.$last ? '2.688vw 3.75vw' : '1.25vw')};
  border-radius: 0.833vw;
  gap: 0.75vw;

  ${media.fullWidth} {
    height: ${(props) => (props?.$last ? 'fit-content' : '600px')};
    width: ${(props) => (props?.$last ? '1304px' : '427px')};
    padding: ${(props) => (props?.$last ? '43px 60px' : '20px')};
    border-radius: 12px;
    gap: 12px;
  }

  ${media.tablet} {
    opacity: 1;
    width: ${(props) => (props?.$last ? '89.488vw' : '29.102vw')};
    padding: ${(props) => (props?.$last ? '3.906vw' : '1.953vw')};
    height: ${(props) => (props?.$last ? 'fit-content' : '45.953vw')};
    border-radius: 1.172vw;
  }

  ${media.mobile} {
    opacity: 1;
    width: 89.167vw;
    height: ${(props) => (props?.$last ? '171.042vw' : 'fit-content')};
    padding: ${(props) => (props?.$last ? '5.417vw 8.333vw' : '4.167vw')};
    border-radius: 2.804vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75vw;
  width: 100%;

  ${media.fullWidth} {
    width: 1329px;
    gap: 24px;
    width: 1350px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    gap: 5vw;
  }
`;
