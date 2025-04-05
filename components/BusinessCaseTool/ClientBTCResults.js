'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import BCTPDF from 'components/BusinessCaseTool/BCTPDF';

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
            savingsFormData={savingsFormData}
            currency={currency}
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
