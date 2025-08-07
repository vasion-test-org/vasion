'use client';
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { ScreenContext } from '@/components/providers/Screen';
import colors from '@/styles/colors';
import ComponentRenderer from '../renderers/ComponentRenderer';
import gsap from 'gsap';
import useMedia from '@/functions/useMedia';

const Rotator = ({ rotatorData }) => {
  const { mobile } = useContext(ScreenContext);
  const copycomponents = [
    'body_copy',
    'header',
    'eyebrow',
    'long_form_text',
    'copy_block',
  ];
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const backgroundImages = rotatorData.map((card) =>
    useMedia(
      card.background_images[0],
      card.background_images[0],
      card?.background_images[1],
      card?.background_images[2] || 'unset',
    ),
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

  const handleTabClick = (index) => {
    if (mobile) {
      setActiveCardIndex(index);
      gsap.to(`.rotator-tabs`, { background: 'transparent', duration: 0.25 });
      gsap.to(`#rotator-tab-${index}`, {
        background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)',
        duration: 0.25,
      });
    } else {
      const tl = gsap.timeline({});
      tl.to('.rotator', { autoAlpha: 0, filter: 'blur(2px)', duration: 0.45 })
        .to(`.rotator-tabs`, { background: 'transparent', duration: 0.25 })
        .to(
          `#rotator-tab-${index}`,
          { background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)' },
          '<',
        )
        .to(
          `#rotator-${index}`,
          { autoAlpha: 1, filter: 'blur(0px)', duration: 0.25 },
          '<',
        );
    }
  };

  useEffect(() => {
    if (!mobile) {
      gsap.set('.rotator', { autoAlpha: 0 });
      gsap.set('#rotator-0', { autoAlpha: 1 });
    }
    gsap.set('#rotator-tab-0', {
      background: 'linear-gradient(180deg, #F5F4F7 0%, #E8E0EB 100%)',
    });
  }, [mobile]);

  const tabMap = rotatorData.map((tab, index) => (
    <Tab
      className="rotator-tabs"
      id={`rotator-tab-${index}`}
      key={`${tab.tab_icon.filename}-${index}`}
      onClick={() => handleTabClick(index)}
    >
      <TabIcon src={tab.tab_icon.filename} />
      <RichTextRenderer
        key={`tab-richtext-${index}`}
        document={tab.tab[0].copy}
      />
    </Tab>
  ));

  const cardMap = !mobile
    ? rotatorData.map((card, index) => {
        const cardBg = backgroundImages[index];
        return (
          <React.Fragment key={`${card.component}-${index}`}>
            <BackgroundImage
              id={`rotator-${index}`}
              className="rotator"
              backgroundImage={cardBg.filename}
            >
              <ContentContainer>
                {card.copy.map((item, itemIndex) =>
                  copycomponents.includes(item.component) ? (
                    <RichTextRenderer
                      key={`card-richtext-${itemIndex}`}
                      document={item.copy}
                      blok={item}
                    />
                  ) : (
                    <ComponentRenderer
                      key={`component-${itemIndex}`}
                      blok={item}
                    />
                  ),
                )}
              </ContentContainer>
            </BackgroundImage>
          </React.Fragment>
        );
      })
    : [];

  const mobileActiveCard = mobile && rotatorData[activeCardIndex] && (
    <MobileContainer key={`mobile-${activeCardIndex}`}>
      <ContentContainer>
        {rotatorData[activeCardIndex].copy.map((item) =>
          copycomponents.includes(item.component) ? (
            <RichTextRenderer
              key={item._uid}
              document={item.copy}
              blok={item}
            />
          ) : (
            <ComponentRenderer key={item._uid} blok={item} />
          ),
        )}
      </ContentContainer>

      <MobileImage src={backgroundImages[activeCardIndex].filename} alt="" />
    </MobileContainer>
  );

  return (
    <Wrapper>
      <Tabs>{tabMap}</Tabs>
      <CardBackground mobile={mobile}>
        {!mobile ? cardMap : mobileActiveCard}
      </CardBackground>
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
