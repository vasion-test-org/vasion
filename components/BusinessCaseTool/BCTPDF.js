'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

import styled from 'styled-components';
import media from 'styles/media';
import colors from 'styles/colors';
import text from 'styles/text';
import ScrollTrigger from 'gsap/ScrollTrigger';

import CoverPage from 'components/BusinessCaseTool/PDFPages/CoverPage';
import PDFIntro from './PDFPages/PDFIntro';
import TableOfContents from './PDFPages/TableOfContents';
import PDFPage4 from './PDFPages/PDFPage4';
import PDFPage5 from './PDFPages/PDFPage5';
import PDFPage6 from './PDFPages/PDFPage6';
import PDFPage7 from './PDFPages/PDFPage7';
import PDFPage8 from './PDFPages/PDFPage8';
import PDFPage9 from './PDFPages/PDFPage9';
import PDFPage10 from './PDFPages/PDFPage10';
import PDFPage11 from './PDFPages/PDFPage11';
import PDFPage12 from './PDFPages/PDFPage12';
import PDFPage13 from './PDFPages/PDFPage13';
import PDFPage14 from './PDFPages/PDFPage14';
import PDFPage15 from './PDFPages/PDFPage15';
import PDFPage16 from './PDFPages/PDFPage16';
import PDFPage17 from './PDFPages/PDFPage17';

gsap.registerPlugin(ScrollTrigger);

const BCTPDF = ({ contactFormData, savingsFormData, currency }) => {
  const handlePrint = () => {
    // Kill all ScrollTriggers and ScrollSmoother before print
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  
    if (gsap.core.globals().ScrollSmoother?.get()) {
      gsap.core.globals().ScrollSmoother.get().kill();
    }
  
    // Wait a tick to let layout stabilize
    setTimeout(() => {
      window.print();
    }, 100); // slight delay to make sure DOM updates
  };
  
  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: '#pdfPrint',
  //     start: 'top+=100 top',
  //     pin: '#pdfPrint',
  //     pinSpacing: false,
  //   });

  // }, []);

  return (
    <Wrapper>
      <CoverPage contactFormData={contactFormData} />
      <PDFIntro savingsFormData={savingsFormData} currency={currency} />
      <TableOfContents />
      <PDFPage4 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage5 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage6 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage7 />
      <PDFPage8 currency={currency} />
      <PDFPage9 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage10 currency={currency} />
      <PDFPage11 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage12 savingsFormData={savingsFormData} currency={currency} />
      <PDFPage13 />
      <PDFPage14 />
      <PDFPage15 />
      <PDFPage16 />
      <PDFPage17 />
      <PrintButton as='button' onClick={handlePrint}>
        Download
      </PrintButton>
    </Wrapper>
  );
};

const MailToLink = styled.a``;
const PrintButton = styled.div`
  ${text.bodySmBold};
  position: fixed;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${colors.primaryOrange};
  color: ${colors.white};
  top: 8.25vw;
  right: 3.472vw;
  width: 7.944vw;
  height: 3.125vw;
  border-radius: 2vw;

  &:hover {
    color: ${colors.primaryOrange};
    background-color: ${colors.white};
    border: 0.069vw solid ${colors.primaryOrange};
  }

  ${media.fullWidth} {
    top: 132px;
    right: 50px;
    width: 100px;
    height: 45px;
    border-radius: 29px;
  }

  @media print {
    display: none;
  }
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: auto;
`;
export default BCTPDF;
