"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

function FormTrackingComponent() {
  const [domain, setDomain] = useState("www.vasion.com");
  const [language, setLanguage] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams(); // Requires Suspense boundary

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

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
    }

    function checkSubdomain(url) {
      const { hostname } = new URL(url);
      const subdomainMap = {
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
    </>
  );
}

export default function FormTracking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormTrackingComponent />
    </Suspense>
  );
}
