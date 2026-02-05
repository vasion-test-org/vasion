'use client';

import { useCallback, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

/**
 * Conversica AI Chat Widget
 * Loads the appropriate chat agent based on locale:
 * - English: Sophie (assistant-id: 122949)
 * - French: Eloise (assistant-id: 122197)
 * - German: Clara (assistant-id: 122198)
 *
 * Dynamically reloads the widget when locale changes during client-side navigation.
 * Listens for custom 'conversica-locale-change' event for reliable updates.
 */

// Get locale from pathname
const getLocale = (path) => {
  if (!path) return 'en';
  const pathLocale = path.split('/')[1];
  const supportedLocales = ['fr', 'de'];
  return supportedLocales.includes(pathLocale) ? pathLocale : 'en';
};

// Get the correct assistant ID based on locale
const getAssistantId = (locale) => {
  switch (locale) {
    case 'de':
      return '122198'; // Clara - German
    case 'fr':
      return '122197'; // Eloise - French
    default:
      return '122949'; // Sophie - English
  }
};

const ConversicaChat = () => {
  const pathname = usePathname();
  const currentAssistantRef = useRef(null);
  const isLoadingRef = useRef(false);

  const cleanupConversica = useCallback(() => {
    // Remove existing Conversica script
    const existingScript = document.getElementById('conversica-chat-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Remove any existing Conversica widget elements from the DOM
    const selectors = [
      '[id*="conversica"]',
      '[class*="conversica"]',
      '[id*="Conversica"]',
      '[class*="Conversica"]',
      'iframe[src*="conversica"]',
      '[data-conversica]',
    ];

    selectors.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
      } catch (e) {
        // Ignore selector errors
      }
    });

    // Clean up any global Conversica objects
    if (typeof window !== 'undefined') {
      try {
        if (window.Conversica && typeof window.Conversica.destroy === 'function') {
          window.Conversica.destroy();
        }
      } catch (e) {
        // Ignore errors during cleanup
      }

      const globalKeys = ['Conversica', 'conversica', 'ConversicaWidget'];
      globalKeys.forEach((key) => {
        try {
          if (window[key]) {
            delete window[key];
          }
        } catch (e) {
          // Ignore errors
        }
      });
    }
  }, []);

  const loadConversicaScript = useCallback((assistantId) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    const script = document.createElement('script');
    script.id = 'conversica-chat-script';
    script.src = 'https://chat.conversica.com/widget/chatLoader.min.js';
    script.defer = true;
    script.setAttribute('data-client-id', '120104');
    script.setAttribute('data-assistant-id', assistantId);

    script.onload = () => {
      isLoadingRef.current = false;
      currentAssistantRef.current = assistantId;
    };

    script.onerror = () => {
      isLoadingRef.current = false;
    };

    document.body.appendChild(script);
  }, []);

  const updateChatbot = useCallback(
    (locale) => {
      const assistantId = getAssistantId(locale);

      // Skip if the assistant hasn't changed
      if (currentAssistantRef.current === assistantId) {
        return;
      }

      // Clean up existing widget
      cleanupConversica();

      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        loadConversicaScript(assistantId);
      }, 150);
    },
    [cleanupConversica, loadConversicaScript]
  );

  // Listen for custom locale change events (fired by Nav/MobileNav)
  useEffect(() => {
    const handleLocaleChange = (event) => {
      const newLocale = event.detail?.locale;
      if (newLocale) {
        updateChatbot(newLocale);
      }
    };

    window.addEventListener('conversica-locale-change', handleLocaleChange);

    return () => {
      window.removeEventListener('conversica-locale-change', handleLocaleChange);
    };
  }, [updateChatbot]);

  // Initial load and pathname-based updates
  useEffect(() => {
    const locale = getLocale(pathname);
    updateChatbot(locale);
  }, [pathname, updateChatbot]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupConversica();
    };
  }, [cleanupConversica]);

  return null;
};

export default ConversicaChat;
