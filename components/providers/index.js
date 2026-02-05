'use client';

import React from 'react';

import ScreenProvider, { ScreenContext } from '@/components/providers/Screen';

const Providers = ({ children }) => {
  return <ScreenProvider>{children}</ScreenProvider>;
};

export default Providers;

export { ScreenContext };
