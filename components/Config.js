'use client'
import React from 'react';

import styled from 'styled-components';

import { storyblokEditable } from '@storyblok/react/rsc';
import media from 'styles/media';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import Nav from './globalComponents/Nav';
import Footer from './globalComponents/Footer';
const Config = ({ blok, children }) => {

// console.log(blok)


return (
<>
  <Nav blok={blok.nav[0]}/>
    {children}
  <Footer blok={blok.footer[0]} />
</>
)
}
export default Config