'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';

import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from '@/styles/media';
import getMedia from '@/functions/getMedia';
import colors from '@/styles/colors';
import text from '@/styles/text';

const Form = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok.theme] || themes.default;
  const [isLoaded, setIsLoaded] = useState(false);
  const [stepDone, setStepDone] = useState(false);
  const formWidth = getMedia('1096px', '76.111vw', '90.82vw', '87.85vw');
  const formHeight = getMedia('733px', '50.875vw', '77.137vw', '288.084vw');
  const lineWidth = getMedia('220px', '15.278vw', '19.531vw', '7.187vw');
  const formPosition = getMedia(-28, -28, -27, 0);
  const contentVisibility = getMedia(0, 0, 0, 1);
  const languageRef = useRef('en');
  const originRef = useRef('va');
  console.log(blok);

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
    if (!document.getElementById('mktoForms')) {
      loadScript();
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const demoTl = gsap.timeline({ paused: true });
    // gsap.set(".bookit-content-container", { display: "none", opacity: 0 });

    // if (blok.animated) {
    //   demoTl
    //     .to(".preformContent", { opacity: contentVisibility })
    //     .to(".marketoForm", { opacity: 0 }, "<")
    //     .to("#formPos", { xPercent: formPosition, duration: 1.25 })
    //     .to("#formContainer", { width: formWidth, height: formHeight, duration: 1.25 }, "<")
    //     .to(".lines", { width: lineWidth, duration: 1.25 }, "<")
    //     .from(".second", { duration: 1.25, background: "unset" }, "<")
    //     .to(".marketoForm", { display: "none" }, "<")
    //     .set(".bookit-content-container", { display: "block" })
    //     .to(".bookit-content-container", { opacity: 1 });
    // }

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
        'Demo Request',
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

    window.MktoForms2.loadForm(
      'https://info.printerlogic.com',
      '338-HTA-134',
      blok.form_id,
      (form) => {
        form.onSuccess(() => {
          if (blok.animated) {
            console.log('Thank You');
          } else if (blok.redirectLink) {
            console.log('Form submitted successfully');
            document.location.href = blok.redirectLink;
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
      <FormContainer>
      {blok.header && <FormHeader>{blok.header}</FormHeader>}
        <MarketoForm
          className='marketoForm'
          // mode={props.mode}
          id={`mktoForm_${blok.form_id}`}
        ></MarketoForm>
      </FormContainer>
    </ThemeProvider>
  );
};

const MarketoForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 31.25vw !important;
  gap: 1.25vw;
  align-items: left;
  text-align: center;
`;
const FormHeader = styled.h4`
  ${text.h4};
  margin-bottom: 2vw;
  align-self: center;

  ${media.fullWidth} {
  
  }
  
  ${media.tablet} {
  
  }
  
  ${media.mobile} {
  
  }
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.form.formBg};
  color: ${(props) => props.theme.form.textColor} !important;
  border-radius: 2vw;
  padding: 2vw;
  width: 35.25vw;

  .mktoCaptchaDisclaimer {
    display: none;
  }
  .mktoFormRow:has(> .mktoPlaceholder) {
  display: none;
}

.mktoFormRow:has(a[href*="vasion.com/privacy-policy"]) span {
  ${text.bodySm};
  text-align: center;
  color: white;

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
    padding: 1vw;
    border-radius: 0.25vw;
    height: 3.375vw;
    border: 1px solid ${(props) => props.theme.form.inputBorder};
    background: ${(props) => props.theme.form.inputBg};
    color: ${(props) => props.theme.form.textColor};

    &#FirstName {
      width: 15vw !important;
    }

    &#LastName {
      width: 15vw !important;
    }

    &#Email {
      width: 31.25vw !important;
    }

    &#Phone {
      width: 31.25vw !important;
    }

    &#Company {
      width: 31.25vw !important;
    }

    &#How_did_you_hear_about_us__c {
      width: 31.25vw !important;
    }

    ${media.fullWidth} {
    
    }
    
    ${media.tablet} {
    
    }
    
    ${media.mobile} {
    
    }
  }

  input:focus {
    background: ${(props) => props.theme.form.formBg};
  }

  input:invalid {
    border: 0.063vw solid #FFB4AB;
  }

  .mktoErrorMsg {
    ${text.bodySm};
    color: #FFB4AB;
    margin-top: 0.5vw;
  }

  select {
    ${text.bodyMd};
    width: 31.25vw !important;
    padding: 1vw;
    border-radius: 0.25vw;
    height: 3.375vw;
    border: 1px solid ${(props) => props.theme.form.inputBorder};
    background: ${(props) => props.theme.form.inputBg};
    color: ${(props) => props.theme.form.textColor};

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
