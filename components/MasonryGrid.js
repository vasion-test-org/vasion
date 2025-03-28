"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import media from "styles/media";
import text from "styles/text";
import LightBoxBtn from "./LightboxBtn";

const MasonryGrid = ({ content }) => {
  const [pairs, setPairs] = useState([]);
  const imageData = pairs?.map((item, index) => {
    return (
      <Column key={index}>
        <Image
          src={item?.image1?.sourceUrl}
          alt={item?.image1?.altText}
          $item={index}
        />
        <Image src={item?.image2?.sourceUrl} alt={item?.image2?.altText} />
      </Column>
    );
  });

  useEffect(() => {
    if (content?.gallery.length) {
      const tempPairs = [];
      for (let i = 0; i < content?.gallery?.length; i += 2) {
        let createPair = {
          image1: content?.gallery[i],
          image2: content?.gallery[i + 1] || null,
        };
        tempPairs.push(createPair);
      }
      setPairs(tempPairs);
    }
  }, []);

  return (
    <Wrapper>
      <Header $center={content?.centeredHeader} $small={content?.smallHeader}>
        {content?.header}
      </Header>
      {content?.body && (
        <Body dangerouslySetInnerHTML={{ __html: content?.body }} />
      )}
      <Gallery $isOdd={pairs.length % 2 !== 0}>{imageData}</Gallery>
      {content?.lightboxText && content?.formId && (
        <LightBoxBtn
          formId={content.formId}
          ty={content?.thankYouPage}
          lightboxText={content.lightboxText}
        />
      )}
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

const Body = styled.p`
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
  ${(props) => (props?.$small ? `${text.h3}` : `${text.h2}`)};
  align-self: ${(props) => (props?.$center ? "center" : "flex-start")};
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
