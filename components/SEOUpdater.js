'use client';

import { useEffect } from 'react';

import { usePageData } from '@/context/PageDataContext';

const SEOUpdater = () => {
  const { pageData } = usePageData();

  useEffect(() => {
    if (!pageData?.content) return;

    const shouldNoIndex = pageData.content.index === false;

    if (shouldNoIndex) {
      // Add no-index, no-follow meta tag
      const metaTag = document.createElement('meta');
      metaTag.name = 'robots';
      metaTag.content = 'noindex, nofollow';
      document.head.appendChild(metaTag);

      // Cleanup function to remove the meta tag when component unmounts or data changes
      return () => {
        const existingTag = document.querySelector(
          'meta[name="robots"][content="noindex, nofollow"]'
        );
        if (existingTag) {
          existingTag.remove();
        }
      };
    }
  }, [pageData]);

  return null;
};

export default SEOUpdater;
