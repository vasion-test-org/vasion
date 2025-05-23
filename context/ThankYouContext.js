'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThankYouContext = createContext();

const defaultThankYouCopy = [
  {
    _uid: 'default-header',
    component: 'header',
    copy: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 1 },
          content: [{ type: 'text', text: 'Thank you!' }],
        },
      ],
    },
  },
  {
    _uid: 'default-body',
    component: 'body_copy',
    copy: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Your download has been successful',
            },
          ],
        },
      ],
    },
  },
];

export const ThankYouProvider = ({ children }) => {
  const [thankYouCopy, setThankYouCopy] = useState(defaultThankYouCopy);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('thankYouCopy');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setThankYouCopy(parsed);
        }
      } catch (error) {
        console.warn('Failed to parse thankYouCopy from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const updateThankYouCopy = (newArray) => {
    if (!newArray) return;
    setThankYouCopy(newArray);
    localStorage.setItem('thankYouCopy', JSON.stringify(newArray));
  };

  return (
    <ThankYouContext.Provider
      value={{ thankYouCopy, updateThankYouCopy, isLoading }}
    >
      {children}
    </ThankYouContext.Provider>
  );
};

export const useThankYou = () => useContext(ThankYouContext);
