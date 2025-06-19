import React, { useEffect, useContext, useRef } from "react";

import gsap from "gsap";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import { ScreenContext } from "@/components/providers/Screen";

import { horizontalLoop } from "@/functions/horizontalLoop";
import RichTextRenderer from "../renderers/RichTextRenderer";

const G2BadgesMobile = ({ badges }) => {
  const { mobile } = useContext(ScreenContext);
  const countRef = useRef(1);
  const allBadges = badges.badge_cards.map((badges, index) => (
    <BadgeDiv className="badges">
      <BadgeImage
        src={badges.badge_image.filename}
        alt={badges?.badge_image?.alt}
      />
      <BadgeContent>
        <BadgeTitle>{badges.badge_name}</BadgeTitle>
        <RichTextRenderer document={badges.body_copy} />
      </BadgeContent>
    </BadgeDiv>
  ));

  useEffect(() => {
    const badges = gsap.utils.toArray(".badges");
    const badgeCounter = document.querySelector("#badgeCounter");

    const loop = horizontalLoop(badges, { paused: true });

    function NextLoop() {
      loop.next({ duration: 2, ease: "slow" });

      if (countRef.current >= badges.length) {
        countRef.current = 1;
      } else {
        countRef.current += 1;
        badgeCounter.innerHTML = countRef.current;
      }
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

    progressTL.to(".pro-bar", {
      delay: 0.75,
      stagger: 7,
      width: "100%",
      repeat: -1,
    });

    // function Pause() {
    //   progressTL.restart()
    //   progressTL.kill()
    //   loopTL.kill()
    // }

    // document
    //   .querySelector(".badgeGroup")
    //   .addEventListener("click", () => Pause())
  }, []);

  return (
    <Wrapper>
      <BadgesDiv>{allBadges}</BadgesDiv>
      <ProgessBarsDiv>
        <ProgressBar>
          <ProgressValue className="pro-bar" />
        </ProgressBar>
      </ProgessBarsDiv>

        <BadgeCounterDiv>
          <BadgeCounter id="badgeCounter">{countRef.current}</BadgeCounter>/
          {badges.badge_cards.length}
        </BadgeCounterDiv>
   
    </Wrapper>
  );
};

const BadgeCounter = styled.span``;
const BadgeCounterDiv = styled.div`
  ${text.bodySm};
  width: auto;
  height: auto;
`;
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
    width: 23.364vw;
    height: 1.168vw;
    border-radius: 5.607vw;
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
  ${media.mobile} {
    width: 46.262vw;
    height: 60.28vw;
  }
`;
const BadgeCopy = styled.p`
  ${text.bodyMd};
`;
const BadgeTitle = styled.p`
  ${text.h4};
`;
const BadgeContent = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  ${media.mobile} {
    width: 72.43vw;
    gap: 3.271vw;
  }
`;
const BadgeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile} {
    padding: 5.607vw;
    border-radius: 5.607vw;
    background: linear-gradient(
      212deg,
      rgba(118, 88, 205, 0.8) 0%,
      rgba(118, 88, 205, 0.1) 101.67%
    );
    box-shadow: 0vw 0.935vw 0.935vw 0vw rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(0.234vw);
    width: 82.71vw;
    height: 102.458vw;
  }
`;
const BadgesDiv = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 79.444vw;
  gap: 2.778vw;

  ${media.fullWidth} {
    width: 1144px;
    gap: 40px;
  }

  ${media.tablet} {
    width: 92.188vw;
    gap: 2.148vw;
  }

  ${media.mobile} {
    width: 82.71vw;
    padding-bottom: 1.168vw;
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
export default G2BadgesMobile;
