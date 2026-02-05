'use client';

import { usePageData } from '@/context/PageDataContext';

import ServerSchemaMarkup from './ServerSchemaMarkup';

const ClientSchemaWrapper = () => {
  const { pageData } = usePageData();

  // Only render if we have schema data
  if (!pageData?.content?.code) {
    return null;
  }

  return <ServerSchemaMarkup schemaData={pageData.content.code} />;
};

export default ClientSchemaWrapper;
