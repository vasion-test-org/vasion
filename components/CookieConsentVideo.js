'use client';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';

const CookieConsentVideo = ({
  videos,
  borderradius,
  filename,
  thumbnails,
  isSideBySideVideo = false,
  url,
  width = '100%',
  height = '100%',
  controls = true,
  light,
  playsinline = true,
  playing = false,
  volume = 1,
  muted = false,
  loop = false,
  playIcon,
  ...otherProps
}) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkCookieConsent = () => {
      // Check if CookieYes is available
      if (typeof window !== 'undefined' && window.CookieYes) {
        // CookieYes provides a method to check consent status
        const consentStatus = window.CookieYes.getConsentStatus();
        setCookiesAccepted(consentStatus === 'accepted' || consentStatus === true);
        setIsChecking(false);
      } else if (typeof window !== 'undefined' && window.cookieyes) {
        // Alternative method to check CookieYes consent
        const consentStatus = window.cookieyes.getConsentStatus();
        setCookiesAccepted(consentStatus === 'accepted' || consentStatus === true);
        setIsChecking(false);
      } else {
        // Fallback: check for CookieYes consent cookie directly
        const cookieValue = getCookie('cookieyes-consent');
        if (cookieValue) {
          try {
            const consentData = JSON.parse(cookieValue);
            setCookiesAccepted(consentData.consent === true || consentData.accepted === true);
          } catch (e) {
            // If parsing fails, check for simple string values
            setCookiesAccepted(cookieValue === 'accepted' || cookieValue === 'true');
          }
        } else {
          // No consent cookie found, assume not accepted
          setCookiesAccepted(false);
        }
        setIsChecking(false);
      }
    };

    // Check immediately
    checkCookieConsent();

    // Also check when CookieYes loads (if not already loaded)
    if (typeof window !== 'undefined' && !window.CookieYes && !window.cookieyes) {
      const checkInterval = setInterval(() => {
        if (window.CookieYes || window.cookieyes) {
          checkCookieConsent();
          clearInterval(checkInterval);
        }
      }, 100);

      // Clean up interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        if (isChecking) {
          setIsChecking(false);
        }
      }, 10000);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      checkCookieConsent();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cookieyes-consent', handleConsentChange);
      window.addEventListener('cookieconsent', handleConsentChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('cookieyes-consent', handleConsentChange);
        window.removeEventListener('cookieconsent', handleConsentChange);
      }
    };
  }, []);

  const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop()?.split(';').shift() : null;
  };

  // Determine video source
  let videoSrc = filename;
  if (!videoSrc && videos) {
    videoSrc = videos?.[0]?.filename;
  }

  // Show loading state while checking cookies
  if (isChecking) {
    return (
      <VideoWrapper
        borderradius={borderradius}
        isSideBySideVideo={isSideBySideVideo}
      >
        <LoadingContainer>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
      </VideoWrapper>
    );
  }

  // Show cookie consent message if cookies not accepted
  if (!cookiesAccepted) {
    return (
      <VideoWrapper
        borderradius={borderradius}
        isSideBySideVideo={isSideBySideVideo}
      >
        <CookieConsentContainer>
          <CookieIcon>🍪</CookieIcon>
          <CookieMessage>
            Please accept our site cookies to enjoy Media from Vasion.com
          </CookieMessage>
          <CookieButton 
            onClick={() => {
              // Trigger CookieYes consent modal
              if (window.CookieYes) {
                window.CookieYes.showConsentModal();
              } else if (window.cookieyes) {
                window.cookieyes.showConsentModal();
              }
            }}
          >
            Accept Cookies
          </CookieButton>
        </CookieConsentContainer>
      </VideoWrapper>
    );
  }

  // Show video if cookies are accepted
  return (
    <VideoWrapper
      borderradius={borderradius}
      isSideBySideVideo={isSideBySideVideo}
    >
      <ReactPlayer
        url={url || videoSrc}
        width={width}
        height={height}
        controls={controls}
        light={light || thumbnails?.[0]?.filename}
        playsinline={playsinline}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loop}
        playIcon={playIcon}
        {...otherProps}
      />
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  width: ${(props) => (props.isSideBySideVideo ? '32vw' : '67.75vw')};
  height: ${(props) => (props.isSideBySideVideo ? '24vw' : '38vw')};
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${media.fullWidth} {
    width: ${(props) => (props.isSideBySideVideo ? '512px' : '1084px')};
    height: ${(props) => (props.isSideBySideVideo ? '384px' : '608px')};
    border-radius: ${(props) => `${props.borderradius || 0}px`};
  }
  
  ${media.tablet} {
    width: ${(props) => (props.isSideBySideVideo ? '44.531vw' : '92.188vw')};
    height: ${(props) => (props.isSideBySideVideo ? '33.398vw' : '51.758vw')};
  }
  
  ${media.mobile} {
    width: 89.167vw;
    height: 50vw;
  }
`;

const CookieConsentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, ${colors.primaryPurple} 0%, ${colors.primaryBlue} 100%);
  color: ${colors.white};
  border-radius: ${(props) => `${props.borderradius || 8}px`};
  min-height: 200px;
  gap: 1rem;
  
  ${media.mobile} {
    padding: 1.5rem;
    min-height: 150px;
  }
`;

const CookieIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
  
  ${media.mobile} {
    font-size: 2.5rem;
  }
`;

const CookieMessage = styled.p`
  ${text.bodyLg};
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
  
  ${media.mobile} {
    ${text.bodyMd};
  }
`;

const CookieButton = styled.button`
  ${text.bodyMd};
  background: ${colors.white};
  color: ${colors.primaryPurple};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  
  &:hover {
    background: ${colors.grey100};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${media.mobile} {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.grey100};
  color: ${colors.grey500};
  min-height: 200px;
  border-radius: ${(props) => `${props.borderradius || 8}px`};
`;

const LoadingText = styled.p`
  ${text.bodyMd};
  margin: 0;
`;

export default CookieConsentVideo;
