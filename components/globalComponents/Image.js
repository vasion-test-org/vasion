"use client";

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import useMedia from "@/functions/useMedia";

const Image = ({ images, borderradius, filename }) => {
  // console.log('images',images)
  let imageSrc = filename ? filename : useMedia(images?.[0]?.filename, images?.[0]?.filename, images?.[1]?.filename || images?.[0]?.filename, images?.[2]?.filename || images?.[0]?.filename)

  if (!imageSrc) return null;

  return <ImageWrapper alt={imageSrc.imageAlt} src={imageSrc} borderradius={borderradius} />;
};

const ImageWrapper = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};

  ${media.fullWidth} {
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }

  ${media.tablet} {
    
  }
  
  ${media.mobile} {
  
  }
`;

export default Image;

