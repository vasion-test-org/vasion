"use client";
import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import media from "@/styles/media";
import colors from "@/styles/colors";
import text from "@/styles/text";
import gsap from "gsap";

import CardModal from "./globalComponents/CardModal";

const ModalCards = ({ blok }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isActive, setIsActive] = useState(null);

  const handleModal = (item) => {
    console.log(item);
    console.log(item);
    if (!item.about && !item?.videoUrl) {
      return;
    }
    setShowModal(true);
    setModalData(item);
    console.log("MODAL DATA--->", modalData);
  };
  const hasVideo = (item) => {
    if (item && item.asset && item.asset[0]) {
      return item.asset[0].component === "video_assets";
    }
    return false;
  };
  const allCards = blok.cards.map((item, index) => {
    const isVideoContent = hasVideo(item);
    let sourceUrl = "";
    if (isVideoContent) {
      sourceUrl = item.asset[0].thumbnails[0].filename;
    } else {
      sourceUrl = item.asset[0].media[0].filename;
    }

    return (
      <ProfileCard
        $isvideo={isVideoContent}
        key={index}
        $bg={sourceUrl}
        $isHover={item?.bio[0].copy}
        onClick={() => handleModal(item)}
        onMouseEnter={() => setIsActive(index)}
        onMouseLeave={() => setIsActive(false)}
        {...storyblokEditable(item)}
      >
        <Title>
          <Name>
            <RichTextRenderer document={item.person[0].copy} />
          </Name>
          <Position>
            <RichTextRenderer document={item.position[0].copy} />
          </Position>
        </Title>
        {!isVideoContent && (
          <GoToBtn
            $active={index === isActive}
            src={"/images/uiElements/GoToActive"}
            alt={"go-to-btn"}
          />
        )}
      </ProfileCard>
    );
  });

  return (
    <Wrapper>
      <Header>
        {blok.header && <RichTextRenderer document={blok.header} />}
      </Header>
      <CardsOuterWrapper>
        {blok.cards && <CardsWrapper>{allCards}</CardsWrapper>}
      </CardsOuterWrapper>
      {showModal && <CardModal data={modalData} setShowModal={setShowModal} />}
      {/* <CardModal data={modalData} setShowModal={setShowModal} /> */}
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

const Position = styled.div`
  ${text.bodyMd}
`;
const Name = styled.h4`
  color: white;
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
    background-image: ${(props) =>
      props.$isHover
        ? `linear-gradient(
          180deg,
          rgba(61, 37, 98, 0.02) 0%,
          rgba(88, 63, 153, 0.5) 100%
        )${props.$bg ? `, url(${props.$bg})` : ""}`
        : props.$bg
          ? `url(${props.$bg})`
          : "none"};
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

  width: 81.5vw;
  gap: 2vw;
  ${media.fullWidth} {
    gap: 32px;
    width: 1304px;
  }

  ${media.tablet} {
    gap: 3.125vw;
    width: 92.188vw;
  }

  ${media.mobile} {
    gap: 6.667vw;
    width: 100%;
    z-index: 1;
  }
`;
