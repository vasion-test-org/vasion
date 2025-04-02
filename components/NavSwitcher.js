'use client';
import React from 'react';

import styled from 'styled-components';
import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { ScreenContext } from '@/components/providers/Screen';
import Nav from './globalComponents/Nav';
import MobileNav from './globalComponents/MobileNav';

const NavSwitcher = ({ blok }) => {
  const { mobile } = useContext(ScreenContext);
console.log(blok)
  return (
    <>
      {mobile ? (
        <MobileNav blok={blok} />
      ) : (
        <Nav blok={blok} />
      )}
    </>
  );
};


export default NavSwitcher;
