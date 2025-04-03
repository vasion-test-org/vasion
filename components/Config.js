'use client';
import React, { useContext } from 'react';
import Footer from './globalComponents/Footer';
import { ScreenContext } from './providers';
import Nav from './globalComponents/Nav';
import MobileNav from './globalComponents/MobileNav';
import styled from 'styled-components';
import media from '@/styles/media';
import useMedia from '@/functions/useMedia';
const Config = ({ blok, children }) => {
  const { mobile } = useContext(ScreenContext);
  
  return (
    <>
      <NavWrapper >
        <Nav blok={blok.nav[0]} />
      </NavWrapper>

      <MobileNavWrapper >
        <MobileNav blok={blok.nav[0]} />
      </MobileNavWrapper>

      {children}

      <Footer blok={blok.footer[0]} />
    </>
  );
};

const NavWrapper = styled.div`
display: block;
${media.mobile} {
  display: none;
}
`;

const MobileNavWrapper = styled.div`
display: none;
  ${media.mobile} {
    display: block;
  }
`;

export default Config;
