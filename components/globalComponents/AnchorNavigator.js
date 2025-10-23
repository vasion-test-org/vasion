'use client';
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import styled, { ThemeProvider } from 'styled-components';
import { useAvailableThemes } from '@/context/ThemeContext';
import { usePageData } from '@/context/PageDataContext';
import colors from '@/styles/colors';
import text from '@/styles/text';
import media from '@/styles/media';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getSmoother } from '@/components/ScrollSmoothWrapper';
import IconRenderer from '@/components/renderers/Icons';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AnchorNavigator = ({ blok }) => {
  // Get page data from context

  const { pageData } = usePageData();
  console.log('pageData from context:', pageData);

  // Find anchor navigator component in pageData.content.body
  const anchorNavData = pageData?.content?.body?.find(
    (item) => item.component === 'anchor_navigator'
  );
  console.log('anchor navigator data from pageData:', anchorNavData);

  // Only render if we have anchor nav data from context
  if (!anchorNavData) {
    return null;
  }

  const themes = useAvailableThemes();
  const selectedTheme = themes.default;
  const [anchorList, setAnchorList] = useState([]);

  // GSAP animations for pinning and opacity
  useEffect(() => {
    if (!anchorNavData) return;

    const footer = document.querySelector('.footer');
    if (!footer) return;

    const footerOffset = footer.offsetTop + footer.offsetHeight;

    // Create opacity animation that starts at 100px scroll
    const opacityTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: '100px top',
        end: '200px top',
        scrub: true,
      },
    });

    opacityTl.fromTo('.anchorNav', { autoAlpha: 0 }, { autoAlpha: 1 });

    // Create pinning animation
    ScrollTrigger.create({
      trigger: '.anchorNav',
      start: 'top 200px',
      end: `${footerOffset}px`,
      pin: true,
      pinSpacing: false,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === document.querySelector('.anchorNav') ||
          trigger.trigger === document.body
        ) {
          trigger.kill();
        }
      });
    };
  }, [anchorNavData]);

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
        {anchorList.length > 0 ? (
          <AnchorNavWrapper>
            <PageInfo>
              <PageIcon>
                {anchorNavData?.page_icon && (
                  <IconRenderer iconName={anchorNavData?.page_icon} />
                )}
              </PageIcon>
              <PageTitle>{anchorNavData?.page_title}</PageTitle>
            </PageInfo>
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
  margin-right: 10px;

  svg {
    path {
      fill: ${colors.lightPurple};
    }
  }
`;

const PageTitle = styled.h2`
  ${text.bodyLgBold};
  color: ${colors.txtPrimary};
  margin: 0;

  ${media.mobile} {
    ${text.bodyMd};
  }
`;

const AnchorWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 10;
  top: 100px;
  pointer-events: none; /* non-interactive until anchors exist */
  opacity: 0; /* Start with opacity 0, GSAP will animate this */

  ${media.fullWidth} {
    top: 100px;
  }

  ${media.tablet} {
    top: 100px;
  }

  ${media.mobile} {
    top: 100px;
  }

  &[data-has-anchors='true'] {
    pointer-events: auto;
  }
`;

export default AnchorNavigator;
