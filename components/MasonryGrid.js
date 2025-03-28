"use client";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import media from "@/styles/media";
import text from "@/styles/text";
import RichTextRenderer from "./renderers/RichTextRenderer";
import Form from "./Form";
const MasonryGrid = ({ blok }) => {
  const [pairs, setPairs] = useState([]);
  const imageData = pairs?.map((item, index) => {
    return (
      <Column key={index}>
        <Image
          src={item?.image1?.filename}
          alt={item?.image1?.alt}
          $item={index}
        />
        <Image src={item?.image2?.filename} alt={item?.image2?.alt} />
      </Column>
    );
  });

  useEffect(() => {
    if (blok?.gallery.length) {
      const tempPairs = [];
      for (let i = 0; i < blok?.gallery?.length; i += 2) {
        let createPair = {
          image1: blok?.gallery[i],
          image2: blok?.gallery[i + 1] || null,
        };
        tempPairs.push(createPair);
      }
      setPairs(tempPairs);
    }
  }, [blok.gallery]);

  return (
    <Wrapper>
      <Header $center={blok.centered_header}>
        <RichTextRenderer document={blok.header} />
      </Header>
      {blok?.body_copy && (
        <Body>
          <RichTextRenderer document={blok.body_copy} />
        </Body>
      )}
      <Gallery $isOdd={pairs.length % 2 !== 0}>{imageData}</Gallery>
      {/* {blok?.form && <Form blok={blok.form[0]} />} */}
      {/* TODO: @Bubba */}
    </Wrapper>
  );
};

export default MasonryGrid;

const Image = styled.img`
  width: 25.625vw;
  height: max-content;
  border-radius: 0.556vw;

  ${media.fullWidth} {
    width: 369px;
    border-radius: 8px;
  }

  ${media.tablet} {
    width: 44.922vw;
    border-radius: 0.781vw;
  }

  ${media.mobile} {
    flex: auto;
    display: ${(props) => (props?.$item >= 3 ? "none" : "flex")};
    width: 89.792vw;
    border-radius: 1.869vw;
    object-fit: cover;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;

  ${media.fullWidth} {
    gap: 32px;
  }

  ${media.tablet} {
    gap: 2.344vw;
  }

  ${media.mobile} {
    gap: 4.167vw;
    align-items: center;
    justify-content: center;
  }
`;
const Gallery = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80.888vw;
  height: auto;
  gap: 2vw;
  padding-top: 1.389vw;

  ${media.fullWidth} {
    gap: 32px;
    width: 1171px;
    padding-top: 20px;
  }

  ${media.tablet} {
    width: 93.188vw;
    padding: 0vw;
    gap: 2.344vw;
    padding-top: 1.953vw;
    & :last-child {
      flex-direction: ${(props) => (props?.$isOdd ? "row" : "column")};
    }
  }

  ${media.mobile} {
    overflow: hidden;
    flex-direction: column;
    width: 99.766vw;
    padding-top: 4.167vw;
    gap: 4.167vw;
  }
`;

const Body = styled.div`
  ${text.bodyMd}
  width: 63.333vw;
  padding-bottom: 1.375vw;
  ${media.fullWidth} {
    padding-bottom: 20px;
    width: 912px;
  }

  ${media.tablet} {
    width: 80.469vw;
    padding-bottom: 1.563vw;
  }

  ${media.mobile} {
    width: 87.85vw;
    padding-bottom: 2.804vw;
  }
`;

const Header = styled.h2`
  align-self: ${(props) => (props?.$center ? "center" : "flex-start")};
  padding-left: ${(props) => (props?.$center ? "unset" : "100px")};
  ${media.mobile} {
    align-self: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5vw;
  padding: 5.556vw 0;

  ${media.fullWidth} {
    gap: 24px;
    padding: 80px 0;
  }

  ${media.tablet} {
    gap: 2.344vw;
    padding: 7.813vw 0;
  }

  ${media.mobile} {
    gap: 5vw;
    padding: 14.019vw 0;
  }
`;
