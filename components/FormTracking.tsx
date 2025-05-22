'use client';

import { useState, useEffect, Suspense } from 'react';
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
      const language = supportedLocales.includes(pathLocale)
        ? pathLocale
        : defaultLocale;
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
