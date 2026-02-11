'use client';

import { Suspense, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';

function FormTrackingComponent() {
  const [domain, setDomain] = useState('www.vasion.com');
  const [language, setLanguage] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (document.getElementById('mktoForms')) {
      setIsLoaded(true);
    }
  }, []);

  // Load reCAPTCHA from recaptcha.net (bypasses CookieYes google.com block).
  // Uses render=explicit with an onload callback so we control when the
  // widget renders — we poll for Marketo's g-recaptcha div before calling
  // grecaptcha.render(), ensuring a client exists before form submission.
  useEffect(() => {
    if (document.getElementById('recaptcha-script')) return;

    window.onRecaptchaLoaded = () => {
      const renderWhenReady = () => {
        const el = document.querySelector('.g-recaptcha');
        if (el && window.grecaptcha && !el.hasChildNodes()) {
          try {
            window.grecaptcha.render(el, {
              sitekey: el.getAttribute('data-sitekey'),
              size: el.getAttribute('data-size') || 'invisible',
              callback: el.getAttribute('data-callback'),
              'expired-callback': el.getAttribute('data-expired-callback'),
            });
          } catch (e) {
            console.warn('reCAPTCHA render skipped:', e.message);
          }
        } else if (!el) {
          // Form not ready yet, retry
          setTimeout(renderWhenReady, 500);
        }
      };
      renderWhenReady();
    };

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = 'https://www.recaptcha.net/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

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
