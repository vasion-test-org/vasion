'use client';
import React from 'react';
import CookieConsentVideo from '@/components/CookieConsentVideo';

// Test component to demonstrate cookie consent functionality
const CookieConsentTest = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Cookie Consent Video Test</h2>
      <p>This component demonstrates how videos will show a cookie consent message when cookies haven't been accepted.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Test Video 1 - With Thumbnail</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="300px"
          controls={true}
          light="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Test Video 2 - Without Thumbnail</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="300px"
          controls={true}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Test Video 3 - Custom Styling</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="200px"
          controls={true}
          borderradius={16}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Test Video 4 - Force Consent Message (for testing)</h3>
        <CookieConsentVideo
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          width="100%"
          height="200px"
          controls={true}
          forceConsentMessage={true}
        />
      </div>
      
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '2rem'
      }}>
        <h4>How it works:</h4>
        <ul>
          <li><strong>Production (vasion.com):</strong> Checks CookieYes consent and shows message if not accepted</li>
          <li><strong>Test environments (vercel.app, localhost):</strong> Allows videos by default for testing</li>
          <li><strong>Force consent message:</strong> Use <code>forceConsentMessage={true}</code> to test the consent UI</li>
          <li><strong>CookieYes not loaded:</strong> Falls back to checking cookies directly</li>
          <li><strong>Accept Cookies button:</strong> Opens CookieYes consent modal (when available)</li>
        </ul>
      </div>
    </div>
  );
};

export default CookieConsentTest;
