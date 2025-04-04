"use client";
import React, { useEffect } from "react";

import styled from "styled-components";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "styles/media";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import colors from "@/styles/colors";
import ComponentRenderer from "../renderers/ComponentRenderer";
import gsap from "gsap";

const Rotator = ({ rotatorData }) => {
  // console.log(rotatorData)
  const copycomponents = [
    "body_copy",
    "header",
    "eyebrow",
    "long_form_text",
    "copy_block",
  ];

  useEffect(() => {
    gsap.set(".rotator", { autoAlpha: 0 });
    gsap.set("#rotator-1", { autoAlpha: 1 });

    const tabs = gsap.utils.toArray(".rotator-tabs");

    tabs.forEach((tab, index) => {
      const tl = gsap.timeline({});
      tab.addEventListener("click", () => {
        tl.to(".rotator", { autoAlpha: 0, filter: "blur(2px)", duration: 0.45 })
          .to(`.rotator-tabs`, { background: "transparent", duration: 0.25 })
          .to(
            `#rotator-tab-${index}`,
            { background: "linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)" },
            "<",
          )
          .to(
            `#rotator-${index}`,
            { autoAlpha: 1, filter: "blur(0px)", duration: 0.25 },
            "<",
          );
      });
    });
  }, []);

  const tabMap = rotatorData.map((tab, index) => (
    <Tab
      className="rotator-tabs"
      id={`rotator-tab-${index}`}
      key={`${tab.tab_icon.filename}-${index}`}
    >
      <TabIcon src={tab.tab_icon.filename} />
      <RichTextRenderer
        key={`tab-richtext-${index}`}
        document={tab.tab[0].copy}
      />
    </Tab>
  ));

  const cardMap = rotatorData.map((card, index) => (
    <BackgroundImage
      id={`rotator-${index}`}
      className="rotator"
      key={`${card.component}-${index}`}
      backgroundImage={card.background_images}
    >
      <ContentContainer>
        {card.copy.map((item, index) =>
          copycomponents.includes(item.component) ? (
            <RichTextRenderer
              key={`card-richtext-${index}`}
              document={item.copy}
              blok={item}
            />
          ) : (
            <ComponentRenderer key={`component-${index}`} blok={item} />
          ),
        )}
      </ContentContainer>
    </BackgroundImage>
  ));
  return (
    <Wrapper>
      <Tabs>{tabMap}</Tabs>
      <CardBackground>{cardMap}</CardBackground>
    </Wrapper>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75vw;
  width: 27.438vw;

  ${media.fullWidth} {
    gap: 12px;
    width: 439px;
  }

  ${media.tablet} {
    gap: 1.172vw;
    width: 42.871vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
    width: 74.167vw;
  }
`;
const BackgroundImage = styled.div`
  position: absolute;
  padding: 3.25vw;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => `url(${props.backgroundImage?.[0].filename})`};
  background-size: 100% 100%;
  background-repeat: no-repeat;

  ${media.fullWidth} {
    background: ${(props) => `url(${props.backgroundImage?.[0].filename})`};
    background-size: 100% 100%;
    background-repeat: no-repeat;

    padding: 52px;
  }

  ${media.tablet} {
    padding: 4.492vw;
    background: ${(props) => `url(${props.backgroundImage?.[1].filename})`};
  }

  ${media.mobile} {
    padding: 7.083vw;
    background: ${(props) => `url(${props.backgroundImage?.[2].filename})`};
  }
`;
const CardBackground = styled.div`
  position: relative;
  overflow: hidden;
  background: ${colors.purple100};
  width: 81.5vw;
  height: 38.875vw;
  border-radius: 1.25vw;

  ${media.fullWidth} {
    width: 1304px;
    height: 622px;
    border-radius: 20px;
  }

  ${media.tablet} {
    width: 84.375vw;
    height: 60.742vw;
    border-radius: 1.953vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    height: 89.167vw;
    border-radius: 4.167vw;
  }
`;
const TabIcon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;
const Tab = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
  padding: 0.25vw;
  border-radius: 0.25vw;

  ${media.fullWidth} {
    gap: 8px;
    padding: 4px;
    border-radius: 4px;
  }

  ${media.tablet} {
    gap: 0.781vw;
    padding: 0.391vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
    padding: 0.833vw;
    border-radius: 0.833vw;
  }
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vw;
  width: 81.5vw;

  ${media.fullWidth} {
    gap: 32px;
    width: 81.5vw;
  }

  ${media.tablet} {
    width: 84.375vw;
    gap: 1.953vw;
  }

  ${media.mobile} {
    width: 89.167vw;
    gap: 4.167vw;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1.5vw;

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5vw;
  }
`;
export default Rotator;
