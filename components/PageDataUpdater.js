'use client';

import { useEffect } from 'react';
import { usePageData } from '@/context/PageDataContext';

const PageDataUpdater = ({ story }) => {
  const { updatePageData } = usePageData();

  useEffect(() => {
    if (story) {
      updatePageData(story);
    }
  }, [story, updatePageData]);

  return null;
};

export default PageDataUpdater;
