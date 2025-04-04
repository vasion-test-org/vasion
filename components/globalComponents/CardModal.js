"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "styles/colors";
import text from "styles/text";
import ReactPlayer from "react-player/youtube";
import useMedia from "@/functions/useMedia";
import RichTextRenderer from "../renderers/RichTextRenderer";
import Video from "./Video";

const CardModal = ({ data, setShowModal, parentRef }) => {
  const [closeButton, setCloseButton] = useState(
    "/images/uiElements/closeButton.webp",
  );
  const videoWidth = useMedia("1440px", "89.6vw", "89vw", "87.85vw");
  const videoHeight = useMedia("900px", "51.25vw", "51vw", "49.299vw");

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Wrapper className="modal-wrapper" onClick={handleClose}>
      <Modal $isvideo={data?.asset[0].media[0].filename}>
        <CloseBtn
          src="/images/uiElements/closeButton.webp"
          onMouseEnter={() =>
            setCloseButton("images/uiElement/CloseBtnHover.webp")
          }
          onMouseLeave={() =>
            setCloseButton("/images/uiElements/closeButton.webp")
          }
          onClick={handleClose}
        />
        {!data?.asset[0].media[0].filename && (
          <FeaturedContent>
            <Title $mobile>
              <NameAndStar>
                {data?.person[0]?.copy && (
                  <RichTextRenderer document={data.person[0].copy} />
                )}
                <Sparkle
                  src="/images/uiElements/VasionStarNewsroom.webp"
                  alt="vasion-sparkle"
                />
              </NameAndStar>
              {data?.position[0]?.copy && (
                <RichTextRenderer document={data.position[0].copy} />
              )}
            </Title>
            <FeaturePhoto
              src={data?.asset[0].media[0].filename}
              // alt={data.name}
            />
            <TitleAndBioDiv>
              <Title>
                <NameAndStar>
                  {data?.person[0]?.copy && (
                    <RichTextRenderer document={data.person[0].copy} />
                  )}
                  <Sparkle
                    src="/images/uiElements/VasionStarNewsroom.webp"
                    alt="vasion-sparkle"
                  />
                </NameAndStar>
                {data?.position[0]?.copy && (
                  <RichTextRenderer document={data.position[0].copy} />
                )}
              </Title>
              {data?.bio[0]?.copy && (
                <RichTextRenderer document={data.bio[0].copy} />
              )}
            </TitleAndBioDiv>
          </FeaturedContent>
        )}
        {data?.asset[0].media[0].filename && (
          <VideoContainer>
            <Video
              videos={data?.asset[0].media[0]}
              // borderradius={blok.media?.[0]?.border_radius}
              thumbnails={data?.asset[0].media[0].thumbnails}
            />

            <ReactPlayer
              url={data?.asset[0].media[0].filename}
              controls={true}
              playing={true}
              volume={1}
              muted={true}
              playsinline={true}
              width={videoWidth}
              height={videoHeight}
            />
          </VideoContainer>
        )}
      </Modal>
    </Wrapper>
  );
};

export default CardModal;
const VideoContainer = styled.div`
  overflow: hidden;
  border-radius: 0.75vw;
  margin-top: 3.125vw;

  ${media.fullWidth} {
    border-radius: 12px;
    margin-top: 50px;
  }
  ${media.tablet} {
    margin-top: 7.152vw;
    border-radius: 1.172vw;
  }
  ${media.mobile} {
    margin-top: 8.25vw;
    border-radius: 2.5vw;
  }
`;

const About = styled.div`
  padding-right: 1.5vw;
  ${text.bodyLg}
  p {
    padding-bottom: 26px;
  }
  p:last-child {
    padding-bottom: 0px;
  }

  ${media.fullWidth} {
    padding-right: 5px;
    p {
      padding-bottom: 26px;
    }
    p:last-child {
      padding-bottom: 0px;
    }
  }

  ${media.tablet} {
    p {
      padding-bottom: 2.539vw;
    }
    p:last-child {
      padding-bottom: 0vw;
    }
  }

  ${media.mobile} {
    p {
      padding-bottom: 5.417vw;
    }
    p:last-child {
      padding-bottom: 0vw;
    }
  }
`;

const Position = styled.p`
  ${text.bodyXl};
`;

const Sparkle = styled.img`
  width: 1.688vw;
  height: 1.688vw;
  ${media.fullWidth} {
    width: 27px;
    height: 27px;
  }
  ${media.tablet} {
    width: 2.637vw;
    height: 2.637vw;
  }
  ${media.mobile} {
    width: 5.625vw;
    height: 5.625vw;
  }
`;

