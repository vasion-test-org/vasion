'use client';
import React, { useState } from 'react';

import Link from 'next/link';

import styled from 'styled-components';
import colors from 'styles/colors';
import media from 'styles/media';
import text from 'styles/text';

const BusinessCaseForms = ({ blok }) => {
  const [currency, setCurrency] = useState();
  const [contactFormData, setContactFormData] = useState({
    clientEmail: '',
    company: '',
    name: '',
    repEmail: '',
  });

  const [savingsFormData, setSavingsFormData] = useState({
    adminPay: '',
    itPay: '',
    pageCost: '',
    pagesPrinted: '',
    printerPrice: '',
    printerQty: '',
    printerSpend: '',
    resolveTickets: '',
    serverQty: '',
    solutions: '',
    solutionSpend: '',
    tickets: '',
    whichSolution: '',
  });

  const handleContactChange = (e) => {
    setContactFormData({
      ...contactFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavingsChange = (e) => {
    setSavingsFormData({
      ...savingsFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const contactFields = blok.contact_fields.map((field, index) => (
    <FormFieldDiv>
      <FormText>
        <FormHeader>{field.form_field_header}</FormHeader>
        <FormSubheader>{field.form_field_subheader}</FormSubheader>
      </FormText>
      <FormInput
        name={field.input_name}
        placeholder={field.input_placeholder}
        type={field.input_type}
        onChange={handleContactChange}
      ></FormInput>
    </FormFieldDiv>
  ));

  const printSavings = blok.print_savings.map((field, index) => (
    <FormFieldDiv>
      <FormText>
        <FormHeader>{field.form_field_header}</FormHeader>
        <FormSubheader>{field.form_field_subheader}</FormSubheader>
      </FormText>
      {field.input_type === 'select' ? (
        <RadiosDiv>
          <RadioDiv>
            <RadioFormInput
              id="$"
              name="currency"
              type="radio"
              value="$"
              onChange={handleCurrency}
            />
            <RadioLabel for="$">USD</RadioLabel>
          </RadioDiv>
          <RadioDiv>
            <RadioFormInput
              id="£"
              name="currency"
              type="radio"
              value="£"
              onChange={handleCurrency}
            />
            <RadioLabel for="£">GBP</RadioLabel>
          </RadioDiv>
          <RadioDiv>
            <RadioFormInput
              id="€"
              name="currency"
              type="radio"
              value="€"
              onChange={handleCurrency}
            />
            <RadioLabel for="€">EUR</RadioLabel>
          </RadioDiv>
        </RadiosDiv>
      ) : (
        <FormInput
          name={field.input_name}
          placeholder={field.input_placeholder}
          type={field.input_type}
          onChange={handleSavingsChange}
        ></FormInput>
      )}
    </FormFieldDiv>
  ));

  return (
    <Wrapper>
      <FormSection onSubmit={handleFormSubmit}>
        <Header>Contact Information</Header>
        <FormFields>{contactFields}</FormFields>
        <Header>Print Savings</Header>
        <FormFields>{printSavings}</FormFields>
        <TransitionLink
          href={{
            pathname: '/business-case-tool/results',
            query: {
              currency,
              data: encodeURIComponent(JSON.stringify({ contactFormData, savingsFormData })),
            },
          }}
        >
          <FormSubmitButton type="submit">GET YOUR PRINT SAVINGS REPORT</FormSubmitButton>
        </TransitionLink>
      </FormSection>
    </Wrapper>
  );
};

const RadioLabel = styled.label`
  ${text.bodyMd};
`;
const RadiosDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-left: auto;
  width: 26.319vw;
  gap: 2.472vw;

  ${media.fullWidth} {
    width: 379px;
    gap: 36px;
  }
`;
const RadioFormInput = styled.input`
  cursor: pointer;
  background-color: ${colors.grey25};
  border: 0.069vw solid ${colors.grey400};
  padding: 1.111vw;
  border-radius: 0.278vw;
  width: 1.75vw;
  height: 1.75vw;

  ${media.fullWidth} {
    border: 1px solid ${colors.grey400};
    padding: 16px;
    border-radius: 4px;
    width: 25px;
    height: 25px;
  }
`;
const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.694vw;

  ${media.fullWidth} {
    max-width: 50px;
    max-height: 65px;
    gap: 10px;
  }
`;
const TransitionLink = styled(Link)`
  align-self: center;
`;
const FormSubmitButton = styled.button`
  ${text.bodySm};
  background-color: ${colors.primaryOrange};
  color: ${colors.white};
  width: max-content;
  border-radius: 1.944vw;
  padding: 0.868vw 2.083vw;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.primaryOrange};
    border: 0.069vw solid ${colors.primaryOrange};
  }

  ${media.fullWidth} {
    border-radius: 28px;
    padding: 12px 30px;
  }
`;
const FormInput = styled.input`
  margin-left: auto;
  background-color: ${colors.grey25};
  border: 0.069vw solid ${colors.grey400};
  padding: 1.111vw;
  border-radius: 0.278vw;
  width: 26.319vw;
  height: 3.056vw;

  ${media.fullWidth} {
    border: 1px solid ${colors.grey400};
    padding: 16px;
    border-radius: 4px;
    width: 379px;
    height: 44px;
  }
`;
const FormSubheader = styled.p`
  ${text.bodyMd};
`;
const FormHeader = styled.h5`
  ${text.h5};

  ${media.mobile} {
    ${text.h4};
  }
`;
const FormText = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.grey800};
  gap: 1.389vw;

  ${media.fullWidth} {
    gap: 20px;
  }
`;
const FormFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.472vw;

  ${media.fullWidth} {
    gap: 50px;
  }
`;
const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.125vw;

  ${media.fullWidth} {
    gap: 45px;
  }
`;
const Header = styled.div`
  ${text.h4};
  color: ${colors.grey800};
  border-bottom: 0.069vw solid ${colors.grey800};
  padding: 1.736vw 1.736vw 1.736vw 0;

  ${media.fullWidth} {
    border-bottom: 1px solid ${colors.grey800};
    padding: 25px 25px 25px 0;
  }
`;
const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.819vw;
  width: 79.444vw;

  ${media.fullWidth} {
    gap: 55px;
    width: 1144px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4.861vw;

  ${media.fullWidth} {
    gap: 70px;
  }
`;
export default BusinessCaseForms;
