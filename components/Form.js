'use client';
import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';

import { useThankYou } from '@/context/ThankYouContext';
import { useAvailableThemes } from '@/context/ThemeContext';
import getMedia from '@/functions/getMedia';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

const Form = ({ blok }) => {
  const { thankYouCopy, updateThankYouCopy } = useThankYou();
  const router = useRouter();
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [isLoaded, setIsLoaded] = useState(false);
  const [stepDone, setStepDone] = useState(false);
  const formWidth = getMedia('1096px', '76.111vw', '90.82vw', '87.85vw');
  const formHeight = getMedia('733px', '50.875vw', '77.137vw', '288.084vw');
  const lineWidth = getMedia('220px', '15.278vw', '19.531vw', '7.187vw');
  const xFormPosition = getMedia(0, 0, -27, 0);
  const contentVisibility = getMedia(0, 0, 0, 1);
  const languageRef = useRef('en');
  const routingLang = useRef('Demo Request - EN');
  const demoTl = useRef(null);

  const handleLeanDataMessage = (event) => {
    switch (event.data.message) {
      case 'LD_POPUP_CLOSED':
        dataLayer.push({
          event: 'lean_data_popup_closed',
          form_id: blok.form_id,
          popup_close_date: new Date().toISOString(),
          popup_data: event.data.responseData,
        });
        break;
      case 'LD_POST_BOOKING_IMMEDIATE':
        dataLayer.push({
          booking_data: event.data.responseData,
          booking_date: new Date().toISOString(),
          event: 'lean_data_booking_completed',
          form_id: blok.form_id,
        });
        break;
      case 'LD_ROUTING_RESPONSE':
        dataLayer.push({
          event: 'lean_data_routing_response',
          form_id: blok.form_id,
          routing_data: event.data.responseData,
          routing_response_date: new Date().toISOString(),
        });
        break;
      case 'LD_ROUTING_TIMED_OUT':
        dataLayer.push({
          event: 'lean_data_routing_timeout',
          form_id: blok.form_id,
          timeout_data: event.data.responseData,
          timeout_date: new Date().toISOString(),
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (blok?.thank_you_copy) {
      updateThankYouCopy(blok?.thank_you_copy);
    }
  }, [thankYouCopy, blok?.thank_you_copy]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const pathLocale = pathname.split('/')[1];

      if (['de', 'fr'].includes(pathLocale)) {
        languageRef.current = pathLocale;
        routingLang.current =
          pathLocale === 'de' ? 'Demo Request - DE' : 'Demo Request - FR';
      } else {
        languageRef.current = 'en';
      }
    }
  }, []);

  useEffect(() => {
    if (!document.getElementById('mktoForms')) {
      loadScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    demoTl.current = gsap.timeline({ paused: true });
    gsap.set('.bookit-content-container', { display: 'none', opacity: 0 });

    if (blok.animated) {
      window.addEventListener('message', handleLeanDataMessage);

      demoTl.current
        .to('.preformContent', { opacity: contentVisibility })
        .to('.preformContent', { display: 'none' }, '<')
        .to('.marketoForm', { opacity: 0 }, '<')
        .to('#formPos', { duration: 1.25, xPercent: xFormPosition })
        .to('#formContainer', { duration: 1.25, height: formHeight, width: formWidth }, '<')
        .to('.lines', { duration: 1.25, width: lineWidth }, '<')
        .from('.second', { background: 'unset', duration: 1.25 }, '<')
        .to('.marketoForm', { display: 'none' }, '<')
        .set('.bookit-content-container', { display: 'block' })
        .to('.bookit-content-container', { opacity: 1 });

      const script = document.createElement('script');
      script.src = 'https://cdn.leandata.com/js-snippet/ld-book-v2.js';
      script.async = false;

      script.addEventListener('load', () => {
        const initConfig = {
          beforeRouting: (formTarget, formData) => {
            formData['thank_you_language'] = languageRef.current;
            formData['routing_node_trigger'] = routingLang.current;
          },
          calendarTimeoutLength: 900,
          defaultLanguage: languageRef.current,
          useIframe: blok.animated,
        };

        window.LDBookItV2.initialize(
          '00DE0000000bt64MAA',
          routingLang.current,
          'LD_BookIt_Log_ID__c',
          initConfig
        );

        window.LDBookItV2.setFormProvider('marketo');
      });

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        window.removeEventListener('message', handleLeanDataMessage);
      };
    }
  }, []);

  useEffect(() => {
    isLoaded &&
      window?.MktoForms2?.loadForm(
        'https://info.printerlogic.com',
        '338-HTA-134',
        blok.form_id,
        (form) => {
          const runMspCustomizations = () => {
            const container = document.getElementById(`mktoForm_${blok.form_id}`);
            const formEl = container?.querySelector('form');
            if (formEl) applyMspFormCustomizations(formEl);
          };
          // Stagger retries to handle Marketo's asynchronous rendering
          setTimeout(runMspCustomizations, 200);
          setTimeout(runMspCustomizations, 800);
          setTimeout(runMspCustomizations, 1500);
          setTimeout(runMspCustomizations, 2500);

          form.onSuccess(function (submittedValues) {
            if (blok.animated) {
              if (window.LDBookItV2) {
                window.LDBookItV2.saveFormData(submittedValues);
                window.LDBookItV2.submit({
                  cb: window.LDBookItV2.getIframeFn('100%', '100%', '300'),
                  formData: submittedValues,
                });
                demoTl.current.play();
                setStepDone(true);
                dataLayer.push({
                  event: 'marketo_form_submission_success',
                  form_id: blok.form_id,
                  form_submission_date: new Date().toISOString(),
                });
                return false;
              } else {
                alert(
                  'There was a problem connecting to our scheduling system. Please contact support.'
                );
                dataLayer.push({
                  event: 'marketo_form_submission_failed',
                  form_id: blok.form_id,
                  form_submission_date: new Date().toISOString(),
                });
              }
            } else if (blok.redirect_link.cached_url) {
              updateThankYouCopy(blok?.thank_you_copy);

              const isExternal = (url) => /^https?:\/\//.test(url);

              let redirectUrl =
                typeof blok.redirect_link === 'string'
                  ? blok.redirect_link
                  : blok.redirect_link?.cached_url || '/thank-you';

              if (!isExternal(redirectUrl) && !redirectUrl.startsWith('/')) {
                redirectUrl = '/' + redirectUrl;
              }

              if (blok.new_tab) {
                window.open(redirectUrl, '_blank', 'noopener,noreferrer');
              } else if (isExternal(redirectUrl)) {
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
    const s = document.createElement('script');
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
      <FormContainer id="formContainer">
        {blok.header && <FormHeader>{blok.header}</FormHeader>}
        {blok.animated && (
          <>
            <CalendarContainer className="bookit-content-container" />
            <StepsContainer>
              <Step>
                <Circle>{stepDone ? '✔' : 1}</Circle>
                <StepText>{blok.step_text ? blok.step_text : 'Fill Out Form'}</StepText>
              </Step>
              <Line className="lines" />
              <Line className="lines second" />
              <Step>
                <Circle className="second"> 2</Circle>
                <StepText id="stepTwo">
                  {blok.step_text_next ? blok.step_text_next : 'Pick Your Time'}
                </StepText>
              </Step>
            </StepsContainer>
          </>
        )}
        <MarketoForm className="marketoForm" id={`mktoForm_${blok.form_id}`}></MarketoForm>
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
  background-color: ${colors.white};
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
  align-items: start;
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
  box-shadow:
    0vw 0vw 0.125vw 0vw rgba(25, 29, 30, 0.04),
    0vw 0.25vw 0.5vw 0vw rgba(25, 29, 30, 0.16);

  ${media.fullWidth} {
    border-radius: 32px;
    padding: 32px;
    width: 564px;
    box-shadow:
      0px 0px 2px 0px rgba(25, 29, 30, 0.04),
      0px 4px 8px 0px rgba(25, 29, 30, 0.16);
  }

  ${media.tablet} {
    border-radius: 3.125vw;
    padding: 3.125vw;
    width: 45.313vw;
    box-shadow:
      0vw 0vw 0.195vw 0vw rgba(25, 29, 30, 0.04),
      0vw 0.391vw 0.781vw 0vw rgba(25, 29, 30, 0.16);
  }

  ${media.mobile} {
    border-radius: 6.667vw;
    padding: 6.667vw;
    width: 89.167vw;
    box-shadow:
      0vw 0vw 0.417vw 0vw rgba(25, 29, 30, 0.04),
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

  .mktoFieldDescriptor:has(#LblformFriendlyProductofInterest) {
    max-height: none !important;

    ${media.fullWidth} {
      max-height: none !important;
    }

    ${media.tablet} {
      max-height: none !important;
    }

    ${media.mobile} {
      max-height: none !important;
    }
  }

  /* MSP qualification questions: allow multi-line labels and full-width layout */
  .mktoFieldDescriptor:has(#MSP_Initial_Printers_Supported__c),
  .mktoFieldDescriptor:has(#MSP_Total_Printers_Supported__c),
  .mktoFieldDescriptor:has(#MSP_Number_of_Users_Supported__c) {
    max-height: none !important;

    ${media.fullWidth} {
      max-height: none !important;
    }

    ${media.tablet} {
      max-height: none !important;
    }

    ${media.mobile} {
      max-height: none !important;
    }
  }

  .mktoFieldDescriptor.msp-demo-date-row {
    max-height: none !important;

    select {
      ${text.bodySm};
      width: 100% !important;
      max-width: 100%;
      box-sizing: border-box;

      ${media.fullWidth} {
        width: 100% !important;
        max-width: 500px;
      }

      ${media.tablet} {
        width: 100% !important;
        max-width: 39.063vw;
      }

      ${media.mobile} {
        width: 100% !important;
        max-width: 75.833vw;
      }
    }
  }

  .mktoFieldWrap:has(#MSP_Initial_Printers_Supported__c) label,
  .mktoFieldWrap:has(#MSP_Total_Printers_Supported__c) label,
  .mktoFieldWrap:has(#MSP_Number_of_Users_Supported__c) label {
    width: 100% !important;
    max-width: 100%;
  }

  /* Spacing above first MSP question ("How many printers will you need to initially support...") */
  .mktoFormRow:has(#MSP_Initial_Printers_Supported__c) {
    margin-top: 1rem;
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
      padding: unset !important;
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
    width: 100% !important;
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
    justify-content: left !important;
    padding: unset !important;

    ${media.mobile} {
      width: 108% !important;
    }

    label {
      margin: 0 1vw 0 0.25vw !important;
      width: max-content !important;

      ${media.fullWidth} {
        margin: 0 16px 0 4px !important;
      }

      ${media.tablet} {
        margin: 0 7.563vw 0 0.325vw !important;
      }

      ${media.mobile} {
        margin: 1vw 15.5vw 0 0.833vw !important;
      }
    }
  }

  .mktoCheckboxList input[type='checkbox'] {
    height: auto !important;
    margin-right: 0vw !important;
    border-radius: 0.25vw !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    width: 0.938vw !important;
    height: 0.938vw !important;
    min-height: 0.938vw !important;
    border: 1px solid ${(props) => props.theme.form.inputBorder} !important;
    background-color: ${(props) => props.theme.form.inputBg} !important;
    cursor: pointer !important;
    position: relative !important;
    padding: unset !important;

    &:checked {
      background-color: ${colors.primaryOrange} !important;
      border-color: ${colors.primaryOrange} !important;
    }

    &:checked::after {
      content: '✓' !important;
      position: absolute !important;
      color: ${colors.white} !important;
      font-size: 0.75vw !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
    }

    ${media.fullWidth} {
      margin-right: 0px !important;
      width: 15px !important;
      height: 15px !important;
      min-height: 15px !important;
      border-radius: 4px !important;
      &:checked::after {
        font-size: 12px !important;
      }
    }

    ${media.tablet} {
      margin-right: 0.781vw !important;
      width: 1.563vw !important;
      height: 1.563vw !important;
      min-height: 1.563vw !important;
      border-radius: 0.391vw !important;
      &:checked::after {
        font-size: 0.977vw !important;
      }
    }

    ${media.mobile} {
      margin-right: 0vw !important;
      margin-top: 1vw !important;
      width: 4.167vw !important;
      height: 4.167vw !important;
      min-height: 4.167vw !important;
      border-radius: 0.833vw !important;
      &:checked::after {
        font-size: 2.5vw !important;
      }
    }
  }
  #LblemailOptIn {
    color: ${(props) => props.theme.form.textColor};
    display: flex;
    align-items: center !important;
    gap: 0.5vw;
    margin: 0 !important;
    min-width: max-content !important;
    min-height: unset !important;
    margin-right: 0.5vw !important;

    ${media.fullWidth} {
      margin-right: 8px !important;
      gap: 8px;
    }

    ${media.tablet} {
      margin-right: 0.781vw !important;
      gap: 0.781vw;
    }

    ${media.mobile} {
      margin-right: 1.667vw !important;
      gap: 1.667vw;
    }
  }

  .mktoFormRow:has(.mktoCheckboxList) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 1vw 0 0 0;
    padding: unset !important;

    ${media.fullWidth} {
      margin: 16px 0 0 0;
    }

    ${media.tablet} {
      margin: 1.563vw 0 0 0;
    }

    ${media.mobile} {
      margin: 3.333vw 0 0 0;
    }
  }

  button {
    ${text.bodyMdBold};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.primaryOrange};
    color: ${colors.white};
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
    color: ${(props) => props.theme.form.textColor};
    ${text.bodyMd};
    width: max-content !important;
  }

  input {
    ${text.bodyMd};
    border: 1px solid ${(props) => props.theme.form.inputBorder};
    background: ${(props) => props.theme.form.inputBg};
    color: ${(props) => props.theme.form.placeHolderColor};
    padding: 1vw !important;
    border-radius: 0.25vw;
    height: 3.375vw;
    width: 31.25vw !important;

    ${media.fullWidth} {
      padding: 16px !important;
      border-radius: 4px;
      height: 54px;
      width: 500px !important;
    }

    ${media.tablet} {
      padding: 1.563vw !important;
      border-radius: 0.391vw;
      height: 5.273vw;
      width: 39.063vw !important;
    }

    ${media.mobile} {
      padding: 3.333vw !important;
      border-radius: 0.833vw;
      min-height: 11.25vw;
      width: 75.833vw !important;
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
    padding: 1vw !important;
    border-radius: 0.25vw;
    height: 3.375vw;

    ${media.fullWidth} {
      width: 500px !important;
      padding: 16px !important;
      border-radius: 4px;
      height: 54px;
    }

    ${media.tablet} {
      width: 39.063vw !important;
      padding: 1.563vw !important;
      border-radius: 0.391vw;
      height: 5.273vw;
    }

    ${media.mobile} {
      width: 75.833vw !important;
      padding: 3.333vw !important;
      border-radius: 0.833vw;
      min-height: 11.25vw;
    }
    option {
      ${text.bodyMd};
    }
  }
  .mktoFieldWrap {
    display: flex !important;
    position: relative;
    gap: 0.2rem;

    .mktoLabel {
      ${text.bodyMd};
      font-weight: 400 !important;
    }

    #LblformFriendlyProductofInterest {
      width: 100% !important;
    }

    label {
      #formFriendlyProductofInterest {
        margin-bottom: 0.75vw !important;
      }
    }
    &:has(> label) {
      flex-direction: column !important;
    }

    &:has(label[id='LblemailOptIn']) {
      flex-direction: row !important;
      width: max-content !important;
    }
  }
  .mktoHtmlText {
    width: unset !important;
  }

  .mktoAsterix {
    display: none !important;
  }

  .mktoHtmlText span {
    position: absolute;
    top: 19px;
    width: 75.833vw;

    ${media.tablet} {
      top: 25px;
      width: 39.063vw;
    }

    ${media.desktop} {
      top: 25px;
      width: 30.833vw;
    }

    ${media.fullWidth} {
      top: 30px;
      width: 500px;
    }
  }
`;

function filterPastDemoDates() {
  const selectEl = document.getElementById('mSPGroupDemoDate');
  if (!selectEl) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Iterate backwards so removing by index doesn't shift unvisited options
  for (let i = selectEl.options.length - 1; i >= 0; i--) {
    const val = selectEl.options[i].value;
    if (!val) continue;
    const parts = val.split('/');
    if (parts.length === 3) {
      const optionDate = new Date(parts[2], parts[0] - 1, parts[1]);
      optionDate.setHours(0, 0, 0, 0);
      if (optionDate < today) {
        selectEl.remove(i);
      }
    }
  }
}

export function applyMspFormCustomizations(formEl) {
  if (!formEl) return;
  filterPastDemoDates();
}

export default Form;
