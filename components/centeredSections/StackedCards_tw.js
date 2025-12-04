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
      { threshold: 0.1, rootMargin: '50px' },
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
    <div
      ref={containerRef}
      className="mt-[1.389vw] aspect-[419/327] w-full h-auto fullWidth:mt-5 fullWidth:h-[349px] tablet:mt-0 tablet:aspect-[298/248] tablet:h-[24.219vw] mobile:mt-0 mobile:w-full mobile:h-[67.917vw]"
    >
      {shouldLoadRive ? <RiveComponent /> : null}
    </div>
  );
};

const StackedCards_tw = React.memo(({ blok }) => {
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

  // Extract className constants for better readability
  const baseCardClasses =
    'stackedCards flex flex-col bg-cover bg-center bg-no-repeat transition-opacity duration-300 ease-out rounded-[0.833vw] gap-[0.75vw]';

  const lastCardClasses =
    'h-fit w-[81.5vw] py-[2.688vw] px-[3.75vw] fullWidth:h-fit fullWidth:w-[1304px] fullWidth:py-[43px] fullWidth:px-[60px] fullWidth:rounded-xl fullWidth:gap-3 tablet:w-[89.488vw] tablet:p-[3.906vw] tablet:rounded-[1.172vw] tablet:opacity-100 mobile:w-[89.167vw] mobile:h-[171.042vw] mobile:py-[5.417vw] mobile:px-[8.333vw] mobile:rounded-[2.804vw] mobile:opacity-100';

  const regularCardClasses =
    'h-[37.5vw] w-[26.688vw] p-[1.25vw] fullWidth:h-[600px] fullWidth:w-[427px] fullWidth:p-5 fullWidth:rounded-xl fullWidth:gap-3 tablet:w-[29.102vw] tablet:p-[1.953vw] tablet:h-[45.953vw] tablet:rounded-[1.172vw] tablet:opacity-100 mobile:h-fit mobile:p-[4.167vw] mobile:rounded-[2.804vw] mobile:opacity-100';

  const lastCardContentClasses =
    'w-[33.25vw] gap-[0.75vw] fullWidth:w-[532px] fullWidth:gap-3 tablet:w-[38.281vw] tablet:gap-[1.172vw] mobile:w-[78.333vw] mobile:gap-[2.5vw]';

  const regularCardContentClasses =
    'w-fit gap-[0.5vw] fullWidth:gap-2 tablet:h-[17.16vw] tablet:gap-[0.781vw] mobile:gap-[1.667vw]';

  const lastCardButtonClasses =
    'mt-[2.5vw] fullWidth:gap-6 fullWidth:mt-10 tablet:gap-[2.344vw] mobile:gap-[5.607vw]';

  const regularCardButtonClasses =
    'mt-[1.125vw] fullWidth:gap-6 fullWidth:mt-[18px] tablet:gap-[2.344vw] mobile:gap-[5.607vw]';

  return (
    <div
      ref={stackedCardsRef}
      className="relative flex flex-row flex-wrap items-center justify-center gap-[0.75vw] w-full fullWidth:w-[1350px] fullWidth:gap-6 tablet:gap-[1.172vw] mobile:gap-[5vw]"
    >
      {blok.map((card, index) => {
        const isLastCard = index === blok?.length - 1;
        const cardImage = getMedia(
          card?.background_image[0]?.filename,
          card?.background_image[0]?.filename,
          card?.background_image[1]?.filename,
          card?.background_image[2]?.filename,
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
            className={`${baseCardClasses} ${
              isLastCard ? lastCardClasses : regularCardClasses
            }`}
            style={{
              backgroundImage: `url(${cardImage ? cardImage : card?.background_image[0].filename})`,
              opacity: getOpacity(),
            }}
            key={card._uid || index}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={handleCardMouseLeave}
          >
            <div
              className={`flex flex-col whitespace-nowrap hyphens-none ${
                isLastCard ? lastCardContentClasses : regularCardContentClasses
              }`}
            >
              {card?.eyebrow && <RichTextRenderer document={card.eyebrow} />}
              <div {...storyblokEditable(card.header)}>
                <RichTextRenderer document={card.header} />
              </div>
              <div {...storyblokEditable(card.body_copy)}>
                <RichTextRenderer document={card.body_copy} />
              </div>
            </div>

            <div
              className={`flex flex-row items-center w-max gap-[1.667vw] ${
                isLastCard ? lastCardButtonClasses : regularCardButtonClasses
              }`}
            >
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
  );
});

StackedCards_tw.displayName = 'StackedCards_tw';

export default StackedCards_tw;
