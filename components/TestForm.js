'use client';
import React, { useState, useEffect, useRef } from 'react';

import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import getMedia from '@/functions/getMedia';
import colors from '@/styles/colors';
import text from '@/styles/text';
import { useThankYou } from '@/context/ThankYouContext';
import { useRouter } from 'next/navigation';

const TestForm = ({ blok }) => {
  // console.log(blok.redirect_link)
  const { thankYouCopy, updateThankYouCopy } = useThankYou();
  const router = useRouter();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [isLoaded, setIsLoaded] = useState(false);
  const [stepDone, setStepDone] = useState(false);
  const formWidth = getMedia("1096px", "76.111vw", '90.82vw', '87.85vw');
  const formHeight = getMedia("733px", "50.875vw", '77.137vw', '288.084vw');
  const lineWidth = getMedia('220px', '15.278vw', '19.531vw', '7.187vw');
  const xFormPosition = getMedia(-28, -28, -27, 0);
  // const yFormPosition = getMedia(-277, -277, -27, 0);
  const contentVisibility = getMedia(0, 0, 0, 1);
  const languageRef = useRef('en');
  const routingLang = useRef('Demo Request');
  const originRef = useRef('va');

  useEffect(() => {
    if (blok?.thank_you_copy) {
      updateThankYouCopy(blok?.thank_you_copy);
      // console.log(thankYouCopy, blok?.thank_you_copy);
    }
  }, [thankYouCopy, blok?.thank_you_copy]);

  useEffect(() => {
    function getOriginDomain(url) {
      return url.split('.com')[0] + '.com';
    }

    if (typeof window !== 'undefined') {
      const originDomain = getOriginDomain(window.location.hostname);

      if (originDomain.includes('printerlogic')) {
        originRef.current = 'pl';
      } else if (originDomain.includes('vasion')) {
        originRef.current = 'va';
      }
    }
  }, []);
  // TODO: refactor this to work with our new structure
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const pathLocale = pathname.split('/')[1];

      if (['de', 'fr'].includes(pathLocale)) {
        languageRef.current = pathLocale;
        if (pathLocale === 'de') {
          routingLang.current = "Demo Request - DE"
        } else if (pathLocale === 'fr') {
          routingLang.current = "Demo Request - FR"
        } else {
          routingLang.current = 'Demo Request'
        }
      } else {
        languageRef.current = 'en';
      }
    }
    console.log(routingLang.current)
  }, []);

  useEffect(() => {
    if (!document.getElementById('mktoForms')) {
      loadScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const demoTl = gsap.timeline({ paused: true });
    gsap.set('.bookit-content-container', { display: 'none', opacity: 0 });

    if (blok.animated) {
      demoTl
        .to('.preformContent', { opacity: contentVisibility })
        .to('.marketoForm', { opacity: 0 }, '<')
        .to('#formPos', { xPercent: xFormPosition,  duration: 1.25 })
        .to('#formContainer',{ width: formWidth, height: formHeight, duration: 1.25 },'<'
        )
        .to('.lines', { width: lineWidth, duration: 1.25 }, '<')
        .from('.second', { duration: 1.25, background: 'unset' }, '<')
        .to('.marketoForm', { display: 'none' }, '<')
        .set('.bookit-content-container', { display: 'block' })
        .to('.bookit-content-container', { opacity: 1 });
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.leandata.com/js-snippet/ld-book-v2.js';
    script.async = false;

    script.addEventListener('load', () => {
      console.log('timeoutLang', languageRef.current);
      const urlParams = new URLSearchParams(window.location.search);
      const aliIdExists = urlParams.has('aliId');
      const initConfig = {
        calendarTimeoutLength: 900,
        beforeRouting: (formTarget, formData) => {
          console.log('lean data language:', languageRef.current); // Use the ref here
          formData['thank_you_language'] = languageRef.current;
          formData['origin_domain'] = originRef.current;
        },
        useIframe: blok.animated,
      };

      window.LDBookItV2.initialize(
        '00DE0000000bt64MAA',
        routingLang.current,
        'LD_BookIt_Log_ID__c',
        initConfig
      );

      if (aliIdExists) {
        window.LDBookItV2.submit(
          blok.animated
            ? { cb: window.LDBookItV2.getIframeFn('100%', '100%', '300') }
            : undefined
        );
        if (blok.animated) {
          demoTl.play();
          setStepDone(true);
        }
      } else {
        window.LDBookItV2.setFormProvider('marketo');
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
      'https://info.printerlogic.com',
      '338-HTA-134',
      blok.form_id,
      (form) => {
        form.onSuccess(() => {
          if (blok.animated) {
            LDBookItV2.saveFormData({ formData: formData });
            console.log('Thank You');
          } else if (blok.redirect_link.cached_url) {
            updateThankYouCopy(blok?.thank_you_copy);
  
            const isExternal = (url) => /^https?:\/\//.test(url);

            let redirectUrl =
              typeof blok.redirect_link === "string"
                ? blok.redirect_link
                : blok.redirect_link?.cached_url || "/thank-you";
            
            // 👇 Ensure root-relative if internal
            if (!isExternal(redirectUrl) && !redirectUrl.startsWith("/")) {
              redirectUrl = "/" + redirectUrl;
            }
            
            if (isExternal(redirectUrl)) {
              window.location.href = redirectUrl;
            } else {
              router.push(redirectUrl);
            }
  
            return false; 
          }
        });
      }
    );
  }, [isLoaded, blok.form_id, blok.redirectLink]);

  const loadScript = () => {
    var s = document.createElement('script');
    s.id = 'mktoForms';
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://info.printerlogic.com/js/forms2/js/forms2.min.js';
    s.onreadystatechange = function () {
      if (this.readyState === 'complete' || this.readyState === 'loaded') {
        setIsLoaded(true);
      }
    };
    s.onload = () => setIsLoaded(true);
    document.getElementsByTagName('head')[0].appendChild(s);
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <FormContainer id='formContainer'>
        {blok.header && <FormHeader>{blok.header}</FormHeader>}
        {blok.animated && (
          <>
            <CalendarContainer className='bookit-content-container' />
            <StepsContainer>
              <Step>
                <Circle>{stepDone ? '✔' : 1}</Circle>
                <StepText>Fill Out Form</StepText>
              </Step>
              <Line className='lines' />
              <Line className='lines second' />
              <Step>
                <Circle className='second'> 2</Circle>
                <StepText id='stepTwo'>Pick Your Time</StepText>
              </Step>
            </StepsContainer>
          </>
        )}
        <MarketoForm
          className='marketoForm'
          id={`mktoForm_${blok.form_id}`}
        ></MarketoForm>
      </FormContainer>
    </ThemeProvider>
  );
};

const Step = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.lightPurpleGrey};
  padding: 0.347vw 0.556vw;
  border-radius: 6.944vw;
  gap: 0.278vw;

  ${media.fullWidth} {
    padding: 5px 8px;
    border-radius: 100px;
    gap: 4px;
  }

  ${media.tablet} {
    padding: 0.488vw 0.781vw;
    border-radius: 9.766vw;
    gap: 0.391vw;
  }

  ${media.mobile} {
  }
`;
const StepText = styled.p`
  ${text.bodySm};
  width: max-content;
`;
const Line = styled.div`
  width: 4.514vw;
  border: 0.069vw solid ${colors.lightPurpleGrey};

  ${media.fullWidth} {
    width: 65px;
    border: 1px solid ${colors.lightPurpleGrey};
  }

  ${media.tablet} {
    width: 6.348vw;
    border: 0.098vw solid ${colors.lightPurpleGrey};
  }

  ${media.mobile} {
    width: 7.187vw;
    border: 0.234vw solid ${colors.lightPurpleGrey};
  }
`;
const Circle = styled.div`
  position: relative;
  ${text.bodySm};
  color: ${colors.primaryOrange};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 0.208vw solid ${colors.primaryOrange};
  width: 2vw;
  height: 2vw;

  ${media.fullWidth} {
    border: 3px solid ${colors.primaryOrange};
    width: 29px;
    height: 29px;
  }

  ${media.tablet} {
    border: 0.293vw solid ${colors.primaryOrange};
    width: 2.832vw;
    height: 2.832vw;
  }

  ${media.mobile} {
    border: 0.701vw solid ${colors.primaryOrange};
    width: 6.776vw;
    height: 6.776vw;
  }
`;
const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: min-content;
  margin-bottom: 2.222vw;

  ${media.fullWidth} {
    margin-bottom: 32px;
  }

  ${media.tablet} {
    margin-bottom: 3.125vw;
  }

  ${media.mobile} {
    margin-bottom: 7.477vw;
  }
`;
const CalendarContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  justify-self: center;
  align-self: center;
  overflow: hidden;
  top: 7vw;
  width: 72.639vw;
  height: 42.403vw;
  border-radius: 0.833vw;

  ${media.fullWidth} {
    top: 101px;
    width: 1046px;
    height: 611px;
    border-radius: 12px;
  }

  ${media.tablet} {
    top: 9.863vw;
    width: 87.938vw;
    height: 65.223vw;
    border-radius: 1.172vw;
  }

  ${media.mobile} {
    top: 29.598vw;
    width: 82.009vw;
    height: 255.374vw;
    border-radius: 2.804vw;
  }
`;
const MarketoForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
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
position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.form.formBg};
  color: ${(props) => props.theme.form.textColor};
  border-radius: 2vw;
  padding: 2vw;
  width: 35.25vw;
  box-shadow: 0vw 0vw 0.125vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.25vw 0.5vw 0vw rgba(25, 29, 30, 0.16);

  ${media.fullWidth} {
    border-radius: 32px;
    padding: 32px;
    width: 564px;
    box-shadow: 0px 0px 2px 0px rgba(25, 29, 30, 0.04),
      0px 4px 8px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    border-radius: 3.125vw;
    padding: 3.125vw;
    width: 45.313vw;
    box-shadow: 0vw 0vw 0.195vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.391vw 0.781vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    border-radius: 6.667vw;
    padding: 6.667vw;
    width: 89.167vw;
    box-shadow: 0vw 0vw 0.417vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.833vw 1.667vw 0vw rgba(25, 29, 30, 0.16);
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

  .mktoFormRow:has(a[href*='vasion.com/privacy-policy']) span {
    ${text.bodySm};
    text-align: center;
    color: ${(props) => props.theme.form.textColor};

    a {
      color: ${colors.primaryOrange};
    }
  }

  .mktoFormRow:has(> input[type='hidden']) {
    display: none;
  }

  .mktoButtonRow {
    width: 100%;
  }
  .mktoOffset,
  .mktoGutter {
    width: unset !important;
  }
  .mktoCheckboxList {
    width: unset !important;
  }
#LblemailOptIn {
  color: ${(props) => props.theme.form.textColor};
  display: flex;
  gap: 0.125vw;

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

    &#FirstName,
    &#LastName {
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

    &#Email,
    &#Phone,
    &#Company,
    &#How_did_you_hear_about_us__c {
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
    border: 0.063vw solid ${(props) => props.theme.form.errorColor};
  }

  .mktoErrorMsg {
    ${text.bodySm};
    color: ${(props) => props.theme.form.errorColor};
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
export default TestForm;
