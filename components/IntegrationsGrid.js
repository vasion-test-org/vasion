"use client";
import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import colors from "@/styles/colors";
import text from "@/styles/text";
import media from "@/styles/media";
import gsap from "gsap";
import RichTextRenderer from "@/components/renderers/RichTextRenderer";
import IntegrationBloks from "@/components/globalComponents/IntegrationBloks";

const IntegrationsGrid = ({ blok }) => {
  // console.log(blok);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 480);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    if (!isMounted || !wrapperRef.current) return;
    const currentRef = wrapperRef.current;
    if (isMobile) {
      if (isOpen) {
        const fullHeight = currentRef.scrollHeight;
        gsap.to(currentRef, {
          height: fullHeight,
          duration: 1,
          ease: "sine.out",
        });
      } else {
        gsap.set(currentRef, {
          height: "70vh",
        });
      }
    } else {
      gsap.set(currentRef, { height: "auto" });
    }
  }, [isOpen, isMobile, isMounted]);

  const handleViewMore = () => {
    setIsOpen(true);
  };
  return (
    <Wrapper className="integration-wrapper" ref={wrapperRef}>
      <Intro>
        <Header>
          <RichTextRenderer document={blok.header} />
        </Header>
        <Body>
          <RichTextRenderer document={blok?.body_copy} />
        </Body>
      </Intro>
      {isMounted && (
        <IntegrationBloks types={blok?.integration_types} isMobile={isMobile} />
      )}
      {!isOpen && isMobile && (
        <ViewMoreWrapper>
          <MoreAndCarrot>
            <ViewMore onClick={handleViewMore}>View More</ViewMore>
            <Carrot
              src={"/images/uiElements/carrot-down"}
              alt={""}
              width={"12"}
              height={"12"}
            />
          </MoreAndCarrot>
        </ViewMoreWrapper>
      )}
    </Wrapper>
  );
};

export default IntegrationsGrid;

const Carrot = styled.img`
  ${media.fullWidth} {
    display: none;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    width: 2.5vw;
    height: 2.5vw;
  }
`;
const ViewMore = styled.button`
  ${text.bodySmBold};
  color: ${colors?.primaryOrange};
`;
const MoreAndCarrot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ViewMoreWrapper = styled.div`
  ${media.fullWidth} {
    display: none;
  }
  ${media.tablet} {
    display: none;
  }
  ${media.mobile} {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0px;
    align-items: flex-end;
    justify-content: center;
    height: 16vw;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.9) 100%
    );
    width: 100%;
    gap: 1.667vw;
    z-index: 100;
  }
`;
const Body = styled.div`
  ${text.bodyMd}
  text-align:center;
  width: 45.125vw;

  ${media.fullWidth} {
    width: 722px;
  }
  ${media.tablet} {
    width: 70.117vw;
  }
  ${media.mobile} {
    width: 89.167vw;
  }
`;

const Header = styled.div`
  ${text.h3};
  color: ${colors?.txtPrimary};
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 67.75vw;
  padding-bottom: 1.25vw;
  gap: 1vw;

  ${media.fullWidth} {
    width: 1084px;
    padding-bottom: 20px;
    gap: 16px;
  }
  ${media.tablet} {
    width: 92.188vw;
    padding-bottom: 1.953vw;
    gap: 1.563vw;
  }
  ${media.mobile} {
    width: 89.167vw;
    padding-bottom: 4.167vw;
    gap: 3.333vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.25vw;
  overflow: hidden;
  ${media.fullWidth} {
    gap: 20px;
  }
  ${media.tablet} {
    gap: 1.953vw;
  }
  ${media.mobile} {
    gap: 4.167vw;
  }
`;
