"use client";
import React, { useState } from "react";
import styled from "styled-components";
import colors from "@/styles/colors";
import media from "@/styles/media";
import Form from "./Form";

const LightboxBtn = ({ blok }) => {
  console.log("LightBox", blok);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };
  const formBlok = {
    form_id: blok.form_id,
    thank_you_copy: blok.thank_you,
    redirect_link: blok.redirect_link || null,
    theme: blok.theme || "default",
    header: blok.form_header || null,
    animated: blok.animated || false,
  };
  return (
    <LightboxContainer>
      <PrimaryCta onClick={handleOpen}>{blok.lightbox_text}</PrimaryCta>
      {isOpen && (
        <Overlay onClick={(e) => handleClose(e)}>
          <FormContent>
            <CloseBtn onClick={handleClose}>ⓧ</CloseBtn>
            <Form blok={formBlok} />
          </FormContent>
        </Overlay>
      )}
    </LightboxContainer>
  );
};

const PrimaryCta = styled.button`
  background-color: ${colors.primaryOrange};
  color: white;
  text-transform: uppercase;
  padding: 0.556vw 2.083vw;
  border-radius: 1.667vw;
  font-family: "Archivo", sans-serif;

  ${media.fullWidth} {
    padding: 8px 30px;
    border-radius: 24px;
  }
  ${media.tablet} {
    padding: 0.781vw 2.93vw;
    border-radius: 2.344vw;
  }
  ${media.mobile} {
    padding: 1.869vw 7.009vw;
    border-radius: 5.607vw;
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
