'use client';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';

const G2BadgeAnimation = ({ blok }) => {
  // console.log('G2 Badge Animation->', blok);

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
          key={image.id}
          ref={(el) => (refsArray.current[index] = el)}
          src={image?.filename}
          alt={image?.alt || 'g2-badge'}
          $zIndex={zIndex}
          $scale={scale}
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
            scale: 0,
            rotation: 180,
            duration: 0.8,
            ease: 'back.out(1.7)',
          })
          .from(
            leftImageRefs.current,
            {
              x: -100,
              opacity: 0,
              rotation: -45,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power3.out',
            },
            '-=0.4',
          )
          .from(
            rightImageRefs.current,
            {
              x: 100,
              opacity: 0,
              rotation: 45,
              duration: 0.6,
              stagger: 0.15,
              ease: 'power3.out',
            },
            '<',
          );

        // NOTE:Wait for entrance completion

        entranceTl.call(() => {
          // Track which badge is currently in front
          let leftFrontIndex = 1;
          let rightFrontIndex = 0;

          const leftOriginalFront = 1;
          const rightOriginalFront = 0;

          const createLoopCycle = () => {
            const leftBackIndex = leftFrontIndex === 1 ? 0 : 1;
            const rightBackIndex = rightFrontIndex === 0 ? 1 : 0;

            const Offset = 24; // This offset is the offset the original top needs to move after shrinking into the center
            const GrowthOffset = 5; // The offset of the secondary Badge when replacing the original top
            const ShrinkMax = '115%'; // This is the second badge behind the original first needs to shrink farther than top

            const animConfig = {
              left: {
                offset: leftFrontIndex === leftOriginalFront ? `-${Offset}` : 0,
                returningToFront:
                  leftFrontIndex === leftOriginalFront
                    ? `${GrowthOffset}`
                    : '-6',
                transitionToMiddle:
                  leftFrontIndex != leftOriginalFront ? `${ShrinkMax}` : '108%',
              },
              right: {
                offset:
                  rightFrontIndex === rightOriginalFront ? `${Offset}` : 0,
                returningToFront:
                  rightFrontIndex === rightOriginalFront
                    ? `-${GrowthOffset}`
                    : '6',
                transitionToMiddle:
                  rightFrontIndex != rightOriginalFront
                    ? `-${ShrinkMax}`
                    : '-108%',
              },
            };

            const loopTl = gsap.timeline({
              onComplete: () => {
                leftFrontIndex = leftFrontIndex === 1 ? 0 : 1;
                rightFrontIndex = rightFrontIndex === 0 ? 1 : 0;
                //NOTE: starts next cycle recursivley
                createLoopCycle();
              },
            });

            /*NOTE:Front badges to center */
            loopTl
              .to(
                leftImageRefs.current[leftFrontIndex],
                {
                  x: animConfig.left.transitionToMiddle,
                  scale: 0.85,
                  duration: 1.5,
                  ease: 'power2.inOut',
                },
                0,
              )
              .to(
                rightImageRefs.current[rightFrontIndex],
                {
                  x: animConfig.right.transitionToMiddle,
                  scale: 0.85,
                  duration: 1.5,
                  ease: 'power2.inOut',
                },
                0,
              )
              // NOTE:Animate back badges scale up AS front badges move away
              .to(
                leftImageRefs.current[leftBackIndex],
                {
                  scale: 1,
                  x: animConfig.left.returningToFront,
                  duration: 1,
                  ease: 'power2.inOut',
                },
                0,
              )
              .to(
                rightImageRefs.current[rightBackIndex],
                {
                  scale: 1,
                  x: animConfig.right.returningToFront,
                  duration: 1,
                  ease: 'power2.inOut',
                },
                0,
              )

              /*NOTE:SWITCH Z-INDEX RIGHT AT CENTER  front badges go below, back badges come to front */
              .set(leftImageRefs.current[leftFrontIndex], { zIndex: 0 })
              .set(rightImageRefs.current[rightFrontIndex], { zIndex: 0 })
              .set(leftImageRefs.current[leftBackIndex], { zIndex: 1 })
              .set(rightImageRefs.current[rightBackIndex], { zIndex: 1 })

              /*NOTE:Pause at center */
              .to({}, { duration: 0.5 })

              /* NOTE:Returning badges slide back (already have correct z-index) */
              .to(leftImageRefs.current[leftFrontIndex], {
                x: animConfig.left.offset,
                scale: 0.85,
                duration: 1,
                ease: 'power2.inOut',
              })
              .to(
                rightImageRefs.current[rightFrontIndex],
                {
                  x: animConfig.right.offset,
                  scale: 0.85,
                  duration: 1,
                  ease: 'power2.inOut',
                },
                '<',
              )

              /* NOTE: Brief pause before next cycle */
              .to({}, { duration: 1 });
          };
          //NOTE: Start the first cycle after a delay
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
        <LeftImages>
          {renderImages(blok.left_assets, leftImageRefs, 'left')}
        </LeftImages>
        <CenteredBadge
          ref={centerImageRef}
          src={blok?.center_image?.filename}
          alt={blok?.center_image?.alt || 'centered g2 badge'}
        />
        <RightImages>
          {renderImages(blok.right_assets, rightImageRefs, 'right')}
        </RightImages>
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
  z-index: 10;

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
  gap: 0.3vw;

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
