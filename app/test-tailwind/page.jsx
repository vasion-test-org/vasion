'use client';

import React from 'react';

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
  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gray-50">
      <section className="w-full max-w-6xl mb-12">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Tailwind CSS Test Page
        </h1>
        <p className="text-center text-lg text-gray-600 mb-12">
          This page uses Tailwind CSS for all styling. Test with GTmetrix to compare performance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">Card {i + 1}</h2>
              <p className="text-base leading-relaxed text-gray-600 mb-4">
                This is a test card component styled with Tailwind CSS. It includes
                hover effects, responsive design, and utility classes. This content is
                repeated multiple times to create a substantial page for performance testing.
              </p>
              <button className="px-6 py-3 bg-gradient-to-b from-[#7E5FDD] to-[#583F99] text-white border-none rounded-lg font-medium cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98] w-fit">
                Learn More
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-8 bg-white rounded-2xl shadow-md text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-b from-[#7E5FDD] to-[#583F99] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Feature {i + 1}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This feature card demonstrates Tailwind CSS with icons, titles, and descriptions.
                Multiple instances help create a realistic page size for performance testing.
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-around items-center p-12 bg-white rounded-2xl mt-12 gap-8 md:gap-0">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              1.02
            </div>
            <div className="text-base text-gray-600 font-medium">MB Bundle</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              417
            </div>
            <div className="text-base text-gray-600 font-medium">KB First Load</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold bg-gradient-to-b from-[#7E5FDD] to-[#583F99] bg-clip-text text-transparent mb-2">
              95
            </div>
            <div className="text-base text-gray-600 font-medium">Performance Score</div>
          </div>
        </div>
      </section>
    </div>
  );
}

