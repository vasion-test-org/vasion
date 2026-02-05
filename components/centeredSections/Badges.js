'use client';
import React, { useEffect } from 'react';

import styled from 'styled-components';

import { horizontalLoop } from '@/functions/horizontalLoop';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

import RichTextRenderer from '../renderers/RichTextRenderer';

const G2Badges = ({ badges }) => {
  function splitBadges(badges, n) {
    const badgesGroup = [];
    for (let i = 0, j = 0; i < badges?.length; i++) {
      if (i >= n && i % n === 0) j++;
      badgesGroup[j] = badgesGroup[j] || [];
      badgesGroup[j].push(badges[i]);
    }
    return badgesGroup;
  }

  const badgesArrays = splitBadges(badges?.badge_cards, 3);
  const allBadges = badgesArrays.map((badge, index) => (
    <BadgesInnerDiv className="badgeGroup" key={index}>
      {badge.map((badge, badge_index) => (
        <BadgeDiv key={badge_index}>
          <BadgeImage
            alt={badge?.badge_image.alt}
            className="badges"
            src={badge.badge_image.filename}
          />
          <BadgeContent>
            <BadgeTitle>{badge.badge_name}</BadgeTitle>
            <BadgeCopy>
              <RichTextRenderer document={badge.body_copy} />
            </BadgeCopy>
          </BadgeContent>
        </BadgeDiv>
      ))}
    </BadgesInnerDiv>
  ));

  const progressBars = badgesArrays.map((_, index) => (
    <ProgressBar key={index}>
      <ProgressValue className="pro-bar" />
    </ProgressBar>
  ));

  useEffect(() => {
    const initBadgeAnimations = async () => {
      const { default: gsap } = await import('gsap');

      const badgeGroups = gsap.utils.toArray('.badgeGroup');

      const loop = horizontalLoop(badgeGroups, { deep: false, paused: true });

      function NextLoop() {
        loop.next({ duration: 2, ease: 'slow' });
      }

      const loopTL = gsap.timeline({});
      loopTL.set(NextLoop, {
        delay: 7,
        onRepeat: NextLoop,
        repeat: -1,
        repeatDelay: 7,
      });

      const progressTL = gsap.timeline({
        defaults: {
          duration: 7,
        },
      });

      progressTL.to('.pro-bar', {
        delay: 0.75,
        repeat: -1,
        stagger: 7,
        width: '100%',
      });
    };

    initBadgeAnimations();
  }, []);

  return (
    <Wrapper>
      <BadgesDiv>{allBadges}</BadgesDiv>
      <ProgessBarsDiv>{progressBars}</ProgessBarsDiv>
    </Wrapper>
  );
};

const ProgressBar = styled.div`
  background-color: #87789e;
  overflow: hidden;
  width: 4.306vw;
  height: 0.347vw;
  border-radius: 1.667vw;

  ${media.fullWidth} {
    width: 62px;
    height: 5px;
    border-radius: 24px;
  }

  ${media.tablet} {
    width: 6.055vw;
    height: 0.488vw;
    border-radius: 2.344vw;
  }

  ${media.mobile} {
  }
`;
const ProgressValue = styled.div`
  width: 0%;
  height: 100%;
  background-color: ${colors.white};
`;
const ProgessBarsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.389vw;

  ${media.fullWidth} {
    gap: 20px;
  }

  ${media.tablet} {
    gap: 1.953vw;
  }

  ${media.mobile} {
  }
`;
const BadgeImage = styled.img`
  display: flex;
  align-self: center;
  width: 13.75vw;
  height: 17.917vw;

  ${media.fullWidth} {
    width: 198px;
    height: 258px;
  }

  ${media.tablet} {
    width: 19.336vw;
    height: 25.195vw;
  }
`;
const BadgeCopy = styled.div`
  ${text.bodyMd};
`;
const BadgeTitle = styled.p`
  ${text.h5};

  ${media.mobile} {
    ${text.h4};
  }
`;
const BadgeContent = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 21.528vw;
  gap: 0.972vw;

  ${media.fullWidth} {
    width: 310px;
    gap: 14px;
  }

  ${media.tablet} {
    width: 26.172vw;
    gap: 1.367vw;
  }
`;
const BadgeDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.667vw;
  border-radius: 1.667vw;
  width: 24.583vw;
  height: 29.653vw;
  background: linear-gradient(212deg, rgba(118, 88, 205, 0.8) 0%, rgba(118, 88, 205, 0.1) 101.67%);
  /* border: 0.069vw solid #FFF; */
  box-shadow: 0vw 0.278vw 0.278vw 0vw rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(0.069vw);

  ${media.fullWidth} {
    /* border: 1px solid ${colors.white}; */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(1px);
    padding: 24px;
    border-radius: 24px;
    width: 354px;
    height: 427px;
  }

  ${media.tablet} {
    box-shadow: 0vw 0.391vw 0.391vw 0vw rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(0.098vw);
    padding: 2.344vw;
    border-radius: 2.344vw;
    width: 29.297vw;
    height: 43.945vw;
  }
`;
const BadgesInnerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
  min-width: 100%;
  height: 100%;
  gap: 2.778vw;

  ${media.fullWidth} {
    gap: 40px;
  }

  ${media.tablet} {
    gap: 2.148vw;
  }

  ${media.mobile} {
  }
`;
const BadgesDiv = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 79.444vw;
  gap: 2.778vw;
  padding-bottom: 0.347vw;

  ${media.fullWidth} {
    width: 1144px;
    gap: 40px;
    padding-bottom: 5px;
  }

  ${media.tablet} {
    width: 92.188vw;
    gap: 2.148vw;
    padding-bottom: 0.488vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.778vw;

  ${media.fullWidth} {
    gap: 40px;
  }

  ${media.tablet} {
    gap: 3.906vw;
  }

  ${media.mobile} {
  }
`;
const G2BadgesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  padding: 0 10.278vw;

  ${media.fullWidth} {
    padding: 0 148px;
  }

  ${media.tablet} {
    padding: 0 3.906vw;
  }

  ${media.mobile} {
    padding: 0 6.075vw;
  }
`;
export default G2Badges;
