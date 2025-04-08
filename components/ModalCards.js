"use client";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import media from "styles/media";
import colors from "@/styles/colors";
import text from "styles/text";
import CardModal from "@/components/globalComponents/CardModal";
import RichTextRenderer from "./renderers/RichTextRenderer";

const ModalCards = ({ blok }) => {
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isActive, setIsActive] = useState(null);
  // console.log(blok)
  const handleModal = (item) => {
    const hasBio = item.bio && item.bio.length > 0;
    const hasAsset = item.asset && item.asset.length > 0;

    if (hasBio || hasAsset) {
      setShowModal(true);
      setModalData(item);
    }
  };

  const allCards = blok?.cards.map((item, index) => {
    const hasYouTube = /youtube|youtu\.be/.test(
      item?.asset[0].media[0].filename,
    );

    let image = null;
    if (hasYouTube) {
      image = item?.asset[0].thumbnails[0].filename;
    } else {
      image = item?.asset[0].media[0].filename;
    }
    return (
      <ProfileCard
        $isvideo={hasYouTube}
        key={`modal-card-${index}`}
        $bg={image}
        // $isHover={item?.bio}
        onClick={() => handleModal(item)}
        onMouseEnter={() => setIsActive(index)}
        onMouseLeave={() => setIsActive(false)}
      >
        <Title>
          {item?.person[0]?.copy && (
            <RichTextRenderer document={item.person[0].copy} />
          )}
          {item?.position[0]?.copy && (
            <RichTextRenderer document={item.position[0].copy} />
          )}
        </Title>
        {!hasYouTube && (
          <GoToBtn
            $active={index === isActive}
            src="/images/uiElements/GoTo.webp"
            alt={"go-to-btn"}
          />
        )}
      </ProfileCard>
    );
  });

  return (
    <Wrapper ref={wrapperRef}>
      <Header>
        <RichTextRenderer document={blok.header} />
      </Header>
      <CardsOuterWrapper>
        <CardsWrapper>{allCards}</CardsWrapper>
      </CardsOuterWrapper>
      {showModal && <CardModal data={modalData} setShowModal={setShowModal} />}
    </Wrapper>
  );
};

export default ModalCards;

const GoToBtn = styled.img`
  position: relative;
  opacity: ${(props) => (props?.$active ? "1" : "0")};
  width: 2.75vw;
  height: 2.75vw;
  ${media.fullWidth} {
    width: 44px;
    height: 44px;
  }

  ${media.tablet} {
    width: 4.297vw;
    height: 4.297vw;
  }

  ${media.mobile} {
    width: 9.167vw;
    height: 9.167vw;
  }
`;

const Position = styled.p`
  ${text.bodyMd}
`;
const Name = styled.h4`
  ${text.h4};
`;
const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  height: fit-content;
  gap: 0.5vw;
  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;

const ProfileCard = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;

  background-position: center;
  align-items: flex-end;
  justify-content: space-between;
  background-image: ${(props) => props?.$bg && `url(${props.$bg})`};
  background-repeat: no-repeat;

  &:hover {
    /* background-image: ${(props) =>
      props.$isHover
        ? `linear-gradient(
          180deg,
          rgba(61, 37, 98, 0.02) 0%,
          rgba(88, 63, 153, 0.5) 100%
        )${props.$bg ? `, url(${props.$bg})` : ""}`
        : props.$bg
          ? `url(${props.$bg})`
          : "none"}; */
  }
  background-size: 100%;
  width: ${(props) => (props?.$isvideo ? "26.125vw" : "19.25vw")};
  height: 25.625vw;
  border-radius: 1.5vw;
  padding: 1.625vw;
  ${media.fullWidth} {
    width: ${(props) => (props?.$isvideo ? "418px" : "308px")};
    height: 410px;
    border-radius: 24px;
    padding: 26px;
  }

  ${media.tablet} {
    background-size: ${(props) => (props?.$isvideo ? "cover" : "100%")};
    width: 29.102vw;
    height: 38.867vw;
    border-radius: 2.344vw;
    padding: 2.539vw;
  }

  ${media.mobile} {
    background-size: ${(props) => (props?.$isvideo ? "cover" : "100%")};
    width: 75vw;
    height: 99.792vw;
    border-radius: 5vw;
    padding: 5vw;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2vw 1.5vw;
  ${media.fullWidth} {
    gap: 32px 24px;
  }

  ${media.tablet} {
    gap: 2.539vw 2.344vw;
  }

  ${media.mobile} {
    gap: 3.333vw;
    width: fit-content;
    flex-wrap: nowrap;
    padding: 0vw 5.417vw;
  }
`;
const CardsOuterWrapper = styled.div`
  display: flex;

  ${media.mobile} {
    overflow: scroll;
  }
`;
const Header = styled.h3`
  ${text.h3};
  align-self: center;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-self: center;
  width: 81.5vw;
  gap: 2vw;

  padding: ${(props) => {
    if (props.spacingOffset === "top") {
      return props.spacing === "default"
        ? "3.75vw 0 0"
        : props.spacing
          ? `${props.spacing}px 0 0`
          : "3.75vw 0 0";
    }
    if (props.spacingOffset === "bottom") {
      return props.spacing === "default"
        ? "0 0 3.75vw"
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : "0 0 3.75vw";
    }
    return props.spacing === "default"
      ? "3.75vw 0"
      : props.spacing
        ? `${props.spacing}px 0`
        : "3.75vw 0";
  }};

  ${media.fullWidth} {
    gap: 32px;
    width: 1304px;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "60px 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "60px 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 60px"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 60px";
      }
      return props.spacing === "default"
        ? "60px 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "60px 0";
    }};
  }

  ${media.tablet} {
    gap: 3.125vw;
    width: 92.188vw;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "5.859vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "5.859vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 5.859vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 5.859vw";
      }
      return props.spacing === "default"
        ? "5.859vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "5.859vw 0";
    }};
  }

  ${media.mobile} {
    gap: 6.667vw;
    width: 100%;
    z-index: 1;
    padding: ${(props) => {
      if (props.spacingOffset === "top") {
        return props.spacing === "default"
          ? "12.5vw 0 0"
          : props.spacing
            ? `${props.spacing}px 0 0`
            : "12.5vw 0 0";
      }
      if (props.spacingOffset === "bottom") {
        return props.spacing === "default"
          ? "0 0 12.5vw"
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : "0 0 12.5vw";
      }
      return props.spacing === "default"
        ? "12.5vw 0"
        : props.spacing
          ? `${props.spacing}px 0`
          : "12.5vw 0";
    }};
  }
`;
