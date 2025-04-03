"use client";
import React, { useState, useEffect, useRef } from "react";

import gsap from "gsap";
import styled, { ThemeProvider } from "styled-components";
import { useAvailableThemes } from "@/context/ThemeContext";
import { storyblokEditable } from "@storyblok/react/rsc";
import media from "@/styles/media";
import getMedia from "@/functions/getMedia";
import colors from "@/styles/colors";
import text from "@/styles/text";
import { useThankYou } from "@/context/ThankYouContext";
import { useRouter } from "next/navigation";

const Form = ({ blok }) => {
  // console.log(blok)
  const { thankYouCopy, updateThankYouCopy } = useThankYou();
  const router = useRouter();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [isLoaded, setIsLoaded] = useState(false);
  const [stepDone, setStepDone] = useState(false);
  const formWidth = getMedia("1096px", "76.111vw", "90.82vw", "87.85vw");
  const formHeight = getMedia("733px", "50.875vw", "77.137vw", "288.084vw");
  const lineWidth = getMedia("220px", "15.278vw", "19.531vw", "7.187vw");
  const formPosition = getMedia(-28, -28, -27, 0);
  const contentVisibility = getMedia(0, 0, 0, 1);
  const languageRef = useRef("en");
  const originRef = useRef("va");

  useEffect(() => {
    if (blok?.thank_you_copy) {
      updateThankYouCopy(blok.thank_you_copy);
      // console.log(thankYouCopy, blok?.thank_you_copy);
    }
  }, [thankYouCopy, blok?.thank_you_copy]);

  useEffect(() => {
    function getOriginDomain(url) {
      return url.split(".com")[0] + ".com";
    }

    if (typeof window !== "undefined") {
      const originDomain = getOriginDomain(window.location.hostname);

      if (originDomain.includes("printerlogic")) {
        originRef.current = "pl";
      } else if (originDomain.includes("vasion")) {
        originRef.current = "va";
      }
    }
  }, []);
  // TODO: refactor this to work with our new structure
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const hostname = window.location.hostname;

  //     if (hostname.startsWith("de")) {
  //       languageRef.current = "de";
  //     } else if (hostname.startsWith("fr")) {
  //       languageRef.current = "fr";
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (!document.getElementById("mktoForms")) {
      loadScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const demoTl = gsap.timeline({ paused: true });
    gsap.set(".bookit-content-container", { display: "none", opacity: 0 });

    if (blok.animated) {
      demoTl
        .to(".preformContent", { opacity: contentVisibility })
        .to(".marketoForm", { opacity: 0 }, "<")
        .to("#formPos", { xPercent: formPosition, duration: 1.25 })
        .to("#formContainer", { width: formWidth, height: formHeight, duration: 1.25 }, "<")
        .to(".lines", { width: lineWidth, duration: 1.25 }, "<")
        .from(".second", { duration: 1.25, background: "unset" }, "<")
        .to(".marketoForm", { display: "none" }, "<")
        .set(".bookit-content-container", { display: "block" })
        .to(".bookit-content-container", { opacity: 1 });
    }

    const script = document.createElement("script");
    script.src = "https://cdn.leandata.com/js-snippet/ld-book-v2.js";
    script.async = false;

    script.addEventListener("load", () => {
      console.log("timeoutLang", languageRef.current);
      const urlParams = new URLSearchParams(window.location.search);
      const aliIdExists = urlParams.has("aliId");
      const initConfig = {
        calendarTimeoutLength: 900,
        beforeRouting: (formTarget, formData) => {
          console.log("lean data language:", languageRef.current); // Use the ref here
          formData["thank_you_language"] = languageRef.current;
          formData["origin_domain"] = originRef.current;
        },
        useIframe: blok.animated,
      };

      window.LDBookItV2.initialize(
        "00DE0000000bt64MAA",
        "Demo Request",
        "LD_BookIt_Log_ID__c",
        initConfig,
      );

      if (aliIdExists) {
        window.LDBookItV2.submit(
          blok.animated
            ? { cb: window.LDBookItV2.getIframeFn("100%", "100%", "300") }
            : undefined,
        );
        if (blok.animated) {
          demoTl.play();
          setStepDone(true);
        }
      } else {
        window.LDBookItV2.setFormProvider("marketo");
      }
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    window?.MktoForms2?.loadForm(
      "https://info.printerlogic.com",
      "338-HTA-134",
      blok.form_id,
      (form) => {
        form.onSuccess(() => {
          if (blok.animated) {
            console.log("Thank You");
          } else if (blok.redirect_link) {
            updateThankYouCopy(blok.thank_you_copy);
            console.log(thankYouData);
            router.push(blok.redirect_link);
            return false;
          }
        });
      },
    );
  }, [isLoaded, blok.form_id, blok.redirectLink]);

  const loadScript = () => {
    var s = document.createElement("script");
    s.id = "mktoForms";
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://info.printerlogic.com/js/forms2/js/forms2.min.js";
    s.onreadystatechange = function () {
      if (this.readyState === "complete" || this.readyState === "loaded") {
        setIsLoaded(true);
      }
    };
    s.onload = () => setIsLoaded(true);
    document.getElementsByTagName("head")[0].appendChild(s);
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <FormContainer>
        {blok.header && <FormHeader>{blok.header}</FormHeader>}
        <MarketoForm
          className="marketoForm"
          id={`mktoForm_${blok.form_id}`}
        ></MarketoForm>
      </FormContainer>
    </ThemeProvider>
  );
};

const MarketoForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  /* justify-content: center; */
  align-items: start;
  text-align: center;
  width: 31.25vw !important;
  gap: 1.25vw 1.25vw;

  ${media.fullWidth} {
    width: 500px !important;
  gap: 20px 20px;
  }
  
  ${media.tablet} {
    width: 39.063vw !important;
    gap: 1.953vw 1.953vw;
  }
  
  ${media.mobile} {
    width: 75.833vw !important;
    gap: 4.167vw 4.167vw;
    padding: unset !important;
  }
`;
const FormHeader = styled.h4`
  ${text.h4};
  align-self: center;
  gap: 1.25vw 1.25vw;
  margin-bottom: 2vw;

  ${media.fullWidth} {
    gap: 20px 20px;
    margin-bottom: 32px;
  }

  ${media.tablet} {
    gap: 1.953vw 1.953vw;
    margin-bottom: 3.125vw;
  }

  ${media.mobile} {
    gap: 4.167vw 4.167vw;
    margin-bottom: 6.667vw;
  }
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.form.formBg};
  color: ${(props) => props.theme.form.textColor};
  border-radius: 2vw;
  padding: 2vw;
  width: 35.25vw;
  box-shadow: 0vw 0vw 0.125vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.25vw 0.5vw 0vw rgba(25, 29, 30, 0.16);


  ${media.fullWidth} {
    border-radius: 32px;
  padding: 32px;
  width: 564px;
  box-shadow: 0px 0px 2px 0px rgba(25, 29, 30, 0.04), 0px 4px 8px 0px rgba(25, 29, 30, 0.16);

  }
  
  ${media.tablet} {
    border-radius: 3.125vw;
  padding: 3.125vw;
  width: 45.313vw;
  box-shadow: 0vw 0vw 0.195vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.391vw 0.781vw 0vw rgba(25, 29, 30, 0.16);

  }
  
  ${media.mobile} {
    border-radius: 6.667vw;
  padding: 6.667vw;
  width: 89.167vw;
  box-shadow: 0vw 0vw 0.417vw 0vw rgba(25, 29, 30, 0.04), 0vw 0.833vw 1.667vw 0vw rgba(25, 29, 30, 0.16);

  }

  .mktoFieldDescriptor {
    max-height: 3.375vw !important;

    ${media.fullWidth} {
      max-height: 54px !important;
    }
    
    ${media.tablet} {
      max-height: 5.273vw !important;
    }
    
    ${media.mobile} {
      max-height: 11.25vw !important;
    }
  }

  .mktoCaptchaDisclaimer {
    display: none;
  }
  .mktoFormRow:has(> .mktoPlaceholder) {
    display: none;
  }

  .mktoFormRow:has(a[href*="vasion.com/privacy-policy"]) span {
    ${text.bodySm};
    text-align: center;
    color: ${(props) => props.theme.form.textColor};

    a {
      color: ${colors.primaryOrange};
    }
  }

  .mktoFormRow:has(> input[type="hidden"]) {
    display: none;
  }

  .mktoButtonRow {
    width: 100%;
  }
