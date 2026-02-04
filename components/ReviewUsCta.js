'use client';
import React from 'react';

import { storyblokEditable } from '@storyblok/react/rsc';
import styled, { ThemeProvider } from 'styled-components';

import RichTextRenderer from '@/components/renderers/RichTextRenderer';
import { useAvailableThemes } from '@/context/ThemeContext';
import colors from '@/styles/colors';
import media from '@/styles/media';
import text from '@/styles/text';

const ReviewUsCta = ({ blok }) => {
  const backgrounds = {
    mobile: blok?.background_image[2].filename,
    reg: blok?.background_image[0].filename,
    tablet: blok.background_image[1].filename,
  };

  const ctaButtons = blok?.button_blocks?.map((item, index) => {
    // console.log(item);
    return (
      <CtaItem href={item?.link_url?.url} key={index}>
        <CtaLogo alt={item?.logo_icon.alt} src={item?.logo_icon.filename} />
        <CtaStatBox>
          <ScoreDisplay>
            <Score>{item?.stat}</Score>
            <Range>{item?.range}</Range>
          </ScoreDisplay>
          <Stars alt={item?.star_list.alt} src={item?.star_list.filename} />
        </CtaStatBox>
      </CtaItem>
    );
  });

  return (
    <SectionWrapper spacing={blok.section_spacing} spacingOffset={blok.offset_spacing}>
      <Wrapper $bg={backgrounds} $full={!blok?.header && !blok?.body_copy}>
        <ContentWrapper>
          <Header>
            <RichTextRenderer document={blok.header} />
          </Header>
          <Body>
            <RichTextRenderer document={blok.body_copy} />
          </Body>
        </ContentWrapper>
        {blok?.button_blocks && <CtaContainer>{ctaButtons}</CtaContainer>}
      </Wrapper>
    </SectionWrapper>
  );
};

export default ReviewUsCta;

const Stars = styled.img`
  width: 4.375vw;
  height: 0.875vw;
  ${media.fullWidth} {
    width: 70px;
    height: 14px;
  }

  ${media.tablet} {
    width: 6.836vw;
    height: 1.367vw;
  }

  ${media.mobile} {
    width: 14.583vw;
    height: 2.917vw;
  }
`;
const Range = styled.p`
  ${text.bodySm};
`;
const Score = styled.p`
  ${text.bodyXLBold};
`;
const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15vw;
  ${media.fullWidth} {
    gap: 2.4px;
  }

  ${media.tablet} {
    gap: 0.234vw;
  }

  ${media.mobile} {
    gap: 0.5vw;
  }
`;
const CtaStatBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const CtaLogo = styled.img`
  width: 1.875vw;
  height: 1.875vw;
  ${media.fullWidth} {
    width: 30px;
    height: 30px;
  }

  ${media.tablet} {
    width: 2.93vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    width: 6.25vw;
    height: 6.25vw;
  }
`;
const CtaItem = styled.a`
  cursor: pointer;
  display: flex;
  background-color: ${colors.white};
  gap: 0.75vw;
  border-radius: 0.25vw;
  padding: 0.5vw 1.25vw;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.06);
    background-color: ${colors.lightPurpleGrey};
  }
  ${media.fullWidth} {
    gap: 12px;
    border-radius: 4px;
    padding: 8px 20px;
  }

  ${media.tablet} {
    gap: 12px;
    border-radius: 0.391vw;
    padding: 0.781vw 1.953vw;
  }

  ${media.mobile} {
    gap: 2.5vw;
    border-radius: 0.833vw;
    padding: 1.667vw 4.167vw;
  }
`;
const CtaContainer = styled.div`
  display: flex;
  gap: 1vw;
  ${media.fullWidth} {
    gap: 16px;
  }

  ${media.tablet} {
    gap: 1.563vw;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 3.333vw;
    width: fit-content;
  }
`;

const Body = styled.div`
  ${text.bodyLg};
`;

const Header = styled.h3`
  ${text.h3};
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  width: 65.5vw;
  gap: 1.5vw;
  p:not(:last-child) {
    margin-bottom: 1.5vw;
  }
  ${media.fullWidth} {
    width: 952px;
    gap: 24px;
    p:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  ${media.tablet} {
    width: 80.469vw;
    gap: 2.344vw;
    p:not(:last-child) {
      margin-bottom: 2.344vw;
    }
  }

  ${media.mobile} {
    width: 76.458vw;
    gap: 5vw;
    p:not(:last-child) {
      margin-bottom: 5vw;
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  background-image: ${(props) => props.$bg && `url(${props.$bg?.reg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: ${(props) => (props?.$full ? 'center' : 'unset')};
  width: 80vw;
  height: ${(props) => (props?.$full ? '34.938vw' : 'unset')};
  padding: 3.75vw;
  border-radius: 1.75vw;
  gap: 1vw;
  ${media.fullWidth} {
    width: 1144px;
    padding: 60px;
    border-radius: 28px;
    gap: 16px;
    height: ${(props) => (props?.$full ? '559px' : 'unset')};
  }

  ${media.tablet} {
    width: 92.188vw;
    padding: 5.859vw;
    border-radius: 2.734vw;
    gap: 1.563vw;
    height: ${(props) => (props?.$full ? '39.551vw' : 'unset')};
  }

  ${media.mobile} {
    background-image: ${(props) => props.$bg && `url(${props.$bg?.mobile})`};
    width: 89.792vw;
    padding: 8.333vw 6.667vw;
    border-radius: 5.833vw;
    gap: 3.333vw;
    height: ${(props) => (props?.$full ? '38.125vw' : 'unset')};
  }
`;

const SectionWrapper = styled.div`
  padding: ${(props) => {
    if (props.spacingOffset === 'top') {
      return props.spacing === 'default'
        ? '3.75vw 0 0'
        : props.spacing
          ? `${props.spacing}px 0 0`
          : '3.75vw 0 0';
    }
    if (props.spacingOffset === 'bottom') {
      return props.spacing === 'default'
        ? '0 0 3.75vw'
        : props.spacing
          ? `0 0 ${props.spacing}px`
          : '0 0 3.75vw';
    }
    return props.spacing === 'default'
      ? '3.75vw 0'
      : props.spacing
        ? `${props.spacing}px 0`
        : '3.75vw 0';
  }};

  ${media.fullWidth} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '60px 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '60px 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 60px'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 60px';
      }
      return props.spacing === 'default'
        ? '60px 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '60px 0';
    }};
  }

  ${media.tablet} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '5.859vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '5.859vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 5.859vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 5.859vw';
      }
      return props.spacing === 'default'
        ? '5.859vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '5.859vw 0';
    }};
  }

  ${media.mobile} {
    padding: ${(props) => {
      if (props.spacingOffset === 'top') {
        return props.spacing === 'default'
          ? '12.5vw 0 0'
          : props.spacing
            ? `${props.spacing}px 0 0`
            : '12.5vw 0 0';
      }
      if (props.spacingOffset === 'bottom') {
        return props.spacing === 'default'
          ? '0 0 12.5vw'
          : props.spacing
            ? `0 0 ${props.spacing}px`
            : '0 0 12.5vw';
      }
      return props.spacing === 'default'
        ? '12.5vw 0'
        : props.spacing
          ? `${props.spacing}px 0`
          : '12.5vw 0';
    }};
  }
`;
