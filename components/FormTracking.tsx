'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


// ─── MSP Date Filter ─────────────────────────────────────────────────────────

const MSP_MONTH_NAMES: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function parseMspOptionDate(str: string): { month: number; day: number; year: number } | null {
  if (!str) return null;
  const slashMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (slashMatch) {
    return { month: +slashMatch[1], day: +slashMatch[2], year: +slashMatch[3] };
  }
  const textMatch = str.match(/\b([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\b/);
  if (textMatch) {
    const month = MSP_MONTH_NAMES[textMatch[1].toLowerCase()];
    if (month) {
      return { month, day: +textMatch[2], year: +textMatch[3] };
    }
  }
  return null;
}

function filterPastDemoDates(): void {
  const selectEl: HTMLSelectElement | null =
    (document.getElementById('mSPGroupDemoDate') as HTMLSelectElement | null) ??
    (() => {
      const mktoForm = document.querySelector('.mktoForm');
      if (!mktoForm) return null;
      for (const sel of mktoForm.querySelectorAll('select')) {
        const s = sel as HTMLSelectElement;
        for (const opt of s.options) {
          if (opt.value && /^\d{1,2}\/\d{1,2}\/\d{4}/.test(opt.value)) return s;
        }
      }
      return null;
    })();

  if (!selectEl) return;

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  for (let i = selectEl.options.length - 1; i >= 0; i--) {
    const opt = selectEl.options[i];
    const parsed = parseMspOptionDate(opt.value) || parseMspOptionDate(opt.text);
    if (!parsed) continue;
    const { month, day, year } = parsed;
    if (isNaN(month) || isNaN(day) || isNaN(year)) continue;
    const optionDateStr = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (optionDateStr < todayStr) {
      selectEl.remove(i);
    }
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_sfdc_id?: string;
  referrer?: string;
  landing_page?: string;
  timestamp: string;
}

interface TouchData {
  first_touch: UTMData | null;
  last_touch: UTMData | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'vasion_attribution';

const ORGANIC_PATTERNS: Record<string, { source: string; medium: string }> = {
  'google.com': { source: 'google', medium: 'organic' },
  'bing.com': { source: 'bing', medium: 'organic' },
  'yahoo.com': { source: 'yahoo', medium: 'organic' },
  'duckduckgo.com': { source: 'duckduckgo', medium: 'organic' },
  'linkedin.com': { source: 'linkedin', medium: 'organic-social' },
  'twitter.com': { source: 'twitter', medium: 'organic-social' },
  'x.com': { source: 'twitter', medium: 'organic-social' },
  'facebook.com': { source: 'facebook', medium: 'organic-social' },
  'reddit.com': { source: 'reddit', medium: 'organic-social' },
  'perplexity.ai': { source: 'perplexity', medium: 'ai-referral' },
  'chat.openai.com': { source: 'chatgpt', medium: 'ai-referral' },
  'claude.ai': { source: 'claude', medium: 'ai-referral' },
  'gemini.google.com': { source: 'gemini', medium: 'ai-referral' },
  'g2.com': { source: 'g2', medium: 'review-site' },
  'trustradius.com': { source: 'trustradius', medium: 'review-site' },
  'capterra.com': { source: 'capterra', medium: 'review-site' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inferFromReferrer(referrer: string): Partial<UTMData> | null {
  if (!referrer) return null;

  try {
    const { hostname } = new URL(referrer);
    const match = Object.entries(ORGANIC_PATTERNS).find(([domain]) => hostname.includes(domain));
    if (match) {
      const [, { source, medium }] = match;
      return { utm_source: source, utm_medium: medium, referrer };
    }
    // Unknown external referrer — still capture it
    return { utm_source: hostname, utm_medium: 'referral', referrer };
  } catch {
    return null;
  }
}

function buildUTMData(
  searchParams: URLSearchParams,
  referrer: string,
  landingPage: string
): UTMData | null {
  const utmKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_sfdc_id',
  ];
  const fromParams: Partial<UTMData> = {};

  utmKeys.forEach((key) => {
    const val = searchParams.get(key);
    if (val) fromParams[key as keyof UTMData] = val.toLowerCase().trim();
  });

  const hasUTMs = Object.keys(fromParams).length > 0;

  if (hasUTMs) {
    return {
      ...fromParams,
      referrer,
      landing_page: landingPage,
      timestamp: new Date().toISOString(),
    };
  }

  // No UTM params — try to infer from referrer
  const inferred = inferFromReferrer(referrer);
  if (inferred) {
    return { ...inferred, landing_page: landingPage, timestamp: new Date().toISOString() };
  }

  // Truly direct — still record it so we know
  return {
    utm_source: 'direct',
    utm_medium: 'none',
    landing_page: landingPage,
    timestamp: new Date().toISOString(),
  };
}

function getStoredAttribution(): TouchData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { first_touch: null, last_touch: null };
  } catch {
    return { first_touch: null, last_touch: null };
  }
}

function saveAttribution(data: UTMData) {
  try {
    const stored = getStoredAttribution();
    const updated: TouchData = {
      first_touch: stored.first_touch ?? data, // never overwrite first touch
      last_touch: data, // always update last touch
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    console.warn('Attribution storage failed');
  }
}

/**
 * Reads attribution from localStorage and populates Marketo hidden fields.
 * Maps first_touch fields → Marketo field names (adjust to match your Marketo schema).
 */
function populateMarketoFields(form: any) {
  const stored = getStoredAttribution();
  if (!stored.first_touch && !stored.last_touch) return;

  const ft = stored.first_touch;
  const lt = stored.last_touch;

  const fieldMap: Record<string, string> = {
    // First touch
    UTM_Source_First__c: ft?.utm_source ?? '',
    UTM_Medium_First__c: ft?.utm_medium ?? '',
    UTM_Campaign_First__c: ft?.utm_campaign ?? '',
    UTM_Term_First__c: ft?.utm_term ?? '',
    UTM_Content_First__c: ft?.utm_content ?? '',
    UTM_SFDC_ID_First__c: ft?.utm_sfdc_id ?? '',
    // Last touch
    UTM_Source__c: lt?.utm_source ?? '',
    UTM_Medium__c: lt?.utm_medium ?? '',
    UTM_Campaign__c: lt?.utm_campaign ?? '',
    UTM_Term__c: lt?.utm_term ?? '',
    UTM_Content__c: lt?.utm_content ?? '',
    UTM_SFDC_ID__c: lt?.utm_sfdc_id ?? '',
    // Extra context
    Landing_Page__c: ft?.landing_page ?? '',
    Referrer__c: ft?.referrer ?? '',
  };

  // Filter out empty values so we don't overwrite existing Marketo data with blank strings
  const valuesToSet = Object.fromEntries(
    Object.entries(fieldMap).filter(([, val]) => val !== '')
  );

  if (Object.keys(valuesToSet).length > 0) {
    form.vals(valuesToSet);
    console.log('UTM values passed to Marketo:', valuesToSet);
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

function FormTrackingComponent() {
  const searchParams = useSearchParams();

  // Capture + store attribution on every page load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const referrer = document.referrer ?? '';
    const landingPage = window.location.href;
    const utmData = buildUTMData(searchParams as unknown as URLSearchParams, referrer, landingPage);

    if (utmData) saveAttribution(utmData);
  }, [searchParams]);

  // Populate Marketo fields when form is ready
  useEffect(() => {
    if (typeof window === 'undefined') return;

    function registerFieldPopulation(attempts = 0) {
      if (attempts > 20) return;
      if (window.MktoForms2) {
        window.MktoForms2.whenReady((form: any) => {
          populateMarketoFields(form);

          // Filter past MSP demo dates on initial load and whenever the form changes
          // (the date field is conditional and only appears after user interaction)
          setTimeout(filterPastDemoDates, 200);
          setTimeout(filterPastDemoDates, 800);
          const formEl: HTMLElement | null = form.getFormElem?.()?.[0] ?? null;
          if (formEl) {
            let debounceTimer: ReturnType<typeof setTimeout>;
            const observer = new MutationObserver(() => {
              clearTimeout(debounceTimer);
              debounceTimer = setTimeout(filterPastDemoDates, 300);
            });
            observer.observe(formEl, { subtree: true, attributes: true, childList: true });
          }
        });
      } else {
        setTimeout(() => registerFieldPopulation(attempts + 1), 300);
      }
    }

    registerFieldPopulation();
  }, []);

  // reCAPTCHA loader (unchanged from original)
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
          } catch (e: any) {
            console.warn('reCAPTCHA render skipped:', e.message);
          }
        } else if (!el) {
          setTimeout(renderWhenReady, 500);
        }
      };
      renderWhenReady();
    };

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src =
      'https://www.recaptcha.net/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return null;
}

export default function FormTracking() {
  return (
    <Suspense fallback={null}>
      <FormTrackingComponent />
    </Suspense>
  );
}
