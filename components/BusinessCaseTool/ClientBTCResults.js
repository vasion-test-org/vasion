'use client';
import React from 'react';

import { useSearchParams } from 'next/navigation';

import BCTPDF from 'components/BusinessCaseTool/BCTPDF';
import styled, { createGlobalStyle } from 'styled-components';

const ClientBCTResults = () => {
  const searchParams = useSearchParams();

  const currency = searchParams.get('currency');
  const rawData = searchParams.get('data');
  let contactFormData, savingsFormData;

  try {
    const parsed = rawData ? JSON.parse(decodeURIComponent(rawData)) : {};
    contactFormData = parsed.contactFormData;
    savingsFormData = parsed.savingsFormData;
    // console.log(parsed);
  } catch (e) {
    console.error('Failed to parse data', e);
  }

  return (
    <>
      {contactFormData && savingsFormData && currency && (
        <>
          <BCTPDF
            contactFormData={contactFormData}
            currency={currency}
            savingsFormData={savingsFormData}
          />
          <GlobalStyle />
        </>
      )}
    </>
  );
};

const GlobalStyle = createGlobalStyle`
@media print {
  body {
    .cky-btn-revisit-wrapper {
      display: none;
    }
  }
}
`;

export default ClientBCTResults;
