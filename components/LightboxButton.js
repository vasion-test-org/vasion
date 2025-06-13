"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import colors from "@/styles/colors";
import media from "@/styles/media";
import Form from "./Form";
import CardModal from "./globalComponents/CardModal";
import text from "@/styles/text";

const LightboxBtn = ({ blok }) => {
  console.log(blok);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const isVideoModal = blok.video_modal === true;

  const videoModalData = isVideoModal
    ? {
        asset: blok.asset
          ? blok.asset.map((asset) => ({
              media: [
                {
                  filename: asset.filename || asset.url || asset.src,
                },
              ],
              thumbnails: asset.thumbnails || null,
            }))
          : [],
      }
    : null;

  const formBlok = {
    form_id: blok.form_id,
    thank_you_copy: blok.thank_you,
    redirect_link: blok.redirect_link || null,
    theme: blok.theme || "dark",
    header: blok.form_header || null,
    animated: blok.animated || false,
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const smoother = window.ScrollSmoother?.get();
    smoother?.paused(true);
    return () => {
      document.body.style.overflow = "auto";
      smoother?.paused(false);
    };
  }, [isOpen]);

  return (
    <LightboxContainer>
      <Button onClick={handleOpen}>{blok.lightbox_text}</Button>
      {isOpen && isClient && (
        <>
          {isVideoModal ? (
            <CardModal data={videoModalData} setShowModal={setIsOpen} />
          ) : (
            // Use original form modal for non-video content
            createPortal(
              <Overlay onClick={handleClose}>
                <FormContent>
                  <CloseBtn onClick={handleClose}>ⓧ</CloseBtn>
                  <Form blok={formBlok} />
                </FormContent>
              </Overlay>,
              document.body,
            )
          )}
        </>
      )}
    </LightboxContainer>
  );
};

const Button = styled.div`
  ${text.bodyMd};
  cursor: pointer;
  width: max-content;
  background-color: ${colors.primaryOrange};
  color: white;
  border-radius: 1.75vw;
  padding: 0.75vw 1vw;
  ${media.fullWidth} {
    border-radius: 28px;
    padding: 12px 16px;
  }
  ${media.tablet} {
    border-radius: 2.734vw;
    padding: 1.172vw 1.563vw;
  }
  ${media.mobile} {
    border-radius: 5.833vw;
    padding: 2.5vw 3.333vw;
    margin-bottom: 4.673vw;
  }
  ${media.hover} {
    &:hover {
      background-color: ${colors.white};
      color: ${colors.primaryOrange};
      outline: solid ${colors.primaryOrange} 2px;
    }
  }
`;

const LightboxContainer = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContent = styled.div`
  background-color: transparent;
  padding: 1.389vw;
  border-radius: 1.389vw;
  ${media.fullWidth} {
    padding: 20px;
    border-radius: 20px;
  }
  ${media.tablet} {
    padding: 1.953vw;
    border-radius: 1.953vw;
  }
  ${media.mobile} {
    padding: 4.673vw;
    border-radius: 4.673vw;
  }
`;

const CloseBtn = styled.p`
  opacity: 0;
  position: relative;
  font-size: 1.389vw;
  left: 93%;
  top: 2.5vw;
  width: fit-content;
  font-family: "Archivo";
  color: ${colors.grey600};
  z-index: 4;
  cursor: pointer;
  ${media.fullWidth} {
    font-size: 20px;
    left: 93%;
    top: 36px;
  }
  ${media.tablet} {
    font-size: 1.953vw;
    left: 91%;
    top: 2.93vw;
  }
  ${media.mobile} {
    opacity: 1;
    font-size: 4.673vw;
    top: 7.009vw;
    left: 90%;
  }
`;

export default LightboxBtn;
