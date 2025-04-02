
'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const getClick = (linkData?: any) => {
  const router = useRouter();

  return useCallback(() => {
    const url = linkData?.link_url?.url;
    const isExternal = linkData?.link_url?.linktype === 'url';

    if (!url) return;

    if (isExternal) {
      window.open(url, '_blank');
    } else {
      router.push(url);
    }
  }, [linkData, router]);
};
