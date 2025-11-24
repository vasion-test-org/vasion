'use client';

import React, { useEffect, useState } from 'react';

/**
 * Tailwind CSS Test Page
 * 
 * This page uses Tailwind CSS for all styling.
 * Test this page with GTmetrix to compare performance against styled-components.
 * 
 * Note: Requires Tailwind CSS to be installed and configured.
 * Install: npm install -D tailwindcss postcss autoprefixer
 * Configure: npx tailwindcss init -p
 */

export default function TailwindTestPage() {
  const [tailwindInstalled, setTailwindInstalled] = useState(true);

  useEffect(() => {
    // Check if Tailwind is working by testing if a Tailwind class is applied
    const testEl = document.createElement('div');
    testEl.className = 'hidden';
    document.body.appendChild(testEl);
    const styles = window.getComputedStyle(testEl);
    // If Tailwind is installed, 'hidden' class will set display: none
    // If not, it will be display: block (default)
    const isInstalled = styles.display === 'none';
    document.body.removeChild(testEl);
    setTailwindInstalled(isInstalled);
  }, []);

  if (!tailwindInstalled) {
    return (
      <div style={{ 
        padding: '3rem', 
        textAlign: 'center', 
        fontFamily: 'system-ui',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1a202c' }}>
          ⚠️ Tailwind CSS Not Installed
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '2rem', lineHeight: '1.6' }}>
          This page requires Tailwind CSS to be installed and configured.
        </p>
        <div style={{ 
          background: '#f7fafc', 
          padding: '2rem', 
          borderRadius: '0.75rem',
          textAlign: 'left',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1a202c' }}>
            To install Tailwind:
          </h2>
          <ol style={{ paddingLeft: '1.5rem', color: '#4a5568', lineHeight: '2' }}>
            <li><code style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>npm install -D tailwindcss postcss autoprefixer</code></li>
            <li><code style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>npx tailwindcss init -p</code></li>
            <li>Add to <code style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>app/globals.css</code>:
              <pre style={{ 
                background: '#1a202c', 
                color: '#f7fafc', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                marginTop: '0.5rem',
                overflow: 'auto'
              }}>
{`@tailwind base;
@tailwind components;
@tailwind utilities;`}
              </pre>
            </li>
            <li>Update <code style={{ background: '#e2e8f0', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>tailwind.config.js</code> content paths</li>
            <li>Restart dev server</li>
          </ol>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#838587' }}>
          For now, test the <a href="/test-styled-components" style={{ color: '#7E5FDD', textDecoration: 'underline' }}>styled-components version</a> instead.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-[#f7fafc]">
      <section className="w-full max-w-[1200px] mb-12">
        <h1 className="text-[2.5rem] font-bold text-center mb-4 text-[#1a202c]">
          Tailwind CSS Test Page
        </h1>
        <p className="text-center text-[1.125rem] text-[#4a5568] mb-12">
          This page uses Tailwind CSS for all styling. Test with GTmetrix to compare performance.
        </p>

        <div className="grid grid-cols-1 min-[481px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-[0.75rem] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]"
            >
              <h2 className="text-2xl font-semibold mb-3 text-[#1a202c]">Card {i + 1}</h2>
              <p className="text-base leading-[1.5] text-[#4a5568] mb-4">
                This is a test card component styled with Tailwind CSS. It includes
                hover effects, responsive design, and utility classes. This content is
                repeated multiple times to create a substantial page for performance testing.
              </p>
              <button className="px-6 py-3 bg-gradient-to-b from-[#7E5FDD] to-[#583F99] text-white border-none rounded-lg font-medium cursor-pointer transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] w-fit">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-8 mt-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-b from-[#7E5FDD] to-[#583F99] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1a202c]">Feature {i + 1}</h3>
              <p className="text-sm text-[#4a5568] leading-[1.5]">
                This feature card demonstrates Tailwind CSS with icons, titles, and descriptions.
                Multiple instances help create a realistic page size for performance testing.
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col max-[480px]:flex-col max-[480px]:gap-8 max-[480px]:text-center min-[481px]:flex-row justify-around items-center py-12 bg-white rounded-2xl mt-12">
          <div className="flex flex-col items-center">
            <div className="text-[3rem] font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              1.02
            </div>
            <div className="text-base text-[#4a5568] font-medium">MB Bundle</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[3rem] font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              417
            </div>
            <div className="text-base text-[#4a5568] font-medium">KB First Load</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[3rem] font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              95
            </div>
            <div className="text-base text-[#4a5568] font-medium">Performance Score</div>
          </div>
        </div>
      </section>
    </div>
  );
}

