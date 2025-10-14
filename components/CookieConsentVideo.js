'use client';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import media from '@/styles/media';
import colors from '@/styles/colors';
import text from '@/styles/text';

// Error boundary for video components
class VideoErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Video Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <VideoWrapper
          borderradius={this.props.borderradius}
          isSideBySideVideo={this.props.isSideBySideVideo}
        >
          <ErrorContainer>
            <ErrorIcon>⚠️</ErrorIcon>
            <ErrorMessage>Video failed to load</ErrorMessage>
            <RetryButton
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Retry
            </RetryButton>
          </ErrorContainer>
        </VideoWrapper>
      );
    }
    return this.props.children;
  }
}

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
  forceConsentMessage = false, // For Testing on localhost change to true
  ...otherProps
}) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkCookieConsent = () => {
      // Check if we're in a test/development environment
      const isTestEnvironment =
        process.env.NODE_ENV === 'development' ||
        window.location.hostname.includes('vercel.app') ||
        window.location.hostname.includes('localhost') ||
        window.location.hostname.includes('127.0.0.1');

      // In test environments, allow videos by default (for testing purposes)
      // Unless forceConsentMessage is true
      if (isTestEnvironment && !forceConsentMessage) {
        console.log('Test environment detected - allowing videos for testing');
        setCookiesAccepted(true);
        setIsChecking(false);
        return;
      }

      // Check if CookieYes is available using the correct API
      if (
        typeof window !== 'undefined' &&
        typeof window.getCkyConsent === 'function'
      ) {
        try {
          const consentData = window.getCkyConsent();
          // Check if user has completed consent action and accepted cookies
          setCookiesAccepted(
            consentData.isUserActionCompleted &&
              (consentData.categories?.analytics ||
                consentData.categories?.marketing ||
                consentData.categories?.functional),
          );
          setIsChecking(false);
        } catch (error) {
          console.warn('Error getting CookieYes consent:', error);
          // Fallback to cookie check
          checkCookieFallback();
        }
      } else {
        // Fallback: check for CookieYes consent cookie directly
        checkCookieFallback();
      }
    };

    const checkCookieFallback = () => {
      const cookieValue = getCookie('cookieyes-consent');
      if (cookieValue) {
        try {
          const consentData = JSON.parse(cookieValue);
          setCookiesAccepted(
            consentData.consent === true || consentData.accepted === true,
          );
        } catch (e) {
          // If parsing fails, check for simple string values
          setCookiesAccepted(
            cookieValue === 'accepted' || cookieValue === 'true',
          );
        }
      } else {
        // No consent cookie found, assume not accepted
        setCookiesAccepted(false);
      }
      setIsChecking(false);
    };

    // Check immediately
    checkCookieConsent();

    let checkInterval = null;
    let timeoutId = null;

    // Also check when CookieYes loads (if not already loaded)
    if (
      typeof window !== 'undefined' &&
      typeof window.getCkyConsent !== 'function'
    ) {
      checkInterval = setInterval(() => {
        if (typeof window.getCkyConsent === 'function') {
          checkCookieConsent();
          clearInterval(checkInterval);
        }
      }, 100);

      // Clean up interval after 10 seconds
      timeoutId = setTimeout(() => {
        clearInterval(checkInterval);
        // Use functional update to avoid stale closure
        setIsChecking(prevIsChecking => {
          if (prevIsChecking) {
            return false;
          }
          return prevIsChecking;
        });
      }, 10000);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      checkCookieConsent();
    };

    if (typeof window !== 'undefined') {
      // Listen for CookieYes consent changes
      window.addEventListener('cookieyes-consent', handleConsentChange);
      window.addEventListener('cookieconsent', handleConsentChange);
      // Also listen for the specific CookieYes event
      window.addEventListener('ckyConsentChanged', handleConsentChange);
    }

    return () => {
      // Clear timeout to prevent memory leak
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Clear interval to prevent memory leak
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('cookieyes-consent', handleConsentChange);
        window.removeEventListener('cookieconsent', handleConsentChange);
        window.removeEventListener('ckyConsentChanged', handleConsentChange);
      }
    };
  }, [forceConsentMessage]);

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
        height={height}
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
        height={height}
      >
        <CookieConsentContainer>
          <CookieIcon
            src={'/images/logos/vasion-logo-purple.webp'}
            alt={'accept cookie notification vasion'}
          />
          <CookieMessage>
            Please accept our site cookies to enjoy Media from Vasion.
          </CookieMessage>
          <CookieButton
            onClick={() => {
              console.log('Accept Cookies button clicked');
              console.log('Available CookieYes methods:', {
                getCkyConsent: typeof window.getCkyConsent,
                CookieYes: typeof window.CookieYes,
                cookieyes: typeof window.cookieyes,
                ckyConsent: typeof window.ckyConsent,
                CookieYesAPI: typeof window.CookieYesAPI
              });
              
              // Debug: Log all window properties that might be CookieYes related
              const cookieYesProps = Object.keys(window).filter(key => 
                key.toLowerCase().includes('cookie') || 
                key.toLowerCase().includes('cky') ||
                key.toLowerCase().includes('consent')
              );
              console.log('Cookie-related window properties:', cookieYesProps);
              
              // Try multiple approaches to trigger CookieYes consent modal
              let modalTriggered = false;
              
              // Method 1: Try CookieYes.showConsentModal()
              if (window.CookieYes && typeof window.CookieYes.showConsentModal === 'function') {
                console.log('Trying CookieYes.showConsentModal()');
                window.CookieYes.showConsentModal();
                modalTriggered = true;
              }
              
              // Method 2: Try cookieyes.showConsentModal()
              if (!modalTriggered && window.cookieyes && typeof window.cookieyes.showConsentModal === 'function') {
                console.log('Trying cookieyes.showConsentModal()');
                window.cookieyes.showConsentModal();
                modalTriggered = true;
              }
              
              // Method 3: Try ckyConsent.showConsentModal()
              if (!modalTriggered && window.ckyConsent && typeof window.ckyConsent.showConsentModal === 'function') {
                console.log('Trying ckyConsent.showConsentModal()');
                window.ckyConsent.showConsentModal();
                modalTriggered = true;
              }
              
              // Method 4: Try CookieYesAPI.showConsentModal()
              if (!modalTriggered && window.CookieYesAPI && typeof window.CookieYesAPI.showConsentModal === 'function') {
                console.log('Trying CookieYesAPI.showConsentModal()');
                window.CookieYesAPI.showConsentModal();
                modalTriggered = true;
              }
              
              // Method 5: Try to trigger consent banner by dispatching events
              if (!modalTriggered) {
                console.log('Trying to trigger consent events');
                const events = ['cookieyes-consent', 'cookieconsent', 'ckyConsentChanged'];
                events.forEach(eventName => {
                  window.dispatchEvent(new CustomEvent(eventName, { detail: { action: 'show' } }));
                });
                modalTriggered = true;
              }
              
              // Method 6: Try to find and click the actual CookieYes banner button
              if (!modalTriggered) {
                console.log('Trying to find CookieYes banner button');
                const cookieYesBanner = document.querySelector('[id*="cookieyes"], [class*="cookieyes"], [id*="cky"], [class*="cky"]');
                if (cookieYesBanner) {
                  console.log('Found CookieYes banner:', cookieYesBanner);
                  const acceptButton = cookieYesBanner.querySelector('button[class*="accept"], button[id*="accept"], a[class*="accept"], a[id*="accept"]');
                  if (acceptButton) {
                    console.log('Found accept button:', acceptButton);
                    acceptButton.click();
                    modalTriggered = true;
                  }
                }
              }
              
              if (!modalTriggered) {
                console.log('Could not trigger CookieYes consent modal. Please accept cookies manually from the banner.');
                alert('Please accept cookies using the cookie banner at the bottom of the page.');
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
      height={height}
    >
      <VideoErrorBoundary
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
          onReady={() => {
            console.log('ReactPlayer v3 ready - URL:', url || videoSrc);
          }}
          onError={(error) => {
            console.error('ReactPlayer v3 error:', error);
            console.error('Error details:', {
              url: url || videoSrc,
              error: error,
              userAgent:
                typeof window !== 'undefined'
                  ? window.navigator.userAgent
                  : 'SSR',
            });
          }}
          onLoadStart={() => {
            console.log(
              'ReactPlayer v3 loading started - URL:',
              url || videoSrc,
            );
          }}
          onLoad={() => {
            console.log(
              'ReactPlayer v3 load completed - URL:',
              url || videoSrc,
            );
          }}
          onStart={() => {
            console.log('ReactPlayer v3 started playing');
          }}
          onPlay={() => {
            console.log('ReactPlayer v3 playing');
          }}
          onPause={() => {
            console.log('ReactPlayer v3 paused');
          }}
          {...otherProps}
        />
      </VideoErrorBoundary>
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height || '100%'};
  max-width: 100%;
  border-radius: ${(props) => `${props.borderradius || 0}px`};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CookieConsentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${colors.primaryPurple} 0%,
    ${colors.primaryBlue} 100%
  );
  color: ${colors.white};
  border-radius: ${(props) => `${props.borderradius || 8}px`};
  width: 100%;
  height: 100%;
  gap: 1rem;

  ${media.mobile} {
    padding: 1.5rem;
  }
`;

const CookieIcon = styled.img`
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
  color: ${colors.txtSubtle};

  ${media.mobile} {
    ${text.bodyMd};
  }
`;

const CookieButton = styled.button`
  ${text.bodyMd};
  background: ${colors.white};
  color: ${colors.primaryPurple};
  box-shadow: -12px 17px 43px 0px rgba(0, 0, 0, 0.1);
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: ${colors.grey100};
  color: ${colors.grey700};
  border-radius: ${(props) => `${props.borderradius || 8}px`};
  min-height: 200px;
  gap: 1rem;
`;

const ErrorIcon = styled.div`
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  ${text.bodyMd};
  margin: 0;
`;

const RetryButton = styled.button`
  ${text.bodySm};
  background: ${colors.primaryPurple};
  color: ${colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${colors.primaryBlue};
  }
`;

export default CookieConsentVideo;
