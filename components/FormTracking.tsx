'use client';

import { Suspense, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

function FormTrackingComponent() {
  const [domain, setDomain] = useState('www.vasion.com');
  const [language, setLanguage] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoadRecaptcha, setShouldLoadRecaptcha] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (document.getElementById('mktoForms')) {
      setIsLoaded(true);
    }
  }, []);

  // Detect if forms are present and load reCAPTCHA only when needed
  useEffect(() => {
    const checkForForms = () => {
      const hasForms =
        document.querySelector('form') ||
        document.querySelector('.mktoForm') ||
        document.querySelector('[id*="mktoForm"]');

      if (hasForms && !shouldLoadRecaptcha) {
        setShouldLoadRecaptcha(true);
        // Dynamically load reCAPTCHA only when forms are detected
        if (!document.getElementById('recaptcha-script')) {
          const script = document.createElement('script');
          script.id = 'recaptcha-script';
          script.src = 'https://www.recaptcha.net/recaptcha/api.js';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
      }
    };

    // Check immediately
    checkForForms();

    // Also check after a delay to catch dynamically loaded forms
    const timer = setTimeout(checkForForms, 1000);

    return () => clearTimeout(timer);
  }, [shouldLoadRecaptcha]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Save UTM parameters as cookies
    searchParams.forEach((value, key) => {
      document.cookie = `${key}=${value};path=/`;
    });

    // Populate hidden fields in Marketo form
    if (window.MktoForms2) {
      window.MktoForms2.whenReady((form) => {
        form.getFields().forEach((field) => {
          if (field.element.type === 'hidden') {
            const cookieValue = getCookie(field.name);
            if (cookieValue) field.val(cookieValue);
          }
        });
      });
    }

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop()?.split(';').shift() : undefined;
    }

    function checkPathLocale(url) {
      const { pathname } = new URL(url);
      const pathLocale = pathname.split('/')[1];
      const supportedLocales = ['en', 'fr', 'de'];
      const defaultLocale = 'en';
      const language = supportedLocales.includes(pathLocale) ? pathLocale : defaultLocale;
      setDomain('www.vasion.com');
      setLanguage(language);
    }

    checkPathLocale(window.location.href);
  }, [searchParams]);

  return <></>;
}

export default function FormTracking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormTrackingComponent />
    </Suspense>
  );
}
