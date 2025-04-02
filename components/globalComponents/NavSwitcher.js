'use client';

import React, { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import MobileNav from './MobileNav';
import { ScreenContext } from '@/components/providers/Screen';

const NavSwitcher = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
   { mobile ? <MobileNav blok={blok} /> : <Nav blok={blok} />}
    </>
  ) 
};

export default NavSwitcher;
