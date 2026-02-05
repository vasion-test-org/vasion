'use client';
import React, { useContext, useEffect, useState } from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled from 'styled-components';
import media from 'styles/media';

import { ScreenContext } from '@/components/providers/Screen';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import useMedia from '@/functions/useMedia';
import colors from '@/styles/colors';

import ComponentRenderer from '../renderers/ComponentRenderer';

const Rotator = ({ rotatorData }) => {
  const { mobile } = useContext(ScreenContext);
  const copycomponents = ['body_copy', 'header', 'eyebrow', 'long_form_text', 'copy_block'];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const backgroundImages = rotatorData.map((card) =>
    useMedia(
      card.background_images[0],
      card.background_images[0],
      card?.background_images[1],
      card?.background_images[2] || 'unset'
    )
  );

  /*
      ImagesLoaded is never actually used but this imagesPromise PreRenders
      the images making them available/accessible in the browsers cache. 
      Tested with and without and without this there is a noticable glitch 
      when react trys to access background: url(${props.backgroundImage})

      <--------------------------------------> 
   */

  useEffect(() => {
    const imagePromises = backgroundImages.map((bg) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = bg.filename;
      });
    });
    /*
      <--------------------------------------> 
   */
    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((error) => {
        console.error('Failed to preload one or more rotator images:', error);
        setImagesLoaded(true);
      });
  }, [backgroundImages]);

  const handleTabClick = async (index) => {
    const { default: gsap } = await import('gsap');

    if (mobile) {
      gsap.to('#mobile-active-card', {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: () => {
          setActiveCardIndex(index);
          gsap.to('#mobile-active-card', { autoAlpha: 1, duration: 0.3 });
        },
      });

      gsap.to(`.rotator-tabs`, { background: 'transparent', duration: 0.25 });
      gsap.to(`#rotator-tab-${index}`, {
        background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)',
        duration: 0.25,
      });
    } else {
      const tl = gsap.timeline({});
      tl.to('.rotator', { autoAlpha: 0, duration: 0.45, filter: 'blur(2px)' })
        .to(`.rotator-tabs`, { background: 'transparent', duration: 0.25 })
        .to(
          `#rotator-tab-${index}`,
          { background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)' },
          '<'
        )
        .to(`#rotator-${index}`, { autoAlpha: 1, duration: 0.25, filter: 'blur(0px)' }, '<');
    }
  };

  useEffect(() => {
    const initRotator = async () => {
      const { default: gsap } = await import('gsap');

      if (!mobile) {
        gsap.set('.rotator', { autoAlpha: 0 });
        gsap.set('#rotator-0', { autoAlpha: 1 });
      }
      gsap.set('#rotator-tab-0', {
        background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)',
      });
    };

    initRotator();
  }, [mobile]);

  const tabMap = rotatorData.map((tab, index) => (
    <Tab
      className="rotator-tabs"
      id={`rotator-tab-${index}`}
      key={`${tab.tab_icon.filename}-${index}`}
      onClick={() => handleTabClick(index)}
    >
      <TabIcon src={tab.tab_icon.filename} />
      <RichTextRenderer document={tab.tab[0].copy} key={`tab-richtext-${index}`} />
    </Tab>
  ));

  const cardMap = !mobile
    ? rotatorData.map((card, index) => {
        const cardBg = backgroundImages[index];
        return (
          <React.Fragment key={`${card.component}-${index}`}>
            <BackgroundImage
              backgroundImage={cardBg.filename}
              className="rotator"
              id={`rotator-${index}`}
            >
              <ContentContainer>
                {card.copy.map((item, itemIndex) =>
                  copycomponents.includes(item.component) ? (
                    <RichTextRenderer
                      blok={item}
                      document={item.copy}
                      key={`card-richtext-${itemIndex}`}
                    />
                  ) : (
                    <ComponentRenderer blok={item} key={`component-${itemIndex}`} />
                  )
                )}
              </ContentContainer>
            </BackgroundImage>
          </React.Fragment>
        );
      })
    : [];

  const mobileActiveCard = mobile && rotatorData[activeCardIndex] && (
    <MobileContainer id="mobile-active-card" key={`mobile-${activeCardIndex}`}>
      <ContentContainer>
        {rotatorData[activeCardIndex].copy.map((item) =>
          copycomponents.includes(item.component) ? (
            <RichTextRenderer blok={item} document={item.copy} key={item._uid} />
          ) : (
            <ComponentRenderer blok={item} key={item._uid} />
          )
        )}
      </ContentContainer>

      <MobileImage alt="" src={backgroundImages[activeCardIndex].filename} />
    </MobileContainer>
  );

  return (
    <Wrapper>
      <Tabs>{tabMap}</Tabs>
      <CardBackground mobile={mobile}>{!mobile ? cardMap : mobileActiveCard}</CardBackground>
    </Wrapper>
  );
};

const MobileContainer = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
    padding: 3.333vw;
    gap: 1.667vw;
    width: 100%;
  }
`;

const MobileImage = styled.img`
  ${media.mobile} {
    width: 82.5vw;
    height: auto;
    display: block;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
`;

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
  background: ${(props) =>
    props.backgroundImage ? `url(${props.backgroundImage})` : colors.purpleTag};
  background-size: 100% 100%;
  background-repeat: no-repeat;

  ${media.fullWidth} {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 52px;
  }

  ${media.tablet} {
    padding: 4.492vw;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
`;

const CardBackground = styled.div`
  position: relative;
  overflow: hidden;
  background: ${colors.purple100};
  width: 81.5vw;
  border-radius: 1.25vw;
  height: ${(props) => (props.mobile ? 'auto' : '38.875vw')};
  min-height: ${(props) => (props.mobile ? '50vw' : 'unset')};

  ${media.fullWidth} {
    width: 1304px;
    border-radius: 20px;
    height: ${(props) => (props.mobile ? 'auto' : '622px')};
    min-height: ${(props) => (props.mobile ? '400px' : 'unset')};
  }

  ${media.tablet} {
    width: 84.375vw;
    border-radius: 1.953vw;
    height: ${(props) => (props.mobile ? 'auto' : '60.742vw')};
    min-height: ${(props) => (props.mobile ? '60vw' : 'unset')};
  }

  ${media.mobile} {
    width: 89.167vw;
    border-radius: 4.167vw;
    height: auto;
    min-height: 80vw;
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
  cursor: pointer;
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
