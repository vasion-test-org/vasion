'use client';
import React, { useEffect, useRef } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled from 'styled-components';

import getMedia from '@/functions/getMedia';
import media from '@/styles/media';

const G2BadgeAnimation = ({ blok }) => {
  const leftImageRefs = useRef([]);
  const rightImageRefs = useRef([]);
  const centerImageRef = useRef(null);

  const renderImages = (image_assets, refsArray, side) => {
    if (!image_assets || image_assets.length === 0) {
      return null;
    }
    const maxZIndex = image_assets.length - 1;

    return image_assets.map((image, index) => {
      const zIndex = side === 'left' ? index : image_assets.length - 1 - index;
      const scale = 0.85 + (zIndex / maxZIndex) * 0.15;

      return (
        <BadgeImage
          $scale={scale}
          $zIndex={zIndex}
          alt={image?.alt || 'g2-badge'}
          key={image.id}
          ref={(el) => (refsArray.current[index] = el)}
          src={image?.filename}
        />
      );
    });
  };

  useEffect(() => {
    let ctx;

    const initAnimation = async () => {
      const { default: gsap } = await import('gsap');

      if (
        leftImageRefs.current.length === 0 ||
        rightImageRefs.current.length === 0 ||
        !centerImageRef.current
      )
        return;

      ctx = gsap.context(() => {
        // Initial entrance animations
        const entranceTl = gsap.timeline();

        entranceTl
          .from(centerImageRef.current, {
            duration: 0.8,
            ease: 'back.out(1.7)',
            rotation: 180,
            scale: 0,
          })
          .from(
            leftImageRefs.current,
            {
              duration: 0.6,
              ease: 'power3.out',
              opacity: 0,
              rotation: -45,
              stagger: 0.15,
              x: -100,
            },
            '-=0.4'
          )
          .from(
            rightImageRefs.current,
            {
              duration: 0.6,
              ease: 'power3.out',
              opacity: 0,
              rotation: 45,
              stagger: 0.15,
              x: 100,
            },
            '<'
          );
        const INITIAL_FRONT_BADGES = {
          left: 1, // NOTE: Left side starts with second badge (index 1) in front
          right: 0, // NOTE: Right side starts with first badge (index 0) in front
        };

        entranceTl.call(() => {
          // Track current front badge
          const currentFront = { ...INITIAL_FRONT_BADGES };

          const createLoopCycle = () => {
            const currentBack = {
              left: currentFront.left === 1 ? 0 : 1,
              right: currentFront.right === 0 ? 1 : 0,
            };

            /*NOTE: Determine if we're returning to original positions */

            const isReturningToOriginal = {
              left: currentFront.left === INITIAL_FRONT_BADGES.left,
              right: currentFront.right === INITIAL_FRONT_BADGES.right,
            };

            const Offset = getMedia(30, 29, 24, 24);
            const GrowthOffset = getMedia(5, 5, 3, 5);
            const shrinkMax = getMedia('120%', '120%', '118%', '115%');
            const shrinkMin = '108%';

            const animConfig = {
              left: {
                offset: isReturningToOriginal.left ? `-${Offset}` : 0,
                returningToFront: isReturningToOriginal.left ? `${GrowthOffset}` : '0',
                transitionToMiddle: !isReturningToOriginal.left ? `${shrinkMax}` : `${shrinkMin}`,
              },
              right: {
                offset: isReturningToOriginal.right ? `${Offset}` : 0,
                returningToFront: isReturningToOriginal.right ? `-${GrowthOffset}` : '0',
                transitionToMiddle: !isReturningToOriginal.right
                  ? `-${shrinkMax}`
                  : `-${shrinkMin}`,
              },
            };

            const loopTl = gsap.timeline({
              onComplete: () => {
                // Toggle to the other badge
                currentFront.left = currentFront.left === 1 ? 0 : 1;
                currentFront.right = currentFront.right === 0 ? 1 : 0;
                createLoopCycle();
              },
            });

            /* NOTE: Front badges to center */
            loopTl
              .to(
                leftImageRefs.current[currentFront.left],
                {
                  duration: 1.5,
                  ease: 'power2.inOut',
                  scale: 0.85,
                  x: animConfig.left.transitionToMiddle,
                },
                0
              )
              .to(
                rightImageRefs.current[currentFront.right],
                {
                  duration: 1.5,
                  ease: 'power2.inOut',
                  scale: 0.85,
                  x: animConfig.right.transitionToMiddle,
                },
                0
              )
              // NOTE: Animate back badges scale up AS front badges move away
              .to(
                leftImageRefs.current[currentBack.left],
                {
                  duration: 1,
                  ease: 'power2.inOut',
                  scale: 1,
                  x: animConfig.left.returningToFront,
                },
                0
              )
              .to(
                rightImageRefs.current[currentBack.right],
                {
                  duration: 1,
                  ease: 'power2.inOut',
                  scale: 1,
                  x: animConfig.right.returningToFront,
                },
                0
              )

              /* NOTE: SWITCH Z-INDEX RIGHT AT CENTER */
              .set(leftImageRefs.current[currentFront.left], { zIndex: 0 })
              .set(rightImageRefs.current[currentFront.right], { zIndex: 0 })
              .set(leftImageRefs.current[currentBack.left], { zIndex: 1 })
              .set(rightImageRefs.current[currentBack.right], { zIndex: 1 })

              /* NOTE: Pause at center */
              .to({}, { duration: 0.5 })

              /* NOTE: Returning badges slide back */
              .to(leftImageRefs.current[currentFront.left], {
                duration: 1,
                ease: 'power2.inOut',
                scale: 0.85,
                x: animConfig.left.offset,
              })
              .to(
                rightImageRefs.current[currentFront.right],
                {
                  duration: 1,
                  ease: 'power2.inOut',
                  scale: 0.85,
                  x: animConfig.right.offset,
                },
                '<'
              )

              /* NOTE: Brief pause before next cycle */
              .to({}, { duration: 1 });
          };

          gsap.delayedCall(1, createLoopCycle);
        });
      });
    };

    initAnimation();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  if (!blok) return null;

  return (
    <Wrapper {...storyblokEditable(blok)}>
      <AnimationWrapper>
        <LeftImages>{renderImages(blok.left_assets, leftImageRefs, 'left')}</LeftImages>
        <CenteredBadge
          alt={blok?.center_image?.alt || 'centered g2 badge'}
          ref={centerImageRef}
          src={blok?.center_image?.filename}
        />
        <RightImages>{renderImages(blok.right_assets, rightImageRefs, 'right')}</RightImages>
      </AnimationWrapper>
    </Wrapper>
  );
};

export default G2BadgeAnimation;

const BadgeImage = styled.img`
  width: 6.25vw;
  height: 6.25vw;
  position: relative;
  z-index: ${(props) => props.$zIndex || 0};
  transform: scale(${(props) => props.$scale || 1});
  transform-origin: center;

  ${media.fullWidth} {
    width: 100px;
    height: 100px;
  }
  ${media.tablet} {
    width: 9.766vw;
    height: 9.766vw;
  }
  ${media.mobile} {
    width: 20.833vw;
    height: 20.833vw;
  }
`;

const LeftImages = styled.div`
  display: flex;
  position: relative;

  ${BadgeImage}:not(:first-child) {
    margin-left: -5vw;
  }

  ${media.fullWidth} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -80px;
    }
  }

  ${media.tablet} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -8vw;
    }
  }

  ${media.mobile} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -18vw;
    }
  }
`;

const RightImages = styled.div`
  display: flex;
  position: relative;

  ${BadgeImage}:not(:first-child) {
    margin-left: -5vw;
  }

  ${media.fullWidth} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -80px;
    }
  }

  ${media.tablet} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -8vw;
    }
  }

  ${media.mobile} {
    ${BadgeImage}:not(:first-child) {
      margin-left: -18vw;
    }
  }
`;

const CenteredBadge = styled.img`
  width: 6.25vw;
  height: 6.25vw;
  position: relative;
  z-index: 5;

  ${media.fullWidth} {
    width: 100px;
    height: 100px;
  }
  ${media.tablet} {
    width: 9.766vw;
    height: 9.766vw;
  }
  ${media.mobile} {
    width: 20.833vw;
    height: 20.833vw;
  }
`;

const AnimationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;

  ${media.fullWidth} {
    gap: 16px;
  }
  ${media.tablet} {
    gap: 1.27vw;
  }
  ${media.mobile} {
    gap: 2.708vw;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75vw;

  ${media.fullWidth} {
    margin-bottom: 12px;
  }
  ${media.tablet} {
    margin-bottom: 1.172vw;
  }
  ${media.mobile} {
    margin-bottom: 2.5vw;
  }
`;
