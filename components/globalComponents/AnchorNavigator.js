'use client';
import React, { useEffect, useState, useContext } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import colors from '@/styles/colors';
import text from '@/styles/text';
import media from '@/styles/media';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import {
  getSmoother,
  ensureScrollSmoother,
} from '@/components/ScrollSmoothWrapper';
import { ScreenContext } from '@/components/providers/Screen';
import Icons from '@/components/renderers/Icons';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AnchorNavigator = ({ blok }) => {
  const themes = useAvailableThemes();
  const selectedTheme = themes[blok?.theme] || themes.default;
  const [anchorList, setAnchorList] = useState([]);
  const formattedIconString = blok?.page_icon?.replace(/\s+/g, '');
  const IconComponent = Icons[formattedIconString] || null;
  // console.log(IconComponent)
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
        onClick={async () => {
          if (!anchor) return;

          // Try to get existing smoother first
          let smoother = getSmoother();

          // If no smoother exists, try to ensure it's loaded
          if (!smoother) {
            smoother = await ensureScrollSmoother();
          }

          if (smoother) {
            // Use ScrollSmoother if available
            smoother.scrollTo(anchor, true, 'top top');
          } else {
            // Fallback to native smooth scrolling
            anchor.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });
          }
        }}
      >
        {anchorText}
      </AnchorButton>
    );
  });

  return (
    <ThemeProvider theme={selectedTheme}>
      {blok && anchorList.length > 0 && (
        <AnchorWrapper className="anchorNav">
          <AnchorNavWrapper>
            <PageInfoContainer>
              {blok?.page_title && <PageTitle>{blok.page_title}</PageTitle>}
              {IconComponent && (
                <IconWrapper>
                  <IconComponent />
                </IconWrapper>
              )}
            </PageInfoContainer>
            <ButtonsDiv>{anchorMap}</ButtonsDiv>
          </AnchorNavWrapper>
        </AnchorWrapper>
      )}
    </ThemeProvider>
  );
};

const PageTitle = styled.p`
  ${text.bodyMdBold};
  color: ${colors.primaryPurple};
`;
const PageInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;

  ${media.fullWidth} {
    gap: 8px;
  }

  ${media.tablet} {
    gap: 0.781vw;
  }

  ${media.mobile} {
    gap: 1.667vw;
  }
`;

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

const AnchorWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 10;
  top: 4.063vw;
  opacity: 0;

  ${media.fullWidth} {
    top: 65px;
  }

  ${media.tablet} {
    top: 6.348vw;
  }

  ${media.mobile} {
    top: 13.542vw;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 5.417vw;
    height: 5.417vw;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default AnchorNavigator;
