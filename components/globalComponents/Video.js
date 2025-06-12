"use client";
import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import media from "@/styles/media";
import useMedia from "@/functions/useMedia";

const Video = ({ videos, borderradius, filename, thumbnails }) => {
  let videoSrc = filename
    ? filename
    : useMedia(
        videos?.[0]?.filename,
        videos?.[0]?.filename,
        videos?.[1]?.filename || videos?.[0]?.filename,
        videos?.[2]?.filename || videos?.[0]?.filename,
      );

  if (!videoSrc) return null;

  return (
    <VideoWrapper borderradius={borderradius}>
      <ReactPlayer
        url={videoSrc}
        width="100%"
        height="100%"
        controls={true}
        light={thumbnails?.[0]?.filename}
        playsinline={true}
      />
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  width: 67.75vw;
  height: 38vw;
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;
  ${media.fullWidth} {
    width: 1084px;
    height: 608px;
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }
  ${media.tablet} {
    width: 92.188vw;
    height: 51.758vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    height: 50vw;
  }
`;

export default Video;
