'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import RichTextRenderer from '@/components/renderers/RichTextRenderer';

const InlineQuote = ({ blok }) => {
  // console.log(blok);

  return (
    <Wrapper>
      <CopyWrapper>
        {blok?.copy_sections[0]?.copy && (
          <RichTextRenderer document={blok.copy_sections[0].copy} />
        )}
      </CopyWrapper>
      <h1>Hello World! :) </h1>
    </Wrapper>
  );
};

export default InlineQuote;

const CopyWrapper = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
