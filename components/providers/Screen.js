'use client';
import React, { createContext, useEffect, useMemo, useState } from 'react';

import { addDebouncedEventListener, isBrowser } from '@/functions/functions';
import { desktop, mobile, tablet } from '@/styles/media';

export const ScreenContext = createContext({
  desktop: false,
  fullWidth: false,
  hydrated: false, // ✅ added
  mobile: false,
  tablet: false,
});

const ScreenProvider = ({ children }) => {
  const [fw, setFw] = useState(false);
  const [d, setD] = useState(false);
  const [t, setT] = useState(false);
  const [m, setM] = useState(false);
  const [hydrated, setHydrated] = useState(false); // ✅ added

  useEffect(() => {
    if (isBrowser()) {
      const setScreenContext = () => {
        const width = window.innerWidth;
        setM(width <= mobile);
        setT(width > mobile && width <= tablet);
        setD(width > tablet && width <= desktop);
        setFw(width > desktop);
      };

      setScreenContext();
      setHydrated(true); // ✅ signal hydration complete

      const removeListener = addDebouncedEventListener(window, 'resize', setScreenContext, 100);

      return removeListener;
    }
  }, []);

  const screenValue = useMemo(() => {
    return { desktop: d, fullWidth: fw, hydrated, mobile: m, tablet: t };
  }, [d, fw, t, m, hydrated]);

  return <ScreenContext.Provider value={screenValue}>{children}</ScreenContext.Provider>;
};

export default ScreenProvider;
