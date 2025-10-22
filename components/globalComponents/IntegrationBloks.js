'use client';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import colors from '@/styles/colors';
import text from '@/styles/text';
import media from '@/styles/media';
import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

const IntegrationBloks = ({ types, isMobile }) => {
  const imageList = (icons) => {
    return icons?.map((icon, index) => (
      <Logo
        {...storyblokEditable(icon?.filename)}
        key={index}
        src={icon?.filename}
        alt={icon?.alt || ''}
      />
    ));
  };
  //when links are added back add <Link href={item?.link_url.url} key={index}>
  const typeList = types?.map((item, index) => {
    let titleContent;
    if (isMobile && item?.title.includes('Virtual Desktop Infrastructure')) {
      titleContent = 'VDI';
    } else {
      titleContent = item?.title;
    }
    return (
      <div>
        <IntegrationItem $columns={index}>
          <Title>{titleContent}</Title>
          <ImagesContainer>{imageList(item?.icons)}</ImagesContainer>
        </IntegrationItem>
      </div>
    );
  });

  return <TypeContainer>{typeList}</TypeContainer>;
};

export default IntegrationBloks;

const Logo = styled.img`
  width: 4.375vw;
  height: 4.375vw;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.15);
  }
  &:not(:hover) {
    transition: transform 0.5s ease-out;
  }
  ${media.fullWidth} {
    width: 70px;
    height: 70px;
  }
  ${media.tablet} {
    width: 6.836vw;
    height: 6.836vw;
  }
  ${media.mobile} {
    width: 14.583vw;
    height: 14.583vw;
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: center;
  justify-content: center;
  gap: 0.25vw;
  ${media.fullWidth} {
    gap: 4px;
  }
  ${media.tablet} {
    gap: 0.391vw;
  }
  ${media.mobile} {
    gap: 0.833vw;
  }
`;
const Title = styled.div`
  display: flex;
  color: black;
  ${text.bodySmBold};
  align-self: center;
  white-space: nowrap;
  width: fit-content;
  padding: 0.25vw 0.5vw;
  border-radius: 1.5vw;
  ${media.fullWidth} {
    padding: 4px 8px;
    border-radius: 24px;
  }
  ${media.tablet} {
    padding: 0.391vw 0.781vw;
    border-radius: 2.344vw;
  }
  ${media.mobile} {
    padding: 0.833vw 1.667vw;
    border-radius: 5vw;
  }
`;
const IntegrationItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${colors.lightPurpleGrey};
  width: ${(props) => {
    if (props.$columns === 1 || props.$columns === 0) {
      return '16.125vw';
    } else if (props.$columns === 2) {
      return '11.9vw';
    } else if (props.$columns === 3) {
      return '256px';
    } else if (props.$columns === 4 || props.$columns === 6) {
      return '20.75vw';
    } else if (props.$columns === 5) {
      return '16.063vw';
    } else {
      return 'auto';
    }
  }};
  gap: 0.625vw;
  padding: 1.25vw;
  border-radius: 1.25vw;
  ${media.fullWidth} {
    width: ${(props) => {
      if (props.$columns === 1 || props.$columns === 0) {
        return '258px';
      } else if (props.$columns === 2) {
        return '190px';
      } else if (props.$columns === 3) {
        return '256px';
      } else if (props.$columns === 4 || props.$columns === 6) {
        return '332px';
      } else if (props.$columns === 5) {
        return '257px';
      } else {
        return 'auto';
      }
    }};
    gap: 10px;
    padding: 15px;
    border-radius: 20px;
  }
  ${media.tablet} {
    width: ${(props) => {
      if (props.$columns === 1 || props.$columns === 0) {
        return '23.633vw';
      } else if (props.$columns === 2) {
        return '16.602vw';
      } else if (props.$columns == 3) {
        return '24.602vw';
      } else if (props.$columns === 4 || props.$columns === 6) {
        return '30.859vw';
      } else if (props.$columns === 5) {
        return '22.484vw';
      } else {
        return 'auto';
      }
    }};
    gap: 0.977vw;
    padding: 1.17vw;
    border-radius: 1.953vw;
  }
  ${media.mobile} {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: ${(props) => {
      if (
        props.$columns === 0 ||
        props?.$columns === 1 ||
        props?.$columns === 6
      ) {
        return '88.542vw';
      } else if (props.$columns === 2) {
        return '44.167vw';
      } else if (props.$columns === 3) {
        return '47.167vw';
      } else if (props.$columns === 4) {
        return '52.25vw';
      } else if (props.$columns === 5) {
        return '35.208vw';
      } else {
        return 'auto';
      }
    }};
    overflow: hidden;
    flex-direction: row;
    height: ${(props) => (props?.$columns === 4 ? '40.7vw' : 'auto')};
    gap: 1.2vw 0.7vw;
    padding: 2.5vw 0.208vw;
    border-radius: 20px;
  }
`;
const TypeContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.25vw;
  width: 80vw;
  ${media.fullWidth} {
    gap: 20px;
    width: 1280px;
  }
  ${media.tablet} {
    gap: 0.781vw;
    width: 92.188vw;
  }
  ${media.mobile} {
    gap: 0.833vw;
    width: 100%;
    max-width: 100%;
  }
`;
