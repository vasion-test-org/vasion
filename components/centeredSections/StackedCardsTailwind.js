'use client';
import React, { useContext, useRef, useState, useEffect, useMemo } from 'react';
import { useRive } from '@rive-app/react-canvas';
import { ScreenContext } from '../providers/Screen';
import getMedia from '@/functions/getMedia';
import RichTextRenderer from '../renderers/RichTextRenderer';
import Button from '@/components/globalComponents/Button';
import { storyblokEditable } from '@storyblok/react/rsc';

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
    <div ref={containerRef} className="rive-container">
      {shouldLoadRive ? <RiveComponent /> : null}
    </div>
  );
};

const StackedCardsTailwind = React.memo(({ blok }) => {
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
    <>
      <style>{`
        .stacked-cards-wrapper {
          position: relative;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75vw;
          width: 100%;
        }
        @media (min-width: 1601px) {
          .stacked-cards-wrapper {
            width: 1350px;
            gap: 24px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .stacked-cards-wrapper {
            gap: 1.172vw;
          }
        }
        @media (max-width: 480px) {
          .stacked-cards-wrapper {
            gap: 5vw;
          }
        }
        .stacked-card-item {
          display: flex;
          flex-direction: column;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition: opacity 0.3s ease-out;
          border-radius: 0.833vw;
          gap: 0.75vw;
        }
        @media (min-width: 1601px) {
          .stacked-card-item {
            border-radius: 12px;
            gap: 12px;
          }
          .stacked-card-item.last-card {
            width: 1304px;
            padding: 43px 60px;
            height: fit-content;
          }
          .stacked-card-item:not(.last-card) {
            height: 600px;
            width: 427px;
            padding: 20px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .stacked-card-item {
            opacity: 1 !important;
            border-radius: 1.172vw;
          }
          .stacked-card-item.last-card {
            width: 89.488vw;
            padding: 3.906vw;
            height: fit-content;
          }
          .stacked-card-item:not(.last-card) {
            width: 29.102vw;
            padding: 1.953vw;
            height: 45.953vw;
          }
        }
        @media (max-width: 480px) {
          .stacked-card-item {
            opacity: 1 !important;
            border-radius: 2.804vw;
          }
          .stacked-card-item.last-card {
            width: 89.167vw;
            height: 171.042vw;
            padding: 5.417vw 8.333vw;
          }
          .stacked-card-item:not(.last-card) {
            width: 89.167vw;
            height: fit-content;
            padding: 4.167vw;
          }
        }
        .stacked-card-content {
          display: flex;
          flex-direction: column;
          white-space: nowrap;
          hyphens: none;
        }
        .stacked-card-content.last-card {
          width: 33.25vw;
          gap: 0.75vw;
        }
        .stacked-card-content:not(.last-card) {
          width: fit-content;
          gap: 0.5vw;
        }
        @media (min-width: 1601px) {
          .stacked-card-content.last-card {
            width: 532px;
            gap: 12px;
          }
          .stacked-card-content:not(.last-card) {
            gap: 8px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .stacked-card-content.last-card {
            width: 38.281vw;
            gap: 1.172vw;
          }
          .stacked-card-content:not(.last-card) {
            height: 17.16vw;
            gap: 0.781vw;
          }
        }
        @media (max-width: 480px) {
          .stacked-card-content.last-card {
            width: 78.333vw;
            gap: 2.5vw;
          }
          .stacked-card-content:not(.last-card) {
            gap: 1.667vw;
          }
        }
        .stacked-card-buttons {
          display: flex;
          flex-direction: row;
          align-items: center;
          width: max-content;
          gap: 1.667vw;
        }
        .stacked-card-buttons.last-card {
          margin-top: 2.5vw;
        }
        .stacked-card-buttons:not(.last-card) {
          margin-top: 1.125vw;
        }
        @media (min-width: 1601px) {
          .stacked-card-buttons {
            gap: 24px;
          }
          .stacked-card-buttons.last-card {
            margin-top: 40px;
          }
          .stacked-card-buttons:not(.last-card) {
            margin-top: 18px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .stacked-card-buttons {
            gap: 2.344vw;
          }
        }
        @media (max-width: 480px) {
          .stacked-card-buttons {
            gap: 5.607vw;
          }
        }
        .rive-container {
          margin-top: 1.389vw;
          aspect-ratio: 419 / 327;
          width: 100%;
          height: auto;
        }
        @media (min-width: 1601px) {
          .rive-container {
            margin-top: 20px;
            height: 349px;
          }
        }
        @media (min-width: 481px) and (max-width: 1024px) {
          .rive-container {
            margin-top: 0;
            aspect-ratio: 298/248;
            height: 24.219vw;
          }
        }
        @media (max-width: 480px) {
          .rive-container {
            margin-top: 0;
            width: 100%;
            height: 67.917vw;
          }
        }
      `}</style>
      <div
        ref={stackedCardsRef}
        className="stacked-cards-wrapper"
      >
      {blok.map((card, index) => {
        const isLastCard = index === blok?.length - 1;
        const cardImage = getMedia(
          card?.background_image[0]?.filename,
          card?.background_image[0]?.filename,
          card?.background_image[1]?.filename,
          card?.background_image[2]?.filename
        );

        // Calculate opacity based on active state
        const getOpacity = () => {
          if (isLastCard) return 1;
          if (index < 3) {
            return active === index ? 1 : 0.5;
          }
          return 1;
        };

        return (
          <div
            {...storyblokEditable(card)}
            className={`stackedCards stacked-card-item ${isLastCard ? 'last-card' : ''}`}
            style={{
              backgroundImage: `url(${cardImage ? cardImage : card?.background_image[0].filename})`,
              opacity: getOpacity(),
            }}
            key={card._uid || index}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={handleCardMouseLeave}
          >
            <div
              className={`stacked-card-content ${isLastCard ? 'last-card' : ''}`}
            >
              {card?.eyebrow && <RichTextRenderer document={card.eyebrow} />}
              <div {...storyblokEditable(card.header)}>
                <RichTextRenderer document={card.header} />
              </div>
              <div {...storyblokEditable(card.body_copy)}>
                <RichTextRenderer document={card.body_copy} />
              </div>
            </div>

            <div className={`stacked-card-buttons ${isLastCard ? 'last-card' : ''}`}>
              {card?.link?.map(($buttonData) => (
                <div
                  {...storyblokEditable($buttonData)}
                  key={$buttonData?.link_text}
                >
                  <Button $buttonData={$buttonData} />
                </div>
              ))}
            </div>

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
          </div>
        );
      })}
      </div>
    </>
  );
});

StackedCardsTailwind.displayName = 'StackedCardsTailwind';

export default StackedCardsTailwind;
