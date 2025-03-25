import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import { useRive } from "@rive-app/react-canvas";
import { ScreenContext } from "../Providers/Screen";
import gsap from "gsap";
import styled from "styled-components";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";
import Button from "../globalComponents/Button";
import getMedia from "@/functions/getMedia";
import ScrollTrigger from "gsap/ScrollTrigger";
import RichTextRenderer from "../renderers/RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);


const StackedCards = ({ blok }) => {
  const { mobile, tablet } = useContext(ScreenContext);
  const stackedCardsRef = useRef(null);
  const riveInstancesRef = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    riveInstancesRef.current = Array(3).fill(null);

    return () => {
      riveInstancesRef.current.forEach((rive) => {
        if (rive) rive.pause();
      });
    };
  }, []);

  const handleRiveInit = useMemo(() => {
    return (riveInstance, index) => {
      riveInstancesRef.current[index] = riveInstance;
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
        const RiveAnimation = ({ index, isActive, tablet, mobile, onRiveInit }) => {
          const shouldAutoplay = tablet || mobile || index === 0;
        
          const { rive, RiveComponent } = useRive({
            src: card.main_asset[0].filename,
            autoplay: shouldAutoplay,
          });
        
          useEffect(() => {
            if (rive) {
              onRiveInit(rive, index);
        
              if (shouldAutoplay) {
                rive.play();
              } else {
                rive.pause();
              }
            }
        
            return () => {
              if (rive) rive.pause();
            };
          }, [rive, index, shouldAutoplay, onRiveInit]);
        
          useEffect(() => {
            if (rive) {
              if (isActive) {
                rive.play();
              } else {
                rive.pause();
              }
            }
          }, [isActive, rive, index]);
        
          return (
            <RiveContainer>
              <RiveComponent />
            </RiveContainer>
          );
        };
     
        const isLastCard = index === blok.length - 1;

        const cardImage = getMedia(
          card.background_image[0].filename,
          card.background_image[0].filename,
          card.background_image[1].filename,
          card.background_image[2].filename
        );

        return (
          <CardContainer
            className="stackedCards"
            key={index}
            $active={active}
            index={index}
            $bgimg={cardImage}
            $last={isLastCard}
            onMouseEnter={() => handleCardMouseEnter(index)}
            onMouseLeave={handleCardMouseLeave}
          >
            <Content $last={isLastCard}>
              {card?.eyebrow && (
         
                  <RichTextRenderer document={card.eyebrow}/>
             
              )}
        
             <RichTextRenderer document={card.header}/>
              <RichTextRenderer document={card.body_copy}/>
              {/* {isLastCard && (
                <ButtonRow>
                  <GlobalButton fill demo>
                    Schedule a Demo
                  </GlobalButton>
                  <StyledLink color="#ffffff" href="/why-vasion" size="medium">
                    Explore Vasion
                  </StyledLink>
                </ButtonRow>
              )} */}
            </Content>

            {/* {card?.link && (
              <StyledLink href={card.link} size="medium">
                {card.linkText}
              </StyledLink>
            )} */}

            {index < 3 && (
              <RiveAnimation
                index={index}
                isActive={active === index}
                tablet={tablet}
                mobile={mobile}
                onRiveInit={handleRiveInit}
              />
            )}
          </CardContainer>
        );
      })}
    </Wrapper>
  );
};

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

  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5.607vw;
  }
`;

const BodyCopy = styled.p`
  ${text.bodyMd};
  color: ${colors.txtSubtle};
  margin-bottom: 1.111vw;
  min-height: 7.5vw;

  ${media.fullWidth} {
    margin-bottom: 16px;
    min-height: 120px;
  }

  ${media.tablet} {
    ${text.bodySm};
    margin-bottom: 1.563vw;
    min-height: 9.301vw;
  }

  ${media.mobile} {
    margin-bottom: 3.738vw;
  }
`;

const Header = styled.h5`
  ${text.h5};
  margin-bottom: 0.278vw;

  ${media.fullWidth} {
    margin-bottom: 4px;
  }

  ${media.tablet} {
    margin-bottom: 0.391vw;
  }

  ${media.mobile} {
    ${text.h4};
    text-wrap: balance;
    margin-bottom: 0.935vw;
  }
`;

const Eyebrow = styled.div`
  ${text.tagBold}
  color: ${(props) => `#${props.eyebrow_color}`};
  background-color: ${(props) => `#${props.eyebrow_bg_color}`};
  width: max-content;
  padding: 0.278vw 0.556vw;
  border-radius: 1.667vw;

  ${media.fullWidth} {
    padding: 4px 8px;
    border-radius: 24px;
  }

  ${media.tablet} {
    padding: 0.391vw 0.781vw;
    border-radius: 2.344vw;
  }

  ${media.mobile} {
    padding: 0.935vw 1.869vw;
    border-radius: 5.607vw;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: nowrap;
  text-wrap: stable;
  hyphens: none;
  width: ${(props) => (props?.$last ? "33.25vw" : "fit-content")};
  gap: ${(props) => (props?.$last ? "0.75vw" : "0.5vw")};
  ${media.fullWidth} {
    width: ${(props) => (props?.$last ? "532px" : "fit-content")};
    gap: ${(props) => (props?.$last ? "12px" : "8px")};
  }
  ${media.tablet} {
    width: ${(props) => (props?.$last ? "38.281vw" : "fit-content")};
    height: ${(props) => (props?.$last ? "unset" : "17.16vw")};
    gap: ${(props) => (props?.$last ? "1.172vw" : "0.781vw")};
  }
  ${media.mobile} {
    width: ${(props) => (props?.$last ? "78.333vw" : "fit-content")};
    gap: ${(props) => (props?.$last ? "2.5vw" : "1.667vw")};
  }
`;

const CardContainer = styled.div`
  display: flex;
  opacity: ${(props) =>
    props?.$last
      ? "1"
      : props.index < 3
      ? props.$active === props.index
        ? "1"
        : "0.5"
      : "1"};
  transition: opacity 0.3s ease-out;
  flex-direction: column;
  background: ${(props) => `url(${props.$bgimg})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: ${(props) => (props?.$last ? "fit-content" : "37.5vw")};
  width: ${(props) => (props?.$last ? "81.5vw" : "26.687vw")};
  padding: ${(props) => (props?.$last ? "2.688vw 3.75vw" : "1.25vw")};
  border-radius: 0.833vw;

  ${media.fullWidth} {
    height: ${(props) => (props?.$last ? "fit-content" : "600px")};
    width: ${(props) => (props?.$last ? "1304px" : "426px")};
    padding: ${(props) => (props?.$last ? "43px 60px" : "20px")};
    border-radius: 12px;
  }

  ${media.tablet} {
    opacity: 1;
    width: ${(props) => (props?.$last ? "92.188vw" : "29.102vw")};
    padding: ${(props) => (props?.$last ? "3.906vw" : "1.953vw")};
    height: ${(props) => (props?.$last ? "fit-content" : "45.953vw")};
    border-radius: 1.172vw;
  }

  ${media.mobile} {
    opacity: 1;
    background-position: center;
    background-size: cover;
    flex-direction: column;
    border-radius: 2.804vw;
    width: 89.167vw;
    height: ${(props) => (props?.$last ? "171.042vw" : "fit-content")};
    padding: ${(props) => (props?.$last ? "5.417vw 8.333vw" : "4.167vw")};
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
    gap: 24px;
  }

  ${media.tablet} {
    gap: 1.172vw;
  }

  ${media.mobile} {
    gap: 5vw;
  }
`;