const NameAndStar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25vw;
  ${text.h3};
  ${media.fullWidth} {
    gap: 4px;
  }

  ${media.tablet} {
    gap: 0.391vw;
  }

  ${media.mobile} {
    gap: 0.833vw;
  }
`;

const Title = styled.div`
  display: ${(props) => (props?.$mobile ? "none" : "flex")};
  flex-direction: column;
  gap: 0.25vw;
  ${media.fullWidth} {
    gap: 4px;
  }

  ${media.tablet} {
    gap: 0.391vw;
  }

  ${media.mobile} {
    display: ${(props) => (props?.$mobile ? "flex" : "none")};
    gap: 0.833vw;
  }
`;

const TitleAndBioDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  ${media.fullWidth} {
    gap: 26px;
  }

  ${media.tablet} {
    gap: 2.539vw;
  }

  ${media.mobile} {
    gap: 5.417vw;
  }
`;

const FeaturePhoto = styled.img`
  object-fit: cover;
  width: 21.375vw;
  height: 28.5vw;
  border-radius: 1.5vw;
  ${media.fullWidth} {
    width: 342px;
    height: 456px;
    border-radius: 24px;
  }

  ${media.tablet} {
    width: 27.734vw;
    height: 36.914vw;
    border-radius: 2.344vw;
  }

  ${media.mobile} {
    width: 79.167vw;
    height: 105.417vw;
    border-radius: 5vw;
  }
`;
const FeaturedContent = styled.div`
  display: flex;
  gap: 3.75vw;
  padding-top: 3.75vw;
  height: calc(100% - 1.25vw);
  overflow-y: auto;
  scroll-padding: 10px;
  &::-webkit-scrollbar {
    width: 0.375vw;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 3.75vw 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 0.25vw;
  }
  ${media.fullWidth} {
    gap: 60px;
    padding-top: 60px;
    height: calc(100% - 20px);
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      margin: 60px 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 4px;
    }
  }

  ${media.tablet} {
    gap: 40px;
    padding-top: 5.859vw;
    height: calc(100% - 20px);
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      margin: 5.859vw 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 0.391vw;
    }
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 5vw;
    padding-top: 5.859vw;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 1.25vw;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
      margin: 12.5vw 0;
    }

    &::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 0.833vw;
    }
  }
`;
const CloseBtn = styled.img`
  position: absolute;
  top: 1.5vw;
  right: 1.563vw;
  width: 2.75vw;
  height: 2.75vw;
  cursor: pointer;
  ${media.fullWidth} {
    top: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
  }
  ${media.tablet} {
    top: 2.344vw;
    right: 2.344vw;
    width: 4.297vw;
    height: 4.297vw;
  }
  ${media.mobile} {
    top: 5vw;
    right: 5vw;
    width: 9.167vw;
    height: 9.167vw;
  }
`;

const Modal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 92.5vw;
  height: ${(props) => (props?.$isvideo ? "58.125vw" : " 41.25vw ")};
  background-color: ${colors.white};
  border-radius: 1.75vw;
  padding: ${(props) =>
    props?.$isvideo ? "2.3vw 0vw 1.3vw 1.3vw" : "2.5vw 0.313vw 3.75vw 2.5vw"};
  ${media.fullWidth} {
    border-radius: 28px;
    height: ${(props) => (props?.$isvideo ? "788px" : " 600px ")};
    padding: 40px 0px 20px 20px;
    width: 1480px;
  }

  ${media.tablet} {
    border-radius: 2.734vw;
    padding: ${(props) =>
      props?.$isvideo
        ? " 1.4vw 0vw 1.4vw 1.4vw"
        : "0vw 0.391vw 5.762vw 3.809vw"};
    height: ${(props) => (props?.$isvideo ? "unset" : "66.797vw")};
    width: 92.188vw;
  }

  ${media.mobile} {
    width: ${(props) => (props?.$isvideo ? "95.167vw" : "89.167vw")};
    height: ${(props) => (props?.$isvideo ? "33vh" : "89vh")};
    border-radius: 5.417vw;
    padding: ${(props) =>
      props?.$isvideo ? "9vw 2vw 2vw 2vw" : "5vw 0.5vw 5vw 5vw"};
    align-items: center;
    justify-content: center;
    z-index: 23;
  }
`;
const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  top: 0;
  left: 0;
  background: rgba(27, 29, 33, 0.5);
  backdrop-filter: blur(calc(var(--Blur-40, 40px) / 2));

  ${media.mobile} {
    height: 100vh;
    top: 0;
  }
`