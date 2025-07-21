'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const ConditionalRecaptcha = () => {
  useEffect(() => {
    // Check if there are forms on the page
    const hasForms = document.querySelector('form');
    
    if (!hasForms) {
      // Remove reCAPTCHA script if no forms found
      const recaptchaScript = document.getElementById('recaptcha');
      if (recaptchaScript) {
        recaptchaScript.remove();
      }
    }
  }, []);

  return (
    <Script
      id="recaptcha"
      strategy="lazyOnload"
      src="https://www.google.com/recaptcha/api.js"
    />
  );
};

export default ConditionalRecaptcha; 