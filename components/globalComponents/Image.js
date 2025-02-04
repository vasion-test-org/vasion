"use client";

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import media from "@/styles/media";
import useMedia from "@/functions/useMedia";

const Image = ({ images, borderRadius }) => {
  let imageSrc = useMedia(images?.[0], images?.[0], images?.[1], images?.[2])

  if (!imageSrc) return null;
// console.log(borderRadius)
  return <ImageWrapper alt={imageSrc.imageAlt} src={imageSrc.filename} borderRadius={borderRadius} />;
};

const ImageWrapper = styled.img`
  width: auto;
  height: auto;
  border-radius: ${(props) => `${props.borderRadius || 0}px`};

  ${media.fullWidth} {
    border-radius: ${(props) => `${props.borderRadius || 0}px`};
  }
`;

export default Image;

