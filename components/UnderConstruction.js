'use client';
import React from 'react';

import Button from 'components/globalComponents/Button';
import styled from 'styled-components';

import colors from '@/styles/colors';
import media from '@/styles/media';

import RichTextRenderer from './renderers/RichTextRenderer';

const UnderConstruction = ({ blok }) => {
  return (
    <Wrapper>
      <CopyWrapper>
        <RichTextRenderer document={blok.eyebrow} />
        <RichTextRenderer document={blok.header} />
        <RichTextRenderer document={blok.body} />
        <ButtonWrapper>{blok.button[0] && <Button $buttonData={blok.button[0]} />}</ButtonWrapper>
      </CopyWrapper>
    </Wrapper>
  );
};
export default UnderConstruction;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65.5vw;
  text-align: center;
  gap: 1vw;

  ${media.fullWidth} {
    gap: 16px;
    width: 1048px;
  }
  ${media.tablet} {
    gap: 1.563vw;
    width: 92.188vw;
  }
  ${media.mobile} {
    gap: 3.333vw;
    width: 89.167vw;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${colors.lightPurpleGrey};
`;
