"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import useMedia from "utils/useMedia";
import ReactPlayer from "react-player";
import gsap from "gsap";

const ComparisonSelect = ({ blok }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  const [activeTl, setActiveTl] = useState(null);

  const videoWidth = useMedia("912px", "63.333vw", "89.063vw", "87.85vw");
  const videoHeight = useMedia("512px", "35.556vw", "50vw", "49.299vw");

  const object1Ref = useRef(null);
  const object2Ref = useRef(null);

  useEffect(() => {
    const tl1 = gsap.timeline({ paused: true });
    const tl2 = gsap.timeline({ paused: true });

    tl1
      .to(object1Ref.current, {
        duration: 0.2,
        scale: 1.03,
        opacity: 1,
        boxShadow: "-7px 8px 14px -2px rgba(0,0,0,0.68)",
        y: 0,
      })
      .to(
        object2Ref.current,
        {
          duration: 0.2,
          scale: 1,
          y: -4,
          opacity: 0.5,
          boxShadow: "unset",
        },
        0,
      );

    tl2
      .to(object2Ref.current, {
        duration: 0.2,
        scale: 1.03,
        opacity: 1,
        boxShadow: "7px 8px 14px -2px rgba(0,0,0,0.68)",
        y: 0,
      })
      .to(
        object1Ref.current,
        {
          duration: 0.2,
          scale: 1,
          y: -4,
          opacity: 0.5,
        },
        0,
      );

    const handleClick1 = () => {
      if (activeTl !== "tl1") {
        if (tl2.progress() > 0) {
          tl2.reverse().then(() => {
            tl1.restart();
            setActiveTl("tl1");
          });
        } else {
          tl1.restart();
          setActiveTl("tl1");
        }
      }
    };

    const handleClick2 = () => {
      if (activeTl !== "tl2") {
        if (tl1.progress() > 0) {
          tl1.reverse().then(() => {
            tl2.restart();
            setActiveTl("tl2");
          });
        } else {
          tl2.restart();
          setActiveTl("tl2");
        }
      }
    };

    const handleMouseEnter1 = () => {
      if (activeTl === null) {
        gsap.to(object2Ref.current, { opacity: 1, duration: 0.2 });
      } else if (activeTl !== "tl1") {
        gsap.to(object1Ref.current, {
          duration: 0.2,
          opacity: 0.7,
          scale: 1.01,
        });
      }
    };

    const handleMouseLeave1 = () => {
      if (activeTl === null) {
        gsap.to(object2Ref.current, { opacity: 1, duration: 0.2 });
      } else if (activeTl !== "tl1") {
        gsap.to(object1Ref.current, {
          duration: 0.2,
          opacity: 0.5,
          scale: 1,
        });
      }
    };

    const handleMouseEnter2 = () => {
      if (activeTl === null) {
        gsap.to(object2Ref.current, { opacity: 1, duration: 0.2 });
      } else if (activeTl !== "tl2") {
        gsap.to(object2Ref.current, {
          duration: 0.2,
          opacity: 0.7,
          scale: 1.01,
        });
      }
    };

    const handleMouseLeave2 = () => {
      if (activeTl === null) {
        gsap.to(object2Ref.current, { opacity: 1, duration: 0.2 });
      } else if (activeTl !== "tl2") {
        gsap.to(object2Ref.current, {
          duration: 0.2,
          opacity: 0.5,
          scale: 1,
        });
      }
    };

    object1Ref.current.addEventListener("click", handleClick1);
    object2Ref.current.addEventListener("click", handleClick2);

    object1Ref.current.addEventListener("mouseenter", handleMouseEnter1);
    object1Ref.current.addEventListener("mouseleave", handleMouseLeave1);

    object2Ref.current.addEventListener("mouseenter", handleMouseEnter2);
    object2Ref.current.addEventListener("mouseleave", handleMouseLeave2);

    return () => {
      object1Ref.current?.removeEventListener("click", handleClick1);
      object2Ref.current?.removeEventListener("click", handleClick2);
      object1Ref.current?.removeEventListener("mouseenter", handleMouseEnter1);
      object1Ref.current?.removeEventListener("mouseleave", handleMouseLeave1);
      object2Ref.current?.removeEventListener("mouseenter", handleMouseEnter2);
      object2Ref.current?.removeEventListener("mouseleave", handleMouseLeave2);
    };
  }, [activeTl]);
  return (
    <Wrapper className="wrapper-div" $bg={blok?.background}>
      {blok?.header && <Header>{blok?.header}</Header>}
      {
        <Comparison>
          <Option
            $active={activeTl}
            ref={object1Ref}
            className={"option-1"}
            onMouseEnter={() => setHoveredOption("option-1")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <OptionImages
              src={
                hoveredOption === "option-1"
                  ? blok?.optionOne?.hoverImage?.sourceUrl
                  : blok?.optionOne?.image?.sourceUrl
              }
              alt={blok?.optionOne?.image?.altText}
            />
            <Body dangerouslySetInnerHTML={{ __html: blok?.optionOne?.body }} />
          </Option>
          <ComparisonText>{blok?.comparisonText}</ComparisonText>
          <Option
            ref={object2Ref}
            className={"option-2"}
            onMouseEnter={() => setHoveredOption("option-2")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <OptionImages
              src={
                hoveredOption === "option-2"
                  ? blok?.optionTwo?.hoverImage?.sourceUrl
                  : blok?.optionTwo?.image?.sourceUrl
              }
              alt={blok?.optionTwo?.image?.altText}
            />
            <Body dangerouslySetInnerHTML={{ __html: blok?.optionTwo?.body }} />
          </Option>
        </Comparison>
      }
      <ReactPlayer
        url={blok?.videoUrl}
        controls={true}
        light={blok?.videoThumbnail?.sourceUrl}
        playing={true}
        volume={1}
        muted={false}
        playIcon={<></>}
        width={videoWidth}
        height={videoHeight}
      />
      <BottomCopy dangerouslySetInnerHTML={{ __html: blok?.bottomText }} />
    </Wrapper>
  );
};

export default ComparisonSelect;
const BottomCopy = styled.p`
  ${text.h2};
  text-align: center;

  ${media.tablet} {
    ${text.h3};
  }

  ${media.mobile} {
    ${text.h2};
  }
`;
const Body = styled.p`
  ${text.bodyLg}
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
    ${text.bodyMd}
  }
`;
const ComparisonText = styled.h4`
  ${text.h4};
`;
const OptionImages = styled.img`
  position: relative;
  width: auto;
  height: 10.625vw;
  min-width: 10.625vw;
  &:hover {
    src: url(${(props) => props.hoverImage || props.src});
  }
  ${media.fullWidth} {
    height: 170px;
    min-width: 170px;
  }

  ${media.tablet} {
    height: 16.602vw;
    min-width: 16.602vw;
  }

  ${media.mobile} {
    height: 35.417vw;
    min-width: 35.417vw;
  }
`;

const Option = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors?.primaryPurple};
  gap: 1vw;
  padding: 1.375vw 1.25vw;
  width: 34.563vw;
  border-radius: 0.75vw;
  box-shadow: will-change;
  &:hover {
    box-shadow: 0px 0px 11px 3px rgba(0, 0, 0, 0.68);
  }

  ${media.fullWidth} {
    gap: 16px;
    padding: 22px 20px;
    width: 553px;
    border-radius: 12px;
  }

  ${media.tablet} {
    gap: 1.563vw;
    padding: 2.148vw 1.953vw;
    width: 42.48vw;
    border-radius: 1.172vw;
  }

  ${media.mobile} {
    gap: 3.333vw;
    padding: 4.583vw 4.167vw;
    width: 89.167vw;
    border-radius: 2.5vw;
  }
`;
const Comparison = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5vw;
  ${media.fullWidth} {
    gap: 24px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 5vw;
    flex-direction: column;
  }
`;
const Header = styled.h3`
  ${text.h3};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background: url(${(props) => props?.$bg?.desktop?.sourceUrl || "unset"});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  padding: 6vw 0vw;
  gap: 3.75vw;
  /* @media (min-width: 175rem) {
    background: unset;
    background-color: lightblue;
  } */
  ${media.fullWidth} {
    padding: 96px 0px;
    gap: 60px;
    width: 99.35vw;
  }

  ${media.tablet} {
    padding: 9.375vw 0vw;
    gap: 5.859vw;
    background: url(${(props) => props?.$bg?.tablet?.sourceUrl || "unset"});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  ${media.mobile} {
    padding: 20vw 0vw;
    gap: 12.5vw;
    background: url(${(props) => props?.$bg?.mobile?.sourceUrl || "unset"});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`;
