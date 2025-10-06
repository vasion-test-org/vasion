'use client';
import React from 'react';
import CookieConsentVideo from '@/components/CookieConsentVideo';

// Simple test component for React Player v3
const ReactPlayerV3Test = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>React Player v3 Test</h2>
      <p>Testing React Player v3 with cookie consent functionality.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>YouTube Video Test</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="300px"
          controls={true}
          forceConsentMessage={false} // Will show video in test environments
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Force Consent Message Test</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="300px"
          controls={true}
          forceConsentMessage={true} // Will force consent message even in test environments
        />
      </div>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h4>Debug Information:</h4>
        <ul>
          <li><strong>Environment:</strong> {process.env.NODE_ENV}</li>
          <li><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</li>
          <li><strong>React Player Version:</strong> v3.3.0</li>
          <li><strong>CookieYes Available:</strong> {typeof window !== 'undefined' && typeof window.getCkyConsent === 'function' ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactPlayerV3Test;
