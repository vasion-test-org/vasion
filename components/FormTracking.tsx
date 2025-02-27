"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function FormTracking() {
  const [domain, setDomain] = useState("www.vasion.com");
  const [language, setLanguage] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams(); // Next.js way to get URL query parameters

  useEffect(() => {
    if (document.getElementById("mktoForms")) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Save UTM parameters as cookies
    searchParams.forEach((value, key) => {
      document.cookie = `${key}=${value};path=/`;
    });

    // Populate hidden fields in Marketo form
    if (isLoaded && window.MktoForms2) {
      window.MktoForms2.whenReady((form) => {
        form.getFields().forEach((field) => {
          if (field.element.type === "hidden") {
            const cookieValue = getCookie(field.name);
            if (cookieValue) field.val(cookieValue);
          }
        });
      });
    }

    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
    }

    function checkSubdomain(url: string) {
      const { hostname } = new URL(url);
      const subdomainMap: Record<string, string> = {
        "fr.vasion.com": "fr",
        "www.vasion.com": "en",
        "de.vasion.com": "de",
      };

      if (hostname in subdomainMap) {
        setDomain(hostname);
        setLanguage(subdomainMap[hostname]);
      }
    }

    checkSubdomain(window.location.href);
  }, [isLoaded, searchParams]);

  return (
    <>
      {/* Marketo Form Script */}
      <Script
        id="marketo-form"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var didInit = false;
              function initMunchkin() {
                if (!didInit) {
                  didInit = true;
                  Munchkin.init('338-HTA-134');
                }
              }
              var s = document.createElement('script');
              s.type = 'text/javascript';
              s.async = true;
              s.src = '//munchkin.marketo.net/munchkin.js';
              s.onload = initMunchkin;
              document.getElementsByTagName('head')[0].appendChild(s);
            })();
          `,
        }}
      />
    </>
  );
}
