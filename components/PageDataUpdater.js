'use client';

import React, { useEffect, useRef } from 'react';
import { usePageData } from '@/context/PageDataContext';

const PageDataUpdater = React.memo(({ story }) => {
  const { updatePageData } = usePageData();
  const prevStoryRef = useRef();

  useEffect(() => {
    // Only update if story has actually changed to prevent unnecessary re-renders
    if (story && story !== prevStoryRef.current) {
      prevStoryRef.current = story;
      updatePageData(story);
    }
  }, [story, updatePageData]);

  return null;
});

PageDataUpdater.displayName = 'PageDataUpdater';

export default PageDataUpdater;
