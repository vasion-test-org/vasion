'use client';

import React, { createContext, useContext, useState } from 'react';

const PageDataContext = createContext();

export const usePageData = () => {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error('usePageData must be used within a PageDataProvider');
  }
  return context;
};

export const PageDataProvider = ({ children }) => {
  const [pageData, setPageData] = useState(null);

  const updatePageData = (data) => {
    setPageData(data);
  };

  return (
    <PageDataContext.Provider value={{ pageData, updatePageData }}>
      {children}
    </PageDataContext.Provider>
  );
};