.mktoOffset, .mktoGutter {
  width: unset !important;
}
  button {
    ${text.bodyMdBold};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.primaryOrange};
    color: white;
    width: 100%;
    padding: 0.75vw 0;
    border-radius: 2.375vw;

    ${media.fullWidth} {
      padding: 12px 0;
    border-radius: 38px;
    }
    
    ${media.tablet} {
      padding: 1.172vw 0;
      border-radius: 3.711vw;
    }
    
    ${media.mobile} {
      padding: 2.5vw 0;
      border-radius: 7.917vw;
      max-width: 75.833vw !important;
    }
    &:hover {
      background: white;
      color: ${colors.primaryOrange};
      border: 1px solid ${colors.primaryOrange};
    }
  }
  label {
    display: none;
  }
  input {
    ${text.bodyMd};
    border: 1px solid ${(props) => props.theme.form.inputBorder};
    background: ${(props) => props.theme.form.inputBg};
    color: ${(props) => props.theme.form.placeHolderColor};
    padding: 1vw !important;
    border-radius: 0.25vw;
    height: 3.375vw;

    ${media.fullWidth} {
      padding: 16px !important;
    border-radius: 4px;
    height: 54px;
    }
    
    ${media.tablet} {
      padding: 1.563vw !important;
    border-radius: 0.391vw;
    height: 5.273vw;
    }
    
    ${media.mobile} {
      padding: 3.333vw !important;
    border-radius: 0.833vw;
    min-height: 11.25vw;
    }

    &#FirstName, &#LastName {
      width: 15vw !important;

      ${media.fullWidth} {
        width: 240px !important;
      }
      
      ${media.tablet} {
        width: 18.555vw !important;
      }
      
      ${media.mobile} {
        width: 35.833vw !important;
      }
    }

    &#Email, &#Phone, &#Company,  &#How_did_you_hear_about_us__c  {
      width: 31.25vw !important;

      ${media.fullWidth} {
        width: 500px !important;
      }
      
      ${media.tablet} {
        width: 39.063vw !important;
      }
      
      ${media.mobile} {
        width: 75.833vw !important;
      }
    }
  }

  input:focus {
    background: ${(props) => props.theme.form.formBg};
  }

  input:invalid {
    border: 0.063vw solid ${(props) => props.theme.form.errorColor};;
  }

  .mktoErrorMsg {
    ${text.bodySm};
    color:  ${(props) => props.theme.form.errorColor};
    margin-top: 0.5vw;

    ${media.fullWidth} {
      margin-top: 8px;
    }
    
    ${media.tablet} {
      margin-top: 0.781vw;
    }
    
    ${media.mobile} {
      margin-top: 1.667vw;
    }
  }

  select {
    ${text.bodyMd};
    border: 1px solid ${(props) => props.theme.form.inputBorder};
    background: ${(props) => props.theme.form.inputBg};
    color: ${(props) => props.theme.form.selectPlaceHolderColor} !important;
    width: 31.25vw !important;
    padding: 1vw;
    border-radius: 0.25vw;
    height: 3.375vw;

    ${media.fullWidth} {
      width: 500px !important;
    padding: 16px;
    border-radius: 4px;
    height: 54px;
    }
    
    ${media.tablet} {
      width: 39.063vw !important;
    padding: 1.563vw;
    border-radius: 0.391vw;
    height: 5.273vw;
    }
    
    ${media.mobile} {
      width: 75.833vw !important;
    padding: 3.333vw;
    border-radius: 0.833vw;
    min-height: 11.25vw;
    }
    option {
      ${text.bodyMd};
    }

    ${media.fullWidth} {
    }

    ${media.tablet} {
    }

    ${media.mobile} {
    }
  }
  ${media.fullWidth} {
  }

  ${media.tablet} {
  }

  ${media.mobile} {
  }
`;
export default Form;
