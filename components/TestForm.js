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
  const formWidth = getMedia('1096px', '76.111vw', '90.82vw', '87.85vw');
  const formHeight = getMedia('733px', '50.875vw', '77.137vw', '288.084vw');
  const lineWidth = getMedia('220px', '15.278vw', '19.531vw', '7.187vw');
  const xFormPosition = getMedia(0, 0, -27, 0);
  // const yFormPosition = getMedia(-277, -277, -27, 0);
  const contentVisibility = getMedia(0, 0, 0, 1);
  const languageRef = useRef('en');
  const routingLang = useRef('Demo Request - EN');
  const demoTl = useRef(null);

  // Add handler for LeanData events
  const handleLeanDataMessage = (event) => {
    // Only process messages from LeanData
    // if (event.origin !== 'https://cdn.leandata.com') return;

    console.log('Full event data:', event);
    console.log('Event origin:', event.origin);
    console.log('Event data:', event.data);

    switch (event.data.message) {
      case 'LD_ROUTING_RESPONSE':
        console.log('Routing response received:', event.data.responseData);
        dataLayer.push({
          event: 'lean_data_routing_response',
          form_id: blok.form_id,
          routing_response_date: new Date().toISOString(),
          routing_data: event.data.responseData,
        });
        break;
      case 'LD_ROUTING_TIMED_OUT':
        console.log('Routing timed out:', event.data.responseData);
        dataLayer.push({
          event: 'lean_data_routing_timeout',
          form_id: blok.form_id,
          timeout_date: new Date().toISOString(),
          timeout_data: event.data.responseData,
        });
        break;
      case 'LD_POST_BOOKING_IMMEDIATE':
        console.log('Booking completed:', event.data.responseData);
        dataLayer.push({
          event: 'lean_data_booking_completed',
          form_id: blok.form_id,
          booking_date: new Date().toISOString(),
          booking_data: event.data.responseData,
        });
        break;
      case 'LD_POPUP_CLOSED':
        console.log('Popup closed:', event.data.responseData);
        dataLayer.push({
          event: 'lean_data_popup_closed',
          form_id: blok.form_id,
          popup_close_date: new Date().toISOString(),
          popup_data: event.data.responseData,
        });
        break;
      default:
        break;
    }
  };

  //gets thank you copy for dynamic thank you page
  useEffect(() => {
    if (blok?.thank_you_copy) {
      updateThankYouCopy(blok?.thank_you_copy);
      // console.log(thankYouCopy, blok?.thank_you_copy);
    }
  }, [thankYouCopy, blok?.thank_you_copy]);

  //checking for pathname to set routing language and path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const pathLocale = pathname.split('/')[1];

      if (['de', 'fr'].includes(pathLocale)) {
        languageRef.current = pathLocale;
        if (pathLocale === 'de') {
          routingLang.current = 'Demo Request - DE';
        } else if (pathLocale === 'fr') {
          routingLang.current = 'Demo Request - FR';
        } else {
          routingLang.current = 'Demo Request - EN';
        }
      } else {
        languageRef.current = 'en';
      }
    }
    console.log(routingLang.current);
  }, []);

  //checks script is loadedfor marketo form
  useEffect(() => {
    if (!document.getElementById('mktoForms')) {
      loadScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  //loads script for bookit form and gsap animations for form
  useEffect(() => {
    demoTl.current = gsap.timeline({ paused: true });
    gsap.set('.bookit-content-container', { display: 'none', opacity: 0 });

    if (blok.animated) {
      // Add event listener for LeanData messages
      window.addEventListener('message', handleLeanDataMessage);

      demoTl.current
        .to('.preformContent', { opacity: contentVisibility })
        .to('.preformContent nondemo', { display: 'none' }, '<')
        .to('.marketoForm', { opacity: 0 }, '<')
        .to('#formPos', { xPercent: xFormPosition, duration: 1.25 })
        .to(
          '#formContainer',
          { width: formWidth, height: formHeight, duration: 1.25 },
          '<'
        )
        .to('.lines', { width: lineWidth, duration: 1.25 }, '<')
        .from('.second', { duration: 1.25, background: 'unset' }, '<')
        .to('.marketoForm', { display: 'none' }, '<')
        .set('.bookit-content-container', { display: 'block' })
        .to('.bookit-content-container', { opacity: 1 });

      const script = document.createElement('script');
      script.src = 'https://cdn.leandata.com/js-snippet/ld-book-v2.js';
      script.async = false;

      script.addEventListener('load', () => {
        console.log('timeoutLang', languageRef.current);

        const initConfig = {
          calendarTimeoutLength: 900,
          beforeRouting: (formTarget, formData) => {
            console.log('lean data language:', languageRef.current);
            formData['thank_you_language'] = languageRef.current;
            formData['routing_node_trigger'] = routingLang.current;
          },
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
        // Clean up the event listener when component unmounts
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
          form.onSuccess(function (submittedValues) {
            if (blok.animated) {
              if (window.LDBookItV2) {
                window.LDBookItV2.saveFormData(submittedValues);
                window.LDBookItV2.submit({
                  formData: submittedValues,
                  cb: window.LDBookItV2.getIframeFn('100%', '100%', '300'),
                });
                demoTl.current.play();
                setStepDone(true);
                dataLayer.push({
                  event: 'marketo_form_submission_success',
                  form_id: blok.form_id,
                  form_submission_date: new Date().toISOString(),
                });

                console.log('Thank You');
                console.log('Form submitted successfully:', submittedValues);
                return false;
              } else {
                console.error('LDBookItV2 not available, booking may fail');
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

              // 👇 Ensure root-relative if internal
              if (!isExternal(redirectUrl) && !redirectUrl.startsWith('/')) {
                redirectUrl = '/' + redirectUrl;
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
  /* Checkbox styles - fixed version */
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
      color: white !important;
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

    &#Email,
    &#Phone,
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

    &#Company,
    &#Address,
    &#City,
    &#PostalCode,
    &#How_did_you_hear_about_us__c,
    &#Number_of_Printer__c {
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

    ${media.fullWidth} {
    }
    ${media.tablet} {
    }
    ${media.mobile} {
      gap: 1.042vw;
    }

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
`;
export default TestForm;
