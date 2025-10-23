'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import colors from '@/styles/colors';
import text from '@/styles/text';
import media from '@/styles/media';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getSmoother } from '@/components/ScrollSmoothWrapper';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AnchorNavigator = ({ blok }) => {
  console.log('blok anchor navigator', blok);

  // Only render if blok exists
  if (!blok) {
    return null;
  }

  const themes = useAvailableThemes();
  const selectedTheme = themes.default;
  const [anchorList, setAnchorList] = useState([]);
  useEffect(() => {
    const updateAnchors = () => {
      const allAnchors = Array.from(
        document.querySelectorAll('[data-anchor-id]')
      );
      setAnchorList(allAnchors);
    };

    updateAnchors();

    const observer = new MutationObserver(() => {
      updateAnchors();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const anchorMap = anchorList.map((anchor, i) => {
    const anchorText = anchor.dataset.anchorId
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <AnchorButton
        key={i}
        onClick={() => {
          const smoother = getSmoother();

          if (smoother && anchor) {
            smoother.scrollTo(anchor, true, 'top top');
          }
        }}
      >
        {anchorText}
      </AnchorButton>
    );
  });

  return (
    <ThemeProvider theme={selectedTheme}>
      <AnchorWrapper
        className="anchorNav"
        data-has-anchors={anchorList.length > 0}
        data-anchors-count={anchorList.length}
      >
        <PageInfo>
          <PageIcon>
            {blok.icon[0].icon && (
              <Icon src={blok.icon[0].icon} alt={blok.icon[0].alt} />
            )}
          </PageIcon>
          <PageTitle>{blok.title}</PageTitle>
        </PageInfo>
        {anchorList.length > 0 ? (
          <AnchorNavWrapper>
            <ButtonsDiv>{anchorMap}</ButtonsDiv>
          </AnchorNavWrapper>
        ) : null}
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

  ${media.fullWidth} {
    height: 30px;
    padding: 4px 8px;
    border-radius: 4px;
  }

  ${media.tablet} {
    height: 2.93vw;
    padding: 0.391vw 0.781vw;
    border-radius: 0.391vw;
  }

  ${media.mobile} {
    height: 5.417vw;
    padding: 0.833vw 1.667vw;
    border-radius: 0.833vw;
    width: max-content;
    min-width: max-content;
  }

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

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
    width: 100%;
  }
`;
const AnchorNavWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${colors.purple100};
  margin: 0.5vw auto;
  width: 76.875vw;
  height: 3.375vw;
  border-radius: 0.5vw;
  padding: 0.75vw 3.75vw;

  ${media.fullWidth} {
    margin: 8px auto;
    width: 1230px;
    height: 54px;
    border-radius: 8px;
    padding: 12px 60px;
  }

  ${media.tablet} {
    margin: 0.781vw auto;
    width: 92.188vw;
    height: 5.273vw;
    border-radius: 0.781vw;
    padding: 1.172vw 5.859vw;
  }

  ${media.mobile} {
    margin: 1.667vw auto;
    width: 89.167vw;
    height: 10.417vw;
    border-radius: 1.667vw;
    padding: 2.5vw 12.5vw;
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-bottom: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
    margin-bottom: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
    margin-bottom: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
    margin-bottom: 1.667vw;
  }
`;

const PageIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 1.25vw;
  height: 1.25vw;

  ${media.fullWidth} {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    width: 1.953vw;
    height: 1.953vw;
  }

  ${media.mobile} {
    width: 4.167vw;
    height: 4.167vw;
  }
`;

const PageTitle = styled.h2`
  ${text.headingSm};
  color: ${colors.gray900};
  margin: 0;

  ${media.mobile} {
    ${text.bodyMd};
  }
`;

const AnchorWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 10;
  top: 4.063vw;
  pointer-events: none; /* non-interactive until anchors exist */
  /* opacity: 0; */

  ${media.fullWidth} {
    top: 65px;
  }

  ${media.tablet} {
    top: 6.348vw;
  }

  ${media.mobile} {
    top: 13.542vw;
  }

  &[data-has-anchors='true'] {
    pointer-events: auto;
  }
`;

export default AnchorNavigator;
