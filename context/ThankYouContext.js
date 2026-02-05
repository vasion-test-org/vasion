'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThankYouContext = createContext();

const defaultThankYouCopy = [
  {
    _uid: 'default-header',
    component: 'header',
    copy: {
      content: [
        {
          attrs: { level: 1 },
          content: [{ text: 'Thank you!', type: 'text' }],
          type: 'heading',
        },
      ],
      type: 'doc',
    },
  },
  {
    _uid: 'default-body',
    component: 'body_copy',
    copy: {
      content: [
        {
          content: [
            {
              text: 'Your request will be handled immediately',
              type: 'text',
            },
          ],
          type: 'paragraph',
        },
      ],
      type: 'doc',
    },
  },
];

export const ThankYouProvider = ({ children }) => {
  const [thankYouCopy, setThankYouCopy] = useState(() => {
    // Initialize with stored data if available
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('thankYouCopy');
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (error) {
          console.warn('Failed to parse thankYouCopy from localStorage:', error);
        }
      }
    }
    return defaultThankYouCopy;
  });

  const updateThankYouCopy = (newArray) => {
    setThankYouCopy(newArray);
    if (typeof window !== 'undefined') {
      localStorage.setItem('thankYouCopy', JSON.stringify(newArray));
    }
  };

  return (
    <ThankYouContext.Provider value={{ thankYouCopy, updateThankYouCopy }}>
      {children}
    </ThankYouContext.Provider>
  );
};

export const useThankYou = () => useContext(ThankYouContext);
