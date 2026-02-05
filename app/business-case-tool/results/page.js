// app/business-case-tool/results/page.tsx
'use client';

import React, { Suspense } from 'react';

import ClientBCTResults from '@/components/BusinessCaseTool/ClientBTCResults';

const BCTResultsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientBCTResults />
    </Suspense>
  );
};

export default BCTResultsPage;
