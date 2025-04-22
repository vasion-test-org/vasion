'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import colors from '@/styles/colors';
import text from '@/styles/text';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getSmoother } from '@/components/ScrollSmoothWrapper';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AnchorNavigator = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;
  const [anchorList, setAnchorList] = useState([]);

  useEffect(() => {
    const allAnchors = Array.from(document.querySelectorAll('.anchor'));
    setAnchorList(allAnchors);
  }, []);

  console.log(anchorList);
  const anchorMap = anchorList.map((anchor, i) => (
    <AnchorButton
      key={i}
      onClick={() => {
        const smoother = getSmoother();

        if (smoother && anchor) {
          smoother.scrollTo(anchor, true, 'top top'); // adjust offset
        }
      }}
    >
      {anchor.innerText}
    </AnchorButton>
  ));

  useEffect(() => {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    const footerOffset = footer.offsetTop + footer.offsetHeight;

    ScrollTrigger.create({
      trigger: '.desktopNav',
      start: 'top top',
      end: `${footerOffset}px`,
      pin: true,
      pinSpacing: false,
      markers: true
    });
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <AnchorWrapper>
      {anchorList.length > 0 && (
        <AnchorNavWrapper>
          <ButtonsDiv>{anchorMap}</ButtonsDiv>
        </AnchorNavWrapper>
      )}
      </AnchorWrapper>
    </ThemeProvider>
  );
};

const AnchorButton = styled.div`
  ${text.bodySm};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 1.875vw;
  padding: 0.25vw 0.5vw;
  border-radius: 0.25vw;

  &:hover {
    ${text.bodyMdBold};
    background: ${colors.purple200};
    color: ${colors.primaryPurple};
  }
`;
const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5vw;
`;
const AnchorNavWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  background: ${colors.purple100};
  margin: 0.5vw auto;
  width: 76.875vw;
  height: 3.375vw;
  border-radius: 0.5vw;
  padding: 0.75vw 3.75vw;
`;

const AnchorWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 10;
`

export default AnchorNavigator;
